import { Router } from "express";
import * as CategoryController from "./category.controller";
import { auth, authorize } from "../auth/auth.middleware";
import { validateDto } from "../../utils/validateDto";
import { CreateCategoryDTO } from "./category.dto";

const router = Router();

router.post(
  "/",
  auth,
  authorize("admin"),
  validateDto(CreateCategoryDTO),
  CategoryController.create
);

router.put(
  "/:id",
  auth,
  authorize("admin"),
  validateDto(CreateCategoryDTO),
  CategoryController.update
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  CategoryController.remove
);

router.get("/", auth, CategoryController.getAll);
router.get("/:id", auth, CategoryController.getById);

export default router;
