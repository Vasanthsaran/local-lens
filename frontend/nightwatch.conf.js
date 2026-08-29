module.exports = {
  src_folders: ['tests'],
  page_objects_path: ['pages'],

  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless', '--no-sandbox', '--disable-gpu']
        }
      }
    },
    lambdatest: {
      selenium: {
        host: 'hub.lambdatest.com',
        port: 80
      },
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest',
        'LT:Options': {
          platformName: 'Windows 11',
          project: 'Local Lens E2E Suite',
          build: 'Nightwatch Build',
          user: process.env.LT_USERNAME,
          accessKey: process.env.LT_ACCESS_KEY,
          video: true,
          console: true
        }
      }
    }
  }
};
