# VINYL Records - Vinyl E-commerce Frontend

![VINYL Records Logo](https://placehold.co/800x200/black/yellow?text=VINYL+RECORDS)

A modern e-commerce platform for vinyl records, built with React, TypeScript, and Vite. This project provides a complete shopping experience for vinyl enthusiasts, with features like product browsing, cart management, user authentication, and checkout processing.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Product Catalog**: Browse vinyl records with filtering and sorting options
- **User Authentication**: Sign up, login, and profile management
- **Shopping Cart**: Add, update, and remove items from your cart
- **Checkout Process**: Multiple payment options including bank transfer and VietQR
- **Order Management**: Track and view order history and details
- **Wishlist**: Save products for future purchase
- **Toast Notifications**: User-friendly notifications for actions

## 🛠️ Technologies

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **State Management**: Redux, Redux-Persist
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn/UI
- **Routing**: React Router
- **Form Handling**: React Hook Form, Zod
- **API Requests**: Axios
- **Authentication**: JWT

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/springboot-vinyl-ecommerce-frontend.git
   cd springboot-vinyl-ecommerce-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory with your environment variables:
   ```
   VITE_API_BASE_URL=http://your-backend-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`.

- Browse products on the home page or shop page
- Use filters to narrow down product selection
- Click on a product to view details
- Add products to cart
- Manage your cart and proceed to checkout
- Create an account or login to save your information
- Complete the checkout process and track your orders

## 📁 Project Structure

```
src/
├── _root/               # Root layout and pages
│   ├── pages/           # Page components
│   └── RootLayout.tsx   # Main layout wrapper
├── components/          # Reusable components
│   ├── shared/          # Shared components
│   └── ui/              # UI components
├── context/             # Context providers
│   ├── AuthContext.tsx  # Authentication context
│   └── CartContext.tsx  # Cart management context
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── redux/               # Redux state management
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🔄 API Integration

This frontend application connects to a Spring Boot backend API. The API endpoints are defined in the `services/` directory and include:

- Authentication (login, register)
- User management
- Product listing and details
- Cart operations
- Order processing
- Payment handling

## 📝 Key Pages

### 🏠 Home
- Hero banner with featured products
- New arrivals section
- Categories showcase
- Newsletter signup

### 🛒 Shop
- Product grid with filters
- Sort functionality
- Pagination
- Quick view options

### 👤 User Account
- Profile information
- Order history
- Wishlist management
- Address book

### 🛍️ Cart & Checkout
- Cart summary
- Shipping information
- Payment methods
- Order confirmation

## 🧩 Components

### UI Components
Built with Shadcn UI and Radix UI primitives:
- Buttons
- Form inputs
- Modals
- Dropdowns
- Toast notifications

### Shared Components
- Product cards
- Navigation
- Footer
- Loading spinners

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚙️ Environment Setup

For development, we recommend the following tools:
- VSCode with ESLint and Prettier extensions
- Node.js version 16+
- npm version 8+

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Routing
- [Vite](https://vitejs.dev/) - Build tool

---

© 2024 VINYL Records. All rights reserved.

Similar code found with 2 license types