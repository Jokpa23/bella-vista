/* ==========================================================================
   Bella Vista Restaurant - Data
   Menu items, gallery, testimonials & chefs data
   ========================================================================== */

const menuData = [
    {
        id: 1,
        name: 'Truffle Eggs Benedict',
        desc: 'Poached eggs, black truffle hollandaise, smoked salmon on toasted brioche.',
        price: '$24.99',
        image: 'images/luxurious-breakfast-plate-eggs-benedict--1.jpg',
        category: 'breakfast',
        rating: 4.9,
        tag: 'Chef\'s Special'
    },
    {
        id: 2,
        name: 'Classic Margherita Pizza',
        desc: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
        price: '$19.99',
        image: 'images/italian-pizza-margherita-food-photograph-1.jpg',
        category: 'lunch',
        rating: 4.8,
        tag: 'Bestseller'
    },
    {
        id: 3,
        name: 'Gourmet Truffle Burger',
        desc: 'Wagyu beef patty with truffle aioli, aged cheddar, caramelized onions.',
        price: '$28.50',
        image: 'images/gourmet-burger-food-photography-dark-bac-1.jpg',
        category: 'lunch',
        rating: 5.0,
        tag: 'Signature'
    },
    {
        id: 4,
        name: 'Grilled Ribeye Steak',
        desc: '12oz prime ribeye, herb butter, roasted vegetables, red wine jus.',
        price: '$58.00',
        image: 'images/plated-gourmet-steak-beef-food-photograp-1.jpg',
        category: 'dinner',
        rating: 4.9,
        tag: 'Premium'
    },
    {
        id: 5,
        name: 'Lobster Seafood Platter',
        desc: 'Fresh lobster tail, jumbo shrimp, oysters, king crab with lemon butter.',
        price: '$89.00',
        image: 'images/seafood-platter-lobster-grilled-fish-foo-1.jpg',
        category: 'dinner',
        rating: 5.0,
        tag: 'Signature'
    },
    {
        id: 6,
        name: 'Creamy Mushroom Pasta',
        desc: 'Fresh handmade tagliatelle, wild mushrooms, parmesan cream sauce.',
        price: '$26.00',
        image: 'images/gourmet-pasta-dish-creamy-food-photograp-1.jpg',
        category: 'dinner',
        rating: 4.7,
        tag: 'Vegetarian'
    },
    {
        id: 7,
        name: 'Shrimp Fried Rice',
        desc: 'Wok-fried jasmine rice with tiger prawns, vegetables, and Asian spices.',
        price: '$22.00',
        image: 'images/fried-rice-colorful-dish-food-photograph-1.jpg',
        category: 'lunch',
        rating: 4.6,
        tag: 'Popular'
    },
    {
        id: 8,
        name: 'Herb Grilled Chicken',
        desc: 'Free-range chicken breast marinated in Mediterranean herbs, seasonal veg.',
        price: '$32.00',
        image: 'images/chicken-dish-grilled-roasted-food-photog-1.jpg',
        category: 'dinner',
        rating: 4.7,
        tag: 'Healthy'
    },
    {
        id: 9,
        name: 'Grilled Salmon Fillet',
        desc: 'Atlantic salmon with lemon dill sauce, asparagus, and quinoa.',
        price: '$38.00',
        image: 'images/salmon-grilled-fish-fine-dining-food-pho-1.jpg',
        category: 'dinner',
        rating: 4.8,
        tag: 'Fresh'
    },
    {
        id: 10,
        name: 'Chocolate Lava Cake',
        desc: 'Warm chocolate cake with molten center, vanilla bean ice cream.',
        price: '$14.00',
        image: 'images/gourmet-dessert-chocolate-cake-plating-f-3.jpg',
        category: 'desserts',
        rating: 5.0,
        tag: 'Must Try'
    },
    {
        id: 11,
        name: 'Peach Pavlova',
        desc: 'Crisp meringue, fresh peaches, whipped cream, berry compote.',
        price: '$12.00',
        image: 'images/gourmet-dessert-chocolate-cake-plating-f-2.jpg',
        category: 'desserts',
        rating: 4.8,
        tag: 'Sweet'
    },
    {
        id: 12,
        name: 'Classic Negroni',
        desc: 'Gin, Campari, sweet vermouth, orange peel. A timeless Italian classic.',
        price: '$16.00',
        image: 'images/cocktail-drink-mocktail-bar-photography--1.jpg',
        category: 'drinks',
        rating: 4.9,
        tag: 'Signature'
    },
    {
        id: 13,
        name: 'Red Wine Selection',
        desc: 'Premium Italian red wine, full-bodied with notes of cherry and spice.',
        price: '$18.00',
        image: 'images/cocktail-drink-mocktail-bar-photography--2.jpg',
        category: 'drinks',
        rating: 4.8,
        tag: 'Premium'
    },
    {
        id: 14,
        name: 'Avocado Toast',
        desc: 'Smashed avocado, poached eggs, cherry tomatoes, sourdough bread.',
        price: '$16.50',
        image: 'images/luxurious-breakfast-plate-eggs-benedict--2.jpg',
        category: 'breakfast',
        rating: 4.6,
        tag: 'Healthy'
    },
    {
        id: 15,
        name: 'Pepperoni Pizza',
        desc: 'Classic pepperoni with mozzarella, tomato sauce, and fresh oregano.',
        price: '$22.00',
        image: 'images/italian-pizza-margherita-food-photograph-3.jpg',
        category: 'lunch',
        rating: 4.7,
        tag: 'Classic'
    },
    {
        id: 16,
        name: 'Vegetable Stir Fry Rice',
        desc: 'Colorful mixed vegetables wok-fried with jasmine rice and soy.',
        price: '$18.00',
        image: 'images/fried-rice-colorful-dish-food-photograph-2.jpg',
        category: 'lunch',
        rating: 4.5,
        tag: 'Vegan'
    }
];

const galleryData = [
    { src: 'images/luxury-restaurant-interior-elegant-dinin-2.jpg', title: 'Main Dining Hall', category: 'Interior' },
    { src: 'images/luxury-restaurant-interior-elegant-dinin-3.jpg', title: 'Crystal Chandelier', category: 'Interior' },
    { src: 'images/gourmet-burger-food-photography-dark-bac-3.jpg', title: 'Signature Burger', category: 'Food' },
    { src: 'images/italian-pizza-margherita-food-photograph-2.jpg', title: 'Wood-Fired Pizza', category: 'Food' },
    { src: 'images/seafood-platter-lobster-grilled-fish-foo-2.jpg', title: 'Fresh Lobster', category: 'Food' },
    { src: 'images/gourmet-dessert-chocolate-cake-plating-f-1.jpg', title: 'Mini Dessert', category: 'Desserts' },
    { src: 'images/plated-gourmet-steak-beef-food-photograp-2.jpg', title: 'Premium Steak', category: 'Food' },
    { src: 'images/cocktail-drink-mocktail-bar-photography--3.jpg', title: 'Craft Cocktails', category: 'Drinks' },
    { src: 'images/chicken-dish-grilled-roasted-food-photog-3.jpg', title: 'Grilled Special', category: 'Food' },
    { src: 'images/happy-customer-smiling-eating-restaurant-2.jpg', title: 'Happy Guests', category: 'Customers' }
];

const testimonialData = [
    {
        name: 'Sarah Mitchell',
        role: 'Food Critic, NY Times',
        image: 'images/customer-1.jpg',
        rating: 5,
        text: 'Bella Vista delivers an extraordinary dining experience. The truffle pasta alone is worth the visit, but the impeccable service and elegant atmosphere make it a destination restaurant. A true gem in the city.'
    },
    {
        name: 'James Anderson',
        role: 'Regular Guest',
        image: 'images/customer-2.jpg',
        rating: 5,
        text: 'I\'ve been dining at Bella Vista for over 5 years now, and it never disappoints. The chef\'s attention to detail and the warm hospitality from the staff make every visit feel like coming home.'
    },
    {
        name: 'Emily Chen',
        role: 'Travel Blogger',
        image: 'images/customer-1.jpg',
        rating: 5,
        text: 'From the moment you walk in, you know you\'re somewhere special. The wine pairing suggestions were perfect, and the lobster platter was the best I\'ve ever tasted. Highly recommended!'
    },
    {
        name: 'Michael Roberts',
        role: 'Wine Enthusiast',
        image: 'images/customer-2.jpg',
        rating: 5,
        text: 'An unforgettable culinary journey. Each course was more delightful than the last, and the sommelier\'s expertise in wine pairing elevated the entire experience. Bella Vista sets the gold standard.'
    },
    {
        name: 'Olivia Martinez',
        role: 'Event Planner',
        image: 'images/customer-1.jpg',
        rating: 5,
        text: 'I hosted my anniversary dinner here and it was absolutely magical. The private dining room, custom menu, and attentive staff made it a night my husband and I will never forget. Thank you, Bella Vista!'
    }
];
