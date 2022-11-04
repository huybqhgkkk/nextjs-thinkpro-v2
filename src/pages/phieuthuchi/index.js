import React from 'react';
import Head from 'src/components/Head';
import PaymentCardComponent from 'src/containers/PaymentCard';

const PaymentCardPage = (props) => {
	return (
		<>
			<Head title="Phiếu thu chi" />
			<PaymentCardComponent />
		</>
	);
};

export default PaymentCardPage;
