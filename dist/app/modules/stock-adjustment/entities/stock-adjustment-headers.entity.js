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
exports.StockAdjustmentHeaders = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../auth/entities/user.entity");
var entities_1 = require("../../general-data/entities");
var inventory_lines_entity_1 = require("../../sale-items/entities/inventory-lines.entity");
var stock_adjustment_lines_entity_1 = require("./stock-adjustment-lines.entity");
var company_entity_1 = require("../../company/entities/company.entity");
var StockAdjustmentHeaders = /** @class */ (function () {
    function StockAdjustmentHeaders() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], StockAdjustmentHeaders.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], StockAdjustmentHeaders.prototype, "txnDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "transactionStatusId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DTransactionStatus; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DTransactionStatus)
    ], StockAdjustmentHeaders.prototype, "transactionStatus", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], StockAdjustmentHeaders.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], StockAdjustmentHeaders.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return inventory_lines_entity_1.InventoryLines; }, function (line) { return line.stockAdjustment; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], StockAdjustmentHeaders.prototype, "inventoryLines", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return stock_adjustment_lines_entity_1.StockAdjustmentLines; }, function (line) { return line.txnHeader; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], StockAdjustmentHeaders.prototype, "stockAdjustmentLines", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "createdById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "modifiedById", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], StockAdjustmentHeaders.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], StockAdjustmentHeaders.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], StockAdjustmentHeaders.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)({ nullable: true }),
        __metadata("design:type", Number)
    ], StockAdjustmentHeaders.prototype, "version", void 0);
    StockAdjustmentHeaders = __decorate([
        (0, typeorm_1.Entity)("stock_adjustment_headers")
    ], StockAdjustmentHeaders);
    return StockAdjustmentHeaders;
}());
exports.StockAdjustmentHeaders = StockAdjustmentHeaders;
//# sourceMappingURL=stock-adjustment-headers.entity.js.map