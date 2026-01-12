import { CategoryModel, ICategory } from "./category.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";

export class CategoryRepository {
  async findByName(name: string): Promise<ICategory | null> {
    return CategoryModel.findOne({ name });
  }

  async create(
    data: CreateCategoryDTO & { createdBy: string }
  ): Promise<ICategory> {
    return CategoryModel.create(data);
  }

  async findAllActive(): Promise<ICategory[]> {
    return CategoryModel.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async updateById(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<ICategory | null> {
    return CategoryModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ICategory | null> {
    return CategoryModel.findById(id);
  }

  async findAll(): Promise<ICategory[]> {
    return CategoryModel.find().sort({ createdAt: -1 });
  }
}
