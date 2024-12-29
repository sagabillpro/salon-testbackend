"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
var express_1 = require("express");
var emails_controller_1 = __importDefault(require("../controllers/emails.controller"));
var middlewares_1 = require("../middlewares");
var schema_1 = require("../schema");
var router = (0, express_1.Router)();
// // Public route
// router.get("/item-images", itemController.find);
// // Protected route (requires authentication)
// router.get("/item-images/:id", itemController.findById);
// Create new user
router.post("/user-enquiries", (0, middlewares_1.checkRequest)(schema_1.UserInquiry), emails_controller_1.default.create);
// // Update user
// router.put("/item-images/:id", itemController.updateById);
// // Delete user
// router.delete("/item-images/:id", itemController.deleteById);
exports.default = router;
//# sourceMappingURL=emails.route.js.map