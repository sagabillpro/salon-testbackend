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
exports.ItemsStockTrack = void 0;
var typeorm_1 = require("typeorm");
var services_entity_1 = require("../../services/entities/services.entity");
var ItemsStockTrack = /** @class */ (function () {
    function ItemsStockTrack() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], ItemsStockTrack.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return services_entity_1.Services; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", services_entity_1.Services)
    ], ItemsStockTrack.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", nullable: true }),
        __metadata("design:type", Number)
    ], ItemsStockTrack.prototype, "unitPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ItemsStockTrack.prototype, "stockNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], ItemsStockTrack.prototype, "quantityAdded", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], ItemsStockTrack.prototype, "quantityUvailable", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ItemsStockTrack.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ItemsStockTrack.prototype, "modifiedDate", void 0);
    ItemsStockTrack = __decorate([
        (0, typeorm_1.Entity)("items_stock_track")
    ], ItemsStockTrack);
    return ItemsStockTrack;
}());
exports.ItemsStockTrack = ItemsStockTrack;
//# sourceMappingURL=item-stock-track.entity.js.map