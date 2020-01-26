import React, {useReducer, memo} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Divider,
  TextField,
} from '@material-ui/core';
import {initialState} from '../../constants/formConstants';
import {useStyles} from './SearchForm.styles';

const SearchForm = memo(({searchClients, className, ...rest}) => {
  const classes = useStyles();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    initialState,
  );

  /**
   * Handle function of the event onChange of the inputs
   * @param name
   * @param value
   * @private
   */
  const _handleChange = ({target: {name, value}}) => {
    setState({[name]: value});
  };

  /**
   * Reset all inputs
   * @private
   */
  const _resetState = () => {
    setState(initialState);
  };

  /**
   * Handle function submit form
   * @param event
   * @private
   */
  const _handleSubmit = event => {
    event.preventDefault();
    searchClients(state);
    _resetState();
  };

  /**
   * Render input
   * @param {string} name
   * @param {string} label
   * @returns {Grid}
   * @private
   */
  const _renderFormInput = (name, label) =>
    <Grid
      item
      xl
    >
      <TextField
        fullWidth
        label={label}
        name={name}
        onChange={_handleChange}
        value={state[name]}
        variant="outlined"
      />
    </Grid>;

  /**
   * Render all buttons
   * @returns {CardActions}
   * @private
   */
  const _renderButtons = () =>
    <CardActions>
      <Button
        className={classes.searchButton}
        type="submit"
        variant="contained"
        onClick={_handleChange}
      >
        Buscar
      </Button>
      <Button
        className={classes.cleanButton}
        type="submit"
        variant="contained"
        onClick={_resetState}
      >
        Limpiar
      </Button>
    </CardActions>;


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={_handleSubmit}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {_renderFormInput('dni', 'DNI')}
            {_renderFormInput('contractId', 'ID del Préstamo')}
            {_renderFormInput('client_id', 'Client ID')}
            {_renderFormInput('name', 'Nombre')}
            {_renderFormInput('lastname', 'Apellidos')}
            {_renderFormInput('mobile', 'Teléfono')}
            {_renderFormInput('email', 'Email')}
          </Grid>
        </CardContent>
        <Divider/>
        {_renderButtons()}
      </form>
    </Card>
  );
});

SearchForm.propTypes = {
  className: PropTypes.string,
  searchClients: PropTypes.func.isRequired,
};

SearchForm.displayName = 'SearchForm';

export default SearchForm;
