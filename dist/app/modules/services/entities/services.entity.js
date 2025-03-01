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
exports.Services = void 0;
var typeorm_1 = require("typeorm");
var taxes_entity_1 = require("../../taxes/entities/taxes.entity");
var entities_1 = require("../../general-data/entities");
var item_stocks_entity_1 = require("../../sale-items/entities/item-stocks.entity");
var Services = /** @class */ (function () {
    function Services() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Services.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Services.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }, { nullable: false }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], Services.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DItemType; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DItemType)
    ], Services.prototype, "itemType", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return item_stocks_entity_1.ItemAvailable; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", item_stocks_entity_1.ItemAvailable)
    ], Services.prototype, "inStock", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Services.prototype, "taxAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Services.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Services.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "isService", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Services.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], Services.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], Services.prototype, "imageUrls", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
        __metadata("design:type", Boolean)
    ], Services.prototype, "isFeatured", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "sku", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "decimal",
            precision: 3,
            scale: 2,
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Services.prototype, "rating", void 0);
    Services = __decorate([
        (0, typeorm_1.Entity)("services")
    ], Services);
    return Services;
}());
exports.Services = Services;
//# sourceMappingURL=services.entity.js.map