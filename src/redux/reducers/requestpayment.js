export const initialState = {
	dataListTransaction: {},
	dataListBank: [],
	delete: null,
	dataCreateDoc: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_PAYMENT_SUCCESS': {
			return { ...state,
				dataListTransaction: action.payload };
		}

		case 'REQUEST_PAYMENT_FAILED':
			return { error: action?.payload?.message || action?.payload };

		case 'REQUEST_BANK_SUCCESS': {
			return { ...state,
				dataListBank: action.payload.data,
			};
		}

		case 'REQUEST_DELETE_SUCCESS': {
			return { ...state,
				delete: action.payload.data,
			};
		}

		case 'REQUEST_BANK_FAILED':
			return { error: action?.payload?.message || action?.payload };

		case 'GET_OBJECT_DEBT_REQ_PAYMENT_SUCCESS': {
			return { ...state,
				dataCreateDoc: {
					'object_debt': action.payload?.data,
					'transaction': action.records?.transaction || [],
					'listBank': action.records?.listBank || [],
				} };
		}

		default:
			return state;
	}
};

export default reducer;
