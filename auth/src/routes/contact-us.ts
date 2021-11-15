import express, { Request, Response } from "express";
import { SQS } from "aws-sdk";
import { validateRequest, BadRequestError } from "azz-prospecat";
import {GMailService} from "../utils/sendEmail";
import { body } from "express-validator";
// import AWS from "aws-sdk";
// const SESConfig = {
//   apiVersion: '2012-11-05',
//   accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,      
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,  
//   region: "eu-west-1"
// }
// AWS.config.update(SESConfig);
// let sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const Sheet = require("../utils/sheet");
const router = express.Router();

router.post("/api/users/contact",
[
    body("email").isEmail().withMessage("Email must be valid"),
  ],
  validateRequest, async (req:Request, res:Response) => {
  const { message, firstname, lastname, email } = req.body;
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRow({ email,firstname,lastname,message });
  const now = new Date().toDateString();
  try {
      let gmailService = new GMailService(); 
 
    gmailService.sendMail( 
      `azz.sahafrica@gmail.com`,  
      "[Prospecat] prospecat-message from user",
      `Hello Team,
        ${firstname} ${lastname} submitted a message from this email:${email} on ${now} and here is the message:
        ${message} `  
      ).then( (msg) => { 
        res.send({})
    } ); 
    } catch (error) {
    }

});

export { router as ContactUsRouter };
