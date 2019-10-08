// rollup.config.js
import resovle from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import strip from 'rollup-plugin-strip';

const option = {
    input: 'src/index.ts',
    output: {
        file: 'dist/rs.js',
        format: 'umd',
        name: 'rs'
    },
    plugins: [
        resovle(),
        commonjs(),
        typescript()
    ],
    external: ['loadsh', 'jquery']
};

if (process.env.NODE_ENV === 'development') {
    option.plugins.push(serve({
        open: true,
        contentBase: ['example', 'dist'],
        port: 3000
    }));
} else if (process.env.NODE_ENV === 'production') {
    option.output.file = 'lib/rs.js';
    option.plugins.push(uglify());
    option.plugins.push(strip({
        debugger: true,
        functions: ['console.log', 'assert.*', 'debug', 'alert'],
        sourceMap: false
    }));
}

export default option;
