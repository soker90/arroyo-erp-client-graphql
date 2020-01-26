import PaymentStatus from "./PaymentStatus";
import {actions} from '../../modules/actions';
import {connect} from 'react-redux';


const mapStateToProps = ({client}) => ({
  recovery: client.get("recovery"),
  clientId: client.getIn(["client", "clientId"]),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentStatus);