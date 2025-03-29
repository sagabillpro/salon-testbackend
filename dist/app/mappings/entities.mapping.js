"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
var customer_entity_1 = require("../modules/customer/entities/customer.entity");
var entities_1 = require("../modules/general-data/entities");
var item_description_enity_1 = require("../modules/items/entities/item-description.enity");
var item_images_entity_1 = require("../modules/items/entities/item-images.entity");
var items_entity_1 = require("../modules/items/entities/items.entity");
var feature_setting_entity_1 = require("../modules/fetaure-settings/entities/feature-setting.entity");
var feature_codes_entity_1 = require("../modules/fetaure-settings/entities/feature-codes.entity");
var user_sessions_entity_1 = require("../modules/auth/entities/user-sessions.entity");
var user_entity_1 = require("../modules/auth/entities/user.entity");
var sale_header_entity_1 = require("../modules/sale-items/entities/sale-header.entity");
var sale_lines_enity_1 = require("../modules/sale-items/entities/sale-lines.enity");
var taxes_entity_1 = require("../modules/taxes/entities/taxes.entity");
var purchase_headers_entity_1 = require("../modules/purchase-items/entities/purchase-headers.entity");
var purchase_lines_entity_1 = require("../modules/purchase-items/entities/purchase-lines.entity");
var inventory_lines_entity_1 = require("../modules/sale-items/entities/inventory-lines.entity");
var supplier_entity_1 = require("../modules/suppliers/entities/supplier.entity");
var item_stocks_entity_1 = require("../modules/sale-items/entities/item-stocks.entity");
var services_entity_1 = require("../modules/services/entities/services.entity");
var item_stock_track_entity_1 = require("../modules/purchase-items/entities/item-stock-track.entity");
var contact_entity_1 = require("../modules/contacts/entities/contact.entity");
var branches_entity_1 = require("../modules/branches/entities/branches.entity");
var company_entity_1 = require("../modules/company/entities/company.entity");
var features_entity_1 = require("../modules/features/entities/features.entity");
var menusandfeatures_entity_1 = require("../modules/features/entities/menusandfeatures.entity");
var usermenufeaturemap_entity_1 = require("../modules/features/entities/usermenufeaturemap.entity");
var role_entity_1 = require("../modules/roles/entities/role.entity");
var history_entities_1 = require("../history/history-entities");
var stock_adjustment_headers_entity_1 = require("../modules/stock-adjustment/entities/stock-adjustment-headers.entity");
var stock_adjustment_lines_entity_1 = require("../modules/stock-adjustment/entities/stock-adjustment-lines.entity");
var company_coupons_entity_1 = require("../modules/send-coupouns/entities/company-coupons.entity");
var coupons_list_entity_1 = require("../modules/send-coupouns/entities/coupons-list.entity");
var uom_entity_1 = require("../modules/uom/entities/uom.entity");
var tax_groups_entity_1 = require("../modules/taxes/entities/tax-groups.entity");
var taxes_new_entity_1 = require("../modules/taxes/entities/taxes-new.entity");
var tax_group_compnents_entity_1 = require("../modules/taxes/entities/tax-group-compnents.entity");
var customer_visits_entity_1 = require("../modules/sale-items/entities/customer-visits.entity");
exports.entities = [
    items_entity_1.Item,
    item_images_entity_1.ItemImage,
    item_description_enity_1.ItemDescription,
    entities_1.City,
    entities_1.Country,
    entities_1.States,
    entities_1.DUserType,
    entities_1.DPaymentType,
    entities_1.DFeatureType,
    customer_entity_1.Customer,
    feature_setting_entity_1.FeatureSettings,
    entities_1.Menus,
    feature_codes_entity_1.FeatureCodes,
    user_sessions_entity_1.UserSessions,
    user_entity_1.Users,
    services_entity_1.Services,
    sale_header_entity_1.SaleHeaders,
    sale_lines_enity_1.SaleLines,
    taxes_entity_1.Taxes,
    purchase_headers_entity_1.PurchaseHeaders,
    purchase_lines_entity_1.PurchaseLines,
    inventory_lines_entity_1.InventoryLines,
    supplier_entity_1.Supplier,
    item_stocks_entity_1.ItemAvailable,
    entities_1.DItemType,
    item_stock_track_entity_1.ItemsStockTrack,
    entities_1.DContactType,
    contact_entity_1.Contact,
    entities_1.DDateRangeType,
    branches_entity_1.Branch,
    company_entity_1.Company,
    features_entity_1.Feature,
    menusandfeatures_entity_1.MenusAndFeatures,
    usermenufeaturemap_entity_1.UserMenusAndFeatures,
    role_entity_1.Role,
    entities_1.DIndustryType,
    entities_1.DTransactionStatus,
    history_entities_1.CompanyHistory,
    history_entities_1.ContactHistory,
    history_entities_1.UsersHistory,
    history_entities_1.ServicesHistory,
    stock_adjustment_headers_entity_1.StockAdjustmentHeaders,
    stock_adjustment_lines_entity_1.StockAdjustmentLines,
    entities_1.DCoupounType,
    company_coupons_entity_1.CompanyCoupouns,
    coupons_list_entity_1.CoupounsList,
    uom_entity_1.UOM,
    tax_groups_entity_1.TaxGroup,
    taxes_new_entity_1.TaxNew,
    tax_group_compnents_entity_1.TaxGroupComponent,
    customer_visits_entity_1.CustomerVisit
    // Array.isArray(historyEntities)&& historyEntities?.map((entity) => entity)
];
//# sourceMappingURL=entities.mapping.js.map