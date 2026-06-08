declare type AuthState = {
    user?: UserType | null;
    refreshToken: string | null;
    accessToken?: string | null;
    token?: string | null;
    expiresIn: number | null;
    expiresAt: Date | null;
    isAuthenticated: boolean;
    error: string | null;
};

type LoginResponse = {
    username?: string;
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expriresIn: number;
    isTwoFactorAuth?: boolean;
};


declare type APIResponse<T> = {
    data: T;
    time: Date;
}

declare type SelectionItem<T> = {
    value: T;
    text: string;
};


declare type JobStatus = {
    jobId: string,
    status: string,
    startedAt: Date,
    completedAt: Date
}

declare interface PageType {
    pageNumber: number;
    pageSize: number;
}


declare type CodeValue = {
   code: number;
   strCode: string;
}
