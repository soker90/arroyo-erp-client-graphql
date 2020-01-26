import {connect} from 'react-redux';
import ChangeIBAN from './ChangeIBAN';
import {changeIBAN} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {contract}}) => ({
  currentIban: contract.chargeAccount,
});

const mapDispatchToProps = {
  changeIBAN,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeIBAN);