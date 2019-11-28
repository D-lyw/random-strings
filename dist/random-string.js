(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global['random-string'] = factory());
}(this, function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var charSet = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var numberSet = '0123456789';
	exports.numberSet = numberSet;
	var lowercaseCharactorSet = 'abcdefghijklmnopqrstuvwxyz';
	exports.lowercaseCharactorSet = lowercaseCharactorSet;
	var uppercaseCharactorset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	exports.uppercaseCharactorset = uppercaseCharactorset;
	var alphanumericSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	exports.alphanumericSet = alphanumericSet;
	var hexSet = '0123456789abcdef';
	exports.hexSet = hexSet;
	var base64Set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=';
	exports.base64Set = base64Set;
	var specialCharactorSet = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
	exports.specialCharactorSet = specialCharactorSet;
	});

	unwrapExports(charSet);
	var charSet_1 = charSet.numberSet;
	var charSet_2 = charSet.lowercaseCharactorSet;
	var charSet_3 = charSet.uppercaseCharactorset;
	var charSet_4 = charSet.alphanumericSet;
	var charSet_5 = charSet.hexSet;
	var charSet_6 = charSet.base64Set;
	var charSet_7 = charSet.specialCharactorSet;

	var lib = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

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
	            charset = charSet.numberSet.split('');
	            break;
	        case rsType.base64:
	            charset = charSet.base64Set.split('');
	            break;
	        case rsType.hex:
	            charset = charSet.hexSet.split('');
	            break;
	        case rsType.string:
	            charset = charSet.lowercaseCharactorSet.split('');
	            if (option.capitalization) {
	                charset = charset.concat(charSet.uppercaseCharactorset.split(''));
	            }
	            break;
	        case rsType.alphanumeric:
	            charset = charSet.alphanumericSet.split('');
	            break;
	        case rsType.password:
	            if (length < 8) {
	                console.warn('strongly recommended that the password length be no less than 8');
	            }
	            charset = (charSet.specialCharactorSet + charSet.alphanumericSet).split('');
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
	});

	var index = unwrapExports(lib);

	return index;

}));
