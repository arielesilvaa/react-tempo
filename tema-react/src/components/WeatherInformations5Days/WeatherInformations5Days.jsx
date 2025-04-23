import './WeatherInformations5Days.css';

function WeatherInformations5Days({ weather5Days }) {
 
  let dailyForecast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR');

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6); 

  function convertDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    });
  }

  return (
    <div className='weather-container'>
      <h3>Previsão para os próximos 5 dias</h3>
      <div className='forecast-list'>
        {next5DaysForecast.map((forecast) => (
          <div className='forecast-item' key={forecast.dt}>
            <p className='forecast-day'><strong>{convertDate(forecast.dt)}</strong></p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
            <p>
              {Math.round(forecast.main.temp_min)}°C Mín / {Math.round(forecast.main.temp_max)}°C Máx
            </p>
            <p className='forecast-description'>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5Days;
