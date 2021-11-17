const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');



const router = express.Router();

// page d'accueil
router.get('/',mainController.leftMenu, mainController.homePage );

// page article
router.get('/article/:id',mainController.leftMenu, mainController.articlePage);
// page panier
router.get('/bookmarks', mainController.leftMenu, bookmarksController.bookmarksPage );

router.get('/bookmarks/add/:id',bookmarksController.bookmarksAddFigurine);
router.get('/bookmarks/delete/:id',bookmarksController.bookmarksDeleteFigurine);

router.get('/contact', mainController.contactPage)


// on exporte le router 
module.exports = router;