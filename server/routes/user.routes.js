/*
 * Copyright (c) 2021.
 * Project Name: shiny-fortnight
 * Date Modified: 2/4/21, 2:36 PM
 * Company: Titan65
 * Github Repo: https://github.com/ZhyJenae/shiny-fortnight
 * Main Repo: https://github.com/titan-65
 */


import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router