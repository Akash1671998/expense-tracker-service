const express = require("express");
const { route } = require("./AuthRouters");

const router = express.Router();

router.post("/produc",((req,res)=>{
    res.status(200).json([
            {
                name:"Akash",
                price:5000
            },
            {
                name:"peyush",
                price:4000
            }
    ])

}));

module.exports = router;