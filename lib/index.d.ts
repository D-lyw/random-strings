/**
 * @param length
 * @param type  number/string/base64/hex/alphanumeric/password/customized
 * @param capitalization
 * @param excludeCharSet
 * @param charactorSet
 */
interface configOption {
    length?: number;
    type?: string;
    capitalization?: boolean;
    charactorSet?: string | string[];
    excludeCharSet?: string | string[];
}
/**
 * generate various types of random string
 * @param configOption
 */
declare const rs: (option?: configOption) => string;
export default rs;
