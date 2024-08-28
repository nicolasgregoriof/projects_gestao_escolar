const Matriculas = require('../models/Matriculas')
const Users = require('../models/Users')

module.exports = class AdmSchoolController {
    static async showAdmSchool(req,res){
        res.render('admschool/home')
    }
}