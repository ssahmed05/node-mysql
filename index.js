const bcryptjs = require("bcryptjs");
const express = require("express");
const { check, validationResult } = require('express-validator');
require('dotenv').config();


const app = express();
const UserModel = require('./Models/UserModel');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/users', (req, res) => {
    UserModel.all().then(results => res.send(results));
}) 

app.get('/user/:id', (req, res) => {
    UserModel.getById(req.params.id).then(results => res.send(results));
}) 

app.post('/add-user', [
    check('name').notEmpty().withMessage('Name Field is required'),
    check('email')
    .notEmpty().withMessage("Email Field is required")
    .isEmail().withMessage('This is not a valid email')
    .custom(value => {
        UserModel.unique("email",value).then((isThere) =>  { return isThere.length == 0 } ).catch(function(err){console.log(err)})
     
    }).withMessage('Custom'),
    check('password')
    .isLength({ min: 8 }).withMessage("Password must be min 8 digits")
    .not().isLowercase().withMessage("Password must have atleast 1 upper case")
],(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        res.status(400).send(errors);
        
    } else {
        
        res.status(200).send(req.body);
        let payload = {
            name: req.name,
            email: req.email,
            password: bcryptjs.hashSync(req.password, 10)
        }

        UserModel.add(payload).then(results => res.send(results));
        
    }


    

}) 


app.listen(3000, () => console.log('Server started'));