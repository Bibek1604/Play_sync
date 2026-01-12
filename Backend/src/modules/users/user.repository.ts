import User, { IUser } from "./user.model";

export const findById = (id: string) => {
  return User.findById(id).select("-password");
};

export const findAll = () => {
  return User.find().select("-password");
};

export const create = (userData: Partial<IUser>) => {
  const user = new User(userData);
  return user.save();
};

