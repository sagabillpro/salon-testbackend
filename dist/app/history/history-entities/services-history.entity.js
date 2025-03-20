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
exports.ServicesHistory = void 0;
var typeorm_1 = require("typeorm");
var company_entity_1 = require("../../modules/company/entities/company.entity");
var taxes_entity_1 = require("../../modules/taxes/entities/taxes.entity");
var entities_1 = require("../../modules/general-data/entities");
var user_entity_1 = require("../../modules/auth/entities/user.entity");
var ServicesHistory = /** @class */ (function () {
    function ServicesHistory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "recordId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], ServicesHistory.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], ServicesHistory.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "itemTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DItemType; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DItemType)
    ], ServicesHistory.prototype, "itemType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, unique: false }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "inStockId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "taxAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "isService", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], ServicesHistory.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], ServicesHistory.prototype, "imageUrls", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
        __metadata("design:type", Boolean)
    ], ServicesHistory.prototype, "isFeatured", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], ServicesHistory.prototype, "sku", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "decimal",
            precision: 3,
            scale: 2,
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], ServicesHistory.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], ServicesHistory.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], ServicesHistory.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)({ nullable: true }),
        __metadata("design:type", Number)
    ], ServicesHistory.prototype, "version", void 0);
    ServicesHistory = __decorate([
        (0, typeorm_1.Entity)("services_history")
    ], ServicesHistory);
    return ServicesHistory;
}());
exports.ServicesHistory = ServicesHistory;
//# sourceMappingURL=services-history.entity.js.map