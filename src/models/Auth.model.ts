// src/models/auth.models.ts

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "MANAGER" | "MEMBER";
}

export interface LoginData {
    email: string;
    password: string;
}