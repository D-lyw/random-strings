import path from 'path';
import rollupConfig from './rollup.config.base';

const resovleFile = (filePath) => path.join(__dirname, '..', filePath);

export default rollupConfig({
    file: resovleFile('lib/rs.cjs.js'),
    format: 'cjs'
});
