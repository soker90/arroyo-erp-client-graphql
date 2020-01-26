import React from 'react';
import PropTypes from 'prop-types';

const Row = React.memo(function Row({title, content}) {
  return (
    <div className="data_row">
      <span className="data_title">{title}:</span>
      <span className="data_content">{content}</span>
    </div>
  );
});

Row.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Row;
