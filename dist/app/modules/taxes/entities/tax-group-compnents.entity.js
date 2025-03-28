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
exports.TaxGroupComponent = void 0;
var typeorm_1 = require("typeorm");
var tax_groups_entity_1 = require("./tax-groups.entity");
var TaxGroupComponent = /** @class */ (function () {
    function TaxGroupComponent() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaxGroupComponent.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "tax_group_id" }),
        __metadata("design:type", Number)
    ], TaxGroupComponent.prototype, "taxGroupId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return tax_groups_entity_1.TaxGroup; }, function (taxGroup) { return taxGroup.components; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "tax_group_id" }),
        __metadata("design:type", tax_groups_entity_1.TaxGroup)
    ], TaxGroupComponent.prototype, "taxGroup", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
        __metadata("design:type", String)
    ], TaxGroupComponent.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: false }),
        __metadata("design:type", Number)
    ], TaxGroupComponent.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: false, name: "region_type" }),
        __metadata("design:type", String)
    ], TaxGroupComponent.prototype, "regionType", void 0);
    TaxGroupComponent = __decorate([
        (0, typeorm_1.Entity)({ name: "tax_group_components" })
    ], TaxGroupComponent);
    return TaxGroupComponent;
}());
exports.TaxGroupComponent = TaxGroupComponent;
//# sourceMappingURL=tax-group-compnents.entity.js.map