export const initialState = {
	dataListDocument: {},
	dataDetailDocument: {},
	dataDetailDocmentNav: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_PAYMENT_CARD_SUCCESS': {
			return { ...state,
				dataListDocument: action.payload };
		}

		case 'REQUEST_PAYMENT_CARD_FAILED':
			return { error: action?.payload?.message || action?.payload };

		case 'GET_DOCUMENT_DETAIL_SUCCESS': {
			return { ...state, dataDetailDocument: action.payload };
		}

		case 'GET_OBJECT_DEBT_PAYMENT_SUCCESS': {
			return { ...state, dataDetailDocmentNav: action.payload?.data };
		}
		default:
			return state;
	}
};

export default reducer;
