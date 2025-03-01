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
exports.PurchaseLines = void 0;
var typeorm_1 = require("typeorm");
var services_entity_1 = require("../../services/entities/services.entity");
var taxes_entity_1 = require("../../taxes/entities/taxes.entity");
var purchase_headers_entity_1 = require("./purchase-headers.entity");
var PurchaseLines = /** @class */ (function () {
    function PurchaseLines() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return purchase_headers_entity_1.PurchaseHeaders; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", purchase_headers_entity_1.PurchaseHeaders)
    ], PurchaseLines.prototype, "txnHeader", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return services_entity_1.Services; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", services_entity_1.Services)
    ], PurchaseLines.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], PurchaseLines.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "unitPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "discountAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], PurchaseLines.prototype, "taxAmount", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], PurchaseLines.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], PurchaseLines.prototype, "modifiedDate", void 0);
    PurchaseLines = __decorate([
        (0, typeorm_1.Entity)("purchase_lines")
    ], PurchaseLines);
    return PurchaseLines;
}());
exports.PurchaseLines = PurchaseLines;
//# sourceMappingURL=purchase-lines.entity.js.map