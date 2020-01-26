import React, {useState, memo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  List,
} from '@material-ui/core';
import CommunicationsListItem from './components/CommunicationListItem';

import {useStyles} from './CommunicationsList.styles';

const CommunicationsList = memo(({onCommunicationOpen, className, communications, ...rest}) => {
  const classes = useStyles();
  const [active, setActive] = useState('');

  /**
   * Render all communications
   * @returns {Array}
   * @private
   */
  const _renderCommunications = () =>
    communications.map(communication => (
      <CommunicationsListItem
        key={communication.clientComunicationId}
        communication={communication}
        active={active}
        onCommunicationOpen={onCommunicationOpen}
        setActive={setActive}/>
    ));

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <List>
        {_renderCommunications()}
      </List>
    </div>
  );
});

CommunicationsList.propTypes = {
  className: PropTypes.string,
  onFolderOpen: PropTypes.func,
  communications: PropTypes.array.isRequired,
};

CommunicationsList.displayName = 'CommunicationsList';

export default CommunicationsList;
