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
exports.ContactHistory = void 0;
var typeorm_1 = require("typeorm");
var company_entity_1 = require("../../modules/company/entities/company.entity");
var entities_1 = require("../../modules/general-data/entities");
var user_entity_1 = require("../../modules/auth/entities/user.entity");
var ContactHistory = /** @class */ (function () {
    function ContactHistory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "recordId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], ContactHistory.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], ContactHistory.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], ContactHistory.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], ContactHistory.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "contactTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DContactType; }, { nullable: false }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DContactType)
    ], ContactHistory.prototype, "contactType", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "birthDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "mobile", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "zipCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "lastVisitedDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], ContactHistory.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)(),
        __metadata("design:type", Number)
    ], ContactHistory.prototype, "version", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], ContactHistory.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], ContactHistory.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], ContactHistory.prototype, "deletedAt", void 0);
    ContactHistory = __decorate([
        (0, typeorm_1.Entity)("contacts_history")
    ], ContactHistory);
    return ContactHistory;
}());
exports.ContactHistory = ContactHistory;
//# sourceMappingURL=contact-history.entity.js.map