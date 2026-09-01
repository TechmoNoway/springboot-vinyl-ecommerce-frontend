export type UserRole = "ROLE_USER" | "ROLE_ADMIN" | "USER" | "ADMIN" | string;

export type ILoginForm = {
  email: string;
  password: string;
};

export type IGoogleLoginForm = {
  username?: string;
  email: string;
  accessToken: string;
};

export type IUpdateUser = {
  id?: number;
  email?: string;
  phone?: string;
  gender?: string;
  fullname?: string;
  address?: string;
  birthday?: Date | string | undefined;
};

export type IUser = {
  id: number;
  email: string;
  phone?: string;
  gender?: string;
  fullname?: string;
  address?: string;
  birthday?: string;
  roles?: UserRole[] | string[];
  role?: string;
  createdAt?: string;
};

export type IProduct = {
  id: number;
  title: string;
  price: number;
  stockQuantity: number;
  posterUrl: string;
  region?: string;
  artist?: string;
  releaseYear?: string | number;
  status?: string;
  platform?: string;
  set?: string;
  demoAudioUrl?: string;
  studioName?: string;
  manufactureYear?: string | number;
  stockStatus?: string;
  description?: string;
  mood?: string;
  createdAt?: string;
  updatedAt?: string;
  tracklistId?: number;
  categories?: ICategory[];
  speed?: string; // 33 RPM / 45 RPM
  weight?: string; // 180g / 140g
};

export type ICategory = {
  categoryId: number;
  categoryName: string;
};

export type ICategoryList = {
  id: number;
  name: string;
  description?: string;
  icon?: string;
};

export type CartItem = IProduct & {
  quantity: number;
};

export type IChangePassword = {
  userID?: number;
  currentPassword: string;
  newPassword: string;
};

export type IOrderItem = {
  productId: number;
  productTitle?: string;
  productPosterUrl?: string;
  quantity: number;
  price: number;
};

export type IOrder = {
  id: string;
  customerId?: number;
  totalPrice: number;
  status: string; // PENDING, PROCESSING, SHIPPING, DELIVERED, CANCELLED
  fullname: string;
  customerAddress: string;
  customerPhone: string;
  note?: string;
  email: string;
  orderDate?: string;
  createdAt?: string;
  items: IOrderItem[];
  paymentStatus?: string;
  paymentMethod?: string;
};

export type IPlaceOrder = {
  customerId?: number;
  totalPrice?: number;
  status?: string;
  fullname: string;
  customerAddress: string;
  customerPhone: string;
  note?: string;
  email: string;
  items: {
    productId: number;
    quantity: number;
    price?: number;
    productTitle?: string;
    productPosterUrl?: string;
  }[];
};

export type ICurrentUser = {
  auth: {
    id: number;
    email: string;
    phone: string;
    gender: string;
    fullname: string;
    address: string;
    birthday: Date | string | undefined;
    roles?: string[];
    role?: string;
    isAuthenticated?: boolean;
  };
};

export type IPaymentCreateRequest = {
  orderId: string;
  method: "vietqr" | "cod" | "bank_transfer" | string;
  idempotencyKey: string;
  amount?: number;
};

export type IPaymentStatusResponse = {
  orderId: string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED" | string;
  amount?: number;
  paidAt?: string;
  qrDataURL?: string;
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    transferContent: string;
  };
};

export type IVocCatalogImportRequest = {
  limit?: number;
};

export type IVocProductImportRequest = {
  sourceUrl: string;
};

export type IApiResponse<T> = {
  success?: boolean;
  status?: number;
  message?: string;
  data: T;
};
