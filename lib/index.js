"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var charSet_1 = require("./charSet");
// supported gengerated string types
var rsType;
(function (rsType) {
    rsType["number"] = "number";
    rsType["string"] = "string";
    rsType["base64"] = "base64";
    rsType["hex"] = "hex";
    rsType["alphanumeric"] = "alphanumeric";
    rsType["password"] = "password";
    rsType["customized"] = "customized";
})(rsType || (rsType = {}));
/**
 * generate various types of random string
 * @param configOption
 */
var rs = function (option) {
    if (option === void 0) { option = {
        type: 'number',
        length: 8,
        capitalization: false,
        excludeCharSet: [],
        charactorSet: []
    }; }
    var charset = [];
    /**
     * 步骤：
     *   1、 获取指定类型的字符集合（customized用户自定义类型除外）
     *   2、 加上获取用户提供的charactorSet字符集合
     *   3、 去除用户提供的excludeCharSet集合
     */
    switch (option.type) {
        case rsType.number:
            charset = charSet_1.numberSet.split('');
            break;
        case rsType.base64:
            charset = charSet_1.base64Set.split('');
            break;
        case rsType.hex:
            charset = charSet_1.hexSet.split('');
            break;
        case rsType.string:
            charset = charSet_1.lowercaseCharactorSet.split('');
            if (option.capitalization) {
                charset = charset.concat(charSet_1.uppercaseCharactorset.split(''));
            }
            break;
        case rsType.alphanumeric:
            charset = charSet_1.alphanumericSet.split('');
            break;
        case rsType.password:
            if (length < 8) {
                console.warn('strongly recommended that the password length be no less than 8');
            }
            charset = (charSet_1.specialCharactorSet + charSet_1.alphanumericSet).split('');
            break;
        case rsType.customized:
            if (option.charactorSet) {
                if (typeof option.charactorSet === 'string') {
                    charset = option.charactorSet.split('');
                }
                else {
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
var execExcludeCharSet = function (originCharSet, excludeCharSet) {
    if (typeof excludeCharSet === 'object')
        excludeCharSet = excludeCharSet.join();
    if (excludeCharSet.length !== 0) {
        excludeCharSet.trim().split('').map(function (value) {
            if (originCharSet.includes(value)) {
                var deleteCharIndex = originCharSet.indexOf(value);
                originCharSet.splice(deleteCharIndex, 1);
            }
            else {
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
var getRandomString = function (stringLen, charset) {
    var res = '';
    for (var i = 0; i < stringLen; i++) {
        var index = getIndex(charset.length);
        res += charset[index];
    }
    return res;
};
/**
 * generatior random subscript
 * @param setLength
 */
var getIndex = function (setLength) {
    var charIndex = parseFloat(Math.random().toFixed(2)) * setLength;
    return Math.floor(charIndex % setLength);
};
exports.default = rs;
