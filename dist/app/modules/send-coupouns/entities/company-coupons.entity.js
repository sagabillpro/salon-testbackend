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
exports.CompanyCoupouns = void 0;
var typeorm_1 = require("typeorm");
var company_entity_1 = require("../../company/entities/company.entity");
var entities_1 = require("../../general-data/entities");
var CompanyCoupouns = /** @class */ (function () {
    function CompanyCoupouns() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], CompanyCoupouns.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], CompanyCoupouns.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], CompanyCoupouns.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "discountPer", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], CompanyCoupouns.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "coupounTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DCoupounType; }, { nullable: false }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DCoupounType)
    ], CompanyCoupouns.prototype, "coupounType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "isActiveted", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], CompanyCoupouns.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], CompanyCoupouns.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], CompanyCoupouns.prototype, "modifiedDate", void 0);
    CompanyCoupouns = __decorate([
        (0, typeorm_1.Entity)("company_coupouns")
    ], CompanyCoupouns);
    return CompanyCoupouns;
}());
exports.CompanyCoupouns = CompanyCoupouns;
//# sourceMappingURL=company-coupons.entity.js.map