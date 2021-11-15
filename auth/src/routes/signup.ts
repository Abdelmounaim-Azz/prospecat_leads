import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import normalize from "normalize-url";
import {GMailService} from "../utils/sendEmail";
import { validateRequest, BadRequestError } from "azz-prospecat";
import { User } from "../models/user";
import * as crypto from "crypto";
import { commonPasswords } from "../utils/common";
const router = express.Router();
// import AWS from "aws-sdk";
// const SESConfig = {
//   apiVersion: '2012-11-05',
//   accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,      
//   secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,  
//   region: "eu-west-1"
// }
// AWS.config.update(SESConfig);
// let sqs = new AWS.SQS({apiVersion: '2012-11-05'});

router.post(
  "/api/users/signup",
  [
    body("name").trim().escape().isLength({ min: 3 }),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .not()
      .isIn(commonPasswords)
      .withMessage("Password commonly used on other websites")
      .isLength({ min: 8 })
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingName = await User.findOne({ name });

    if (existingEmail) {
      throw new BadRequestError("Email already taken", "email");
    }
    if (existingName) {
      throw new BadRequestError("Username already exists", "name");
    }
 
    const emailVerificiationCode = crypto.randomBytes(20).toString("hex");
    const avatar = normalize(
      gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    const user = User.build({
      name,
      email,
      password,
      emailCode: emailVerificiationCode,
      avatar,
    });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        name: user.name,
        id: user.id,
        email: user.email,
        validated: user.validated,
        emailCode: user.emailCode,
        dateCreated: user.dateCreated,
        avatar: user.avatar,
      },
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: userJwt
    };
  try {
    
      //Send verification Email
      const emailValidationUrl = `https://www.prospecat.com/emails/confirm-verification/${user.emailCode}`;
      let gmailService = new GMailService(); 
      gmailService.sendMail( 
        `${user.email}`,  
        "Prospecat Please verify your email address.",  
        `Almost done,${user.name}!To complete your Prospecat sign up,we just need  to verify your email address:\n${user.email}\nOnce verified, you can start using all of Prospecat's services to find and search for lead.\nPaste the following link into your browser:\n${emailValidationUrl}\n
        You will be asked to log in again to make sure it is you.\n
        You’re receiving this email because you recently created a new Prospecat account . If this wasn’t you, please ignore this email.`).then( () => { 
    });
      res.status(201).send(user);
    } catch (error) {
      delete user.emailCode;
      await user.save({ validateBeforeSave: false });
    }
    } 
);

export { router as signupRouter };
