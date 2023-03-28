import Card from './event card/card';
import React from 'react';
import { Container } from 'react-bootstrap';
function Events() {
  return (
    <div className='bo'>
      <div>
        <h3 className='h3 p-4 mx-4'>Details of the events</h3>
        <h5 className='p-3 mx-4'>The details of all the upcoming events organized by the clubs </h5>
      </div>
      <div className=' d-block mx-auto'>
      <Card name="Event"/>
      <Card/>
      <Card/>
      <Card/>
      </div>
    </div>

  );
}
export default Events;
