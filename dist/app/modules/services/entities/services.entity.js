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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
var typeorm_1 = require("typeorm");
var taxes_entity_1 = require("../../taxes/entities/taxes.entity");
var entities_1 = require("../../general-data/entities");
var item_stocks_entity_1 = require("../../sale-items/entities/item-stocks.entity");
var user_entity_1 = require("../../auth/entities/user.entity");
var dbconfig_1 = require("../../../config/dbconfig");
var Services = /** @class */ (function () {
    function Services() {
    }
    Services_1 = Services;
    Services.prototype.generateRecordId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, lastRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.recordId) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, dbconfig_1.handler)()];
                    case 1:
                        dataSource = _a.sent();
                        return [4 /*yield*/, dataSource.getRepository(Services_1).findOne({
                                where: {},
                                order: { recordId: "DESC" },
                            })];
                    case 2:
                        lastRecord = _a.sent();
                        this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var Services_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Services.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, unique: true }),
        __metadata("design:type", String)
    ], Services.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "taxRecordId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)([
            { name: "taxRecordId", referencedColumnName: "recordId" },
            { name: "taxId", referencedColumnName: "id" },
        ]),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], Services.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.DItemType; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.DItemType)
    ], Services.prototype, "itemType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "inStockId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "inStockRecordId", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return taxes_entity_1.Taxes; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)([
            { name: "inStockRecordId", referencedColumnName: "recordId" },
            { name: "inStockId", referencedColumnName: "id" },
        ]),
        __metadata("design:type", item_stocks_entity_1.ItemAvailable)
    ], Services.prototype, "inStock", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Services.prototype, "taxAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Services.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Services.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "isService", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Services.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Services.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], Services.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", { nullable: true }),
        __metadata("design:type", Array)
    ], Services.prototype, "imageUrls", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
        __metadata("design:type", Boolean)
    ], Services.prototype, "isFeatured", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true, nullable: true }),
        __metadata("design:type", String)
    ], Services.prototype, "sku", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "decimal",
            precision: 3,
            scale: 2,
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Services.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Services.prototype, "recordId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Services.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Services.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Services.prototype, "generateRecordId", null);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], Services.prototype, "deletedAt", void 0);
    Services = Services_1 = __decorate([
        (0, typeorm_1.Entity)("services"),
        (0, typeorm_1.Unique)(["recordId", "id"])
    ], Services);
    return Services;
}());
exports.Services = Services;
//# sourceMappingURL=services.entity.js.map