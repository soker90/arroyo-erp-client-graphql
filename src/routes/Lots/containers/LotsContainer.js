import {connect} from 'react-redux';

import {actions} from '../modules/lots';
import LotsView from '../components/LotsView';

const mapStateToProps = ({lots, loadingBar}) => ({
  lots: lots.get('lots'),
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotsView);
