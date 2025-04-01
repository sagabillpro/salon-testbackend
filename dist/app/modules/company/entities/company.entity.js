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
exports.Company = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var branches_entity_1 = require("../../branches/entities/branches.entity");
var user_entity_1 = require("../../auth/entities/user.entity");
var taxes_new_entity_1 = require("../../taxes/entities/taxes-new.entity");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Company.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "logo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "signature", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "registrationNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "phoneNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "website", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "upiId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "gstInNo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "tagLine", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "cityId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "createdById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "modifiedById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "stateId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "countryId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "postalCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "industryType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "numberOfEmployees", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Company.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Company.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Company.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_new_entity_1.TaxNew; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", taxes_new_entity_1.TaxNew)
    ], Company.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return branches_entity_1.Branch; }, function (line) { return line.company; }, {
            cascade: ["soft-remove"],
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "branches", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], Company.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], Company.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], Company.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Company.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Company.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], Company.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)({ nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "version", void 0);
    Company = __decorate([
        (0, typeorm_1.Entity)("company")
    ], Company);
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map