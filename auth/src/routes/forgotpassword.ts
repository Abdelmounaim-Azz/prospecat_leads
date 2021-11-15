import express, { Request, Response, NextFunction } from "express";
import { BadRequestError, validateRequest } from "azz-prospecat";
import {GMailService} from "../utils/sendEmail";
import { User } from "../models/user";
import { body } from "express-validator";
// import AWS from "aws-sdk";
// const SESConfig = {
//   apiVersion: '2012-11-05',
//   accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,      
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,  
//   region: "eu-west-1"
// }
// AWS.config.update(SESConfig);
// import { SQS } from "aws-sdk";
// require("dotenv").config();
// const sqs = new SQS();
import * as crypto from "crypto";
const router = express.Router();

router.post(
  "/api/users/forgotpassword",
  [
    body("email")
      .isEmail()
      .withMessage(
        "That address is not a verified primary email or is not associated with a personal user account."
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError(
        "That address is not a verified primary email or is not associated with a personal user account.",
        "email"
      );
    }
    // Get reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.set({
      resetPasswordToken: resetToken,
      resetPasswordExpires: Date.now() + 86400,
    });
    await user.save({ validateBeforeSave: false });
    // Create reset url
    const resetUrl = `https://www.prospecat.com/password_reset/${resetToken}`;
    try {
      let gmailService = new GMailService(); 
 
    gmailService.sendMail( 
      `${user.email}`,  
      "[Prospecat] Reset your password Now",  
      `Hello ${user.name}!\n\n
      We heard that you lost your Prospecat password. Sorry about that!



      But don’t worry! You can use the following link to reset your password:\n\n
      ${resetUrl}\n\n
      If you didn't request this, please ignore this email. Your password will stay safe and won't be changed.`).then( (msg) => { 
        res.send({success:true,
        data:resetUrl})
    } ); 
    } catch (error) {
      delete user.resetPasswordToken;
      delete user.resetPasswordExpires;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestError('Message has not been sent.Please try another time.','email');
    }

  }
);

export { router as forgotpasswordRouter };
