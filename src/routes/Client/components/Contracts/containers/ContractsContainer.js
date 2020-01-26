import {connect} from 'react-redux';
import {
  getContract,
  getPrescriber,
  getReceipts,
  sendAmortizationTable,
  getClientContracts,
  uploadContract,
} from 'routes/Client/modules/actions';
import Contracts from '../Contracts';
import {showModal} from 'reducers/modal';
import {CHANGE_IBAN} from '../modals/types';

const mapStateToProps = ({client: {contracts, contract, receipts}}) => ({
  contracts,
  contract,
  receipts,
});

const mapDispatchToProps = {
  getContract,
  getReceipts,
  getPrescriber,
  getClientContracts,
  sendAmortizationTable,
  uploadContract,
  showModalChangeIban: () => showModal({modalType: CHANGE_IBAN}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contracts);
