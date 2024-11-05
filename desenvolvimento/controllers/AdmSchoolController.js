const Matriculas = require('../models/Matriculas')
const Users = require('../models/Users')
const Cursos = require('../models/Cursos')
const Disciplinas = require('../models/Disciplinas')
const Professores = require('../models/Professores')
const Disciplinas_professores = require('../models/Disciplinas_professores')
const Turmas = require('../models/Turmas')
const Turmas_disc_professores = require('../models/Turmas_disc_professores')
const { Sequelize } = require('sequelize')

module.exports = class AdmSchoolController {
    static async showAdmSchool(req,res){
        res.render('admschool/home')
    }
    
    static async cadCurso (req,res){
        res.render('admschool/cadcurso')
    }

    static async cadCursoPost(req,res) {
        const {nomecurso, qtdesemestres} = req.body

        const curso = {
            nome: nomecurso,
            qtde_semestre: qtdesemestres,
        }

        try{
            const createdCurso = await Cursos.create(curso)
            
            req.flash('message','Cadastro realizado com sucesso!')


            req.session.save(() => {
                res.redirect('/admschool/cadcurso')
            })
            
        } catch(err){
            console.log(err)
        }
    }

   
    //TRABALHANDO A PARTE DO CADASTRO DISCIPLINA  
    static async cadDisciplina (req,res){
        // Buscando cursos únicos com base no nome
        const cursos = await Cursos.findAll({
            attributes: ['id','nome'],
            group: ['id','nome']
        });

        // Transformando os dados para JSON
        const cursosData = cursos.map(item => item.toJSON());

        

        // Renderizando a view com a lista de cursos
        res.render('admschool/caddisciplina', { cursos: cursosData });
    }    

    static async cadDisciplinaPost(req, res) {
        const { nomedisciplina, cursodadiscilina, semestredisciplina} = req.body;
        
        const curso = await Cursos.findByPk(cursodadiscilina);
        const nome_curso = curso ? curso.nome : '';
        
        const disciplina = {
            nome: nomedisciplina,
            id_curso: cursodadiscilina, 
            semestre: semestredisciplina,
            nome_curso: nome_curso
        };
    
        try {
            // Supondo que você tenha um modelo para disciplinas
            await Disciplinas.create(disciplina);
    
            req.flash('message', 'Disciplina cadastrada com sucesso!');
            
            req.session.save(() => {
                res.redirect('/admschool/caddisciplina');
            })

        } catch (err) {
            console.error('Erro ao cadastrar disciplina:', err);
            req.flash('error', 'Erro ao cadastrar a disciplina. Tente novamente.');
            res.redirect('/admschool/caddisciplina');
        }
    }

    
    //TRABALHANDO A PARTE DO VINCULO
    static async cadVinculoprofessor (req,res){

        const cursos = await Cursos.findAll({
            attributes: ['id','nome'],
            group: ['id','nome']
        });

        const professores = await Professores.findAll({
            attributes: ['id','nome_user'],
            group: ['id','nome_user']
        })

        const cursosData = cursos.map(item => item.toJSON());    
        const professoresData = professores.map(item => item.toJSON());

        res.render('admschool/cadvinculoprofessor', {
            cursos: cursosData,
            professores: professoresData,

        })
    }

    static async fetchDisciplinasByCurso(req, res) {
        const { cursoId } = req.params;
    
        try {
            // Buscando disciplinas associadas ao curso
            const disciplinas = await Disciplinas.findAll({
                where: { id_curso: cursoId },
                attributes: ['id', 'nome']
            });
    
            const disciplinasData = disciplinas.map(item => item.toJSON());
    
            res.json(disciplinasData);
        } catch (err) {
            console.error('Erro ao buscar disciplinas:', err);
            res.status(500).json({ error: 'Erro ao buscar disciplinas' });
        }
    }

    static async cadVinculoprofessorPost(req,res){
        const { nomecurso, nomedisciplina, nomeprofessor} = req.body;

        const disciplina = await Disciplinas.findByPk(nomedisciplina);
        const professor = await Professores.findByPk(nomeprofessor);
                 
        const vinculo_disciplina = {
            id_disciplina: disciplina.id,
            id_professor: professor.id,
        };
        
        try {
            // Supondo que você tenha um modelo para disciplinas
            await Disciplinas_professores.create(vinculo_disciplina);
    
            req.flash('message', 'Vinculo cadastrado com sucesso!');
            
            req.session.save(() => {
                res.redirect('/admschool/cadvinculoprofessor');
            })

        } catch (err) {
            console.error('Erro ao cadastrar vinculo:', err);
            req.flash('error', 'Erro ao cadastrar o vínculo. Tente novamente.');
            res.redirect('/admschool/cadvinculoprofessor');
        }
    }
  

    
    //INICIO TURMAS
    static async cadTurmas (req,res){
        
        const cursos = await Cursos.findAll({
            attributes: ['id','nome'],
            group: ['id','nome']
        });

        const cursosData = cursos.map(item => item.toJSON());
        
        res.render('admschool/cadturmas', {
            cursos: cursosData
        })
    }


    static async cadTurmasPost (req,res){
        const { codcurso,codturma, anoturma, semestredisciplina} = req.body;

        const turma = {
            cod_curso: codcurso,
            cod_turma: codturma,
            ano: anoturma, 
            semestre: semestredisciplina,
        };

        try {
            // Supondo que você tenha um modelo para disciplinas
            await Turmas.create(turma);
    
            req.flash('message', 'Turma cadastrada com sucesso!');
            
            req.session.save(() => {
                res.redirect('/admschool/cadturmas');
            })

        } catch (err) {
            console.error('Erro ao cadastrar turma:', err);
            req.flash('error', 'Erro ao cadastrar a turma. Tente novamente.');
            res.redirect('/admschool/cadturmas');
        }
    }


    //VINCULO DAS TURMAS
    static async cadVinculoturmas (req,res){
        const professores = await Professores.findAll({
            attributes: ['id','nome_user'],
            group: ['id','nome_user']
        })
    
        const professoresData = professores.map(item => item.toJSON());
        
        res.render('admschool/cadvinculoturmas', {
            professores: professoresData,

        })
    }
    
    static async fetchProfessorByCurso(req, res) {
        const { professorId } = req.params;
        
        try {
            // Buscando disciplinas associadas ao professor
            const disciplinas = await Disciplinas_professores.findAll({
                where: { id_professor: professorId },
                attributes: ['id_disciplina']
            });

            // Extraindo ids das disciplinas
            const disciplinaIds = disciplinas.map(item => item.id_disciplina);
            
            if (disciplinaIds.length === 0) {
                return res.json([]); 
            }

            // Buscando Curso associadas a disciplina
            const cursos = await Disciplinas.findAll({
                where: { id: disciplinaIds },
                attributes: ['id_curso']
            });

            const cursosData = cursos.map(item => item.id_curso);

            const cursosName = await Cursos.findAll({
                where: {id: cursosData},
                attributes: ['id','nome']
            })

            const cursosNameData = cursosName.map(item => item.toJSON());
    
            res.json(cursosNameData);
            console.log(cursosNameData)

        } catch (err) {
            console.error('Erro ao buscar cursos:', err);
            res.status(500).json({ error: 'Erro ao buscar cursos'});
        }
    }

    static async fetchCursoByDisciplina(req, res) {
        const { cursoId,professorId } = req.params;

        try {
            // Buscando disciplinas associadas ao curso
            const disciplinas = await Disciplinas.findAll({
                where: { id_curso: cursoId },
                attributes: ['id','nome']
            });

            // Extraindo ids das disciplinas
            const disciplinaIds = disciplinas.map(item => item.id);
            
            if (disciplinaIds.length === 0) {
                return res.json([]); // Se não houver disciplinas, retorna um array vazio
            }

            console.log(professorId)

            // Buscando disciplina associada a professor
            const disc_professor = await Disciplinas_professores.findAll({
                where: { 
                    id_disciplina : disciplinaIds,
                    id_professor: professorId,
                
                },
                attributes: ['id','id_disciplina'],
            });

            const disc_professorIds = disc_professor.map(item => item.id_disciplina);

            // Buscando disciplinas pelos nomes

            const relacaoDisciplinas = await Disciplinas.findAll({
                where:{
                    id: disc_professorIds
                },
                attributes: ['id','nome'],
            })

            const relDisciplinas = relacaoDisciplinas.map(item => item.toJSON());
    
            res.json(relDisciplinas);

        } catch (err) {
            console.error('Erro ao buscar disciplinas:', err);
            res.status(500).json({ error: 'Erro ao buscar disciplinas'});
        }

    }

    static async fetchAnobyCurso (req,res){
        const { cursoId } = req.params;

        try{
        // Buscando ano associados ao curso

        const anos = await Turmas.findAll({
            where: { cod_curso: cursoId },
            attributes: ['cod_curso','ano'],
            group: ['cod_curso','ano']
        });

        // Extraindo ids das disciplinas
        const anoIds = anos.map(item => item.toJSON());
        
        if (anos.length === 0) {
            return res.json([]); // Se não houver disciplinas, retorna um array vazio
        }

        console.log(anoIds)

        res.json(anoIds);
    
        } catch (err){

        }
    }

    static async fetchSemestreByCurso (req,res){
        const {cursoId,anoId} = req.params;
        
        console.log(cursoId);
        
        try{
            const semestres = await Turmas.findAll({
                where: { 
                    cod_curso: cursoId,
                    ano: anoId
                },
                attributes: ['ano','semestre'],
                group: ['ano','semestre']
            });
    
            // Extraindo ids das disciplinas
            const semestreIds = semestres.map(item => item.toJSON());
            
            if (semestres.length === 0) {
                return res.json([]); // Se não houver disciplinas, retorna um array vazio
            }

            console.log(semestreIds)
            res.json(semestreIds);
        }catch (err) {

        }
    }

    static async fetchSufixo(req,res){
        const {vinc_semestre,course,year} = req.params;

        const sufixos = await Turmas.findAll({
            where: {
                semestre: vinc_semestre,
                cod_curso: course,
                ano: year
            },
            attributes: ['cod_turma']
        });

        const sufixosIds = sufixos.map(item => item.toJSON());

        if (sufixos.length === 0) {
            return res.json([]); // Se não houver disciplinas, retorna um array vazio
        }

        res.json(sufixosIds);
    }

    static async cadVinculoturmasPost (req,res){
        const { vinc_curso, 
                vinc_disciplina,
                vinc_nomeprofessor, 
                vinc_anocontrole,
                vinc_semestre,
                vinc_sufturma,
                } = req.body;
        
        const turma = {
            t_curso: vinc_curso,
            t_disciplina: vinc_disciplina,
            t_professor: vinc_nomeprofessor, 
            t_ano: vinc_anocontrole,
            t_semestre: vinc_semestre,
            t_sufixo: vinc_sufturma
        };

        try {
            // Supondo que você tenha um modelo para disciplinas
            await Turmas_disc_professores.create(turma);
    
            req.flash('message', 'Turma cadastrada com sucesso!');
            
            req.session.save(() => {
                res.redirect('/admschool/cadvinculoturmas');
            })

        } catch (err) {
            console.error('Erro ao cadastrar turma:', err);
            req.flash('error', 'Erro ao cadastrar a turma. Tente novamente.');
            res.redirect('/admschool/cadvinculoturmas');
        }
    }


    //MATRICULA
    static async cadMatriculas (req,res){      

        const cursos = await Turmas_disc_professores.findAll({
            attributes: [
                't_curso',
                [Sequelize.literal(`(SELECT nome FROM Cursos WHERE Cursos.id = Turmas_disc_professores.t_curso)`), 'curso_name'] // Consulta manual para pegar o nome do curso
            ],
            group: ['t_curso'],
        })
                  
        const cursosData = cursos.map(item => item.toJSON());
        
        res.render('admschool/cadmatriculas',{
            cursos: cursosData
        })
    }

    static async fetchNome(req,res){
        
        const {mat_id_aluno} = req.params;

        try{
            const nomes = await Users.findAll({
                where: {
                    email: mat_id_aluno,
                },
                attributes: ['name']
            })

            const namesIds = nomes.map(item => item.toJSON());

            if (nomes.length === 0) {
                req.flash('error', 'E-mail incorreto ou não encontrado. Tente novamente.');
                return res.redirect('/admschool/cadmatriculas');         
            }


            res.json(namesIds);
        
        } catch (error) {
            console.error('Erro ao buscar nome:', error);
            req.flash('message', 'Erro ao buscar informações. Tente novamente.');
            return res.redirect('/admschool/cadmatriculas');  // Redirecione para a página onde o formulário está
        }
    }

    static async fetchC(req,res){
        const {id_curso} = req.params
        const disc = await Turmas_disc_professores.findAll({
            attributes:['t_disciplina'],
            where:{t_curso:id_curso},
            group: ['t_disciplina']
        })

        const discData = disc.map(item => item.t_disciplina)

        const discName = await Disciplinas.findAll({
            attributes:['id','nome'],
            where: {id:discData}
        })

        const discDatafinal = discName.map(item => item.toJSON())

        res.json(discDatafinal);
    }

    static async fetchS(req,res){

        const {id_ano, id_curso, id_disciplina} = req.params

        const sufixo = await Turmas_disc_professores.findAll({
            attributes:['t_sufixo'],
            where:{
                t_ano:id_ano,
                t_curso: id_curso,
                t_disciplina: id_disciplina
            },
            group: ['t_sufixo']
        })

        const sufixoData = sufixo.map(item => item.toJSON())

        res.json(sufixoData)
    }

    static async cadMatriculasPost (req,res){
        const { 
            mat_nome_aluno,
            mat_ano,
            mat_sem,
            cursodadiscilina, 
            mat_disciplina, 
            mat_sufixo,
                } = req.body;
        
        const mat = {
            mat_aluno: mat_nome_aluno,
            mat_ano: mat_ano,
            mat_semestre: mat_sem,
            mat_curso: cursodadiscilina, 
            mat_disciplina: mat_disciplina,
            mat_sufturma: mat_sufixo,
        };

        try {
            // Supondo que você tenha um modelo para disciplinas
            await Matriculas.create(mat);
    
            req.flash('message', 'Matrícula realizada com sucesso!');
            
            req.session.save(() => {
                res.redirect('/admschool/cadmatriculas');
            })

        } catch (err) {
            console.error('Erro ao cadastrar turma:', err);
            req.flash('error', 'Erro ao realizar a matricula. Tente novamente.');
            res.redirect('/admschool/cadvinculoturmas');
        }
    }

    static async showMatriculas (req,res){

        const matriculasData = await Matriculas.findAll({
            attributes: ['mat_ano'],
            group: ['mat_ano'],
        })

        const allanos = matriculasData.map(item => item.toJSON());

        //Aqui começa a busca
        const { id_ano, id_curso, id_semestre } = req.query;
        
        let allmat = [];

       // Verificar se o parâmetro obrigatório 'id_ano' foi fornecido
        if (id_ano) {
            // Criando o objeto 'where' dinamicamente
            const whereConditions = {
                mat_ano: id_ano, // 'id_ano' é obrigatório
            };

            // Adicionando condições opcionais se fornecidas
            if (id_curso) {
                whereConditions.mat_curso = id_curso;
            }
            if (id_semestre) {
                whereConditions.mat_semestre = id_semestre;
            }

            // Consulta usando sequelize.literal para adicionar JOINs
            const matriculas = await Matriculas.findAll({
                attributes: [
                    'id',
                    'mat_aluno',
                    'mat_ano',
                    'mat_semestre',
                    'mat_sufturma',
                    [Sequelize.literal(`(SELECT nome FROM Cursos WHERE Cursos.id = Matriculas.mat_curso)`), 'curso_nome'],
                    [Sequelize.literal(`(SELECT nome FROM Disciplinas WHERE Disciplinas.id = Matriculas.mat_disciplina)`), 'disciplina_nome']
                ],
                where: whereConditions, // Utilizando as condições dinâmicas
            });

            allmat = matriculas.map(item => item.toJSON());
        }

        res.render('admschool/showmatriculas', {anos: allanos, matriculas:allmat})
    }

    static async fetchRelSemestre(req,res){
        const {id_ano} = req.params

        const semestre = await Matriculas.findAll({
            attributes:['mat_semestre'],
            where:{
                mat_ano: id_ano,
            },
            group: ['mat_semestre']
        })

        const semestreData = semestre.map(item => item.toJSON())

        res.json(semestreData)
    }

    static async fetchRelCurso(req,res){
        const {id_semestre,id_ano} = req.params

        const curso = await Matriculas.findAll({
            attributes:['mat_curso'],
            where:{
                mat_semestre: id_semestre,
                mat_ano: id_ano,
            },
            group: ['mat_curso']
        })

        const curso_id = curso.map(item => item.mat_curso)

        const nome_curso = await Cursos.findAll({
            attributes:['id','nome'],
            where:{
                id :curso_id
            }
        })

        const names = nome_curso.map(item => item.toJSON())
        res.json(names)
    }
}
