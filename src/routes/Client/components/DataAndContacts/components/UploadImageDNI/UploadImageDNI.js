import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Grid, Typography} from '@material-ui/core'
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import InputFile from 'components/InputFile';
import {rotateBase64Image90deg, dataURItoBlob} from 'utils';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import {useStyles} from './UploadImageDNI.styles';
import Divider from '@material-ui/core/Divider';

const UploadImageDNI = memo(({type, labelInput, image, labelButton, uploadImage}) => {
  const [srcImage, setSrcImage] = useState(null);
  const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    image && setSrcImage(image);
  }, [image]);

  /**
   * Upload image to server
   * @private
   */
  const _upload = () => {
    uploadImage(type, file);
    setFile(null);
  };

  /**
   * Set address source image to state
   * @param {Array} files
   * @private
   */
  const _onChangeInput = ({target: {files}}) => {
    setFile(files[0]);
  };

  /**
   * Rote image and save in file state for update in backend
   * @param {boolean} clockwise
   * @private
   */
  const _roteImage = clockwise => {
    const newImage = rotateBase64Image90deg(srcImage, clockwise);
    setSrcImage(newImage);
    setFile(dataURItoBlob(newImage));
  };

  /**
   * Render button for rotate the image
   * @param {Boolean} clockwise
   * @param {Component} Icon
   * @returns {Button}
   * @private
   */
  const _renderButtonRotate = (clockwise, Icon) =>
    <Button
      onClick={() => _roteImage(clockwise)}
      disabled={!srcImage}>
      <Icon/>
    </Button>;

  /**
   * Render imagen and rotate buttons
   * @returns {Fragment}
   * @private
   */
  const _renderImage = () => <>
    <ButtonGroup className={classes.buttonsRotate} color="primary" aria-label="contained primary button group">
      {_renderButtonRotate(false, RotateLeftIcon)}
      {_renderButtonRotate(true, RotateRightIcon)}
    </ButtonGroup>
    <div onClick={() => setZoom(!zoom)}>
      <img alt="dni" src={srcImage} className={zoom ? classes.zoom : classes.nozoom}/>
    </div>
  </>;

  return <Grid
    item
    md={6}
    xs={6}
  >
    <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_EDIT}>
      <InputFile
        label={labelInput}
        buttonProps={{
          variant: 'contained',
          color: 'default',
        }}
        inputProps={{
          accept: '.jpg,.jpeg,.png',
          onChange: _onChangeInput,
          name: `file${type}`,
        }}
      />
      <Divider className={classes.divider}/>
    </HasPermission>

    {srcImage ?  // !== 'data:image/jpeg;base64,null'
      _renderImage() :
      <Typography
        display="block"
        variant="h6"
        className={classes.noImage}
      >
        No hay imagen disponible
      </Typography>
    }
    <Divider className={classes.divider}/>
    <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_EDIT}>
      <Button
        variant='contained'
        color='secondary'
        onClick={_upload}
        disabled={!file}
        className={classes.buttonSave}
      >
        {labelButton}
      </Button>
    </HasPermission>
  </Grid>
});

UploadImageDNI.propTypes = {
  type: PropTypes.number.isRequired,
  labelInput: PropTypes.string.isRequired,
  image: PropTypes.string,
  labelButton: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default UploadImageDNI;
