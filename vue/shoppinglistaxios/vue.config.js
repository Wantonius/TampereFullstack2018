module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000/'
      },
      '^/login': {
        target: 'http://localhost:3000/'
      },
      '^/logout': {
        target: 'http://localhost:3000/'
      },
      '^/register': {
        target: 'http://localhost:3000/'
      }
    }
  }
}