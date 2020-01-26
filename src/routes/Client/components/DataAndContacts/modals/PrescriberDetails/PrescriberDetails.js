import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Button,
} from '@material-ui/core';
import {useStyles} from './PrescriberDetails.styles';
import {literals} from './constants';
import ItemCard from '../../components/ItemCard/ItemCard';
import {yesOrNo} from 'utils';


const PrescriberDetails = memo(
  ({prescriber, show, close}) => {
    const classes = useStyles();

    if (!show) {
      return null;
    }

    /**
     * Render input
     * @param {String} key
     * @returns {Grid}
     * @private
     */
    const _renderRow = key =>
      <Grid
        item
        md={12}
        xs={12}
      >
        <ItemCard label={literals[key]} value={prescriber[key]}/>
      </Grid>;

    /**
     * Render all buttons
     * @returns {CardActions}
     * @private
     */
    const _renderButtons = () =>
      <CardActions className={classes.actions}>
        <Button onClick={close}>
          Cerrar
        </Button>
      </CardActions>;

    /**
     * Render all rows
     * @returns {Grid[]}
     * @private
     */
    const _renderAllRows = () =>
      Object.keys(literals).map(_renderRow);

    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title="Detalles Zank"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <ItemCard label='Activo' value={yesOrNo(prescriber.active)}/>
                </Grid>

                {_renderAllRows()}

                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <ItemCard label='Destino' value='Pendiente de recibir de backend' divider={false}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  })
;

PrescriberDetails.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  clientId: PropTypes.number.isRequired,
  saveClientData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  zipcode: PropTypes.string,
  province: PropTypes.string,
  city: PropTypes.string,
  comments: PropTypes.string,
};

PrescriberDetails.displayName = 'PrescriberDetails';

export default PrescriberDetails;
