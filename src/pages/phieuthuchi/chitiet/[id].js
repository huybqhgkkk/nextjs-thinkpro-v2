import React from 'react';
import Head from 'src/components/Head';
import PopUpPaymentCard from 'src/containers/PaymentCardReseen';

const PopUpPaymentPage = (props) => {
	return (
		<>
			<Head title="Phiếu thu chi" />
			<PopUpPaymentCard {...props} />
		</>
	);
};

export default PopUpPaymentPage;
