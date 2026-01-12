export interface CreateCategoryDTO {
  name: string;
  type: "online" | "offline";
  image: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  image?: string;
  description?: string;
  isActive?: boolean;
}
