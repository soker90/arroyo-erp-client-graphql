import {connect} from 'react-redux';
import {actions} from '../modules/returns';
import ReturnsView from '../components/ReturnsView';

const mapStateToProps = ({loadingBar, returns, common}) => ({
  isLoading: !!loadingBar.default,
  returned: returns.get('returned'),
  recoverFilter: common.get('recoverFilter'),
});

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnsView);