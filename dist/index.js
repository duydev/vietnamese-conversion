"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicodeToVNI = void 0;
var charsets_1 = require("./charsets");
function unicodeToVNI(text) {
    var countChars = charsets_1.UNICODE.length;
    var tmpText = text;
    for (var i = 0; i < countChars; i++) {
        var char = charsets_1.UNICODE[i];
        var re = new RegExp(char, 'g');
        tmpText = tmpText.replace(re, "::" + i + "::");
    }
    for (var i = 0; i < countChars; i++) {
        var char = charsets_1.VNI[i];
        var re = new RegExp("::" + i + "::", 'g');
        tmpText = tmpText.replace(re, char);
    }
    return tmpText;
}
exports.unicodeToVNI = unicodeToVNI;
