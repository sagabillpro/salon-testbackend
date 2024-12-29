"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
var express_1 = require("express");
var item_description_controller_1 = __importDefault(require("../controllers/item-description.controller"));
var middlewares_1 = require("../middlewares");
var schema_1 = require("../schema");
var router = (0, express_1.Router)();
// Public route
router.get('/item-descriptions', item_description_controller_1.default.find);
// Protected route (requires authentication)
router.get('/item-descriptions/:id', item_description_controller_1.default.findById);
// Create new user
router.post('/item-descriptions', (0, middlewares_1.checkRequest)(schema_1.ItemDescriptions), item_description_controller_1.default.create);
// Update user
router.put('/item-descriptions/:id', item_description_controller_1.default.updateById);
// Delete user
router.delete('/item-descriptions/:id', item_description_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=item-description.route.js.map