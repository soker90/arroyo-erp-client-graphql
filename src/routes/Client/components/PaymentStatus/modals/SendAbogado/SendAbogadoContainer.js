import {connect} from 'react-redux';
import SendAbogado from './SendAbogado';
import {sendToJudicial} from 'routes/Client/modules/actions';

const mapDispatchToProps = {
  sendToJudicial,
};

export default connect(
  null,
  mapDispatchToProps,
)(SendAbogado);