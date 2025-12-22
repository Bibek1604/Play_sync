import User, { IUser } from "./user.model";

export const findById = (id: string) => {
  return User.findById(id).select("-password");
};

export const findAll = () => {
  return User.find().select("-password");
};

export const findByEmail = (email: string) => {
  return User.findOne({ email }) as Promise<IUser | null>;
};

