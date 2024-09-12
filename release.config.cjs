module.exports = {
  branches: [
    "main",
    {
      name: "alpha",
      prerelease: true,
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "docs"],
      },
    ],
  ],
};
