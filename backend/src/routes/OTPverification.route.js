import { Router } from "express";
import {
  sendOTPReceiver,
  sendOTPLender,
  verifyOTPLender,
  verifyOTPReceiver,
} from "../controllers/mailSender.controller.js";
const router = Router();
router.route("/lenderEmail").post(sendOTPLender);
router.route("/receiverEmail").post(sendOTPReceiver);
router.route("/lender/:id").post(verifyOTPLender);
router.route("/receiver/:id").post(verifyOTPReceiver);

export default router;
