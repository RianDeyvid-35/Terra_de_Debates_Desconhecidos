var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config(); // Caso utilize variáveis de ambiente

var app = express();

// Middlewares essenciais
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessão e flash devem vir antes de qualquer rota
app.use(session({
  secret: process.env.SESSION_SECRET || 'frase_secreta_aqui', // mude isso para produção
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
}));
app.use(flash());
app.use((req, res, next) => { 
  res.locals.messages = req.flash();
  next();
});

// Configurar o view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRoutes = require("./modules/post/postRoutes");
const commentRoutes = require("./modules/comment/commentRoutes");

require('./database/associations');

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRoutes);
app.use('/', commentRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.default = app;