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
exports.CustomerVisit = void 0;
var typeorm_1 = require("typeorm");
var CustomerVisit = /** @class */ (function () {
    function CustomerVisit() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], CustomerVisit.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "customer_id" }),
        __metadata("design:type", Number)
    ], CustomerVisit.prototype, "customerId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "company_id" }),
        __metadata("design:type", Number)
    ], CustomerVisit.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date" }),
        __metadata("design:type", Date)
    ], CustomerVisit.prototype, "visitDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], CustomerVisit.prototype, "totalSpend", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], CustomerVisit.prototype, "paymentMethod", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 3, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], CustomerVisit.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", array: true }),
        __metadata("design:type", Array)
    ], CustomerVisit.prototype, "services", void 0);
    CustomerVisit = __decorate([
        (0, typeorm_1.Entity)("customer_visits")
    ], CustomerVisit);
    return CustomerVisit;
}());
exports.CustomerVisit = CustomerVisit;
//# sourceMappingURL=customer-visits.entity.js.map