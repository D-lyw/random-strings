import {
    numberSet, hexSet, base64Set, uppercaseCharactorset, lowercaseCharactorSet, alphanumericSet, specialCharactorSet
} from './charSet';

// supported gengerated string types
enum rsType {
    number = 'number',
    string = 'string',
    base64 = 'base64',
    hex = 'hex',
    alphanumeric = 'alphanumeric',
    password = 'password',
    customized = 'customized'
}

// supported charactor set types
// enum rsCharSetType { number, }

/**
 * @param length
 * @param type  number/string/base64/hex/alphanumeric/password/customized
 * @param capitalization
 * @param excludeCharSet
 * @param charactorSet
 */
interface configOption {
    length?: number,
    type?: string,
    capitalization?: boolean,
    charactorSet?: string | string[],
    excludeCharSet?: string | string[]
}

/**
 * generate various types of random string
 * @param configOption
 */
const rs = (option: configOption = {
    type: 'number',
    length: 8,
    capitalization: false,
    excludeCharSet: [],
    charactorSet: []
}): string => {
    let charset: string[] = [];

    /**
     * 步骤：
     *   1、 获取指定类型的字符集合（customized用户自定义类型除外）
     *   2、 加上获取用户提供的charactorSet字符集合
     *   3、 去除用户提供的excludeCharSet集合
     */
    switch (option.type) {
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
        if (length < 8) {
            console.warn('strongly recommended that the password length be no less than 8');
        }
        charset = (specialCharactorSet + alphanumericSet).split('');
        break;
    case rsType.customized:
        if (option.charactorSet) {
            if (typeof option.charactorSet === 'string') {
                charset = option.charactorSet.split('');
            } else {
                charset = option.charactorSet.join('').split('');
            }
        }
        break;
    default:
        throw new Error('the assigned type is not recognizable');
        break;
    }
    if (option.excludeCharSet) {
        execExcludeCharSet(charset, option.excludeCharSet);
    }
    return getRandomString(length, charset);
};

/**
 * remove user-specified exclude charset
 * @param originCharSet
 * @param excludeCharSet
 */
const execExcludeCharSet = (originCharSet: string[], excludeCharSet: string | string[]) => {
    if (typeof excludeCharSet === 'object') excludeCharSet = excludeCharSet.join();
    if (excludeCharSet.length !== 0) {
        excludeCharSet.trim().split('').map((value: string) => {
            if (originCharSet.includes(value)) {
                const deleteCharIndex = originCharSet.indexOf(value);
                originCharSet.splice(deleteCharIndex, 1);
            } else {
                throw new Error('excludeCharSet must be in the assigned type set...');
            }
        });
    }
};

/**
 * generator random string
 * @param stringLen charactor set's length
 * @param charset charatctor set
 */
const getRandomString = (stringLen: number, charset: string[]): string => {
    let res = '';
    for (let i = 0; i < stringLen; i++) {
        const index = getIndex(charset.length);
        res += charset[index];
    }
    return res;
};

/**
 * generatior random subscript
 * @param setLength
 */
const getIndex = (setLength: number): number => {
    const charIndex: number = parseFloat(Math.random().toFixed(2)) * setLength;
    return Math.floor(charIndex % setLength);
};

export default rs;
