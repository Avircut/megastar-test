import { BuildOptions } from '../types/config';

export const buildBabelLoader = ({ isDev }:BuildOptions) => ({
  test: /\.(jsx|tsx|jx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
    },
  },
});
