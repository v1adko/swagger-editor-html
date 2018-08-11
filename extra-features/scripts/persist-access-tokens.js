const makeTokenName = (type) => `access_token_${type}`;

const login = (type, token) => {
	window.localStorage.setItem(makeTokenName(type), token);
};

const logout = (type) => {
	window.localStorage.removeItem(makeTokenName(type));
};

let currentAdmin;
let currentUser;

const selectAuth = (state, type) =>
	state.getIn([ 'auth', 'authorized', makeTokenName(type), 'value' ]);

const makeHandleChange = (type) => {
	let current;
	return () => {
		let previous = current;

		const store = window.editor.getStore();
		const state = store.getState();

		current = selectAuth(state, type);

		if (previous !== current) {
			if (previous && !current) {
				logout(type);
			}

			if (!previous && current) {
				login(type, current);
			}
		}
	};
};

const handleAdminChange = makeHandleChange('admin');
const handleUserChange = makeHandleChange('user');

const handleAuthChange = () => {
	handleAdminChange();
	handleUserChange();
};

const authAction = (type, apiKey) => ({
	type: 'authorize',
	payload: {
		[makeTokenName(type)]: {
			name: makeTokenName(type),
			schema: {
				description: `${type} access token`,
				type: 'apiKey',
				name: 'access_token',
				in: 'header'
			},
			value: apiKey
		}
	}
});

const loginUserFromStorage = (type) => {
	const token = window.localStorage.getItem(makeTokenName(type));
	const store = window.editor.getStore();

	if (token) {
		store.dispatch(authAction(type, token));
	}
};

const loadAuthTokensFromStorage = () => {
	loginUserFromStorage('admin');
	loginUserFromStorage('user');

	const store = window.editor.getStore();
    const unsubscribe = store.subscribe(handleAuthChange);
    
    return unsubscribe;
};
