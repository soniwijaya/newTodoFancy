const Todo = require('../models/todo.model')
const User = require('../models/user.model')

module.exports = {
    
    createTodo ( req , res ){
        const {
            user,
            date,
            todo
        } = req.body

        Todo.create(
            {
                user,
                date,
                todo
            }
        )
        .then(todoCreate => {
            User.findById(user)
            .then(user => {
                user.todolist.push(todoCreate._id)
                User.findByIdAndUpdate(user._id, {todolist: user.todolist})
                .then(function() {
                    res.status(200).json({
                        message: 'Success Add Todos',
                        data: todoCreate,
                    })
                })
                .catch(function(err) {
                    res.status(400).json({
                        message: 'Failed add todos',
                        data: err
                    })
                })
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add Todo',
                data: err
            })
        })
    },

    viewAllTodo ( req , res ){
        User.find(
            {
                _id: req.params.id
            }
        ).populate('todolist', 'todo status date', null, { sort: { 'updatedAt': -1 } })
        .then( todo => {
            res.status(200).json({
                message: 'List Todo & User',
                data: todo
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Not Found',
                data: err
            })
        })
    },

    viewSingleTodo ( req , res ){
        Todo.find(
            {
                _id : req.params.todoId
            }
        )
        .then( todo => {
            if(todo.length==0){
                res.status(400).json({
                    message: 'Not Found'
                })
            }else{
                res.status(200).json({
                    message: 'This the single todo',
                    data: todo
                })
            }
        })
        .catch( err => {
            res.status(400).json({
                message: 'Not Found',
                data: err
            })
        })
    },

    updateTodo ( req , res ){
        Todo.update(
            {
                _id: req.params.todoId
            },
            req.body
        )
        .then( TodoUpdate => {
            res.status(200).json({
                message: 'Success Update',
                data: req.params.todoId
            })
        })
        .catch( err => {
            res.status(400).json({
                message: 'Fail to update',
                data: err
            })
        })
    },

    updateTaskTodo ( req , res ){
        Todo.update(
            {
                _id: req.params.todoId
            },
            {
                status: req.body.status
            }
        )
        .then( TodoUpdate => {
            res.status(200).json({
                message: 'Success Update status',
                data: TodoUpdate
            })
        })
        .catch( err => {
            res.status(400).json({
                message: 'Fail to update status',
                data: err
            })
        })
    },

    deleteTodo ( req , res ){
        Todo.remove(
            {
                _id: req.params.todoId
            }
        )
        .then( removeTodo => {
            res.status(200).json({
                message: 'Success Delete',
                data: req.params.todoId
            })
        })
        .catch( err => {
            res.status(400).json({
                message: 'Fail to Delete',
                data: err
            })
        })
    }
}