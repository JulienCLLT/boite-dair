require('dotenv').config();

const express = require('express');
const expressSession = require('express-session');



const router = require('./app/router');


const PORT = process.env.PORT || 5000;


const app = express();


app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static("public"));


// app.use(express.urlencoded({extended: true}));

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) 
  }
}));

app.use((request, response, next)=>{
  if (!request.session.bookmarks) {
    request.session.bookmarks = [];
  }
  next();
});

app.use(router);



app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
