module.exports = {
  ci: {
    collect: {
      ...(process.env.LHCI_URL
        ? { url: [process.env.LHCI_URL] }
        : { staticDistDir: "./build" }),
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
