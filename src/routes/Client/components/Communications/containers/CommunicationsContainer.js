import {connect} from 'react-redux';
import {getClientCommunications} from 'routes/ClientOld/modules/actions';
import Communications from '../Communications';

const mapStateToProps = ({client: {communications, clientId}}) => ({
  communications,
  clientId,
});

const mapDispatchToProps = {
  getClientCommunications, // quitar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communications);