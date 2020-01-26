import {connect} from 'react-redux';
import {actions} from '../modules/calendar';
import CalendarView from '../components/CalendarView';

const mapStateToProps = ({loadingBar, calendar, common}) => ({
  isLoading: !!loadingBar.default,
  recoveries: calendar.get('recoveries'),
  recoverFilter: common.get('recoverFilter'),
});

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);