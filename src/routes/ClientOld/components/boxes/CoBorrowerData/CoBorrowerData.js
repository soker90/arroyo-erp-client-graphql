import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ButtonToolbar, Button, Panel} from 'react-bootstrap';

import format from 'components/util/dataFormat';

class CoBorrowerData extends PureComponent {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    showModalViewDni: PropTypes.func.isRequired,
  };

  _renderFooter() {
    return (
      <ButtonToolbar>
        <Button bsStyle="success" onClick={this.showModalViewDni}>
          Ver DNI
        </Button>
      </ButtonToolbar>
    );
  }

  showModalViewDni = () => {
    this.props.getCoDniImages();
    this.props.showModalViewDni();
  };

  render() {
    const {contract} = this.props;
    if (!contract.isEmpty() && contract.get('coBorrower')) {
      return (
        <Panel
          header="Datos co-titular"
          footer={this._renderFooter()}
          className={this.props.className}
        >
          <div className="nera_data">
            <div className="data_row">
              <span className="data_title">Nombre:</span>
              <span className="data_content">{`${contract.getIn([
                'coBorrower',
                'name',
              ])} ${contract.getIn(['coBorrower', 'surName'])}`}</span>
            </div>

            <div className="data_row">
              <span className="data_title">Client ID:</span>
              <span className="data_content">
                {contract.getIn(['coBorrower', 'entityId'])}
              </span>
            </div>

            <div className="data_row">
              <span className="data_title">DNI:</span>
              <span className="data_content">
                {contract.getIn(['coBorrower', 'dni'])}
              </span>
            </div>

            <div className="data_row">
              <span className="data_title">Edad:</span>
              <span className="data_content">
                {format.age(contract.getIn(['coBorrower', 'birthday']))}
              </span>
            </div>
          </div>
        </Panel>
      );
    }

    return null;
  }
}

export default CoBorrowerData;