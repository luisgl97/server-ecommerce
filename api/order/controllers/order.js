"use strict";
const stripe = require("stripe")(
  "sk_test_51KlfJgE43lPMhu5nWrh1npvSzQ35v2vDsOOzs3ErlGzJHRaStfU2PzpsaO6m5ZtW0hfdxyNAJxuo6fVGRsMacagV001y1rh9jI"
);
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
  async create(ctx) {
    const { token, products, idUser, addressShipping } = ctx.request.body;
    let totalPayment = 0;
    products.forEach((product) => {
      totalPayment = totalPayment + product.price;
    });

    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "usd",
      source: token.id,
      description: `ID Usuario: ${idUser}`,
    });

    const createOrder = [];
    for await (const product of products) {
      const data = {
        game: product.id,
        user: idUser,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };
      // const validData = await strapi.entityValidator.validateEntity(
      //   strapi.models.order,
      //   data
      // );
      const entry = await strapi.query("order").create(data);
      console.log(entry);
      createOrder.push(data);
      console.log(createOrder);
    }
    return createOrder;
  },
};
