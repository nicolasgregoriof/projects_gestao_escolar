const express = require('express')
const router = express.Router()
const AdmSchoolController = require('../controllers/AdmSchoolController')

//controller

router.get('/', AdmSchoolController.showAdmSchool)

module.exports = router