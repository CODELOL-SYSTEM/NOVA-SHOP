<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>NovaShop</title>

<script>
(function(){
  const theme = localStorage.getItem("novaThemeChoice") || "dark";

  if(theme === "light"){
    document.documentElement.dataset.theme = "light";
  }else if(theme === "auto"){
    document.documentElement.dataset.theme =
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
  }else{
    document.documentElement.dataset.theme = "dark";
  }
})();
</script>

<style>

:root{
  --bg:#070b12;
  --bg2:#0b111c;
  --card:#0f1724;
  --card2:#121c2b;
  --border:rgba(255,255,255,.08);
  --text:#f7f9fc;
  --muted:#8e9bad;
  --blue:#3187ff;
  --blue2:#1769d6;
  --blue-soft:rgba(49,135,255,.12);
  --green:#27c985;
  --red:#ff5c68;
  --shadow:0 20px 60px rgba(0,0,0,.28);
}

html[data-theme="light"]{
  --bg:#f4f7fb;
  --bg2:#ffffff;
  --card:#ffffff;
  --card2:#f7f9fc;
  --border:rgba(15,23,42,.09);
  --text:#111827;
  --muted:#667085;
  --blue:#1769d6;
  --blue2:#0e55b3;
  --blue-soft:rgba(23,105,214,.09);
  --shadow:0 18px 50px rgba(15,23,42,.10);
}

*{
  box-sizing:border-box;
}

html{
  scroll-behavior:smooth;
}

body{
  margin:0;
  background:
    radial-gradient(circle at 50% -20%,rgba(49,135,255,.12),transparent 35%),
    var(--bg);
  color:var(--text);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  min-height:100vh;
}

body.drawer-open{
  overflow:hidden;
}

button,
input{
  font:inherit;
}

button{
  cursor:pointer;
}

button:focus-visible,
input:focus-visible{
  outline:2px solid var(--blue);
  outline-offset:2px;
}

/* =========================================================
   HEADER
========================================================= */

.site-header{
  position:sticky;
  top:0;
  z-index:1000;
  height:74px;
  border-bottom:1px solid var(--border);
  background:rgba(7,11,18,.82);
  backdrop-filter:blur(18px);
}

html[data-theme="light"] .site-header{
  background:rgba(255,255,255,.86);
}

.header-inner{
  width:min(1440px,calc(100% - 36px));
  height:100%;
  margin:auto;
  display:flex;
  align-items:center;
  gap:22px;
}

.logo{
  display:flex;
  align-items:center;
  gap:10px;
  color:var(--text);
  text-decoration:none;
  font-size:21px;
  font-weight:850;
  letter-spacing:-.7px;
  white-space:nowrap;
}

.logo-mark{
  width:35px;
  height:35px;
  border-radius:11px;
  display:grid;
  place-items:center;
  color:white;
  background:linear-gradient(145deg,#3c99ff,#1259c5);
  box-shadow:0 7px 24px rgba(49,135,255,.3);
  font-size:17px;
}

.header-search{
  flex:1;
  max-width:560px;
  position:relative;
}

.header-search input{
  width:100%;
  height:43px;
  border:1px solid var(--border);
  border-radius:12px;
  background:var(--card);
  color:var(--text);
  padding:0 16px 0 42px;
  transition:.2s ease;
}

.header-search input::placeholder{
  color:var(--muted);
}

.header-search input:focus{
  border-color:rgba(49,135,255,.55);
  box-shadow:0 0 0 4px rgba(49,135,255,.08);
}

.search-icon{
  position:absolute;
  left:15px;
  top:50%;
  transform:translateY(-50%);
  color:var(--muted);
  pointer-events:none;
}

.header-actions{
  margin-left:auto;
  display:flex;
  align-items:center;
  gap:7px;
}

.icon-btn{
  position:relative;
  width:41px;
  height:41px;
  border:1px solid transparent;
  border-radius:11px;
  color:var(--muted);
  background:transparent;
  display:grid;
  place-items:center;
  transition:.2s ease;
  font-size:17px;
}

.icon-btn:hover{
  color:var(--text);
  background:var(--blue-soft);
  border-color:var(--border);
  transform:translateY(-1px);
}

.icon-btn.logged-in{
  color:var(--blue);
}

.cart-badge{
  position:absolute;
  right:-3px;
  top:-3px;
  min-width:19px;
  height:19px;
  padding:0 5px;
  border-radius:99px;
  background:var(--blue);
  color:white;
  font-size:10px;
  font-weight:850;
  display:none;
  place-items:center;
  border:2px solid var(--bg);
}

.cart-badge.visible{
  display:grid;
}

/* =========================================================
   HERO
========================================================= */

.hero{
  width:min(1440px,calc(100% - 36px));
  margin:34px auto 0;
  min-height:360px;
  border:1px solid var(--border);
  border-radius:25px;
  overflow:hidden;
  position:relative;
  background:
    radial-gradient(circle at 80% 25%,rgba(49,135,255,.24),transparent 30%),
    radial-gradient(circle at 65% 100%,rgba(36,90,180,.13),transparent 35%),
    linear-gradient(120deg,var(--card),var(--bg2));
  box-shadow:var(--shadow);
}

.hero-content{
  position:relative;
  z-index:2;
  padding:64px;
  max-width:720px;
}

.hero-kicker{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:7px 11px;
  border-radius:99px;
  color:#80b9ff;
  background:rgba(49,135,255,.10);
  border:1px solid rgba(49,135,255,.18);
  font-size:12px;
  font-weight:800;
  margin-bottom:19px;
}

.hero h1{
  margin:0;
  font-size:clamp(40px,5vw,68px);
  line-height:.98;
  letter-spacing:-3.5px;
  max-width:700px;
}

.hero h1 span{
  color:var(--blue);
}

.hero p{
  color:var(--muted);
  line-height:1.65;
  max-width:590px;
  margin:22px 0 28px;
  font-size:16px;
}

.hero-buttons{
  display:flex;
  gap:11px;
  flex-wrap:wrap;
}

.primary-btn,
.secondary-btn{
  height:45px;
  border-radius:11px;
  padding:0 18px;
  font-weight:800;
  border:1px solid var(--border);
  transition:.2s ease;
}

.primary-btn{
  color:white;
  background:linear-gradient(135deg,#398fff,#1769d6);
  border-color:transparent;
  box-shadow:0 8px 25px rgba(49,135,255,.22);
}

.primary-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 12px 32px rgba(49,135,255,.3);
}

.secondary-btn{
  background:var(--card);
  color:var(--text);
}

.secondary-btn:hover{
  background:var(--card2);
  transform:translateY(-2px);
}

.hero-glow{
  position:absolute;
  right:-100px;
  bottom:-140px;
  width:500px;
  height:500px;
  border-radius:50%;
  background:rgba(49,135,255,.09);
  filter:blur(30px);
}

/* =========================================================
   TRUST
========================================================= */

.trust-row{
  width:min(1440px,calc(100% - 36px));
  margin:18px auto 0;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:10px;
}

.trust-card{
  border:1px solid var(--border);
  background:var(--card);
  border-radius:15px;
  padding:17px;
  display:flex;
  align-items:center;
  gap:12px;
}

.trust-icon{
  width:38px;
  height:38px;
  flex:none;
  display:grid;
  place-items:center;
  border-radius:10px;
  background:var(--blue-soft);
  color:var(--blue);
}

.trust-card strong{
  display:block;
  font-size:13px;
}

.trust-card span{
  display:block;
  color:var(--muted);
  font-size:11px;
  margin-top:3px;
}

/* =========================================================
   PRODUCTS SECTION
========================================================= */

.products-section{
  width:min(1440px,calc(100% - 36px));
  margin:55px auto 80px;
}

.section-head{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:20px;
  margin-bottom:22px;
}

.section-title{
  margin:0;
  font-size:30px;
  letter-spacing:-1.2px;
}

.section-subtitle{
  color:var(--muted);
  margin:7px 0 0;
  font-size:14px;
}

.product-count{
  color:var(--muted);
  font-size:13px;
}

/* =========================================================
   CATEGORIES
========================================================= */

.categories{
  display:flex;
  gap:8px;
  overflow-x:auto;
  padding-bottom:8px;
  margin-bottom:22px;
  scrollbar-width:none;
}

.categories::-webkit-scrollbar{
  display:none;
}

.category-btn{
  flex:none;
  height:37px;
  padding:0 14px;
  border:1px solid var(--border);
  border-radius:9px;
  background:var(--card);
  color:var(--muted);
  font-size:12px;
  font-weight:750;
  transition:.2s ease;
}

.category-btn:hover{
  color:var(--text);
  border-color:rgba(49,135,255,.25);
}

.category-btn.active{
  color:white;
  background:var(--blue);
  border-color:var(--blue);
}

/* =========================================================
   PRODUCT GRID
========================================================= */

.products-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:16px;
}

.product-card{
  min-width:0;
  border:1px solid var(--border);
  border-radius:17px;
  background:var(--card);
  overflow:hidden;
  transition:
    transform .22s ease,
    border-color .22s ease,
    box-shadow .22s ease;
}

.product-card:hover{
  transform:translateY(-4px);
  border-color:rgba(49,135,255,.24);
  box-shadow:0 18px 42px rgba(0,0,0,.18);
}

.product-image-wrap{
  height:245px;
  position:relative;
  background:
    radial-gradient(circle at 50% 40%,rgba(255,255,255,.05),transparent 45%),
    var(--card2);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

.product-image{
  width:100%;
  height:100%;
  object-fit:contain;
  padding:21px;
  transition:transform .35s ease;
}

.product-card:hover .product-image{
  transform:scale(1.035);
}

.product-badge{
  position:absolute;
  z-index:2;
  left:13px;
  top:13px;
  padding:6px 9px;
  border-radius:7px;
  color:white;
  background:#1976ed;
  font-size:10px;
  font-weight:850;
  box-shadow:0 5px 15px rgba(25,118,237,.22);
}

.product-info{
  padding:17px;
}

.product-category{
  color:var(--blue);
  font-size:10px;
  text-transform:uppercase;
  letter-spacing:.65px;
  font-weight:850;
  margin-bottom:7px;
}

.product-name{
  margin:0;
  min-height:45px;
  font-size:14px;
  line-height:1.45;
  font-weight:760;
  letter-spacing:-.15px;
}

.product-rating{
  display:flex;
  align-items:center;
  gap:7px;
  margin-top:10px;
  color:var(--muted);
  font-size:11px;
}

.stars{
  color:#ffb72b;
  letter-spacing:1px;
  font-size:12px;
}

.review-number{
  color:var(--muted);
}

.product-bottom{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:10px;
  margin-top:17px;
}

.product-price{
  font-size:19px;
  line-height:1;
  letter-spacing:-.5px;
  white-space:nowrap;
}

.product-actions{
  display:flex;
  gap:6px;
}

.product-view-btn,
.product-add-btn{
  height:33px;
  border-radius:8px;
  padding:0 10px;
  font-size:10px;
  font-weight:850;
  transition:.18s ease;
}

.product-view-btn{
  background:transparent;
  color:var(--muted);
  border:1px solid var(--border);
}

.product-view-btn:hover{
  color:var(--text);
  background:var(--card2);
}

.product-add-btn{
  background:var(--blue);
  color:white;
  border:1px solid var(--blue);
}

.product-add-btn:hover{
  background:var(--blue2);
  transform:translateY(-1px);
}

.empty-products{
  grid-column:1/-1;
  text-align:center;
  padding:80px 20px;
  border:1px solid var(--border);
  border-radius:18px;
  background:var(--card);
}

.empty-icon{
  font-size:34px;
  margin-bottom:12px;
}

/* =========================================================
   FOOTER
========================================================= */

footer{
  border-top:1px solid var(--border);
  background:var(--bg2);
}

.footer-inner{
  width:min(1440px,calc(100% - 36px));
  margin:auto;
  padding:40px 0;
  display:flex;
  justify-content:space-between;
  gap:25px;
  color:var(--muted);
  font-size:12px;
}

.footer-brand{
  color:var(--text);
  font-weight:850;
}

/* =========================================================
   CART
========================================================= */

.cart-overlay{
  position:fixed;
  inset:0;
  z-index:2000;
  background:rgba(0,0,0,.5);
  opacity:0;
  visibility:hidden;
  transition:.25s ease;
}

.cart-overlay.open{
  opacity:1;
  visibility:visible;
}

.cart-drawer{
  position:fixed;
  z-index:2001;
  top:0;
  right:0;
  width:min(400px,100%);
  height:100dvh;
  background:var(--bg2);
  border-left:1px solid var(--border);
  transform:translateX(100%);
  transition:transform .3s cubic-bezier(.2,.8,.2,1);
  display:flex;
  flex-direction:column;
  box-shadow:-20px 0 60px rgba(0,0,0,.25);
}

.cart-drawer.open{
  transform:translateX(0);
}

.cart-header{
  height:72px;
  padding:0 20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border-bottom:1px solid var(--border);
}

.cart-header h2{
  margin:0;
  font-size:18px;
}

.cart-close{
  width:35px;
  height:35px;
  border:0;
  border-radius:9px;
  background:var(--card);
  color:var(--muted);
  font-size:20px;
}

.cart-items{
  flex:1;
  overflow:auto;
  padding:16px;
}

.cart-empty{
  height:100%;
  display:grid;
  place-content:center;
  text-align:center;
  color:var(--muted);
}

.cart-empty-icon{
  font-size:42px;
  margin-bottom:12px;
}

.cart-item{
  display:flex;
  gap:12px;
  padding:13px 0;
  border-bottom:1px solid var(--border);
}

.cart-item img{
  width:68px;
  height:68px;
  border-radius:10px;
  object-fit:contain;
  background:var(--card);
  padding:6px;
  flex:none;
}

.cart-item-info{
  min-width:0;
  flex:1;
}

.cart-item-info strong{
  display:block;
  font-size:12px;
  line-height:1.4;
}

.cart-item-info > span{
  display:block;
  margin-top:5px;
  color:var(--blue);
  font-weight:800;
  font-size:12px;
}

.cart-item-controls{
  display:flex;
  align-items:center;
  gap:7px;
  margin-top:10px;
}

.cart-item-controls button{
  width:25px;
  height:25px;
  border-radius:7px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}

.cart-item-controls span{
  min-width:18px;
  text-align:center;
  font-size:11px;
  font-weight:800;
}

.cart-item-controls .cart-remove{
  margin-left:auto;
  color:var(--red);
}

.cart-footer{
  padding:18px;
  border-top:1px solid var(--border);
  background:var(--bg2);
}

.cart-total-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:13px;
}

.cart-total-row span{
  color:var(--muted);
  font-size:13px;
}

.cart-total-row strong{
  font-size:21px;
}

.checkout-btn{
  width:100%;
  height:46px;
  border:0;
  border-radius:11px;
  color:white;
  background:var(--blue);
  font-weight:850;
  transition:.2s ease;
}

.checkout-btn:hover{
  background:var(--blue2);
  transform:translateY(-1px);
}

/* =========================================================
   MODAL
========================================================= */

.modal{
  position:fixed;
  inset:0;
  z-index:3000;
  background:rgba(0,0,0,.6);
  backdrop-filter:blur(5px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  opacity:0;
  visibility:hidden;
  transition:.2s ease;
}

.modal.open{
  opacity:1;
  visibility:visible;
}

.modal-box{
  width:min(920px,100%);
  max-height:90dvh;
  overflow:auto;
  border:1px solid var(--border);
  border-radius:20px;
  background:var(--bg2);
  box-shadow:0 30px 100px rgba(0,0,0,.35);
  transform:translateY(10px) scale(.985);
  transition:.22s ease;
}

.modal.open .modal-box{
  transform:translateY(0) scale(1);
}

.modal-header{
  min-height:64px;
  padding:0 20px;
  border-bottom:1px solid var(--border);
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.modal-header h2{
  margin:0;
  font-size:18px;
}

.modal-close{
  width:35px;
  height:35px;
  border:0;
  border-radius:9px;
  background:var(--card);
  color:var(--muted);
  font-size:20px;
}

.modal-content{
  padding:22px;
}

/* =========================================================
   PRODUCT MODAL
========================================================= */

.product-modal{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:30px;
}

.product-modal-image{
  min-height:450px;
  border-radius:16px;
  background:var(--card);
  display:grid;
  place-items:center;
  overflow:hidden;
}

.product-modal-image img{
  width:100%;
  height:100%;
  max-height:500px;
  object-fit:contain;
  padding:30px;
}

.product-modal-info{
  padding:8px 0;
}

.modal-category{
  color:var(--blue);
  text-transform:uppercase;
  font-size:10px;
  font-weight:850;
  letter-spacing:.7px;
}

.product-modal-info h2{
  margin:9px 0 15px;
  font-size:28px;
  line-height:1.15;
}

.modal-price{
  font-size:26px;
  font-weight:900;
}

.modal-rating{
  margin-top:10px;
  color:#ffb72b;
  font-size:13px;
}

.demo-review-note{
  color:var(--muted);
  font-size:10px;
  line-height:1.5;
  padding:10px;
  border-radius:9px;
  background:var(--card);
  margin:17px 0;
}

.review{
  padding:13px 0;
  border-bottom:1px solid var(--border);
}

.review-top{
  display:flex;
  justify-content:space-between;
  gap:10px;
  font-size:12px;
}

.review-top span{
  color:#ffb72b;
}

.review p{
  margin:6px 0 0;
  color:var(--muted);
  font-size:12px;
  line-height:1.5;
}

.modal-add-btn{
  width:100%;
  height:46px;
  border:0;
  border-radius:10px;
  margin-top:18px;
  color:white;
  background:var(--blue);
  font-weight:850;
}

/* =========================================================
   AUTH / SETTINGS / ADMIN
========================================================= */

.auth-form,
.admin-code-form{
  max-width:430px;
  margin:auto;
}

.auth-form label,
.admin-code-form label{
  display:block;
  color:var(--muted);
  font-size:12px;
  font-weight:700;
  margin-bottom:15px;
}

.auth-form input,
.admin-code-form input{
  width:100%;
  height:44px;
  margin-top:7px;
  border:1px solid var(--border);
  border-radius:10px;
  background:var(--card);
  color:var(--text);
  padding:0 13px;
}

.auth-submit{
  width:100%;
  height:45px;
  border:0;
  border-radius:10px;
  color:white;
  background:var(--blue);
  font-weight:850;
  margin-top:5px;
}

.auth-switch{
  width:100%;
  margin-top:10px;
  height:40px;
  border:1px solid var(--border);
  border-radius:9px;
  background:transparent;
  color:var(--muted);
  font-size:12px;
}

.account-panel{
  text-align:center;
  padding:25px;
}

.account-avatar{
  width:65px;
  height:65px;
  display:grid;
  place-items:center;
  margin:0 auto 15px;
  border-radius:50%;
  background:var(--blue-soft);
  font-size:25px;
}

.account-panel h3{
  font-size:14px;
  word-break:break-all;
}

.danger-btn{
  min-height:42px;
  padding:0 15px;
  border:1px solid rgba(255,92,104,.2);
  border-radius:9px;
  background:rgba(255,92,104,.08);
  color:var(--red);
  font-weight:800;
}

.settings-section{
  padding:18px 0;
  border-bottom:1px solid var(--border);
}

.settings-section:last-child{
  border-bottom:0;
}

.settings-section h3{
  margin:0 0 11px;
  font-size:13px;
}

.settings-options{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.settings-options button{
  min-height:38px;
  padding:0 13px;
  border-radius:9px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--muted);
  font-size:12px;
  font-weight:750;
}

.settings-options button.active{
  color:white;
  background:var(--blue);
  border-color:var(--blue);
}

.toggle-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px;
  border-radius:10px;
  background:var(--card);
}

.toggle-row input{
  accent-color:var(--blue);
}

.admin-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  margin-bottom:25px;
}

.admin-label{
  color:var(--blue);
  font-size:10px;
  font-weight:900;
  letter-spacing:1px;
}

.admin-header h2{
  margin:5px 0 0;
}

.admin-stat{
  text-align:center;
  padding:15px 22px;
  border:1px solid var(--border);
  border-radius:12px;
  background:var(--card);
}

.admin-stat strong{
  display:block;
  font-size:25px;
}

.admin-stat span{
  color:var(--muted);
  font-size:10px;
}

.admin-actions{
  display:flex;
  gap:9px;
  flex-wrap:wrap;
  margin-bottom:20px;
}

.admin-order-card{
  display:flex;
  justify-content:space-between;
  gap:20px;
  padding:14px;
  border:1px solid var(--border);
  border-radius:11px;
  background:var(--card);
  margin-bottom:8px;
}

.admin-order-card span{
  display:block;
  color:var(--muted);
  font-size:11px;
  margin-top:4px;
}

.orders-list{
  display:grid;
  gap:10px;
}

.order-card{
  border:1px solid var(--border);
  border-radius:12px;
  background:var(--card);
  padding:15px;
}

.order-header{
  display:flex;
  justify-content:space-between;
  gap:15px;
}

.order-header span{
  color:var(--blue);
  font-weight:850;
}

.order-products{
  margin-top:10px;
  color:var(--muted);
  font-size:11px;
  line-height:1.7;
}

/* =========================================================
   TOAST
========================================================= */

.toast-container{
  position:fixed;
  z-index:5000;
  right:18px;
  bottom:18px;
  display:flex;
  flex-direction:column;
  gap:8px;
}

.toast{
  min-width:240px;
  max-width:360px;
  padding:12px 14px;
  border:1px solid var(--border);
  border-radius:10px;
  background:var(--card2);
  color:var(--text);
  box-shadow:0 15px 40px rgba(0,0,0,.25);
  font-size:12px;
  font-weight:700;
  transform:translateY(12px);
  opacity:0;
  transition:.25s ease;
}

.toast.show{
  transform:translateY(0);
  opacity:1;
}

.toast-error{
  border-color:rgba(255,92,104,.3);
}

/* =========================================================
   CART FLY ANIMATION
========================================================= */

.cart-fly-image{
  border-radius:10px;
  object-fit:contain;
  background:var(--card);
  padding:5px;
  box-shadow:0 12px 35px rgba(0,0,0,.35);
}

/* =========================================================
   NO ANIMATIONS
========================================================= */

html.no-animations *,
html.no-animations *::before,
html.no-animations *::after{
  animation:none!important;
  transition:none!important;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media(max-width:1150px){

  .products-grid{
    grid-template-columns:repeat(3,minmax(0,1fr));
  }

}

@media(max-width:850px){

  .header-inner{
    width:calc(100% - 22px);
    gap:10px;
  }

  .logo span{
    display:none;
  }

  .header-search{
    max-width:none;
  }

  .header-actions{
    gap:2px;
  }

  .icon-btn{
    width:37px;
    height:37px;
  }

  .hero,
  .trust-row,
  .products-section{
    width:calc(100% - 22px);
  }

  .hero-content{
    padding:42px 30px;
  }

  .hero h1{
    letter-spacing:-2px;
  }

  .trust-row{
    grid-template-columns:repeat(2,1fr);
  }

  .products-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }

}

@media(max-width:600px){

  .site-header{
    height:auto;
  }

  .header-inner{
    min-height:64px;
    flex-wrap:wrap;
    padding:10px 0;
  }

  .header-search{
    order:3;
    flex-basis:100%;
  }

  .header-actions{
    margin-left:auto;
  }

  .hero{
    margin-top:15px;
    min-height:390px;
  }

  .hero-content{
    padding:34px 22px;
  }

  .hero h1{
    font-size:39px;
  }

  .hero p{
    font-size:14px;
  }

  .trust-row{
    grid-template-columns:1fr 1fr;
  }

  .trust-card{
    padding:13px;
  }

  .trust-icon{
    width:32px;
    height:32px;
  }

  .trust-card strong{
    font-size:11px;
  }

  .trust-card span{
    font-size:9px;
  }

  .products-section{
    margin-top:40px;
  }

  .section-title{
    font-size:24px;
  }

  .products-grid{
    grid-template-columns:1fr;
  }

  .product-image-wrap{
    height:275px;
  }

  .product-name{
    min-height:auto;
  }

  .product-bottom{
    align-items:center;
  }

  .product-price{
    font-size:18px;
  }

  .product-view-btn,
  .product-add-btn{
    height:36px;
    padding:0 12px;
  }

  .product-modal{
    grid-template-columns:1fr;
    gap:18px;
  }

  .product-modal-image{
    min-height:280px;
  }

  .product-modal-info h2{
    font-size:22px;
  }

  .footer-inner{
    flex-direction:column;
  }

  .admin-header{
    align-items:flex-start;
    flex-direction:column;
  }

}

</style>
</head>

<body>

<!-- ======================================================
     HEADER
====================================================== -->

<header class="site-header">

  <div class="header-inner">

    <a href="#" class="logo">
      <span class="logo-mark">N</span>
      <span>NovaShop</span>
    </a>

    <div class="header-search">

      <span class="search-icon">⌕</span>

      <input
        id="searchInput"
        type="search"
        placeholder="Rechercher un produit..."
        autocomplete="off"
      >

    </div>

    <div class="header-actions">

      <button
        class="icon-btn"
        id="settingsBtn"
        title="Paramètres"
      >
        ⚙
      </button>

      <button
        class="icon-btn"
        id="accountBtn"
        title="Compte"
      >
        ◯
      </button>

      <button
        class="icon-btn"
        id="ordersBtn"
        title="Commandes"
      >
        ▣
      </button>

      <button
        class="icon-btn"
        id="adminBtn"
        title="Administration"
        style="display:none"
      >
        ◆
      </button>

      <button
        class="icon-btn"
        id="cartBtn"
        title="Panier"
      >
        🛒
        <span
          class="cart-badge"
          id="cartBadge"
        >
          0
        </span>
      </button>

    </div>

  </div>

</header>


<!-- ======================================================
     HERO
====================================================== -->

<section class="hero">

  <div class="hero-glow"></div>

  <div class="hero-content">

    <div class="hero-kicker">
      ✦ LA BOUTIQUE HIGH-TECH
    </div>

    <h1>
      Ton setup.<br>
      <span>Ton univers.</span>
    </h1>

    <p>
      PC gaming, composants, écrans, périphériques,
      streaming et accessoires sélectionnés pour
      construire un setup qui te ressemble.
    </p>

    <div class="hero-buttons">

      <button
        class="primary-btn"
        id="heroShopBtn"
      >
        Voir les produits
      </button>

      <button
        class="secondary-btn"
        id="heroSearchBtn"
      >
        Rechercher
      </button>

    </div>

  </div>

</section>


<!-- ======================================================
     TRUST
====================================================== -->

<section class="trust-row">

  <div class="trust-card">
    <div class="trust-icon">🔒</div>
    <div>
      <strong>Paiement sécurisé</strong>
      <span>Transactions protégées</span>
    </div>
  </div>

  <div class="trust-card">
    <div class="trust-icon">↩</div>
    <div>
      <strong>Retours simples</strong>
      <span>Conditions clairement indiquées</span>
    </div>
  </div>

  <div class="trust-card">
    <div class="trust-icon">★</div>
    <div>
      <strong>Avis clients</strong>
      <span>Découvrez les évaluations</span>
    </div>
  </div>

  <div class="trust-card">
    <div class="trust-icon">⚡</div>
    <div>
      <strong>Support</strong>
      <span>Une boutique pensée pour vous</span>
    </div>
  </div>

</section>


<!-- ======================================================
     PRODUCTS
====================================================== -->

<main
  class="products-section"
  id="products"
>

  <div class="section-head">

    <div>

      <h2 class="section-title">
        Produits populaires
      </h2>

      <p class="section-subtitle">
        Trouve ton prochain élément de setup.
      </p>

    </div>

    <span
      class="product-count"
      id="productCount"
    >
      43 produits
    </span>

  </div>


  <div
    class="categories"
    id="categories"
  ></div>


  <div
    class="products-grid"
    id="productsGrid"
  ></div>

</main>


<!-- ======================================================
     FOOTER
====================================================== -->

<footer>

  <div class="footer-inner">

    <div>
      <div class="footer-brand">
        NovaShop
      </div>

      <div>
        High-tech & gaming.
      </div>
    </div>

    <div>
      © 2026 NovaShop
    </div>

  </div>

</footer>


<!-- ======================================================
     CART
====================================================== -->

<div
  class="cart-overlay"
  id="cartOverlay"
></div>

<aside
  class="cart-drawer"
  id="cartDrawer"
>

  <div class="cart-header">

    <h2>
      Panier
    </h2>

    <button
      class="cart-close"
      id="cartClose"
    >
      ×
    </button>

  </div>


  <div
    class="cart-items"
    id="cartItems"
  ></div>


  <div class="cart-footer">

    <div class="cart-total-row">

      <span>
        Total
      </span>

      <strong id="cartTotal">
        0,00 €
      </strong>

    </div>

    <button
      class="checkout-btn"
      id="checkoutBtn"
    >
      Commander
    </button>

  </div>

</aside>


<!-- ======================================================
     MODAL
====================================================== -->

<div
  class="modal"
  id="modal"
>

  <div class="modal-box">

    <div class="modal-header">

      <h2 id="modalTitle">
        NovaShop
      </h2>

      <button
        class="modal-close"
        id="modalClose"
      >
        ×
      </button>

    </div>

    <div
      class="modal-content"
      id="modalContent"
    ></div>

  </div>

</div>


<!-- ======================================================
     TOAST
====================================================== -->

<div
  class="toast-container"
  id="toastContainer"
></div>


<script type="module" src="./app.js"></script>

</body>
</html>
