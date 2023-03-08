const getWeatherByCity = async (city) => {
  const cities = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dfc296c2e37a7ab5a4ba509cd53d8685&lang=pt_br`
  );
  const data = await cities.json();
  return data;
};

export default getWeatherByCity;
