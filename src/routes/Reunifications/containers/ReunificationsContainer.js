import {connect} from 'react-redux';

import ReunificationsView from '../components/ReunificationsView';
import {getReunifications} from '../modules/actions';

const mapStateToProps = ({reunifications, loadingBar}) => ({
  reunifications: reunifications.reunifications,
  reunificationsFilter: reunifications.reunificationsFilter,
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {getReunifications};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReunificationsView);
