import {connect} from 'react-redux';
import ModifyPersonalData from './ModifyPersonalData';
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
)(ModifyPersonalData);