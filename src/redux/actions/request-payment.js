import { SINGLE_API/* , REQUEST_ERROR */ } from './types';

export const action_getListTransaction = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/transaction',
			payload,
			successType: 'REQUEST_PAYMENT_SUCCESS',
			options: {
				method: 'Post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},

			next,
		},
	};
};

export const action_getListBank = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/bank-account',
			payload,
			successType: 'REQUEST_BANK_SUCCESS',
			options: {
				method: 'Post',
				headers: {
					'Content-Type': 'application/json',
				},
			},

			next,
		},
	};
};

export const action_deleteTransaction = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/transaction/delete',
			payload,
			successType: 'REQUEST_DELETE_SUCCESS',
			options: {
				method: 'Post',
				// headers: {
				// 	'Content-Type': 'multipart/form-data',
				// },
			},

			next,
		},
	};
};

export const action_showModalCreateDoc = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/get-object-debt',
			successType: 'GET_OBJECT_DEBT_REQ_PAYMENT_SUCCESS',
			options: {
				method: 'Post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
			next,
		},
	};
};

export const action_confirmTransaction = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/confirm-transaction',
			options: {
				method: 'Post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			next,
		},
	};
};


export const action_searchObjectByType = async (payload = {},type, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: `/accountant/search-object?type=${type}`,
			next,
		},
	};
};

export const action_getListTransactionSearch = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/transaction-search',
			payload,
			options: {
				method: 'Post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},

			next,
		},
	};
};