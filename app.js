/* =========================================================
   Low Voltage Portfolio Panorama — app.js
   Vanilla JS only. Slide navigation, Figma-style click-to-zoom,
   product detail drawer.
   ========================================================= */
"use strict";

/* ---------- Prompt 5: product data (exact PPT text) ---------- */
// TODO: every quickLinks entry below is a "#" placeholder — replace with the
// real URLs once provided.
function defaultQuickLinks() {
  return [
    { label: "Product Web Link",   url: "#" },
    { label: "Product E-Learning", url: "#" },
    { label: "Product Catalog",    url: "#" }
  ];
}

const PRODUCTS = {
  mtz: {
    name: "MasterPacT MTZ",
    category: "Power Distribution",
    description: "High current air circuit breakers (ACB).",
    images: ["assets/MasterPacT-MTZ-1.png", "assets/MasterPacT-MTZ-2.png"],
    video: "assets/MasterPacT-MTZ-3.mp4",
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Connected using Ethernet through the Enerlin\u2019X System (IFE for fixed version, EIFE for withdrawable version).",
      "MicroLogic 5/6 X can be fitted, featuring an embedded screen, Bluetooth, and NFC wireless communication protocol."
    ],
    valueProposition: {
      intro: "MasterPact MTZ circuit breakers are Future Ready and contribute to power uptime and energy efficiency of your electrical installation thanks to:",
      sections: [
        {
          heading: "Optimized safety",
          items: [
            "Faultless protection",
            "Complete selectivity and coordination (Type 1 & 2)",
            "High resistance to environmental stresses"
          ]
        },
        {
          heading: "Integrated monitoring for energy efficiency",
          items: [
            "Improved uptime with complete monitoring solution in Smart Panels",
            "Improved operation and maintenance using your smartphone with the EcoStruxure Power Device app, which is the single app for your Schneider Electric protection relays and circuits breakers in medium and low voltage applications",
            "Advanced MicroLogic X control unit can assist in providing corrective, preventive and predictive maintenance and energy management to identify potential savings",
            "Seamless integration enabling users access to circuit breakers data in real time with a mobile device or a PC",
            "Local and remote communication with trip cause (earth leakage, overload, short-circuit) and alarms (earth leakage, overload) allowing proactive operational and energy efficiency"
          ]
        },
        {
          heading: "Seamless installation and retrofit",
          items: [
            "Wide range of online and offline software tools that improve productivity at all stages of your project (EcoStruxure Power Design - Ecodial, Product Selector, EcoStruxure Power Commission, EcoStruxure Power Device app)",
            "Additional digital modules available 24/7 on GoDigital \u2013 Schneider Electric e-commerce platform, offering advanced protection, measurement, energy management and network analysis functions",
            "Seamless retrofit thanks to identical sizes, power connections and thermal properties as for the MasterPact NW and NT ranges",
            "Standardized range of auxiliaries and accessories"
          ]
        }
      ],
      outro: "MasterPact MTZ is a part of EcoStruxure\u2122 Power \u2014 Schneider Electric\u2019s open, interoperable, IoT-enabled system architecture."
    },
    chips: ["ACB", "Ethernet", "Enerlin\u2019X", "Bluetooth", "NFC"]
  },
  nsx: {
    name: "ComPacT NSX",
    category: "Power Distribution",
    description: "Compact NSX range of molded case circuit breakers (MCCB).",
    images: ["assets/ComPacT-NSX-2.png", "assets/ComPacT-NSX-3.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Can be fitted with MicroLogic 5/6 which can be connected to Ethernet using BSCM, NSX Cord and IFM/IFE, or Modbus RTU using BSCM, NSX Cord and IFM.",
      "PowerTag Energy M250/M630 can be used on any ComPacT NSX breaker for energy measurements. This communicates wirelessly to a Panel Server.",
      "OF/SDs (both wired and wireless) can give you the breaker status."
    ],
    chips: ["MCCB", "Ethernet", "Modbus RTU", "PowerTag M250/M630"]
  },
  nsxm: {
    name: "ComPacT NSXm",
    category: "Power Distribution",
    description: "The ComPacT NSXm is the mini version of the Compact NSX range of molded case circuit breakers for AC applications.",
    images: ["assets/ComPacT-NSXm-1.jpg", "assets/ComPacT-NSXm-2.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Can use PowerTag Energy F160 for energy measurements. This communicates wirelessly to a Panel Server.",
      "OF/SDs (both wired and wireless) can give you the breaker status."
    ],
    chips: ["MCCB mini", "PowerTag F160", "OF/SD status"]
  },
  heattag: {
    name: "PowerLogic HeatTag",
    category: "Environmental Monitoring",
    description: "HeatTag analyzes suspended gases and particles inside the switchboard and detects invisible yet hazardous transformations of cable insulators. HeatTag sensors integrated in the panel enable increased safety and availability.",
    images: ["assets/PowerLogic-HeatTag-1.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "HeatTag sensors communicate wirelessly over IEEE 802.15.4."
    ],
    chips: ["Wireless", "IEEE 802.15.4", "Safety"]
  },
  panelserver: {
    name: "Panel Server",
    category: "Gateway \u00b7 Data Concentrator",
    description: "Panel Server is the link between connected products and the two top layers of EcoStruxure (Edge Control, and Apps, Analytics and Services). It is a data concentrator and gateway.",
    images: ["assets/Panel-Server-1.jpg"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Communicates downstream over Modbus TCP/IP, Modbus RTU, and IEEE 802.15.4.*",
      "Communicates upstream over Modbus TCP/IP and Wi-Fi.",
      "*Substitute with Smart Panel + I/O Smart Link."
    ],
    chips: ["Modbus TCP/IP", "Modbus RTU", "IEEE 802.15.4", "Wi-Fi"]
  },
  acti9: {
    name: "Acti9",
    category: "Power Distribution",
    description: "The Acti9 range is part of the range of miniature circuit breakers (MCB).",
    images: ["assets/Acti9.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "PowerTag Energy 63 can be used with the Acti9 range for energy measurements. This communicates wirelessly to a Panel Server.",
      "I/O Smart Link can be used with the Acti9 range through Modbus serial (also referred to as Modbus SL or Modbus RTU) connection."
    ],
    chips: ["MCB", "PowerTag Energy 63", "Modbus RTU"]
  },
  acti9active: {
    name: "Acti9 Active",
    category: "Power Distribution",
    description: "The Acti9 Active is part of the range of miniature circuit breakers (MCB) which has wireless connectivity built in.",
    images: ["assets/Acti9 Active.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Connects wirelessly to a gateway which sends data to enable monitoring diagnostics, pre-alarming and alarming.",
      "I/O Smart Link can be used with the Acti9 range through Modbus serial connection."
    ],
    chips: ["MCB", "Wireless", "Modbus RTU"]
  },
  powertag: {
    name: "PowerTag",
    category: "Class 1 Energy Meter",
    description: "All PowerTag devices communicate wirelessly (ZigBee) to gateways such as Panel Server.",
    images: [
      "assets/PowerTag-1.jpg", "assets/PowerTag-2.jpg", "assets/PowerTag-3.png",
      "assets/PowerTag-4.png", "assets/PowerTag-5.jpg", "assets/PowerTag-6.jpg"
    ],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Communicates wirelessly via ZigBee to gateways such as Panel Server."
    ],
    chips: ["ZigBee", "Wireless", "Class 1 Energy Meter"]
  },
  iosmartlink: {
    name: "I/O Smart Link",
    category: "Communication",
    description: "The I/O Smart Link is an intelligent communication module with 11 channels. It is used for transferring data from Acti9 range devices.",
    images: ["assets/IO-Smart-Link-1.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Communicates via a Modbus RTU (SL) connection."
    ],
    chips: ["Modbus RTU", "11 channels", "Acti9"]
  },
  iem2000: {
    name: "Acti 9 iEM2000 Series",
    category: "Monitoring \u00b7 Energy Monitoring",
    description: "The iEM series are energy meters offering an extensive real-time measurement of power quality information, including: voltage, current, power, or power factor.",
    images: ["assets/Acti-9-iEM2000-Series-1.png", "assets/Acti-9-iEM2000-Series-2.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Compatible with RS485.",
      "Compatible with M-bus."
    ],
    chips: ["Energy Meter", "RS485", "M-bus"]
  },
  iem3000: {
    name: "Acti 9 iEM3000 Series",
    category: "Monitoring \u00b7 Energy Monitoring",
    description: "The iEM series are energy meters offering an extensive real-time measurement of power quality information, including: voltage, current, power, or power factor.",
    images: ["assets/Acti-9-iEM3000-Series-1.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Compatible with Modbus.",
      "Compatible with BACnet.",
      "Compatible with M-bus.",
      "Compatible with LON."
    ],
    chips: ["Energy Meter", "Modbus", "BACnet", "M-bus", "LON"]
  },
  pmion: {
    name: "PM Series and ION series",
    category: "Monitoring \u00b7 Power Monitoring",
    description: "Power Meters PM5000 and PM8000 are compact and high-performance power meters for cost and network management. ION9000 is an advanced high-performance power meter with onboard power quality analytics.",
    images: [
      "assets/PM-Series-and-ION-series-1.jpg",
      "assets/PM-Series-and-ION-series-2.jpg",
      "assets/PM-Series-and-ION-series-3.jpg"
    ],
    quickLinks: defaultQuickLinks(),
    chips: ["PM5000", "PM8000", "ION9000"]
  },
  modicon: {
    name: "Modicon Switch",
    category: "Communication",
    description: "The Modicon Switch is an Ethernet switch which makes it possible to create all types of Ethernet network infrastructures in buildings and industrial applications. It is equipped with 5 or 8 copper ports, and utilizes Ethernet TCP/IP.",
    images: ["assets/Modicon-Switch-1.png", "assets/Modicon-Switch-2.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "Communicates using Ethernet TCP/IP."
    ],
    chips: ["Ethernet TCP/IP", "5/8 ports"]
  },
  enerlinx: {
    name: "Enerlin\u2019X System",
    category: "Communication \u00b7 Interfaces",
    description: "A family of communication interfaces connecting Schneider Electric circuit breakers to Ethernet and Modbus networks.",
    images: [
      "assets/Enerlin\u2019X-System-1.png", "assets/Enerlin\u2019X-System-2.png",
      "assets/Enerlin\u2019X-System-3.png", "assets/Enerlin\u2019X-System-4.png"
    ],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "eIFE (Ethernet interface embedded) on the MTZ is available for MTZ withdrawable circuit breakers and provides a direct connection to the Ethernet network.",
      "I/O module interface (Input/Output) for LV circuit breakers is part of the ULP system, and offers pre-defined or configurable functions and applications, to ensure requirements can be met precisely.",
      "IFM (Modbus interface) is the communication interface which converts the ULP protocol into Modbus serial. This enables transmission of the circuit breaker\u2019s settings, such as voltage, current, power factors, energies and powers.",
      "IFE (Ethernet interface) for LV circuit breakers enables compatible devices (e.g. a MasterPacT NT/NW/MTZ or a ComPacT NSX) to be connected and accessible on the Ethernet network."
    ],
    chips: ["eIFE", "IFM", "IFE", "Ethernet", "Modbus"]
  },
  enerlinxhmi: {
    name: "Enerlin\u2019X System \u2013 HMI",
    category: "Communication \u00b7 Displays",
    description: "Local interface displays for settings and control, compatible with Schneider Electric\u2019s circuit breaker ranges.",
    images: ["assets/Enerlin\u2019X-System - HMI-1.png", "assets/Enerlin\u2019X-System - HMI-2.png"],
    quickLinks: defaultQuickLinks(),
    connectivity: [
      "FDM128 local interface display is a local display for settings and control, and it is compatible with all circuit breaker ranges for up to 8 circuit breakers. Communication through 1 RJ45 Modbus TCP/IP port.",
      "FDM121 local interface display is for a single circuit breaker and is compatible with the ComPacT and MasterPacT ranges. Communication through the ULP system."
    ],
    chips: ["FDM128", "FDM121", "Modbus TCP/IP", "ULP"]
  }
};

/* ---------- 3 intro pages (title -> segments): info popups sourced from
   "PP LV Panorama storyboard.pdf". Rendered through the same drawer as
   PRODUCTS (see openDrawer's PRODUCTS[id] || INFO_TOPICS[id] lookup), with
   two extra field kinds that PRODUCTS doesn't use:
     - fullImage: one big pre-laid-out card image (used where the source PDF
       slide was itself already a single flattened picture)
     - groups: [{ heading, body, images }] for richer multi-part text+photos
     - table: the Protection function/device matrix (see openDrawer) ---------- */
const INFO_TOPICS = {
  software: {
    name: "Analytics, Apps and Services",
    category: "EcoStruxure · Software, Apps, Analytics & Services",
    fullImage: "assets/info-software-apps-analytics.png",
    description: "The data are collected and processed in the cloud-based EcoStruxure platform to provide advanced Analytics, Apps and Services. The purpose is to enable advanced diagnostics, alarming, predictive and preventive maintenance.",
    chips: ["Cloud", "Analytics", "EcoStruxure Power Advisor", "EcoStruxure Energy Hub"]
  },
  edgecontrol: {
    name: "Edge Control",
    category: "EcoStruxure · Edge Control",
    fullImage: "assets/info-edge-control.png",
    description: "Edge Control refers to the layer that provides local monitoring, control, and data processing at the edge of the network, close to the assets and processes. Edge Control provides real-time data acquisition, visualisation, alarming, and control, ensuring fast, consistent access to actionable information for operators. Edge Control is essential for local decision-making, fault tolerance, and secure connectivity, while enabling integration with high level analytics and cloud services. This layer consists of PLCs, controllers, SCADA systems, BMS, Automation systems, etc.",
    chips: ["PLC", "SCADA", "BMS", "Automation"]
  },
  connectedproducts: {
    name: "Connected Products",
    category: "EcoStruxure · Connected Products",
    fullImage: "assets/info-connected-products.png",
    description: "Connected products are capable to provide data regarding their statuses, health, electrical parameters through communication protocols (Modbus, Zigbee…). They consist of advanced switchgears and controlgears (such as MasterPacT or ComPacT circuit breakers…), meters (ammeters, energy meters…), sensors (HeatTag…), gateways, UPS, EV Chargers…",
    chips: ["Modbus", "Zigbee", "Switchgear", "Meters", "Sensors"]
  },
  sourcemgmt: {
    name: "Source Management",
    category: "Power Products · What for?",
    fullImage: "assets/info-source-management.jpg",
    description: "Source management products cover the full current range from simple all-in-one transfer switches to the highest-rated circuit breaker and switch-disconnector combinations, plus ASCO bypass solutions for maintenance without disrupting power.",
    chips: ["TransferPacT", "ComPacT NS/NSX", "MasterPacT MTZ", "ASCO"]
  },
  isolation: {
    name: "Isolation",
    category: "Power Products · What for?",
    fullImage: "assets/info-isolation.jpg",
    description: "In order to ensure operator safety during maintenance operations on the downstream circuit: the device shall ensure proper disconnection from voltage and current when in the off position, and shall provide a clear indication of the power supply status.",
    chips: ["MasterPacT", "ComPacT", "Acti9", "TransferPacT"]
  },
  mechanical: {
    name: "Mechanical Assembly and Protection Against Live Parts",
    category: "Power Products · What for?",
    fullImage: "assets/info-mechanical-assembly.png",
    description: "Devices are mechanically installed and protected against live parts during operation and maintenance, whether through a centralized switchboard architecture or a decentralized busbar trunking architecture.",
    chips: ["Centralized", "Decentralized", "Canalis", "I-Line"]
  },
  remotecontrol: {
    name: "Remote Control",
    category: "Power Products · What for?",
    description: "Different types of actuators are available to control remotely electrical distribution (to build the complete function the actuator can be associated with an HMI or automation system).",
    groups: [
      {
        heading: "Contactors (TeSys, Easy TeSys, Acti9, Multi9)",
        body: "The contactor is the device to remotely open and close an electrical circuit. It does not ensure any electrical protection function (unlike circuit breaker or switch disconnector). They are very common to control circuit of motors, heaters, lighting…",
        images: ["assets/info-remote-contactor1.jpg", "assets/info-remote-contactor2.jpg"]
      },
      {
        heading: "Electrical Auxiliaries for circuit breakers and disconnectors (Acti9, Multi9, PacT, EasyPact, TeSys Power…)",
        body: "Electrical auxiliaries such as voltage releases (MN, MX and XF coils) and electrical motor (MCH) can be installed inside ACBs and MCCBs. For miniature circuit breakers the control system is installed on the side of the circuit breaker (Acti9 RCA).",
        images: ["assets/info-remote-aux1.jpg", "assets/info-remote-aux2.jpg"]
      },
      {
        heading: "Impulse relays (Acti9 iTL)",
        body: "When at least 2 points of control are required. Mainly for lighting. No protection function ensured.",
        images: ["assets/info-remote-impulse-relay.jpg"]
      },
      {
        heading: "Other relays (Acti9 MIN…)",
        body: "Specific relays enable remote control with additional automation function such as timers or automatic recloser.",
        images: ["assets/info-remote-other-relay1.jpg", "assets/info-remote-other-relay2.jpg"]
      }
    ],
    chips: ["Contactors", "Auxiliaries", "Impulse relays", "Acti9"]
  },
  monitoring: {
    name: "Monitoring and Communication",
    category: "Power Products · What for?",
    description: "Different types of devices report status and electrical data, and connect that information to HMIs, automation systems, or Modbus networks.",
    groups: [
      {
        heading: "Electronic control units (MicroLogic for PacT series)",
        body: "The electronic control unit of PacT series circuit breakers enables monitoring of electrical parameters (current, voltage, energy…).",
        images: ["assets/info-monitor-micrologic-mtz.jpg", "assets/info-monitor-micrologic-nsx.jpg"]
      },
      {
        heading: "Indication Auxiliaries (Acti9, Multi9, PacT, EasyPact, TeSys…)",
        body: "Indication auxiliaries (OF, SD…) installed inside or on the side of devices enable reporting of the status (open, closed, tripped…). They can be connected to indication lights or automation systems.",
        images: ["assets/info-monitor-indication1.jpg", "assets/info-monitor-indication2.jpg"]
      },
      {
        heading: "Gateways (Enerlin’X, Acti9)",
        body: "The gateways enable connections of devices equipped with MicroLogic control units or devices equipped with indication contacts to Modbus TCP or Modbus SL networks.",
        images: ["assets/info-monitor-gateways.jpg"]
      },
      {
        heading: "All-in-one devices (Acti9 Reflex, Active)",
        body: "Some devices Acti9 Reflex iC60 or Acti9 Active embed indication functions (wired or wireless).",
        images: ["assets/info-monitor-allinone1.jpg", "assets/info-monitor-allinone2.jpg"]
      }
    ],
    chips: ["MicroLogic", "Indication", "Gateways", "Acti9 Reflex"]
  },
  protection: {
    name: "Protection",
    category: "Power Products · What for?",
    description: "Protection against short-circuit, overload, earth-fault, surge and more, ensured by circuit breakers, fuse holders, switch disconnectors, overload protection relays, and surge protection devices — see exactly which device covers which function below.",
    table: {
      columns: ["Circuit breaker", "Fuse holder", "Switch disconnector", "Overload protection relay", "Surge Protection Devices (SPD)"],
      rows: [
        { event: "Short-circuit", goal: "Open the circuit as fast as possible to protect cable and avoid fire", cells: ["X", "X", "", "", ""] },
        { event: "Overload", goal: "Open the circuit to protect loads and cables (but not too early to avoid nuisance tripping)", cells: ["(X)", "X", "", "X", ""] },
        { event: "Isolation", goal: "Make sure that the circuit is not live during maintenance", cells: ["X", "(X)", "X", "", ""] },
        { event: "Earth-fault", goal: "Protect people and/or avoid fire and damages on loads", cells: ["(X)", "", "(X)", "", ""] },
        { event: "Under and overvoltage", goal: "Open the circuit to protect sensitive loads and electrical installation but not too early to avoid nuisance tripping", cells: ["(X)", "", "", "", ""] },
        { event: "Final distribution Arc fault", goal: "Open the circuit as fast as possible to avoid fire", cells: ["(X)", "", "", "", ""] },
        { event: "Transient overvoltage (Surge due to Lightning…)", goal: "Evacuate the surge to earth in order to protect sensitive loads and electrical installation", cells: ["", "", "", "", "X"] }
      ],
      notes: [
        "X: The function is ensured whatever the reference of the Schneider Electric device.",
        "(X): The function can be ensured depending on the reference and/or optional auxiliary/addon."
      ]
    },
    chips: ["Short-circuit", "Overload", "Earth-fault", "Surge"]
  }
};

/* ---------- Element references ---------- */
const body        = document.body;
const slides      = {
  title:     document.getElementById("slide-title"),
  ecostruxure: document.getElementById("slide-ecostruxure"),
  architecture: document.getElementById("slide-architecture"),
  whatfor:     document.getElementById("slide-whatfor"),
  segments:  document.getElementById("slide-segments"),
  dashboard: document.getElementById("slide-dashboard"),
  machineControlPanel: document.getElementById("slide-machineControlPanel"),
  mccUe:               document.getElementById("slide-mccUe"),
  xsSG:                document.getElementById("slide-xsSG"),
  xsResi9:              document.getElementById("slide-xsResi9"),
  prismasetG:           document.getElementById("slide-prismasetG"),
  okken:                document.getElementById("slide-okken")
};
const stage       = document.getElementById("stage");
const backToSegmentsBtn = document.getElementById("backToSegmentsBtn");
const drawer      = document.getElementById("drawer");
const drawerScrim = document.getElementById("drawerScrim");

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

  resetZoom();                // always leave the dashboard clean
  closeDrawer();

  from.classList.remove("is-active");
  from.classList.add("is-exit-left");
  to.classList.remove("is-exit-left");
  // force reflow so the enter transition always plays
  void to.offsetWidth;
  to.classList.add("is-active");

  currentSlide = name;
  body.dataset.slide = name;
  if (name === "segments") layoutSegmentsMap();
  if (name === "dashboard") sizeBoards();
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

  // Leave room on the right for the detail drawer (50% of the screen) on wide screens
  const drawerW = window.innerWidth > 860 ? window.innerWidth * 0.5 : 0;
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

  // Drawer appears gracefully with a minor delay post-zoom (Prompt 5)
  clearTimeout(drawerTimer);
  drawerTimer = setTimeout(() => openDrawer(zoomState.product), 600);
}

function resetZoom() {
  // Drawers opened without a zoom (the 3 info pages' hotspots) have no
  // zoomState, but still need the close button/scrim to close them.
  if (zoomState) {
    zoomState.hotspot.classList.remove("is-target");
    zoomState = null;

    clearTimeout(drawerTimer);
    stage.classList.remove("is-zoomed");
    stage.style.transform = "";     // cleanly reset the transform matrix
  }
  closeDrawer();
}

/* =========================================================
   Prompt 5 — Product detail drawer
   ========================================================= */
function openDrawer(productId) {
  const p = PRODUCTS[productId] || INFO_TOPICS[productId];
  if (!p) return;

  document.getElementById("drawerCategory").textContent = p.category;
  document.getElementById("drawerTitle").textContent    = p.name;

  const bodyEl = document.getElementById("drawerBody");
  bodyEl.innerHTML = "";

  if (p.fullImage) {
    const img = document.createElement("img");
    img.className = "drawer__full-image";
    img.src = p.fullImage;
    img.alt = p.name;
    img.loading = "lazy";
    bodyEl.appendChild(img);
  }

  if ((p.images && p.images.length) || p.video) {
    // Images and video share one row so the video doesn't take a full-width
    // block of its own height — that pushed all the text below it down,
    // forcing more scrolling to read anything.
    const gallery = document.createElement("div");
    gallery.className = "drawer__gallery";
    if (p.images) {
      p.images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = p.name;
        img.loading = "lazy";
        gallery.appendChild(img);
      });
    }
    if (p.video) {
      const video = document.createElement("video");
      video.className = "drawer__video";
      video.src = p.video;
      video.controls = true;
      video.preload = "metadata";
      gallery.appendChild(video);
    }
    bodyEl.appendChild(gallery);
  }

  // Quick links are rendered independently of the gallery above — they used
  // to be nested inside it, so any product without images/video (e.g.
  // PowerLogic HeatTag, which has no usable image yet) silently lost its
  // quick-link buttons too even though it has a quickLinks array.
  if (p.quickLinks && p.quickLinks.length) {
    const links = document.createElement("div");
    links.className = "drawer__quicklinks";
    p.quickLinks.forEach((link, i) => {
      const a = document.createElement("a");
      a.className = "drawer__quicklink drawer__quicklink--" + (i % 3);
      a.textContent = link.label;
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    });
    bodyEl.appendChild(links);
  }

  const desc = document.createElement("p");
  desc.textContent = p.description;
  bodyEl.appendChild(desc);

  if (p.connectivity && p.connectivity.length) {
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
  }

  if (p.valueProposition) {
    const vp = p.valueProposition;

    const vpHeading = document.createElement("h4");
    vpHeading.textContent = "Value Proposition";
    bodyEl.appendChild(vpHeading);

    if (vp.intro) {
      const intro = document.createElement("p");
      intro.textContent = vp.intro;
      bodyEl.appendChild(intro);
    }

    vp.sections.forEach(section => {
      const sectionHeading = document.createElement("h5");
      sectionHeading.textContent = section.heading;
      bodyEl.appendChild(sectionHeading);

      const sectionList = document.createElement("ul");
      section.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        sectionList.appendChild(li);
      });
      bodyEl.appendChild(sectionList);
    });

    if (vp.outro) {
      const outro = document.createElement("p");
      outro.textContent = vp.outro;
      bodyEl.appendChild(outro);
    }
  }

  if (p.groups && p.groups.length) {
    p.groups.forEach(group => {
      const h = document.createElement("h5");
      h.textContent = group.heading;
      bodyEl.appendChild(h);

      const body = document.createElement("p");
      body.textContent = group.body;
      bodyEl.appendChild(body);

      if (group.images && group.images.length) {
        const row = document.createElement("div");
        row.className = "drawer__gallery";
        group.images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = group.heading;
          img.loading = "lazy";
          row.appendChild(img);
        });
        bodyEl.appendChild(row);
      }
    });
  }

  if (p.table) {
    const t = p.table;
    const table = document.createElement("table");
    table.className = "drawer__table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    headRow.appendChild(document.createElement("th"));
    t.columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    t.rows.forEach(row => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      const evt = document.createElement("span");
      evt.className = "drawer__table-event";
      evt.textContent = row.event;
      const goal = document.createElement("span");
      goal.className = "drawer__table-goal";
      goal.textContent = row.goal;
      th.appendChild(evt);
      th.appendChild(goal);
      tr.appendChild(th);
      row.cells.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    bodyEl.appendChild(table);

    if (t.notes && t.notes.length) {
      const notes = document.createElement("p");
      notes.className = "drawer__table-notes";
      notes.innerHTML = t.notes.map(n => n.replace(/^(\S+:)/, "<strong>$1</strong>")).join("<br>");
      bodyEl.appendChild(notes);
    }
  }

  const chips = document.getElementById("drawerChips");
  chips.innerHTML = "";
  (p.chips || []).forEach(c => {
    const s = document.createElement("span");
    s.textContent = c;
    chips.appendChild(s);
  });

  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  drawerScrim.hidden = false;
  requestAnimationFrame(() => drawerScrim.classList.add("is-on"));

  document.dispatchEvent(new CustomEvent("drawerOpen", { detail: { productId } }));
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  drawerScrim.classList.remove("is-on");
  setTimeout(() => { if (!drawer.classList.contains("is-open")) drawerScrim.hidden = true; }, 420);
}

/* =========================================================
   Segments map — sized at runtime to exactly match the diagram image's own
   aspect ratio (no letterbox bars), then enlarged (bigger than the size that
   fits the available space exactly). The hotspot is derived from this same
   live size, so it stays proportionate automatically with no distortion.
   ========================================================= */
const SEGMENTS_MAP_SCALE_MULTIPLIER = 2.5;

function sizeSegmentsMap() {
  const map = document.querySelector(".segments-map");
  const img = document.querySelector(".segments-map__image");
  if (!map || !img || !img.naturalWidth) return;

  // Clear any previous explicit size so CSS (flex:1/min-height:0/max-width/aspect-ratio)
  // re-establishes the maximum available bounding box to measure against.
  map.style.width = "";
  map.style.height = "";
  const boundW = map.clientWidth, boundH = map.clientHeight;
  const nw = img.naturalWidth, nh = img.naturalHeight;
  const scale = Math.min(boundW / nw, boundH / nh) * SEGMENTS_MAP_SCALE_MULTIPLIER;

  map.style.width  = Math.round(nw * scale) + "px";
  map.style.height = Math.round(nh * scale) + "px";
}

/* =========================================================
   Segment hotspots — sized/positioned at runtime to exactly match each
   colored box in the diagram. CSS percentages alone can't do this reliably
   because the segments map's own size is computed dynamically above, so each
   hotspot must be derived from the same live measurements. Percentages were
   measured directly from the source PNG's pixels (segments-layout.png).
   ========================================================= */
const SEGMENT_HOTSPOTS = [
  { id: "prismasetPCard",            box: { left: 66.708, right: 81.429, top: 17.857, bottom: 46.164 } },
  { id: "hotspotMachineControlPanel", box: { left: 33.107, right: 90.822, top: 1.852,  bottom: 14.153 } },
  { id: "hotspotMccUe",               box: { left: 93.040, right: 99.938, top: 1.852,  bottom: 30.159 } },
  { id: "hotspotXsSG",                box: { left: 49.923, right: 99.969, top: 65.873, bottom: 78.307 } },
  { id: "hotspotXsResi9",             box: { left: 16.323, right: 47.829, top: 1.852,  bottom: 78.307 } },
  { id: "hotspotPrismasetG",          box: { left: 33.108, right: 94.949, top: 17.857, bottom: 62.368 } },
  { id: "hotspotOkken",               box: { left: 83.523, right: 94.949, top: 17.857, bottom: 46.230 } }
];

// These 3 segments use an SVG whose own canvas already has the segment's
// real L-shaped notch baked in (not a plain rectangular photo) — they
// should stretch to exactly fill their box rather than aspect-fit/center.
const SHAPE_FILL_IDS = new Set(["hotspotXsResi9", "hotspotPrismasetG", "hotspotOkken"]);

function positionSegmentHotspots() {
  const map = document.querySelector(".segments-map");
  const img = document.querySelector(".segments-map__image");
  if (!map || !img || !img.naturalWidth) return;

  const cw = map.clientWidth, ch = map.clientHeight;
  const nw = img.naturalWidth, nh = img.naturalHeight;
  const scale = Math.min(cw / nw, ch / nh);
  const renderedW = nw * scale, renderedH = nh * scale;
  const offsetX = (cw - renderedW) / 2, offsetY = (ch - renderedH) / 2;

  SEGMENT_HOTSPOTS.forEach(({ id, box }) => {
    const left   = offsetX + (box.left   / 100) * renderedW;
    const top    = offsetY + (box.top    / 100) * renderedH;
    const width  = ((box.right  - box.left) / 100) * renderedW;
    const height = ((box.bottom - box.top)  / 100) * renderedH;

    const hotspot = document.getElementById(id);
    if (hotspot) {
      hotspot.style.left   = left   + "px";
      hotspot.style.top    = top    + "px";
      hotspot.style.width  = width  + "px";
      hotspot.style.height = height + "px";
    }

    const photo = document.getElementById(id + "-photo");
    if (photo) {
      let photoW = width, photoH = height, photoLeft = left, photoTop = top;
      if (!SHAPE_FILL_IDS.has(id) && photo.naturalWidth) {
        // Plain rectangular product photos (the 4 simple segments) don't
        // match their box's aspect ratio, so fit (not stretch) them inside
        // it — like object-fit:contain, computed in JS so the <img>'s own
        // border-box hugs the actual picture instead of leaving a big
        // transparent margin (visible via its drop-shadow).
        // The 3 L-shaped segments (see SHAPE_FILL_IDS below) already have
        // their real notch shape baked into their own SVG canvas, so they
        // skip this and just stretch to exactly fill the box instead —
        // fitting them centered would otherwise shift them off the segment
        // they're meant to sit on.
        const photoRatio = photo.naturalWidth / photo.naturalHeight;
        const boxRatio = width / height;
        if (photoRatio > boxRatio) {
          photoW = width;
          photoH = width / photoRatio;
        } else {
          photoH = height;
          photoW = height * photoRatio;
        }
        photoLeft = left + (width - photoW) / 2;
        photoTop  = top  + (height - photoH) / 2;
      }
      if (SHAPE_FILL_IDS.has(id)) {
        // These 3 use width/height/left/top transitions (via CSS custom
        // properties), not transform:scale — combining transform with
        // clip-path on these L-shapes was rendering as a shrink/shift
        // instead of a grow in this browser, so plain layout-property
        // transitions are used instead, same as the rest of this app's
        // animations that avoid transform+clip-path/filter combos.
        photo.style.setProperty("--box-left", photoLeft + "px");
        photo.style.setProperty("--box-top",  photoTop  + "px");
        photo.style.setProperty("--box-w",    photoW    + "px");
        photo.style.setProperty("--box-h",    photoH    + "px");
      } else {
        photo.style.left   = photoLeft + "px";
        photo.style.top    = photoTop  + "px";
        photo.style.width  = photoW    + "px";
        photo.style.height = photoH    + "px";
      }
    }
  });
}

function layoutSegmentsMap() {
  sizeSegmentsMap();
  positionSegmentHotspots();
}

if (document.querySelector(".segments-map__image").complete) {
  layoutSegmentsMap();
} else {
  document.querySelector(".segments-map__image").addEventListener("load", layoutSegmentsMap);
}
window.addEventListener("resize", layoutSegmentsMap);

// Each segment photo's own aspect ratio is needed to size it correctly
// (see positionSegmentHotspots) — re-run positioning once each one loads,
// since naturalWidth isn't available until then.
SEGMENT_HOTSPOTS.forEach(({ id }) => {
  const photo = document.getElementById(id + "-photo");
  if (photo && !photo.complete) {
    photo.addEventListener("load", positionSegmentHotspots);
  }
});

/* =========================================================
   The 3 info pages between title and segments (EcoStruxure solutions,
   Electrical Architecture, Power Products: What for?) — each is one big
   diagram image (cropped straight from the source PDF) with
   invisible/circle/rectangle hotspot buttons overlaid in percent
   coordinates. Each .info-map has its aspect-ratio set inline in HTML to
   match its image's exact natural pixel dimensions, so the box's height is
   always derived from its width with no JS and no letterboxing — see the
   CSS comment on .info-map for why this replaced an earlier JS version.
   ========================================================= */

/* =========================================================
   Dashboard switchboard photos — sized at runtime to exactly match each
   image's real aspect ratio within its allocated flex space, so they're
   never cropped (object-fit:cover) or letterboxed, while still fitting the
   no-scroll layout. "Optimum connected wired" uses this exact-fit sizing.

   FULL_BLEED_CONFIGS lists panels that should fill more of their cell than
   that (less empty space) by allowing a bounded amount of cropping, instead
   of matching the cell exactly (which crops as much as the cell's shape
   happens to demand — too aggressive). FULL_BLEED_BLEND tunes how far toward
   "fill the cell completely" to go: 0 = identical to the no-crop sizing above,
   1 = fill the cell exactly (maximum crop). 0.5 splits the difference.
   ========================================================= */
const FULL_BLEED_CONFIGS = ["Optimum connected wireless", "Easy Non-connected"];
const FULL_BLEED_BLEND = 0.5;

function sizeBoards() {
  document.querySelectorAll(".board").forEach(board => {
    const img = board.querySelector(".board__image");
    if (!img || !img.naturalWidth) return;

    const config = board.closest(".panel").dataset.config;
    const caption = board.closest(".panel").querySelector(".panel__caption");

    board.style.width = "";
    board.style.height = "";
    const boundW = board.clientWidth, boundH = board.clientHeight;
    if (!boundW || !boundH) return;
    const nw = img.naturalWidth, nh = img.naturalHeight;

    if (FULL_BLEED_CONFIGS.includes(config)) {
      // Blend the image's natural ratio toward the cell's ratio, then fit a box
      // of that blended ratio inside the cell. Closer to the cell's ratio means
      // more of the cell is filled, at the cost of cropping more of the photo.
      const imageRatio = nw / nh;
      const cellRatio = boundW / boundH;
      const targetRatio = imageRatio + (cellRatio - imageRatio) * FULL_BLEED_BLEND;
      const w = Math.min(boundW, boundH * targetRatio);
      const h = w / targetRatio;
      board.style.width  = Math.round(w) + "px";
      board.style.height = Math.round(h) + "px";
      if (caption) caption.style.width = Math.round(w) + "px";
      return;
    }

    const scale = Math.min(boundW / nw, boundH / nh);
    const boardWidth = Math.round(nw * scale);

    board.style.width  = boardWidth + "px";
    board.style.height = Math.round(nh * scale) + "px";

    // Match the caption below it to the board's actual width, not the full panel width.
    if (caption) caption.style.width = boardWidth + "px";
  });
}

const boardImages = document.querySelectorAll(".board__image");
let boardImagesLoaded = 0;
boardImages.forEach(img => {
  if (img.complete) {
    boardImagesLoaded++;
  } else {
    img.addEventListener("load", () => {
      boardImagesLoaded++;
      if (boardImagesLoaded === boardImages.length) sizeBoards();
    });
  }
});
if (boardImagesLoaded === boardImages.length) sizeBoards();
window.addEventListener("resize", sizeBoards);

/* =========================================================
   Wiring
   ========================================================= */
document.getElementById("exploreBtn").addEventListener("click", () => goToSlide("ecostruxure"));
document.getElementById("prismasetPCard").addEventListener("click", () => goToSlide("dashboard"));

/* The 3 info pages' Previous/Next buttons (top-right, same as Back to Start/Segments) */
const INFO_PAGE_NAV = {
  ecostruxure:  { prev: "title",        next: "architecture" },
  architecture: { prev: "ecostruxure",  next: "whatfor" },
  whatfor:      { prev: "architecture", next: "segments" }
};
Object.entries(INFO_PAGE_NAV).forEach(([slideName, { prev, next }]) => {
  const prevBtn = document.getElementById("prevFrom" + slideName[0].toUpperCase() + slideName.slice(1));
  const nextBtn = document.getElementById("nextFrom" + slideName[0].toUpperCase() + slideName.slice(1));
  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(prev));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(next));
});

/* Info-page hotspots open the same drawer as product hotspots, but with no
   click-to-zoom (these pages have no .board/.panel "stage" to zoom into). */
document.querySelectorAll(".info-hotspot").forEach(h => {
  h.addEventListener("click", e => {
    e.stopPropagation();
    openDrawer(h.dataset.info);
  });
});

/* Each non-PrismaSeT-P segment hotspot opens its own simple info page */
const SEGMENT_PAGE_LINKS = {
  hotspotMachineControlPanel: "machineControlPanel",
  hotspotMccUe:               "mccUe",
  hotspotXsSG:                "xsSG",
  hotspotXsResi9:              "xsResi9",
  hotspotPrismasetG:           "prismasetG",
  hotspotOkken:                "okken"
};
Object.entries(SEGMENT_PAGE_LINKS).forEach(([hotspotId, slideName]) => {
  const el = document.getElementById(hotspotId);
  if (el) el.addEventListener("click", () => goToSlide(slideName));
});

const SEGMENT_PAGE_BACK_BUTTONS = {
  backToSegmentsFromMachineControlPanel: "segments",
  backToSegmentsFromMccUe:               "segments",
  backToSegmentsFromXsSG:                "segments",
  backToSegmentsFromXsResi9:             "segments",
  backToSegmentsFromPrismasetG:          "segments",
  backToSegmentsFromOkken:               "segments"
};
Object.entries(SEGMENT_PAGE_BACK_BUTTONS).forEach(([btnId, slideName]) => {
  const el = document.getElementById(btnId);
  if (el) el.addEventListener("click", () => goToSlide(slideName));
});

/* Segments' Previous mirrors the "What for?" page's Next button
   (Title -> EcoStruxure -> Architecture -> What for? -> Segments). The 6
   detail pages don't get one: they're sibling pages reached via a hotspot,
   not a linear sequence, and already have a "Back to Segments" button. */
document.getElementById("prevFromSegments").addEventListener("click", () => goToSlide("whatfor"));

document.querySelectorAll(".hotspot").forEach(h => {
  h.addEventListener("click", e => {
    e.stopPropagation();
    if (zoomState) return;        // one zoom at a time; reset first
    zoomToHotspot(h);
  });
});

backToSegmentsBtn.addEventListener("click", () => goToSlide("segments"));
document.getElementById("drawerClose").addEventListener("click", () => resetZoom());
drawerScrim.addEventListener("click", () => resetZoom());

const SEGMENT_DETAIL_SLIDES = ["machineControlPanel", "mccUe", "xsSG", "xsResi9", "prismasetG", "okken"];

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (zoomState) resetZoom();
    else if (drawer.classList.contains("is-open")) closeDrawer();
    else if (currentSlide === "dashboard") goToSlide("segments");
    else if (SEGMENT_DETAIL_SLIDES.includes(currentSlide)) goToSlide("segments");
    else if (currentSlide === "segments") goToSlide("title");
    else if (INFO_PAGE_NAV[currentSlide]) goToSlide(INFO_PAGE_NAV[currentSlide].prev);
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

/* =========================================================
   Visitor comments — floating pins dropped anywhere on a slide
   ========================================================= */
(function initCommentsWidget() {
  const HIDE_KEY = "lvpp_comments_hidden";

  // Filled in once the Supabase project is created — see supabase-schema.sql
  // for the table/policies these credentials talk to. The anon key is safe
  // to expose client-side; it only grants what the RLS policies allow.
  const SUPABASE_URL = "https://rpdsciacyyuvzoyqaliy.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZHNjaWFjeXl1dnpveXFhbGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMjMyNTQsImV4cCI6MjA5NzY5OTI1NH0.ASnskiv9QJ7WGzOTY-Tf-egSpnCnZD-GaiIVncMawKM";

  const sb = (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  // Fill notifyEndpoint with a Formspree/EmailJS endpoint to get a real email
  // per comment.
  const NOTIFY_CONFIG = {
    notifyEndpoint: "",
    notifyEmail: "bipin.sagarbobbigani@non.se.com"
  };

  let commentsCache = [];

  function rowToComment(r) {
    return { id: r.id, slide: r.slide, xPct: r.x_pct, yPct: r.y_pct, name: r.name, text: r.text, resolved: r.resolved, ts: r.ts };
  }
  function commentToRow(c) {
    return { id: c.id, slide: c.slide, x_pct: c.xPct, y_pct: c.yPct, name: c.name, text: c.text, resolved: c.resolved, ts: c.ts };
  }

  async function fetchComments() {
    if (!sb) return commentsCache;
    const { data, error } = await sb.from("comments").select("*").order("ts", { ascending: true });
    if (error) { console.error("Supabase fetch failed:", error.message); return commentsCache; }
    commentsCache = data.map(rowToComment);
    return commentsCache;
  }

  async function insertComment(comment) {
    if (!sb) { commentsCache.push(comment); return; }
    const { error } = await sb.from("comments").insert(commentToRow(comment));
    if (error) { console.error("Supabase insert failed:", error.message); return; }
    await fetchComments();
  }

  async function updateComment(id, patch) {
    if (!sb) {
      const c = commentsCache.find(c => c.id === id);
      if (c) Object.assign(c, patch);
      return;
    }
    const row = {};
    if ("resolved" in patch) row.resolved = patch.resolved;
    if ("name" in patch) row.name = patch.name;
    if ("text" in patch) row.text = patch.text;
    const { error } = await sb.from("comments").update(row).eq("id", id);
    if (error) { console.error("Supabase update failed:", error.message); return; }
    await fetchComments();
  }

  async function deleteComment(id) {
    if (!sb) { commentsCache = commentsCache.filter(c => c.id !== id); return; }
    const { error } = await sb.from("comments").delete().eq("id", id);
    if (error) { console.error("Supabase delete failed:", error.message); return; }
    await fetchComments();
  }

  function loadComments() {
    return commentsCache;
  }

  const toggle   = document.getElementById("commentsToggle");
  const hint     = document.getElementById("commentsHint");
  const popup    = document.getElementById("commentsPanel");
  const scrim    = document.getElementById("commentsScrim");
  const popupTitle = document.getElementById("commentsPopupTitle");
  const closeBtn = document.getElementById("commentsClose");
  const deleteBtn = document.getElementById("commentDelete");
  const form     = document.getElementById("commentForm");
  const nameEl   = document.getElementById("commentName");
  const textEl   = document.getElementById("commentText");
  const pinLayers = document.querySelectorAll(".comments-pins");

  const menuToggle = document.getElementById("commentsMenuToggle");
  const menuBadge  = document.getElementById("commentsBadge");
  const menu       = document.getElementById("commentsMenu");
  const menuClose  = document.getElementById("commentsMenuClose");
  const menuList   = document.getElementById("commentsMenuList");

  let pinMode    = false;
  let draftPin   = null;  // { slide, xPct, yPct } awaiting first save
  let activeId   = null;  // id of an existing pin being viewed/edited

  function labelForSlide(slide) {
    if (slide === "title") return "Title page";
    if (slide === "ecostruxure") return "EcoStruxure solutions";
    if (slide === "architecture") return "Power Products in Electrical Architecture";
    if (slide === "whatfor") return "Power Products: What for?";
    if (slide === "segments") return "Market segments";
    if (slide === "dashboard") return "PrismaSeT P dashboard";
    if (slide.startsWith("drawer-")) {
      const id = slide.slice(7);
      const p = PRODUCTS[id] || INFO_TOPICS[id];
      return "Drawer · " + (p ? p.name : id);
    }
    return slide;
  }

  function updateBadge(comments) {
    const count = comments.filter(c => !c.resolved).length;
    menuBadge.hidden = count === 0;
    menuBadge.textContent = String(count);
  }

  // Pins on the page only show unresolved comments — resolved ones stay in the menu.
  function renderPins() {
    const comments = loadComments();
    pinLayers.forEach(layer => {
      const slideName = layer.dataset.pinsSlide;
      layer.innerHTML = "";
      comments.filter(c => c.slide === slideName && !c.resolved).forEach((c, i) => {
        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = "comments-pin";
        pin.style.left = c.xPct + "%";
        pin.style.top  = c.yPct + "%";
        pin.dataset.id = c.id;
        pin.title = c.text;
        pin.textContent = i + 1;
        layer.appendChild(pin);
      });
    });
    updateBadge(comments);
  }

  async function toggleResolve(id) {
    const c = commentsCache.find(c => c.id === id);
    if (!c) return;
    await updateComment(id, { resolved: !c.resolved });
    renderPins();
    renderMenu();
  }

  // Scrolls the pin into view and plays a brief zoom-in/glow pulse on it so
  // it's unmistakable even on a slide with several pins. Resolved comments
  // have no pin on the page (renderPins only shows unresolved ones), so
  // there's nothing to highlight for those — navigating to the right page
  // is still useful on its own.
  function highlightPin(slideKey, id) {
    const selector = '.comments-pins[data-pins-slide="' + slideKey + '"] .comments-pin[data-id="' + id + '"]';
    const pinEl = document.querySelector(selector);
    if (!pinEl) return;
    pinEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    pinEl.classList.remove("is-highlighted");
    // restart the animation even if it was already triggered moments ago
    void pinEl.offsetWidth;
    pinEl.classList.add("is-highlighted");
    setTimeout(() => pinEl.classList.remove("is-highlighted"), 2300);
  }

  function gotoComment(c) {
    const isDrawer = c.slide.startsWith("drawer-");
    const targetSlide = isDrawer ? "dashboard" : c.slide;
    const needsNav = targetSlide !== currentSlide;
    if (needsNav) goToSlide(targetSlide);
    closeMenu();

    if (isDrawer) {
      const productId = c.slide.slice(7);
      setTimeout(() => {
        openDrawer(productId);
        setTimeout(() => highlightPin(c.slide, c.id), 350);
      }, needsNav ? 750 : 50);
    } else {
      setTimeout(() => highlightPin(c.slide, c.id), needsNav ? 700 : 50);
    }
  }

  function buildMenuItem(c) {
    const item = document.createElement("div");
    item.className = "comments-menu__item" + (c.resolved ? " is-resolved" : "");

    const head = document.createElement("div");
    head.className = "comments-menu__item-head";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = c.name || "Anonymous";
    const timeSpan = document.createElement("span");
    timeSpan.className = "comments-menu__item-time";
    timeSpan.textContent = new Date(c.ts).toLocaleString();
    head.appendChild(nameSpan);
    head.appendChild(timeSpan);

    const text = document.createElement("p");
    text.className = "comments-menu__item-text";
    text.textContent = c.text;

    const actions = document.createElement("div");
    actions.className = "comments-menu__item-actions";

    const resolve = document.createElement("button");
    resolve.type = "button";
    resolve.className = "comments-menu__resolve-btn";
    resolve.textContent = c.resolved ? "Unresolve" : "Resolve";
    resolve.addEventListener("click", () => toggleResolve(c.id));

    const goto = document.createElement("button");
    goto.type = "button";
    goto.className = "comments-menu__goto-btn";
    goto.textContent = "Go to";
    goto.addEventListener("click", () => gotoComment(c));

    const del = document.createElement("button");
    del.type = "button";
    del.className = "comments-menu__delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await deleteComment(c.id);
      renderPins();
      renderMenu();
    });

    actions.appendChild(resolve);
    actions.appendChild(goto);
    actions.appendChild(del);

    item.appendChild(head);
    item.appendChild(text);
    item.appendChild(actions);
    return item;
  }

  function renderMenu() {
    const comments = loadComments();
    menuList.innerHTML = "";
    if (!comments.length) {
      const empty = document.createElement("p");
      empty.className = "comments-menu__empty";
      empty.textContent = "No comments yet.";
      menuList.appendChild(empty);
      updateBadge(comments);
      return;
    }
    const groups = new Map();
    comments.forEach(c => {
      if (!groups.has(c.slide)) groups.set(c.slide, []);
      groups.get(c.slide).push(c);
    });
    groups.forEach((list, slide) => {
      const title = document.createElement("div");
      title.className = "comments-menu__group-title";
      title.textContent = labelForSlide(slide);
      menuList.appendChild(title);

      list.slice()
        .sort((a, b) => (a.resolved === b.resolved ? b.ts - a.ts : a.resolved ? 1 : -1))
        .forEach(c => menuList.appendChild(buildMenuItem(c)));
    });
    updateBadge(comments);
  }

  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    renderMenu();
  }
  function closeMenu() {
    // If focus is still inside the menu (e.g. the close button itself was
    // just clicked), move it out before hiding the menu from assistive
    // tech — aria-hidden on a focused element's ancestor is invalid and
    // Chrome blocks it with a console warning otherwise.
    if (menu.contains(document.activeElement)) {
      menuToggle.focus();
    }
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) closeMenu(); else openMenu();
  });
  menuClose.addEventListener("click", closeMenu);

  function setPinMode(on) {
    pinMode = on;
    document.body.classList.toggle("comments-pin-mode", on);
    toggle.setAttribute("aria-pressed", String(on));
    hint.hidden = !on;
  }

  function positionPopup(x, y) {
    const margin = 12;
    const w = popup.offsetWidth  || 300;
    const h = popup.offsetHeight || 200;
    let left = x + margin;
    let top  = y + margin;
    if (left + w > window.innerWidth  - margin) left = x - w - margin;
    if (top  + h > window.innerHeight - margin) top  = window.innerHeight - h - margin;
    left = Math.max(margin, left);
    top  = Math.max(margin, top);
    popup.style.left = left + "px";
    popup.style.top  = top  + "px";
  }

  function openPopup(x, y) {
    positionPopup(x, y);
    scrim.hidden = false;
    popup.hidden = false;
    requestAnimationFrame(() => {
      scrim.classList.add("is-on");
      popup.classList.add("is-open");
    });
    textEl.focus();
  }

  function closePopup() {
    scrim.classList.remove("is-on");
    popup.classList.remove("is-open");
    scrim.hidden = true;
    popup.hidden = true;
    draftPin = null;
    activeId = null;
    nameEl.value = "";
    textEl.value = "";
  }

  function startDraft(layer, clientX, clientY) {
    const rect = layer.getBoundingClientRect();
    draftPin = {
      slide: layer.dataset.pinsSlide,
      xPct: ((clientX - rect.left) / rect.width)  * 100,
      yPct: ((clientY - rect.top)  / rect.height) * 100
    };
    activeId = null;
    popupTitle.textContent = "New comment";
    deleteBtn.hidden = true;
    openPopup(clientX, clientY);
  }

  function viewPin(pinEl, clientX, clientY) {
    const comments = loadComments();
    const c = comments.find(c => c.id === pinEl.dataset.id);
    if (!c) return;
    draftPin = null;
    activeId = c.id;
    nameEl.value = c.name || "";
    textEl.value = c.text;
    popupTitle.textContent = "Edit comment";
    deleteBtn.hidden = false;
    openPopup(clientX, clientY);
  }

  function notifyNewComment(comment) {
    if (!NOTIFY_CONFIG.notifyEndpoint) return;
    fetch(NOTIFY_CONFIG.notifyEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _replyto: NOTIFY_CONFIG.notifyEmail,
        page: comment.slide,
        name: comment.name || "Anonymous",
        message: comment.text
      })
    }).catch(() => {});
  }

  toggle.addEventListener("click", () => setPinMode(!pinMode));

  pinLayers.forEach(layer => {
    layer.addEventListener("click", e => {
      const pinEl = e.target.closest(".comments-pin");
      if (pinEl) { e.stopPropagation(); viewPin(pinEl, e.clientX, e.clientY); return; }
      if (!pinMode) return;
      startDraft(layer, e.clientX, e.clientY);
      setPinMode(false);
    });
  });

  closeBtn.addEventListener("click", closePopup);
  scrim.addEventListener("click", closePopup);
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (popup.classList.contains("is-open")) closePopup();
    else if (menu.classList.contains("is-open")) closeMenu();
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const text = textEl.value.trim();
    if (!text) return;

    if (draftPin) {
      const comment = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        slide: draftPin.slide,
        xPct: draftPin.xPct,
        yPct: draftPin.yPct,
        name: nameEl.value.trim(),
        text,
        resolved: false,
        ts: Date.now()
      };
      await insertComment(comment);
      notifyNewComment(comment);
    } else if (activeId) {
      await updateComment(activeId, { name: nameEl.value.trim(), text });
    }
    renderPins();
    renderMenu();
    closePopup();
  });

  deleteBtn.addEventListener("click", async () => {
    if (!activeId) return;
    await deleteComment(activeId);
    renderPins();
    renderMenu();
    closePopup();
  });

  /* Drawer pins are scoped per product so feedback on MTZ vs NSX etc. doesn't mix */
  document.addEventListener("drawerOpen", e => {
    const drawerLayer = document.getElementById("drawerPins");
    if (!drawerLayer) return;
    drawerLayer.dataset.pinsSlide = "drawer-" + e.detail.productId;
    closePopup();
    setPinMode(false);
    renderPins();
  });

  /* Clean presentation mode — Ctrl+Shift+C toggles the whole comments layer */
  function applyHiddenState() {
    document.body.classList.toggle("comments-hidden", localStorage.getItem(HIDE_KEY) === "1");
  }
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
      const hidden = !document.body.classList.contains("comments-hidden");
      document.body.classList.toggle("comments-hidden", hidden);
      localStorage.setItem(HIDE_KEY, hidden ? "1" : "0");
      if (hidden) { setPinMode(false); closePopup(); closeMenu(); }
    }
  });
  applyHiddenState();

  fetchComments().then(() => { renderPins(); renderMenu(); });

  // Keep every open tab in sync when someone else adds/edits/resolves/deletes
  // a comment (requires Realtime turned on for the table — see
  // supabase-schema.sql; harmless no-op if it isn't enabled).
  if (sb) {
    sb.channel("comments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, () => {
        fetchComments().then(() => { renderPins(); renderMenu(); });
      })
      .subscribe();
  }
})();

/* Initial state */
body.dataset.slide = "title";
