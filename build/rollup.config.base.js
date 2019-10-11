// rollup.config.base.js
import resovle from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import strip from 'rollup-plugin-strip';
import { terser } from 'rollup-plugin-terser';

export default (config) => ({
    input: 'src/index.ts',
    output: {
        file: config.file,
        format: config.format,
        name: 'rs'
    },
    plugins: [
        resovle({
            mainFields: ['module', 'main', 'broswer']
        }),
        commonjs(),
        typescript(),
        terser(),
        strip({
            debugger: true,
            functions: ['console.log', 'assert.*', 'debug', 'alert'],
            sourceMap: false
        })
    ],
    external: ['loadsh', 'jquery']
});
