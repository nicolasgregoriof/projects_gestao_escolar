const { Sequelize } = require('sequelize');
const db = require('../db/conn'); 

async function createTriggers() {
    try {
        await db.authenticate();
        console.log('Trigger - Conexão com o banco de dados bem-sucedida.');

        const createAlunosTrigger = `
            CREATE TRIGGER after_user_insert_alunos
            AFTER INSERT ON Users
            FOR EACH ROW
            BEGIN
                IF NEW.tipo = 'ALUNO' THEN
                    INSERT INTO Alunos (id_user, nome_user)
                    VALUES (NEW.id, NEW.name);
                END IF;
            END;
        `;

        const createProfessoresTrigger = `
            CREATE TRIGGER after_user_insert_professores
            AFTER INSERT ON Users
            FOR EACH ROW
            BEGIN
                IF NEW.tipo = 'PROFESSOR' THEN
                    INSERT INTO Professores (id_user, nome_user)
                    VALUES (NEW.id, NEW.name);
                END IF;
            END;
        `;
        const createDisciplinaProcedure = `
        CREATE PROCEDURE AtualizarNomeCurso()
        BEGIN
            -- Atualiza o nome_curso na tabela Disciplinas
            UPDATE Disciplinas d
            JOIN Cursos c ON d.id_curso = c.id
            SET d.nome_curso = c.nome
            WHERE d.nome_curso IS NULL
                AND d.id_curso IS NOT NULL
                AND c.nome IS NOT NULL;
        END 
        `;
        
        const callScheduleNomeCurso = `
        CREATE EVENT atual_nome_curso
        ON SCHEDULE EVERY 10 SECOND
        DO
        BEGIN
            -- Chama a procedure para atualizar nome_curso
            CALL AtualizarNomeCurso();
        END
        `;

        // Execute os comandos para criar os triggers
        await db.query(createAlunosTrigger);
        await db.query(createProfessoresTrigger);
        await db.query(createDisciplinaProcedure);
        await db.query(callScheduleNomeCurso);

        console.log('Triggers criados com sucesso.');
    } catch (error) {
        console.error('Erro ao criar triggers:', error);
    } finally {
        await db.close();
    }
}

module.exports = createTriggers;
