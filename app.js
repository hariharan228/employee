const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employees');
const bodyParser = require('body-parser');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(session({
    secret : "nodejs",
    resave : true,
    saveUninitialized : true
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});


app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true}));
dotenv.config({path  :'./config.env'});
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true

});

const port = process.env.PORT;
app.use(employeeRoutes);
app.listen(port,()=>{
    console.log('Server is started at port ' + port);
});