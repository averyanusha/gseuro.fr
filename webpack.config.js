// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: isProduction ? 'production' : 'development',

  entry: {
    app: './src/js/app.js', // Add your main app.js entry point here
    'react-bundle': ['./src/react/carousel-main.jsx', './src/react/calendar-main.jsx']
  },

  output: {
    // Corrected path to match your Gulp's 'dist' output root
    // Assuming webpack.config.js is in the project root or similar.
    // Adjust relative path as needed. If in gulp/config/, it would be ../../dist/js
    path: path.resolve(__dirname, '../../dist/js'), // Adjust this path based on webpack.config.js location relative to dist
    filename: '[name].js', // Output app.js and react-bundle.js
    // clean: !isProduction, // Let Gulp's reset task handle cleaning the entire dist folder
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', './src/react']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },

  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',

  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../../.webpack-cache'), // Adjust path
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },

  stats: {
    errorDetails: true,
    warnings: true
  }
};