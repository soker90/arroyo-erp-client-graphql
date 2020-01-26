import {connect} from 'react-redux';
import {actions} from '../modules/amortizations';
import AmortizationsView from '../components/AmortizationsView';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({amortizations, loadingBar, common}) => ({
  isLoading: !!loadingBar.default,
  clientId: amortizations.get('clientId'),
  contract: amortizations.get('contract'),
  position: amortizations.get('position'),
  contracts: amortizations.get('contracts'),
  contractStatus: common.get('contractStatus').toJS(),
  amortizationTypes: common.get('amortizationTypes'),
});

const mapDispatchToProps = {...actions, addNotification};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(AmortizationsView);
