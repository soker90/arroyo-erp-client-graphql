import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../../../modules/client';

import {Col, Row} from 'react-bootstrap';
import {Container} from 'components/Container';

import format from 'components/util/dataFormat';

class Communication extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    clientComunicationId: PropTypes.number.isRequired,
    getCommunication: PropTypes.func.isRequired,
    communication: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {getCommunication, clientComunicationId} = this.props;
    getCommunication(clientComunicationId);
  }

  render() {
    const {communication} = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <div className="nera_data">
              <div className="data_row">
                <span className="data_title">ID:</span>
                <span className="data_content">
                  {communication.get('clientComunicationId')}
                </span>
              </div>
              <div className="data_row">
                <span className="data_title">Tipo:</span>
                <span className="data_content">
                  {communication.get('comunicationTypeDescription')}
                </span>
              </div>
              <div className="data_row">
                <span className="data_title">Fecha:</span>
                <span className="data_content">
                  {format.date(communication.get('dateComunication'))}
                </span>
              </div>
              <div className="data_row">
                <span className="data_title">Asunto:</span>
                <span className="data_content">
                  {communication.get('summary')}
                </span>
              </div>
              <div className="data_row">
                <span className="data_title">Dirección:</span>
                <span className="data_content">
                  {communication.get('directionType')}
                </span>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: communication.get('text') || '',
              }}
              style={{
                height: '300px',
                maxHeight: '500px',
                minHeight: '300px',
                overflowY: 'scroll',
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({client}) => ({
  communication: client.get('communication'),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Communication);
