export type UserRole = 'user' | 'admin';
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    location?: {
        lat: number;
        lng: number;
        city?: string;
        country?: string;
    };
}