const router = require('express').Router()

const {
  authentication,
  authorization
} = require('../middlewares/auth')

const {
    createTodo,
    viewAllTodo,
    viewSingleTodo,
    updateTodo,
    updateTaskTodo,
    deleteTodo
  } = require('../controllers/todo.controller')

router.post('/:id', authentication, authorization, createTodo)
router.get('/:id', authentication, authorization, viewAllTodo)
router.get('/:id/:todoId', authentication, authorization, viewSingleTodo)
router.put('/:id/:todoId', authentication, authorization, updateTodo)
router.put('/status/:id/:todoId', authentication, authorization, updateTaskTodo)
router.delete('/:id/:todoId', authentication, authorization, deleteTodo)

module.exports = router;