const express = require('express');


const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');



const router = express.Router();


router.get('/',mainController.leftMenu, mainController.homePage );

router.get('/article/:id',mainController.leftMenu, mainController.articlePage);

router.get('/bookmarks', mainController.leftMenu, bookmarksController.bookmarksPage );

router.get('/bookmarks/add/:id',bookmarksController.bookmarksAddFigurine);
router.get('/bookmarks/delete/:id',bookmarksController.bookmarksDeleteFigurine);

router.get('/contact', mainController.contactPage)


module.exports = router;