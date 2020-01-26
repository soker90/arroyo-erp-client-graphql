import {connect} from 'react-redux';

import {getEmailTemplates} from 'actions/common/getEmailTemplates';
import {actions} from '../modules/mailing';
import MailingView from '../components/MailingView';

const mapStateToProps = ({loadingBar, mailing, common}) => ({
  isLoading: !!loadingBar.default,
  recoveries: mailing.get('recoveries'),
  emailTemplates: common.get('emailTemplates'),
});

const mapDispatchToProps = {...actions, getEmailTemplates};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailingView);
