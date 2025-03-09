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
exports.Company = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../../general-data/entities");
var branches_entity_1 = require("../../branches/entities/branches.entity");
var user_entity_1 = require("../../auth/entities/user.entity");
var dbconfig_1 = require("../../../config/dbconfig");
var taxes_entity_1 = require("../../taxes/entities/taxes.entity");
var Company = /** @class */ (function () {
    function Company() {
    }
    Company_1 = Company;
    Company.prototype.generateRecordId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, lastRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.recordId) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, dbconfig_1.handler)()];
                    case 1:
                        dataSource = _a.sent();
                        return [4 /*yield*/, dataSource.getRepository(Company_1).findOne({
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
    var Company_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], Company.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Company.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Company.prototype, "registrationNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "taxId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "taxRecordId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: false }),
        __metadata("design:type", String)
    ], Company.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "phoneNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "website", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "addressLine2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "cityId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "createdById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "modifiedById", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "stateId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Company.prototype, "countryId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "postalCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Company.prototype, "industryType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "numberOfEmployees", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "annualRevenue", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true }),
        __metadata("design:type", Date)
    ], Company.prototype, "foundedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: ["Active", "Inactive"], default: "Active" }),
        __metadata("design:type", String)
    ], Company.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Company.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Company.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Company.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Company.prototype, "recordId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return taxes_entity_1.Taxes; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)([
            { name: "taxRecordId", referencedColumnName: "recordId" },
            { name: "taxId", referencedColumnName: "id" },
        ]),
        __metadata("design:type", taxes_entity_1.Taxes)
    ], Company.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return branches_entity_1.Branch; }, function (line) { return line.company; }, {
            cascade: ["soft-remove"],
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "branches", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.City; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.City)
    ], Company.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.States; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.States)
    ], Company.prototype, "state", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entities_1.Country; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", entities_1.Country)
    ], Company.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Company.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], Company.prototype, "modifiedBy", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Company.prototype, "generateRecordId", null);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)() // 👈 Automatically set when deleted
        ,
        __metadata("design:type", Date)
    ], Company.prototype, "deletedAt", void 0);
    Company = Company_1 = __decorate([
        (0, typeorm_1.Entity)("company"),
        (0, typeorm_1.Unique)(["recordId", "id"])
    ], Company);
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map