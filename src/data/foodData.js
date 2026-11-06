export const FOOD_ITEMS = [
  // Burgers & Combos
  {
    id: 'b1',
    name: 'Classic Veg Burger',
    category: 'burgers',
    categoryLabel: 'Burgers & Combos',
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.8,
    reviewsCount: 342,
    image: '/images/img/veg-burger.jpg',
    description: 'Crispy herb-infused golden veggie patty nestled between toasted brioche buns with crunchy iceberg lettuce, ripe tomatoes, and velvety garlic house mayo.',
    calories: '420 kcal',
    prepTime: '12-15 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: true,
    isChefPick: false,
    ingredients: ['Crispy Veggie Patty', 'Toasted Brioche Bun', 'Iceberg Lettuce', 'Fresh Tomatoes', 'Signature Mayo', 'Pickled Gherkins'],
    sizes: [
      { name: 'Regular', price: 6.99 },
      { name: 'Double Patty Deluxe', price: 8.99 },
    ],
    addons: [
      { id: 'cheese', name: 'Melted Cheddar Slice', price: 1.20 },
      { id: 'jalapeno', name: 'Spicy Pickled Jalapeños', price: 0.80 },
      { id: 'dip', name: 'Smoky Chipotle Mayo Dip', price: 0.99 },
    ]
  },
  {
    id: 'b2',
    name: 'Burger Combo Meal',
    category: 'burgers',
    categoryLabel: 'Burgers & Combos',
    price: 11.49,
    originalPrice: 14.99,
    rating: 4.9,
    reviewsCount: 512,
    image: '/images/img/combo-meal.jpg',
    description: 'The ultimate party combo! Signature crispy burger paired with salted golden potato french fries and your choice of chilled fizzy soda or iced tea.',
    calories: '780 kcal',
    prepTime: '15-18 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: true,
    isChefPick: true,
    ingredients: ['Signature Burger', 'Golden Seasoned Fries', 'Chilled Drink (330ml)', 'Tartar & Ketchup Dips'],
    sizes: [
      { name: 'Standard Combo', price: 11.49 },
      { name: 'King Size Combo (Large Fries & Drink)', price: 13.99 },
    ],
    addons: [
      { id: 'cheese-dip', name: 'Warm Cheese Fondue Dip', price: 1.50 },
      { id: 'peri-peri', name: 'Peri-Peri Fries Upgrade', price: 1.00 },
      { id: 'onion-rings', name: 'Crispy Beer Battered Onion Rings', price: 2.20 },
    ]
  },
  {
    id: 'b3',
    name: 'Maharaja Royal Burger',
    category: 'burgers',
    categoryLabel: 'Burgers & Combos',
    price: 9.49,
    originalPrice: 11.99,
    rating: 4.9,
    reviewsCount: 420,
    image: '/images/img/maharaja.jpg',
    description: 'Royalty on a plate! Double decker spiced corn & potato patties with rich habanero dressing, molten mozzarella, and crisp red onion rings.',
    calories: '610 kcal',
    prepTime: '15-20 min',
    spicyLevel: 2,
    isVeg: true,
    isBestseller: false,
    isChefPick: true,
    ingredients: ['Twin Spiced Corn Patties', 'Sesame Brioche Bun', 'Molten Mozzarella', 'Habanero Herb Sauce', 'Crispy Greens'],
    sizes: [
      { name: 'Royal Regular', price: 9.49 },
      { name: 'Emperor Triple Deck', price: 12.49 },
    ],
    addons: [
      { id: 'extra-cheese', name: 'Double Cheese Slice', price: 1.50 },
      { id: 'caramelized-onion', name: 'Balsamic Caramelized Onions', price: 1.20 },
    ]
  },
  {
    id: 'b4',
    name: 'Gourmet Grand Feast Platter',
    category: 'burgers',
    categoryLabel: 'Burgers & Combos',
    price: 14.99,
    originalPrice: 18.00,
    rating: 4.8,
    reviewsCount: 189,
    image: '/images/img/img-2.png',
    description: 'Loaded family meal box containing mini slider burgers, loaded cheesy fries, herb potato bites, and three signature artisanal dips.',
    calories: '920 kcal',
    prepTime: '20-25 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: false,
    isChefPick: true,
    ingredients: ['2 Mini Sliders', 'Loaded Cheesy Fries', 'Garlic Herb Bites', '3 Secret Dips'],
    sizes: [
      { name: 'Platter for 2', price: 14.99 },
      { name: 'Party Feast for 4', price: 24.99 },
    ],
    addons: [
      { id: 'drinks-pair', name: 'Twin Cold Drinks Can', price: 2.50 },
      { id: 'chocolate-shake', name: 'Add Chocolate Shake', price: 3.50 },
    ]
  },

  // Sandwiches
  {
    id: 's1',
    name: 'Artisan Club Sandwich',
    category: 'sandwiches',
    categoryLabel: 'Artisan Sandwiches',
    price: 7.99,
    originalPrice: 9.99,
    rating: 4.7,
    reviewsCount: 275,
    image: '/images/img/club-sandwich.jpg',
    description: 'Triple-decker perfection with toasted whole-grain bread, crisp cucumbers, fresh tomatoes, bell peppers, cheddar slice, and pesto-mayo drizzle.',
    calories: '450 kcal',
    prepTime: '10-14 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: true,
    isChefPick: false,
    ingredients: ['Multi-grain Toast', 'Cucumber Ribbons', 'Heirloom Tomatoes', 'Mild Cheddar', 'Fresh Basil Pesto Mayo'],
    sizes: [
      { name: 'Classic 3-Layer', price: 7.99 },
      { name: 'Footlong Club', price: 10.99 },
    ],
    addons: [
      { id: 'cheese', name: 'Extra Cheddar Layer', price: 1.20 },
      { id: 'chips', name: 'House Herb Crisps', price: 1.50 },
    ]
  },
  {
    id: 's2',
    name: 'Grilled Veg Delight Sandwich',
    category: 'sandwiches',
    categoryLabel: 'Artisan Sandwiches',
    price: 6.49,
    originalPrice: 7.99,
    rating: 4.8,
    reviewsCount: 310,
    image: '/images/img/grilled-sandwich.jpg',
    description: 'Pressed and grilled to golden crunchy crust, packed with sautéed zucchini, bell peppers, corn kernels, and mint-coriander garden chutney.',
    calories: '380 kcal',
    prepTime: '10-12 min',
    spicyLevel: 2,
    isVeg: true,
    isBestseller: true,
    isChefPick: false,
    ingredients: ['Artisan Bread', 'Sautéed Bell Peppers', 'Sweet Corn', 'Green Chutney', 'Amul Butter Crust'],
    sizes: [
      { name: 'Regular Grilled', price: 6.49 },
      { name: 'Super Jumbo Grilled', price: 8.49 },
    ],
    addons: [
      { id: 'cheese', name: 'Grated Mozzarella Top', price: 1.20 },
      { id: 'spice', name: 'Gunpowder Masala Dust', price: 0.50 },
    ]
  },
  {
    id: 's3',
    name: 'Ultimate Cheese Burst Sandwich',
    category: 'sandwiches',
    categoryLabel: 'Artisan Sandwiches',
    price: 7.49,
    originalPrice: 9.49,
    rating: 4.9,
    reviewsCount: 460,
    image: '/images/img/grilled-cheese.jpg',
    description: 'Indulgence redefined. Oozing with a blend of three premium cheeses (Mozzarella, Cheddar, and Gouda), seasoned with fragrant Mediterranean oregano and chili flakes.',
    calories: '520 kcal',
    prepTime: '10-15 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: true,
    isChefPick: true,
    ingredients: ['Sourdough Bread', 'Mozzarella & Cheddar Blend', 'Gouda Cheese', 'Herb Butter', 'Chili Flakes'],
    sizes: [
      { name: 'Regular', price: 7.49 },
      { name: 'Triple Cheese Explosion', price: 9.99 },
    ],
    addons: [
      { id: 'truffle', name: 'White Truffle Oil Drizzle', price: 2.00 },
      { id: 'garlic-dip', name: 'Creamy Garlic Aioli', price: 0.99 },
    ]
  },
  {
    id: 's4',
    name: 'Royal Italian Panini',
    category: 'sandwiches',
    categoryLabel: 'Artisan Sandwiches',
    price: 8.99,
    originalPrice: 10.99,
    rating: 4.8,
    reviewsCount: 215,
    image: '/images/img/img-3.jpg',
    description: 'Authentic stone-baked ciabatta panini filled with sun-dried tomatoes, fresh baby spinach, smoked provolone, and extra virgin olive oil.',
    calories: '440 kcal',
    prepTime: '12-16 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: false,
    isChefPick: true,
    ingredients: ['Italian Ciabatta', 'Sun-Dried Tomatoes', 'Baby Spinach', 'Smoked Provolone', 'Cold Pressed Olive Oil'],
    sizes: [
      { name: 'Standard Panini', price: 8.99 },
      { name: 'Large Ciabatta', price: 11.49 },
    ],
    addons: [
      { id: 'olives', name: 'Kalamata Black Olives', price: 1.00 },
      { id: 'pesto', name: 'Extra Genovese Pesto', price: 1.25 },
    ]
  },

  // Healthy & Salads
  {
    id: 'h1',
    name: 'Garden Fresh Crunchy Salad',
    category: 'healthy',
    categoryLabel: 'Salads & Healthy',
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.7,
    reviewsCount: 290,
    image: '/images/img/salad.jpg',
    description: 'A vibrant bowl of farm-picked crisp romaine, English cucumber, cherry tomatoes, baby radish, and toasted pumpkin seeds with zesty lemon-vinaigrette dressing.',
    calories: '190 kcal',
    prepTime: '8-10 min',
    spicyLevel: 0,
    isVeg: true,
    isBestseller: true,
    isChefPick: false,
    ingredients: ['Crisp Romaine', 'English Cucumbers', 'Cherry Tomatoes', 'Pumpkin Seeds', 'Lemon Herb Dressing'],
    sizes: [
      { name: 'Medium Bowl', price: 6.99 },
      { name: 'Large Power Bowl', price: 9.49 },
    ],
    addons: [
      { id: 'feta', name: 'Crumbled Greek Feta Cheese', price: 1.50 },
      { id: 'tofu', name: 'Herb Grilled Organic Tofu', price: 2.00 },
      { id: 'avocado', name: 'Fresh Hass Avocado Slices', price: 2.25 },
    ]
  },
  {
    id: 'h2',
    name: 'Exotic Summer Fruit Bowl',
    category: 'healthy',
    categoryLabel: 'Salads & Healthy',
    price: 7.49,
    originalPrice: 9.00,
    rating: 4.9,
    reviewsCount: 380,
    image: '/images/img/fruit.jpg',
    description: 'A refreshing medley of seasonal sweet watermelon, ripe pineapple cubes, kiwis, ruby pomegranate pearls, and fresh mint leaves with a honey-lime glaze.',
    calories: '160 kcal',
    prepTime: '8-10 min',
    spicyLevel: 0,
    isVeg: true,
    isBestseller: true,
    isChefPick: true,
    ingredients: ['Sweet Watermelon', 'Ripe Pineapple', 'Kiwi Slices', 'Ruby Pomegranate', 'Fresh Mint & Honey-Lime'],
    sizes: [
      { name: 'Solo Bowl', price: 7.49 },
      { name: 'Shareable Platter', price: 11.99 },
    ],
    addons: [
      { id: 'chia', name: 'Organic Chia & Flax Seed Mix', price: 0.99 },
      { id: 'greek-yogurt', name: 'Dollop of Greek Honey Yogurt', price: 1.50 },
    ]
  },
  {
    id: 'h3',
    name: 'Artisanal Green Goddess Bowl',
    category: 'healthy',
    categoryLabel: 'Salads & Healthy',
    price: 8.99,
    originalPrice: 11.00,
    rating: 4.8,
    reviewsCount: 165,
    image: '/images/img/img-1.png',
    description: 'Nutrient-dense power bowl packed with organic quinoa, roasted chickpeas, steamed edamame, Hass avocado, and signature creamy green goddess tahini dressing.',
    calories: '310 kcal',
    prepTime: '10-14 min',
    spicyLevel: 0,
    isVeg: true,
    isBestseller: false,
    isChefPick: true,
    ingredients: ['Organic Quinoa', 'Steamed Edamame', 'Roasted Chickpeas', 'Hass Avocado', 'Green Goddess Tahini'],
    sizes: [
      { name: 'Regular Bowl', price: 8.99 },
      { name: 'Mega Fitness Bowl', price: 11.99 },
    ],
    addons: [
      { id: 'paneer', name: 'Grilled Paneer Cubes', price: 2.00 },
      { id: 'walnuts', name: 'Candied Walnuts', price: 1.50 },
    ]
  },

  // Sides & Beverages
  {
    id: 'd1',
    name: 'Crispy Truffle Potato Wedges',
    category: 'beverages',
    categoryLabel: 'Sides & Beverages',
    price: 4.99,
    originalPrice: 6.49,
    rating: 4.9,
    reviewsCount: 310,
    image: '/images/img/img-4.jpg',
    description: 'Hand-cut russet potatoes fried to crisp perfection, seasoned with rosemary sea salt, parmesan dust, and served with roasted garlic mayo.',
    calories: '340 kcal',
    prepTime: '8-10 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: true,
    isChefPick: false,
    ingredients: ['Russet Potatoes', 'Rosemary Sea Salt', 'Parmesan Dust', 'Roasted Garlic Mayo'],
    sizes: [
      { name: 'Standard Box', price: 4.99 },
      { name: 'Bucket for Group', price: 7.99 },
    ],
    addons: [
      { id: 'cheese-sauce', name: 'Warm Jalapeño Cheddar Sauce', price: 1.50 },
    ]
  },
  {
    id: 'd2',
    name: 'Sizzling Farmhouse Special',
    category: 'beverages',
    categoryLabel: 'Sides & Beverages',
    price: 5.99,
    originalPrice: 7.50,
    rating: 4.8,
    reviewsCount: 198,
    image: '/images/img/img-5.jpg',
    description: 'Fresh oven-baked garlic herb sourdough rolls paired with a creamy bubbling cheese & spinach fondue dip.',
    calories: '410 kcal',
    prepTime: '10-12 min',
    spicyLevel: 1,
    isVeg: true,
    isBestseller: false,
    isChefPick: true,
    ingredients: ['Oven-Baked Sourdough Rolls', 'Herb Butter', 'Spinach Cheese Fondue'],
    sizes: [
      { name: '4 Pieces', price: 5.99 },
      { name: '8 Pieces Shareable', price: 9.99 },
    ],
    addons: [
      { id: 'garlic-butter', name: 'Extra Garlic Butter Cup', price: 0.99 },
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Sparkles', count: FOOD_ITEMS.length },
  { id: 'burgers', label: 'Burgers & Meals', icon: 'Flame', count: FOOD_ITEMS.filter(i => i.category === 'burgers').length },
  { id: 'sandwiches', label: 'Sandwiches', icon: 'Layers', count: FOOD_ITEMS.filter(i => i.category === 'sandwiches').length },
  { id: 'healthy', label: 'Healthy & Salads', icon: 'Salad', count: FOOD_ITEMS.filter(i => i.category === 'healthy').length },
  { id: 'beverages', label: 'Sides & Treats', icon: 'Coffee', count: FOOD_ITEMS.filter(i => i.category === 'beverages').length },
];

export const REVIEWS = [
  {
    id: 'r1',
    name: 'Sarah Jenkins',
    role: 'Food Blogger & Critic',
    avatar: '/images/review/review-1.jpg',
    rating: 5,
    title: 'Hands down the best veggie burger in town!',
    comment: 'The Maharaja Burger blew my mind. Super crispy patty, incredibly fresh brioche, and the chipotle sauce was balanced to absolute perfection. 10/10 ordering again!',
    date: '2 days ago',
    verified: true,
    dishOrdered: 'Maharaja Royal Burger'
  },
  {
    id: 'r2',
    name: 'David Miller',
    role: 'Fitness Enthusiast',
    avatar: '/images/review/review-2.jpg',
    rating: 5,
    title: 'Fresh, vibrant, and so quick to arrive!',
    comment: 'I order the Garden Fresh Salad and Summer Fruit Bowl almost every week. The ingredients taste straight out of a premium organic farm. Delivery arrived in 22 minutes steaming fresh!',
    date: '1 week ago',
    verified: true,
    dishOrdered: 'Garden Fresh Salad'
  },
  {
    id: 'r3',
    name: 'Aisha Patel',
    role: 'Software Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'The Ultimate Cheese Burst is addictive!',
    comment: 'Ordered for our late-night coding session. The cheese pull was unreal, and the packaging kept the bread warm and crisp without getting soggy. Foodies is now our team favorite!',
    date: '3 days ago',
    verified: true,
    dishOrdered: 'Ultimate Cheese Burst Sandwich'
  }
];

export const FAQS = [
  {
    question: 'How fast is Foodies express delivery?',
    answer: 'Our average delivery time is between 25 to 35 minutes depending on your location. Every order is freshly prepared on demand and packed in heat-retaining eco-boxes.'
  },
  {
    question: 'Are all your ingredients 100% vegetarian and fresh?',
    answer: 'Yes! We pride ourselves on sourcing farm-fresh, seasonal produce from certified organic local growers. Our kitchen is 100% vegetarian, hygienic, and audited weekly.'
  },
  {
    question: 'Do you offer contactless delivery?',
    answer: 'Absolutely. During checkout, you can select contactless delivery and write special notes like "Leave at doorstep" or "Ring bell and leave on the porch table".'
  },
  {
    question: 'Can I customize my order or request allergen-free options?',
    answer: 'Yes, every dish has customizable options (extra cheese, sauces, portion size) and a special instructions field for allergies (e.g., no onion, no garlic, gluten sensitivity).'
  },
  {
    question: 'What is your table reservation policy?',
    answer: 'We accept table bookings up to 7 days in advance online with zero reservation fees. Reserved tables are held for 15 minutes past the booking time.'
  }
];

export const RESTAURANT_INFO = {
  name: 'FOODIES',
  tagline: 'Fresh, Delicious & Hot Meals Everyday',
  address: '123 Flavor Street, Food City, India',
  phone: '+91 0123456789',
  email: 'foodies@gmail.com',
  hours: 'Monday – Sunday: 10:00 AM – 10:00 PM',
  founded: '2021',
  rating: 4.9,
  totalReviews: '12,500+'
};

export const PROMOS = [
  { code: 'FOODIE20', discount: 20, description: '20% OFF on all orders over $15', minOrder: 15 },
  { code: 'FREESHIP', discountType: 'shipping', discount: 2.99, description: 'FREE Delivery on orders over $12', minOrder: 12 },
  { code: 'TASTY50', discount: 50, description: '50% OFF up to $8 for new foodies', minOrder: 20, maxDiscount: 8 },
];

