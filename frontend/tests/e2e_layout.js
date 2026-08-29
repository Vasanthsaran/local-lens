module.exports = {
  '1. Verify Navigation bar header and brand wordmark': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.containsText('h1', 'LocalLens')
      .assert.containsText('body', 'LUXURY HERITAGE & TRAVEL');
  },

  '2. Verify Hero section headline and split glass search inputs': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', "Experience India's")
      .assert.elementPresent('input[placeholder="Royal Thali, Heritage Walks, Sunset View..."]');
  },

  '3. Verify Category Cards Grid': function (browser) {
    browser
      .url('http://localhost:3000')
      .assert.containsText('body', 'Food')
      .assert.containsText('body', 'Places')
      .assert.containsText('body', 'Culture')
      .assert.containsText('body', 'Explore Map');
  },

  '4. Verify Popular Places and Food Carousels': function (browser) {
    browser
      .url('http://localhost:3000')
      .assert.containsText('h2', 'Popular Places')
      .assert.containsText('h2', 'Taste the Region')
      .end();
  }
};
