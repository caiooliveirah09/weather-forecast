import { useEffect, useState } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import getWeatherByCityUtil from "../utils/open_weather_api";

function WeatherPage() {
  const [cityState, setCityState] = useState("");
  const [weather, setWeather] = useState(null);
  const [defaultWeather, setDefaultWeather] = useState(null);
  const [weatherIsOk, setWeatherIsOk] = useState(false);
  const [icon, setIcon] = useState(null);

  const getWeatherByCity = async (city) => {
    const mainCity = await getWeatherByCityUtil(city);
    setWeather(mainCity);
    setWeatherIsOk(true);
    setIcon(
      `https://openweathermap.org/img/wn/${mainCity.weather[0].icon}.png`
    );
  };

  const getWeatherDefault = async () => {
    const mainCity = await getWeatherByCityUtil("São Paulo");
    setDefaultWeather(mainCity);
    setWeatherIsOk(true);
    setIcon(
      `https://openweathermap.org/img/wn/${mainCity.weather[0].icon}.png`
    );
  };

  const getCityOfUser = async (position) => {
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=locality&key={Process.env.API_GOOGLE}`
    );
    const data = await result.json();
    const codeMoreCity = data.plus_code.compound_code.split(",")[0];
    const city = codeMoreCity.split(" ")[1];
    if (city) getWeatherByCity(city);
    setCityState(city);
  };

  useEffect(() => {
    getWeatherDefault();
    navigator.geolocation.getCurrentPosition(getCityOfUser);
  }, []);

  return (
    <div>
      <div>
        <Background />
        <NavBar />
      </div>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col filter-none text-gray-100 z-10 h-1/4">
          <h1 className="text-5xl font-normal tracking-widest max-md:text-2xl uppercase">
            {cityState ? cityState : "São Paulo"}
          </h1>
        </div>
        <div className="bg-white w-full flex flex-col drop-shadow-2xl h-full justify-center max-h-screen max-w-3xl">
          <div className="flex justify-center mx-3">
            <div className="w-full h-full max-w-md flex h-80">
              {(weather || defaultWeather) && weatherIsOk && (
                <div className="uppercase my-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-50 w-full drop-shadow-2xl h-full flex flex-col justify-center items-center">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mt-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <h2 className="text-2xl pt-2 ">
                      {!weather ? defaultWeather.name : weather.name}
                    </h2>
                  </div>
                  <h3 className="text-5xl my-4">
                    {parseInt(
                      !weather ? defaultWeather.main.temp : weather.main.temp
                    )}{" "}
                    °C
                  </h3>
                  {icon && <img src={icon}></img>}
                  <div>
                    <span>
                      {!weather
                        ? defaultWeather.weather[0].description
                        : weather.weather[0].description}
                    </span>
                  </div>
                  <div>
                    <span>
                      sensação térmica de{" "}
                      {parseInt(
                        !weather
                          ? defaultWeather.main.feels_like
                          : weather.main.feels_like
                      )}{" "}
                      °C
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
