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
exports.Feature = void 0;
var typeorm_1 = require("typeorm");
var Feature = /** @class */ (function () {
    function Feature() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Feature.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Feature.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Feature.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Feature.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Feature.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Feature.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], Feature.prototype, "isInactive", void 0);
    Feature = __decorate([
        (0, typeorm_1.Entity)("features")
    ], Feature);
    return Feature;
}());
exports.Feature = Feature;
//# sourceMappingURL=features.entity.js.map