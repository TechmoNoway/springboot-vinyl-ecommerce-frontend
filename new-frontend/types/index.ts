export type ILoginForm = {
    username: string;
    password: string;
};

export type IGoogleLoginForm = {
    username: string;
    email: string;
    accessToken: string;
};

export type IRegisterForm = {
    username: string;
    password: string;
    email: string;
};

export type IUpdateUser = {
    userId: number;
    username: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
    birthdate: Date | undefined;
};

export type IUser = {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
    birthdate: string;
    isActive: boolean;
    isBlocked: boolean;
};

export type IProduct = {
    id: number;
    title: string;
    price: number;
    stockQuantity: number;
    posterUrl: string;
    region: string;
    artist: string;
    releaseYear: string;
    status: string;
    platform: string;
    set: string;
    demoAudioUrl: string;
    studioName: string;
    manufactureYear: string;
    stockStatus: string;
    description: string;
    mood: string;
    createdAt: string;
    updatedAt: string;
    tracklistId: number;
    categories: ICategory[];
};

export type ICategory = {
    categoryId: number;
    categoryName: string;
};

export type ICategoryList = {
    id: number;
    name: string;
};

export type CartItem = {
    id: number;
    title: string;
    price: number;
    stockQuantity: number;
    posterUrl: string;
    region: string;
    artist: string;
    releaseYear: string;
    status: string;
    platform: string;
    demoAudioUrl: string;
    studioName: string;
    manufactureYear: string;
    stockStatus: string;
    description: string;
    mood: string;
    createdAt: string;
    updatedAt: string;
    tracklistId: number;
    categories: ICategory[];
    quantity: number;
};
