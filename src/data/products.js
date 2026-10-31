
const products = [
  {
    id: "cake-001",
    name: "Chocolate Fudge Cake",
    category: "Cakes",
    description:
      "A rich chocolate sponge layered with smooth chocolate fudge frosting. Perfect for celebrations and special moments.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    price: 1800,
    soldOut: false,
    options: [
      { name: "1 Pound", price: 1800 },
      { name: "2 Pounds", price: 3400 },
      { name: "3 Pounds", price: 4900 },
    ],
    flavours: ["Chocolate", "Vanilla", "Strawberry"],
  },
  {
    id: "cake-002",
    name: "Red Velvet Cake",
    category: "Cakes",
    description:
      "Soft red velvet layers with a delicious cream cheese frosting and a beautiful finish.",
    image:
      "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=85",
    price: 2200,
    soldOut: false,
    options: [
      { name: "1 Pound", price: 2200 },
      { name: "2 Pounds", price: 4100 },
      { name: "3 Pounds", price: 5900 },
    ],
    flavours: ["Classic Red Velvet", "Chocolate"],
  },
  {
    id: "cake-003",
    name: "Vanilla Dream Cake",
    category: "Cakes",
    description:
      "A light and fluffy vanilla sponge cake finished with silky vanilla buttercream.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85",
    price: 1600,
    soldOut: false,
    options: [
      { name: "1 Pound", price: 1600 },
      { name: "2 Pounds", price: 3000 },
      { name: "3 Pounds", price: 4400 },
    ],
    flavours: ["Vanilla", "Strawberry", "Chocolate"],
  },
  {
    id: "cupcake-001",
    name: "Strawberry Cupcakes",
    category: "Cupcakes",
    description:
      "Fresh strawberry-inspired cupcakes topped with creamy pink frosting.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
    price: 450,
    soldOut: false,
    options: [
      { name: "Box of 4", price: 450 },
      { name: "Box of 6", price: 650 },
      { name: "Box of 12", price: 1200 },
    ],
    flavours: ["Strawberry", "Vanilla"],
  },
  {
    id: "cupcake-002",
    name: "Chocolate Cupcakes",
    category: "Cupcakes",
    description:
      "Moist chocolate cupcakes with rich chocolate frosting and a delicious finish.",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=85",
    price: 500,
    soldOut: false,
    options: [
      { name: "Box of 4", price: 500 },
      { name: "Box of 6", price: 750 },
      { name: "Box of 12", price: 1400 },
    ],
    flavours: ["Dark Chocolate", "Milk Chocolate"],
  },
  {
    id: "brownie-001",
    name: "Classic Chocolate Brownies",
    category: "Brownies",
    description:
      "Rich, fudgy chocolate brownies with a soft centre and a delicious crackly top.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    price: 350,
    soldOut: false,
    options: [
      { name: "Box of 2", price: 350 },
      { name: "Box of 4", price: 650 },
      { name: "Box of 6", price: 950 },
    ],
    flavours: ["Classic Chocolate", "Dark Chocolate"],
  },
  {
    id: "brownie-002",
    name: "Walnut Brownies",
    category: "Brownies",
    description:
      "Delicious chocolate brownies filled with crunchy walnuts for the perfect texture.",
    image:
      "https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?auto=format&fit=crop&w=900&q=85",
    price: 450,
    soldOut: false,
    options: [
      { name: "Box of 2", price: 450 },
      { name: "Box of 4", price: 850 },
      { name: "Box of 6", price: 1250 },
    ],
    flavours: ["Classic Walnut", "Dark Chocolate Walnut"],
  },
  {
    id: "cookie-001",
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    description:
      "Golden homemade cookies loaded with chocolate chips and a soft, chewy centre.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
    price: 300,
    soldOut: false,
    options: [
      { name: "Box of 4", price: 300 },
      { name: "Box of 6", price: 430 },
      { name: "Box of 12", price: 800 },
    ],
    flavours: ["Milk Chocolate", "Dark Chocolate"],
  },
  {
    id: "cookie-002",
    name: "Classic Butter Cookies",
    category: "Cookies",
    description:
      "Light, buttery homemade cookies with a delicate crunch and melt-in-your-mouth texture.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85",
    price: 250,
    soldOut: false,
    options: [
      { name: "Box of 4", price: 250 },
      { name: "Box of 6", price: 350 },
      { name: "Box of 12", price: 650 },
    ],
    flavours: ["Classic Butter", "Vanilla"],
  },
  {
    id: "cookie-003",
    name: "Double Chocolate Cookies",
    category: "Cookies",
    description:
      "Rich cocoa cookies packed with chocolate chunks for an extra chocolatey experience.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
    price: 400,
    soldOut: false,
    options: [
      { name: "Box of 4", price: 400 },
      { name: "Box of 6", price: 580 },
      { name: "Box of 12", price: 1100 },
    ],
    flavours: ["Dark Chocolate", "Milk Chocolate"],
  },
];

export default products;
