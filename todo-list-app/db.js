const { Pool } = require('pg'); 
// Classe utilizada para criar conexões com postgres

// Conectando com o bancO de dados postgres
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;
// Exportando os módulos para utilizar nos outros arq.
