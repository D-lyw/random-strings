import { numberSet, hexSet, base64Set, uppercaseCharactorset, lowercaseCharactorSet, alphanumericSet, specialCharactorSet } from './charSet';

// supported gengerated string types
enum rsType { number, string, base64, hex, alphanumeric, password, customized };

// supported charactor set types
// enum rsCharSetType { number, }

interface RSOption {
    length?: number,
    type?: string,
    capitalization?: boolean,
    charactorSet?: [],
    excludeCharSet?: string
}

const rs = (option: RSOption): string => {
    // 判断参数格式并处理参数
    option = option || {};
    option.length = option.length || 8;
    option.type = option.type || 'number';
    option.capitalization = option.capitalization || false;
    option.excludeCharSet = option.excludeCharSet || '';
    option.charactorSet = option.charactorSet || [];

    let charset: string[];
    // set charactor set
    switch (rsType[option.type]) {
        /**
         * 步骤：
         *   1、 获取指定类型的字符集合（customized用户自定义类型除外）
         *   2、 加上获取用户提供的charactorSet字符集合
         *   3、 去除用户提供的excludeCharSet集合
         */
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
            if (option.capitalization) {
                charset = charset.concat(uppercaseCharactorset.split(''));
            }
            break;
        case rsType.alphanumeric:
            charset = alphanumericSet.split('');
            break;
        case rsType.password:
            if (option.length < 8) {
                console.warn('strongly recommended that the password length be no less than 8');
            }
            charset = (specialCharactorSet + alphanumericSet).split('');
            break;
        case rsType.customized:
            charset = option.charactorSet.join('').split('');
            break;
        default:
            throw new Error('the assigned type is not recognizable');
            break;
    }
    execExcludeCharSet(charset, option.excludeCharSet);
    return getRandomString(option.length, charset);
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
