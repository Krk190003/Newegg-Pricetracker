const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const scrapper = require('./scrapper');
let itemData;
let urlw;


app.set('view engine', 'ejs')
app.listen(PORT, () => {console.log(`Success Listening on Port ${PORT}`)});
app.use(express.json());

app.get("/", (req, res) => {
    res.render('homepage.ejs')
    res.end();
})
//Gets the initial data of the product upon url entry 
app.post("/api", async (req, res) => {
    itemData = await scrapper.retrieveItemInfo(req.body.url);
    if(itemData.status == "Error"){
        res.send(itemData);
    }
    else{
        urlw = req.body.url
        res.send(itemData);  
    }

});

    //*Loads page with item data and info 
    //* repeatly checks for any changes to item's data
app.get("/itemData", (req, res) =>{
    res.render("statusPage", {name: itemData.productName, 
    price: itemData.price, image:itemData.imgItemUrl});
    console.log("Success");
});


app.get("/updateInfo", async (req, res) =>{
    itemData = await scrapper.retrieveItemInfo(urlw)
    scrapper.output(itemData);    
    res.send(itemData);
      
})


app.get("/stop", (req, res) =>{
    urlw = "";
    res.end();
})



