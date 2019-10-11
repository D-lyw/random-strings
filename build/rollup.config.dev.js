// rollup.config.dev.js

import resovle from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/rs.js',
        format: 'umd',
        name: 'rs'
    },
    plugins: [
        resovle(),
        commonjs(),
        typescript(),
        serve({
            open: true,
            contentBase: ['example', 'dist'],
            port: 3000
        })
    ]
};
