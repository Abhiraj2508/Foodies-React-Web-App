# 🍔 FOODIES — Premium Modern Food Ordering & Restaurant Web App

A gorgeous, fast, and feature-rich React application built with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide Icons**, transformed from the static HTML project into a production-grade digital restaurant experience.

---

## ✨ Highlights & Features

- **🔐 Authentication & User Account System**:
  - **Sign In & Register Modal**: Multi-tab glass modal for Sign In, Registration, and Forgot Password recovery.
  - **1-Click Demo Login**: Instant login option to immediately test account features without registration.
  - **User Profile Modal**: View avatar, personal details, and manage saved delivery addresses (Home, Work, custom addresses).
  - **Foodie Coins Rewards Wallet**: Users earn reward coins on every order to redeem for future discounts.
  - **Order History & 1-Click Re-Order**: View all past orders, check item summaries, and re-order everything in 1 click.
  - **Dish Wishlist & Favorites**: Heart bookmark icon on every dish card to save and access favorite meals.
  - **Autofill Checkout**: Automatically loads user contact details and saved addresses directly into the checkout form.

- **🎨 Modern Aesthetic & Glassmorphism**:
  - Sticky glassmorphic navbar with announcement bar and smooth page navigation.
  - Dark / Light Mode with instant toggle and `localStorage` persistence.
  - Appetizing color palette with crimson reds (`#e11d48`), warm saffron ambers, and fresh greens.
  - Micro-interactions, animated badges, and hover zooms on dishes.

- **🍔 Interactive & Searchable Menu**:
  - Instant fuzzy search bar with reset.
  - Category filters: **All Items**, **Burgers & Meals**, **Artisan Sandwiches**, **Healthy & Salads**, **Sides & Treats**.
  - Dietary filter chips: **🌱 100% Pure Veg**, **🔥 Bestsellers**, **⭐ Chef's Picks**, **💰 Under $8**.
  - Sort by Price (Low to High, High to Low) and Customer Rating.

- **🔍 Dish Quick View & Customization Modal**:
  - High-res photo preview, calorie count, prep time, and spice meter (🌶️).
  - Portion size selection (e.g., Regular vs King Size / Deluxe).
  - Custom Add-ons with dynamic pricing (Extra Cheddar, Pickled Jalapeños, Truffle Dip, etc.).
  - Special kitchen notes field (e.g., "Less spicy", "No onions").
  - Quantity counter with real-time bill calculation.

- **🛒 Slide-Over Shopping Cart Drawer**:
  - Seamless slide-out drawer from the right.
  - Free delivery progress bar (*"Add $X more for FREE Express Delivery!"*).
  - Promo code discounts: Supports codes like **`FOODIE20`** (20% off), **`FREESHIP`** (free delivery), and **`TASTY50`** (50% off).
  - Quantity adjustments, clear-all, and granular bill breakdown (Subtotal, Delivery Fee, Taxes, Discount).

- **💳 Multi-Step Checkout Modal**:
  - Contact information (Name, Phone for rider, Email for receipt).
  - Delivery address, landmark, and special instructions.
  - Payment options: Cash on Delivery, Instant UPI/QR, and Credit/Debit Card.
  - Confetti burst celebration (`canvas-confetti`) upon order placement!

- **🛵 Live Order Tracking Simulation**:
  - Generated Order ID (e.g., `#FD-83921`).
  - Real-time animated status stepper (*Order Confirmed ➔ Kitchen Preparing ➔ Courier on the way ➔ Delivered*).
  - Assigned delivery partner profile and simulated call partner action.

- **📅 Table Reservation System**:
  - Date picker, guests count (1 to 7+ party), preferred time slots, and seating atmosphere (Cozy Indoor, Garden Patio, Private Booth).
  - Instant booking confirmation.

- **⭐ Community Reviews & Testimonials**:
  - Verified diner feedback with dish ordered tags.
  - Interactive *"Leave a Review"* modal allowing visitors to rate and write feedback.

- **📍 Contact & Interactive FAQ**:
  - Offline visit address, hotline, email, and live open hours.
  - Working contact form with validation and instant feedback.
  - Accordion FAQs for delivery areas, ingredients, and policies.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Plus Jakarta Sans (Google Fonts)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory ready for deployment on Vercel, Netlify, GitHub Pages, or any static host.

### 4. Preview Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
Foodies-main/
├── dist/                     # Optimized production bundle
├── public/
│   └── images/               # All original and high-res culinary image assets
│       ├── bg/               # Background banners
│       ├── img/              # Food dish photos
│       ├── review/           # Customer avatars
│       └── logo.png          # Foodies logo
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx          # Our Story & culinary pillars
│   │   ├── CartDrawer.jsx            # Slide-out shopping bag
│   │   ├── CheckoutModal.jsx         # Delivery & payment checkout
│   │   ├── ContactSection.jsx        # Contact info, form & FAQ accordion
│   │   ├── FoodCard.jsx              # Individual appetizing menu card
│   │   ├── FoodDetailModal.jsx       # Quick view & portion customization
│   │   ├── Footer.jsx                # Footer links, hours & newsletter
│   │   ├── Hero.jsx                  # Hero showcase & express highlights
│   │   ├── MenuSection.jsx           # Search, category pills & food grid
│   │   ├── Navbar.jsx                # Sticky glass navbar & theme toggle
│   │   ├── OrderTrackerModal.jsx     # Live simulated order status stepper
│   │   ├── ReviewsSection.jsx        # Testimonials & review submission
│   │   ├── SpecialDeals.jsx          # Daily flash promos & countdown timer
│   │   ├── TableReservationModal.jsx # Dine-in table booking
│   │   └── Toast.jsx                 # Floating toast notification system
│   ├── context/
│   │   └── CartContext.jsx           # Global state (Cart, Promo, Theme, Orders)
│   ├── data/
│   │   └── foodData.js               # Rich menu dataset, reviews & FAQs
│   ├── App.jsx                       # Master layout & modal mounts
│   ├── index.css                     # Tailwind directives & glass styles
│   └── main.jsx                      # React 18 root mount
├── index.html                        # App entry with meta tags & fonts
├── package.json                      # Scripts & dependencies
├── postcss.config.js                 # PostCSS setup
├── tailwind.config.js                # Custom theme & animations
└── vite.config.js                    # Vite configuration
```
Testing automatic Jenkins CI/CD trigger.
