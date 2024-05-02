import axios from "axios";
import chalk from "chalk";

const API_KEY="418650198dda89bef2ee18153cb0a4f1";


function displayWeather(city,weatherData){
    console.log(chalk.yellow(`\nInformación del clima: ${city}:`));
  console.log(
    chalk.yellow(
      "☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
    )
  );
  console.log(chalk.cyan("Descripción:"), weatherData.weather[0].description);
  console.log(chalk.cyan("Temperatura:"), `${weatherData.main.temp} °C`);
  console.log(chalk.cyan("Humedad:"), `${weatherData.main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del Viento:"),
    `${weatherData.wind.speed} m/s`
  );
  console.log(
    chalk.yellow("☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️\n")
  );

}
function handleError(err){
    console.log(chalk.red("Error: "),err.message);
    process.exit(1)
}

async function getClima(city){
    try {
        let endpoint= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response=await axios.get(endpoint,{
            params:{
                q: city,
                appid: API_KEY,
                units:"metric"
            }
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log(chalk.bgRed(err));
        throw new Error(`no se pudo encontrar informacion de la ciudad ${city}`)
    }
}

function initApp() {
    let city=process.argv[2]

    if(!city){
        console.log(chalk.red("por favor, proporciona un nombre de lugar o ciudad"))
        console.log(chalk.red("ejecute asi: node app.js [nombre ciudad]"))
    }
    getClima(city).then(weatherData=>displayWeather(city,weatherData)).catch(handleError);
}




initApp()