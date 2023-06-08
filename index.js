const express = require('express');
const path = require('path')
const { Pool } = require('pg');
const { Script } = require('vm');
const app = express();

// const fetch = require("node-fetch");

const publicpath = path.join(__dirname,'public')
const port = 3000
app.set('view engine','ejs')

const pool = new Pool({
       user:"postgres",
       host:"localhost",
       database:"ejs-cart",
       password:"postgres",
       port:"5432"
})

app.get('',(_,resp)=>{
    pool.query("SELECT * FROM public.products",(err, response)=>{
        if(err){
            console.log("error",err)
            resp.status(500).send("something wrong")
        }else{
            console.log(response.rows)
        }

        const data = response.rows
        resp.render('shopping', { data: data })
    })
})

app.get('/product',(req,resp)=>{

    pool.query("SELECT * FROM public.products",(err, response)=>{
        if(err){
            console.log("error",err)
            resp.status(500).send("something wrong")
        }
            // console.log(response.rows)
            const data = response.rows
            resp.render('product', { data: data })
        

    })
    // resp.render('product')
})


app.get('/cart',(_,resp)=>{

    pool.query("SELECT * FROM public.products",(err, response)=>{
        if(err){
            console.log("error",err)
            resp.status(500).send("something wrong")
        }else{
            console.log(response.rows)
        }

        const data = response.rows
        resp.render('cart', { data: data })
    })
})


app.listen(port, () => console.info(`App listening on port ${port}`))