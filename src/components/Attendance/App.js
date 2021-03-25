import React from 'react';
import './App.scss';
import Dropdown from './Dropdown';

const items = [
  {
    id: 1,
    value: '1st Semester',
  },
  {
    id: 2,
    value: '2nd Semester',
  },
  {
    id: 3,
    value: '3rd Semester',
  },
  {
    id: 4,
    value: '4th Semester',
  },
  {
    id: 5,
    value: '5th Semester',
  },
  {
    id: 6,
    value: '6th Semester',
  },
  {
    id: 7,
    value: '7th Semester',
  },
  {
    id: 8,
    value: '8th Semester',
  },
];

const Section = [
    {
      id: 1,
      value: 'Section A',
    },
    {
      id: 2,
      value: 'Section B',
    },
    {
      id: 3,
      value: 'Section C',
    },
  ];
const Course = [
    {
      id: 1,
      value: 'SOE',
    },
    {
      id: 2,
      value: 'PPL',
    },
    {
      id: 3,
      value: 'DBMS',
    },
    {
      id: 4,
      value: 'CN',
    },
    {
      id: 5,
      value: 'DAA',
    },
  ];

function Attendance() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>
        View Attendance
        <span role="img" aria-label="Movie projector">
          
        </span>
      </h1>
      <Dropdown title="Select present Semester" items={items}  />
      <Dropdown title="Select your Section" items={Section}  />
      <Dropdown title="Select Desired course" items={Course}  />
    </div>
  );
}

export default Attendance;