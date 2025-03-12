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
exports.Branch = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var company_entity_1 = require("../../company/entities/company.entity");
var Branch = /** @class */ (function () {
    function Branch() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Branch.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Branch.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "branchCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Branch.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], Branch.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "addressLine1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "addressLine2", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], Branch.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], Branch.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], Branch.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "postalCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "phoneNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
        __metadata("design:type", String)
    ], Branch.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Branch.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Branch.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Branch.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
        __metadata("design:type", Date)
    ], Branch.prototype, "deletedAt", void 0);
    Branch = __decorate([
        (0, typeorm_1.Entity)("branches")
    ], Branch);
    return Branch;
}());
exports.Branch = Branch;
//# sourceMappingURL=branches.entity.js.map