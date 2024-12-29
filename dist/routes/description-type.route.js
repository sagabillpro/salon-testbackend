"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
var express_1 = require("express");
var decscription_type_controller_1 = __importDefault(require("../controllers/decscription-type.controller"));
var middlewares_1 = require("../middlewares");
var description_type_schema_1 = require("../schema/description-type.schema");
var router = (0, express_1.Router)();
// Public route
router.get('/descriptions-types', decscription_type_controller_1.default.find);
// Protected route (requires authentication)
router.get('/descriptions-types/:id', decscription_type_controller_1.default.findById);
// Create new user
router.post('/descriptions-types', (0, middlewares_1.checkRequest)(description_type_schema_1.DescriptionTypes), decscription_type_controller_1.default.create);
// Update user
router.put('/descriptions-types/:id', decscription_type_controller_1.default.updateById);
// Delete user
router.delete('/descriptions-types/:id', decscription_type_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=description-type.route.js.map