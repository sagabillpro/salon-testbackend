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
exports.TaxNew = void 0;
var typeorm_1 = require("typeorm");
var tax_groups_entity_1 = require("./tax-groups.entity");
var TaxNew = /** @class */ (function () {
    function TaxNew() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaxNew.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
        __metadata("design:type", String)
    ], TaxNew.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
        __metadata("design:type", Boolean)
    ], TaxNew.prototype, "isBifurcatable", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return tax_groups_entity_1.TaxGroup; }, function (taxGroup) { return taxGroup.tax; }),
        __metadata("design:type", Array)
    ], TaxNew.prototype, "taxGroups", void 0);
    TaxNew = __decorate([
        (0, typeorm_1.Entity)({ name: "taxes_new" })
    ], TaxNew);
    return TaxNew;
}());
exports.TaxNew = TaxNew;
//# sourceMappingURL=taxes-new.entity.js.map