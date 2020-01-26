import React, {memo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  ListItem,
} from '@material-ui/core';
import dataFormat from 'components/util/dataFormat';

import {useStyles} from './CommunicationsListItem.styles';
import {CommunicationTypeIcon} from 'routes/Client/components/Communications/components';

const CommunicationsListItem = memo(({onCommunicationOpen, active, communication, setActive}) => {
  const classes = useStyles();

  const handleSelect = communication => {
    setActive(communication.clientComunicationId);
    onCommunicationOpen && onCommunicationOpen(communication);
  };

  return (
    <ListItem
      key={communication.clientComunicationId}
    >
      <Button
        className={clsx(classes.button, {
          [classes.active]: active === communication.clientComunicationId,
        })}
        fullWidth
        onClick={() => handleSelect(communication)}
      >
        <div className={classes.iconLabel}>
          <CommunicationTypeIcon
            className={classes.icon}
            comunicationTypeDescription={communication?.comunicationTypeDescription}
          />
          {communication.summary}
        </div>
        <span className={classes.date}>{dataFormat.dateShort(communication.dateComunication)}</span>
      </Button>
    </ListItem>
  );
});

CommunicationsListItem.propTypes = {
  onOpen: PropTypes.func.isRequired,
  communication: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

CommunicationsListItem.displayName = 'CommunicationsListItem';

export default CommunicationsListItem;
