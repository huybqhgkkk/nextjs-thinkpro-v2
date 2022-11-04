import React from 'react';
// import PropTypes from 'prop-types';

import Head from 'src/components/Head';

import RequestPaymentComponent from '../../containers/RequestPayment';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const HomePage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Yêu cầu thu chi" />
			<RequestPaymentComponent {...props} />
		</>
	);
};

HomePage.propTypes = propTypes;

HomePage.defaultProps = defaultProps;

export default HomePage;
