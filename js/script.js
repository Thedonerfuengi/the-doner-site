// ---------- State ----------
let cart = JSON.parse(localStorage.getItem("thedoner_cart") || "[]");

// ---------- Animated food marquee (images from "the kebab 3") ----------
const marqueeTrack = document.getElementById("marqueeTrack");
if (marqueeTrack) {
  const marqueeImages = [
    ["assets/img/menu/adana.png", "Adana"],
    ["assets/img/menu/bowl.png", "Bowl"],
    ["assets/img/menu/kebab.png", "Kebab pain maison"],
    ["assets/img/menu/tortilla.png", "Kebab tortilla wrap"],
    ["assets/img/menu/kefta.png", "Kefta"],
    ["assets/img/menu/brochette-poulet.png", "Brochette poulet"],
    ["assets/img/menu/pide-poulet.png", "Pide poulet"],
    ["assets/img/menu/pide-sucuk.png", "Pide sucuk"],
    ["assets/img/menu/riz.png", "Riz"],
    ["assets/img/menu/tiramisu.png", "Tiramisu"],
    ["assets/img/menu/baklava.png", "Baklava"],
    ["assets/img/menu/wings.png", "Wings"]
  ];
  const html = marqueeImages.map(([src, alt]) => `<img src="${src}" alt="${alt}" loading="lazy">`).join("");
  marqueeTrack.innerHTML = html + html; // duplicated for seamless loop
}

// ---------- Pre-filled WhatsApp CTAs (hero, contact, floating button) ----------
const waDefaultMsg = encodeURIComponent("Bonjour THE DONER 👋 Je souhaite passer une commande !");
document.querySelectorAll(".wa-cta").forEach(a => {
  a.href = `https://wa.me/34623618108?text=${waDefaultMsg}`;
});

// ---------- Render menu ----------
const tabsEl = document.getElementById("menuTabs");
const panelsEl = document.getElementById("menuPanels");

function renderMenu() {
  const activeId = document.querySelector(".menu-tab.active")?.dataset.target || MENU[0].id;
  tabsEl.innerHTML = "";
  panelsEl.innerHTML = "";

  MENU.forEach((cat, i) => {
    const isActive = cat.id === activeId;
    const tab = document.createElement("button");
    tab.className = "menu-tab" + (isActive ? " active" : "");
    tab.textContent = cat.label;
    tab.dataset.target = cat.id;
    tab.addEventListener("click", () => switchTab(cat.id));
    tabsEl.appendChild(tab);

    const panel = document.createElement("div");
    panel.className = "menu-panel" + (isActive ? " active" : "");
    panel.id = "panel-" + cat.id;

    cat.items.forEach(item => {
      panel.appendChild(buildCard(item));
    });

    panelsEl.appendChild(panel);
  });
}

renderMenu();

// ---------- Synchronisation avec la borne de commande (commandepos.fr) ----------
// Utilise l'API publique (CORS ouvert) exposée par la borne pour récupérer les prix
// à jour et la disponibilité ("visible.site") de chaque produit, et les répercute sur le site.
const POS_PRODUCTS_API = "https://commandepos.fr/api_centrale/api/restaurants/6a3583e4882fc479e599dc29/products";

async function syncWithPOS() {
  let products;
  try {
    const res = await fetch(POS_PRODUCTS_API, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    products = await res.json();
  } catch (e) {
    console.warn("[Sync borne] Impossible de récupérer les données, prix statiques conservés :", e.message);
    return;
  }

  const byName = {};
  products.forEach(p => {
    byName[p.nom] = {
      price: p.prix && p.prix[0] ? p.prix[0].valeur : null,
      available: p.visible ? p.visible.site !== false : true
    };
  });

  MENU.forEach(cat => {
    cat.items.forEach(item => {
      if (item.baseChoices) {
        item.baseChoices.forEach(bc => {
          if (bc.pos && byName[bc.pos]) {
            const info = byName[bc.pos];
            if (info.price != null) bc.price = info.price;
            bc.available = info.available;
          }
        });
        if (!item.pos) {
          // Le prix/disponibilité du plat dépend entièrement de ses variantes (ex. Kebab)
          const avail = item.baseChoices.filter(bc => bc.available !== false);
          item.basePrice = avail.length ? Math.min(...avail.map(bc => bc.price)) : item.baseChoices[0].price;
          item.available = avail.length > 0;
        }
      }
      if (item.pos && byName[item.pos]) {
        const info = byName[item.pos];
        if (info.price != null) item.basePrice = info.price;
        item.available = info.available;
      }
    });
  });

  renderMenu();
  console.info("[Sync borne] Menu synchronisé (prix et disponibilité) à " + new Date().toLocaleTimeString());
}

syncWithPOS();
setInterval(syncWithPOS, 3 * 60 * 1000);

function switchTab(id) {
  const current = document.querySelector(".menu-panel.active");
  const next = document.getElementById("panel-" + id);
  if (!next || current === next) return;

  document.querySelectorAll(".menu-tab").forEach(t => t.classList.toggle("active", t.dataset.target === id));

  // Le changement de panneau est immédiat et fiable ; l'animation n'est qu'un bonus visuel
  // qui ne doit jamais bloquer l'affichage (ex. onglet en arrière-plan, animations suspendues).
  current.classList.remove("active");
  next.classList.add("active");

  if (window.gsap) {
    gsap.fromTo(next.children, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .5, stagger: .06, ease: "power3.out" });
  }
}

function buildCard(item) {
  const card = document.createElement("div");
  card.className = "menu-card" + (item.available === false ? " unavailable" : "");

  if (item.img) {
    const media = document.createElement("div");
    media.className = "menu-card-media";
    media.innerHTML = `<img src="${item.img}" alt="${item.name}" loading="lazy">`;
    card.appendChild(media);
  }

  if (item.available === false) {
    const badge = document.createElement("span");
    badge.className = "menu-card-oos";
    badge.textContent = "Indisponible";
    card.appendChild(badge);
  }

  const body = document.createElement("div");
  body.className = "menu-card-body";
  card.appendChild(body);

  const isCustomizable = !!(item.baseChoices || item.meatChoices);

  const top = document.createElement("div");
  top.className = "menu-card-top";
  top.innerHTML = `<h4>${item.name}</h4><span class="menu-price">${isCustomizable ? "dès " : ""}${item.basePrice.toFixed(2).replace(".", ",")} €</span>`;
  body.appendChild(top);

  const desc = document.createElement("p");
  desc.className = "menu-desc";
  desc.textContent = item.desc;
  body.appendChild(desc);

  const actions = document.createElement("div");
  actions.className = "menu-card-actions";

  const qtyWrap = document.createElement("div");
  qtyWrap.className = "qty";
  let qty = 1;
  qtyWrap.innerHTML = `<button type="button" data-dir="-1">−</button><span>1</span><button type="button" data-dir="1">+</button>`;
  qtyWrap.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      qty = Math.max(1, qty + parseInt(btn.dataset.dir));
      qtyWrap.querySelector("span").textContent = qty;
    });
  });
  actions.appendChild(qtyWrap);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "add-btn";

  function flashAdded() {
    addBtn.textContent = "Ajouté ✓";
    addBtn.classList.add("added");
    setTimeout(() => { addBtn.textContent = isCustomizable ? "Personnaliser" : "Ajouter"; addBtn.classList.remove("added"); }, 1200);
    qty = 1;
    qtyWrap.querySelector("span").textContent = qty;
    bounceCartIcon();
    showToast(`${item.name} ajouté au panier`);
  }

  if (isCustomizable) {
    addBtn.textContent = "Personnaliser";
    addBtn.addEventListener("click", () => {
      openCustomizeModal(item, qty, flashAdded);
    });
  } else {
    addBtn.textContent = "Ajouter";
    addBtn.addEventListener("click", () => {
      addToCart({ name: item.name, meta: "", unitPrice: item.basePrice, qty });
      flashAdded();
    });
  }
  if (item.available === false) {
    addBtn.disabled = true;
    addBtn.textContent = "Indisponible";
    qtyWrap.querySelectorAll("button").forEach(b => b.disabled = true);
  }
  actions.appendChild(addBtn);

  body.appendChild(actions);
  return card;
}

// ---------- Customize modal (mirrors the in-store ordering kiosk flow) ----------
function openCustomizeModal(item, initialQty, onConfirm) {
  const overlay = document.getElementById("customizeOverlay");
  const modal = document.getElementById("customizeModal");
  const bodyEl = document.getElementById("customizeBody");
  const totalEl = document.getElementById("customizeTotal");
  const noteEl = document.getElementById("customizeNote");
  document.getElementById("customizeTitle").textContent = item.name;
  noteEl.value = "";
  bodyEl.innerHTML = "";

  const state = {
    base: item.baseChoices ? (item.baseChoices.find(bc => bc.available !== false) || item.baseChoices[0]) : null,
    meat: item.meatChoices ? item.meatChoices[0] : null,
    sauce: null,
    extras: new Set(),
    crudites: new Set(),
    fromages: new Set(),
    accompagnements: {},
    boisson: null
  };

  function addonsTotal() {
    let t = 0;
    EXTRA_PROTEIN.forEach(e => { if (state.extras.has(e.name)) t += e.price; });
    CRUDITES.forEach(c => { if (state.crudites.has(c.name)) t += c.price; });
    SUPPLEMENTS_FROMAGE.forEach(f => { if (state.fromages.has(f.name)) t += f.price; });
    ACCOMPAGNEMENTS_STEP.forEach(a => { t += (state.accompagnements[a.name] || 0) * a.price; });
    if (state.boisson) t += DRINK_PRICE;
    return t;
  }

  function unitPrice() {
    return (state.base ? state.base.price : item.basePrice) + addonsTotal();
  }

  function refreshTotal() {
    totalEl.textContent = (unitPrice() * initialQty).toFixed(2).replace(".", ",") + " €";
  }

  function section(title, contentEl) {
    const wrap = document.createElement("div");
    wrap.className = "customize-section";
    wrap.innerHTML = `<h4>${title}</h4>`;
    wrap.appendChild(contentEl);
    bodyEl.appendChild(wrap);
  }

  function optionGrid() {
    const grid = document.createElement("div");
    grid.className = "customize-grid";
    return grid;
  }

  function makeButton(label, priceLabel, selected, disabled, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "customize-opt" + (selected ? " selected" : "") + (disabled ? " disabled" : "");
    btn.innerHTML = `<span>${label}</span>${priceLabel ? `<small>${priceLabel}</small>` : ""}${disabled ? `<small class="oos">Rupture</small>` : ""}`;
    if (disabled) {
      btn.disabled = true;
    } else {
      btn.addEventListener("click", onClick);
    }
    return btn;
  }

  function renderBody() {
  bodyEl.innerHTML = "";

  // 1. Base
  if (item.baseChoices) {
    const grid = optionGrid();
    item.baseChoices.forEach(bc => {
      grid.appendChild(makeButton(bc.label, bc.price.toFixed(2).replace(".", ",") + " €", state.base === bc, bc.available === false, () => {
        state.base = bc;
        rerender();
      }));
    });
    section(item.baseLabel || "Choisis ta base", grid);
  }

  if (item.onlyBase) return;

  // 2. Viande
  if (item.meatChoices) {
    const grid = optionGrid();
    item.meatChoices.forEach(m => {
      grid.appendChild(makeButton(m, null, state.meat === m, false, () => {
        state.meat = m;
        rerender();
      }));
    });
    section("Choisis ta viande", grid);
  }

  // 3. Sauce
  {
    const grid = optionGrid();
    SAUCES.forEach(s => {
      grid.appendChild(makeButton(s, null, state.sauce === s, false, () => {
        state.sauce = state.sauce === s ? null : s;
        rerender();
      }));
    });
    section("Choisis ta sauce", grid);
  }

  // 4. Extra
  {
    const grid = optionGrid();
    EXTRA_PROTEIN.forEach(e => {
      grid.appendChild(makeButton(e.name, "+" + e.price.toFixed(2).replace(".", ",") + " €", state.extras.has(e.name), !!e.outOfStock, () => {
        state.extras.has(e.name) ? state.extras.delete(e.name) : state.extras.add(e.name);
        rerender();
      }));
    });
    section("Envie d'un extra ?", grid);
  }

  // 5. Crudités
  {
    const grid = optionGrid();
    CRUDITES.forEach(c => {
      grid.appendChild(makeButton(c.name, c.price ? "+" + c.price.toFixed(2).replace(".", ",") + " €" : null, state.crudites.has(c.name), false, () => {
        state.crudites.has(c.name) ? state.crudites.delete(c.name) : state.crudites.add(c.name);
        rerender();
      }));
    });
    section("Choisis tes crudités", grid);
  }

  // 6. Supplément fromage
  {
    const grid = optionGrid();
    SUPPLEMENTS_FROMAGE.forEach(f => {
      grid.appendChild(makeButton(f.name, "+" + f.price.toFixed(2).replace(".", ",") + " €", state.fromages.has(f.name), false, () => {
        state.fromages.has(f.name) ? state.fromages.delete(f.name) : state.fromages.add(f.name);
        rerender();
      }));
    });
    section("Choisis ton supplément", grid);
  }

  // 7. Accompagnement (qty stepper)
  {
    const grid = optionGrid();
    grid.classList.add("customize-grid-qty");
    ACCOMPAGNEMENTS_STEP.forEach(a => {
      const row = document.createElement("div");
      row.className = "customize-opt customize-opt-qty";
      const n = state.accompagnements[a.name] || 0;
      row.innerHTML = `
        <span>${a.name}<small>+${a.price.toFixed(2).replace(".", ",")} €</small></span>
        <div class="qty qty-sm">
          <button type="button" data-dir="-1">−</button><span>${n}</span><button type="button" data-dir="1">+</button>
        </div>`;
      row.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          const cur = state.accompagnements[a.name] || 0;
          state.accompagnements[a.name] = Math.max(0, cur + parseInt(btn.dataset.dir));
          rerender();
        });
      });
      grid.appendChild(row);
    });
    section("Choisis ton accompagnement", grid);
  }

  // 8. Boisson
  {
    const grid = optionGrid();
    DRINKS.forEach(d => {
      grid.appendChild(makeButton(d, "+" + DRINK_PRICE.toFixed(2).replace(".", ",") + " €", state.boisson === d, false, () => {
        state.boisson = state.boisson === d ? null : d;
        rerender();
      }));
    });
    section("Choisis ta boisson", grid);
  }
  } // end renderBody

  function rerender() {
    const scrollPos = bodyEl.scrollTop;
    renderBody();
    refreshTotal();
    bodyEl.scrollTop = scrollPos;
  }

  renderBody();
  refreshTotal();

  overlay.classList.add("open");
  modal.classList.add("open");

  const confirmBtn = document.getElementById("customizeConfirm");
  const cancelBtn = document.getElementById("customizeCancel");
  const closeBtn = document.getElementById("customizeClose");

  function closeModal() {
    overlay.classList.remove("open");
    modal.classList.remove("open");
  }

  overlay.onclick = closeModal;
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;

  confirmBtn.onclick = () => {
    const metaParts = [];
    if (state.base) metaParts.push(state.base.label);
    if (state.meat) metaParts.push("Viande : " + state.meat);
    if (state.sauce) metaParts.push("Sauce : " + state.sauce);
    if (state.extras.size) metaParts.push("Extra : " + [...state.extras].join(", "));
    if (state.crudites.size) metaParts.push([...state.crudites].join(", "));
    if (state.fromages.size) metaParts.push("Fromage : " + [...state.fromages].join(", "));
    const accompText = ACCOMPAGNEMENTS_STEP.filter(a => state.accompagnements[a.name] > 0)
      .map(a => `${a.name} x${state.accompagnements[a.name]}`).join(", ");
    if (accompText) metaParts.push(accompText);
    if (state.boisson) metaParts.push("Boisson : " + state.boisson);
    if (noteEl.value.trim()) metaParts.push("Note : " + noteEl.value.trim());

    addToCart({
      name: item.name,
      meta: metaParts.join(" · "),
      unitPrice: unitPrice(),
      qty: initialQty
    });

    closeModal();
    onConfirm();
  };
}

// ---------- Cart logic ----------
function addToCart(entry) {
  const existing = cart.find(c => c.name === entry.name && c.meta === entry.meta);
  if (existing) {
    existing.qty += entry.qty;
  } else {
    cart.push(entry);
  }
  persistCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  persistCart();
  renderCart();
}

function persistCart() {
  localStorage.setItem("thedoner_cart", JSON.stringify(cart));
}

function cartSubtotal() {
  return cart.reduce((sum, c) => sum + c.unitPrice * c.qty, 0);
}

function cartTotal() {
  const mode = document.getElementById("custMode")?.value;
  const delivery = (mode === "Livraison" && deliveryState.status === "success") ? deliveryState.fee : 0;
  return cartSubtotal() + delivery;
}

function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const subtotalEl = document.getElementById("cartSubtotal");
  const deliveryLine = document.getElementById("cartDeliveryLine");
  const deliveryFeeEl = document.getElementById("cartDeliveryFee");
  const mode = document.getElementById("custMode")?.value;

  countEl.textContent = cart.reduce((n, c) => n + c.qty, 0);
  subtotalEl.textContent = cartSubtotal().toFixed(2).replace(".", ",") + " €";
  if (mode === "Livraison" && deliveryState.status === "success") {
    deliveryLine.hidden = false;
    deliveryFeeEl.textContent = "+" + deliveryState.fee.toFixed(2).replace(".", ",") + " €";
  } else {
    deliveryLine.hidden = true;
  }
  totalEl.textContent = cartTotal().toFixed(2).replace(".", ",") + " €";

  itemsEl.innerHTML = "";
  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Votre panier est vide pour l'instant.</p>`;
    return;
  }

  cart.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="cart-item-name">${c.qty} × ${c.name}</div>
        ${c.meta ? `<div class="cart-item-meta">${c.meta}</div>` : ""}
        <button class="cart-item-remove" data-i="${i}">Retirer</button>
      </div>
      <div class="cart-item-price">${(c.unitPrice * c.qty).toFixed(2).replace(".", ",")} €</div>
    `;
    itemsEl.appendChild(row);
  });

  itemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.i)));
  });
}

function bounceCartIcon() {
  const btn = document.getElementById("openCart");
  if (window.gsap) {
    gsap.fromTo(btn, { scale: 1 }, { scale: 1.3, duration: .18, yoyo: true, repeat: 1, ease: "power1.inOut" });
  }
}

function showToast(msg) {
  const t = document.getElementById("cart-toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

// ---------- Delivery fee (distance-based) ----------
let deliveryState = { fee: 0, distanceKm: null, status: "idle", address: "" };

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const custModeEl = document.getElementById("custMode");
const deliveryAddressWrap = document.getElementById("deliveryAddressWrap");
const custAddressEl = document.getElementById("custAddress");
const deliveryStatusEl = document.getElementById("deliveryStatus");

function setDeliveryStatus(text, cls) {
  deliveryStatusEl.textContent = text;
  deliveryStatusEl.className = "delivery-status" + (cls ? " " + cls : "");
}

function resetDeliveryState() {
  deliveryState = { fee: 0, distanceKm: null, status: "idle", address: "" };
  setDeliveryStatus("", "");
}

custModeEl.addEventListener("change", () => {
  const isDelivery = custModeEl.value === "Livraison";
  deliveryAddressWrap.hidden = !isDelivery;
  if (!isDelivery) resetDeliveryState();
  renderCart();
});

const NOMINATIM_VIEWBOX = "-4.9713142,36.8908546,-4.2713142,36.1908546"; // large zone autour de Fuengirola (biais, non restrictif)

// Calcule et applique le résultat de livraison à partir de coordonnées déjà connues
// (issues d'une suggestion cliquée ou de la géolocalisation) : le plus précis, pas de nouvel appel de géocodage.
function applyDeliveryFromCoords(lat, lon, addressLabel) {
  const km = haversineKm(RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng, lat, lon);
  const fee = deliveryFeeForDistance(km);

  if (fee == null) {
    deliveryState = { fee: 0, distanceKm: km, status: "out-of-range", address: addressLabel };
    setDeliveryStatus(`Adresse à ${km.toFixed(1)} km — hors zone de livraison (20 km max). Contactez-nous directement.`, "error");
  } else {
    deliveryState = { fee, distanceKm: km, status: "success", address: addressLabel };
    setDeliveryStatus(`Distance : ~${km.toFixed(1)} km — Frais de livraison : ${fee.toFixed(2).replace(".", ",")} €`, "success");
  }
  renderCart();
}

async function computeDeliveryFee(address) {
  deliveryState.status = "loading";
  setDeliveryStatus("Calcul des frais de livraison…", "loading");
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=es&viewbox=${NOMINATIM_VIEWBOX}&bounded=0&q=${encodeURIComponent(address + ", Málaga, España")}`;
    const res = await fetch(url, { headers: { "Accept-Language": "fr" } });
    if (!res.ok) throw new Error("http");
    const data = await res.json();
    if (!data.length) throw new Error("not-found");
    applyDeliveryFromCoords(parseFloat(data[0].lat), parseFloat(data[0].lon), address);
  } catch (e) {
    deliveryState = { fee: 0, distanceKm: null, status: "error", address };
    setDeliveryStatus("Adresse introuvable — précisez la rue et la ville.", "error");
    renderCart();
  }
}

// ---------- Suggestions d'adresse (autocomplétion) ----------
const addressSuggestionsEl = document.getElementById("addressSuggestions");
let suggestDebounceTimer;

function hideSuggestions() {
  addressSuggestionsEl.hidden = true;
  addressSuggestionsEl.innerHTML = "";
}

async function fetchAddressSuggestions(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=es&viewbox=${NOMINATIM_VIEWBOX}&bounded=0&addressdetails=1&q=${encodeURIComponent(query + ", Málaga, España")}`;
    const res = await fetch(url, { headers: { "Accept-Language": "fr" } });
    if (!res.ok) return;
    const data = await res.json();
    if (!data.length || custAddressEl.value.trim() !== query) return;

    addressSuggestionsEl.innerHTML = "";
    data.forEach(place => {
      const li = document.createElement("li");
      li.textContent = place.display_name;
      li.addEventListener("click", () => {
        custAddressEl.value = place.display_name;
        hideSuggestions();
        applyDeliveryFromCoords(parseFloat(place.lat), parseFloat(place.lon), place.display_name);
      });
      addressSuggestionsEl.appendChild(li);
    });
    addressSuggestionsEl.hidden = false;
  } catch (e) { /* pas de suggestion en cas d'échec réseau, l'utilisateur peut taper librement */ }
}

custAddressEl.addEventListener("input", () => {
  const val = custAddressEl.value.trim();
  clearTimeout(suggestDebounceTimer);
  if (val.length < 4) { hideSuggestions(); return; }
  suggestDebounceTimer = setTimeout(() => fetchAddressSuggestions(val), 350);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".address-input-row")) hideSuggestions();
});

// ---------- Géolocalisation ----------
const geolocateBtn = document.getElementById("geolocateBtn");
geolocateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setDeliveryStatus("La géolocalisation n'est pas disponible sur cet appareil.", "error");
    return;
  }
  const previousState = deliveryState; // restauré si la géolocalisation échoue, pour ne pas invalider une adresse déjà validée
  geolocateBtn.classList.add("locating");
  deliveryState = { ...deliveryState, status: "loading" };
  setDeliveryStatus("Localisation en cours…", "loading");
  hideSuggestions();

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, { headers: { "Accept-Language": "fr" } });
        if (res.ok) {
          const data = await res.json();
          if (data && data.display_name) label = data.display_name;
        }
      } catch (e) { /* on garde les coordonnées brutes si la reverse-géolocalisation échoue */ }
      custAddressEl.value = label;
      geolocateBtn.classList.remove("locating");
      applyDeliveryFromCoords(latitude, longitude, label);
    },
    (err) => {
      geolocateBtn.classList.remove("locating");
      if (previousState.status === "success") {
        // Un échec de géolocalisation n'invalide pas une adresse déjà validée avec succès juste avant.
        deliveryState = previousState;
        setDeliveryStatus(`Distance : ~${previousState.distanceKm.toFixed(1)} km — Frais de livraison : ${previousState.fee.toFixed(2).replace(".", ",")} €`, "success");
      } else {
        deliveryState = { fee: 0, distanceKm: null, status: "error", address: "" };
        setDeliveryStatus("Position indisponible — vérifiez que la géolocalisation est autorisée, ou saisissez l'adresse manuellement.", "error");
      }
      renderCart();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

let addressDebounceTimer;
custAddressEl.addEventListener("blur", () => {
  setTimeout(() => { // laisse le clic sur une suggestion s'exécuter avant de valider au blur
    const val = custAddressEl.value.trim();
    if (!val) { resetDeliveryState(); renderCart(); return; }
    if (val === deliveryState.address && deliveryState.status === "success") return;
    clearTimeout(addressDebounceTimer);
    addressDebounceTimer = setTimeout(() => computeDeliveryFee(val), 250);
  }, 200);
});

// ---------- Cart drawer open/close ----------
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
document.getElementById("openCart").addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
});
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}
document.getElementById("closeCart").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);

// ---------- Order submit -> WhatsApp ----------
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    showToast("Votre panier est vide");
    return;
  }
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const mode = document.getElementById("custMode").value;
  const note = document.getElementById("custNote").value.trim();
  const address = custAddressEl.value.trim();

  if (mode === "Livraison") {
    if (!address) {
      setDeliveryStatus("Merci de renseigner votre adresse de livraison.", "error");
      custAddressEl.focus();
      return;
    }
    if (deliveryState.status === "loading") {
      showToast("Calcul des frais de livraison en cours…");
      return;
    }
    if (deliveryState.status !== "success" || deliveryState.address !== address) {
      showToast("Merci de patienter pendant le calcul des frais de livraison");
      computeDeliveryFee(address);
      return;
    }
  }

  let msg = `Nouvelle commande THE DONER\n\n`;
  cart.forEach(c => {
    msg += `• ${c.qty} × ${c.name}${c.meta ? " (" + c.meta + ")" : ""} — ${(c.unitPrice * c.qty).toFixed(2).replace(".", ",")} €\n`;
  });
  msg += `\nSous-total : ${cartSubtotal().toFixed(2).replace(".", ",")} €\n`;
  if (mode === "Livraison" && deliveryState.status === "success") {
    msg += `Frais de livraison (~${deliveryState.distanceKm.toFixed(1)} km) : ${deliveryState.fee.toFixed(2).replace(".", ",")} €\n`;
  }
  msg += `Total : ${cartTotal().toFixed(2).replace(".", ",")} €\n\n`;
  msg += `Nom : ${name}\nTéléphone : ${phone}\nMode : ${mode}\n`;
  if (mode === "Livraison") msg += `Adresse : ${address}\n`;
  if (note) msg += `Note : ${note}\n`;

  const url = `https://wa.me/34623618108?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

// ---------- Mobile nav ----------
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// ---------- Smooth scroll (Lenis) ----------
let lenis;
if (window.Lenis) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  if (window.gsap && window.ScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }
}

function scrollToTarget(target) {
  const headerOffset = document.querySelector(".site-header").offsetHeight;
  if (lenis) {
    lenis.scrollTo(target, { offset: -headerOffset });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
  });
});

// ---------- GSAP scroll reveals + header/nav/progress ----------
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach(el => {
    if (el.closest(".hero-content")) return; // handled by the hero intro timeline
    gsap.to(el, {
      opacity: 1, y: 0, duration: .9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  // Hero intro animation
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(".hero-logo-parallax", { opacity: 1, y: 0, duration: 1 }, 0.1)
    .to(".hero-tagline", { opacity: 1, y: 0, duration: .9 }, 0.35)
    .to(".hero-cta", { opacity: 1, y: 0, duration: .9 }, 0.55);

  const header = document.querySelector(".site-header");
  const progressBar = document.getElementById("scrollProgress");
  const navLinks = document.querySelectorAll(".nav a");

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      header.classList.toggle("scrolled", self.scroll() > 40);
      progressBar.style.width = (self.progress * 100) + "%";
    }
  });

  document.querySelectorAll("section[id]").forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => setActiveNav(sec.id),
      onEnterBack: () => setActiveNav(sec.id)
    });
  });

  function setActiveNav(id) {
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  }

  // Parallax on hero visuals
  gsap.to(".hero-logo-parallax", {
    y: 60, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-embers", {
    y: -80, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  // Staggered reveals for grouped elements
  function staggerReveal(containerSelector, itemSelector) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const items = container.querySelectorAll(itemSelector);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 26 });
      gsap.to(items, {
        opacity: 1, y: 0, duration: .7, stagger: .1, ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 85%" }
      });
    });
  }
  staggerReveal(".story-badges", ".badge");
  staggerReveal(".menu-panels", ".menu-panel.active .menu-card");
  staggerReveal(".social-grid", ".social-card");

  // Floating WhatsApp button appears after leaving the hero
  const fab = document.getElementById("fabWhatsapp");
  if (fab) {
    ScrollTrigger.create({
      trigger: "#accueil",
      start: "bottom top",
      onEnter: () => fab.classList.add("show"),
      onLeaveBack: () => fab.classList.remove("show")
    });
  }
} else {
  document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
}

// ---------- Promo video: autoplay when visible, pause when not ----------
const promoVideo = document.getElementById("promoVideo");
const videoSoundBtn = document.getElementById("videoSoundBtn");
if (promoVideo) {
  const vObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        promoVideo.play().catch(() => {});
      } else {
        promoVideo.pause();
      }
    });
  }, { threshold: .4 });
  vObserver.observe(promoVideo);

  if (videoSoundBtn) {
    videoSoundBtn.addEventListener("click", () => {
      promoVideo.muted = false;
      videoSoundBtn.classList.add("is-unmuted");
    });
    promoVideo.addEventListener("volumechange", () => {
      videoSoundBtn.classList.toggle("is-unmuted", !promoVideo.muted);
    });
  }
}

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Init ----------
renderCart();
