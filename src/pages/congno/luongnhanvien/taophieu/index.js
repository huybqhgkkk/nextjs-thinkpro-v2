/* eslint-disable import/order */
/* eslint-disable quotes */
import React from 'react';
import DebtCreateDoc from "../../../../containers/DebtCreateDoc";
import Head from 'src/components/Head';

const DebtCreateDocPage = (props) => {
	return (
		<>
			<Head title="Công nợ" />
			<DebtCreateDoc />
		</>
	);
};

export default DebtCreateDocPage;
