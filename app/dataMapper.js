const client = require('./database');

const dataMapper = {

    getAllFigurines : (callback)=> {
        const queryAllFigurines = 'SELECT * FROM figurine ;';
        client.query(queryAllFigurines, callback);

    },

    getOneFigurine: (id, callback)=> { 
        
        // client.query(`SELECT * FROM figurine WHERE id= $1`, [id], callback);
        const oneFigurineQuery = {
            text: `SELECT * FROM figurine
                JOIN review ON figurine.id = review.figurine_id
                WHERE figurine.id = $1;`,
            values: [id]
        };
        client.query(oneFigurineQuery, callback);

        
    },

    countFigurineByCategory : (callback)=> {
        const countQuery = {
            text : `SELECT 
                        category, 
                        COUNT(category) AS nbfigurines 
                    FROM figurine 
                    GROUP BY category;`,
        };
        client.query(countQuery, callback);
    }

};

module.exports = dataMapper;