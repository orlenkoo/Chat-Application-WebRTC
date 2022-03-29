import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base';
import Group from './Group';
import Group2 from './Group2';
import Meeting from './Meeting';
import Meeting2 from './Meeting2';
import People from './People';

const Content = ({ type, setType, setOpen }) => {
  switch (type) {
    case 'people':
      return <People type={type} setType={setType} setOpen={setOpen} />;
    case 'group':
      return <Group type={type} setType={setType} />;
    case 'group2':
      return <Group2 type={type} setType={setType} />;
    case 'meeting':
      return <Meeting type={type} setType={setType} />;
    case 'meeting2':
      return <Meeting2 type={type} setType={setType} />;
    default:
      return <Base type={type} setType={setType} />;
  }
};

Content.propTypes = {
  type: String,
  setType: PropTypes.func,
  setOpen: PropTypes.func,
};

export default Content;
