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
import {useStyles} from './DNITitular.styles';
import {UPLOAD_FILE_TYPES} from 'constants/files';
import UploadImageDNI from '../../components/UploadImageDNI/UploadImageDNI';

const DNITitular = memo(
  ({
     show, close, dniImages, uploadImage, cotitular,
   }) => {
    const classes = useStyles();

    if (!show) {
      return null;
    }

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


    return (
      <Modal
        onClose={close}
        open={show}
      >
        <Card
          className={classes.root}
        >
          <form>
            <CardHeader title={`DNI ${cotitular ? 'Cotitular' : 'Titular'}`}/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <UploadImageDNI
                  type={cotitular ? UPLOAD_FILE_TYPES.DNI_FRONT_COT : UPLOAD_FILE_TYPES.DNI_FRONT}
                  labelInput='SELECCIONA CARA FRONTAL'
                  image={cotitular ? dniImages.cofront : dniImages.front}
                  labelButton='Subir frontal'
                  uploadImage={uploadImage}/>

                <UploadImageDNI
                  type={cotitular ? UPLOAD_FILE_TYPES.DNI_BACK_COT : UPLOAD_FILE_TYPES.DNI_BACK}
                  labelInput='SELECCIONA CARA TRASERA'
                  image={cotitular ? dniImages.coback : dniImages.back}
                  labelButton='Subir trasera'
                  uploadImage={uploadImage}/>
              </Grid>
            </CardContent>
            <Divider/>
            {_renderButtons()}
          </form>
        </Card>
      </Modal>
    );
  });

DNITitular.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  cotitular: PropTypes.bool,
  dniImages: PropTypes.object,
  uploadImage: PropTypes.func.isRequired,
};

export default DNITitular;
