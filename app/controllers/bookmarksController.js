const dataMapper = require('../dataMapper');


const bookmarksController = {

  tva: 20,
  shipping: 5,



  // méthode pour afficher le panier
  bookmarksPage: (request, response) => {

    const favoris = request.session.bookmarks;
    let priceArray = [];

    if (favoris.length==1) {
      
     priceArray.push({price:favoris[0].price});
     const totalTva= (priceArray[0].price/100)*bookmarksController.tva;
     const totalWithTva = totalTva+priceArray[0].price;
     const totalWithTvaShipping = totalWithTva+bookmarksController.shipping;

     priceArray[0].totalTva =totalTva;
     priceArray[0].totalWithTva = totalWithTva;
     priceArray[0].totalWithTvaShipping =totalWithTvaShipping;
     priceArray[0].shipping = bookmarksController.shipping;
     

 

      }if (favoris.length>1) {

        priceArray.push(favoris.reduce((a, b) => ({price: a.price + b.price})));
        const totalTva= (priceArray[0].price/100)*bookmarksController.tva;
        const totalWithTva = totalTva+priceArray[0].price;
        const totalWithTvaShipping = totalWithTva+bookmarksController.shipping;

        priceArray[0].totalTva =totalTva;
        priceArray[0].totalWithTva = totalWithTva;
        priceArray[0].totalWithTvaShipping =totalWithTvaShipping;
        priceArray[0].shipping = bookmarksController.shipping;

        
        
      };


    
    response.render("favoris",{favoris , priceArray});
  },



    bookmarksAddFigurine: (request, response) => {
    const id = Number(request.params.id);
    const checkFigurine = request.session.bookmarks.find(fig => fig.id === id);
    if(!checkFigurine) {
      dataMapper.getOneFigurine(id, (error, figurine) => {
        if(error) response.status(500).send("Erreur serveur !");
        else {
          request.session.bookmarks.push(figurine.rows[0]);
          response.redirect('/bookmarks');
        }
      })
    } else response.redirect('/bookmarks');
    
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
