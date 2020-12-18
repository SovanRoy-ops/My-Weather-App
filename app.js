//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
      res.sendFile(__dirname+"/index.html");

    });

app.post("/",function(req,res){

      const query = req.body.cityName;
      const apiKey = "572bc712217d20cf77354100df6efc73";
      const unit = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"&mode=json";
      https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const tempData = weatherData.main.temp;
          const descData = weatherData.weather[0].description;
          const iconData = weatherData.weather[0].icon;
          const iconUrl = "https://openweathermap.org/img/wn/"+iconData+"@2x.png";
          console.log("current Temperature: "+tempData);
          console.log(descData);


          res.write("<p>The Weather is currently "+descData+"</p>");
          res.write("<h1>The current temperature in "+query+" is: "+tempData+" degree Celcius</h1>");
          res.write("<img src="+iconUrl+">");
          res.send();
    });
   });
 });

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
