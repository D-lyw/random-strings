var rs=function(){"use strict";var e,t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";!function(e){e[e.number=0]="number",e[e.string=1]="string",e[e.base64=2]="base64",e[e.hex=3]="hex",e[e.alphanumeric=4]="alphanumeric",e[e.password=5]="password",e[e.customized=6]="customized"}(e||(e={}));var r=function(e,t){0!==t.length&&t.trim().split("").map((function(t){if(!e.includes(t))throw new Error("excludeCharSet must be in the assigned type set...");var r=e.indexOf(t);e.splice(r,1)}))},a=function(e,t){for(var r="",a=0;a<e;a++){r+=t[n(t.length)]}return r},n=function(e){var t=parseFloat(Math.random().toFixed(2))*e;return Math.floor(t%e)};return function(n){var s,i=void 0===n?{}:n,o=i.type,c=void 0===o?"number":o,l=i.length,u=void 0===l?8:l,d=i.capitalization,h=void 0!==d&&d,p=i.excludeCharSet,b=void 0===p?"":p,m=i.charactorSet,f=void 0===m?[]:m;switch(e[c]){case e.number:s="0123456789".split("");break;case e.base64:s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=".split("");break;case e.hex:s="0123456789abcdef".split("");break;case e.string:s="abcdefghijklmnopqrstuvwxyz".split(""),h&&(s=s.concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")));break;case e.alphanumeric:s=t.split("");break;case e.password:u<8&&console.warn("strongly recommended that the password length be no less than 8"),s=("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"+t).split("");break;case e.customized:s=f.join("").split("");break;default:throw new Error("the assigned type is not recognizable")}return r(s,b),a(u,s)}}();