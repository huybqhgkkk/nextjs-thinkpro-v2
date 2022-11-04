/* eslint-disable import/order */
/* eslint-disable quotes */
import React from 'react';
import PaymentCardCreateDetail from "../../containers/PaymentCardCreate";
import Head from 'src/components/Head';

const PaymentCardCreate = (props) => {
	return (
		<>
			<Head title="Yêu cầu thu chi" />
			<PaymentCardCreateDetail />
		</>
	);
};

export default PaymentCardCreate;
