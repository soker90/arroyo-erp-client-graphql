import {connect} from 'react-redux';
import SendEmail from './SendEmail';
import {setCommunication, sendEmail} from 'routes/Client/modules/actions';
import {getEmailTemplates} from 'actions/common/getEmailTemplates';

const mapStateToProps = ({client: {client}, common: {emailTemplates}}) => ({
  client,
  emailTemplates,
});

const mapDispatchToProps = {
  setCommunication,
  getEmailTemplates,
  sendEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendEmail);