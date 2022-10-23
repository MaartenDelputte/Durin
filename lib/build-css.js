import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { config } from "./../config/config.js";
import chalk from "chalk";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { sassLintPlugin } from "./esbuild-plugins/sass-lint-plugin.js";

// https://esbuild.github.io/getting-started/#build-scripts
export function buildCss(watch = false) {
  // Set default options for the SASS plugin
  let sassOptions = {};

  // If we are watching (development)
  if (watch) {
    // Add SASS options
    sassOptions = {
      // When transforming the CSS, add postcss plugins like autoprefixer
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
        return css;
      }
    }
  }

  // Set default plugins
  let plugins = [
    sassPlugin(sassOptions),
    sassLintPlugin(watch, config.css.lintFiles),
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
    external: config.externalFiles
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
