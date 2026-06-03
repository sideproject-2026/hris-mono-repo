
export type UserType = {
    id: string;
    userName: string;
    employeeId: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    department: string;
    companyName: string;
    manager: string;
    email: string;
    photo: string;
    mobileNo: string;
    roles: Array<string>;
    claims: Array<string>;
    signature: string;
    userLevel: number;
}


export type AuthState = {
    user?: UserType | null | undefined;
    refreshToken: string | null;
    accessToken: string | null;
    expiresIn: number | null;
    expiresAt: Date | null;
    isAuthenticated: boolean;
    error: string | null;
};


export type LoginResponse = {
    username?: string;
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    isTwoFactorAuth?: boolean;
};

export type APIResponse<T> = {
    data: T;
    time: Date;
}