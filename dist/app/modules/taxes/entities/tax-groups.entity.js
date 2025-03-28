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
exports.TaxGroup = void 0;
var typeorm_1 = require("typeorm");
var taxes_new_entity_1 = require("./taxes-new.entity");
var tax_group_compnents_entity_1 = require("./tax-group-compnents.entity");
var TaxGroup = /** @class */ (function () {
    function TaxGroup() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaxGroup.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "tax_id" }),
        __metadata("design:type", Number)
    ], TaxGroup.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_new_entity_1.TaxNew; }, function (tax) { return tax.taxGroups; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "tax_id" }),
        __metadata("design:type", taxes_new_entity_1.TaxNew)
    ], TaxGroup.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
        __metadata("design:type", String)
    ], TaxGroup.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: false }),
        __metadata("design:type", Number)
    ], TaxGroup.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return tax_group_compnents_entity_1.TaxGroupComponent; }, function (component) { return component.taxGroup; }),
        __metadata("design:type", Array)
    ], TaxGroup.prototype, "components", void 0);
    TaxGroup = __decorate([
        (0, typeorm_1.Entity)({ name: "tax_groups" })
    ], TaxGroup);
    return TaxGroup;
}());
exports.TaxGroup = TaxGroup;
//# sourceMappingURL=tax-groups.entity.js.map