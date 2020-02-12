import {connect} from 'react-redux';

import {actions} from '../modules/lots';
import LotsView from '../components/LotsView';
import {searchLots} from '../modules/actions';

const mapStateToProps = ({lots: {lots}, loadingBar}) => ({
  lots,
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {
  ...actions,
  searchLots,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LotsView);
