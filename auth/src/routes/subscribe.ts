import express, { Request, Response } from "express";
// import AWS from "aws-sdk";
// const SESConfig = {
//   apiVersion: '2012-11-05',
//   accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,      
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,  
//   region: "eu-west-1"
// }
// AWS.config.update(SESConfig);

// let sqs = new AWS.SQS({apiVersion: '2012-11-05'});
import {GMailService} from "../utils/sendEmail";
const router = express.Router();
import { body } from "express-validator";
const Sheet = require("../utils/sheet");
import { validateRequest, BadRequestError } from "azz-prospecat";

router.post(
  "/api/users/subscribe",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const sheet = new Sheet();
    await sheet.load();
    const rows = await sheet.getRows();
    for(let row of rows){
      if(row.email==email)
       throw new BadRequestError("Already subscribed!", "email");
    }
    await sheet.addRow({ email });
    // await sqs
    //   .sendMessage({
    //     QueueUrl: process.env.MAIL_QUEUE_URL!,
    //     MessageBody: JSON.stringify({
    //       subject: "[Prospecat]- Thank you for your subscription.",
    //       recipient: `${email}`,
    //       body: `Hello There,Thank you for subscribing to our newpapaper,You will receive Prospecat daily news and updates
    //      `,
    //     }),
    //   })
    //   .promise();
    try {
    
      //Send verification Email
      let gmailService = new GMailService(); 
      gmailService.sendMail( 
        `${email}`,  
        "Prospecat - Thank you for your subcription.",  
        `Hi,Thank you for subscrbing to our news letter\n
        You will be receiving prospecat daily news and updates.\n
        If this wasn’t you, please ignore this email.`).then( (msg) => { 
    });
      res.send({
      success: "true",
    });
    } catch (error) {
     
    }
  }
);

export { router as SubscribeRouter };
