import React from 'react';
// import PropTypes from 'prop-types';
import Head from 'src/components/Head';

import BankFundsComponent from 'src/containers/BankFunds';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const BankFundsPage = (props) => {
	return (
		<>
			<Head title="Công nợ" />
			<BankFundsComponent />
		</>
	);
};

BankFundsPage.propTypes = propTypes;

BankFundsPage.defaultProps = defaultProps;

// BankFundsPage.Layout = ({ children }) => children; ??bo di lai co header

// LoginPage.getInitialProps = ({ store, isServer, pathname, query }) => {
// 	// store.dispatch({ type: 'FOO', payload: 'foo' }); // The component can read from the store's state when rendered
// 	return { custom: 'custom' }; // You can pass some custom props to the component from here
// };

export default BankFundsPage;
// export default connect((state) => state)(LoginPage);
