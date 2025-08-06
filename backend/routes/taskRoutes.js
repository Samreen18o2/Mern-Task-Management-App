const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.get('/getTasks', auth, getTasks);
router.post('/createTask', auth, createTask);
router.put('/updateTask:id', auth, updateTask);
router.delete('/deleteTask:id', auth, deleteTask);

module.exports = router;
