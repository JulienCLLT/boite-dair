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



  // méthode pour la page d'accueil
  homePage: (request, response) => {

        const allFigurineForDataMapper = (error, data)=>{
          if (error){
            console.log(error);
          }else{
            // console.log(data.rows);
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

          const figurineDetail = data.rows[0];

          delete figurineDetail.author;
          delete figurineDetail.note;
          delete figurineDetail.title;
          delete figurineDetail.message;

          

          
          response.render("article", { figurineDetail, review });
          
        }
      }

  dataMapper.getOneFigurine(urlFound,oneFigurineForDataMapper);

      
  }

};


module.exports = mainController;
