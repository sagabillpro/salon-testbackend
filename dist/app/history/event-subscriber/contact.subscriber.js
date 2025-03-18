"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ContactSubscriber = void 0;
var typeorm_1 = require("typeorm");
//import { CompanyHistory } from "../history-entities";
var contact_entity_1 = require("../../modules/contacts/entities/contact.entity");
var contact_history_entity_1 = require("../history-entities/contact-history.entity");
var ContactSubscriber = /** @class */ (function () {
    function ContactSubscriber() {
    }
    /**
     * Specifies that this subscriber only listens to Company events.
     */
    ContactSubscriber.prototype.listenTo = function () {
        return contact_entity_1.Contact;
    };
    /**
     * Before a Company entity is updated, capture its current state and insert it into the CompanyHistory table.
     *
     * @param event - The update event triggered by TypeORM.
     */
    ContactSubscriber.prototype.beforeUpdate = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var history_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.entity) return [3 /*break*/, 2];
                        history_1 = new contact_history_entity_1.ContactHistory();
                        history_1.recordId = event.entity.id;
                        history_1.code = event.entity.code;
                        history_1.name = event.entity.name;
                        history_1.companyId = event.entity.companyId;
                        history_1.birthDate = event.entity.birthDate;
                        history_1.mobile = event.entity.mobile;
                        history_1.email = event.entity.email;
                        history_1.address = event.entity.address;
                        history_1.zipCode = event.entity.zipCode;
                        history_1.isInactive = event.entity.isInactive;
                        history_1.lastVisitedDate = event.entity.lastVisitedDate;
                        history_1.createdDate = event.entity.createdDate;
                        history_1.modifiedDate = event.entity.modifiedDate;
                        history_1.version = event.entity.version;
                        history_1.createdBy = event.entity.createdBy;
                        history_1.modifiedBy = event.entity.modifiedBy;
                        // Copy any additional fields from the Company entity as needed.
                        // Use event.manager to insert the history record within the same transaction.
                        // This ensures that the history record will only be created if the update succeeds.
                        return [4 /*yield*/, event.manager.insert(contact_history_entity_1.ContactHistory, history_1)];
                    case 1:
                        // Copy any additional fields from the Company entity as needed.
                        // Use event.manager to insert the history record within the same transaction.
                        // This ensures that the history record will only be created if the update succeeds.
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ContactSubscriber = __decorate([
        (0, typeorm_1.EventSubscriber)()
    ], ContactSubscriber);
    return ContactSubscriber;
}());
exports.ContactSubscriber = ContactSubscriber;
//# sourceMappingURL=contact.subscriber.js.map