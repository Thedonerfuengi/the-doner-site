// Données de la carte THE DONER — Fuengirola
// Prix de base synchronisés depuis l'API publique de la borne (commandepos.fr) au chargement de la page.
// "pos" = nom exact du produit côté borne, utilisé pour la synchronisation prix/disponibilité (voir pos-sync.js).
const DRINKS = ["Coca", "Coca cherry", "Coca Zéro", "Oasis tropical", "Oasis framboise", "Orangina", "Aquarius", "Sprite", "Fanta orange", "Fuze tea", "Nestea Maracuya", "Nestea Frutos Rojos"];
const DRINK_PRICE = 1.50;

const MENU = [
  {
    id: "kebab",
    label: "Kebab",
    items: [
      {
        id: "kebab-classic",
        name: "Kebab",
        desc: "Viande au choix, salade, tomate, oignon, fromage et sauce.",
        img: "assets/img/menu/kebab.png",
        basePrice: 8.90,
        baseChoices: [
          { label: "Pain maison", price: 8.90, pos: "Kebab Pain maison" },
          { label: "Tortilla wrap", price: 8.90, pos: "Kebab Tortilla" },
          { label: "Bowl", price: 11.90, pos: "Kebab Bowl" }
        ],
        meatChoices: ["Veau", "Dinde", "Poulet", "Falafel", "Tenders"]
      },
      {
        id: "kebab-lahmacun",
        name: "Lahmacun",
        desc: "Fine galette turque garnie de viande hachée épicée.",
        img: "assets/img/menu/lahmacun.webp",
        basePrice: 6.90,
        pos: "Lahmacun"
      }
    ]
  },
  {
    id: "pide",
    label: "Pide",
    items: [
      { id: "pide-viande", name: "Pide Viande Hachée", desc: "Viande hachée, mozzarella, poivrons et oignon.", img: "assets/img/menu/pide-viande-hachee.png", basePrice: 9.90, pos: "Pidé Viande hachée" },
      { id: "pide-sucuk", name: "Pide Sucuk", desc: "Sucuk, mozzarella.", img: "assets/img/menu/pide-sucuk.png", basePrice: 9.90, pos: "Pidé Sucuk" },
      { id: "pide-fromages", name: "Pide Trois Fromages", desc: "Mozzarella, emmental, chèvre.", img: "assets/img/menu/pide-fromages.png", basePrice: 9.90, pos: "Pidé 3 fromages" },
      { id: "pide-poulet", name: "Pide Poulet", desc: "Poulet, mozzarella, poivrons et oignon.", img: "assets/img/menu/pide-poulet.png", basePrice: 9.90, pos: "Pidé Poulet" }
    ]
  },
  {
    id: "grillades",
    label: "Grillades",
    items: [
      {
        id: "grillade-adana",
        name: "Adana",
        desc: "Brochette d'agneau épicée grillée à la pierre de lave.",
        img: "assets/img/menu/adana.png",
        basePrice: 10.90,
        pos: "ADANA",
        baseChoices: [
          { label: "Pain maison", price: 10.90 },
          { label: "Galette / tortilla wrap", price: 10.90 },
          { label: "Bowl", price: 12.90 }
        ]
      },
      {
        id: "grillade-poulet",
        name: "Brochette Poulet",
        desc: "Brochette de poulet grillée.",
        img: "assets/img/menu/brochette-poulet.png",
        basePrice: 10.90,
        pos: "Brochette poulet",
        baseChoices: [
          { label: "Pain maison", price: 10.90 },
          { label: "Galette / tortilla wrap", price: 10.90 },
          { label: "Bowl", price: 12.90 }
        ]
      },
      {
        id: "grillade-poulet-poivron",
        name: "Brochette Poulet Poivron",
        desc: "Brochette de poulet et poivrons grillés.",
        img: "assets/img/menu/brochette-poulet-poivron.png",
        basePrice: 10.90,
        pos: "Brochette Poulet Poivron",
        baseChoices: [
          { label: "Pain maison", price: 10.90 },
          { label: "Galette / tortilla wrap", price: 10.90 },
          { label: "Bowl", price: 12.90 }
        ]
      },
      {
        id: "grillade-kefta",
        name: "Kefta",
        desc: "Boulettes de viande épicées grillées.",
        img: "assets/img/menu/kefta.png",
        basePrice: 10.90,
        pos: "Kefta",
        baseChoices: [
          { label: "Pain maison", price: 10.90 },
          { label: "Galette / tortilla wrap", price: 10.90 },
          { label: "Bowl", price: 12.90 }
        ]
      }
    ]
  },
  {
    id: "accompagnements",
    label: "Accompagnements",
    items: [
      { id: "acc-riz", name: "Riz", desc: "Accompagnement en supplément.", img: "assets/img/menu/riz.png", basePrice: 2.50, pos: "Riz" },
      { id: "acc-boulgour", name: "Boulgour", desc: "Bulgur turc, accompagnement en supplément.", img: "assets/img/menu/boulgour.png", basePrice: 2.50, pos: "Boulgour" },
      { id: "acc-frites", name: "Frites", desc: "Accompagnement en supplément.", img: "assets/img/menu/frites.png", basePrice: 2.50, pos: "Frites" }
    ]
  },
  {
    id: "snacks",
    label: "Snacks",
    items: [
      { id: "snack-mozza", name: "Mozzarella Sticks", desc: "Bâtonnets de mozzarella panés (x4).", img: "assets/img/menu/mozza-sticks.png", basePrice: 6.00, pos: "Mozza stick x4" },
      { id: "snack-tenders", name: "Tenders", desc: "Tenders de poulet croustillants.", img: "assets/img/menu/tenders.png", basePrice: 4.90, pos: "Tenders" },
      { id: "snack-wings", name: "Wings", desc: "Ailes de poulet grillées (x4).", img: "assets/img/menu/wings.png", basePrice: 6.90, pos: "Wings x4" }
    ]
  },
  {
    id: "boissons",
    label: "Boissons",
    items: [
      {
        id: "boisson-canette",
        name: "Canette",
        desc: "Boisson fraîche au choix, sélection espagnole.",
        img: "assets/img/menu/canette-coca.jpg",
        basePrice: 2.50,
        onlyBase: true,
        baseLabel: "Choisis ta boisson",
        baseChoices: DRINKS.map(d => ({ label: d, price: 2.50 }))
      },
      { id: "boisson-eau", name: "Font Vella", desc: "Eau minérale espagnole.", img: "assets/img/menu/font-vella.jpg", basePrice: 1.50, pos: "Eau" }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { id: "dessert-tiramisu", name: "Tiramisu", desc: "Fait maison.", img: "assets/img/menu/tiramisu.png", basePrice: 5.50, pos: "Tiramisu" },
      { id: "dessert-baklava", name: "Baklava", desc: "Pâtisserie turque au miel et pistache.", img: "assets/img/menu/baklava.png", basePrice: 6.90, pos: "Baklava" }
    ]
  }
];

// Étapes de personnalisation — reproduisent exactement le parcours de la borne de commande
// (https://commandepos.fr/caisse.html) : base > viande > sauce > extra > crudités > supplément > accompagnement > boisson
const SAUCES = ["Blanche maison", "Mayonnaise", "Ketchup", "Algérienne", "Moutarde", "Samouraï", "Harissa", "Biggy", "Barbecue", "Moutarde miel"];

const CRUDITES = [
  { name: "Salade", price: 0 },
  { name: "Tomate", price: 0 },
  { name: "Oignon", price: 0 },
  { name: "Chou rouge mariné", price: 0 },
  { name: "Maïs", price: 0 },
  { name: "Grenade", price: 0.50 },
  { name: "Poivrons confits", price: 0.50 },
  { name: "Carotte râpée", price: 0.50 },
  { name: "Concombre", price: 0.50 },
  { name: "Olive", price: 0.50 },
  { name: "Jalapenos", price: 0.50 }
];

const SUPPLEMENTS_FROMAGE = [
  { name: "Fêta", price: 1.00 },
  { name: "Emmental", price: 1.00 },
  { name: "Cheddar", price: 1.00 },
  { name: "Vache kiri", price: 1.00 },
  { name: "Gruyère râpé", price: 1.00 }
];

const ACCOMPAGNEMENTS_STEP = [
  { name: "Frites", price: 1.00 },
  { name: "Boulgour", price: 2.50 },
  { name: "Riz", price: 2.50 }
];

const EXTRA_PROTEIN = [
  { name: "Adana", price: 5.00 },
  { name: "Kefta", price: 5.00 },
  { name: "Poulet", price: 5.00 },
  { name: "Kebab veau/dinde", price: 5.00, outOfStock: true },
  { name: "Kebab poulet", price: 5.00 },
  { name: "Tenders", price: 3.00 },
  { name: "Falafel", price: 3.00 }
];

// ---------- Frais de livraison selon la distance au restaurant ----------
const RESTAURANT_ADDRESS = "Calle Jacinto Benavente 1, 29640 Fuengirola, Espagne";
const RESTAURANT_COORDS = { lat: 36.5408546, lng: -4.6213142 }; // Calle Jacinto Benavente, Fuengirola (géocodé)

const DELIVERY_TIERS = [
  { maxKm: 3, fee: 4.00 },
  { maxKm: 10, fee: 8.00 },
  { maxKm: 20, fee: 15.00 }
];

function deliveryFeeForDistance(km) {
  for (const tier of DELIVERY_TIERS) {
    if (km <= tier.maxKm) return tier.fee;
  }
  return null; // hors zone de livraison
}
