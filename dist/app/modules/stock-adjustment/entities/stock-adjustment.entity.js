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
exports.StockAdjustmentLines = void 0;
var typeorm_1 = require("typeorm");
var services_entity_1 = require("../../services/entities/services.entity");
var stock_adjustment_headers_entity_1 = require("./stock-adjustment-headers.entity");
var StockAdjustmentLines = /** @class */ (function () {
    function StockAdjustmentLines() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], StockAdjustmentLines.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], StockAdjustmentLines.prototype, "txnHeaderId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return stock_adjustment_headers_entity_1.StockAdjustmentHeaders; }, {
            onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", stock_adjustment_headers_entity_1.StockAdjustmentHeaders)
    ], StockAdjustmentLines.prototype, "txnHeader", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], StockAdjustmentLines.prototype, "serviceId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return services_entity_1.Services; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", services_entity_1.Services)
    ], StockAdjustmentLines.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], StockAdjustmentLines.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], StockAdjustmentLines.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], StockAdjustmentLines.prototype, "modifiedDate", void 0);
    StockAdjustmentLines = __decorate([
        (0, typeorm_1.Entity)("stock_adjustment_lines")
    ], StockAdjustmentLines);
    return StockAdjustmentLines;
}());
exports.StockAdjustmentLines = StockAdjustmentLines;
//# sourceMappingURL=stock-adjustment.entity.js.map