import { showModal } from "./modal.js";

const BASE_URL = "http://api.openweathermap.org/data/2.5";

const API_KEY = "86c7df64c8303035f21da219c837f7d1";

const getWeatherData = async (type, data) => {
    let url = null;
    switch (type) {
        case "current":
            if(typeof data === "string" ){
                url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
        }else{
            url =  `${BASE_URL}/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
        };
            break;
            case "forecast":
                  if(typeof data === "string" ){
                url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
        }else{
            url =  `${BASE_URL}/forecast?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
        };
        break;
        default:
                url = `${BASE_URL}/forecast?q=tehran&appid=${API_KEY}&units=metric`;
    break;
}

    try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200){
        return json;
    }else {
        showModal(json.message);
    }
 } catch (error) {
        console.log("an error occured when fetching data");
    }
        };

export default getWeatherData;