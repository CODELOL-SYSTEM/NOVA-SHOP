const PRODUCTS = [
  {
    id:"cpu9600x",
    cat:"Processeur",
    name:"AMD Ryzen 5 9600X",
    price:249.99,
    stock:12,
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg"
  },
  {
    id:"ramcorsair32",
    cat:"RAM",
    name:"Corsair Vengeance RGB 32 Go DDR5 6000",
    price:119.99,
    stock:8,
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
  },
  {
    id:"ramkingston32",
    cat:"RAM",
    name:"Kingston Fury Beast RGB 32 Go DDR5 5600",
    price:104.99,
    stock:9,
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg"
  },
  {
    id:"ssd9901",
    cat:"SSD",
    name:"Samsung 990 PRO 1 To",
    price:89.99,
    stock:15,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$"
  },
  {
    id:"ssd9902",
    cat:"SSD",
    name:"Samsung 990 PRO 2 To",
    price:159.99,
    stock:7,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$"
  },
  {
    id:"psurm850",
    cat:"Alimentation",
    name:"Corsair RM850x",
    price:139.99,
    stock:6,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp"
  },
  {
    id:"case5000d",
    cat:"Boîtier",
    name:"Corsair 5000D Airflow White",
    price:149.99,
    stock:5,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp"
  },
  {
    id:"lf360",
    cat:"Refroidissement",
    name:"ARCTIC Liquid Freezer III 360",
    price:109.99,
    stock:10,
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
  },
  {
    id:"odysseyg6",
    cat:"Écran",
    name:"Samsung Odyssey OLED G6 27 pouces",
    price:599.99,
    stock:4,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },
  {
    id:"proxtkl",
    cat:"Clavier",
    name:"Logitech G PRO X TKL Wireless",
    price:189.99,
    stock:6,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
  },
  {
    id:"superlight2",
    cat:"Souris",
    name:"Logitech G PRO X SUPERLIGHT 2",
    price:129.99,
    stock:11,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
  },
  {
    id:"wave3",
    cat:"Micro",
    name:"Elgato Wave:3",
    price:129.99,
    stock:5,
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png"
  },
  {
    id:"dualsense",
    cat:"Manette",
    name:"Sony DualSense PS5",
    price:69.99,
    stock:14,
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
  }
];

let currentCategory="Tous";
let query="";
let cart=JSON.parse(localStorage.getItem("nova_cart")||"[]");

function money(n){
  return n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
}

function saveCart(){
  localStorage.setItem("nova_cart",JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  document.getElementById("cartCount").textContent =
    cart.reduce((a,b)=>a+b.qty,0);
}

function filterCat(cat){
  currentCategory=cat;
  renderProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

function searchProducts(){
  query=document.getElementById("search").value.trim().toLowerCase();
  renderProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

document.getElementById("search").addEventListener("keydown",e=>{
  if(e.key==="Enter")searchProducts();
});

function getProducts(){
  let list=PRODUCTS.filter(p=>{
    const category=currentCategory==="Tous"||p.cat===currentCategory;
    const text=!query ||
      p.name.toLowerCase().includes(query) ||
      p.cat.toLowerCase().includes(query);
    return category&&text;
  });

  const sort=document.getElementById("sort").value;

  if(sort==="low")list.sort((a,b)=>a.price-b.price);
  if(sort==="high")list.sort((a,b)=>b.price-a.price);
  if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));

  return list;
}

function renderProducts(){
  const list=getProducts();
  document.getElementById("productTotal").textContent=list.length;

  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product">
      <div class="productImg">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <div class="productInfo">
        <div class="productCat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="stock">● ${p.stock} en stock</div>
        <div class="price">${money(p.price)}</div>

        <div class="productActions">
          <button class="buy" onclick="addToCart('${p.id}')">
            Ajouter au panier
          </button>
          <button class="fav" onclick="favorite('${p.id}')">♡</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;

  const found=cart.find(x=>x.id===id);

  if(found){
    if(found.qty<p.stock)found.qty++;
  }else{
    cart.push({id,qty:1});
  }

  saveCart();
  openCart();
}

function removeFromCart(id){
  cart=cart.filter(x=>x.id!==id);
  saveCart();
  renderCart();
}

function changeQty(id,value){
  const row=cart.find(x=>x.id===id);
  const p=PRODUCTS.find(x=>x.id===id);

  if(!row||!p)return;

  row.qty=Math.max(1,Math.min(p.stock,row.qty+value));

  saveCart();
  renderCart();
}

function renderCart(){
  const box=document.getElementById("cartItems");

  if(!cart.length){
    box.innerHTML="<p>Votre panier est vide.</p>";
    document.getElementById("cartTotal").textContent=money(0);
    return;
  }

  let total=0;

  box.innerHTML=cart.map(row=>{
    const p=PRODUCTS.find(x=>x.id===row.id);
    if(!p)return"";

    total+=p.price*row.qty;

    return `
      <div class="cartRow">
        <img src="${p.image}">
        <div style="flex:1">
          <h4>${p.name}</h4>
          <b>${money(p.price*row.qty)}</b>
          <div>
            <button onclick="changeQty('${p.id}',-1)">−</button>
            ${row.qty}
            <button onclick="changeQty('${p.id}',1)">+</button>
            <button onclick="removeFromCart('${p.id}')">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("cartTotal").textContent=money(total);
}

function openCart(){
  renderCart();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function favorite(id){
  let fav=JSON.parse(localStorage.getItem("nova_favorites")||"[]");

  if(fav.includes(id)){
    fav=fav.filter(x=>x!==id);
  }else{
    fav.push(id);
  }

  localStorage.setItem("nova_favorites",JSON.stringify(fav));
}

function openAccount(){
  const account=JSON.parse(localStorage.getItem("nova_account")||"{}");

  document.getElementById("clientName").value=account.name||"";
  document.getElementById("clientEmail").value=account.email||"";

  document.getElementById("accountModal").classList.add("show");
  document.getElementById("overlay").classList.add("show");
}

function closeAccount(){
  document.getElementById("accountModal").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}

function saveAccount(){
  const name=document.getElementById("clientName").value.trim();
  const email=document.getElementById("clientEmail").value.trim();

  if(!name||!email){
    alert("Remplis ton nom et ton email.");
    return;
  }

  localStorage.setItem("nova_account",JSON.stringify({name,email}));
  closeAccount();
}

function closeAll(){
  closeCart();
  closeAccount();
}

function checkout(){
  if(!cart.length){
    alert("Votre panier est vide.");
    return;
  }

  location.href="checkout.html";
}

updateCartCount();
renderProducts();let orders=JSON.parse(localStorage.getItem("nova_orders")||"[]");

const STATUSES=[
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

function money(n){
  return n.toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function save(){
  localStorage.setItem("nova_orders",JSON.stringify(orders));
}

function render(){
  document.getElementById("orderCount").textContent=orders.length;

  document.getElementById("prepCount").textContent=
    orders.filter(o=>o.status==="Préparation").length;

  document.getElementById("shipCount").textContent=
    orders.filter(o=>
      o.status==="Expédiée"||
      o.status==="En livraison"
    ).length;

  document.getElementById("revenue").textContent=
    money(orders.reduce((a,o)=>a+o.total,0));

  document.getElementById("content").innerHTML=`
    <div class="panel">
      <h2>Toutes les commandes</h2>
      ${
        orders.length
        ? orders.slice().reverse().map(order=>orderHTML(order)).join("")
        : "<p>Aucune commande pour le moment.</p>"
      }
    </div>

    <div class="panel">
      <h2>Gestion des données</h2>
      <p>
        Cette zone permet de supprimer les données locales
        associées à cette boutique sur cet appareil.
      </p>
      <button class="danger" onclick="deleteAllData()">
        Supprimer toutes les données
      </button>
    </div>
  `;
}

function orderHTML(order){
  return `
    <div class="order">

      <div class="orderTop">
        <div>
          <h3>${order.id}</h3>
          <small>${order.date}</small>
        </div>

        <span class="status">${order.status}</span>
      </div>

      <hr>

      <p>
        <b>Client :</b>
        ${order.customer.name}
      </p>

      <p>
        <b>Adresse :</b><br>
        ${order.customer.address}
        ${order.customer.address2
          ? "<br>"+order.customer.address2
          : ""}
        <br>
        ${order.customer.zip} ${order.customer.city}
        <br>
        ${order.customer.country}
      </p>

      <p>
        <b>Entrepôt :</b> ${order.warehouseCity}
      </p>

      <h4>Articles</h4>

      ${order.items.map(item=>`
        <div style="
          display:flex;
          justify-content:space-between;
          padding:7px 0;
          border-bottom:1px solid #eee
        ">
          <span>${item.name} × ${item.qty}</span>
          <b>${money(item.price*item.qty)}</b>
        </div>
      `).join("")}

      <h3>Total : ${money(order.total)}</h3>

      <label>
        Statut :
        <select onchange="changeStatus('${order.id}',this.value)">
          ${STATUSES.map(s=>`
            <option
              value="${s}"
              ${s===order.status?"selected":""}
            >${s}</option>
          `).join("")}
        </select>
      </label>

      <br><br>

      <label>
        Ville de l'entrepôt :
        <input
          value="${order.warehouseCity}"
          onchange="changeWarehouse('${order.id}',this.value)"
        >
      </label>

    </div>
  `;
}

function changeStatus(id,status){
  const order=orders.find(o=>o.id===id);

  if(!order)return;

  order.status=status;
  save();
  render();
}

function changeWarehouse(id,city){
  const order=orders.find(o=>o.id===id);

  if(!order)return;

  order.warehouseCity=city.trim()||"Entrepôt";
  save();
  render();
}

function showProducts(){
  document.getElementById("content").innerHTML=`
    <div class="panel">
      <h2>Produits</h2>
      <p>
        Les produits actuellement disponibles dans la marketplace
        sont gérés depuis le catalogue JavaScript.
      </p>
      <a href="index.html">← Retour au catalogue</a>
    </div>
  `;
}

function showWarehouse(){
  const cities=[
    ...new Set(
      orders.map(o=>o.warehouseCity).filter(Boolean)
    )
  ];

  document.getElementById("content").innerHTML=`
    <div class="panel">
      <h2>🏢 Entrepôt</h2>
      <p>Ville utilisée pour les commandes :</p>

      <input id="warehouseCity"
        placeholder="Ex : Lille"
        value="${cities[0]||"Entrepôt"}">

      <button
        class="primary"
        onclick="changeAllWarehouse()">
        Enregistrer la ville
      </button>
    </div>
  `;
}

function changeAllWarehouse(){
  const city=document.getElementById("warehouseCity").value.trim();

  if(!city){
    alert("Indique une ville.");
    return;
  }

  orders.forEach(o=>o.warehouseCity=city);

  save();
  render();
}

function showAccount(){
  const account=JSON.parse(
    localStorage.getItem("nova_account")||"{}"
  );

  document.getElementById("content").innerHTML=`
    <div class="panel">
      <h2>👤 Compte</h2>

      <p>
        <b>Nom :</b> ${account.name||"Non renseigné"}
      </p>

      <p>
        <b>Email :</b> ${account.email||"Non renseigné"}
      </p>

      <h3>Commandes de ce compte</h3>
      <p>${orders.length} commande(s)</p>
    </div>
  `;
}

function deleteAllData(){
  const ok=confirm(
    "Supprimer toutes les commandes, le compte, le panier et les favoris ?"
  );

  if(!ok)return;

  localStorage.removeItem("nova_orders");
  localStorage.removeItem("nova_account");
  localStorage.removeItem("nova_cart");
  localStorage.removeItem("nova_favorites");

  orders=[];
  render();

  alert("Toutes les données locales ont été supprimées.");
}

render();
