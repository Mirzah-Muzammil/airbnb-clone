"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, "properties.db");
const db = new better_sqlite3_1.default(dbPath);
const properties = [
    {
        title: "Arabian Sea Villa",
        location: "Goa, India",
        price: 8500,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80&sat=-10"
        ],
        description: "Wake up to soft sea breezes in this calm, sunlit villa a short walk from the sand. The home blends coastal textures with modern comforts, featuring a shaded verandah, airy bedrooms, and a quiet workspace. Spend your day exploring beach shacks and sunset viewpoints, then unwind with a book by the plunge pool. Ideal for families or friends who want privacy without being far from the shoreline."
    },
    {
        title: "Pink City Courtyard Home",
        location: "Jaipur, India",
        price: 4200,
        rating: 4.3,
        images: [
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80&sat=-20",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "A heritage-inspired stay tucked into the lively lanes of Jaipur. This two-bedroom home wraps around a sunlit courtyard with a small fountain and jali screens for natural ventilation. The interiors pair handcrafted textiles with clean lines, creating a calm retreat after bustling market visits. Enjoy rooftop chai, quick access to iconic forts, and a cozy lounge for late-night conversations."
    },
    {
        title: "Mist Valley Cottage",
        location: "Munnar, India",
        price: 3100,
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80&sat=-15",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Nestled among tea plantations, this cottage offers cool mornings, misty views, and a quiet rhythm. The living room opens to a private garden with seating for stargazing, while the bedroom features warm wood accents and plush linens. A compact kitchen makes simple meals easy, and nearby trails lead to waterfalls and scenic lookouts. Perfect for couples who love nature and slow travel."
    },
    {
        title: "Himalayan A-Frame",
        location: "Manali, India",
        price: 5600,
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80&sat=-10",
            "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "A cozy A-frame with panoramic mountain views and a crackling fireplace for chilly nights. The cabin has high ceilings, a loft reading nook, and a spacious deck for morning coffee. Ski slopes and forest walks are just a short drive away, while the town center is close enough for dining. Unplug, breathe crisp air, and enjoy a warm, wood-and-wool atmosphere."
    },
    {
        title: "Marine Drive Studio",
        location: "Mumbai, India",
        price: 9800,
        rating: 4.0,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80&sat=-25",
            "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Sleek and bright, this studio sits near the iconic seafront promenade. Floor-to-ceiling windows frame the skyline, while the compact kitchen and smart storage make longer stays comfortable. Walk to cafes, galleries, and late-night street food, then return to a quiet, air-conditioned space. Ideal for business travelers or solo explorers who want a central base with style."
    },
    {
        title: "Lake Palace View Suite",
        location: "Udaipur, India",
        price: 12500,
        rating: 5.0,
        images: [
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80&sat=-15",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Overlooking the lake, this suite blends quiet luxury with local artistry. The bedroom opens to a private balcony where morning light dances on the water. Inside, you will find a plush seating area, carved wood details, and a serene bathroom with a soaking tub. Walkable to heritage sites and boat piers, it is a romantic choice for special trips."
    },
    {
        title: "Backwater Breeze House",
        location: "Kochi, India",
        price: 2700,
        rating: 3.8,
        images: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80&sat=-20",
            "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "A relaxed riverside home with open-air sit-outs and leafy views. The house is simple, tidy, and designed for easy living, with ceiling fans, a small kitchen, and two airy bedrooms. Spend afternoons watching fishing boats and evenings tasting local seafood nearby. A practical, peaceful option for travelers seeking the charm of Kerala without heavy crowds."
    },
    {
        title: "Garden City Loft",
        location: "Bengaluru, India",
        price: 6400,
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80&sat=-10",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "This loft combines warm textures with modern convenience in a leafy neighborhood. The double-height living area keeps it bright, while the mezzanine bedroom adds a boutique-hotel feel. Cafes, coworking spaces, and parks are close by, making it easy to balance work and downtime. A great option for longer stays with reliable Wi-Fi and a calm, residential vibe."
    },
    {
        title: "Ganga Retreat Cabin",
        location: "Rishikesh, India",
        price: 1900,
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80&sat=-15",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "A compact cabin near the river, ideal for yoga mornings and quiet evenings. The space is minimal yet comfortable, with natural light, a small patio, and thoughtful touches like a tea corner. Walk to nearby ashrams and cafes, or relax with the sound of the water. It is a simple, soulful base for travelers focused on wellness and nature."
    },
    {
        title: "Heritage Lane Bungalow",
        location: "Pondicherry, India",
        price: 25000,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80&sat=-10",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "A spacious bungalow with French-colonial touches, set along a quiet lane near the promenade. High ceilings, patterned tiles, and airy rooms keep the home cool throughout the day. Enjoy private meals in the courtyard, take leisurely walks to cafes, and return to a peaceful, elegant space. Perfect for groups who want a premium stay and easy beach access."
    }
];
const createTable = `
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating REAL NOT NULL,
    images TEXT NOT NULL,
    description TEXT NOT NULL
  );
`;
db.exec(createTable);
db.prepare("DELETE FROM properties").run();
const insert = db.prepare(`INSERT INTO properties (title, location, price, rating, images, description)
   VALUES (@title, @location, @price, @rating, @images, @description)`);
const insertMany = db.transaction((items) => {
    for (const item of items) {
        insert.run({
            ...item,
            images: JSON.stringify(item.images)
        });
    }
});
insertMany(properties);
db.close();
console.log(`Seeded ${properties.length} properties.`);
