import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ButtonToolbar, Button, Tabs, Tab, Panel} from 'react-bootstrap';
import HasPermission from 'components/HasPermission';

import {showModal} from 'reducers/modal';
import {USER_PERMISSIONS} from 'utils/user-permissions';

class ContactData extends PureComponent {
  static propTypes = {
    client: PropTypes.object.isRequired,
    className: PropTypes.string,
    showModalModifyData: PropTypes.func.isRequired,
  };

  state = {
    tabKey: 1,
  };

  showModalModifyData = () => {
    this.props.showModalModifyData(this.state.tabKey);
  };

  _renderFooter() {
    return (
      <HasPermission access={USER_PERMISSIONS.CONTACT_DATA_EDIT}>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.showModalModifyData}>
            Modificar
          </Button>
        </ButtonToolbar>
      </HasPermission>
    );
  }

  render() {
    const {client} = this.props;
    return (
      <Panel
        header="Datos de contacto"
        footer={this._renderFooter()}
        className={this.props.className}
      >
        <Tabs
          className=""
          bsStyle="tabs"
          onSelect={tabKey => this.setState({tabKey})}
          defaultActiveKey={1}
          id="tabs-datos-contacto"
        >
          <Tab eventKey={1} title="Principal">
            <div className="nera_data" style={{marginTop: '1rem'}}>
              <div className="data_row">
                <span className="data_title">Email:</span>
                <span className="data_content">{client.get('email', '')}</span>
              </div>

              <div className="data_row">
                <span className="data_title">Móvil:</span>
                <span className="data_content">{client.get('mobile', '')}</span>
              </div>

              <div className="data_row">
                <span className="data_title">Dirección:</span>
                <span className="data_content">
                  {client.get('addressNew', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Código postal:</span>
                <span className="data_content">
                  {client.get('zipcodeNew', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Provincia:</span>
                <span className="data_content">
                  {client.get('provinceNew', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Ciudad:</span>
                <span className="data_content">{client.get('cityNew', '')}</span>
              </div>
            </div>
            <hr />
            <div className="nera_data">
              <div className="data_row">
                <span className="data_title">País de residencia:</span>
                <span className="data_content">
                  {client.get('countryResidence', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">País de nacimiento:</span>
                <span className="data_content">
                  {client.get('countryBirth', '')}
                </span>
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title="Secundario">
            <div className="nera_data">
              <div className="data_row">
                <span className="data_title">Email:</span>
                <span className="data_content">{client.get('email2', '')}</span>
              </div>

              <div className="data_row">
                <span className="data_title">Móvil:</span>
                <span className="data_content">
                  {client.get('mobile2', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Dirección:</span>
                <span className="data_content">
                  {client.get('address', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Código postal:</span>
                <span className="data_content">
                  {client.get('zipcode', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Provincia:</span>
                <span className="data_content">
                  {client.get('province', '')}
                </span>
              </div>

              <div className="data_row">
                <span className="data_title">Ciudad:</span>
                <span className="data_content">
                  {client.get('city', '')}
                </span>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Panel>
    );
  }
}

const mapStateToProps = ({client, permissions}) => ({
  client: client.get('client'),
  permissions: permissions.userPermissions,
});

const mapDispatchToProps = {
  showModalModifyData: tabKey =>
    showModal({
      modalType: 'MODIFY_CONTACT_DATA',
      modalProps: {tabKey},
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
