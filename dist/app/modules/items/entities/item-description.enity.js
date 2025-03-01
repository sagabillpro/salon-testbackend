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
exports.ItemDescription = void 0;
var typeorm_1 = require("typeorm");
var items_entity_1 = require("./items.entity");
var ItemDescription = /** @class */ (function () {
    function ItemDescription() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ItemDescription.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], ItemDescription.prototype, "label", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true }),
        __metadata("design:type", String)
    ], ItemDescription.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], ItemDescription.prototype, "descriptionTypeId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", String)
    ], ItemDescription.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", String)
    ], ItemDescription.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], ItemDescription.prototype, "revisionNumber", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return items_entity_1.Item; }, function (item) { return item.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "itemId" }),
        __metadata("design:type", items_entity_1.Item)
    ], ItemDescription.prototype, "item", void 0);
    ItemDescription = __decorate([
        (0, typeorm_1.Entity)("item_description")
    ], ItemDescription);
    return ItemDescription;
}());
exports.ItemDescription = ItemDescription;
//# sourceMappingURL=item-description.enity.js.map