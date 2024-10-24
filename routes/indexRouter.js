import express from 'express';
import * as controller from '../controllers/indexController.js';

const router = new express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', controller.getIndex);
router.get('/new', controller.getNew);
router.post('/new', controller.postNew);
router.get('/new/rejected', controller.getRejected);
router.get('/messages/:id', controller.getMessage);
router.get('/delete/:id', controller.deleteMessage);

export default router;
