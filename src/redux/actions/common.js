import { SINGLE_API } from './types';

export const action_getObectDebt = async (payload = {}, successType, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/get-object-debt',
			next,
			successType,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
		},
	};
};

export const actionAddComment = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document/add-comment',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
		},
	};
};

export const actionAddCommentAccounting = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document-accounting/add-comment',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
		},
	};
};

export const action_updateFee = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document/update-document-detail',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
		},
	};
};

export const action_updateMany = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document/update',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			records,
		},
	};
};

export const action_getListBankOfCompany = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/bank-account',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getListAccountOnlyChild = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting/list-only-child',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getObjectAccounting = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting/search-object-of-accounting',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

// NOTIFY REAL TIME

export const actionSaveSocketToStore = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '',
			next,
			successType: 'SAVE_SOCKET_SUCCESS',
			records,
		},
	};
};

export const actionGetListNotify = async (payload = {}, typeApi, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/notification',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			typeApi,
		},
	};
};

export const actionMarkRead = async (payload = {}, typeApi, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/mark-read',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			typeApi,
		},
	};
};
export const actionMarkReadAll = async (payload = {}, typeApi, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/mark-all-read',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			typeApi,
		},
	};
};

/// delete file

export const action_deleteAttachment = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document/delete-attachment',
			next,
			options: {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		},
	};
};
