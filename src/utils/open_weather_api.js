const getWeatherByCity = async (city) => {
  const cities = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={Process.env.OPEN_WEATHER_APPID}&lang=pt_br`
  );
  const data = await cities.json();
  return data;
};

export default getWeatherByCity;
