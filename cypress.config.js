module.exports = {
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {},
  },
  "scripts": {
    "cy:open": "cypress open --config-file=cypress.config.js",
    "test": "cypress run --config-file=cypress.config.js"
}

