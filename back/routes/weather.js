'use strict';

const WeatherController = require('../controllers').WeatherController;

const weatherRoutes = (app) => {
  app.get('/api/weather/cities/:city/:data', async (req, res) => {
    try {
      const weather = new WeatherController();
      const data = await weather.getCityYearlyData(req.params.city, req.params.data);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/weather/cities', async (req, res) => {
    try {
      const weather = new WeatherController();
      const cities = await weather.getCitiesList();

      res.status(200).json(cities);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
};

module.exports = weatherRoutes;
