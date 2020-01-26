import {connect} from 'react-redux';
import {actions} from '../modules/receipts';
import ReceiptsView from '../components/ReceiptsView';

const mapStateToProps = ({receipts, loadingBar}) => ({
  receipts: receipts.get('receipts'),
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptsView);
