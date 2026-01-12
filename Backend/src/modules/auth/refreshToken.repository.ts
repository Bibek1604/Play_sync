import RefreshToken from "./refreshToken.model";

export const createToken = (data: any) => RefreshToken.create(data);

export const findValidToken = (tokenHash: string) =>
  RefreshToken.findOne({ tokenHash, isRevoked: false });

export const revokeToken = (id: string) =>
  RefreshToken.findByIdAndUpdate(id, { isRevoked: true });
