import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Alert, ListGroup, ListGroupItem} from 'react-bootstrap';
import browserHistory from 'redux/history';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const MailingList = memo(function MailingList({
  filteredList,
  handleSubmit,
  isSending,
}) {
  const [showList, setShowList] = useState(false);

  const handleShowClient = clientId => {
    browserHistory.push(`${BASE_PATH}/client/${clientId}`);
  };

  if (filteredList.length > 0) {
    return (
      <Alert>
        <h4>Se han encontrado {filteredList.length} coincidencias</h4>
        <p>
          <Button onClick={() => setShowList(!showList)}>
            {showList ? 'Ocultar' : 'Ver'}
          </Button>
          <Button
            disabled={isSending}
            bsStyle="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Enviar
          </Button>
        </p>
        {showList && (
          <div>
            <hr />
            <ListGroup>
              {filteredList.map(item => (
                <ListGroupItem
                  key={item.recoveryId}
                  onClick={() => handleShowClient(item.clientDto.clientId)}
                  // item={item.recoveryId}
                >
                  Email: {item.clientDto.email}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
      </Alert>
    );
  }

  return (
    <Alert bsStyle="danger">
      <h4>Sin coincidencias</h4>
    </Alert>
  );
});

MailingList.propTypes = {
  filteredList: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
};

export default MailingList;
