<template>
    <tr>
        <td><input type="text" class="form-control" v-model="listTodo" /></td>
        <td><input type="date" class="form-control" v-model="listTodoDate" /></td>
        <td class="text-center"><input type="checkbox" v-model="listTodoCheck" /></td>
        <td>{{ spesial }}</td>
        <td>
            <button @click="updateTodo" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span></button>
            <button @click="deleteTodo" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'listtodo' ,
    props: ['todo', 'format','spesial'],
    data: function(){
        return {
            listTodo: this.todo.todo,
            listTodoDate: this.format,
            listTodoCheck: this.todo.status
        }
    },
    methods: {
       updateTodo: function(){
           this.$emit('update-todo',this.todo._id,this.listTodo,this.listTodoDate,this.listTodoCheck)
       },
       deleteTodo: function(){
           this.$emit('delete-todo',this.todo._id)
       }
    }
}
</script>

<style>

</style>
