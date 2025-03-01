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
exports.PurchaseHeaders = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../auth/entities/user.entity");
var entities_1 = require("../../general-data/entities");
var purchase_lines_entity_1 = require("./purchase-lines.entity");
var inventory_lines_entity_1 = require("../../sale-items/entities/inventory-lines.entity");
var contact_entity_1 = require("../../contacts/entities/contact.entity");
var PurchaseHeaders = /** @class */ (function () {
    function PurchaseHeaders() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], PurchaseHeaders.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 600, nullable: true }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "txnDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "saleInvoiceNumber", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return contact_entity_1.Contact; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", contact_entity_1.Contact)
    ], PurchaseHeaders.prototype, "supplier", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], PurchaseHeaders.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DPaymentType; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DPaymentType)
    ], PurchaseHeaders.prototype, "paymentType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseHeaders.prototype, "subTotal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseHeaders.prototype, "grandTotal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseHeaders.prototype, "totalDiscount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseHeaders.prototype, "totalTax", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], PurchaseHeaders.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return purchase_lines_entity_1.PurchaseLines; }, function (line) { return line.txnHeader; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], PurchaseHeaders.prototype, "purchaseLines", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return inventory_lines_entity_1.InventoryLines; }, function (line) { return line.purchase; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], PurchaseHeaders.prototype, "inventoryLines", void 0);
    PurchaseHeaders = __decorate([
        (0, typeorm_1.Entity)("purchase_headers")
    ], PurchaseHeaders);
    return PurchaseHeaders;
}());
exports.PurchaseHeaders = PurchaseHeaders;
//# sourceMappingURL=purchase-headers.entity.js.map