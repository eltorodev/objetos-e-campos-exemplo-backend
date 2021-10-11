const express = require('express');

const Objects = require('../models/Objects');

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const select = await Objects.select(`SHOW TABLES`);

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
    const { name } = request.body;

    const create = await Objects.create(name);

    return response
      .status(200)
      .json({
        success: true,
        data: create,
      })
  } catch (error) {
    const { errno } = error

    if (errno === 1050) {
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

module.exports = (app) => app.use('/object', router);
