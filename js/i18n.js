// ---------- Internationalisation (FR / EN / ES) ----------
const LANG_STORAGE_KEY = "thedoner_lang";
const SUPPORTED_LANGS = ["fr", "en", "es"];
const LANG_META = {
  fr: { flag: "🇫🇷", code: "FR", name: "Français" },
  en: { flag: "🇬🇧", code: "EN", name: "English" },
  es: { flag: "🇪🇸", code: "ES", name: "Español" }
};

// ---- Chaînes de l'interface statique ----
const UI_STRINGS = {
  fr: {
    nav_home: "Accueil", nav_story: "L'histoire", nav_menu: "Menu", nav_contact: "Contact",
    cart_aria: "Voir le panier", burger_aria: "Menu", lang_aria: "Choisir la langue",
    ticker_homemade: "100% FAIT MAISON", ticker_lava: "CUISSON À LA PIERRE DE LAVE", ticker_turkish: "RECETTE TURQUE AUTHENTIQUE",
    hero_tagline: "THE DONER Fuengirola — Kebab & grillades turcs cuits à la pierre de lave, pain maison",
    hero_menu_btn: "Voir le menu", hero_wa_btn: "Commander sur WhatsApp", scroll_cue_aria: "Défiler",
    story_eyebrow: "Notre histoire", story_title: "Une recette turque, un esprit fuengirolais",
    story_text: "Chez THE DONER, la viande tourne lentement sur broche et cuit à la pierre de lave pour un goût fumé authentique. Pain maison pétri chaque jour, bulgur turc, sauces maison : tout est pensé pour un kebab généreux et sans compromis, servi en plein cœur de Fuengirola.",
    badge1_title: "Pain maison", badge1_sub: "pétri & cuit sur place",
    badge2_title: "Pierre de lave", badge2_sub: "cuisson authentique",
    badge3_title: "Bulgur turc", badge3_sub: "recette traditionnelle",
    menu_eyebrow: "La carte", menu_title: "Notre carte",
    menu_sub: "Ajoutez vos plats au panier, précisez vos envies, on s'occupe du reste.",
    menu_banner_alt: "Sélection de plats THE DONER",
    cat_kebab: "Kebab", cat_pide: "Pide", cat_grillades: "Grillades", cat_accompagnements: "Accompagnements",
    cat_snacks: "Snacks", cat_boissons: "Boissons", cat_desserts: "Desserts",
    video_eyebrow: "En vidéo", video_title: "Découvrez THE DONER",
    video_unsupported: "Votre navigateur ne supporte pas la lecture vidéo.",
    video_sound_btn: "🔇 Son coupé — cliquez pour activer", video_sound_aria: "Activer le son",
    social_eyebrow: "Réseaux sociaux", social_title: "Suivez-nous",
    social_sub: "Nouveautés, coulisses et offres exclusives — un clic pour ne rien rater.",
    contact_eyebrow: "Contact", contact_title: "Nous trouver",
    contact_address_label: "Adresse", contact_phone_label: "Téléphone / WhatsApp",
    contact_email_label: "Email commandes", contact_hours_label: "Horaires",
    hours_line1: "Lundi – Jeudi : 14h00 – 2h00", hours_line2: "Vendredi : 15h30 – 3h00",
    hours_line3: "Samedi : 14h00 – 3h00", hours_line4: "Dimanche : 14h00 – 2h00",
    contact_review_btn: "⭐ Voir / laisser un avis Google", contact_map_title: "Localisation THE DONER",
    footer_rights: "THE DONER — Fuengirola. Tous droits réservés.",
    customize_title_default: "Personnalisez votre plat", customize_close_aria: "Fermer",
    customize_note_placeholder: "Ajouter une remarque (optionnel)",
    customize_cancel: "Annuler", customize_confirm: "Confirmer —",
    cart_title: "Votre panier", cart_subtotal_label: "Sous-total", cart_delivery_label: "Frais de livraison",
    cart_total_label: "Total", cart_name_placeholder: "Votre nom", cart_phone_placeholder: "Votre téléphone",
    mode_takeaway: "À emporter", mode_delivery: "Livraison", mode_onsite: "Sur place",
    address_placeholder: "Adresse de livraison complète (rue, ville)", geolocate_title: "Utiliser ma position actuelle",
    cart_note_placeholder: "Remarques (optionnel)", cart_submit_btn: "Envoyer la commande sur WhatsApp",
    cart_hint: "Paiement à la livraison / sur place. Votre commande est envoyée par WhatsApp, on vous confirme directement.",
    unavailable: "Indisponible", customize_btn: "Personnaliser", add_btn: "Ajouter", added_btn: "Ajouté ✓",
    toast_added: "{name} ajouté au panier", oos_badge: "Rupture", price_from_prefix: "dès",
    base_label_default: "Choisis ta base", section_meat: "Choisis ta viande", section_sauce: "Choisis ta sauce",
    section_extra: "Envie d'un extra ?", section_crudites: "Choisis tes crudités", section_cheese: "Choisis ton supplément",
    section_accomp: "Choisis ton accompagnement", section_drink: "Choisis ta boisson",
    field_meat: "Viande", field_sauce: "Sauce", field_extra: "Extra", field_cheese: "Fromage",
    field_drink: "Boisson", field_note: "Note",
    cart_empty: "Votre panier est vide pour l'instant.", remove_btn: "Retirer",
    toast_cart_empty: "Votre panier est vide", toast_calculating: "Calcul des frais de livraison en cours…",
    toast_wait_calc: "Merci de patienter pendant le calcul des frais de livraison",
    delivery_calculating: "Calcul des frais de livraison…",
    delivery_out_of_range: "Adresse à {km} km — hors zone de livraison (20 km max). Contactez-nous directement.",
    delivery_success: "Distance : ~{km} km — Frais de livraison : {fee} €",
    delivery_not_found: "Adresse introuvable — précisez la rue et la ville.",
    geoloc_unavailable: "La géolocalisation n'est pas disponible sur cet appareil.",
    geoloc_locating: "Localisation en cours…",
    geoloc_error: "Position indisponible — vérifiez que la géolocalisation est autorisée, ou saisissez l'adresse manuellement.",
    address_required: "Merci de renseigner votre adresse de livraison."
  },
  en: {
    nav_home: "Home", nav_story: "Our story", nav_menu: "Menu", nav_contact: "Contact",
    cart_aria: "View cart", burger_aria: "Menu", lang_aria: "Choose language",
    ticker_homemade: "100% HOMEMADE", ticker_lava: "COOKED ON LAVA STONE", ticker_turkish: "AUTHENTIC TURKISH RECIPE",
    hero_tagline: "THE DONER Fuengirola — Turkish kebab & grill dishes cooked on lava stone, homemade bread",
    hero_menu_btn: "View menu", hero_wa_btn: "Order on WhatsApp", scroll_cue_aria: "Scroll",
    story_eyebrow: "Our story", story_title: "A Turkish recipe, a Fuengirola spirit",
    story_text: "At THE DONER, the meat turns slowly on the spit and cooks on lava stone for an authentic smoky flavour. Homemade bread kneaded every day, Turkish bulgur, homemade sauces: everything is designed for a generous, no-compromise kebab, served in the heart of Fuengirola.",
    badge1_title: "Homemade bread", badge1_sub: "kneaded & baked on site",
    badge2_title: "Lava stone", badge2_sub: "authentic cooking",
    badge3_title: "Turkish bulgur", badge3_sub: "traditional recipe",
    menu_eyebrow: "The menu", menu_title: "Our menu",
    menu_sub: "Add your dishes to the cart, tell us what you'd like, we'll take care of the rest.",
    menu_banner_alt: "Selection of THE DONER dishes",
    cat_kebab: "Kebab", cat_pide: "Pide", cat_grillades: "Grills", cat_accompagnements: "Sides",
    cat_snacks: "Snacks", cat_boissons: "Drinks", cat_desserts: "Desserts",
    video_eyebrow: "On video", video_title: "Discover THE DONER",
    video_unsupported: "Your browser does not support video playback.",
    video_sound_btn: "🔇 Muted — click to unmute", video_sound_aria: "Unmute",
    social_eyebrow: "Social media", social_title: "Follow us",
    social_sub: "News, behind the scenes and exclusive offers — just one click away.",
    contact_eyebrow: "Contact", contact_title: "Find us",
    contact_address_label: "Address", contact_phone_label: "Phone / WhatsApp",
    contact_email_label: "Order email", contact_hours_label: "Opening hours",
    hours_line1: "Monday – Thursday: 2:00 PM – 2:00 AM", hours_line2: "Friday: 3:30 PM – 3:00 AM",
    hours_line3: "Saturday: 2:00 PM – 3:00 AM", hours_line4: "Sunday: 2:00 PM – 2:00 AM",
    contact_review_btn: "⭐ View / leave a Google review", contact_map_title: "THE DONER location",
    footer_rights: "THE DONER — Fuengirola. All rights reserved.",
    customize_title_default: "Customize your dish", customize_close_aria: "Close",
    customize_note_placeholder: "Add a note (optional)",
    customize_cancel: "Cancel", customize_confirm: "Confirm —",
    cart_title: "Your cart", cart_subtotal_label: "Subtotal", cart_delivery_label: "Delivery fee",
    cart_total_label: "Total", cart_name_placeholder: "Your name", cart_phone_placeholder: "Your phone number",
    mode_takeaway: "Takeaway", mode_delivery: "Delivery", mode_onsite: "Eat in",
    address_placeholder: "Full delivery address (street, city)", geolocate_title: "Use my current location",
    cart_note_placeholder: "Notes (optional)", cart_submit_btn: "Send order on WhatsApp",
    cart_hint: "Payment on delivery / on site. Your order is sent via WhatsApp, we'll confirm it right away.",
    unavailable: "Unavailable", customize_btn: "Customize", add_btn: "Add", added_btn: "Added ✓",
    toast_added: "{name} added to cart", oos_badge: "Out of stock", price_from_prefix: "from",
    base_label_default: "Choose your base", section_meat: "Choose your meat", section_sauce: "Choose your sauce",
    section_extra: "Fancy an extra?", section_crudites: "Choose your toppings", section_cheese: "Choose your extra",
    section_accomp: "Choose your side", section_drink: "Choose your drink",
    field_meat: "Meat", field_sauce: "Sauce", field_extra: "Extra", field_cheese: "Cheese",
    field_drink: "Drink", field_note: "Note",
    cart_empty: "Your cart is empty for now.", remove_btn: "Remove",
    toast_cart_empty: "Your cart is empty", toast_calculating: "Calculating delivery fee…",
    toast_wait_calc: "Please wait while we calculate the delivery fee",
    delivery_calculating: "Calculating delivery fee…",
    delivery_out_of_range: "Address {km} km away — outside the delivery zone (20 km max). Please contact us directly.",
    delivery_success: "Distance: ~{km} km — Delivery fee: {fee} €",
    delivery_not_found: "Address not found — please specify the street and city.",
    geoloc_unavailable: "Geolocation isn't available on this device.",
    geoloc_locating: "Locating…",
    geoloc_error: "Location unavailable — check that geolocation is allowed, or enter the address manually.",
    address_required: "Please enter your delivery address."
  },
  es: {
    nav_home: "Inicio", nav_story: "Nuestra historia", nav_menu: "Menú", nav_contact: "Contacto",
    cart_aria: "Ver carrito", burger_aria: "Menú", lang_aria: "Elegir idioma",
    ticker_homemade: "100% CASERO", ticker_lava: "COCCIÓN A LA PIEDRA VOLCÁNICA", ticker_turkish: "RECETA TURCA AUTÉNTICA",
    hero_tagline: "THE DONER Fuengirola — Kebab y parrilladas turcas cocinadas a la piedra volcánica, pan casero",
    hero_menu_btn: "Ver el menú", hero_wa_btn: "Pedir por WhatsApp", scroll_cue_aria: "Desplazar",
    story_eyebrow: "Nuestra historia", story_title: "Una receta turca, un espíritu fuengiroleño",
    story_text: "En THE DONER, la carne gira lentamente en el asador y se cocina a la piedra volcánica para un sabor ahumado auténtico. Pan casero amasado cada día, bulgur turco, salsas caseras: todo está pensado para un kebab generoso y sin concesiones, servido en pleno corazón de Fuengirola.",
    badge1_title: "Pan casero", badge1_sub: "amasado y horneado en el local",
    badge2_title: "Piedra volcánica", badge2_sub: "cocción auténtica",
    badge3_title: "Bulgur turco", badge3_sub: "receta tradicional",
    menu_eyebrow: "La carta", menu_title: "Nuestra carta",
    menu_sub: "Añade tus platos al carrito, indícanos tus preferencias, nosotros nos encargamos del resto.",
    menu_banner_alt: "Selección de platos THE DONER",
    cat_kebab: "Kebab", cat_pide: "Pide", cat_grillades: "Parrilladas", cat_accompagnements: "Acompañamientos",
    cat_snacks: "Snacks", cat_boissons: "Bebidas", cat_desserts: "Postres",
    video_eyebrow: "En vídeo", video_title: "Descubre THE DONER",
    video_unsupported: "Tu navegador no admite la reproducción de vídeo.",
    video_sound_btn: "🔇 Silenciado — haz clic para activar", video_sound_aria: "Activar el sonido",
    social_eyebrow: "Redes sociales", social_title: "Síguenos",
    social_sub: "Novedades, detrás de cámaras y ofertas exclusivas — a solo un clic.",
    contact_eyebrow: "Contacto", contact_title: "Cómo encontrarnos",
    contact_address_label: "Dirección", contact_phone_label: "Teléfono / WhatsApp",
    contact_email_label: "Email de pedidos", contact_hours_label: "Horario",
    hours_line1: "Lunes – Jueves: 14:00 – 2:00", hours_line2: "Viernes: 15:30 – 3:00",
    hours_line3: "Sábado: 14:00 – 3:00", hours_line4: "Domingo: 14:00 – 2:00",
    contact_review_btn: "⭐ Ver / dejar una reseña en Google", contact_map_title: "Ubicación THE DONER",
    footer_rights: "THE DONER — Fuengirola. Todos los derechos reservados.",
    customize_title_default: "Personaliza tu plato", customize_close_aria: "Cerrar",
    customize_note_placeholder: "Añadir una nota (opcional)",
    customize_cancel: "Cancelar", customize_confirm: "Confirmar —",
    cart_title: "Tu carrito", cart_subtotal_label: "Subtotal", cart_delivery_label: "Gastos de envío",
    cart_total_label: "Total", cart_name_placeholder: "Tu nombre", cart_phone_placeholder: "Tu teléfono",
    mode_takeaway: "Para llevar", mode_delivery: "Entrega a domicilio", mode_onsite: "Para comer aquí",
    address_placeholder: "Dirección de entrega completa (calle, ciudad)", geolocate_title: "Usar mi ubicación actual",
    cart_note_placeholder: "Notas (opcional)", cart_submit_btn: "Enviar el pedido por WhatsApp",
    cart_hint: "Pago al recibir / en el local. Tu pedido se envía por WhatsApp, te confirmamos al instante.",
    unavailable: "No disponible", customize_btn: "Personalizar", add_btn: "Añadir", added_btn: "Añadido ✓",
    toast_added: "{name} añadido al carrito", oos_badge: "Agotado", price_from_prefix: "desde",
    base_label_default: "Elige tu base", section_meat: "Elige tu carne", section_sauce: "Elige tu salsa",
    section_extra: "¿Te apetece un extra?", section_crudites: "Elige tus vegetales", section_cheese: "Elige tu extra",
    section_accomp: "Elige tu acompañamiento", section_drink: "Elige tu bebida",
    field_meat: "Carne", field_sauce: "Salsa", field_extra: "Extra", field_cheese: "Queso",
    field_drink: "Bebida", field_note: "Nota",
    cart_empty: "Tu carrito está vacío por ahora.", remove_btn: "Quitar",
    toast_cart_empty: "Tu carrito está vacío", toast_calculating: "Calculando los gastos de envío…",
    toast_wait_calc: "Espera mientras calculamos los gastos de envío",
    delivery_calculating: "Calculando los gastos de envío…",
    delivery_out_of_range: "Dirección a {km} km — fuera de la zona de entrega (20 km máx). Contáctanos directamente.",
    delivery_success: "Distancia: ~{km} km — Gastos de envío: {fee} €",
    delivery_not_found: "Dirección no encontrada — indica la calle y la ciudad.",
    geoloc_unavailable: "La geolocalización no está disponible en este dispositivo.",
    geoloc_locating: "Localizando…",
    geoloc_error: "Ubicación no disponible — comprueba que la geolocalización esté permitida, o introduce la dirección manualmente.",
    address_required: "Indica tu dirección de entrega, por favor."
  }
};

// ---- Termes récurrents (options de personnalisation, sauces, crudités…) ----
// Clé = texte français source (référence canonique utilisée pour le message WhatsApp).
const TERMS = {
  "Pain maison": { en: "Homemade bread", es: "Pan casero" },
  "Tortilla wrap": { en: "Tortilla wrap", es: "Wrap de tortilla" },
  "Galette / tortilla wrap": { en: "Flatbread / tortilla wrap", es: "Galette / wrap de tortilla" },
  "Choisis ta boisson": { en: "Choose your drink", es: "Elige tu bebida" },
  "Veau": { en: "Veal", es: "Ternera" },
  "Dinde": { en: "Turkey", es: "Pavo" },
  "Poulet": { en: "Chicken", es: "Pollo" },
  "Falafel": { en: "Falafel", es: "Falafel" },
  "Blanche maison": { en: "Homemade white sauce", es: "Blanca casera" },
  "Mayonnaise": { en: "Mayonnaise", es: "Mayonesa" },
  "Algérienne": { en: "Algerian sauce", es: "Salsa argelina" },
  "Moutarde": { en: "Mustard", es: "Mostaza" },
  "Samouraï": { en: "Samurai sauce", es: "Salsa samurái" },
  "Biggy": { en: "Biggy sauce", es: "Salsa Biggy" },
  "Barbecue": { en: "Barbecue", es: "Barbacoa" },
  "Moutarde miel": { en: "Honey mustard", es: "Mostaza y miel" },
  "Salade": { en: "Lettuce", es: "Lechuga" },
  "Tomate": { en: "Tomato", es: "Tomate" },
  "Oignon": { en: "Onion", es: "Cebolla" },
  "Chou rouge mariné": { en: "Marinated red cabbage", es: "Col lombarda marinada" },
  "Maïs": { en: "Corn", es: "Maíz" },
  "Grenade": { en: "Pomegranate", es: "Granada" },
  "Poivrons confits": { en: "Confit peppers", es: "Pimientos confitados" },
  "Carotte râpée": { en: "Grated carrot", es: "Zanahoria rallada" },
  "Concombre": { en: "Cucumber", es: "Pepino" },
  "Olive": { en: "Olives", es: "Aceitunas" },
  "Fêta": { en: "Feta", es: "Feta" },
  "Vache kiri": { en: "Kiri cream cheese", es: "Queso Kiri" },
  "Gruyère râpé": { en: "Grated Gruyère", es: "Gruyère rallado" },
  "Frites": { en: "Fries", es: "Patatas fritas" },
  "Boulgour": { en: "Bulgur", es: "Bulgur" },
  "Riz": { en: "Rice", es: "Arroz" },
  "Kebab veau/dinde": { en: "Veal/turkey kebab", es: "Kebab de ternera/pavo" },
  "Kebab poulet": { en: "Chicken kebab", es: "Kebab de pollo" },
  "Coca Zéro": { en: "Coca Zero", es: "Coca Zero" },
  "Oasis framboise": { en: "Oasis raspberry", es: "Oasis frambuesa" },
  "Nestea Frutos Rojos": { en: "Nestea red berries", es: "Nestea frutos rojos" }
};

// ---- Traductions des plats de la carte (nom / description) ----
const MENU_I18N = {
  "kebab-classic": { en: { name: "Kebab", desc: "Choice of meat, lettuce, tomato, onion, cheese and sauce." }, es: { name: "Kebab", desc: "Carne a elegir, lechuga, tomate, cebolla, queso y salsa." } },
  "kebab-lahmacun": { en: { name: "Lahmacun", desc: "Thin Turkish flatbread topped with spiced minced meat." }, es: { name: "Lahmacun", desc: "Fina masa turca cubierta con carne picada especiada." } },
  "pide-viande": { en: { name: "Minced Meat Pide", desc: "Minced meat, mozzarella, peppers and onion." }, es: { name: "Pide de Carne Picada", desc: "Carne picada, mozzarella, pimientos y cebolla." } },
  "pide-sucuk": { en: { name: "Sucuk Pide", desc: "Sucuk, mozzarella." }, es: { name: "Pide de Sucuk", desc: "Sucuk, mozzarella." } },
  "pide-fromages": { en: { name: "Three Cheese Pide", desc: "Mozzarella, emmental, goat cheese." }, es: { name: "Pide Tres Quesos", desc: "Mozzarella, emmental, queso de cabra." } },
  "pide-poulet": { en: { name: "Chicken Pide", desc: "Chicken, mozzarella, peppers and onion." }, es: { name: "Pide de Pollo", desc: "Pollo, mozzarella, pimientos y cebolla." } },
  "grillade-adana": { en: { name: "Adana", desc: "Spiced lamb skewer grilled on lava stone." }, es: { name: "Adana", desc: "Brocheta de cordero especiada a la parrilla de piedra volcánica." } },
  "grillade-poulet": { en: { name: "Chicken Skewer", desc: "Grilled chicken skewer." }, es: { name: "Brocheta de Pollo", desc: "Brocheta de pollo a la parrilla." } },
  "grillade-poulet-poivron": { en: { name: "Chicken & Pepper Skewer", desc: "Grilled chicken and pepper skewer." }, es: { name: "Brocheta de Pollo y Pimiento", desc: "Brocheta de pollo y pimiento a la parrilla." } },
  "grillade-kefta": { en: { name: "Kefta", desc: "Grilled spiced meatballs." }, es: { name: "Kefta", desc: "Albóndigas especiadas a la parrilla." } },
  "acc-riz": { en: { name: "Rice", desc: "Extra side dish." }, es: { name: "Arroz", desc: "Acompañamiento extra." } },
  "acc-boulgour": { en: { name: "Bulgur", desc: "Turkish bulgur, extra side dish." }, es: { name: "Bulgur", desc: "Bulgur turco, acompañamiento extra." } },
  "acc-frites": { en: { name: "Fries", desc: "Extra side dish." }, es: { name: "Patatas Fritas", desc: "Acompañamiento extra." } },
  "snack-mozza": { en: { name: "Mozzarella Sticks", desc: "Breaded mozzarella sticks (x4)." }, es: { name: "Mozzarella Sticks", desc: "Palitos de mozzarella empanados (x4)." } },
  "snack-tenders": { en: { name: "Tenders", desc: "Crispy chicken tenders." }, es: { name: "Tenders", desc: "Tiras de pollo crujientes." } },
  "snack-wings": { en: { name: "Wings", desc: "Grilled chicken wings (x4)." }, es: { name: "Alitas", desc: "Alitas de pollo a la parrilla (x4)." } },
  "boisson-canette": { en: { name: "Can", desc: "Chilled drink of your choice, Spanish selection." }, es: { name: "Lata", desc: "Bebida fresca a elegir, selección española." } },
  "boisson-eau": { en: { name: "Font Vella", desc: "Spanish mineral water." }, es: { name: "Font Vella", desc: "Agua mineral española." } },
  "dessert-tiramisu": { en: { name: "Tiramisu", desc: "Homemade." }, es: { name: "Tiramisú", desc: "Casero." } },
  "dessert-baklava": { en: { name: "Baklava", desc: "Turkish pastry with honey and pistachio." }, es: { name: "Baklava", desc: "Pastel turco con miel y pistacho." } }
};

// ---------- Moteur ----------
let currentLang = SUPPORTED_LANGS.includes(localStorage.getItem(LANG_STORAGE_KEY)) ? localStorage.getItem(LANG_STORAGE_KEY) : "fr";

function t(key, vars) {
  let str = (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) || UI_STRINGS.fr[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace("{" + k + "}", vars[k]); });
  }
  return str;
}

// Traduit un terme récurrent (option de personnalisation) ; renvoie le texte français si aucune traduction n'existe.
function tt(frText) {
  if (currentLang === "fr" || !frText) return frText;
  const entry = TERMS[frText];
  return (entry && entry[currentLang]) || frText;
}

function translatedItemName(item) {
  const i18n = MENU_I18N[item.id];
  if (currentLang === "fr" || !i18n || !i18n[currentLang]) return item.name;
  return i18n[currentLang].name || item.name;
}

function translatedItemDesc(item) {
  const i18n = MENU_I18N[item.id];
  if (currentLang === "fr" || !i18n || !i18n[currentLang]) return item.desc;
  return i18n[currentLang].desc || item.desc;
}

function translatedCategoryLabel(cat) {
  return t("cat_" + cat.id) || cat.label;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel)); });
  document.querySelectorAll("[data-i18n-title]").forEach(el => { el.setAttribute("title", t(el.dataset.i18nTitle)); });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.setAttribute("alt", t(el.dataset.i18nAlt)); });
  updateLangSwitcherUI();
}

function updateLangSwitcherUI() {
  const meta = LANG_META[currentLang];
  const flagEl = document.getElementById("langFlagCurrent");
  const codeEl = document.getElementById("langCodeCurrent");
  if (flagEl) flagEl.textContent = meta.flag;
  if (codeEl) codeEl.textContent = meta.code;
  document.querySelectorAll(".lang-opt").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) {
    closeLangMenu();
    return;
  }
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyStaticTranslations();
  if (typeof renderMenu === "function") renderMenu();
  if (typeof renderCart === "function") renderCart();
  closeLangMenu();
}

function closeLangMenu() {
  const menu = document.getElementById("langMenu");
  const btn = document.getElementById("langBtn");
  if (menu) menu.hidden = true;
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function wireLangSwitcher() {
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll(".lang-opt").forEach(opt => {
    opt.addEventListener("click", () => setLanguage(opt.dataset.lang));
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#langSwitcher")) closeLangMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLangMenu();
  });
}

applyStaticTranslations();
wireLangSwitcher();
