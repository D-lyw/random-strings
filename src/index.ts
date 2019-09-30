import { numberSet } from './charSet';

// supported gengerated string types
enum rsType { number, string, base64, hex, password, customized };

// supported charactor set types
enum rsCharSetType { number, }


interface argments {
    length: number,
    type: string,
    capitalization: boolean,
    charactorSet: []
}

const rs = (option: argments): string => {
    let res = '';
    for (let i = 0; i < option.length; i++) {
        res += numberSet.charAt(getIndex(option.length));
    }
    return res;
}

const getIndex = (setLength: number): number => {
    const charIndex: number = parseFloat(Math.random().toFixed(2)) * setLength;
    return charIndex % setLength;
}

export default rs;
