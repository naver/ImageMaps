import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} [config={}]
 * @param {boolean} [config.minifying]
 * @param {string} [config.format="umd"]
 * @returns {external:RollupConfig}
 */
function getRollupObject ({minifying, format = 'umd'} = {}) {
    const nonMinified = {
        input: 'src/jquery.imageMaps.js',
        output: {
            format,
            sourcemap: minifying,
            file: `dist/index.${format}${minifying ? '.min' : ''}.js`,
            name: 'jqueryImageMaps'
        },
        plugins: [
            babel({
                babelHelpers: 'bundled'
            })
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

export default [
    getRollupObject({minifying: true, format: 'umd'}),
    getRollupObject({minifying: false, format: 'umd'}),
    getRollupObject({minifying: true, format: 'esm'}),
    getRollupObject({minifying: false, format: 'esm'})
];
