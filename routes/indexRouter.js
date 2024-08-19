const { Router } = require('express');
const controller = require('../controllers/indexController');

const router = new Router();

router.get('/', controller.getIndex);
router.get('/new', controller.getNew);

module.exports = router;
