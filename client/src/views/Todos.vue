<template>
    <div class="todos">
        <Navbar 
            :nameuser=name
            :pictureuser=picture
            @logout-button=logout
        />

        <div class="container" style="margin-top:70px; padding:0;">
            <a data-toggle="modal" data-target="#addTodo" style="cursor:pointer">
                <button class="btn btn-primary" style="margin-bottom:15px"><span class="glyphicon glyphicon-plus"> </span> Add Todo</button>
            </a>
            <div class="col-md-12 table-responsive" style="background-color:white;">
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Date</th>
                        <th class="text-center">Check list</th>
                        <th>Spesial Day</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr is="Listtodo" 
                    v-for="listTodo in viewTodo"
                    :todo="listTodo"
                    :key="listTodo._id"
                    :format="formatDate(listTodo.date)"
                    :spesial="apiDay(formatDate(listTodo.date))"
                    @update-todo="updateTodo"
                    @delete-todo="deleteTodo"
                    >
                    </tr>
                
                </tbody>
            </table>
            </div>
        </div>

        <div id="addTodo" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add todo</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                        <label>Todo</label>
                        <input type="text" v-model="AddTodo" class="form-control">
                        </div>

                        <div class="form-group">
                        <label>Date</label>
                        <input type="date" v-model="AddDate" class="form-control">
                        </div>

                        <button @click="addTodolist" type="submit" class="btn btn-warning" data-dismiss="modal">Add Todo</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

import Navbar from '@/components/Navbar.vue'
import Listtodo from '@/components/Listtodo.vue'

export default {
    name:'todos',
    components: {
        Navbar,
        Listtodo
    },
    data: function () {
        return {
            name: '',
            picture: '',
            AddTodo: '',
            AddDate: '',
            viewTodo: [],
            spesialDay: [],
        }
    },
    created: function(){
        if(!localStorage.getItem('token')){
            this.$router.push({ name: 'home' })
        }
        this.picture = localStorage.getItem('picture')
        this.name = localStorage.getItem('name')
    },
    methods: {
        formatDate: function(date){
            return date.split('T')[0]
        },
        showTodo: function() {
            let user = localStorage.getItem('id')
            let apptoken = localStorage.getItem('token')
            axios.get(`https://apitodofancy.thismylife.net/todos/${user}`,
                {
                    headers: {
                        apptoken
                    }
                }
            )
            .then(response => {
                this.viewTodo = response.data.data[0].todolist
            })
            .catch(err => {
                swal("Your error", err.response.data.message, "error")
            })
        },
        getApi: function(){
            let api = localStorage.getItem('api')
            axios.get(`https://holidayapi.com/v1/holidays?key=${api}&country=US&year=2017`)
            .then(getday => {
                this.spesialDay = getday.data.holidays
            })
            .catch(err => {
                swal("Your error", err.response.data.message, "error")
            })
        },
        apiDay: function(date){
            let newDate = new Date(date)
            let result = `${newDate.getFullYear()-1}${date.substring(4)}`
            
            return this.spesialDay[result] == undefined ? 'not spesial day' : this.spesialDay[result][0].name
        },
        addTodolist: function() {
            let user = localStorage.getItem('id')
            let apptoken = localStorage.getItem('token')
            axios.post(`https://apitodofancy.thismylife.net/todos/${user}`,
                {
                    user,
                    todo: this.AddTodo,
                    date: this.AddDate
                },
                {
                    headers: {
                        apptoken
                    }
                }
            )
            .then(response => {
                swal("Success add!", response.data.message, "success")
                this.viewTodo.unshift(response.data.data)
            })
            .catch(err => {
                swal("Your error", err.response.data.message, "error")
            })
        },
        updateTodo: function(id,todo,date,status) {
            let user = localStorage.getItem('id')
            let apptoken = localStorage.getItem('token')
            axios.put(`https://apitodofancy.thismylife.net/todos/${user}/${id}`,
                {
                    todo,
                    date,
                    status
                },
                {
                    headers: {
                        apptoken
                    }
                }
            )
            .then(response => {
                swal("Success update!", response.data.message, "success");
                let index = this.viewTodo.findIndex(todo => todo._id == response.data.data)
                this.viewTodo[index].todo = todo
                this.viewTodo[index].date = date
                this.viewTodo[index].status = status
            })
            .catch(err => {
                swal("Your error", err.response.data.message, "error")
            })
        },
        deleteTodo: function(id){
            let user = localStorage.getItem('id')
            let apptoken = localStorage.getItem('token')

            swal({
                title: "Are you sure?",
                text: "After delete, you can't get this todo again!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://apitodofancy.thismylife.net/todos/${user}/${id}`,
                        {
                            headers: {
                                apptoken
                            }
                        }
                    )
                    .then(response => {
                        swal(response.data.message, {
                            icon: "success",
                        })
                        
                        let index = this.viewTodo.findIndex(todo => todo._id == response.data.data)
                        this.viewTodo.splice(index, 1)
                    })
                    .catch(err => {
                        swal("Your error", err.response.data.message, "error")
                    })
                } else {
                    swal("Failed remove todo")
                }
            })
            
        },
        logout: function(){
            localStorage.removeItem('id')
            localStorage.removeItem('name')
            localStorage.removeItem('picture')
            localStorage.removeItem('token')
            this.$router.push({ name: 'home' })
        }
    },
    mounted: function() {
        if (localStorage.getItem('token')) {
            this.showTodo()
            this.getApi()
        }
    }
}
</script>
