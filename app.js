const express = require("express");
const bodyParser = require("body-parser");
const https= require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,function( req , res){
        res.sendFile(__dirname+"/index.html");
        
});

app.post("/" , function(req , res){
    const apikey="c1dfc62744f82a04a7f80abae1080781";
    const query = req.body.cityName;
    const units="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url ,function(response){

        if(response.statusCode== 200){
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageUrl = "https://openweathermap.org/img/wn/" + icon  + "@2x.png";
                
                res.write("<h1>The Weather is currently "+description +".</h1>");
                res.write("<h2>The temprature in "+query+ " is "+ temp + " degree celcious .</h2>");
                res.write("<img src="+imageUrl+">");
                res.send();
               })
        }
        else{

            res.send("Some Error is Occured.");
            
        }

       
    });
    



});

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
});
