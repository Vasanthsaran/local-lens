module.exports = {
  '1. Verify Navigation bar header and title': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.containsText('h1', 'LOCAL LENS')
      .assert.containsText('body', 'Discover a place like a local.');
  },

  '2. Verify Hero section headline and search input': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('h2', 5000)
      .assert.containsText('h2', 'DISCOVER YOUR REGION')
      .assert.elementPresent('input[placeholder="Search places, food, experiences..."]');
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
      .assert.containsText('h2', 'Popular Places in Andhra Pradesh')
      .assert.containsText('h2', 'Taste the Region')
      .assert.containsText('body', 'RK Beach')
      .assert.containsText('body', 'Bamboo Chicken')
      .end();
  }
};
