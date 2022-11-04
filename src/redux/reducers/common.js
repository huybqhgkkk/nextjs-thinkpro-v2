export const initialState = {
	socket: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_SOCKET_SUCCESS': {
			return { ...state, socket: action.records };
		}
		default:
			return state;
	}
};

export default reducer;
