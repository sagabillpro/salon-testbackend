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
exports.FeatureSettings = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var menusandfeatures_entity_1 = require("../../features/entities/menusandfeatures.entity");
var FeatureSettings = /** @class */ (function () {
    function FeatureSettings() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "route", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "displayName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "fixedCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "menuId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Menus; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Menus)
    ], FeatureSettings.prototype, "menu", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "featureTypeId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DFeatureType; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DFeatureType)
    ], FeatureSettings.prototype, "featureType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "isAdminMenu", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], FeatureSettings.prototype, "isAddOnlyAdmin", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], FeatureSettings.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menusandfeatures_entity_1.MenusAndFeatures; }, function (line) { return line.entity; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], FeatureSettings.prototype, "menusAndFeatures", void 0);
    FeatureSettings = __decorate([
        (0, typeorm_1.Entity)("feature_settings")
    ], FeatureSettings);
    return FeatureSettings;
}());
exports.FeatureSettings = FeatureSettings;
//# sourceMappingURL=feature-setting.entity.js.map