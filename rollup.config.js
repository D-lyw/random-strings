// rollup.config.js
import resovle from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import strip from 'rollup-plugin-strip';

const option = {
    input: 'lib/index.js',
    output: {
        file: 'dist/random-string.js',
        format: 'umd',
        name: 'random-string'
    },
    plugins: [
        resovle(),
        commonjs()
    ],
    external: ['lodash', 'jquery']
};

if (process.env.NODE_ENV === 'development') {
    option.plugins.push(serve({
        open: true,
        contentBase: ['example', 'dist'],
        port: 3000
    }));
} else if (process.env.NODE_ENV === 'production') {
    // option.plugins.push(uglify());
    option.plugins.push(strip({
        debugger: true,
        functions: ['console.log', 'assert.*', 'debug', 'alert'],
        sourceMap: false
    }));
}

export default option;
