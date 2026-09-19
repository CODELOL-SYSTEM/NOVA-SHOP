<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NovaShop</title>

<style>
:root{
  --bg:#070b14;
  --panel:#0e1524;
  --panel2:#121c2e;
  --border:#24324a;
  --text:#f5f7fb;
  --muted:#8d9ab0;
  --blue:#4f8cff;
  --blue2:#2563eb;
  --green:#32d583;
  --red:#ff5d73;
  --yellow:#ffd166;
}

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  font-family:Arial,Helvetica,sans-serif;
  background:
    radial-gradient(circle at 20% 0%,rgba(37,99,235,.18),transparent 35%),
    radial-gradient(circle at 90% 10%,rgba(79,140,255,.10),transparent 30%),
    var(--bg);
  color:var(--text);
  min-height:100vh;
}

button,input,select{
  font:inherit;
}

button{
  cursor:pointer;
}

.hidden{
  display:none!important;
}

.toast{
  position:fixed;
  right:22px;
  bottom:22px;
  background:#111c2d;
  border:1px solid var(--border);
  padding:14px 18px;
  border-radius:12px;
  box-shadow:0 15px 40px #0008;
  z-index:9999;
  transform:translateY(100px);
  opacity:0;
  transition:.25s;
}

.toast.show{
  transform:translateY(0);
  opacity:1;
}

.overlay{
  position:fixed;
  inset:0;
  background:#0009;
  backdrop-filter:blur(7px);
  z-index:1000;
}

.modal{
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  width:min(950px,94vw);
  max-height:90vh;
  overflow:auto;
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:20px;
  z-index:1001;
  box-shadow:0 30px 100px #000b;
}

.modal.small{
  width:min(520px,94vw);
}

.modal-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:20px;
  border-bottom:1px solid var(--border);
  position:sticky;
  top:0;
  background:var(--panel);
  z-index:2;
}

.modal-header h2{
  font-size:21px;
}

.close{
  border:0;
  background:#1b2638;
  color:white;
  width:38px;
  height:38px;
  border-radius:10px;
  font-size:20px;
}

.modal-body{
  padding:20px;
}

header{
  position:sticky;
  top:0;
  z-index:500;
  background:#080d17ee;
  backdrop-filter:blur(15px);
  border-bottom:1px solid var(--border);
}

.navbar{
  max-width:1450px;
  margin:auto;
  min-height:72px;
  display:flex;
  align-items:center;
  gap:18px;
  padding:12px 20px;
}

.logo{
  font-size:25px;
  font-weight:900;
  color:white;
  white-space:nowrap;
}

.logo span{
  color:var(--blue);
}

.search{
  flex:1;
  display:flex;
  gap:8px;
}

.search input{
  width:100%;
  background:#0d1625;
  color:white;
  border:1px solid var(--border);
  border-radius:11px;
  padding:12px 15px;
  outline:none;
}

.search input:focus{
  border-color:var(--blue);
}

.btn{
  border:1px solid var(--border);
  color:white;
  background:#111b2b;
  padding:11px 15px;
  border-radius:11px;
  transition:.18s;
}

.btn:hover{
  transform:translateY(-1px);
  border-color:#4b6a9d;
}

.btn.primary{
  background:linear-gradient(135deg,var(--blue2),var(--blue));
  border-color:transparent;
}

.btn.green{
  background:#138a50;
  border-color:transparent;
}

.btn.red{
  background:#a82e45;
  border-color:transparent;
}

.nav-actions{
  display:flex;
  gap:7px;
}

.icon-btn{
  min-width:44px;
  height:44px;
  border:1px solid var(--border);
  border-radius:11px;
  background:#101a2a;
  color:white;
}

.cart-wrap{
  position:relative;
}

.cart-count{
  position:absolute;
  right:-4px;
  top:-5px;
  background:var(--red);
  color:white;
  font-size:11px;
  min-width:19px;
  height:19px;
  display:grid;
  place-items:center;
  border-radius:20px;
  font-weight:bold;
}

nav.categories{
  max-width:1450px;
  margin:auto;
  padding:0 20px 13px;
  display:flex;
  gap:8px;
  overflow:auto;
}

.category-btn{
  background:#0d1625;
  color:#cbd5e1;
  border:1px solid var(--border);
  padding:8px 13px;
  border-radius:999px;
  white-space:nowrap;
}

.category-btn.active{
  background:var(--blue2);
  color:white;
  border-color:var(--blue);
}

.hero{
  max-width:1450px;
  margin:28px auto;
  padding:45px;
  border:1px solid var(--border);
  border-radius:25px;
  background:
    linear-gradient(120deg,#111e35cc,#0d1524cc),
    radial-gradient(circle at 80% 30%,#2563eb44,transparent 40%);
}

.hero h1{
  font-size:clamp(35px,5vw,65px);
  margin-bottom:12px;
}

.hero p{
  color:var(--muted);
  max-width:700px;
  line-height:1.6;
}

.hero-actions{
  display:flex;
  gap:10px;
  margin-top:24px;
}

.section{
  max-width:1450px;
  margin:30px auto;
  padding:0 20px;
}

.section-title{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  margin-bottom:18px;
}

.section-title h2{
  font-size:25px;
}

.sort{
  background:#101a2a;
  color:white;
  border:1px solid var(--border);
  padding:10px;
  border-radius:10px;
}

.products-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:16px;
}

.product-card{
  background:linear-gradient(180deg,#101a2b,#0b121e);
  border:1px solid var(--border);
  border-radius:17px;
  overflow:hidden;
  transition:.2s;
  position:relative;
}

.product-card:hover{
  transform:translateY(-4px);
  border-color:#456493;
  box-shadow:0 15px 40px #0005;
}

.product-image{
  width:100%;
  height:210px;
  object-fit:contain;
  background:white;
  padding:15px;
}

.product-info{
  padding:15px;
}

.product-category{
  color:#7795c7;
  font-size:12px;
  text-transform:uppercase;
  margin-bottom:7px;
}

.product-name{
  min-height:42px;
  line-height:1.35;
  font-weight:bold;
}

.price{
  font-size:21px;
  font-weight:900;
  margin:12px 0;
}

.rating{
  color:var(--yellow);
  font-size:14px;
}

.review-count{
  color:var(--muted);
  font-size:12px;
}

.product-buttons{
  display:flex;
  gap:7px;
  margin-top:12px;
}

.product-buttons .btn{
  flex:1;
}

.empty{
  text-align:center;
  padding:70px 20px;
  color:var(--muted);
  border:1px dashed var(--border);
  border-radius:18px;
}

.form-group{
  margin-bottom:14px;
}

.form-group label{
  display:block;
  margin-bottom:7px;
  color:#bdc7d7;
  font-size:14px;
}

.form-group input,
.form-group select{
  width:100%;
  background:#0a1220;
  color:white;
  border:1px solid var(--border);
  padding:12px;
  border-radius:10px;
  outline:none;
}

.form-group input:focus{
  border-color:var(--blue);
}

.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}

.tabs{
  display:flex;
  gap:5px;
  background:#09111e;
  padding:5px;
  border-radius:12px;
  margin-bottom:18px;
}

.tab{
  flex:1;
  border:0;
  background:transparent;
  color:#8491a5;
  padding:11px;
  border-radius:9px;
}

.tab.active{
  background:#1c2c45;
  color:white;
}

.auth-separator{
  text-align:center;
  color:#64748b;
  margin:15px 0;
}

.google{
  width:100%;
}

.account-box{
  display:grid;
  gap:10px;
}

.info-card{
  padding:15px;
  border:1px solid var(--border);
  background:#0b1422;
  border-radius:13px;
}

.info-card strong{
  display:block;
  margin-bottom:5px;
}

.cart-item{
  display:flex;
  gap:13px;
  align-items:center;
  border-bottom:1px solid var(--border);
  padding:13px 0;
}

.cart-item img{
  width:75px;
  height:75px;
  object-fit:contain;
  background:white;
  border-radius:9px;
}

.cart-item-main{
  flex:1;
}

.qty{
  display:flex;
  align-items:center;
  gap:8px;
  margin-top:7px;
}

.qty button{
  width:28px;
  height:28px;
  border:1px solid var(--border);
  background:#152033;
  color:white;
  border-radius:7px;
}

.cart-total{
  font-size:22px;
  font-weight:bold;
  text-align:right;
  padding:18px 0;
}

.product-detail{
  display:grid;
  grid-template-columns:360px 1fr;
  gap:25px;
}

.product-detail-image{
  width:100%;
  height:350px;
  object-fit:contain;
  background:white;
  border-radius:15px;
}

.review-summary{
  display:flex;
  gap:20px;
  align-items:center;
  background:#0b1422;
  border:1px solid var(--border);
  padding:15px;
  border-radius:14px;
  margin:20px 0;
}

.big-rating{
  font-size:35px;
  font-weight:900;
}

.reviews-list{
  display:grid;
  gap:10px;
  max-height:400px;
  overflow:auto;
}

.review{
  background:#0b1422;
  border:1px solid var(--border);
  padding:13px;
  border-radius:12px;
}

.review-head{
  display:flex;
  justify-content:space-between;
  gap:10px;
  margin-bottom:7px;
}

.review-date{
  color:#68778d;
  font-size:12px;
}

.order-card{
  background:#0b1422;
  border:1px solid var(--border);
  border-radius:14px;
  padding:16px;
  margin-bottom:12px;
}

.order-top{
  display:flex;
  justify-content:space-between;
  gap:10px;
  flex-wrap:wrap;
}

.status{
  padding:5px 9px;
  border-radius:999px;
  background:#163b2b;
  color:#63e6a4;
  font-size:12px;
}

.dashboard-stats{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin-bottom:20px;
}

.stat{
  padding:20px;
  border:1px solid var(--border);
  background:#0b1422;
  border-radius:14px;
}

.stat-value{
  font-size:30px;
  font-weight:900;
  margin-top:8px;
}

.admin-order{
  border:1px solid var(--border);
  background:#0b1422;
  padding:15px;
  border-radius:14px;
  margin-bottom:12px;
}

.admin-fields{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-top:12px;
}

.admin-fields input,
.admin-fields select{
  width:100%;
  background:#09111e;
  border:1px solid var(--border);
  color:white;
  border-radius:9px;
  padding:9px;
}

.invoice{
  background:white;
  color:#111;
  padding:35px;
  border-radius:12px;
}

.invoice table{
  width:100%;
  border-collapse:collapse;
  margin-top:20px;
}

.invoice td,
.invoice th{
  border-bottom:1px solid #ddd;
  padding:9px;
  text-align:left;
}

.switch-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:15px 0;
  border-bottom:1px solid var(--border);
}

footer{
  margin-top:70px;
  border-top:1px solid var(--border);
  padding:35px 20px;
  text-align:center;
  color:#718096;
}

@media(max-width:850px){
  .navbar{
    flex-wrap:wrap;
  }

  .search{
    order:3;
    flex-basis:100%;
  }

  .product-detail{
    grid-template-columns:1fr;
  }

  .dashboard-stats{
    grid-template-columns:1fr;
  }

  .form-grid,
  .admin-fields{
    grid-template-columns:1fr;
  }

  .hero{
    margin:15px;
    padding:28px;
  }

  .section{
    padding:0 15px;
  }
}

@media(max-width:550px){
  .nav-actions{
    margin-left:auto;
  }

  .nav-actions .icon-btn:nth-child(1),
  .nav-actions .icon-btn:nth-child(2){
    display:none;
  }

  .products-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .product-image{
    height:150px;
  }

  .product-name{
    font-size:14px;
  }

  .price{
    font-size:18px;
  }
}
</style>
</head>

<body>

<div id="toast" class="toast"></div>
<div id="overlay" class="overlay hidden"></div>

<header>
  <div class="navbar">

    <div class="logo">NOVA<span>SHOP</span></div>

    <div class="search">
      <input id="searchInput" type="text" placeholder="Rechercher un produit...">
      <button id="searchButton" class="btn primary">🔎</button>
    </div>

    <div class="nav-actions">
      <button id="accountButton" class="icon-btn" title="Compte">👤</button>
      <button id="ordersButton" class="icon-btn" title="Commandes">📦</button>

      <button id="adminButton" class="icon-btn hidden" title="Dashboard">
        👑
      </button>

      <button id="settingsButton" class="icon-btn" title="Paramètres">
        ⚙️
      </button>

      <div class="cart-wrap">
        <button id="cartButton" class="icon-btn">🛒</button>
        <span id="cartCount" class="cart-count">0</span>
      </div>
    </div>
  </div>

  <nav class="categories">
    <button class="category-btn active" data-category="Tous">Tous</button>
    <button class="category-btn" data-category="PC Gamer">PC Gamer</button>
    <button class="category-btn" data-category="Composants">Composants</button>
    <button class="category-btn" data-category="Casques">Casques</button>
    <button class="category-btn" data-category="Claviers">Claviers</button>
    <button class="category-btn" data-category="Souris">Souris</button>
    <button class="category-btn" data-category="Stockage">Stockage</button>
    <button class="category-btn" data-category="Alimentations">Alimentations</button>
    <button class="category-btn" data-category="Boîtiers">Boîtiers</button>
    <button class="category-btn" data-category="Refroidissement">Refroidissement</button>
    <button class="category-btn" data-category="Écrans">Écrans</button>
    <button class="category-btn" data-category="Streaming">Streaming</button>
    <button class="category-btn" data-category="Manettes">Manettes</button>
  </nav>
</header>

<main>

  <section class="hero">
    <h1>Bienvenue sur NovaShop ⚡</h1>
    <p>
      Ton espace shopping gaming pour composants, PC, périphériques,
      écrans et accessoires.
    </p>

    <div class="hero-actions">
      <button id="heroProducts" class="btn primary">
        🛍️ Voir les produits
      </button>

      <button id="heroOrders" class="btn">
        📦 Mes commandes
      </button>
    </div>
  </section>

  <section class="section">

    <div class="section-title">
      <div>
        <h2>Produits</h2>
        <span id="resultsCount" class="review-count"></span>
      </div>

      <select id="sortSelect" class="sort">
        <option value="default">Tri par défaut</option>
        <option value="priceAsc">Prix croissant</option>
        <option value="priceDesc">Prix décroissant</option>
        <option value="rating">Meilleures notes</option>
      </select>
    </div>

    <div id="emptyState" class="empty hidden">
      Aucun produit trouvé.
    </div>

    <div id="productsGrid" class="products-grid"></div>

  </section>

</main>

<footer>
  © 2026 NovaShop · Shopping gaming
</footer>


<!-- AUTH -->

<div id="authModal" class="modal small hidden">

  <div class="modal-header">
    <h2>Connexion</h2>
    <button class="close" data-close="authModal">×</button>
  </div>

  <div class="modal-body">

    <div class="tabs">
      <button id="loginTab" class="tab active">Connexion</button>
      <button id="signupTab" class="tab">Créer un compte</button>
    </div>

    <form id="loginForm">

      <div class="form-group">
        <label>Email</label>
        <input id="loginEmail" type="email" required>
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input id="loginPassword" type="password" required>
      </div>

      <button class="btn primary" style="width:100%">
        Se connecter
      </button>

    </form>

    <div class="auth-separator">OU</div>

    <button id="googleButton" class="btn google">
      🔵 Continuer avec Google
    </button>

    <form id="signupForm" class="hidden">

      <div class="form-group">
        <label>Email</label>
        <input id="signupEmail" type="email" required>
      </div>

      <div class="form-group">
        <label>Téléphone</label>
        <input id="signupPhone" type="tel">
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input id="signupPassword" type="password" required>
      </div>

      <div class="form-group">
        <label>Confirmer le mot de passe</label>
        <input id="signupConfirm" type="password" required>
      </div>

      <button class="btn primary" style="width:100%">
        Créer mon compte
      </button>

      <div class="auth-separator">OU</div>

      <button type="button" id="googleSignupButton" class="btn google">
        🔵 Créer avec Google
      </button>

    </form>

  </div>
</div>


<!-- ACCOUNT -->

<div id="accountModal" class="modal small hidden">

  <div class="modal-header">
    <h2>Mon compte</h2>
    <button class="close" data-close="accountModal">×</button>
  </div>

  <div class="modal-body">
    <div id="accountContent"></div>
  </div>

</div>


<!-- PRODUCT -->

<div id="productModal" class="modal hidden">

  <div class="modal-header">
    <h2>Produit</h2>
    <button class="close" data-close="productModal">×</button>
  </div>

  <div id="productContent" class="modal-body"></div>

</div>


<!-- CART -->

<div id="cartModal" class="modal small hidden">

  <div class="modal-header">
    <h2>🛒 Mon panier</h2>
    <button class="close" data-close="cartModal">×</button>
  </div>

  <div class="modal-body">

    <div id="cartContent"></div>

    <div id="cartTotal" class="cart-total">
      0,00 €
    </div>

    <button id="checkoutButton" class="btn primary" style="width:100%">
      Passer commande
    </button>

  </div>
</div>


<!-- CHECKOUT -->

<div id="checkoutModal" class="modal small hidden">

  <div class="modal-header">
    <h2>Finaliser la commande</h2>
    <button class="close" data-close="checkoutModal">×</button>
  </div>

  <div class="modal-body">

    <form id="checkoutForm">

      <div class="form-group">
        <label>Nom complet</label>
        <input id="fullName" required>
      </div>

      <div class="form-grid">

        <div class="form-group">
          <label>Pays</label>
          <select id="country">
            <option value="France">France</option>
          </select>
        </div>

        <div class="form-group">
          <label>Code postal</label>
          <input id="postalCode" inputmode="numeric" maxlength="5" required>
        </div>

      </div>

      <div class="form-group">
        <label>Ville</label>
        <input id="city" required>
      </div>

      <div class="form-group">
        <label>Adresse</label>
        <input id="address" required>
      </div>

      <div class="form-group">

        <label>Code promo</label>

        <div style="display:flex;gap:7px">

          <input id="promoCode" placeholder="NOVA100">

          <button type="button" id="applyPromo" class="btn">
            Appliquer
          </button>

        </div>

        <div id="promoMessage" class="review-count"></div>

      </div>

      <div class="info-card">
        Sous-total :
        <strong id="checkoutSubtotal">0,00 €</strong>

        Réduction :
        <strong id="checkoutDiscount">0,00 €</strong>

        Total :
        <strong id="checkoutTotal">0,00 €</strong>
      </div>

      <br>

      <button id="payButton" class="btn green" style="width:100%">
        💳 Payer
      </button>

    </form>

  </div>
</div>


<!-- ORDERS -->

<div id="ordersModal" class="modal hidden">

  <div class="modal-header">
    <h2>📦 Mes commandes</h2>
    <button class="close" data-close="ordersModal">×</button>
  </div>

  <div id="ordersContent" class="modal-body"></div>

</div>


<!-- DASHBOARD -->

<div id="dashboardModal" class="modal hidden">

  <div class="modal-header">
    <h2>👑 NovaShop Dashboard</h2>
    <button class="close" data-close="dashboardModal">×</button>
  </div>

  <div class="modal-body">

    <div class="dashboard-stats">

      <div class="stat">
        Commandes
        <div id="statOrders" class="stat-value">0</div>
      </div>

      <div class="stat">
        Commandes gratuites
        <div id="statFree" class="stat-value">0</div>
      </div>

      <div class="stat">
        Produits
        <div id="statCatalog" class="stat-value">0</div>
      </div>

    </div>

    <h3 style="margin-bottom:12px">Commandes</h3>

    <div id="adminOrders"></div>

    <h3 style="margin:25px 0 12px">Promotions</h3>

    <div id="adminPromos"></div>

  </div>
</div>


<!-- INVOICE -->

<div id="invoiceModal" class="modal hidden">

  <div class="modal-header">
    <h2>Facture</h2>

    <div>
      <button id="printInvoice" class="btn">
        🖨️ Imprimer
      </button>

      <button class="close" data-close="invoiceModal">
        ×
      </button>
    </div>
  </div>

  <div id="invoiceContent" class="modal-body"></div>

</div>


<!-- SETTINGS -->

<div id="settingsModal" class="modal small hidden">

  <div class="modal-header">
    <h2>⚙️ Paramètres</h2>
    <button class="close" data-close="settingsModal">×</button>
  </div>

  <div class="modal-body">

    <div class="switch-row">
      <span>Mode sombre</span>
      <input id="darkSwitch" type="checkbox" checked>
    </div>

    <div class="switch-row">
      <span>Sons</span>
      <input id="soundSwitch" type="checkbox">
    </div>

  </div>
</div>


<script type="module" src="app.js"></script>

</body>
</html>
