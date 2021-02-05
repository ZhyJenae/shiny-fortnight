/*
 * Copyright (c) 2021.
 * Project Name: shiny-fortnight
 * Date Modified: 2/4/21, 5:06 PM
 * Company: Titan65
 * Github Repo: https://github.com/ZhyJenae/shiny-fortnight
 * Main Repo: https://github.com/titan-65
 */

import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/signin')
    .post(authCtrl.signin)
router.route('/auth/signout')
    .get(authCtrl.signout)

export default router