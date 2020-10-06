import React, { Fragment, useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axios from 'axios';

import Nav from './components/Nav';
import SelectCities from './components/SelectCities';
import SelectData from './components/SelectData';

function App() {
  const [cities, setCities] = useState([]);
  const [requestedCity, setRequestedCity] = useState(null);
  const [requestedData, setRequestedData] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const dataTypes = [
    { name: 'tempAvg', text: 'Average annual temperatures' },
    { name: 'dryDays', text: 'Annual dry days' },
    { name: 'rainDays', text: 'Annual rain days' },
    { name: 'snowDays', text: 'Annual snow days' },
  ];

  useEffect(() => {
    async function getCities() {
      try {
        const res = await axios('/api/weather/cities');
        setCities(res.data);
      } catch (error) {
        setRequestedData({ name: 'error' });
        setResponseData(error);
      }
    }

    getCities();
  }, []);

  useEffect(() => {
    if (requestedCity && requestedData) {
      async function getData() {
        try {
          const res = await axios(`/api/weather/cities/${requestedCity}/${requestedData.name}`);
          setResponseData(res.data);
        } catch (error) {
          setRequestedData({ name: 'error' });
          setResponseData(error);
        }
      }

      getData();
    }
  }, [requestedCity, requestedData]);

  return (
    <Fragment>
      <Nav />
      <Container className='p-5'>
        <SelectCities
          cities={cities}
          requestedCity={requestedCity}
          setRequestedCity={(e) => setRequestedCity(e)}
        />
        <SelectData
          dataTypes={dataTypes}
          requestedData={requestedData}
          setRequestedData={(e) => setRequestedData(JSON.parse(e))}
        />
        {responseData && genMessage(requestedData.name, responseData)}
      </Container>
    </Fragment>
  );
}

export default App;

///////////////////////////////////////////////////////////////////////////////

function genMessage(dataType, dataResponse) {
  let alertType = dataType === 'error' ? 'danger' : 'success';
  let msg = '';

  if (typeof dataResponse !== 'object') msg = dataResponse;
  else
    switch (dataType) {
      case 'tempAvg':
        msg = (
          <Fragment>
            The annual average for highest temperatures is <strong>{dataResponse.high}</strong> degrees,
            and for the lowest temperature is <strong>{dataResponse.low}</strong> degrees
          </Fragment>
        );
        break;

      case 'dryDays':
      case 'rainDays':
      case 'snowDays':
        msg = (
          <Fragment>
            There where a total of <strong>{dataResponse[dataType]}</strong>{' '}
            {dataType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} in a year
          </Fragment>
        );
        break;

      default:
        msg = 'Something went wrong, please try again';
    }

  return <Alert variant={alertType}>{msg}</Alert>;
}
