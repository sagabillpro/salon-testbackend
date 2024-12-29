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
    entities_1.DDateRangeType
];
//# sourceMappingURL=entities.mapping.js.map