// Due to an error in Rollup we must clean the files during build with a custom script

import { globSync } from "glob";
import { rmSync } from "fs";

const files = globSync(["src/**/*.d.ts", "src/**/*.d.ts.map"]);
files.forEach((file) => {
  rmSync(file);
});
