import React, {memo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import AvatarImage from 'assets/logo-wanna-small.png';
import {useStyles} from './HeaderClient.styles';
import {TABS} from 'routes/Client/constants';
import {PaymentButtons, CommunicationButtons} from './components';

const HeaderClient = memo((
  {
    className, title, category, logo, selectedTab,
    showModalSendJudicial, clientId, showModalModifyOtherContactData,
    showModalPaymentStatus, showModalSendPassword,
    showModalRegisterCommunication,
    showModalSendEmail,
    ...rest
  }) => {
  const classes = useStyles();

  /**
   * Render Add Contact Button
   * @returns {false || Button}
   * @private
   */
  const _renderAddContact = () =>
    selectedTab === TABS.PERSONAL_DATA &&
    <Button
      color="secondary"
      onClick={showModalModifyOtherContactData}
      variant="contained"
    >
      <PersonAddIcon className={classes.icon}/>
      Añadir contacto
    </Button>;

  /**
   * Render all buttons of header
   * @returns {div}
   * @private
   */
  const _renderButtons = () =>
    <div className={classes.actions}>
      {_renderAddContact()}
      <PaymentButtons
        show={selectedTab === TABS.PAYMENTS}
        showModalSendJudicial={showModalSendJudicial}
        clientId={clientId}
        showModalPaymentStatus={showModalPaymentStatus}
      />
      <CommunicationButtons
        show={selectedTab === TABS.COMMUNICATIONS}
        showModalSendPassword={showModalSendPassword}
        showModalRegisterCommunication={showModalRegisterCommunication}
      />
      <Button
        color="primary"
        onClick={showModalSendEmail}
        variant="contained"
      >
        <ChatIcon className={classes.icon}/>
        Enviar mensaje
      </Button>
    </div>;


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.cover}
      />
      <div className={classes.container}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={logo || AvatarImage}
        />
        <div className={classes.details}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            {category}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
          >
            {title}
          </Typography>
        </div>
        {_renderButtons()}
      </div>
    </div>
  );
});

HeaderClient.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.any,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  clientId: PropTypes.number.isRequired,
  showModalSendJudicial: PropTypes.func.isRequired,
  showModalModifyOtherContactData: PropTypes.func.isRequired,
  showModalPaymentStatus: PropTypes.func.isRequired,
  showModalSendPassword: PropTypes.func.isRequired,
  showModalSendEmail: PropTypes.func.isRequired,
};

export default HeaderClient;
