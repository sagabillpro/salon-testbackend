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
exports.Contact = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var user_entity_1 = require("../../auth/entities/user.entity");
var company_entity_1 = require("../../company/entities/company.entity");
var Contact = /** @class */ (function () {
    function Contact() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Contact.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Contact.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], Contact.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "stateId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], Contact.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "countryId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], Contact.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "cityId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], Contact.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "contactTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DContactType; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DContactType)
    ], Contact.prototype, "contactType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "referedById", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Contact; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Contact)
    ], Contact.prototype, "referedBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "date", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "birthDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "date", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "anniverseryDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Contact.prototype, "mobile", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "zipCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Contact.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Contact.prototype, "lastVisitedDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Contact.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Contact.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)({ nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "version", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "createdById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Contact.prototype, "modifiedById", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Contact.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Contact.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], Contact.prototype, "deletedAt", void 0);
    Contact = __decorate([
        (0, typeorm_1.Entity)("contacts")
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map