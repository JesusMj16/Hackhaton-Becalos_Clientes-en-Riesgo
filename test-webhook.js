import fetch from "node-fetch";

async function testWebhook() {
  const url = "https://guillex999.app.n8n.cloud/webhook/43a76ab1-7403-4470-8b42-54d7691365da";
  const payload = {
    cliente_id: "C-001",
    sector: "Retail",
    nombre_cliente: "Supermercados El Sol",
    nivel_servicio: 45,
    puntualidad: 80,
    nps: 10,
    quejas_abiertas: 15,
    tendencia_quejas: 50,
    antiguedad_meses: 24,
    facturacion_mensual_mxn: 500000
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("RESPONSE:", text);
  } catch (err) {
    console.error(err);
  }
}

testWebhook();
