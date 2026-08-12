# 🏥 PharmaCare — Online Pharmacy & Admin Inventory System

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-grade, responsive E-commerce Storefront and Pharmacist Admin Inventory Management portal built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **REST API**. Developed as a personal portfolio project for Front-End Developer OJT Application at FPT Software.

---

## 🔗 Live Demo & Links

- **Live Demo**: [PharmaCare Live App](https://pharmacy-app-frontend.vercel.app/) *(or your deployed Vercel link)*
- **GitHub Repository**: [pmquan25122005-ctrl/pharmacy-app-frontend](https://github.com/pmquan25122005-ctrl/pharmacy-app-frontend)

---

## ✨ Key Features

### 🛍️ Customer Storefront
- **Dynamic Catalog & Category Filtering**: Browse prescription medicines, medical equipment, and dermocosmetics.
- **Real-time Search & Sorting**: Instant search with `useDebounce` hook (300ms delay) and sorting by price/name.
- **Shareable URL Query Parameters**: Deep-link searching and sorting via `useSearchParams()` (`?search=panadol&sort=price-asc`).
- **Product Detail View**: Complete medical product specifications, dosage guidance, unit pricing, and stock status.
- **Global Shopping Cart Context**: Full cart management (`addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`) with `localStorage` persistence and realtime badge counters.
- **Validated Checkout Flow**: Shipping form validation built with **Formik** and **Yup** schema validation, generating random reference IDs (`ORD-XXXXXX`).
- **Order Receipt Confirmation**: Complete order summary screen with printing functionality (`window.print()`).

### ⚙️ Pharmacist Admin Portal (Full CRUD)
- **Protected Admin Route**: `<ProtectedRoute>` wrapper guarding `/admin` based on simulated authentication state.
- **Inventory Metrics Dashboard**: Live counters for total catalog items, overall stock units, and low-stock alerts.
- **Complete REST API CRUD**:
  - **Create**: Add new medical products with Formik/Yup modal validation.
  - **Read**: Fetch product inventory from REST API backend (`MockAPI`).
  - **Update**: Edit product prices, stock levels, categories, and descriptions.
  - **Delete**: Confirmation dialog for removing products from inventory.

---

## 🏗️ Architecture & Technology Stack

```
src/
├── components/
│   ├── common/         # Atomic UI primitives (Button, Badge, SkeletonCard)
│   ├── layout/         # Navbar, Footer, MainLayout with <Outlet />
│   └── product/        # ProductCard, ProductGrid
├── context/            # React Context (CartContext + LocalStorage persistence)
├── hooks/              # Custom React Hooks (useProducts, useProductDetail, useCart, useDebounce)
├── pages/              # Page components (Home, CategoryPage, Detail, Cart, Checkout, Confirmation, Login, About, Contact)
│   └── admin/          # Admin Dashboard & Inventory Modals
├── services/           # Centralized REST API Service Module (Axios client)
├── types/              # Domain TypeScript interfaces (Product, CartItem, Order, User)
├── App.tsx             # React Router v7 routes
└── main.tsx            # Entry point with CartProvider & BrowserRouter
```

- **Frontend Framework**: React 19 (Hooks, Context API, Suspense)
- **Language**: TypeScript 5.7 (Strict mode, Interfaces, Generics, Utility Types)
- **Styling**: Tailwind CSS v4 (Utility-first, responsive design, custom scrollbars)
- **Routing**: React Router DOM v7 (Nested routes, `<Outlet />`, `useParams`, `useSearchParams`, `<Navigate>`)
- **State Management**: React Context API + Custom Hooks (`useCart`, `useProducts`, `useDebounce`)
- **Form Handling & Validation**: Formik + Yup Schema Validation
- **HTTP Client**: Axios with centralized base URL configuration
- **Build Tool**: Vite 8 & Rollup (HMR, TypeScript bundling)

---

## ⚙️ Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pmquan25122005-ctrl/pharmacy-app-frontend.git
   cd pharmacy-app-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://6a48a300a033dcb98d64b8e2.mockapi.io/products
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 👤 Author

**Minh Quân**  
Software Engineering Student @ FPT University  
Portfolio Project for OJT Application at FPT Software  
GitHub: [@pmquan25122005-ctrl](https://github.com/pmquan25122005-ctrl)
