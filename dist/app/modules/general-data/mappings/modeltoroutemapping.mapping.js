"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeToEntityMap = void 0;
var entities_1 = require("../entities");
var taxes_new_entity_1 = require("../../taxes/entities/taxes-new.entity");
var tax_groups_entity_1 = require("../../taxes/entities/tax-groups.entity");
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
    "/industry-types": entities_1.DIndustryType,
    "/transaction-status": entities_1.DTransactionStatus,
    "/coupons-types": entities_1.DCoupounType,
    "/taxes-new": taxes_new_entity_1.TaxNew,
    "/tax-groups": tax_groups_entity_1.TaxGroup,
};
//# sourceMappingURL=modeltoroutemapping.mapping.js.map