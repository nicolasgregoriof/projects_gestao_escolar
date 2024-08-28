const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')
const createTriggers = require('./scripts/create-triggers') // Importando o script de triggers

//Models
const Users = require('./models/Users')
const Cursos = require('./models/Cursos')
const Aluno = require('./models/Alunos') 
const Professor = require('./models/Professores')
const Disciplinas = require('./models/Disciplinas')
const Disciplinas_professores = require('./models/Disciplinas_professores')
const Turmas = require('./models/Turmas')
const Turmas_disc_professores = require('./models/Turmas_disc_professores')
const Matriculas = require('./models/Matriculas')

//Import Routes
const admSchoolRoutes = require('./routes/admSchoolRoutes')

//Import Controller
const AdmSchoolController = require('./controllers/AdmSchoolController')


//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')


//receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// session middleware
app.use(
    session({
        name:"session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true //em produção precisa mudar essa configuração
        }
    }),
)

//flash messages
app.use(flash())

// public path
app.use(express.static('public'))


// set session to res
app.use((req,res,next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})


//Routes
app.use('/admschool',admSchoolRoutes)
app.get('/',AdmSchoolController.showAdmSchool)


// Sincronização do banco de dados e criação de triggers com delay
conn
    //.sync()    
    .sync({ force: true }) // força a recriação das tabelas
    .then(() => {
        // Cria os triggers após as tabelas serem criadas
        return createTriggers();
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log(err));