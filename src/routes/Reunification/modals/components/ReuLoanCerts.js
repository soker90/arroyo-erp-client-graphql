import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Button} from 'react-bootstrap';
import InputFile from 'components/InputFile';

const ReuLoanCerts = ({
  handleChange,
  handleDownloadCert,
  debtCert,
  debtFile,
  paymentLetter,
  paymentCert,
}) => {
  return (
    <Row>
      <Col xs={12}>
        {!debtCert ? (
          <div style={{marginBottom: '1rem'}}>
            <div className="loan-check loan-invalid" />
            <InputFile
              bsStyle="danger"
              name="debtCert"
              label="Subir certificado deuda"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div style={{marginBottom: '1rem'}}>
            <div className="loan-check loan-valid" />
            <InputFile
              bsStyle="success"
              name="debtCert"
              label="Actualizar certificado deuda"
              onChange={handleChange}
            />
            {debtFile && (
              <Button onClick={handleDownloadCert.bind(this, 'debtCert')}>
                Descargar C. Deuda
              </Button>
            )}
          </div>
        )}
      </Col>
      <Col xs={12}>
        {!paymentLetter ? (
          <div style={{marginBottom: '1rem'}}>
            <div className="loan-check loan-invalid" />
            <InputFile
              bsStyle="danger"
              name="paymentLetter"
              label="Subir Carta de pago"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div style={{marginBottom: '1rem'}}>
            <div className="loan-check loan-valid" />
            <InputFile
              bsStyle="success"
              name="paymentLetter"
              label="Actualizar Carta de pago"
              onChange={handleChange}
            />
            {paymentCert && (
              <Button onClick={handleDownloadCert.bind(this, 'paymentLetter')}>
                Descargar Carta de pago
              </Button>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

ReuLoanCerts.propTypes = {
  handleChange: PropTypes.func.isRequired,
  debtCert: PropTypes.bool.isRequired,
  paymentLetter: PropTypes.bool.isRequired,
  debtFile: PropTypes.string,
  paymentCert: PropTypes.string,
};

export default ReuLoanCerts;
