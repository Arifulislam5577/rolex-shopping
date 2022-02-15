import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
const stripe = new Stripe(
  "sk_test_51KR8gLImRiQekfxwt2huNRLr0ZZdvr3GcDvPOwnTeO3Um7o1ASjA3flTHSCd5qh0Q6HznOFdRk4MMLHYBwYI8gpN00sEVjZ1Ar"
);
const router = express.Router();

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount * 100,
      currency: "usd",
    },
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

export default router;
