import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';

import AMAZON_LOGO from 'assets/logo-amazon.png';

const RetailerView = memo(({origin, className}) => {
  const amazonOriginId = '006';

  return (
    <div>
      {origin && origin.get('originId') === amazonOriginId && (
        <Panel header="Datos Retailer" className={className}>
          <div className="nera_data">
            <div className="data_row">
              <img
                alt="logo"
                className="logo-wanna-top"
                src={AMAZON_LOGO}
                width="90"
              />
            </div>
            <hr />
            <div className="data_row">
              <span className="data_title">Retail:</span>
              <span className="data_content">{origin.get('description')}</span>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
});

RetailerView.propTypes = {
  className: PropTypes.string,
  origin: PropTypes.object,
};

const mapStateToProps = ({client}) => ({
  origin: client.getIn(['contract', 'origin']),
});

export default connect(mapStateToProps)(RetailerView);
