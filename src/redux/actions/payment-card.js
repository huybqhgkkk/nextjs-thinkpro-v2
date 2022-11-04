import { SINGLE_API } from './types';

export const action_getListDocument = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/document',
			payload,
			successType: 'REQUEST_PAYMENT_CARD_SUCCESS',
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


export const action_getDocumentDetail = async (payload = {},record, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document/detail/${record?.id}`,
			payload,
			successType: 'GET_DOCUMENT_DETAIL_SUCCESS',
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



export const action_getListBankPayment = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/bank-account',
			payload,
			options: {
				method: 'Post',
			},
			next,
		},
	};
};
//huy 1 chi tiet phieu ghi

export const action_cancelDocumentDetail = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/document/cancel-document-detail',
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

export const action_getHistoryDocument = async (payload = {},route, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document/get-history/${route?.id}`,
			payload,
			options: {
				method: 'Post',
			},
			next,
		},
	};
};