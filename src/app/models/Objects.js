const database = require('../../database');

const select = async (query) => {
  const [rows] = await database(query);

  return rows;
};

const create = async (name) => {
  const query = `
    CREATE TABLE ${name} (
      id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY
    )
  `;

  const [rows] = await database(query);

  return rows;
};

module.exports = {
  select,
  create,
}
