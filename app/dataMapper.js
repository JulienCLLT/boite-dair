const client = require('./database');

const dataMapper = {

    getAllFigurines : (callback)=> {
        const queryAllFigurines = 'SELECT * FROM boite';
        client.query(queryAllFigurines, callback);

    },


    getOneFigurine: (id, callback)=> { 
        

        const oneFigurineQuery = {
            text: `SELECT * FROM boite
                JOIN review ON boite.id = review.boite_id
                WHERE boite.id = $1;`,
            values: [id]
        };
        client.query(oneFigurineQuery, callback);

        
    },

    countFigurineByCategory : (callback)=> {
        const countQuery = {
            text : `SELECT 
                        category, 
                        COUNT(category) AS nbBoites 
                    FROM boite 
                    GROUP BY category;`,
        };
        client.query(countQuery, callback);
    }

};

module.exports = dataMapper;