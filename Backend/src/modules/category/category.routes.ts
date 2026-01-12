import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../auth/auth.middleware";
import { adminOnly } from "../auth/auth.admin.middleware";
import {
  createCategoryValidation,
  updateCategoryValidation,
  mongoIdValidation,
} from "../../utils/validators";

const router = Router();

router.post(
  "/",
  auth,
  adminOnly,
  createCategoryValidation,
  CategoryController.create
);

router.get(
  "/",
  CategoryController.getAll
);

router.put(
  "/:id",
  auth,
  adminOnly,
  mongoIdValidation("id"),
  updateCategoryValidation,
  CategoryController.update
);

router.delete(
  "/:id",
  auth,
  adminOnly,
  mongoIdValidation("id"),
  CategoryController.delete
);

export default router;
