import nconf from "nconf";

// Get all default config from the config file
nconf.file(
  {
    file: `${process.cwd()}/config.json`
  }
);

export const config = nconf.get();
