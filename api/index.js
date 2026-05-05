export default async function handler(req, res) {
  try {
    const body = req.body;

    console.log("ORDER:", JSON.stringify(body));

    if (body?.order?.status === "PROCESSING") {
      const orderId = body.order.id;
      const itemId = body.order.items[0].id;

      const code = "PDF-001";

      const response = await fetch(
        `https://api.partner.market.yandex.ru/campaigns/149109387/orders/${orderId}/deliver`,
        {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${process.env.MARKET_TOKEN}`
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items: [
              {
                id: itemId,
                codes: [code]
              }
            ]
          })
        }
      );

      const result = await response.text();
      console.log(result);
    }

    return res.status(200).send("ok");

  } catch (e) {
    console.error(e);
    return res.status(200).send("error handled");
  }
}
