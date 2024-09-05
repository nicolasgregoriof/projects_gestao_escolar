const User_adm = require('../models/Users_adm')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')


module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req,res) {
        const {email, senha} = req.body

        //find user
        const user = await User_adm.findOne({where: {email:email}})

        //check if email match
        if(!user){
            req.flash('message','Usuário não encontrado!')
            res.render('auth/login')
            return;
        }

        //check if password match

        const passwordMatch = bcrypt.compareSync(senha,user.senha)

        if(!passwordMatch) {
            req.flash('message','Senha inválida!')
            res.render('auth/login')
            return;           
        }

        try{
            // initialize session
            req.session.userid = user.id

            req.flash('message','Autenticação realizada com sucesso!')


            req.session.save(() => {
                res.redirect('/')
            })
            
        } catch(err){
            console.log(err)
        }

    }

    static register(req,res){
        res.render('auth/register')
    }

    static async registerPost(req,res){
        const{name, email, senha, confirmpassword, telefone, tipo} = req.body

        // password macth validation
        if(senha != confirmpassword){
            req.flash('message','As senhas não conferem, tente novamente')
            res.render('auth/register')
            return;
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: {email: email}})
        
        if(checkIfUserExists){
            req.flash('message','O e-mail já está em uso!')
            res.render('auth/register')
            return;
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha,salt)

        const user = {
            name,
            email,
            senha: hashedPassword,
            telefone,
            tipo,
        }

        try{
            const createdUser = await User.create(user)
            req.flash('message','Cadastro realizado com sucesso!')
            req.session.save(() => {
               res.redirect('/register')
            })   
        } catch(err){
            console.log(err)
        }

    }

    static registerAdm(req,res){
        res.render('auth/register_adm')
    }

    static async registerAdmPost(req,res){
        const{name, email, senha, confirmpassword} = req.body

        // password macth validation
        if(senha != confirmpassword){
            req.flash('message','As senhas não conferem, tente novamente')
            res.render('auth/register_adm')
            return;
        }

        // check if user exists
        const checkIfUserExists = await User_adm.findOne({ where: {email: email}})
        
        if(checkIfUserExists){
            req.flash('message','O e-mail já está em uso!')
            res.render('auth/register_adm')
            return;
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha,salt)

        const user = {
            name,
            email,
            senha: hashedPassword,
        }

        try{
            const createdUser = await User_adm.create(user)
            
            req.session.userid = createdUser.id

            req.flash('message','Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })    
        } catch(err){
            console.log(err)
        }

    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
}