module.exports = {
  "*.ts": [
    "node_modules/.bin/eslint",
    "tsc-files --noEmit",
    "prettier --write",
    () => "npm run test",
  ],
  "*.js": [
    "node_modules/.bin/eslint",
    "tsc-files --noEmit",
    "prettier --write",
  ],
  "*.md": (files) => {
    const fileList = `${files.join(" ")}`;
    return [
      `node_modules/.bin/eslint ${fileList}`,
      `tsc-files --noEmit ${fileList}`,
      `node_modules/.bin/eslint ${fileList}`,
      `prettier --write ${fileList}`,
      `node_modules/.bin/typescript-docs-verifier ${files
        .map((file) => `--input-file ${file}`)
        .join(" ")}`,
    ];
  },
};
