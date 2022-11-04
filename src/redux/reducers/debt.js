export const initialState = {
	listEmployeeSalary: {},
	listCustomerDebt: {},
	listBankFunds: {},
	listSupplierDebt: {},
	listDebtCollection: {},
	listDebtDetail: {},
	listObjectDebtDetail: {},
	listAccountingDebt: {},
	listCreateDebtDoc: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EMPLOYEE_SALARY_SUCCESS': {
			return { ...state, listEmployeeSalary: action.payload };
		}

		case 'CUSTOMER_DEBT_SUCCESS': {
			return { ...state, listCustomerDebt: action.payload };
		}

		case 'BANK_FUNDS_SUCCESS': {
			return { ...state, listBankFunds: action.payload };
		}

		case 'SUPPLIER_DEBT_SUCCESS': {
			return { ...state, listSupplierDebt: action.payload };
		}

		case 'DEBT_COLLECTION_SUCCESS': {
			return { ...state, listDebtCollection: action.payload };
		}

		case 'DEBT_DETAIL_SUCCESS': {
			return { ...state, listDebtDetail: { ...action.payload, record: action.records } };
		}

		case 'GET_OBJECT_DEBT_SUCCESS': {
			return { ...state, listObjectDebtDetail: action.payload };
		}

		case 'ACCOUNTING_DEBT_SUCCESS': {
			return { ...state, listAccountingDebt: action.payload };
		}

		case 'CREATE_DEBT_DOC_EMPLOYEE_SUCCESS': {
			return { ...state, listCreateDebtDoc: { debt: action.records } };
		}

		case 'CREATE_SUPPLIER_DEBT_SUCCESS': {
			return { ...state, listCreateDebtDoc: { object_debt: action.payload?.data, debt: action.records } };
		}

		default: {
			return state;
		}
	}
};

export default reducer;
