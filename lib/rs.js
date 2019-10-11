(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.rs = factory());
}(this, function () { 'use strict';

    var numberSet = '0123456789';
    var lowercaseCharactorSet = 'abcdefghijklmnopqrstuvwxyz';
    var uppercaseCharactorset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var alphanumericSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var hexSet = '0123456789abcdef';
    var base64Set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=';
    var specialCharactorSet = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    // supported gengerated string types
    var rsType;
    (function (rsType) {
        rsType[rsType["number"] = 0] = "number";
        rsType[rsType["string"] = 1] = "string";
        rsType[rsType["base64"] = 2] = "base64";
        rsType[rsType["hex"] = 3] = "hex";
        rsType[rsType["alphanumeric"] = 4] = "alphanumeric";
        rsType[rsType["password"] = 5] = "password";
        rsType[rsType["customized"] = 6] = "customized";
    })(rsType || (rsType = {}));
    /**
     * 生成随机字符串
     * @param option 配置信息对象
     * @param option.type 类型 number/string/base64/hex/alphanumeric/password/customized
     * @param option.length 生成字符串长度
     * @param capitalization 是否包含大写字母
     * @param charactorSet 用户指定的字符集合(在type="customized"时使用)
     * @param excludeCharSet 移除指定类型集合的部分字符
     */
    var rs = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.type, type = _c === void 0 ? 'number' : _c, _d = _b.length, length = _d === void 0 ? 8 : _d, _e = _b.capitalization, capitalization = _e === void 0 ? false : _e, _f = _b.excludeCharSet, excludeCharSet = _f === void 0 ? '' : _f, _g = _b.charactorSet, charactorSet = _g === void 0 ? [] : _g;
        var charset;
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
    };
    /**
     * remove user-specified exclude charset
     * @param originCharSet 原有的字符集合
     * @param excludeCharSet 移除的字符集合
     */
    var execExcludeCharSet = function (originCharSet, excludeCharSet) {
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

    return rs;

}));
