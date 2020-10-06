'use strict';

const fetch = require('node-fetch');

const url = 'https://ay61jgu2hf.execute-api.us-east-1.amazonaws.com/default/weather-api';

const WeatherController = function () {
  this.fullData = null;
};

WeatherController.prototype.fetchData = async function () {
  if (!this.fullData) {
    try {
      const res = await fetch(url);
      this.fullData = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
};

WeatherController.prototype.getCitiesList = async function () {
  await this.fetchData();

  const cities = this.fullData.map((d) => d.city);

  return cities;
};

WeatherController.prototype.getCityYearlyData = async function (city, data) {
  await this.fetchData();

  const yearlyData = getDataForCity(this.fullData, city, data);

  return yearlyData;
};

/////////////////////////////////////////////////////////////////////

function getDataForCity(fullData, city, requestedData) {
  const cityData = fullData.filter((d) => d.city === city);

  if (cityData.length === 0) return 'There is no data for requested city';

  const monthlyAvgs = cityData[0].monthlyAvg;

  switch (requestedData) {
    case 'tempAvg':
      // sum monthly average temperatures for a city
      const monthlyAvgsSum = monthlyAvgs.reduce((sum, monthlyAvg) => ({
        high: sum.high + monthlyAvg.high,
        low: sum.low + monthlyAvg.low,
      }));

      // get annual average
      return {
        high: monthlyAvgsSum.high / monthlyAvgs.length,
        low: monthlyAvgsSum.low / monthlyAvgs.length,
      };

    case 'dryDays':
    case 'snowDays':
      // sum monthly dry/snow days for a city
      return monthlyAvgs.reduce((sum, monthlyAvg) => ({
        [requestedData]: sum[requestedData] + monthlyAvg[requestedData],
      }));

    case 'rainDays':
      // get monthly dry days for a city
      const dryDays = getDataForCity(fullData, city, 'dryDays');
      // get monthly snow days for a city
      const snowDays = getDataForCity(fullData, city, 'snowDays');

      // substract annual dry days and annual snow days to total days in a year to get annual rain days
      // assuming dry days doesn't include snow days
      return { rainDays: 365 - dryDays.dryDays - snowDays.snowDays };

    default:
      return 'Requested data is not available';
  }
}

module.exports = WeatherController;
