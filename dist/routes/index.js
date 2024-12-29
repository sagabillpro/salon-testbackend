"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var express_1 = require("express");
var item_route_1 = __importDefault(require("../routes/item.route"));
var item_description_route_1 = __importDefault(require("../routes/item-description.route"));
var item_images_route_1 = __importDefault(require("../routes/item-images.route"));
var description_type_route_1 = __importDefault(require("../routes/description-type.route"));
var emails_route_1 = __importDefault(require("../routes/emails.route"));
var router = (0, express_1.Router)();
// Route Middleware
router.use(item_route_1.default);
router.use(item_description_route_1.default);
router.use(item_images_route_1.default);
router.use(description_type_route_1.default);
router.use(emails_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map