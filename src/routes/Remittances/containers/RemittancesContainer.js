import {connect} from 'react-redux';
import {actions} from '../modules/remittances';
import RemittancesView from '../components/RemittancesView';

const mapStateToProps = ({remittances, loadingBar}) => ({
  remittances: remittances.get('remittances'),
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemittancesView);
