import { SINGLE_API } from './types';

export const action_getEmployeeSalary = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting-record/debt-accounting',
			successType: 'EMPLOYEE_SALARY_SUCCESS',
			next,
			options: {
				method: 'POST',
			},
		},

	};
};

export const action_getListCustomerDebt = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting-record/debt-accounting',
			successType: 'CUSTOMER_DEBT_SUCCESS',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getListBankFunds = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting-record/debt-accounting',
			successType: 'BANK_FUNDS_SUCCESS',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getListSupplierDebt = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting-record/debt-accounting',
			successType: 'SUPPLIER_DEBT_SUCCESS',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getListDebtCollection = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting-record/debt-accounting',
			successType: 'DEBT_COLLECTION_SUCCESS',
			next,
			options: {
				method: 'POST',
			},
		},
	};
};

export const action_getListDebtDetail = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/history-object-accounting-record',
			successType: 'DEBT_DETAIL_SUCCESS',
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

export const action_getListObectDebt = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/get-object-debt',
			successType: 'GET_OBJECT_DEBT_SUCCESS',
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

export const action_getListAccountingDebt = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/accounting',
			successType: 'ACCOUNTING_DEBT_SUCCESS',
			next,
		},
	};
};

export const action_createDebtEmployee = async (payload = {}, records, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '',
			successType: 'CREATE_DEBT_DOC_EMPLOYEE_SUCCESS',
			next,
			records,
		},
	};
};

export const action_confirmdebt = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			payload,
			url: '/accountant/document/payment-slip',
			successType: 'SUBMIT_CREATE_DEBT_SUCCESS',
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
