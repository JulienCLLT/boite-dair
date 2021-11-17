const { request, response } = require('express');
const dataMapper = require('../dataMapper');


const bookmarksController = {

  tva: 20,
  shipping: 5,

  // méthode pour afficher le panier
  bookmarksPage: (request, response) => {

    const favoris = request.session.bookmarks;
    let priceArray = [];

    if (favoris.length>1) {
      const priceItem = favoris.reduce((a, b) => (a.price + b.price));
      const ItemWithTva = ((priceItem/100)*bookmarksController.tva)+priceItem;
      const ItemWithTvaShipping = ItemWithTva+bookmarksController.shipping;

      priceArray.push({priceItem, ItemWithTva, ItemWithTvaShipping});
      
      };

    console.log(favoris);
    console.log(priceArray);
    
    response.render("favoris",{favoris : favoris});
  },

  bookmarksAddFigurine: (request, response)=>{
     const figurineID = request.params.id;

     dataMapper.getOneFigurine(figurineID,(error, data)=>{
        if (error) {
          console.log(error);
          
        }else {

            const checkFigurine = request.session.bookmarks.find(element =>element.id == figurineID);
              if (!checkFigurine) {
                request.session.bookmarks.push(data.rows[0]);
              }
            
            response.redirect("/bookmarks");
            
        }
     })

//-----------------------------------------------------

//code a etudier pour faire fonctionner run qui est au dessus

              // addBookmark: (request, response) => {
              //   const id = Number(request.params.id);
              //   const checkFigurine = request.session.bookmarks.find(fig => fig.id === id);
              //   if(!checkFigurine) {
              //     dataMapper.getOneFigurine(id, (error, figurine) => {
              //       if(error) response.status(500).send("Erreur serveur !");
              //       else {
              //         request.session.bookmarks.push(figurine);
              //         response.redirect('/bookmarks');
              //       }
              //     })
              //   } else response.redirect('/bookmarks');
                
              // },
//------------------------------------------------------
  },

  bookmarksDeleteFigurine: (request, response)=>{
    const figurineID = request.params.id;

    request.session.bookmarks = request.session.bookmarks.filter((fig) => {
          return (fig.id != figurineID)
    });
    response.redirect("/bookmarks");
  },


};


  

  



module.exports = bookmarksController;
