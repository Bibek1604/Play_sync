import bcrypt from 'bcrypt';

export type UserRole = 'USER' | 'ADMIN';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  refreshTokenHash: string | null;
}

const users: User[] = [];

export class UserRepo {
  static async create(user: User) {
    users.push(user);
    return user;
  }

  static async findByEmail(email: string) {
    return users.find(u => u.email === email);
  }

  static async findById(id: string) {
    return users.find(u => u.id === id);
  }

  static async saveRefreshToken(userId: string, token: string) {
    const user = await this.findById(userId);
    if (user) user.refreshTokenHash = token;
  }

  static async clearRefreshToken(userId: string) {
    const user = await this.findById(userId);
    if (user) user.refreshTokenHash = null;
  }

  static async compareRefreshToken(userId: string, token: string) {
    const user = await this.findById(userId);
    if (!user || !user.refreshTokenHash) return false;
    return bcrypt.compare(token, user.refreshTokenHash);
  }
}
