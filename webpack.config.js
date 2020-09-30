require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env, argv) {
	return {
		entry: {
			app: './src/index.tsx',
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].js',
			path: path.resolve(__dirname + '/public/'),
			publicPath: '/',
			pathinfo: true,
		},
		devServer: {
			port: 8300,
			publicPath: '/',
			historyApiFallback: true,
			contentBase: path.resolve(__dirname + '/public'),
			stats: 'errors-warnings',
			disableHostCheck: true,
		},
		resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: ['.ts', '.tsx', '.js', '.json'],
			symlinks: true,
		},
		watch: env === 'prod' ? false : false,
		mode: env === 'prod' ? 'production' : 'development',
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						name: 'vendor',
						test: /node_modules/,
						enforce: true,
					},
				},
			},
			runtimeChunk: true,
		},
		devtool: env !== 'prod' ? 'inline-source-map' : false,
		plugins: [
			new webpack.DefinePlugin({
				'process.env.API_SERVER': JSON.stringify(process.env.API_SERVER),
			}),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new HtmlWebpackPlugin({
				template: 'web/index.html',
				filename: 'index.html',
			}),
		],
		module: {
			rules: [
				{
					test: /\.(t|j)sx?$/,
					use: [
						{
							loader: 'source-map-loader',
						},
					],
					exclude: /node_modules(\/|\\)(?!(@savewise)).*/,
				},
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'babel-loader',
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},

				{
					test: /\.(png|svg|jpg|gif|eot|woff|woff2|ttf|otf)$/,
					use: ['file-loader'],
				},
			],
		},
	}
}
