const gulp = require("gulp");
const rollup = require("rollup");
const http = require("http");
const path = require("path");
const fs = require("fs-extra");
const log = require("fancy-log");
const { string } = require("rollup-plugin-string");
const handler = require("serve-handler");
const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("rollup-plugin-babel");
const babelTypescript = require("@babel/preset-typescript");
const babelDecorators = require("@babel/plugin-proposal-decorators");
const babelClassProperties = require("@babel/plugin-proposal-class-properties");
const entrypointHashmanifest = require("rollup-plugin-entrypoint-hashmanifest");

const { nodeResolve } = require("@rollup/plugin-node-resolve");
const gzipPlugin = require("rollup-plugin-gzip");
const { terser } = require("rollup-plugin-terser");

const extensions = [".js", ".ts"];

const DevelopPlugins = [
  string({
    include: ["node_modules/**/*.css"],
  }),
  commonjs(),
  nodeResolve({
    extensions,
    preferBuiltins: false,
    browser: true,
    rootDir: "./src",
  }),
  json({
    compact: true,
    preferConst: true,
  }),
  babel({
    babelrc: false,
    presets: [babelTypescript.default],
    plugins: [
      "@babel/syntax-dynamic-import",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      [babelDecorators.default, { decoratorsBeforeExport: true }],
      [babelClassProperties.default, { loose: true }],
    ].filter(Boolean),
    extensions,
    exclude: [require.resolve("@mdi/js/mdi.js")],
  }),
  entrypointHashmanifest({ manifestName: "./aaaa/manifest.json" }),
];

const BuildPlugins = DevelopPlugins.concat([
  terser({
    output: { comments: false },
  }),
  gzipPlugin.default(),
]);

const inputconfig = {
  input: "./src/route-panel.ts",
  plugins: DevelopPlugins,
  preserveEntrySignatures: false,
};
const outputconfig = (isDev) => {
  return {
    dir: "./aaaa/",
    chunkFileNames: !isDev ? "c.[hash].js" : "[name]-dev.js",
    assetFileNames: !isDev ? "a.[hash].js" : "[name]-dev.js",
    entryFileNames: "e.[hash].js",
    format: "es",
    intro: "const __DEMO__ = false;",
  };
};

function createServer() {
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: "./aaaa/",
    });
  });

  server.listen(5000, true, () => {
    log.info("File will be served to http://127.0.0.1:5000/entrypoint.js");
  });
}

gulp.task("rollup-develop", () => {
  isDev = true;
  const watcher = rollup.watch({
    input: inputconfig.input,
    plugins: inputconfig.plugins,
    output: outputconfig(true),
    preserveEntrySignatures: "strict",
    watch: {
      include: ["./src/**"],
      chokidar: {
        usePolling: true,
      },
    },
  });

  let startedHttp = false;
  let first = true;

  watcher.on("event", (event) => {
    if (!startedHttp) {
      startedHttp = true;
      createServer();
    }
    if (event.code === "BUNDLE_START") {
      log(`Build started @ ${new Date().toLocaleTimeString()}`);
    } else if (event.code === "BUNDLE_END") {
      if (first) {
        writeEntrypoint();
        first = false;
      }

      log(`Build done @ ${new Date().toLocaleTimeString()}`);
    } else if (event.code === "ERROR") {
      log.error(event.error);
    }
  });
});

gulp.task("rollup-build", async function (task) {
  inputconfig.plugins = BuildPlugins;
  const bundle = await rollup.rollup(inputconfig);
  await bundle.write(outputconfig(false));
  writeEntrypoint();
  task();
});

function writeEntrypoint() {
  const entrypointManifest = require(path.resolve("./aaaa/manifest.json"));
  fs.writeFileSync(
    path.resolve("./aaaa/entrypoint.js"),
    `
try {
  new Function("import('/hacsfiles/frontend/${entrypointManifest["./src/route-panel.ts"]}')")();
} catch (err) {
  var el = document.createElement('script');
  el.src = '/hacsfiles/frontend/${entrypointManifest["./src/route-panel.ts"]}';
  document.body.appendChild(el);
}
  `,
    { encoding: "utf-8" }
  );
}