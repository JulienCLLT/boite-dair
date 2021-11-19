const dataMapper = require('../dataMapper');


const bookmarksController = {

  tva: 20,
  shipping: 5,

 algoShop : (favoris)=>{

    let priceArray = [];

      if (favoris.length==1) {
        priceArray.push({price:favoris[0].price});
      }else {
        priceArray.push(favoris.reduce((a, b) => ({price: a.price + b.price})));
      };

      
      priceArray[0].totalTva = (priceArray[0].price/100)*bookmarksController.tva;
      priceArray[0].totalWithTva = priceArray[0].totalTva+priceArray[0].price;
      priceArray[0].totalWithTvaShipping= priceArray[0].totalWithTva+bookmarksController.shipping;
      
      priceArray[0].shipping = bookmarksController.shipping;

      return priceArray;
    },

  // méthode pour afficher le panier
  bookmarksPage: (request, response) => {
    try {
      const favoris = request.session.bookmarks;
      
      if (favoris.length>0) {
        
        const  priceArray = bookmarksController.algoShop(favoris);
        response.render("favoris",{favoris , priceArray});
      }else{

          const priceArray = [];
        response.render("favoris",{favoris , priceArray});
      }
    } catch (error) {
      response.status(500).send(error);
    }},



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
