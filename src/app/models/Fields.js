const database = require('../../database');

const select = async (query) => {
  const [rows] = await database(query);

  return rows;
};

const create = async (data) => {
  const { object, name, type } = data;

  const query = `
    ALTER TABLE ${object}
    ADD ${name} ${type};
  `;

  const [rows] = await database(query);

  return rows;
};

module.exports = {
  select,
  create,
}
