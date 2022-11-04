/* eslint-disable import/order */
/* eslint-disable quotes */
import React from 'react';
import Create from "../../../containers/AccountingBill/createAccountingBill";
import Head from 'src/components/Head';

const CreateAccounting = (props) => {
	return (
		<>
			<Head title="CreateAccounting" />
			<Create />
		</>
	);
};

export default CreateAccounting;
