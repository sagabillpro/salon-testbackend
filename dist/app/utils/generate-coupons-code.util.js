"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCouponCode = generateCouponCode;
function generateCouponCode(length) {
    if (length === void 0) { length = 10; }
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var couponCode = '';
    for (var i = 0; i < length; i++) {
        couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return couponCode;
}
//# sourceMappingURL=generate-coupons-code.util.js.map