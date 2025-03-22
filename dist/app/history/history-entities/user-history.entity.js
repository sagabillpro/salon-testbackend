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
exports.UsersHistory = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../modules/general-data/entities");
var company_entity_1 = require("../../modules/company/entities/company.entity");
var UsersHistory = /** @class */ (function () {
    function UsersHistory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "recordId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false, }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "userName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "userTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DUserType; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DUserType)
    ], UsersHistory.prototype, "userType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "companyId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return company_entity_1.Company; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", company_entity_1.Company)
    ], UsersHistory.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "birthDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "mobile", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], UsersHistory.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], UsersHistory.prototype, "deletedAt", void 0);
    __decorate([
        (0, typeorm_1.VersionColumn)({ nullable: true }),
        __metadata("design:type", Number)
    ], UsersHistory.prototype, "version", void 0);
    UsersHistory = __decorate([
        (0, typeorm_1.Entity)("users_history")
    ], UsersHistory);
    return UsersHistory;
}());
exports.UsersHistory = UsersHistory;
//# sourceMappingURL=user-history.entity.js.map