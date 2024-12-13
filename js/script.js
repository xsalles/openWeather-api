const sendButton = document.getElementById("send");
const cityInput = document.getElementById("inputCity");
const nameCity = document.getElementById("nameCity");
const temperature = document.getElementById("temperature");
const boxInformationSituation = document.getElementById(
  "boxInformationSituation"
);
const boxInformationHumidity = document.getElementById(
  "boxInformationHumidity"
);
const countryInformations = document.getElementById("countryInformations");

async function weatherData(cityTyped) {
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityTyped}&units=metric&appid=2e45ad07aea878ee273fd71cf8797305&lang=pt_br`;

  try {
    const response = await fetch(apiWeather);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}


sendButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const data = await weatherData(city);

  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const temp = parseInt(data.main.temp);

  const textHumidity = document.getElementById("textHumidity");

  const textSituation = document.getElementById("textSituation");

  const countryImage = document.getElementById("countryImage");
  countryImage.alt = "Bandeira do país";
  let country = `${data.sys.country}`;
  country = country.toLowerCase();
  countryImage.src = `https://flagcdn.com/16x12/${country}.png`;

  if (boxInformationSituation) {
    boxInformationSituation.innerHTML = ""; 
    const situationImage = document.createElement("img");
    situationImage.src = icon;
    textSituation.innerText = `${data.weather[0].description}`;
    boxInformationSituation.appendChild(textSituation)
    boxInformationSituation.appendChild(situationImage)
  }


  textHumidity.innerText = `Umidade: ${data.main.humidity}%`;

  nameCity.innerText = `${data.name}`;
  temperature.innerText = `${temp}°C`;
});
