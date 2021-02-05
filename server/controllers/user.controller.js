/*
 * Copyright (c) 2021.
 * Project Name: shiny-fortnight
 * Date Modified: 2/4/21, 3:57 PM
 * Company: Titan65
 * Github Repo: https://github.com/ZhyJenae/shiny-fortnight
 * Main Repo: https://github.com/titan-65
 */

import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'


/**
 * @name create
 * @description API Endpoint to create users
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const create = async (req, res, next) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * @name read \
 * @description API Endpoint
 * @param req
 * @param res
 * @returns {*}
 */
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

/**
 * @name update
 * @description API Endpoint
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)
    }  catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * @name list
 * @description API Endpoint to list all users
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * @name userByID
 * @description API Endpoint
 * @param req
 * @param res
 * @param next
 * @param id
 * @returns {Promise<*>}
 */
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}

export default {create, userByID, list, remove, read, update }