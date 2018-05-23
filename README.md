# TODO FANCY

### REST API SERVER

 List of user & todo routes:

 Route | HTTP | Description | Parameter
 ----- | ---- | ----------- | ---------
 [/users](/users) | POST | for register new user | email: string, password: string
 [/users/login](/users/login) | POST | Signin in todo | email: string, password: string
 [/todos/:id](/todos/:id) | POST | for create new todo ( Authenticated user only) | apptoken: headers, user: string, todo: string
 [/todos/:id](/todos/:id) | GET | for view all todo list ( Authenticated user only) | apptoken: headers
 [/todos/:id/:todoId](/todos/:id/:todoId) | GET | for single view todo ( Authenticated user only) | apptoken: headers
 [/todos/:id/:todoId](/todos/:id/:todoId) | PUT | for update single list todo ( Authenticated user only) | apptoken: headers, todo: string
 [/todos/status/:id/:todoId](/todos/:id/:todoId) | PUT | for update single status todo ( Authenticated user only) | apptoken: headers, status: boolean
 [/todos/:id/:todoId](/todos/:id/:todoId) | DELETE | for delete single list todo ( Authenticated user only) | apptoken: headers, status: boolean


### Link API
https://todofancy.thismylife.net/

### Admin Account
email : hacktiv@hacktiv.com
password: 123456a

### Usage
With only npm:
```
npm install
npm start
```

Access the API via http://apitodofancy.thismylife.net/.

### Response
Register http://apitodofancy.thismylife.net/users

```
{
	"message": "Success registration",
	"data": {
		"todolist": [],
		"_id": "5aeef3d5b5899e7183d08be4",
		"email": "soni@hacktiv.com",
		"password": "$2a$10$ivxfJIAcQfyRQFj4C53mAeKmtrn7y6FGyQtsDlus3BHq.Vavp.S.i",
		"createdAt": "2018-05-06T12:23:49.991Z",
		"updatedAt": "2018-05-06T12:23:49.991Z",
		"__v": 0
	}
}
```

Login http://apitodofancy.thismylife.net/users/login

```
{
	"message": "You are sign",
	"data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZWVmM2Q1YjU4OTllNzE4M2QwOGJlNCIsImlhdCI6MTUyNTYwOTQ2OH0.f0fiNUNUeLpu903ROv7rZNHRPNKY2D64-jc0IZ8iR44"
}
```

Create todo http://apitodofancy.thismylife.net/todos/:id

```
{
	"message": "Success Add todo",
	"data": {
		"todolist": [
			"5aeef4647adfbc71eb2d31aa"
		],
		"_id": "5aeef3d5b5899e7183d08be4",
		"email": "soni@hacktiv.com",
		"password": "$2a$10$ivxfJIAcQfyRQFj4C53mAeKmtrn7y6FGyQtsDlus3BHq.Vavp.S.i",
		"createdAt": "2018-05-06T12:23:49.991Z",
		"updatedAt": "2018-05-06T12:26:12.368Z",
		"__v": 1
	}
}
```

View all todo http://apitodofancy.thismylife.net/todos/:id

```
{
	"message": "List Todo & User",
	"data": [
		{
			"todolist": [
				{
					"status": false,
					"_id": "5aeef4647adfbc71eb2d31aa",
					"user": "5aeef3d5b5899e7183d08be4",
					"todo": "menggambar",
					"createdAt": "2018-05-06T12:26:12.123Z",
					"updatedAt": "2018-05-06T12:26:12.123Z",
					"__v": 0
				}
			],
			"_id": "5aeef3d5b5899e7183d08be4",
			"email": "soni@hacktiv.com",
			"password": "$2a$10$ivxfJIAcQfyRQFj4C53mAeKmtrn7y6FGyQtsDlus3BHq.Vavp.S.i",
			"createdAt": "2018-05-06T12:23:49.991Z",
			"updatedAt": "2018-05-06T12:26:12.368Z",
			"__v": 1
		}
	]
}
```

View single todo http://apitodofancy.thismylife.net/todos/:id/:todoId

```
{
	"message": "This the single todo",
	"data": [
		{
			"status": true,
			"_id": "5aeef4647adfbc71eb2d31aa",
			"user": "5aeef3d5b5899e7183d08be4",
			"todo": "setrika",
			"createdAt": "2018-05-06T12:26:12.123Z",
			"updatedAt": "2018-05-06T12:34:22.198Z",
			"__v": 0
		}
	]
}
```

Update single todo http://apitodofancy.thismylife.net/todos/:id/:todoId

```
{
	"message": "Success Update",
	"data": {
		"n": 1,
		"nModified": 1,
		"ok": 1
	}
}
```

Update status todo http://apitodofancy.thismylife.net/todos/status/:id/:todoId

```
{
	"message": "Success Update status",
	"data": {
		"n": 1,
		"nModified": 1,
		"ok": 1
	}
}
```

Delete todo http://apitodofancy.thismylife.net/todos/:id/:todoId

```
{
	"message": "Success Delete",
	"data": {
		"n": 1,
		"ok": 1
	}
}
```
