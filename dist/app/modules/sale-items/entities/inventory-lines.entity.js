"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLines = void 0;
var typeorm_1 = require("typeorm");
var sale_header_entity_1 = require("./sale-header.entity");
var services_entity_1 = require("../../services/entities/services.entity");
var purchase_headers_entity_1 = require("../../purchase-items/entities/purchase-headers.entity");
var item_stock_track_entity_1 = require("../../purchase-items/entities/item-stock-track.entity");
var InventoryLines = /** @class */ (function () {
    function InventoryLines() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], InventoryLines.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return purchase_headers_entity_1.PurchaseHeaders; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", purchase_headers_entity_1.PurchaseHeaders)
    ], InventoryLines.prototype, "purchase", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return item_stock_track_entity_1.ItemsStockTrack; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", item_stock_track_entity_1.ItemsStockTrack)
    ], InventoryLines.prototype, "stock", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return services_entity_1.Services; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", services_entity_1.Services)
    ], InventoryLines.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return sale_header_entity_1.SaleHeaders; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", sale_header_entity_1.SaleHeaders)
    ], InventoryLines.prototype, "sale", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], InventoryLines.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], InventoryLines.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], InventoryLines.prototype, "modifiedDate", void 0);
    InventoryLines = __decorate([
        (0, typeorm_1.Entity)("inventory_lines")
    ], InventoryLines);
    return InventoryLines;
}());
exports.InventoryLines = InventoryLines;
//# sourceMappingURL=inventory-lines.entity.js.map