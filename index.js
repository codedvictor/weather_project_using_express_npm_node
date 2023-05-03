const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/weather.html")
    
})

app.post("/",  function(req, res){
    const city = req.body.cityName;
    const unit = "metric";
    const apiKey = "abb87a5f519dc5acf65509551add6b15";
        
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&unit=" + unit;
         
        https.get(url, function(response){
            console.log(response.statusCode);
    
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const wdes = weatherData.weather[0].description;
                const temp = weatherData.main.temp;
                const country = weatherData.name;
                const icon = weatherData.weather[0].icon;
                const imageIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                // const owner = {
                //     name: "Victor",
                //     work: "digital marketer",
                // }
                // console.log(JSON.stringify(owner));
                res.write("<p>" + country + " temperature is: " + temp + "k </p>");
                res.write("<h1>" + country + " is : " + wdes +" today</h1>");
                res.write("<img src=" + imageIcon + ">");
                res.send();
            })
        })

})

app.listen(3000, function(){
    console.log("We are live at port: 3000");
})