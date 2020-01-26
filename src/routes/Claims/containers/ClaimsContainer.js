import {connect} from 'react-redux';
import {actions} from '../modules/claims';
import ClaimsView from '../components/ClaimsView';

const mapStateToProps = ({loadingBar, claims}) => ({
  isLoading: !!loadingBar.default,
  claims: claims.get('claims'),
});

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsView);