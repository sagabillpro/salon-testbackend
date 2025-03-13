"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_types_1 = require("../../routes/routes.types");
var validate_filter_util_1 = require("../../utils/validate-filter.util");
var get_query_util_1 = __importDefault(require("../../utils/get-query.util"));
var sale_header_service_1 = __importDefault(require("./sale-header.service"));
var sale_header_entity_1 = require("./entities/sale-header.entity");
var validate_req_body_util_1 = require("../../utils/validate-req-body.util");
var sale_header_schema_1 = require("../../schema/sale-header.schema");
var html_pdf_1 = __importDefault(require("html-pdf")); // Or choose puppeteer
// import wkhtmltopdf from "wkhtmltopdf";
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var router = (0, express_1.Router)();
router.get("/", (0, validate_filter_util_1.validateFilter)(sale_header_entity_1.SaleHeaders), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _b = (_a = sale_header_service_1.default).find;
                return [4 /*yield*/, (0, get_query_util_1.default)(req, sale_header_entity_1.SaleHeaders)];
            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
            case 2:
                result = _c.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/", (0, validate_req_body_util_1.validateBodyManual)(sale_header_schema_1.SaleHeadersSchema), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sale_header_service_1.default.create(req.body)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", 
// validateFilter(SaleHeaders),
function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, _a, _b, _c, error_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                id = Number(req.params.id);
                _b = (_a = sale_header_service_1.default).findById;
                _c = [id];
                return [4 /*yield*/, (0, get_query_util_1.default)(req, sale_header_entity_1.SaleHeaders)];
            case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
            case 2:
                result = _d.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _d.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/:id", (0, validate_req_body_util_1.validateBodyManual)(sale_header_schema_1.SaleHeadersSchema), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, sale_header_service_1.default.updateById(id, req.body)];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, sale_header_service_1.default.deleteById(id)];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/bulk", (0, validate_req_body_util_1.validateBodyManual)(sale_header_schema_1.SaleHeadersSchema), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sale_header_service_1.default.createBulk(req.body)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// router.put(
//   "bulk",
//   validateBodyManual(SaleHeadersSchema),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await saleHeaderService.editBulk(req.body);
//       res.send(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
router.get("/download/:id", 
// validateFilter(SaleHeaders),
function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reportData, renderedPath, renderedHtml, options, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = Number(req.params.id);
                return [4 /*yield*/, sale_header_service_1.default.saleInvoiceData(id)];
            case 1:
                reportData = _a.sent();
                renderedPath = path_1.default.join(process.cwd(), "/dist/app/templates", "sale-invoice.template.ejs");
                console.log("renderedPath", renderedPath);
                return [4 /*yield*/, ejs_1.default.renderFile(renderedPath, reportData)];
            case 2:
                renderedHtml = _a.sent();
                options = { format: "A4" };
                html_pdf_1.default.create(renderedHtml, options).toStream(function (err, pdfStream) {
                    if (err) {
                        console.error("PDF generation error:", err);
                        return res.status(500).send("Error generating PDF");
                    }
                    // Set HTTP headers for PDF download
                    res.setHeader("Content-Type", "application/pdf");
                    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
                    // Pipe the PDF stream to the response
                    pdfStream.pipe(res);
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = new routes_types_1.Route("/sale-headers", router);
//# sourceMappingURL=sale-header.routes.js.map