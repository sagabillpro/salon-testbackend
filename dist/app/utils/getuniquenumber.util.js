"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateUniqueNumber;
function generateUniqueNumber() {
    var date = new Date();
    var datePart = "".concat(date.getFullYear()).concat((date.getMonth() + 1)
        .toString()
        .padStart(2, "0")).concat(date.getDate().toString().padStart(2, "0"));
    var timePart = "".concat(date.getHours().toString().padStart(2, "0")).concat(date
        .getMinutes()
        .toString()
        .padStart(2, "0")).concat(date.getSeconds().toString().padStart(2, "0")).concat(date
        .getMilliseconds()
        .toString()
        .padStart(3, "0"));
    var randomPart = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0"); // 3-digit random number
    return "".concat(datePart).concat(timePart).concat(randomPart);
}
//# sourceMappingURL=getuniquenumber.util.js.map