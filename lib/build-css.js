import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { config } from "./../config/config.js";
import chalk from "chalk";

// https://esbuild.github.io/getting-started/#build-scripts
export function buildCss(watch = false) {
  // Set plugins
  let plugins = [
    sassPlugin({})
  ]

  // Set esbuild options
  const esbuildOptions = {
    plugins,
    entryPoints: config.css.entryPoints,
    logLevel: "info",
    bundle: true,
    outdir: config.css.output,
    outbase: config.css.output,
    entryNames: "[ext]/[name]",
    minify: !watch,
    sourcemap: watch,
    external: [
      "*.svg",
      "*.jpg",
      "*.jpeg",
      "*.gif",
      "*.png",
      "*.json",
      "*.eot",
      "*.ttf",
      "*.woff",
      "*.woff2",
      "../../fonts/*"
    ]
  }

  esbuild
    .build(esbuildOptions)
    .then(result => {
      // Show different message dependng on watch
      if (watch) {
        console.log(chalk.green("- CSS development watch has started"));
      } else {
        console.log(chalk.green("- CSS production build ready"));
      }
    })
    .catch((err) => {
      // Show error message
      console.log(chalk.red("- CSS error detected, build has stopped"));
      process.exit(1);
    });
}
