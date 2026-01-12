"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_admin_middleware_1 = require("../auth/auth.admin.middleware");
const validators_1 = require("../../utils/validators");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.auth, auth_admin_middleware_1.adminOnly, validators_1.createCategoryValidation, category_controller_1.CategoryController.create);
router.get("/", category_controller_1.CategoryController.getAll);
router.put("/:id", auth_middleware_1.auth, auth_admin_middleware_1.adminOnly, (0, validators_1.mongoIdValidation)("id"), validators_1.updateCategoryValidation, category_controller_1.CategoryController.update);
router.delete("/:id", auth_middleware_1.auth, auth_admin_middleware_1.adminOnly, (0, validators_1.mongoIdValidation)("id"), category_controller_1.CategoryController.delete);
exports.default = router;
//# sourceMappingURL=category.routes.js.map