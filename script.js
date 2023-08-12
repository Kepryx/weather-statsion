var weatherData = document.getElementById("weather_data");

function w_interpretation(code){
    switch (code) {
        case  0: return "Clear sky";
        case  1: return "Mainly clear";
        case  2: return "Partly cloudy"
        case  3: return "Overcast";
        case 45: return "Fog";
        case 48: return "Depositing rime fog";
        case 51: return "Light Drizzle";
        case 53: return "Moderate Drizzle";
        case 55: return "Dense Drizzle";
        case 56: return "Light Freezing Drizzle";
        case 57: return "Dense Freezing Drizzle";
        case 61: return "Slight Rain";
        case 63: return "Moderate Rain";
        case 65: return "Heavy Rain";
        case 66: return "Light Freezing Rain";
        case 67: return "Heavy Freezing Rain";
        case 71: return "Slight Snow fall";
        case 73: return "Moderate Snow fall";
        case 75: return "Heavy Snow fall";
        case 77: return "Snow grains";
        case 80: return "Slight Rain showers";
        case 81: return "Moderate Rain showers";
        case 82: return "Violent Rain showers";
        case 85: return "slight Rain showers";
        case 86: return "heavy Rain showers";
        case 95: return "Thunderstorm:";
        case 96: return "slight hail Thunderstorm:  ";
        case 99: return "heavy hail Thunderstorm:";
        default: return "unknown"
    }
}

function weather_data() {
    // var url = "https://api.open-meteo.com/v1/forecast?latitude=46.0&longitude=11.3&hourly=temperature_2m,precipitation_probability,precipitation&daily=precipitation_sum&current_weather=true&forecast_days=3&timezone=Europe%2FBerlin";
    var url = "https://api.open-meteo.com/v1/forecast?latitude=11.9338&longitude=79.8298&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,weathercode,pressure_msl,surface_pressure,cloudcover,visibility,uv_index,cape,shortwave_radiation,direct_radiation,temperature_1000hPa&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&current_weather=true&timezone=auto&models=best_match";
    
    fetch(url).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw new Error(Error);
        }
    }).then(function(data){
        w_code_msg = w_interpretation(data.current_weather.weathercode);
        
        const html = `
        <p>
        <h2 class="text-danger text-center">
        
        Weather: ${w_code_msg}
        </h2>
        `;
        document.getElementById("display_data").innerHTML = html;

        
                
        temp =  data.current_weather.temperature +"°C"
        document.getElementById("display-temp").innerHTML = temp;

        direction =  data.current_weather.winddirection
        document.getElementById("display-dir").innerHTML = direction;

        spd =  data.current_weather.windspeed + "Km/h"
        document.getElementById("display-spd").innerHTML = spd;

        tim = "last update: " + data.current_weather.time
        document.getElementById("display_time").innerHTML = tim;
        
    }).catch(function(error){
        console.log(error);
    })
};
