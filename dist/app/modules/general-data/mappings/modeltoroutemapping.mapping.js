"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeToEntityMap = void 0;
var entities_1 = require("../entities");
exports.routeToEntityMap = {
    "/user-types": entities_1.DUserType,
    "/feature-types": entities_1.DFeatureType,
    "/payment-types": entities_1.DPaymentType,
    "/cities": entities_1.City,
    "/states": entities_1.States,
    "/countries": entities_1.Country,
    "/menus": entities_1.Menus,
    "/item-types": entities_1.DItemType,
    "/contact-types": entities_1.DContactType,
    "/date-range-types": entities_1.DDateRangeType,
};
//# sourceMappingURL=modeltoroutemapping.mapping.js.map