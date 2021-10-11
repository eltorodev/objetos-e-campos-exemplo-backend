const express = require('express');

const Fields = require('../models/Fields');

const router = express.Router();

router.get('/:object', async (request, response) => {
  try {
    const { object } = request.params;

    const select = await Fields.select(`SHOW COLUMNS FROM ${object}`);

    return response
      .status(200)
      .json({
        success: true,
        data: select,
      })
  } catch (error) {
    return response
      .status(500)
      .json({
        success: false,
        data: error,
      });
  }
});

router.post('/create', async (request, response) => {
  try {
    const { object, name, type } = request.body;

    const create = await Fields.create({ object, name, type });

    return response
      .status(200)
      .json({
        success: true,
        data: create,
      })
  } catch (error) {
    console.log(error)
    const { errno } = error

    if (errno === 1060) {
      return response
        .status(200)
        .json({
          success: false,
          message: error.message,
        });
    }

    return response
      .status(500)
      .json({
        success: false,
        data: error,
      });
  }
});

module.exports = (app) => app.use('/field', router);
