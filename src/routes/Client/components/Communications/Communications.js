import React, {useState, memo, Fragment} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {CommunicationsList, CommunicationDetails} from './components';


import {useStyles} from './Communications.styles';
import {Alert} from 'components';

const Communications = memo(({communications}) => {
  const classes = useStyles();
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);

  /**
   * Handle open communication
   * @param {Object} communication
   * @private
   */
  const _handleCommunicationOpen = communication => {
    setOpenFolder(true);
    setSelectedCommunication(communication);
  };

  /**
   * Render communicaion list
   * @returns {Fragment}
   * @private
   */
  const _renderCommunications = () =>
    <Fragment>
      <CommunicationsList
        className={classes.emailFolders}
        onCommunicationOpen={_handleCommunicationOpen}
        communications={communications}
      />
      {selectedCommunication ? (
          <CommunicationDetails
            className={classes.emailDetails}
            communication={selectedCommunication}
          />
        ) :
        null
      }
    </Fragment>;

  /**
   * Render message no communications
   * @returns {Alert}
   * @private
   */
  const _renderNoCommunications = () =>
    <Alert
      className={classes.alert}
      message="No hay registros de comunicaciones"
      variant='info'
    />;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.openFolder]: openFolder,
      })}
    >
      {communications.length > 0 ?
        _renderCommunications() :
        _renderNoCommunications()
      }
    </div>
  );
});

Communications.displayName = 'Communications';

Communications.propTypes = {
  communications: PropTypes.array.isRequired,
};

export default Communications;
