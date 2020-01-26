import React, {memo, useState, useEffect} from 'react';
import {Button, ButtonGroup, Col, ControlLabel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUndo, faRedo} from '@fortawesome/free-solid-svg-icons'
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import InputFile from 'components/InputFile';
import {rotateBase64Image90deg, dataURItoBlob} from 'utils';
import './UploadImageDNI.scss';

const UploadImageDNI = memo(({type, labelInput, image, labelButton, uploadImage}) => {
  const [srcImage, setSrcImage] = useState(null);
  const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(false);

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

  const _renderImage = () => <>
      <ButtonGroup className='mr-2'>
        <Button bsStyle="primary"
                onClick={() => _roteImage(false)}
                disabled={!srcImage}>
          <FontAwesomeIcon icon={faUndo}/>
        </Button>
        <Button bsStyle="primary"
                onClick={() => _roteImage(true)}
                disabled={!srcImage}>
          <FontAwesomeIcon icon={faRedo}/>
        </Button>
      </ButtonGroup>
      <div className={(zoom) ? 'dni-image__zoom' : 'dni-image__no-zoom'} onClick={() => setZoom(!zoom)}>
        <img alt="dniback" src={srcImage} className="img img-responsive"/>
      </div>
    </>
  ;

  return <Col xs={6}>
    <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_EDIT}>
      <InputFile
        name={`file${type}`}
        bsStyle="success"
        label={labelInput}
        onChange={_onChangeInput}
        accept=".jpg,.jpeg,.png"
      />
      <hr/>
    </HasPermission>

    {srcImage ?  // !== 'data:image/jpeg;base64,null'
      _renderImage() :
      <ControlLabel bsStyle="danger">No hay imagen disponible</ControlLabel>
    }
    <hr/>
    <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_EDIT}>
      <Button
        bsStyle="primary"
        onClick={_upload}
        disabled={!file}
      >
        {labelButton}
      </Button>
    </HasPermission>
  </Col>
});

UploadImageDNI.propTypes = {
  type: PropTypes.number.isRequired,
  labelInput: PropTypes.string.isRequired,
  image: PropTypes.string,
  labelButton: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default UploadImageDNI;
