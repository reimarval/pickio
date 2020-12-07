module.exports = {
  pages: {
    'index': {
      entry: './src/pages/Home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'g': {
      entry: './src/pages/G/main.js',
      template: 'public/index.html',
      // filename: 'g',
      title: 'G',
      chunks: [ 'chunk-vendors', 'chunk-common', 'g' ]
    }
  }
}
