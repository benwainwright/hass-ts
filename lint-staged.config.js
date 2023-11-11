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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const fileList = `${files.join(" ")}`;
    return [
      `node_modules/.bin/eslint ${fileList}`,
      `tsc-files --noEmit ${fileList}`,
      `node_modules/.bin/eslint ${fileList}`,
      `prettier --write ${fileList}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      `node_modules/.bin/typescript-docs-verifier ${files
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .map((file) => `--input-file ${file}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .join(" ")}`,
    ];
  },
};
