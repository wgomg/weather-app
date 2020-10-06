import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const SelectCities = ({ dataTypes, requestedData, setRequestedData }) => {
  const dropdownItems = dataTypes.map((data) => (
    <Dropdown.Item key={data.name} eventKey={JSON.stringify(data)}>
      {data.text}
    </Dropdown.Item>
  ));

  return (
    <DropdownButton
      className='pb-2'
      variant='outline-dark'
      title={requestedData && requestedData.text ? requestedData.text : 'Select Data'}
      onSelect={setRequestedData}>
      {dropdownItems}
    </DropdownButton>
  );
};

export default SelectCities;
