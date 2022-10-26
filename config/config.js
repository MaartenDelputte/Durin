import nconf from "nconf";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name where this file resides
const __dirname = path.dirname(__filename);

// Get all default config from the json file in this directory
nconf.file(
  {
    file: `${__dirname}/config.json`
  }
);

export const config = nconf.get();
