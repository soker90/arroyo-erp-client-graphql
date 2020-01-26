import {connect} from 'react-redux';
import {actions} from '../modules/refinance';
import RefinanceView from '../components/RefinanceView';

const mapStateToProps = ({loadingBar, refinance, common}) => ({
  isLoading: !!loadingBar.default,
  refinanceds: refinance.get('refinanceds'),
  recoverFilter: common.get('recoverFilter'),
});

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps, mapDispatchToProps)(RefinanceView);