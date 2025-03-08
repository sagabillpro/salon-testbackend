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
exports.UserMenusAndFeatures = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../auth/entities/user.entity");
var features_entity_1 = require("./features.entity");
var feature_setting_entity_1 = require("../../fetaure-settings/entities/feature-setting.entity");
var role_entity_1 = require("../../roles/entities/role.entity");
var UserMenusAndFeatures = /** @class */ (function () {
    function UserMenusAndFeatures() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], UserMenusAndFeatures.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }, { nullable: true, onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], UserMenusAndFeatures.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return feature_setting_entity_1.FeatureSettings; }, { nullable: false, onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", feature_setting_entity_1.FeatureSettings)
    ], UserMenusAndFeatures.prototype, "entity", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return features_entity_1.Feature; }, { nullable: false, onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", features_entity_1.Feature)
    ], UserMenusAndFeatures.prototype, "feature", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_entity_1.Role; }, { nullable: true, onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", role_entity_1.Role)
    ], UserMenusAndFeatures.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], UserMenusAndFeatures.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], UserMenusAndFeatures.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], UserMenusAndFeatures.prototype, "isSystem", void 0);
    UserMenusAndFeatures = __decorate([
        (0, typeorm_1.Entity)(""),
        (0, typeorm_1.Unique)(["user", "entity", "feature"]) // Ensures uniqueness for a user-menu-feature combination
    ], UserMenusAndFeatures);
    return UserMenusAndFeatures;
}());
exports.UserMenusAndFeatures = UserMenusAndFeatures;
//# sourceMappingURL=usermenufeaturemap.entity.js.map