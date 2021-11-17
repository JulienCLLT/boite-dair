const { request, response } = require('express');
const dataMapper = require('../dataMapper');


const mainController = {


  leftMenu : (request, response, next) => {

    dataMapper.countFigurineByCategory ((error, data) => {
      if (error) {
        console.log(error);
        } else {
          response.locals.categories = data.rows;
          console.log();
           next();
      }
 
    })
  },

  contactPage : (request, response) => {
    response.render('contact')
  },

  // méthode pour la page d'accueil
  homePage: (request, response) => {

        const allFigurineForDataMapper = (error, data)=>{
          if (error){
            console.log(error);
          }else{
            response.render("accueil", {info :data.rows });
          }
        }

    dataMapper.getAllFigurines(allFigurineForDataMapper);




  },

  // méthode pour la page article
  articlePage: (request, response) => {
    
      const urlFound = request.params.id;
      

      const oneFigurineForDataMapper = (error, data)=>{
        if (error){
          console.log(error);
        }else{
          const review = [];

          data.rows.forEach(elem => {
            review.push({
              author: elem.author,
              note: elem.note,
              title: elem.title,
              message: elem.message,
            })
          });
          
          const boiteDetail = data.rows[0];

          delete boiteDetail.author;
          delete boiteDetail.note;
          delete boiteDetail.title;
          delete boiteDetail.message;

          
          response.render("article", { boiteDetail, review });
          
        }
      }

  dataMapper.getOneFigurine(urlFound,oneFigurineForDataMapper);

      
  }

};


module.exports = mainController;
