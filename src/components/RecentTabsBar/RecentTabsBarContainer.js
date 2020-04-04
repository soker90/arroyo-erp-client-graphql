import {connect} from 'react-redux';
import RecentTabsBar from './RecentTabsBar';
import {removeHistoryTab} from 'reducers/historytabs';

const mapStateToProps = ({historytabs}) => ({
  historytabs,
});

const mapDispatchToProps = {
  removeHistoryTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentTabsBar);
