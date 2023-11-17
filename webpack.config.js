const path = require('path');
function excludeFileAndNodeModules(fileToExclude) {
    // Convert the specific file path to an absolute path
    const absolutePathToExclude = path.resolve(fileToExclude);
  
    return (path) => {
      // Check if the path is the node_modules folder or the specific file
      return /node_modules/.test(path) || path === absolutePathToExclude;
    };
  }
module.exports = {
  entry: './src/popup.ts', // Your main TypeScript file
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: excludeFileAndNodeModules('C:/Users/chris/TabGroupExtension/src/background.ts')
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'),
  },
};
