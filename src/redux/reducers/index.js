import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import auth, { initialState as authInitial } from './auth';
import loader, { initialState as initialLoader } from './loader';
import requestpayment, { initialState as initialRequestPayment } from './requestpayment';
import paymentcard, { initialState as initialPaymentCard } from './paymentcard';
import debt, { initialState as debtStore } from './debt';
import accountingbill, { initialState as accountingbillStore } from './accounting-bill';
import common, { initialState as commonStore } from './common';

export const initialState = {
	auth: authInitial,
	loader: initialLoader,
	requestpayment: initialRequestPayment,
	paymentcard: initialPaymentCard,
	debtStore,
	accountingbillStore,
	commonStore,
};

const appReducer = combineReducers({
	auth,
	loader,
	requestpayment,
	paymentcard,
	debt,
	accountingbill,
	common,
});

const reducers = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	}
	return appReducer(action.type === 'LOGOUT_SUCCESS' ? initialState : state, action);
};

export default reducers;
