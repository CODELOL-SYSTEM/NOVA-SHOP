const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin:"*"
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

const PAYPAL_CLIENT_ID =
  process.env.PAYPAL_CLIENT_ID;

const PAYPAL_CLIENT_SECRET =
  process.env.PAYPAL_CLIENT_SECRET;

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

if(!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET){
  console.warn(
    "⚠️ PAYPAL_CLIENT_ID ou PAYPAL_CLIENT_SECRET absent."
  );
}

async function getPaypalToken(){

  const credentials =
    Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

  const response=await fetch(
    `${PAYPAL_BASE}/v1/oauth2/token`,
    {
      method:"POST",

      headers:{
        "Authorization":`Basic ${credentials}`,
        "Content-Type":
          "application/x-www-form-urlencoded"
      },

      body:"grant_type=client_credentials"
    }
  );

  if(!response.ok){
    const text=await response.text();
    throw new Error(
      `PayPal token error: ${text}`
    );
  }

  return response.json();
}

app.get("/",(req,res)=>{
  res.json({
    name:"NovaShop API",
    status:"online"
  });
});

app.get("/health",(req,res)=>{
  res.json({
    ok:true
  });
});

app.post("/api/paypal/create-order",async(req,res)=>{

  try{

    if(!PAYPAL_CLIENT_ID ||
       !PAYPAL_CLIENT_SECRET){

      return res.status(500).json({
        error:"PayPal serveur non configuré."
      });
    }

    const amount=Number(req.body.amount);

    if(!Number.isFinite(amount) || amount<=0){
      return res.status(400).json({
        error:"Montant invalide."
      });
    }

    const tokenData=
      await getPaypalToken();

    const response=
      await fetch(
        `${PAYPAL_BASE}/v2/checkout/orders`,
        {
          method:"POST",

          headers:{
            "Authorization":
              `Bearer ${tokenData.access_token}`,

            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({
            intent:"CAPTURE",

            purchase_units:[
              {
                amount:{
                  currency_code:"EUR",
                  value:amount.toFixed(2)
                }
              }
            ]
          })
        }
      );

    const data=await response.json();

    if(!response.ok){
      return res.status(response.status).json(data);
    }

    res.json(data);

  }catch(error){

    console.error(error);

    res.status(500).json({
      error:"Impossible de créer la commande PayPal."
    });
  }
});

app.post("/api/paypal/capture-order",async(req,res)=>{

  try{

    const orderId=
      String(req.body.orderId||"");

    if(!orderId){
      return res.status(400).json({
        error:"orderId manquant."
      });
    }

    const tokenData=
      await getPaypalToken();

    const response=
      await fetch(
        `${PAYPAL_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
        {
          method:"POST",

          headers:{
            "Authorization":
              `Bearer ${tokenData.access_token}`,

            "Content-Type":
              "application/json"
          }
        }
      );

    const data=await response.json();

    if(!response.ok){
      return res.status(response.status).json(data);
    }

    res.json(data);

  }catch(error){

    console.error(error);

    res.status(500).json({
      error:"Impossible de confirmer le paiement PayPal."
    });
  }
});

app.listen(PORT,()=>{
  console.log(
    `NovaShop server lancé sur le port ${PORT}`
  );
});
