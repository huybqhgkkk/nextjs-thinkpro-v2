import React from 'react';
// import PropTypes from 'prop-types';
import Head from 'src/components/Head';

import DebtDetailComponent from 'src/containers/DebtDetail';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const DebtDetailPage = (props) => {
	return (
		<>
			<Head title="DebtDetail" />
			<DebtDetailComponent />
		</>
	);
};

DebtDetailPage.propTypes = propTypes;

DebtDetailPage.defaultProps = defaultProps;

export default DebtDetailPage;
