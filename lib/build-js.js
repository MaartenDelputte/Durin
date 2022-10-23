import esbuild from "esbuild";
import { config } from "./../config/config.js";
import chalk from "chalk";

// https://esbuild.github.io/getting-started/#build-scripts
export function buildJs(watch = false) {
  // Set esbuild options
  const esbuildOptions = {
    entryPoints: config.js.entryPoints,
    logLevel: "info",
    bundle: true,
    outdir: config.js.output,
    outbase: config.js.output,
    entryNames: "[ext]/[name]",
    minify: !watch,
    sourcemap: watch,
    watch,
    external: config.externalFiles
  }

  esbuild
    .build(esbuildOptions)
    .then(result => {
      // Show different message dependng on watch
      if(watch) {
        console.log(chalk.green("- JS development watch has started"));
      } else {
        console.log(chalk.green("- JS production build ready"));
      }
    })
    .catch((err) => {
      // Show error message
      console.log(chalk.red("- JS error detected, build has stopped"));
      process.exit(1);
    });
}
