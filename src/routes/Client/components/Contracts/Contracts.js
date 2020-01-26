import React, {Fragment, memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import ContractsTable from './components/ContractsTable';
import ContractData from './components/ContractData';
import {useStyles} from './Contracts.styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReceiptsTable from './components/ReceiptsTable';

const Contracts = memo(({className, contracts, contract, getContract, getReceipts, getPrescriber, receipts, sendAmortizationTable, uploadContract, showModalChangeIban, ...rest}) => {
  const [selectedContractId, setSelectedContractId] = useState(contracts?.[0]?.contractId);
  const classes = useStyles();

  useEffect(() => {
    if (selectedContractId) {
      getContract(selectedContractId);
      getPrescriber(selectedContractId);
      getReceipts(selectedContractId);
    }
  }, [selectedContractId]);

  return (
    <HasPermission access={USER_PERMISSIONS.PAYMENT_SITUATION_READ}>
      <div
        {...rest}
        className={className}
      >
        <Fragment>
          <ContractsTable
            contracts={contracts}
            onRowClick={setSelectedContractId}
            selectedContract={selectedContractId}
          />
          {(contract.contractId) ?
            <>
              <ContractData contract={contract} className={classes.contractDetail} uploadContract={uploadContract}
                            showModalChangeIban={showModalChangeIban}/>
              <ReceiptsTable receipts={receipts} contractId={selectedContractId}
                             sendAmortizationTable={sendAmortizationTable}/>
            </> :
            <CircularProgress className={classes.progress}/>
          }


        </Fragment>
      </div>
    </HasPermission>
  );
});

Contracts.propTypes = {
  className: PropTypes.string,
  contracts: PropTypes.array.isRequired,
  sendAmortizationTable: PropTypes.func.isRequired,
  uploadContract: PropTypes.func.isRequired,
  showModalChangeIban: PropTypes.func.isRequired,
};

export default Contracts;
