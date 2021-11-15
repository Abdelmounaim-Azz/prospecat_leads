import express from "express";
const router = express.Router();
import { currentUser } from 'azz-prospecat';
router.post("/api/users/signout",currentUser, (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
