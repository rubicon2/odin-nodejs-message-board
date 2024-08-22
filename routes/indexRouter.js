import express from 'express';
import * as controller from '../controllers/indexController.js';

const router = new express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', controller.getIndex);
router.get('/new', controller.getNew);
router.post('/new', controller.postNew);
router.get('/messages/:id', controller.getMessage);
router.delete('/messages/:id', controller.deleteMessage);

export default router;
