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
exports.SaleLines = void 0;
var typeorm_1 = require("typeorm");
var sale_header_entity_1 = require("./sale-header.entity");
var services_entity_1 = require("../../services/entities/services.entity");
var taxes_entity_1 = require("../../taxes/entities/taxes.entity");
var SaleLines = /** @class */ (function () {
    function SaleLines() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return sale_header_entity_1.SaleHeaders; }, {
            onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", sale_header_entity_1.SaleHeaders)
    ], SaleLines.prototype, "txnHeader", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return services_entity_1.Services; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", services_entity_1.Services)
    ], SaleLines.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], SaleLines.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", nullable: true }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "unitPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "discountAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], SaleLines.prototype, "taxAmount", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], SaleLines.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], SaleLines.prototype, "modifiedDate", void 0);
    SaleLines = __decorate([
        (0, typeorm_1.Entity)("sale_lines")
    ], SaleLines);
    return SaleLines;
}());
exports.SaleLines = SaleLines;
// const data: SaleLines = {
//   amount: 11,
//   createdDate: "",
//   discountAmount: 3,
//   id: "new1732509039842ci28gux",
//   modifiedDate: "",
//   quantity: 1,
//   rate: 12,
//   service: { id: 5, name: "Trimming" },
//   tax: { id: 1, percentage: 18 },
//   taxAmount: 2,
//   txnHeader: { id: 0 },
// };
//# sourceMappingURL=sale-lines.enity.js.map