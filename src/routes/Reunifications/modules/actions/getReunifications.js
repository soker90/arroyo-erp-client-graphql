import {GET_REUNIFICATION_LIST} from 'action-types';
import axios from 'axios';

const getReunificationsRequest = () => ({
  type: GET_REUNIFICATION_LIST.REQUEST,
});

const getReunificationsError = () => ({
  type: GET_REUNIFICATION_LIST.FAILURE,
  payload: {
    reunifications: [],
  },
});

const getReunificationsSuccess = () => ({
  type: GET_REUNIFICATION_LIST.SUCCESS,
});

const getReunificationsSet = ({data}) => ({
  type: GET_REUNIFICATION_LIST.SET,
  payload: {
    reunifications: data,
  },
});

export const getReunifications = () => async dispatch => {
  dispatch(getReunificationsRequest());

  try {
    const URL = `/reunification/getReunificationLoans`;
    const response = await axios(URL);

    response.data.forEach(reunification => {
      reunification.fullname = `${reunification.clientListItemsDto.name ||
      ''} ${reunification.clientListItemsDto.lastname || ''}`;
      reunification.email = reunification.clientListItemsDto.email;
    });

    dispatch(getReunificationsSuccess());
    dispatch(getReunificationsSet(response));
  } catch (error) {
    console.error(error);
    dispatch(getReunificationsError());
  }
};