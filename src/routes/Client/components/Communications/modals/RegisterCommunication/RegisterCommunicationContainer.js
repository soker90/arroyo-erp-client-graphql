import {connect} from 'react-redux';
import RegisterCommunication from './RegisterCommunication';
import {setCommunication} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {client}, auth: {user}}) => ({
  client,
  user,
});

const mapDispatchToProps = {
  setCommunication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterCommunication);