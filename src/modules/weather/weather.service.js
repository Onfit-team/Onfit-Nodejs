import axios from 'axios';
import dotenv from 'dotenv';
import { findUserWithLocation } from '../location/location.repository.js'; 
import { UserLocationNotFoundError, WeatherApiError } from '../../utils/error.js';
dotenv.config();

// 날씨 우선순위 및 상태 매핑 (구름 세분화 적용)
const mapWeatherStatusWithPriority = (weatherArray) => {
  const priorityMap = {
    'Thunderstorm': 6, 'Snow': 5, 'Rain': 4, 'Drizzle': 4,
    'Mist': 3, 'Fog': 3, 'Haze': 3, 'Clouds': 2, 'Clear': 1
  };

  // 아이콘 코드 기반 상세 매핑
  const getDetailedStatus = (weather) => {
    const { main, icon } = weather;
    
    switch (main) {
      case 'Thunderstorm':
        return 'Storm';
      case 'Snow':
        return 'Snow';
      case 'Rain':
      case 'Drizzle':
        return 'Rain';
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return 'Fog';
      case 'Clouds':
        // ✅ 아이콘 코드로 구름 상태 세분화
        if (icon === '02d' || icon === '02n') {
          return 'CloudFew';    // 구름 조금
        } else if (icon === '03d' || icon === '03n') {
          return 'CloudMany';   // 구름 많음
        } else if (icon === '04d' || icon === '04n') {
          return 'CloudBroken'; // 흐림
        }
        return 'Cloud';  // 기본값
      case 'Clear':
        return 'Sun';
      default:
        return 'Sun';
    }
  };

  let highestPriority = 0;
  let selectedWeather = weatherArray[0];

  weatherArray.forEach(weather => {
    const priority = priorityMap[weather.main] || 0;
    if (priority > highestPriority) {
      highestPriority = priority;
      selectedWeather = weather;
    }
  });

  return getDetailedStatus(selectedWeather);
};

// ✅ 핵심: 공통 함수 하나로 현재/내일 처리
const getWeatherByDate = async (userId, isToday = true) => {
  const userWithLocation = await findUserWithLocation(userId);
  
  if (!userWithLocation || !userWithLocation.location) {
    throw new UserLocationNotFoundError('먼저 위치를 설정해주세요.');
  }

  const location = userWithLocation.location;
  if (!location.latitude || !location.longitude) {
    throw new UserLocationNotFoundError('위치 좌표 정보가 없습니다. 위치를 다시 설정해주세요.');
  }

  const weatherData = await fetchWeatherData(location.latitude, location.longitude, isToday);

  return {
    location: {
      sido: location.sido,
      sigungu: location.sigungu,
      dong: location.dong
    },
    weather: weatherData
  };
};

// OpenWeather API 호출
const fetchWeatherData = async (latitude, longitude, isToday) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new WeatherApiError('OpenWeather API 키가 설정되지 않았습니다.');
  }

  try {
    // 오늘날씨
    if(isToday){
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`)
    ]);

    return buildCurrentWeatherResponse(currentResponse.data, forecastResponse.data.list);
    }
     else {
      // 내일 날씨 
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`
      );

      return buildTomorrowWeatherResponse(forecastResponse.data.list);
    }
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;
    if (error.response?.status === 401) throw new WeatherApiError('OpenWeather API 키가 유효하지 않습니다.');
    if (error.response?.status === 404) throw new WeatherApiError('해당 위치의 날씨 정보를 찾을 수 없습니다.');
    throw new WeatherApiError('날씨 서비스 연결에 실패했습니다.');
  }
 };

// 오늘 날씨 응답 구성
const buildCurrentWeatherResponse = (current, forecastList) => {
  const today = new Date().toDateString();
  const todayForecasts = forecastList.filter(item => 
    new Date(item.dt * 1000).toDateString() === today
  );

  const todayMinTemp = todayForecasts.length > 0 
    ? Math.min(...todayForecasts.map(f => f.main.temp_min))
    : current.main.temp_min;
  
  const todayMaxTemp = todayForecasts.length > 0
    ? Math.max(...todayForecasts.map(f => f.main.temp_max))
    : current.main.temp_max;

  const maxPrecipitation = todayForecasts.length > 0
    ? Math.max(...todayForecasts.map(f => f.pop * 100))
    : 0;

  return {
    tempAvg: Math.round(current.main.temp),
    tempMin: Math.round(todayMinTemp * 10) / 10,
    tempMax: Math.round(todayMaxTemp * 10) / 10,
    feelsLike: Math.round(current.main.feels_like * 10) / 10,
    precipitation: Math.round(maxPrecipitation),
    status: mapWeatherStatusWithPriority(current.weather)
  };
};

// 내일 날씨 응답 구성
const buildTomorrowWeatherResponse = (forecastList) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toDateString();
  
  const tomorrowForecasts = forecastList.filter(item => 
    new Date(item.dt * 1000).toDateString() === tomorrowDateString
  );

  if (tomorrowForecasts.length === 0) {
    throw new WeatherApiError('내일 날씨 정보를 찾을 수 없습니다.');
  }

  const tempMin = Math.min(...tomorrowForecasts.map(f => f.main.temp_min));
  const tempMax = Math.max(...tomorrowForecasts.map(f => f.main.temp_max));
  const tempAvg = tomorrowForecasts.reduce((sum, f) => sum + f.main.temp, 0) / tomorrowForecasts.length;
  
  // 낮 시간대 대표 데이터
  const noonForecast = tomorrowForecasts.find(f => {
    const hour = new Date(f.dt * 1000).getHours();
    return hour >= 11 && hour <= 14;
  }) || tomorrowForecasts[0];

  const maxPrecipitation = Math.max(...tomorrowForecasts.map(f => f.pop * 100));

  return {
    tempAvg: Math.round(tempAvg * 10) / 10,
    tempMin: Math.round(tempMin * 10) / 10,
    tempMax: Math.round(tempMax * 10) / 10,
    feelsLike: Math.round(noonForecast.main.feels_like * 10) / 10,
    precipitation: Math.round(maxPrecipitation),
    status: mapWeatherStatusWithPriority(noonForecast.weather)
  };
};

// ✅ 간단해진 export 함수들
export const getCurrentWeatherByUserId = async (userId) => {
  return await getWeatherByDate(userId, true);   // true = 오늘
};

export const getTomorrowWeatherByUserId = async (userId) => {
  return await getWeatherByDate(userId, false);  // false = 내일
};