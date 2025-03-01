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
    ], Company.prototype, "companyName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "registrationNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Company.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "phoneNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "website", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine2", void 0);
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
        (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "annualRevenue", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true }),
        __metadata("design:type", Date)
    ], Company.prototype, "foundedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: ["Active", "Inactive"], default: "Active" }),
        __metadata("design:type", String)
    ], Company.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Company.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Company.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return branches_entity_1.Branch; }, function (line) { return line.company; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "branches", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Company.prototype, "isInactive", void 0);
    Company = __decorate([
        (0, typeorm_1.Entity)("company")
    ], Company);
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map