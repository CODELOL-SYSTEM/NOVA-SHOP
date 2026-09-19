import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSy5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   ANIMATIONS NOVASHOP
========================================================= */

const novaAnimationStyle = document.createElement("style");

novaAnimationStyle.textContent = `

/* =========================
   PRODUCT CARD
========================= */

.product-card {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition:
    transform .35s cubic-bezier(.2,.8,.2,1),
    box-shadow .35s ease,
    border-color .35s ease;
}

.product-card::before {
  content: "";
  position: absolute;
  inset: -2px;
  background:
    linear-gradient(
      120deg,
      transparent 20%,
      rgba(74,144,255,.18),
      transparent 80%
    );
  transform: translateX(-120%);
  transition: transform .7s ease;
  pointer-events: none;
  z-index: 0;
}

.product-card:hover::before {
  transform: translateX(120%);
}

.product-card:hover {
  transform:
    translateY(-9px)
    scale(1.015);
  box-shadow:
    0 18px 55px rgba(0,0,0,.38),
    0 0 35px rgba(40,120,255,.13);
}

.product-card > * {
  position: relative;
  z-index: 1;
}

.product-card.nova-added {
  animation:
    novaCardAdd .65s cubic-bezier(.2,.9,.2,1);
}

@keyframes novaCardAdd {
  0% {
    transform: scale(1);
  }

  25% {
    transform:
      scale(1.045)
      rotate(-.5deg);
  }

  55% {
    transform:
      scale(.985)
      rotate(.3deg);
  }

  100% {
    transform: scale(1);
  }
}


/* =========================
   IMAGE
========================= */

.product-image {
  transition:
    transform .6s cubic-bezier(.2,.8,.2,1),
    filter .4s ease;
}

.product-card:hover .product-image {
  transform:
    scale(1.075)
    rotate(-1deg);
  filter:
    brightness(1.08)
    saturate(1.08);
}


/* =========================
   BUTTON ADD CART
========================= */

[data-add-cart] {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform .18s ease,
    box-shadow .25s ease,
    background .25s ease;
}

[data-add-cart]::before {
  content: "";
  position: absolute;
  width: 25px;
  height: 180px;
  left: -70px;
  top: -60px;
  transform: rotate(25deg);
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.7),
      transparent
    );
  transition: left .5s ease;
  z-index: -1;
}

[data-add-cart]:hover::before {
  left: 140%;
}

[data-add-cart]:active {
  transform: scale(.82);
}

[data-add-cart].clicked {
  animation:
    novaButtonPop .5s cubic-bezier(.2,.9,.2,1);
}

@keyframes novaButtonPop {

  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(.72);
  }

  55% {
    transform: scale(1.16);
  }

  75% {
    transform: scale(.94);
  }

  100% {
    transform: scale(1);
  }

}


/* =========================
   CART ICON
========================= */

#cartBtn,
#bottomCartBtn {
  position: relative;
  transform-origin: center;
}

.nova-cart-shake {
  animation:
    novaCartShake .65s
    cubic-bezier(.36,.07,.19,.97);
}

@keyframes novaCartShake {

  0% {
    transform: translateX(0) rotate(0);
  }

  15% {
    transform: translateX(-5px) rotate(-8deg);
  }

  30% {
    transform: translateX(5px) rotate(8deg);
  }

  45% {
    transform: translateX(-4px) rotate(-6deg);
  }

  60% {
    transform: translateX(4px) rotate(5deg);
  }

  75% {
    transform: translateX(-2px) rotate(-3deg);
  }

  100% {
    transform: translateX(0) rotate(0);
  }

}

.nova-cart-glow {
  animation:
    novaCartGlow 1s ease;
}

@keyframes novaCartGlow {

  0% {
    filter:
      drop-shadow(0 0 0 rgba(70,150,255,0));
  }

  35% {
    filter:
      drop-shadow(0 0 18px rgba(70,150,255,.95));
  }

  100% {
    filter:
      drop-shadow(0 0 0 rgba(70,150,255,0));
  }

}


/* =========================
   CART COUNT
========================= */

#cartCount {
  transition:
    transform .25s ease,
    filter .25s ease;
}

.nova-count-pop {
  animation:
    novaCountPop .5s cubic-bezier(.2,.9,.2,1);
}

@keyframes novaCountPop {

  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.65);
    filter:
      drop-shadow(0 0 10px rgba(80,150,255,.9));
  }

  70% {
    transform: scale(.85);
  }

  100% {
    transform: scale(1);
  }

}


/* =========================
   FLYING PRODUCT
========================= */

.nova-flying-product {
  position: fixed;
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 16px;
  z-index: 999999;
  pointer-events: none;

  box-shadow:
    0 10px 40px rgba(0,0,0,.5),
    0 0 35px rgba(60,140,255,.65);

  border:
    1px solid rgba(255,255,255,.22);

  background:
    rgba(10,17,30,.92);

  will-change:
    transform,
    opacity;
}


/* =========================
   PARTICLES
========================= */

.nova-particle {
  position: fixed;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000000;

  background:
    radial-gradient(
      circle,
      #fff,
      #4da3ff 45%,
      transparent 75%
    );

  box-shadow:
    0 0 14px rgba(70,150,255,.95);
}

.nova-ring {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 999998;

  border:
    2px solid rgba(80,160,255,.8);

  transform:
    translate(-50%,-50%)
    scale(.2);

  animation:
    novaRing .65s ease-out forwards;
}

@keyframes novaRing {

  0% {
    opacity: 1;
    transform:
      translate(-50%,-50%)
      scale(.2);
  }

  100% {
    opacity: 0;
    transform:
      translate(-50%,-50%)
      scale(5);
  }

}


/* =========================
   TOAST
========================= */

#toast {
  transform:
    translateY(25px)
    scale(.92);

  opacity: 0;

  transition:
    opacity .3s ease,
    transform .4s cubic-bezier(.2,.9,.2,1);
}

#toast.show {
  opacity: 1;

  transform:
    translateY(0)
    scale(1);

  box-shadow:
    0 15px 50px rgba(0,0,0,.4),
    0 0 35px rgba(50,130,255,.15);
}


/* =========================
   MODALS
========================= */

.modal {
  transition:
    opacity .25s ease;
}

.modal.open {
  animation:
    novaModalBackground .3s ease;
}

.modal.open > * {
  animation:
    novaModalOpen .5s
    cubic-bezier(.16,1,.3,1);
}

@keyframes novaModalBackground {

  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }

}

@keyframes novaModalOpen {

  0% {
    opacity: 0;
    transform:
      translateY(35px)
      scale(.88)
      rotateX(8deg);
  }

  60% {
    opacity: 1;
    transform:
      translateY(-5px)
      scale(1.015)
      rotateX(0);
  }

  100% {
    opacity: 1;
    transform:
      translateY(0)
      scale(1)
      rotateX(0);
  }

}


/* =========================
   CART ITEMS
========================= */

.cart-item {
  animation:
    novaCartItemIn .5s
    cubic-bezier(.2,.9,.2,1)
    both;

  transition:
    transform .25s ease,
    background .25s ease;
}

.cart-item:hover {
  transform:
    translateX(5px);

  background:
    rgba(50,100,180,.08);
}

@keyframes novaCartItemIn {

  0% {
    opacity: 0;
    transform:
      translateX(-30px)
      scale(.94);
  }

  100% {
    opacity: 1;
    transform:
      translateX(0)
      scale(1);
  }

}


/* =========================
   CART TOTAL
========================= */

.cart-total {
  animation:
    novaTotalIn .55s
    cubic-bezier(.2,.9,.2,1);
}

@keyframes novaTotalIn {

  0% {
    opacity: 0;
    transform:
      translateY(15px)
      scale(.96);
  }

  100% {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }

}


/* =========================
   RIPPLE
========================= */

.nova-ripple {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;

  width: 10px;
  height: 10px;

  background:
    rgba(255,255,255,.5);

  transform:
    translate(-50%,-50%)
    scale(0);

  animation:
    novaRipple .65s ease-out;
}

@keyframes novaRipple {

  to {
    transform:
      translate(-50%,-50%)
      scale(16);

    opacity: 0;
  }

}


/* =========================
   SCREEN FLASH
========================= */

.nova-screen-flash {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999997;

  background:
    radial-gradient(
      circle at center,
      rgba(70,150,255,.12),
      transparent 45%
    );

  animation:
    novaFlash .45s ease-out forwards;
}

@keyframes novaFlash {

  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }

}


/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }

}

`;

document.head.appendChild(
  novaAnimationStyle
);


/* =========================================================
   PRODUITS
========================================================= */

const products = [

  {
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id: "p2",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },

  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
  },

  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },

  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },

  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },

  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },

  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },

  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp"
  },

  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },

  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },

  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },

  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },

  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },

  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },

  {
    id: "p16",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },

  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg"
  },

  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  },

  {
    id: "p19",
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms HDMI 2.0/DP1.4",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id: "p20",
    name: "iiyama 23.8 G-Master GB2471HS-B1 Red Eagle",
    category: "Écrans",
    price: 65.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
    category: "Chaises gaming",
    price: 129.99,
    image: "https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },

  {
    id: "p22",
    name: "Dowinx Série Luxe Suède LS-66D68E Blanc",
    category: "Chaises gaming",
    price: 79.99,
    image: "https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },

  {
    id: "p23",
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category: "Chaises gaming",
    price: 109.99,
    image: "https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },

  {
    id: "p24",
    name: "Desk Lite - Height-Adjustable Desk",
    category: "Bureaux gaming",
    price: 110.99,
    image: "https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },

  {
    id: "p25",
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile, assis-debout électrique",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible support écran, étagère maille réglable, noir",
    category: "Bureaux gaming",
    price: 44.99,
    image: "https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },

  {
    id: "p27",
    name: "Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category: "Casques",
    price: 99.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },

  {
    id: "p28",
    name: "Razer BlackShark V2 Pro 2023 Noir",
    category: "Casques",
    price: 75.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },

  {
    id: "p29",
    name: "beyerdynamic DT-990 Pro 250 Ohm",
    category: "Casques",
    price: 60.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },

  {
    id: "p30",
    name: "Logitech PRO X TKL Rapid Noir, filaire AZERTY, sans pavé numérique",
    category: "Claviers",
    price: 78.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap, Full RGB",
    category: "Claviers",
    price: 56.99,
    image: "https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI, black forged",
    category: "Souris",
    price: 26.99,
    image: "https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },

  {
    id: "p34",
    name: "HyperX QuadCast 2 – Microphone USB – RGB",
    category: "Microphones",
    price: 98.99,
    image: "https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },

  {
    id: "p35",
    name: "Shure SM7 dB",
    category: "Microphones",
    price: 121.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },

  {
    id: "p36",
    name: "Razer Seiren V3 Chroma Noir",
    category: "Microphones",
    price: 13.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },

  {
    id: "p37",
    name: "Stairville LED Pixel Rail 40 RGB MKII",
    category: "Éclairage LED/RGB",
    price: 18.90,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },

  {
    id: "p38",
    name: "Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category: "Éclairage LED/RGB",
    price: null,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },

  {
    id: "p39",
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu 550W 6500K 230V",
    category: "Éclairage LED/RGB",
    price: 91.10,
    image: "https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },

  {
    id: "p40",
    name: "Logitech Brio 4K",
    category: "Webcams",
    price: 32,
    image: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/webcams/brio/gallery/brio-gallery-1.png?v=1"
  },

  {
    id: "p41",
    name: "Elgato Facecam MK.2",
    category: "Webcams",
    price: 52.90,
    image: "https://media.ldlc.com/r705/ld/products/00/06/12/29/LD0006122943.jpg"
  },

  {
    id: "p42",
    name: "Insta360 Link 2 C",
    category: "Webcams",
    price: 42.90,
    image: "https://www.digit-photo.com/images/produits/INSTA360LINK2C01/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
  },

  {
    id: "p43",
    name: "Grand tapis de souris étendu pour bureau S Vague",
    category: "Tapis de souris XXL",
    price: 12,
    image: "https://cdn.prix.net/offer/fr/grand-tapis-de-souris-etendu-pour-bureau-s-vague-200t180b0277c89d6ef2a802d718c53317fc3a21ead284b.jpg"
  },

  {
    id: "p44",
    name: "Logitech G840 Extra Large 900×400×3 mm",
    category: "Tapis de souris XXL",
    price: 37.04,
    image: "https://cdn.prix.net/offer/fr/tapis-de-souris-gaming-logitech-g840-extra-large-antiderapant-noir-noir-g-200t180671f02d4b2667cf608682e5d8b0ccc2ed0183165.jpg"
  },

  {
    id: "p45",
    name: "The G-Lab SAKURA XXL 900×400 mm",
    category: "Tapis de souris XXL",
    price: 14.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/T/TG3/tapis-de-souris-gaming-xxl-900-x-400-mm-bords-cousus-modele-sakura-ref_TG3905_2.jpg"
  },

  {
    id: "p46",
    name: "Microsoft Xbox One Wireless Controller v3",
    category: "Manettes",
    price: 40,
    image: "https://media.ldlc.com/r705/ld/products/00/06/02/75/LD0006027592.jpg"
  },

  {
    id: "p47",
    name: "Manette Xbox REVOLUTION X Unlimited",
    category: "Manettes",
    price: 112.90,
    image: "https://media.nacongaming.com/media/catalog/product/x/b/xbxrevolutionxu_01_1.webp?width=1082&height=926&store=nacon_fr&image-type=image"
  },

  {
    id: "p48",
    name: "RAZER Leviathan V2 X",
    category: "Enceintes gaming",
    price: 31.90,
    image: "https://boulanger.scene7.com/is/image/Boulanger/8886419379645_h_f_l_0?wid=677&hei=677&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha"
  },

  {
    id: "p49",
    name: "SOULION C30 Enceintes PC Bluetooth Gamer",
    category: "Enceintes gaming",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/712j-q7+jQL._AC_SL1500_.jpg"
  }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentUser = null;
let authMode = "login";
let selectedCategory = "Tous";
let searchValue = "";

let cart =
  JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

let reviewsCache = {};


/* =========================================================
   UTILITAIRES
========================================================= */

function randomInt(min, max) {

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;

}


function randomItem(array) {

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

}


function money(value) {

  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {

    return "Prix non renseigné";

  }

  return Number(value).toLocaleString(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR"
    }
  );

}


function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function stars(value) {

  const rounded =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(
          Number(value) || 0
        )
      )
    );

  return (
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded)
  );

}


function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    window.__novaToastTimer
  );

  window.__novaToastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );

}


function openModal(id) {

  document
    .getElementById(id)
    ?.classList.add("open");

}


function closeModal(id) {

  document
    .getElementById(id)
    ?.classList.remove("open");

}


/* =========================================================
   IMAGE
========================================================= */

function handleImageError(img) {

  if (!img) return;

  if (
    img.dataset.fallbackUsed === "1"
  ) {

    img.src =
      FALLBACK_IMAGE;

    return;

  }

  img.dataset.fallbackUsed = "1";

  img.src =
    FALLBACK_IMAGE;

}


/* =========================================================
   EFFET ROND
========================================================= */

function createRing(x, y) {

  const ring =
    document.createElement("div");

  ring.className =
    "nova-ring";

  ring.style.left =
    `${x}px`;

  ring.style.top =
    `${y}px`;

  document.body.appendChild(
    ring
  );

  setTimeout(
    () => ring.remove(),
    700
  );

}


/* =========================================================
   PARTICULES
========================================================= */

function createParticles(
  x,
  y,
  amount = 14
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const particle =
      document.createElement(
        "div"
      );

    particle.className =
      "nova-particle";

    particle.style.left =
      `${x}px`;

    particle.style.top =
      `${y}px`;

    document.body.appendChild(
      particle
    );


    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      randomInt(
        45,
        120
      );

    const dx =
      Math.cos(angle) *
      distance;

    const dy =
      Math.sin(angle) *
      distance;


    particle.animate(
      [
        {
          transform:
            "translate(-50%,-50%) scale(1)",
          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${dx}px),
              calc(-50% + ${dy}px)
            ) scale(.2)`,
          opacity: 0
        }
      ],
      {
        duration:
          randomInt(
            450,
            800
          ),
        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }
    );


    setTimeout(
      () =>
        particle.remove(),
      850
    );

  }

}


/* =========================================================
   PRODUIT QUI VOLE VERS PANIER
========================================================= */

function flyProductToCart(
  product,
  sourceElement
) {

  if (!sourceElement) return;


  const img =
    sourceElement
      .closest(".product-card")
      ?.querySelector(
        ".product-image"
      );


  if (!img) return;


  const cartButton =
    document.getElementById(
      "cartBtn"
    ) ||
    document.getElementById(
      "bottomCartBtn"
    );


  if (!cartButton) return;


  const start =
    img.getBoundingClientRect();


  const end =
    cartButton.getBoundingClientRect();


  const clone =
    document.createElement(
      "img"
    );


  clone.className =
    "nova-flying-product";


  clone.src =
    product.image ||
    FALLBACK_IMAGE;


  clone.style.left =
    `${start.left + start.width / 2 - 35}px`;

  clone.style.top =
    `${start.top + start.height / 2 - 35}px`;


  document.body.appendChild(
    clone
  );


  const targetX =
    end.left +
    end.width / 2 -
    (
      start.left +
      start.width / 2
    );


  const targetY =
    end.top +
    end.height / 2 -
    (
      start.top +
      start.height / 2
    );


  const rotation =
    randomInt(
      180,
      540
    );


  const animation =
    clone.animate(
      [
        {
          transform:
            "translate(0,0) scale(1) rotate(0deg)",
          opacity: 1
        },

        {
          transform:
            `translate(
              ${targetX * .35}px,
              ${targetY * .15 - 100}px
            )
            scale(1.18)
            rotate(${rotation / 2}deg)`,
          opacity: 1
        },

        {
          transform:
            `translate(
              ${targetX}px,
              ${targetY}px
            )
            scale(.18)
            rotate(${rotation}deg)`,
          opacity: .15
        }
      ],
      {
        duration: 750,
        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }
    );


  animation.finished
    .then(
      () => {

        clone.remove();

        createParticles(
          end.left +
          end.width / 2,
          end.top +
          end.height / 2,
          12
        );

        createRing(
          end.left +
          end.width / 2,
          end.top +
          end.height / 2
        );

      }
    )
    .catch(
      () => clone.remove()
    );

}


/* =========================================================
   REVIEWS
========================================================= */

const firstNames = [
  "Lucas",
  "Hugo",
  "Nathan",
  "Tom",
  "Enzo",
  "Louis",
  "Arthur",
  "Alex",
  "Léo",
  "Maxime",
  "Théo",
  "Mathis",
  "Ethan",
  "Noah",
  "Gabriel",
  "Jules",
  "Adam",
  "Sacha",
  "Liam",
  "Raphaël"
];


const lastNames = [
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux"
];


const reviewTexts = {

  5: [
    "Excellent produit, fonctionne parfaitement.",
    "Très bonne qualité et livraison rapide.",
    "Je suis très satisfait du produit.",
    "Produit conforme à la description.",
    "Très bon achat.",
    "Rien à redire, tout fonctionne parfaitement."
  ],

  4: [
    "Très bon produit dans l'ensemble.",
    "Bonne qualité, je recommande.",
    "Produit efficace et conforme.",
    "Très satisfait malgré quelques petits détails."
  ],

  3: [
    "Produit correct.",
    "Ça fonctionne mais peut être amélioré.",
    "Qualité correcte pour le prix."
  ],

  2: [
    "Quelques problèmes mais le produit fonctionne.",
    "Pas totalement convaincu.",
    "Qualité moyenne."
  ],

  1: [
    "Produit qui ne correspond pas totalement à mes attentes.",
    "Quelques problèmes rencontrés."
  ]

};


function getSavedReviewCounts() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "novaReviewCounts"
      ) || "{}"
    );

  }
  catch {

    return {};

  }

}


function saveReviewCounts(
  counts
) {

  localStorage.setItem(
    "novaReviewCounts",
    JSON.stringify(
      counts
    )
  );

}


function getReviewCount(
  product
) {

  const counts =
    getSavedReviewCounts();


  if (
    typeof counts[
      product.id
    ] !== "number"
  ) {

    counts[
      product.id
    ] =
      randomInt(
        134,
        1781
      );

    saveReviewCounts(
      counts
    );

  }


  return counts[
    product.id
  ];

}


function generateReviews(
  product
) {

  const reviews = [];

  const reviewCount =
    getReviewCount(
      product
    );


  for (
    let i = 0;
    i < reviewCount;
    i++
  ) {

    const roll =
      Math.random();

    let rating;


    if (roll < .72)
      rating = 5;

    else if (roll < .90)
      rating = 4;

    else if (roll < .97)
      rating = 3;

    else if (roll < .99)
      rating = 2;

    else
      rating = 1;


    const first =
      randomItem(
        firstNames
      );

    const last =
      randomItem(
        lastNames
      );


    const daysAgo =
      randomInt(
        0,
        720
      );


    reviews.push({

      id:
        `${product.id}-review-${i + 1}`,

      name:
        `${first} ${last.charAt(0)}.`,

      rating,

      text:
        randomItem(
          reviewTexts[rating]
        ),

      date:
        new Date(
          Date.now() -
          daysAgo *
          86400000
        )

    });

  }


  return reviews;

}


function getReviews(
  product
) {

  if (
    !reviewsCache[
      product.id
    ]
  ) {

    reviewsCache[
      product.id
    ] =
      generateReviews(
        product
      );

  }

  return reviewsCache[
    product.id
  ];

}


function getReviewStats(
  product
) {

  const reviews =
    getReviews(
      product
    );


  const average =
    reviews.reduce(
      (
        sum,
        review
      ) =>
        sum +
        review.rating,
      0
    ) /
    reviews.length;


  return {

    count:
      reviews.length,

    average

  };

}


/* =========================================================
   CATÉGORIES
========================================================= */

function renderCategories() {

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product =>
          product.category
      )
    )
  ];


  const container =
    document.getElementById(
      "categories"
    );


  if (!container) return;


  container.innerHTML =
    categories
      .map(
        category => `

          <button
            class="category-btn ${
              category ===
              selectedCategory
                ? "active"
                : ""
            }"
            data-category="${escapeHtml(
              category
            )}"
          >

            ${escapeHtml(
              category
            )}

          </button>

        `
      )
      .join("");


  container
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            selectedCategory =
              button.dataset.category;

            renderCategories();

            renderProducts();

          }
        );

      }
    );

}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts() {

  const container =
    document.getElementById(
      "products"
    );


  if (!container) return;


  const filtered =
    products.filter(
      product => {

        const categoryOK =
          selectedCategory ===
          "Tous" ||
          product.category ===
          selectedCategory;


        const searchOK =
          product.name
            .toLowerCase()
            .includes(
              searchValue
                .toLowerCase()
            );


        return (
          categoryOK &&
          searchOK
        );

      }
    );


  if (!filtered.length) {

    container.innerHTML = `

      <div class="empty">

        Aucun produit trouvé.

      </div>

    `;

    return;

  }


  container.innerHTML =
    filtered
      .map(
        product => {

          const stats =
            getReviewStats(
              product
            );


          return `

            <article
              class="product-card"
            >

              <div
                class="product-image-wrap"
              >

                <img
                  class="product-image"
                  src="${escapeHtml(
                    product.image
                  )}"
                  alt="${escapeHtml(
                    product.name
                  )}"
                  loading="eager"
                  referrerpolicy="no-referrer"
                  data-product-image="${product.id}"
                >

              </div>


              <div
                class="product-info"
              >

                <div
                  class="product-category"
                >

                  ${escapeHtml(
                    product.category
                  )}

                </div>


                <div
                  class="product-name"
                >

                  ${escapeHtml(
                    product.name
                  )}

                </div>


                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:7px;
                    flex-wrap:wrap;
                    margin-top:10px;
                  "
                >

                  <span
                    class="stars"
                  >
                    ${stars(
                      stats.average
                    )}
                  </span>


                  <strong>
                    ${stats.average.toFixed(
                      1
                    )}/5
                  </strong>


                  <span
                    style="
                      color:#9ba8bd;
                      font-size:12px
                    "
                  >

                    (
                    ${stats.count.toLocaleString(
                      "fr-FR"
                    )}
                    avis
                    )

                  </span>

                </div>


                <div
                  style="
                    color:#71809a;
                    font-size:11px;
                    margin-top:3px;
                  "
                >

                  ${stats.count.toLocaleString(
                    "fr-FR"
                  )}
                  avis

                </div>


                <div
                  class="price"
                >

                  ${money(
                    product.price
                  )}

                </div>


                <div
                  class="product-buttons"
                >

                  <button
                    class="btn"
                    data-view-reviews="${product.id}"
                  >

                    💬 Voir les avis

                  </button>


                  <button
                    class="btn primary"
                    data-add-cart="${product.id}"
                    ${
                      product.price === null
                        ? "disabled"
                        : ""
                    }
                  >

                    🛒

                  </button>

                </div>

              </div>

            </article>

          `;

        }
      )
      .join("");


  container
    .querySelectorAll(
      "[data-product-image]"
    )
    .forEach(
      img => {

        img.addEventListener(
          "error",
          () => {

            handleImageError(
              img
            );

          }
        );

      }
    );


  container
    .querySelectorAll(
      "[data-view-reviews]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            showReviews(
              button.dataset
                .viewReviews
            );

          }
        );

      }
    );


  container
    .querySelectorAll(
      "[data-add-cart]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            addToCart(
              button.dataset
                .addCart,
              button,
              event
            );

          }
        );

      }
    );

}


/* =========================================================
   AJOUT PANIER AVEC GROSSE ANIMATION
========================================================= */

function addToCart(
  productId,
  button,
  event
) {

  const product =
    products.find(
      p =>
        p.id ===
        productId
    );


  if (!product) return;


  if (
    product.price === null ||
    product.price === undefined
  ) {

    showToast(
      "Prix non renseigné pour ce produit."
    );

    return;

  }


  const existing =
    cart.find(
      item =>
        item.productId ===
        productId
    );


  if (existing) {

    existing.quantity++;

  }
  else {

    cart.push({

      productId,

      quantity: 1

    });

  }


  saveCart();


  /* =========================
     BOUTON
  ========================= */

  if (button) {

    button.classList.remove(
      "clicked"
    );

    void button.offsetWidth;

    button.classList.add(
      "clicked"
    );

  }


  /* =========================
     CARTE
  ========================= */

  const card =
    button?.closest(
      ".product-card"
    );


  if (card) {

    card.classList.remove(
      "nova-added"
    );

    void card.offsetWidth;

    card.classList.add(
      "nova-added"
    );

  }


  /* =========================
     POSITION PARTICULES
  ========================= */

  const rect =
    button?.getBoundingClientRect();


  if (rect) {

    const x =
      rect.left +
      rect.width / 2;

    const y =
      rect.top +
      rect.height / 2;


    createParticles(
      x,
      y,
      18
    );

    createRing(
      x,
      y
    );

  }


  /* =========================
     PRODUIT VERS PANIER
  ========================= */

  flyProductToCart(
    product,
    button
  );


  /* =========================
     FLASH
  ========================= */

  const flash =
    document.createElement(
      "div"
    );

  flash.className =
    "nova-screen-flash";

  document.body.appendChild(
    flash
  );

  setTimeout(
    () =>
      flash.remove(),
    500
  );


  /* =========================
     PANIER
  ========================= */

  setTimeout(
    () => {

      const cartButtons = [
        document.getElementById(
          "cartBtn"
        ),
        document.getElementById(
          "bottomCartBtn"
        )
      ].filter(Boolean);


      cartButtons.forEach(
        cartButton => {

          cartButton.classList.remove(
            "nova-cart-shake",
            "nova-cart-glow"
          );

          void cartButton.offsetWidth;

          cartButton.classList.add(
            "nova-cart-shake",
            "nova-cart-glow"
          );

        }
      );


      updateCartCount();

    },
    420
  );


  showToast(
    `🛒 ${product.name} ajouté au panier !`
  );

}


/* =========================================================
   REVIEWS MODAL
========================================================= */

function showReviews(
  productId
) {

  const product =
    products.find(
      p =>
        p.id ===
        productId
    );


  if (!product) return;


  const reviews =
    getReviews(
      product
    );


  const stats =
    getReviewStats(
      product
    );


  const title =
    document.getElementById(
      "reviewsTitle"
    );


  const content =
    document.getElementById(
      "reviewsContent"
    );


  if (!title || !content)
    return;


  title.textContent =
    `💬 Avis • ${product.name}`;


  content.innerHTML = `

    <div
      style="
        background:#101925;
        border:1px solid #25364b;
        padding:15px;
        border-radius:12px;
        margin-bottom:15px;
      "
    >

      <div
        style="
          font-size:26px;
          font-weight:900
        "
      >

        ${stats.average.toFixed(
          1
        )}/5

      </div>


      <div
        class="stars"
        style="font-size:22px"
      >

        ${stars(
          stats.average
        )}

      </div>


      <div
        style="
          color:#8b9ab0;
          margin-top:5px
        "
      >

        ${stats.count.toLocaleString(
          "fr-FR"
        )}
        avis

      </div>

    </div>


    ${reviews
      .slice(0, 80)
      .map(
        review => `

          <div
            class="review"
          >

            <div
              class="review-top"
            >

              <strong>
                ${escapeHtml(
                  review.name
                )}
              </strong>


              <span
                class="stars"
              >

                ${"★".repeat(
                  review.rating
                )}

              </span>

            </div>


            <div
              class="review-date"
            >

              ${review.date.toLocaleDateString(
                "fr-FR"
              )}

            </div>


            <div
              class="review-text"
            >

              ${escapeHtml(
                review.text
              )}

            </div>

          </div>

        `
      )
      .join("")}


    <div
      style="
        color:#71809a;
        text-align:center;
        padding:15px;
      "
    >

      ${Math.max(
        0,
        reviews.length - 80
      ).toLocaleString(
        "fr-FR"
      )}

      autres avis

    </div>

  `;


  openModal(
    "reviewsModal"
  );

}


/* =========================================================
   PANIER
========================================================= */

function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(
      cart
    )
  );

}


function removeFromCart(
  productId
) {

  const element =
    document.querySelector(
      `[data-cart-item="${productId}"]`
    );


  if (element) {

    element.animate(
      [
        {
          opacity: 1,
          transform:
            "translateX(0) scale(1)"
        },

        {
          opacity: 0,
          transform:
            "translateX(80px) scale(.8)"
        }
      ],
      {
        duration: 280,
        easing:
          "ease-in"
      }
    );

  }


  setTimeout(
    () => {

      cart =
        cart.filter(
          item =>
            item.productId !==
            productId
        );


      saveCart();

      updateCartCount();

      renderCart();

    },
    element ? 250 : 0
  );

}


function changeQuantity(
  productId,
  amount
) {

  const item =
    cart.find(
      item =>
        item.productId ===
        productId
    );


  if (!item) return;


  item.quantity +=
    amount;


  if (
    item.quantity <= 0
  ) {

    removeFromCart(
      productId
    );

    return;

  }


  saveCart();

  updateCartCount();

  renderCart();

}


function updateCartCount() {

  const elements = [
    document.getElementById(
      "cartCount"
    ),
    document.getElementById(
      "bottomCartCount"
    )
  ].filter(Boolean);


  const count =
    cart.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.quantity,
      0
    );


  elements.forEach(
    element => {

      element.textContent =
        count;

      element.classList.remove(
        "nova-count-pop"
      );

      void element.offsetWidth;

      element.classList.add(
        "nova-count-pop"
      );

    }
  );

}


function getCartTotal() {

  return cart.reduce(
    (
      sum,
      item
    ) => {

      const product =
        products.find(
          p =>
            p.id ===
            item.productId
        );


      return (
        sum +
        (
          Number(
            product?.price
          ) || 0
        ) *
        item.quantity
      );

    },
    0
  );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const container =
    document.getElementById(
      "cartContent"
    );


  if (!container) return;


  if (!cart.length) {

    container.innerHTML = `

      <div
        class="empty"
        style="
          animation:novaCartItemIn .45s ease;
        "
      >

        🛒

        <div
          style="
            font-size:20px;
            font-weight:800;
            margin-top:10px;
          "
        >

          Ton panier est vide

        </div>

        <div
          style="
            color:#71809a;
            margin-top:5px;
          "
        >

          Ajoute des produits pour commencer.

        </div>

      </div>

    `;

    return;

  }


  container.innerHTML = `

    ${cart
      .map(
        (item, index) => {

          const product =
            products.find(
              p =>
                p.id ===
                item.productId
            );


          if (!product)
            return "";


          return `

            <div
              class="cart-item"
              data-cart-item="${product.id}"
              style="
                animation-delay:${index * 70}ms;
              "
            >

              <img
                src="${escapeHtml(
                  product.image
                )}"
                alt="${escapeHtml(
                  product.name
                )}"
                referrerpolicy="no-referrer"
                data-cart-image="${product.id}"
              >


              <div
                class="cart-item-info"
              >

                <strong>

                  ${escapeHtml(
                    product.name
                  )}

                </strong>


                <div
                  style="
                    margin-top:5px;
                    color:#8d9bb0
                  "
                >

                  ${money(
                    product.price
                  )}

                </div>

              </div>


              <button
                class="btn"
                data-minus="${product.id}"
              >
                −
              </button>


              <strong
                class="cart-quantity"
              >
                ${item.quantity}
              </strong>


              <button
                class="btn"
                data-plus="${product.id}"
              >
                +
              </button>


              <button
                class="btn danger"
                data-remove="${product.id}"
              >
                ×
              </button>

            </div>

          `;

        }
      )
      .join("")}


    <div
      class="cart-total"
    >

      <span>
        Total
      </span>

      <strong>
        ${money(
          getCartTotal()
        )}
      </strong>

    </div>


    <button
      class="btn primary"
      id="checkoutBtn"
      style="
        width:100%;
        margin-top:15px;
        min-height:50px;
        font-size:15px;
        font-weight:900;
      "
    >

      💳 Passer la commande

    </button>

  `;


  container
    .querySelectorAll(
      "[data-cart-image]"
    )
    .forEach(
      img => {

        img.addEventListener(
          "error",
          () => {

            handleImageError(
              img
            );

          }
        );

      }
    );


  container
    .querySelectorAll(
      "[data-minus]"
    )
    .forEach(
      button => {

        button.onclick =
          () => {

            changeQuantity(
              button.dataset.minus,
              -1
            );

          };

      }
    );


  container
    .querySelectorAll(
      "[data-plus]"
    )
    .forEach(
      button => {

        button.onclick =
          () => {

            changeQuantity(
              button.dataset.plus,
              1
            );

          };

      }
    );


  container
    .querySelectorAll(
      "[data-remove]"
    )
    .forEach(
      button => {

        button.onclick =
          () => {

            removeFromCart(
              button.dataset.remove
            );

          };

      }
    );


  document
    .getElementById(
      "checkoutBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        if (!currentUser) {

          closeModal(
            "cartModal"
          );

          openModal(
            "authModal"
          );

          showToast(
            "Connecte-toi pour commander."
          );

          return;

        }


        closeModal(
          "cartModal"
        );

        openModal(
          "checkoutModal"
        );

      }
    );

}


/* =========================================================
   COMPTE
========================================================= */

function updateAuthUI() {

  const adminButton =
    document.getElementById(
      "adminBtn"
    );


  if (adminButton) {

    adminButton.style.display =
      currentUser?.email ===
      ADMIN_EMAIL
        ? "block"
        : "none";

  }


  renderAccount();

}


function renderAccount() {

  const container =
    document.getElementById(
      "accountContent"
    );


  if (!container) return;


  if (!currentUser) {

    container.innerHTML = `

      <div
        style="
          color:#8291a7;
          margin-bottom:15px
        "
      >

        Tu n'es pas connecté.

      </div>


      <button
        class="btn primary"
        id="accountLoginBtn"
      >

        Se connecter

      </button>

    `;


    document
      .getElementById(
        "accountLoginBtn"
      )
      ?.addEventListener(
        "click",
        () => {

          closeModal(
            "accountModal"
          );

          openModal(
            "authModal"
          );

        }
      );


    return;

  }


  container.innerHTML = `

    <div
      style="
        background:#101925;
        border:1px solid #25364b;
        border-radius:12px;
        padding:15px;
      "
    >

      <div
        style="
          color:#8190a7;
          font-size:12px
        "
      >
        EMAIL
      </div>


      <strong>

        ${escapeHtml(
          currentUser.email
        )}

      </strong>

    </div>


    <button
      class="btn danger"
      id="logoutBtn"
      style="
        width:100%;
        margin-top:15px
      "
    >

      Se déconnecter

    </button>

  `;


  document
    .getElementById(
      "logoutBtn"
    )
    ?.addEventListener(
      "click",
      async () => {

        try {

          await signOut(
            auth
          );

          closeModal(
            "accountModal"
          );

          showToast(
            "Déconnexion effectuée."
          );

        }
        catch (error) {

          console.error(
            error
          );

          showToast(
            "Erreur de déconnexion."
          );

        }

      }
    );

}


/* =========================================================
   AUTH TABS
========================================================= */

document
  .getElementById(
    "loginTab"
  )
  ?.addEventListener(
    "click",
    () => {

      authMode =
        "login";


      document
        .getElementById(
          "loginTab"
        )
        ?.classList.add(
          "active"
        );


      document
        .getElementById(
          "registerTab"
        )
        ?.classList.remove(
          "active"
        );


      const submit =
        document.getElementById(
          "authSubmit"
        );


      if (submit) {

        submit.textContent =
          "Se connecter";

      }

    }
  );


document
  .getElementById(
    "registerTab"
  )
  ?.addEventListener(
    "click",
    () => {

      authMode =
        "register";


      document
        .getElementById(
          "registerTab"
        )
        ?.classList.add(
          "active"
        );


      document
        .getElementById(
          "loginTab"
        )
        ?.classList.remove(
          "active"
        );


      const submit =
        document.getElementById(
          "authSubmit"
        );


      if (submit) {

        submit.textContent =
          "Créer le compte";

      }

    }
  );


/* =========================================================
   AUTH
========================================================= */

document
  .getElementById(
    "authForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const email =
        document
          .getElementById(
            "authEmail"
          )
          ?.value
          .trim();


      const password =
        document
          .getElementById(
            "authPassword"
          )
          ?.value;


      const info =
        document.getElementById(
          "authInfo"
        );


      if (
        !email ||
        !password
      ) {

        if (info) {

          info.textContent =
            "Remplis tous les champs.";

        }

        return;

      }


      try {

        if (
          authMode ===
          "register"
        ) {

          if (
            password.length <
            6
          ) {

            throw new Error(
              "Le mot de passe doit avoir au moins 6 caractères."
            );

          }


          if (
            password.length >
            30
          ) {

            throw new Error(
              "Le mot de passe doit avoir maximum 30 caractères."
            );

          }


          if (
            !/[a-z]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins une minuscule."
            );

          }


          if (
            !/[A-Z]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins une majuscule."
            );

          }


          if (
            !/[0-9]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins un chiffre."
            );

          }


          const credential =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );


          await setDoc(
            doc(
              db,
              "users",
              credential.user.uid
            ),
            {
              email,
              createdAt:
                serverTimestamp()
            }
          );


          showToast(
            "Compte créé avec succès."
          );

        }
        else {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );


          showToast(
            "Connexion réussie."
          );

        }


        closeModal(
          "authModal"
        );

      }
      catch (error) {

        console.error(
          error
        );


        if (info) {

          info.textContent =
            error.message;

        }

      }

    }
  );


/* =========================================================
   CHECKOUT
========================================================= */

document
  .getElementById(
    "checkoutForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!currentUser) {

        showToast(
          "Connecte-toi."
        );

        return;

      }


      if (!cart.length) {

        showToast(
          "Ton panier est vide."
        );

        return;

      }


      const name =
        document
          .getElementById(
            "checkoutName"
          )
          ?.value
          .trim();


      const address =
        document
          .getElementById(
            "checkoutAddress"
          )
          ?.value
          .trim();


      const city =
        document
          .getElementById(
            "checkoutCity"
          )
          ?.value
          .trim();


      const postal =
        document
          .getElementById(
            "checkoutPostal"
          )
          ?.value
          .trim();


      if (
        !name ||
        name.length < 2 ||
        !address ||
        address.length < 5 ||
        !city ||
        city.length < 2 ||
        !/^\d{5}$/.test(
          postal
        )
      ) {

        showToast(
          "Adresse invalide."
        );

        return;

      }


      const orderItems =
        cart.map(
          item => {

            const product =
              products.find(
                p =>
                  p.id ===
                  item.productId
              );


            return {

              productId:
                item.productId,

              name:
                product?.name ||
                "",

              price:
                product?.price ||
                0,

              quantity:
                item.quantity,

              image:
                product?.image ||
                ""

            };

          }
        );


      try {

        await addDoc(
          collection(
            db,
            "orders"
          ),
          {

            userId:
              currentUser.uid,

            userEmail:
              currentUser.email,

            customerName:
              name,

            address,

            city,

            postalCode:
              postal,

            items:
              orderItems,

            total:
              getCartTotal(),

            status:
              "Préparation",

            currentLocation:
              "Entrepôt NovaShop",

            destination:
              `${address}, ${postal} ${city}`,

            deliveryDate:
              new Date(
                Date.now() +
                5 *
                86400000
              ),

            createdAt:
              serverTimestamp()

          }
        );


        cart = [];

        saveCart();

        updateCartCount();


        closeModal(
          "checkoutModal"
        );


        showToast(
          "Commande créée avec succès 📦"
        );

      }
      catch (error) {

        console.error(
          error
        );


        showToast(
          "Erreur pendant la création de la commande."
        );

      }

    }
  );


/* =========================================================
   COMMANDES
========================================================= */

async function loadOrders() {

  const container =
    document.getElementById(
      "ordersContent"
    );


  if (!container) return;


  if (!currentUser) {

    container.innerHTML = `

      <div class="empty">

        Connecte-toi pour voir
        tes commandes.

      </div>

    `;

    return;

  }


  try {

    const q =
      query(
        collection(
          db,
          "orders"
        ),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );


    const snapshot =
      await getDocs(
        q
      );


    const docs =
      [...snapshot.docs];


    docs.sort(
      (a, b) => {

        const aTime =
          a.data()
            .createdAt
            ?.toMillis?.() ||
          0;


        const bTime =
          b.data()
            .createdAt
            ?.toMillis?.() ||
          0;


        return (
          bTime -
          aTime
        );

      }
    );


    if (!docs.length) {

      container.innerHTML = `

        <div class="empty">

          Aucune commande.

        </div>

      `;

      return;

    }


    container.innerHTML =
      docs
        .map(
          orderDoc => {

            const order =
              orderDoc.data();


            let delivery =
              "Date inconnue";


            if (
              order.deliveryDate
                ?.toDate
            ) {

              delivery =
                order.deliveryDate
                  .toDate()
                  .toLocaleDateString(
                    "fr-FR"
                  );

            }


            return `

              <div
                class="order"
                style="
                  animation:novaCartItemIn .45s ease both;
                "
              >

                <strong>

                  📦 Commande
                  ${orderDoc.id.slice(
                    0,
                    8
                  )}

                </strong>


                <div
                  style="
                    margin-top:8px
                  "
                >

                  Total :

                  <strong>

                    ${money(
                      order.total ||
                      0
                    )}

                  </strong>

                </div>


                <div
                  class="order-status"
                >

                  ${escapeHtml(
                    order.status ||
                    "En préparation"
                  )}

                </div>


                <div
                  style="
                    margin-top:8px;
                    color:#93a1b5
                  "
                >

                  📍 Position :

                  ${escapeHtml(
                    order.currentLocation ||
                    ""
                  )}

                </div>


                <div
                  style="
                    margin-top:5px;
                    color:#93a1b5
                  "
                >

                  🎯 Destination :

                  ${escapeHtml(
                    order.destination ||
                    ""
                  )}

                </div>


                <div
                  style="
                    margin-top:5px;
                    color:#93a1b5
                  "
                >

                  🚚 Livraison prévue :

                  ${delivery}

                </div>

              </div>

            `;

          }
        )
        .join("");

  }
  catch (error) {

    console.error(
      error
    );


    container.innerHTML = `

      <div
        style="
          color:#ff7d7d
        "
      >

        Impossible de charger
        les commandes.

      </div>

    `;

  }

}


/* =========================================================
   ADMIN
========================================================= */

function openAdmin() {

  if (
    currentUser?.email !==
    ADMIN_EMAIL
  ) {

    showToast(
      "Le dashboard est réservé à l'administrateur."
    );

    return;

  }


  openModal(
    "adminCodeModal"
  );

}


document
  .getElementById(
    "adminCodeForm"
  )
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const code =
        document
          .getElementById(
            "adminCode"
          )
          ?.value;


      if (
        code !==
        ADMIN_CODE
      ) {

        showToast(
          "Code incorrect."
        );

        return;

      }


      closeModal(
        "adminCodeModal"
      );


      openModal(
        "adminModal"
      );

    }
  );


/* =========================================================
   BOUTONS
========================================================= */

document
  .getElementById(
    "accountBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "accountModal"
      );

      renderAccount();

    }
  );


document
  .getElementById(
    "bottomAccountBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "accountModal"
      );

      renderAccount();

    }
  );


document
  .getElementById(
    "ordersBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "ordersModal"
      );

      loadOrders();

    }
  );


function openCartWithAnimation() {

  const cartButtons = [
    document.getElementById(
      "cartBtn"
    ),
    document.getElementById(
      "bottomCartBtn"
    )
  ].filter(Boolean);


  cartButtons.forEach(
    button => {

      button.classList.remove(
        "nova-cart-shake"
      );

      void button.offsetWidth;

      button.classList.add(
        "nova-cart-shake"
      );

    }
  );


  renderCart();

  openModal(
    "cartModal"
  );

}


document
  .getElementById(
    "cartBtn"
  )
  ?.addEventListener(
    "click",
    openCartWithAnimation
  );


document
  .getElementById(
    "bottomCartBtn"
  )
  ?.addEventListener(
    "click",
    openCartWithAnimation
  );


document
  .getElementById(
    "adminBtn"
  )
  ?.addEventListener(
    "click",
    openAdmin
  );


/* =========================================================
   RECHERCHE
========================================================= */

document
  .getElementById(
    "searchInput"
  )
  ?.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value;

      renderProducts();

    }
  );


/* =========================================================
   FERMETURE MODALES
========================================================= */

document
  .querySelectorAll(
    "[data-close]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          closeModal(
            button.dataset.close
          );

        }
      );

    }
  );


document
  .querySelectorAll(
    ".modal"
  )
  .forEach(
    modal => {

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target ===
            modal
          ) {

            modal.classList.remove(
              "open"
            );

          }

        }
      );

    }
  );


/* =========================================================
   RIPPLE SUR BOUTONS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".btn"
      );


    if (!button)
      return;


    const rect =
      button.getBoundingClientRect();


    const ripple =
      document.createElement(
        "span"
      );


    ripple.className =
      "nova-ripple";


    ripple.style.left =
      `${event.clientX - rect.left}px`;

    ripple.style.top =
      `${event.clientY - rect.top}px`;


    if (
      getComputedStyle(
        button
      ).position ===
      "static"
    ) {

      button.style.position =
        "relative";

    }


    button.appendChild(
      ripple
    );


    setTimeout(
      () =>
        ripple.remove(),
      700
    );

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user;

    updateAuthUI();

  }
);


/* =========================================================
   INIT
========================================================= */

renderCategories();

renderProducts();

updateCartCount();

renderAccount();


/* =========================================================
   LOG
========================================================= */

console.log(
  "%c NovaShop Premium UI ✨ ",
  "font-weight:bold;font-size:18px;color:#4da3ff"
);

console.log(
  "Produits :",
  products.length
);

console.log(
  "Animations panier : ACTIVÉES"
);

console.log(
  "Produits illimités : ACTIVÉS"
);

console.log(
  "Questions : SUPPRIMÉ"
);
