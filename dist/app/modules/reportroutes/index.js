"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./dashboard.route"), exports);
__exportStar(require("./stock-report.route"), exports);
__exportStar(require("./profitloss.route"), exports);
__exportStar(require("./sale-report.route"), exports);
__exportStar(require("./service-revenue.route"), exports);
__exportStar(require("./item-sale-revenue.route"), exports);
__exportStar(require("./tax-report.route"), exports);
//# sourceMappingURL=index.js.map