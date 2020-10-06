import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const SelectCities = ({ cities, requestedCity, setRequestedCity }) => {
  const dropdownItems = cities.map((city) => (
    <Dropdown.Item key={city} eventKey={city}>
      {city}
    </Dropdown.Item>
  ));

  return (
    <DropdownButton
      className='pb-2'
      variant='outline-dark'
      title={requestedCity || 'Select City'}
      onSelect={setRequestedCity}>
      {dropdownItems}
    </DropdownButton>
  );
};

export default SelectCities;
