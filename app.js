/* =========================================================
   Low Voltage Portfolio Panorama — app.js
   Vanilla JS only. Slide navigation, Figma-style click-to-zoom,
   product detail drawer, breadcrumb trail.
   ========================================================= */
"use strict";

/* ---------- Prompt 5: product data (exact PPT text) ---------- */
const PRODUCTS = {
  mtz: {
    name: "MasterPacT MTZ",
    category: "Power Distribution",
    description: "High current air circuit breakers (ACB).",
    connectivity: [
      "Connected using Ethernet through the Enerlin\u2019X System (IFE for fixed version, EIFE for withdrawable version).",
      "MicroLogic 5/6 X can be fitted, featuring an embedded screen, Bluetooth, and NFC wireless communication protocol."
    ],
    chips: ["ACB", "Ethernet", "Enerlin\u2019X", "Bluetooth", "NFC"]
  },
  nsx: {
    name: "ComPacT NSX",
    category: "Power Distribution",
    description: "Molded case circuit breakers (MCCB).",
    connectivity: [
      "Can be fitted with MicroLogic 5/6, connected to Ethernet using BSCM, NSX Cord, and IFM/IFE, or Modbus RTU.",
      "PowerTag Energy M250/M630 can be used for wireless energy measurements to a Panel Server."
    ],
    chips: ["MCCB", "Ethernet", "Modbus RTU", "PowerTag M250/M630"]
  },
  nsxm: {
    name: "ComPacT NSXm",
    category: "Power Distribution",
    description: "Mini version of the Compact NSX range for AC applications.",
    connectivity: [
      "Uses PowerTag Energy F160 for wireless energy measurements communicating to a Panel Server.",
      "OF/SDs give breaker status."
    ],
    chips: ["MCCB mini", "PowerTag F160", "OF/SD status"]
  },
  heattag: {
    name: "PowerLogic HeatTag",
    category: "Environmental Monitoring",
    description: "Analyzes suspended gases and particles inside the switchboard to detect invisible transformation of cable insulators wirelessly (IEEE 802.15.4).",
    connectivity: [
      "HeatTag sensors communicate wirelessly over IEEE 802.15.4."
    ],
    chips: ["Wireless", "IEEE 802.15.4", "Safety"]
  },
  panelserver: {
    name: "Panel Server",
    category: "Gateway \u00b7 Data Concentrator",
    description: "The gateway data concentrator linking connected products to EcoStruxure layers.",
    connectivity: [
      "Communicates downstream over Modbus TCP/IP, Modbus RTU, and IEEE 802.15.4.",
      "Communicates upstream over Modbus TCP/IP and Wi-Fi."
    ],
    chips: ["Modbus TCP/IP", "Modbus RTU", "IEEE 802.15.4", "Wi-Fi"]
  }
};

/* ---------- Element references ---------- */
const body        = document.body;
const slides      = {
  title:     document.getElementById("slide-title"),
  segments:  document.getElementById("slide-segments"),
  dashboard: document.getElementById("slide-dashboard")
};
const stage       = document.getElementById("stage");
const zoomOutBtn  = document.getElementById("zoomOutBtn");
const drawer      = document.getElementById("drawer");
const drawerScrim = document.getElementById("drawerScrim");
const crumbList   = document.getElementById("breadcrumbList");

let currentSlide  = "title";
let zoomState     = null;   // { hotspot, product, config }
let drawerTimer   = null;

/* =========================================================
   Slide navigation (full-screen transitions)
   ========================================================= */
function goToSlide(name) {
  if (name === currentSlide) return;
  const from = slides[currentSlide];
  const to   = slides[name];

  resetZoom(true);            // always leave the dashboard clean
  closeDrawer();

  from.classList.remove("is-active");
  from.classList.add("is-exit-left");
  to.classList.remove("is-exit-left");
  // force reflow so the enter transition always plays
  void to.offsetWidth;
  to.classList.add("is-active");

  currentSlide = name;
  body.dataset.slide = name;
  renderBreadcrumb();
}

/* =========================================================
   Prompt 4 — Figma-style click-to-zoom
   transform: scale() translate() on the stage wrapper.
   ========================================================= */
function zoomToHotspot(hotspot) {
  // Measurements are taken while the stage is at identity transform.
  const rect      = hotspot.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();

  // Element + transform-origin centers, in viewport coordinates
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const ox = stageRect.left + stageRect.width  / 2;
  const oy = stageRect.top  + stageRect.height / 2;

  // Leave room on the right for the detail drawer on wide screens
  const drawerW = window.innerWidth > 860 ? Math.min(420, window.innerWidth * 0.92) : 0;
  const targetX = (window.innerWidth - drawerW) / 2;
  const targetY = window.innerHeight / 2;

  // Scale chosen so the hotspot's board column fills the freed viewport
  const board = hotspot.closest(".board");
  const bRect = board.getBoundingClientRect();
  const scale = Math.min(
    3.4,
    Math.max(2.1, ((window.innerWidth - drawerW) * 0.7) / bRect.width)
  );

  // With transform: scale(s) translate(tx, ty) and origin at (ox, oy):
  // a point p maps to  s * (p + t - o) + o.
  // Solve  s * (c + t - o) + o = target  =>  t = (target - o) / s + o - c
  const tx = (targetX - ox) / scale + ox - cx;
  const ty = (targetY - oy) / scale + oy - cy;

  stage.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;
  stage.classList.add("is-zoomed");
  hotspot.classList.add("is-target");

  zoomState = {
    hotspot,
    product: hotspot.dataset.product,
    config:  hotspot.closest(".panel").dataset.config
  };

  zoomOutBtn.hidden = false;
  renderBreadcrumb();

  // Drawer appears gracefully with a minor delay post-zoom (Prompt 5)
  clearTimeout(drawerTimer);
  drawerTimer = setTimeout(() => openDrawer(zoomState.product), 600);
}

function resetZoom(silent = false) {
  if (!zoomState) return;
  zoomState.hotspot.classList.remove("is-target");
  zoomState = null;

  clearTimeout(drawerTimer);
  stage.classList.remove("is-zoomed");
  stage.style.transform = "";     // cleanly reset the transform matrix
  zoomOutBtn.hidden = true;
  closeDrawer();
  if (!silent) renderBreadcrumb();
}

/* =========================================================
   Prompt 5 — Product detail drawer
   ========================================================= */
function openDrawer(productId) {
  const p = PRODUCTS[productId];
  if (!p) return;

  document.getElementById("drawerCategory").textContent = p.category;
  document.getElementById("drawerTitle").textContent    = p.name;

  const bodyEl = document.getElementById("drawerBody");
  bodyEl.innerHTML = "";

  const desc = document.createElement("p");
  desc.textContent = p.description;
  bodyEl.appendChild(desc);

  const h = document.createElement("h4");
  h.textContent = "Connection and Communication";
  bodyEl.appendChild(h);

  const ul = document.createElement("ul");
  p.connectivity.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line;
    ul.appendChild(li);
  });
  bodyEl.appendChild(ul);

  const chips = document.getElementById("drawerChips");
  chips.innerHTML = "";
  p.chips.forEach(c => {
    const s = document.createElement("span");
    s.textContent = c;
    chips.appendChild(s);
  });

  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  drawerScrim.hidden = false;
  requestAnimationFrame(() => drawerScrim.classList.add("is-on"));
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  drawerScrim.classList.remove("is-on");
  setTimeout(() => { if (!drawer.classList.contains("is-open")) drawerScrim.hidden = true; }, 420);
}

/* =========================================================
   Prompt 5 — Breadcrumb trail
   e.g. Segments › PrismaSeT P › Wired › MasterPacT MTZ
   ========================================================= */
function renderBreadcrumb() {
  crumbList.innerHTML = "";
  const trail = [];

  trail.push({ label: "Home", action: () => goToSlide("title") });
  if (currentSlide === "segments" || currentSlide === "dashboard") {
    trail.push({ label: "Segments", action: () => goToSlide("segments") });
  }
  if (currentSlide === "dashboard") {
    trail.push({ label: "PrismaSeT P", action: () => resetZoom() });
    if (zoomState) {
      const short = zoomState.config
        .replace("Optimum connected ", "")
        .replace("Optimum Connected ", "")
        .replace("Easy ", "");
      trail.push({ label: short.charAt(0).toUpperCase() + short.slice(1), action: () => resetZoom() });
      trail.push({ label: PRODUCTS[zoomState.product].name, action: null });
    }
  }

  trail.forEach((item, i) => {
    const li  = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label;
    if (item.action && i !== trail.length - 1) {
      btn.addEventListener("click", item.action);
    } else {
      li.setAttribute("aria-current", "page");
      btn.disabled = true;
      btn.style.cursor = "default";
    }
    li.appendChild(btn);
    crumbList.appendChild(li);
  });
}

/* =========================================================
   Wiring
   ========================================================= */
document.getElementById("exploreBtn").addEventListener("click", () => goToSlide("segments"));
document.getElementById("prismasetPCard").addEventListener("click", () => goToSlide("dashboard"));

document.querySelectorAll(".hotspot").forEach(h => {
  h.addEventListener("click", e => {
    e.stopPropagation();
    if (zoomState) return;        // one zoom at a time; reset first
    zoomToHotspot(h);
  });
});

zoomOutBtn.addEventListener("click", () => resetZoom());
document.getElementById("drawerClose").addEventListener("click", () => resetZoom());
drawerScrim.addEventListener("click", () => resetZoom());

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (zoomState) resetZoom();
    else if (currentSlide === "dashboard") goToSlide("segments");
    else if (currentSlide === "segments") goToSlide("title");
  }
});

/* Keep the zoom correct if the window is resized mid-zoom */
window.addEventListener("resize", () => {
  if (!zoomState) return;
  const h = zoomState.hotspot;
  stage.style.transition = "none";
  stage.style.transform  = "";
  void stage.offsetWidth;                 // measure at identity
  stage.style.transition = "";
  const keep = zoomState;
  zoomState = null;
  h.classList.remove("is-target");
  zoomToHotspot(h);
  zoomState.product = keep.product;
});

/* Initial state */
body.dataset.slide = "title";
renderBreadcrumb();
