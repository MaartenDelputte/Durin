import stylelint from "stylelint";

// https://esbuild.github.io/plugins/
// Create a plugin to start SASS linting before a SASS build
export function sassLintPlugin(lint = false, files = false) {
  // Set default build function
  let setup = () => { }

  // If we want to lint files
  if (lint) {
    // Override setup
    setup = build => {
      build.onEnd(() => {
        // Lint the SASS files
        stylelint
          .lint({
            files,
            formatter: "string"
          })
          .then(function ({ output, errored }) {
            console.log(output);
          })
          .catch(function (err) {
            throw new Error(err.stack);
          });
      })
    }
  }

  return {
    name: "sassLint",
    setup
  };
}
