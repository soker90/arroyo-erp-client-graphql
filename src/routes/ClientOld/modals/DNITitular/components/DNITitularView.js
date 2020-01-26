import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import UploadImageDNI from 'routes/ClientOld/components/UploadImageDNI';
import {UPLOAD_FILE_TYPES} from 'constants/files';

const DNITitularView = memo(({dniImages, uploadImage, close, show}) =>
  <Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>DNI Titular</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UploadImageDNI
        type={UPLOAD_FILE_TYPES.DNI_FRONT}
        labelInput='SELECCIONA CARA FRONTAL'
        image={dniImages.front}
        labelButton='Subir frontal'
        uploadImage={uploadImage}/>

      <UploadImageDNI
        type={UPLOAD_FILE_TYPES.DNI_BACK}
        labelInput='SELECCIONA CARA TRASERA'
        image={dniImages.back}
        labelButton='Subir trasera'
        uploadImage={uploadImage}/>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={close}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

DNITitularView.propTypes = {
  close: PropTypes.func.isRequired,
  dniImages: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default DNITitularView;
