const express = require('express')
const router = express.Router()
const AdmSchoolController = require('../controllers/AdmSchoolController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', AdmSchoolController.showAdmSchool);

router.get('/cadcurso',checkAuth, AdmSchoolController.cadCurso);
router.post('/cadcurso',checkAuth, AdmSchoolController.cadCursoPost);

router.get('/caddisciplina',checkAuth, AdmSchoolController.cadDisciplina);
router.post('/caddisciplina',checkAuth, AdmSchoolController.cadDisciplinaPost);

router.get('/cadvinculoprofessor',checkAuth, AdmSchoolController.cadVinculoprofessor);
router.get('/fetch-disciplinas/:cursoId', checkAuth, AdmSchoolController.fetchDisciplinasByCurso);
router.post('/cadvinculoprofessor',checkAuth, AdmSchoolController.cadVinculoprofessorPost);

router.get('/cadturmas',checkAuth, AdmSchoolController.cadTurmas);
router.post('/cadturmas',checkAuth, AdmSchoolController.cadTurmasPost);

router.get('/cadvinculoturmas',checkAuth, AdmSchoolController.cadVinculoturmas);
router.get('/fetch-professor-curso/:professorId',checkAuth, AdmSchoolController.fetchProfessorByCurso);
router.get('/fetchCursoByDisciplina/:cursoId/:professorId',checkAuth, AdmSchoolController.fetchCursoByDisciplina);
router.get('/fetch-turma-ano/:cursoId', checkAuth, AdmSchoolController.fetchAnobyCurso);
router.get('/fetch-semestre/:anoId/:cursoId',checkAuth,AdmSchoolController.fetchSemestreByCurso);
router.get('/fetch-busca-sufixo/:vinc_semestre/:course/:year',checkAuth,AdmSchoolController.fetchSufixo);
router.post('/cadvinculoturmas',checkAuth, AdmSchoolController.cadVinculoturmasPost);

router.get('/cadmatriculas',checkAuth, AdmSchoolController.cadMatriculas);
router.get('/fetch-nome/:mat_id_aluno',checkAuth, AdmSchoolController.fetchNome);
router.get('/fetch-c/:id_curso',checkAuth,AdmSchoolController.fetchC);
router.get('/fetch-s/:id_ano/:id_curso/:id_disciplina',checkAuth,AdmSchoolController.fetchS);
router.post('/cadmatriculas',checkAuth, AdmSchoolController.cadMatriculasPost);

router.get('/showmatriculas',checkAuth, AdmSchoolController.showMatriculas);
router.get('/fetch-rel-semestre/:id_ano',checkAuth, AdmSchoolController.fetchRelSemestre);
router.get('/fetch-rel-curso/:id_semestre/:id_ano',checkAuth, AdmSchoolController.fetchRelCurso);

module.exports = router