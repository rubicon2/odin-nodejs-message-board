const express = require('express');
const controller = require('../controllers/indexController');

const router = new express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', controller.getIndex);
router.get('/new', controller.getNew);
router.post('/new', controller.postNew);
router.get('/messages/:id', controller.getMessage);

module.exports = router;
