export const initialState = {
	listAccountingBill: {},
	dataDetailAccountingBill: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LIST_ACCOUNTING_BILL_SUCCESS': {
			return { ...state,
				listAccountingBill: action.payload };
		}

		case 'DETAIL_ACCOUNTING_BILL_SUCCESS': {
			return { ...state, dataDetailAccountingBill: action.payload };
		}
		default:
			return state;
	}
};

export default reducer;
