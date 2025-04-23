import { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import WeatherInformations from './components/WeatherInformations/WeatherInformations.jsx';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days.jsx';

function App() {
  const [weather, setWeather] = useState({});
  const [weather5Days, setWeather5Days] = useState({});
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    if (!city.trim()) {
      alert('Digite uma cidade válida!');
      return;
    }

    const key = '5778fc040a9c669ced7884fd25368dfb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);

      // Busca imagem da cidade no Unsplash
      const unsplashKey = '7tFFUToZw19_GmT5K7gu796OVH_NJnAWIa6AiQ53Lqc';
      const imageRes = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}&orientation=landscape`
      );

      const imageUrl = imageRes.data.results[0]?.urls?.regular;
      setBackgroundUrl(imageUrl || '');

    } catch (error) {
      console.error('Erro ao buscar cidade ou imagem:', error);
      alert('Cidade não encontrada ou erro nas APIs!');
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: '#fff',
        backdropFilter: 'brightness(0.85)',
      }}
    >
      <div className="container">
        <h1>Previsão do Tempo</h1>
        <input ref={inputRef} type="text" placeholder="Digite o Nome da Cidade" />
        <button onClick={searchCity}>Buscar</button>

        {weather.main && <WeatherInformations weather={weather} />}
        {weather5Days.list && <WeatherInformations5Days weather5Days={weather5Days} />}
      </div>
    </div>
  );
}

export default App;
