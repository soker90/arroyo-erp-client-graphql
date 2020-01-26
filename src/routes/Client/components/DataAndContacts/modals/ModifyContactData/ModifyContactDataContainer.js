import {connect} from 'react-redux';
import ModifyContactData from './ModifyContactData';
import {saveClientData} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {client}}) => ({
  client,
});

const mapDispatchToProps = {
  saveClientData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyContactData);