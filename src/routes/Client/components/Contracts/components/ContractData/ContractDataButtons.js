import React, {createRef, Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';

import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {useStyles} from './ContractData.styles';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import {downloadFile} from 'utils';

const ContractDataButtons = memo(({contractId, uploadContract, showModalChangeIban}) => {
  const classes = useStyles();
  const inputRef = createRef();


  /**
   * Upload the contract
   * @param files
   * @private
   */
  const _onChangeInput = ({target: {files}}) => {
    uploadContract(contractId, files[0]);
  };

  /**
   * Download contract
   * @private
   */
  const _downloadContract = () => {
    downloadFile(`/contract/docs/${contractId}`, `contrato_${contractId}.pdf`);
  };

  /**
   * Show modal for edit iban
   * @private
   */
  const _showModalChangeIban = () => {
    showModalChangeIban()
  };

  /**
   * Render Button
   * @param {String} permission
   * @param {String} title
   * @param {Function} onClick
   * @param {Component} Icon
   * @param {Boolean} upload
   * @returns {HasPermission}
   * @private
   */
  const _renderButton = (permission, title, onClick, Icon, upload) =>
    <HasPermission access={permission}>
      <Tooltip title={title}>
        <IconButton size="small" className={classes.button} onClick={onClick}>
          <Icon/>
        </IconButton>
      </Tooltip>
      {upload &&
      <input
        ref={inputRef}
        name='contract'
        type="file"
        style={{display: 'none'}}
        accept=".pdf"
        onChange={_onChangeInput}
      />}
    </HasPermission>;


  return <Fragment>
    {_renderButton(
      USER_PERMISSIONS.CONTRACTS_ACCOUNT_EDIT,
      'Subir contrato',
      () => inputRef.current.click(),
      PublishIcon,
      true,
    )}

    {_renderButton(
      USER_PERMISSIONS.CONTRACTS_CONTRACT_READ,
      'Descargar contrato',
      _downloadContract,
      GetAppIcon,
    )}

    {_renderButton(
      USER_PERMISSIONS.CONTRACTS_ACCOUNT_EDIT,
      'Modificar número de cuenta',
      _showModalChangeIban,
      EditIcon,
    )}

  </Fragment>;


});

ContractDataButtons.propTypes = {
  className: PropTypes.string,
  contract: PropTypes.object.isRequired,
  uploadContract: PropTypes.func.isRequired,
  showModalChangeIban: PropTypes.func.isRequired,
};

ContractDataButtons.displayName = 'ContractDataButtons';

export default ContractDataButtons;
