import React from 'react';
// import PropTypes from 'prop-types';
import Head from 'src/components/Head';

import SupplierDebtComponent from 'src/containers/SupplierDebt';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const SupplierDebtPage = (props) => {
	return (
		<>
			<Head title="Công nợ" />
			<SupplierDebtComponent />
		</>
	);
};

SupplierDebtPage.propTypes = propTypes;

SupplierDebtPage.defaultProps = defaultProps;

// SupplierDebtPage.Layout = ({ children }) => children; ??bo di lai co header

// LoginPage.getInitialProps = ({ store, isServer, pathname, query }) => {
// 	// store.dispatch({ type: 'FOO', payload: 'foo' }); // The component can read from the store's state when rendered
// 	return { custom: 'custom' }; // You can pass some custom props to the component from here
// };

export default SupplierDebtPage;
// export default connect((state) => state)(LoginPage);
