import { SINGLE_API/* , REQUEST_ERROR */ } from './types';

export const action_getListAccountingBill = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/accountant/document-accounting',
			payload,
			successType: 'LIST_ACCOUNTING_BILL_SUCCESS',
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

export const action_getDetailAccountingBill = async (payload = {},id, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/detail/${id}`,
			payload,
			successType: 'DETAIL_ACCOUNTING_BILL_SUCCESS',
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

export const action_updateManyAccounting = async (payload = {},id, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/update`,
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

export const action_createAccountingBill = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/store`,
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

export const action_updateAccountingDetail = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/update-document-detail`,
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

export const action_deleteFileAccounting = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/delete-attachment`,
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
export const action_addAccountingDetail = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/add-document-detail`,
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
//Huy chi tiet 1 phieu ghi
export const action_cancelAccountingDocumentDetail = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/cancel-document-detail`,
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

//get hihstory 
export const action_getHistoryDocumentAccounting= async (payload = {},id, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/accountant/document-accounting/get-history/${id}`,
			payload,
			options: {
				method: 'Post',
			},
			next,
		
		},
	};
};