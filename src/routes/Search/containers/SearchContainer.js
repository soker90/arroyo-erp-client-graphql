import {connect} from 'react-redux';
import {searchClients} from '../modules/actions';
import SearchView from '../components/SearchView';

const mapStateToProps = ({search, loadingBar}) => ({
  clients: search.clients,
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {searchClients};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
