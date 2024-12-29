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
exports.Item = void 0;
var typeorm_1 = require("typeorm");
var item_images_entity_1 = require("./item-images.entity");
var item_description_enity_1 = require("./item-description.enity");
var Item = /** @class */ (function () {
    function Item() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Item.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], Item.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Item.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Item.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Item.prototype, "salePrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Item.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, }),
        __metadata("design:type", String)
    ], Item.prototype, "dimension", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Item.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Item.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], Item.prototype, "revisionNumber", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return item_images_entity_1.ItemImage; }, function (itemImage) { return itemImage.item; }),
        __metadata("design:type", Array)
    ], Item.prototype, "itemImage", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return item_description_enity_1.ItemDescription; }, function (itemDescription) { return itemDescription.item; }),
        __metadata("design:type", Array)
    ], Item.prototype, "itemDescription", void 0);
    Item = __decorate([
        (0, typeorm_1.Entity)("items")
    ], Item);
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map