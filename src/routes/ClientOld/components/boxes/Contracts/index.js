import {connect} from 'react-redux';
import {getClientContracts, getContract, getPrescriber, getReceipts} from 'routes/ClientOld/modules/actions';
import Contracts from './Contracts';

const mapDispatchToProps = {
  getContract,
  getReceipts,
  getPrescriber,
  getClientContracts,
};

const mapStateToProps = ({client}) => ({
  contracts: client.get('contracts'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contracts);
