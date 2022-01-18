import { terser } from 'rollup-plugin-terser';
import { importAssertionsPlugin } from 'rollup-plugin-import-assert';
import { importAssertions } from 'acorn-import-assertions';
import modify from 'rollup-plugin-modify';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ (devMode) ? 'development' : 'production' } mode bundle`);

export default [
	{
		input: './src/main.js',
		output: {
			file: './dist/bundle.js',
			format: 'es',
			sourcemap:  false,
			plugins: [
				terser({
					ecma: 2020,
					mangle: { toplevel: true },
					compress: {
						module: true,
						toplevel: true,
						unsafe_arrows: true,
						drop_console: !devMode,
						drop_debugger: !devMode
					},
					output: { quote_style: 1 }
				})
			]
		},
        acornInjectPlugins: [ importAssertions ],
        plugins: [
			importAssertionsPlugin(),
			modify({
				find: "../src/",
				replace: "./dist/",
			}),
		],
	}
];