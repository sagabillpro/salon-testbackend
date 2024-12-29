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
exports.Menus = void 0;
var typeorm_1 = require("typeorm");
var feature_setting_entity_1 = require("../../fetaure-settings/entities/feature-setting.entity");
var Menus = exports.Menus = /** @class */ (function () {
    function Menus() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Menus.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Menus.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Menus.prototype, "icon", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Menus.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], Menus.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Menus.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Menus.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return feature_setting_entity_1.FeatureSettings; }, function (feature) { return feature.menu; }),
        __metadata("design:type", Array)
    ], Menus.prototype, "features", void 0);
    Menus = __decorate([
        (0, typeorm_1.Entity)("menus")
    ], Menus);
    return Menus;
}());
//# sourceMappingURL=menus.entity.js.map