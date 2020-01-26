import {connect} from 'react-redux';

import ReunificationView from '../components/ReunificationView';
import {actions}         from '../modules/reunification';
import {showModal}       from 'reducers/modal';
import {addNotification} from 'reducers/notifications';

const mapStateToProps = ({reunification, loadingBar}) => ({
  isLoading: !!loadingBar.default,
  reunificationData: reunification.reunificationData,
  loansTotalAmount: reunification.loansTotalAmount,
});

const mapDispatchToProps = {
  addNotification,
  ...actions,
  showModalEditReuLoan: (loanDetails, reunificationId, statusCod) =>
    showModal({
      modalType: 'EDIT_REUNIFICATION_LOAN',
      modalProps: {...loanDetails, reunificationId, statusCod},
    }),
  validateStatusChange: reunificationId =>
    showModal({
      modalType: 'VALIDATE_REUNIFICATION',
      modalProps: {reunificationId},
    }),
  rejectStatusChange: reunificationId =>
    showModal({
      modalType: 'REJECT_REUNIFICATION',
      modalProps: {reunificationId},
    }),
  desistStatusChange: (reunificationId, tab) =>
    showModal({
      modalType: 'DESIST_REUNIFICATION',
      modalProps: {reunificationId, tab},
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReunificationView);
