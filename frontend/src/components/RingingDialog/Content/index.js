import React from 'react';
import Base from './Base';

const Content = ({ type }) => {
  switch (type) {
    default:
      return <Base type={type} />;
  }
};

Content.propTypes = {
  type: String,
};

export default Content;
