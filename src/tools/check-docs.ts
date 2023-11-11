import { FileTreeWalker } from "file-tree-walker-ts";
import { compileSnippets } from "typescript-docs-verifier";

let returnCode = 0;

const run = async () => {
  const walker = new FileTreeWalker();

  const markdownFiles: string[] = [];

  await walker
    .setExcludedFiles(["node_modules", "dist", "coverage", "temp", "api"])
    .setAllowedFileTypes(["md"])
    .onFile((file: string) => {
      markdownFiles.push(file);
    })
    .walk(process.cwd());

  const project = "tsconfig.json";
  const results = await compileSnippets({ markdownFiles, project });
  results.forEach((result) => {
    if (result.error) {
      returnCode = 1;
      console.log(
        `Error compiling example code block ${result.index} in file ${result.file}`,
      );
      console.log(result.error.message);
      console.log("Original code:");
      console.log(result.snippet);
    }
  });
};
run()
  .then(() => {
    if (returnCode !== 0) {
      process.exit(returnCode);
    }
  })
  .catch(console.error);
