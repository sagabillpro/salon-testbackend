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
exports.CoupounsList = void 0;
var typeorm_1 = require("typeorm");
var company_coupons_entity_1 = require("./company-coupons.entity");
var CoupounsList = /** @class */ (function () {
    function CoupounsList() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], CoupounsList.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], CoupounsList.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], CoupounsList.prototype, "couponId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_coupons_entity_1.CompanyCoupouns; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_coupons_entity_1.CompanyCoupouns)
    ], CoupounsList.prototype, "coupon", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], CoupounsList.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], CoupounsList.prototype, "createdDate", void 0);
    CoupounsList = __decorate([
        (0, typeorm_1.Entity)("coupouns_list")
    ], CoupounsList);
    return CoupounsList;
}());
exports.CoupounsList = CoupounsList;
//# sourceMappingURL=coupons-list.entity.js.map