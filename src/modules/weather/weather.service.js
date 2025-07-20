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

// OpenWeather API 호출
const fetchWeatherData = async (latitude, longitude) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new WeatherApiError('OpenWeather API 키가 설정되지 않았습니다.');
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`)
    ]);

    const current = currentResponse.data;
    const forecast = forecastResponse.data;
    
    // 오늘 최고/최저 온도 계산
    const today = new Date().toDateString();
    const todayForecasts = forecast.list.filter(item => {
      return new Date(item.dt * 1000).toDateString() === today;
    });

    let tempMin = current.main.temp;
    let tempMax = current.main.temp;
    
    if (todayForecasts.length > 0) {
      tempMin = Math.min(...todayForecasts.map(f => f.main.temp_min));
      tempMax = Math.max(...todayForecasts.map(f => f.main.temp_max));
    }

    return {
      tempAvg: Math.round(current.main.temp * 10) / 10,
      tempMin: Math.round(tempMin * 10) / 10,
      tempMax: Math.round(tempMax * 10) / 10,
      feelsLike: Math.round(current.main.feels_like * 10) / 10,
      precipitation: Math.round(forecast.list[0].pop * 100),
      status: mapWeatherStatusWithPriority(current.weather) // ✅ 새로운 매핑 함수 사용
    };
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;

    if (error.response?.status === 401) {
      throw new WeatherApiError('OpenWeather API 키가 유효하지 않습니다.');
    }
    if (error.response?.status === 404) {
      throw new WeatherApiError('해당 위치의 날씨 정보를 찾을 수 없습니다.');
    }
    if (error.response?.status === 429) {
      throw new WeatherApiError('날씨 API 호출 한도를 초과했습니다.');
    }
    
    throw new WeatherApiError('날씨 서비스 연결에 실패했습니다.');
  }
};

// 사용자 ID로 날씨 조회
export const getCurrentWeatherByUserId = async (userId) => {
  const userWithLocation = await findUserWithLocation(userId);
  
  if (!userWithLocation || !userWithLocation.location) {
    throw new UserLocationNotFoundError('먼저 위치를 설정해주세요.');
  }

  const location = userWithLocation.location;

  if (!location.latitude || !location.longitude) {
    throw new UserLocationNotFoundError('위치 좌표 정보가 없습니다. 위치를 다시 설정해주세요.');
  }

  const weatherData = await fetchWeatherData(location.latitude, location.longitude);

  return {
    location: {
      sido: location.sido,
      sigungu: location.sigungu,
      dong: location.dong
    },
    weather: weatherData
  };
};
