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
exports.UserSessions = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var UserSessions = /** @class */ (function () {
    function UserSessions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], UserSessions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.Users; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.Users)
    ], UserSessions.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: false }),
        __metadata("design:type", String)
    ], UserSessions.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], UserSessions.prototype, "isInactive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], UserSessions.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], UserSessions.prototype, "modifiedDate", void 0);
    UserSessions = __decorate([
        (0, typeorm_1.Entity)("user_sessions")
    ], UserSessions);
    return UserSessions;
}());
exports.UserSessions = UserSessions;
//# sourceMappingURL=user-sessions.entity.js.map