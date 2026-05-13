const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
  },
});
module.exports = {
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
  }
};