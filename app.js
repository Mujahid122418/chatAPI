const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {request} = require("express");
const app = express();
const connection = require('./database').connection;
app.use(express.json());
app.use('/test',(req, res, next)=>{
    res.send('this is the testing ')
})


app.post('/add-user',(req,res,next)=> {
    const requestData = req.body;
    // check if already email
    const emailQuery = `select * from users where email='`+requestData.email+`'`;
    connection.query(emailQuery,(err,results,fields)=>{
        if (results.length > 0){
            res.json({success: false,message: "This email is already in use"});
            return false;
        }else{
            const query2 = `insert into users 
                                            ( 
                                                first_name ,
                                                last_name , 
                                                email , 
                                                password 
                                            ) 
                                            values 
                                            (
                                                '` + requestData.first_name + `',
                                                '` + requestData.last_name + `',
                                                '` + requestData.email + `',
                                                '` + requestData.password + `'
                                            )`;
            connection.query(query2, (err, results, fields) => {
                if (err) {
                    res.json({success: false,message: "Error in query"});
                }else{
                    res.json({success: true,message: "User added successfully"});
                }
            })
        }
    })
});

app.get('/get-users',(req,res,next)=>{
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results, fields) => {
        if (err) {
            res.json({success: false,message: "Error in query"});
        }else{
            res.json({success: true,results: results});
        }
    });
})

app.post('/update-user/:id',(req,res,next)=> {
    const user_id = req.params.id;
    const requestData = req.body;

    const emailQuery = `select * from users where email='`+requestData.email+`' and id !=`+user_id;
    connection.query(emailQuery,(err,results,fields)=> {
        if (results.length > 0) {
            res.json({success: false, message: "This email is already in use"});
            return false;
        } else {
            const query = `update users set 
                                            first_name='` + requestData.first_name + `',
                                            last_name ='` + requestData.last_name + `' ,
                                            email = '` + requestData.email + `' ,
                                            password = '` + requestData.password + `'
                                            where id=` + user_id
            connection.query(query, (err, results, fields) => {
                if (err) {
                    res.json({success: false, message: "Error in query"});
                } else {
                    res.json({success: true, message: "Success! User update successfully"});
                }
            })
        }
    })
});

app.get('/delete-user/:id',(req,res,next)=>{
    const user_id = req.params.id;
    const query = `delete from users where id=`+user_id;
    connection.query(query, (err, results, fields) => {
        if (err) {
            res.json({success: false,message: "Error in query"});
        }else{
            res.json({success: true,message:"Success! User deleted successfully"});
        }
    })
})

app.post('/login',(req,res,next)=>{
    const requestData = req.body;
    const query = `select * from users where email='`+requestData.email+`' and password='`+requestData.password+`'`;
    connection.query(query,(err, results, fields) => {
        if (err) {
            res.json({success: false, message: "Error in query"});
        } else {
            res.json({success: true, results: results});
        }
    })
})


app.listen(5030);
