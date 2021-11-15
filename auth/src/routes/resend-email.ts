import express from "express";
import { currentUser } from "../middleware/currentUser";
import { BadRequestError, NotAuthorizedError } from "azz-prospecat";
import {GMailService} from "../utils/sendEmail";

// import AWS from "aws-sdk";
// const SESConfig = {
//   apiVersion: '2012-11-05',
//   accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,      
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,  
//   region: "eu-west-1"
// }
// AWS.config.update(SESConfig);
// let sqs = new AWS.SQS({apiVersion: '2012-11-05'});
require("dotenv").config();
const router = express.Router();

router.post("/api/users/resend-email", currentUser, async (req, res) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
 try {
    //Send verification Email
    const emailValidationUrl = `https://www.prospecat.com/emails/confirm-verification/${req.currentUser.emailCode}`;
    let gmailService = new GMailService(); 
    gmailService.sendMail( 
      `${req.currentUser.email}`,  
      "[Prospecat] Please verify your email address.",  
      `Almost done,${req.currentUser.name}!To complete your Prospecat sign up,we just need  to verify your email address:\n${req.currentUser.email}\nOnce verified, you can start using all of Prospecat's services.\nPaste the following link into your browser:\n${emailValidationUrl}\n
      You will be asked to log in again to make sure it is you.\n
      You’re receiving this email because you recently created a new Prospecat account. If this wasn’t you, please ignore this email.`).then( (msg) => { 
  });
  return res.send({message:"Email has been resent!Check your Email."})
  } catch (error) {
    throw new BadRequestError("email has not been resent!Try another Time.","email")
  }

});
export { router as resendEmailRouter };
