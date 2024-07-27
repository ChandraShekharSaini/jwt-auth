import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

import {postSignup} from '../controller/user.controller.js';
import {postLogin } from '../controller/user.controller.js';


router.post('/signup',postSignup );
router.post('/login',postLogin);
// router.get('/logout',);


export default router;
