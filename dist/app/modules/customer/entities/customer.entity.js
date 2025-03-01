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
exports.Customer = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Customer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Customer.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], Customer.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], Customer.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], Customer.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "birthDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Customer.prototype, "mobile", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Customer.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "lastVisitedDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Customer.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Customer.prototype, "modifiedDate", void 0);
    Customer = __decorate([
        (0, typeorm_1.Entity)("customers")
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map