const { createHmac } = require("crypto");

const Order = require("../models/Order");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // 1. generate the x-signature from our end
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = createHmac("sha256", process.env.BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");

  // console.log("Generated Signature", x_signature);
  // console.log("billplz_x_signature", billplz_x_signature);

  // 2. compare the generated x-signature with the one from billplz
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid");
  }

  // 3. if x-signature is match, then we update the order

  // 3.1 find the order using the billplz id
  const selectedOrder = await Order.findOne({ billplz_id: billplz_id });

  // 3.2 check if the order exists
  if (!selectedOrder) {
    throw new Error("Order not found");
  }

  // 3.3 if exists, update the order status and paid_at date
  if (billplz_paid === "true") {
    // if billplz_paid is equal to true, then payment is successful
    selectedOrder.status = "paid";
    selectedOrder.paid_at = billplz_paid_at; // when the order is paid
  } else {
    // if billplz_paid is not true, then payment is failed
    selectedOrder.status = "failed";
  }

  // 4. save the order to update
  await selectedOrder.save();

  // 5. return the updated order
  return selectedOrder;
};

module.exports = {
  verifyPayment,
};
