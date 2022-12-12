const express = require("express");
const connection = require("../connection");
const router = express.Router();


router.post('/create', (req, res, next) => {
    let product = req.body;
    let query = "insert into product (name, description, price) values(?, ?, ?)"; //sql query to add data into table
    connection.query(query, [product.name, product.description, product.price], (err, results) => { //running the sql query
        if(!err)
        {
            return res.status(200).json({message: "Product added successfully"});
            // return res.status(200);
        }
        else
        {
            return res.status(500).json(err);
        }
    });
});

router.get('/read', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //to enable CORS(cross origin resource sharing)
    let query = "select * from product"; //sql query to retrieve data from table
    connection.query(query, (err, results) => { //running the sql query
        if(!err)
        {
            return res.status(200).json(results);
        }
        else
        {
            return res.status(500).json(err);
        }
    })
});

router.patch('/update/:id', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*"); //to enable CORS(cross origin resource sharing)
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5502/"); //newly added on 07-12-2022 22:59 pm

    const id = req.params.id;
    let product = req.body;
    let query = "update product set name=?, description=?, price=? where id=?"; //sql query to update data from table
    connection.query(query, [product.name, product.description, product.price, id], (err, results) => { //running the sql query
        if(!err)
        {
            if(results.affectedRows == 0) //0(zero) rows get affected, means the query was applied to no rows, but there is no such row exists of that id
            {
                return res.status(404).json({message: "Product id does not found"});
            }
            else
            {
                return res.status(200).json({message: "Product updated successfully"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    let query = "delete from product where id=?"; //sql query to update data from table
    connection.query(query, [id], (err, results) => { //running the sql query
        if(!err)
        {
            if(results.affectedRows == 0) //0(zero) rows get affected, means the query was applied to no rows, but there is no such row exists of that id
            {
                return res.status(404).json({message: "Product id does not found"});
            }
            else
            {
                return res.status(200).json({message: "Product deleted successfully"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;