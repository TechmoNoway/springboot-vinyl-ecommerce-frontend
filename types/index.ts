export type ILoginForm = {
  email: string;
  password: string;
};

export type IGoogleLoginForm = {
  username: string;
  email: string;
  accessToken: string;
};

export type IUpdateUser = {
  id: number;
  email: string;
  phone: string;
  gender: string;
  fullname: string;
  address: string;
  birthday: Date | undefined;
};

export type IUser = {
  id: number;
  email: string;
  phone: string;
  gender: string;
  fullname: string;
  address: string;
  birthday: string;
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

export type IChangePassword = {
  userID: number;
  currentPassword: string;
  newPassword: string;
};

export type IOrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type IOrder = {
  id: string;
  customerId: number;
  totalPrice: number;
  status: string;
  fullname: string;
  customerAddress: string;
  customerPhone: string;
  note: string;
  email: string;
  orderDate: string;
  items: IOrderItem[];
};

export type ICurrentUser = {
  auth: {
    id: number;
    email: string;
    phone: string;
    gender: string;
    fullname: string;
    address: string;
    birthday: Date | undefined;
  };
};
