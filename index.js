const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');

const app= express();

const apiKey="4ba4b4e251f3db844d3894246cedbc80";

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('index',{weather: null, error: null})
});

app.post('/', function(req, res){
    let city=req.body.city
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    console.log(req.body.city)
    request(url, function(err, response, body){
        if(err) {
            res.render('index', {weather: null, error: "Error! Please try again!"});
        }
        else {
            let weather= JSON.parse(body)
            if(weather.main==undefined){
                res.render("index", {
                    weather: null,
                    error:"Error! Please try again!",
                });
            }else {
            let weatherText=`In the city of ${weather.name},`;
            let weatherText1=`Temperature: ${weather.main.temp} degrees Celcius. `
            let weatherText2=`Weather: ${weather.weather[0].main}! `
            res.render("index", {weather: weatherText, weather1:weatherText1, weather2: weatherText2, error: null});
            console.log("body:", body);
        }
    }
    });
});

app.listen(PORT, function() {
    console.log("WeatherHub app is listening on port 3000");
});