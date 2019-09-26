// rollup.config.js
import resovle from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript';


export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'umd',
		name: 'random-string'
	},
	plugins: [
		resovle(),
        commonjs(),
        typescript(),
		uglify({
            sourcemap: true
		})
	],
    external: ['loadsh', 'jquery'],
}
