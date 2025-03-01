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
exports.FeatureCodes = void 0;
var typeorm_1 = require("typeorm");
var feature_setting_entity_1 = require("./feature-setting.entity");
var FeatureCodes = /** @class */ (function () {
    function FeatureCodes() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], FeatureCodes.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], FeatureCodes.prototype, "series", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], FeatureCodes.prototype, "codeNumber", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return feature_setting_entity_1.FeatureSettings; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", feature_setting_entity_1.FeatureSettings)
    ], FeatureCodes.prototype, "feature", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], FeatureCodes.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], FeatureCodes.prototype, "modifiedDate", void 0);
    FeatureCodes = __decorate([
        (0, typeorm_1.Entity)("feature_codes")
    ], FeatureCodes);
    return FeatureCodes;
}());
exports.FeatureCodes = FeatureCodes;
//# sourceMappingURL=feature-codes.entity.js.map