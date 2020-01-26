import {addNotification} from 'reducers/notifications';
import {connect} from 'react-redux';
import {actions} from '../../modules/reunification';
import EditLoanModal from './EditReunificationLoan';

const mapStateToProps = ({reunification}) => ({
  entitiesList: reunification.entitiesList,
});

const mapDispatchToProps = {...actions, addNotification};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLoanModal);