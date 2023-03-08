import { useEffect, useState } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import getWeatherByCity from "../utils/open_weather_api";

const inputError =
  "w-full max-w-screen-sm text-sm border-red-400 border h-9 my-3 px-2 h-14 max-md:my-1";
const inputNotError =
  "w-full max-w-screen-sm text-sm border-gray-400 border h-9 my-3 px-2 h-14 max-md:my-1";

const submitButtonDisabled =
  "bg-gray-400 w-2/12 flex justify-center items-center uppercase my-2 h-14 text-gray-100 text-sm ml-2";
const submitButtonNotDisabled =
  "bg-gradient-to-r from-violet-500 to-fuchsia-500 w-2/12 flex justify-center items-center uppercase my-2 h-14 text-gray-100 text-sm ml-2";

function SearchPage() {
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherIsOk, setWeatherIsOk] = useState(true);
  const [cityFound, setCityFound] = useState(true);
  const [icon, setIcon] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    city
      ? setCityError("")
      : setCityError("Por favor, digite o nome de uma cidade");
    if (city) {
      const weather = await getWeatherByCity(city);
      if (weather.cod == 404) {
        setWeatherIsOk(false);
        setWeather(null);
        setCityFound(false);
      } else {
        setWeatherIsOk(true);
        setWeather(weather);
        setCityFound(true);
        setIcon(
          `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
        );
      }
    }
  };
  const handleCity = (event) => {
    setCity(event.target.value);
    event.target.value
      ? setCityError("")
      : setCityError("Por favor, digite o nome de uma cidade");
  };

  useEffect(() => {
    city ? setSubmitIsDisabled(false) : setSubmitIsDisabled(true);
  }, [city]);

  useEffect(() => {}, [weather]);
  return (
    <div>
      <div>
        <Background />
        <NavBar />
      </div>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col filter-none text-gray-100 z-10 h-1/4">
          <h1 className="text-5xl font-normal tracking-widest max-md:text-2xl uppercase">
            busque uma cidade
          </h1>
        </div>
        <div className="bg-white w-full flex flex-col drop-shadow-2xl h-full max-h-screen max-w-3xl">
          <div className="flex justify-center mx-2 flex-col items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-row mt-4 justify-center items-center w-full h-full max-w-xl"
            >
              <input
                value={city}
                id="city"
                onChange={handleCity}
                className={cityError ? inputError : inputNotError}
                placeholder="digite o nome da cidade aqui"
              />
              <button
                className={
                  submitIsDisabled
                    ? submitButtonDisabled
                    : submitButtonNotDisabled
                }
                disabled={submitIsDisabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </form>
            {cityError && <div className="text-sm">{cityError}</div>}
            {!cityFound && <div className="text-sm">cidade não encontrada</div>}
            <div className="w-full h-full max-w-md flex h-80">
              {weather && weatherIsOk && (
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
                    <h2 className="text-2xl pt-2 ">{weather.name}</h2>
                  </div>
                  <h3 className="text-5xl my-4">
                    {parseInt(weather.main.temp)} °C
                  </h3>
                  {icon && <img src={icon}></img>}
                  <div>
                    <span>{weather.weather[0].description}</span>
                  </div>
                  <div>
                    <span>
                      sensação térmica de {parseInt(weather.main.feels_like)} °C
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

export default SearchPage;
