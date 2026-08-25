module.exports = {
  ci: {
    collect: {
      url: ["https://booktivate.vdovareize.me/"],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.85 }],
        "color-contrast": "off",
        "errors-in-console": "off",
        "unused-javascript": "off",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
