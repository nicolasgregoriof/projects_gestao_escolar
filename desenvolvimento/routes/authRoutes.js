const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

//controller

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.get('/register_adm', AuthController.registerAdm)
router.post('/register_adm', AuthController.registerAdmPost)


router.get('/logout', AuthController.logout)

module.exports = router