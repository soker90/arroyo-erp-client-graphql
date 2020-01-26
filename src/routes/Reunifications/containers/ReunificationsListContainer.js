import {connect} from 'react-redux';
import ReunificationsList from '../components/ReunificationsList';
import {setReunificationsSelected} from 'routes/Reunifications/modules/actions';

const mapStateToProps = ({reunifications}) => ({
  reunifications: reunifications.reunifications,
  reunificationsFilter: reunifications.reunificationsFilter,
  selected: reunifications.selected,
});

const mapDispatchToProps = {setReunificationsSelected};

export default connect(mapStateToProps, mapDispatchToProps)(ReunificationsList);