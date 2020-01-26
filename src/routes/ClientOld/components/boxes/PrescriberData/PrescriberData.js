import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panel, ButtonToolbar, Button} from 'react-bootstrap';
import {isEmpty} from 'lodash';

import {showModal} from 'reducers/modal';

import ZANK_LOGO from 'assets/logo-zank.png';

class PrescriberData extends PureComponent {
  _renderFooter() {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModalPrescriberDetails}>
          Detalles
        </Button>
      </ButtonToolbar>
    );
  }

  showModalPrescriberDetails = () => {
    this.props.showModalPrescriberDetails();
  };

  render() {
    const prescriber = this.props.prescriber.toJS();
    const {motivo, className} = this.props;

    if (isEmpty(prescriber)) {
      return null;
    }

    return (
      <Panel
        header="Datos prescriptor"
        footer={this._renderFooter()}
        className={className}
      >
        <div className="nera_data">
          <div className="data_row">
            <img
              alt="logo"
              className="logo-wanna-top"
              src={ZANK_LOGO}
              width="90"
            />
          </div>

          <hr />

          <div className="data_row">
            <span className="data_title">Prescriptor:</span>
            <span className="data_content">{prescriber.name}</span>
          </div>

          <div className="data_row">
            <span className="data_title">Motivo:</span>
            <span className="data_content">{motivo}</span>
          </div>
        </div>
      </Panel>
    );
  }
}

PrescriberData.propTypes = {
  className: PropTypes.string,
  prescriber: PropTypes.object.isRequired,
  showModalPrescriberDetails: PropTypes.func.isRequired,
  motivo: PropTypes.string,
};

const mapStateToProps = ({client}) => ({
  prescriber: client.get('prescriber'),
  motivo: client.getIn(['contract', 'motivo']),
});

const mapDispatchToProps = {
  showModalPrescriberDetails: () =>
    showModal({modalType: 'PRESCRIBER_DETAILS'}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriberData);
