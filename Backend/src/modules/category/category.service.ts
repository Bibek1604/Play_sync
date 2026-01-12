import { CategoryRepository } from "./category.repository";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";

export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async createCategory(
    dto: CreateCategoryDTO,
    adminId: string
  ) {
    if (!["online", "offline"].includes(dto.type)) {
      throw new Error("Invalid category type");
    }

    const existing = await this.categoryRepo.findByName(dto.name);
    if (existing) {
      throw new Error("Category already exists");
    }

    return this.categoryRepo.create({
      ...dto,
      createdBy: adminId,
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDTO) {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return this.categoryRepo.updateById(id, dto);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return this.categoryRepo.deleteById(id);
  }

  async getAllCategories() {
    return this.categoryRepo.findAll();
  }
}
