import React, {memo} from 'react';
import PropTypes from 'prop-types';

const DataContent = memo(({title, children, onClick, style}) =>
  <div style={{...style}} className="data_row" onClick={onClick && onClick}>
      <span className="data_title">
        <b>{title}: </b>
      </span>
    <span className="data_content">{children}</span>
  </div>,
);

DataContent.propTypes = {
  /** The key value passed  */
  title: PropTypes.string.isRequired,
  /** An onClick event func */
  onClick: PropTypes.func,
  /** Custom style properties */
  style: PropTypes.object,
  /** Children to render */
  children: PropTypes.node,
};

export default DataContent;
