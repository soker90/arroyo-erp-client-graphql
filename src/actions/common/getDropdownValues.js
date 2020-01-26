import {AMORTIZATION_TYPES, DROPDOWNS, ERP_TYPES} from 'action-types';
import axios from 'axios';

/**
 * Return for request action
 * @returns {{type: string}}
 * @private
 */
const _getDropdownValuesRequest = () => ({
  type: DROPDOWNS.REQUEST,
});

/**
 * Return for success action
 * @returns {{type: string}}
 * @private
 */
const _getDropdownValuesSuccess = () => ({
  type: DROPDOWNS.SUCCESS,
});

/**
 * Return for failure action
 * @param {Object} error
 * @returns {{type: string, error: Object}}
 * @private
 */
const _getDropdownValuesError = error => ({
  type: DROPDOWNS.FAILURE,
  error,
});

export const getDropdownValues = () => async dispatch => {
  dispatch(_getDropdownValuesRequest());

  try {
    const response = await axios('/dropdown/dropdownValues');

    dispatch(_getDropdownValuesSuccess());
    dispatch(_setDropdownValues(response.data));
  } catch (error) {
    console.error(error);

    dispatch(_getDropdownValuesError(error));
  }
};

/**
 * Set amortization types
 * @param {Array} amortizationTypes
 * @returns {{payload: {amortizationTypes: Array}, type: string}}
 * @private
 */
const _setAmortizationTypes = amortizationTypes => ({
  type: AMORTIZATION_TYPES.SET,
  payload: {amortizationTypes},
});

/**
 * Set Erp types in redux
 * @param {Array} erpTypes
 * @returns {{payload: {erpTypes: Array}, type: string}}
 * @private
 */
const _setErpTypes = erpTypes => ({
  type: ERP_TYPES.SET,
  payload: {erpTypes},
});

const _setDropdownValues = payload => dispatch => {
  const amortizationTypes = payload
    .filter(({dropdownId}) => dropdownId === 1)
    .reduce((memo, {value}) => ({...memo, [value]: value}), {});

  dispatch(_setAmortizationTypes(amortizationTypes));

  const erpTypes = payload
    .filter(({dropdownId}) => dropdownId === 2)
    .reduce((memo, {value}) => ({...memo, [value]: value}), {});

  dispatch(_setErpTypes(erpTypes));
};