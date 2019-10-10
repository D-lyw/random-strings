import { numberSet, hexSet, base64Set, uppercaseCharactorset, lowercaseCharactorSet, alphanumericSet, specialCharactorSet } from './charSet';

// supported gengerated string types
enum rsType { number, string, base64, hex, alphanumeric, password, customized };

// supported charactor set types
// enum rsCharSetType { number, }

interface configOption {
    length?: number,
    type?: string,
    capitalization?: boolean,
    charactorSet?: string[],
    excludeCharSet?: string
}

/**
 * 生成随机字符串
 * @param option 配置信息对象
 * @param option.type 类型 number/string/base64/hex/alphanumeric/password/customized
 * @param option.length 生成字符串长度
 * @param capitalization 是否包含大写字母
 * @param charactorSet 用户指定的字符集合(在type="customized"时使用)
 * @param excludeCharSet 移除指定类型集合的部分字符
 */
const rs = ({
    type = 'number',
    length = 8,
    capitalization = false,
    excludeCharSet = '',
    charactorSet = [] }: configOption = {}): string => {

    let charset: string[];

    /**
     * 步骤：
     *   1、 获取指定类型的字符集合（customized用户自定义类型除外）
     *   2、 加上获取用户提供的charactorSet字符集合
     *   3、 去除用户提供的excludeCharSet集合
     */
    switch (rsType[type]) {
        case rsType.number:
            charset = numberSet.split('');
            break;
        case rsType.base64:
            charset = base64Set.split('');
            break;
        case rsType.hex:
            charset = hexSet.split('');
            break;
        case rsType.string:
            charset = lowercaseCharactorSet.split('');
            if (capitalization) {
                charset = charset.concat(uppercaseCharactorset.split(''));
            }
            break;
        case rsType.alphanumeric:
            charset = alphanumericSet.split('');
            break;
        case rsType.password:
            if (length < 8) {
                console.warn('strongly recommended that the password length be no less than 8');
            }
            charset = (specialCharactorSet + alphanumericSet).split('');
            break;
        case rsType.customized:
            charset = charactorSet.join('').split('');
            break;
        default:
            throw new Error('the assigned type is not recognizable');
            break;
    }
    execExcludeCharSet(charset, excludeCharSet);
    return getRandomString(length, charset);
}

/**
 * remove user-specified exclude charset
 * @param originCharSet 原有的字符集合
 * @param excludeCharSet 移除的字符集合
 */
const execExcludeCharSet = (originCharSet: string[], excludeCharSet: string) => {
    if (excludeCharSet.length !== 0) {
        excludeCharSet.trim().split('').map((value: string) => {
            if (originCharSet.includes(value)) {
                let deleteCharIndex = originCharSet.indexOf(value);
                originCharSet.splice(deleteCharIndex, 1);
            } else {
                throw new Error('excludeCharSet must be in the assigned type set...');
            }
        })
    }
}

/**
 * generator random string
 * @param stringLen charactor set's length
 * @param charset charatctor set
 */
const getRandomString = (stringLen: number, charset: string[]): string => {
    let res = '';
    for (let i = 0; i < stringLen; i++) {
        let index = getIndex(charset.length);
        res += charset[index];
    }
    return res;
}

/**
 * generatior random subscript
 * @param setLength
 */
const getIndex = (setLength: number): number => {
    const charIndex: number = parseFloat(Math.random().toFixed(2)) * setLength;
    return Math.floor(charIndex % setLength);
}

export default rs;
