import React from 'react';
import Head from 'src/components/Head';
import FixAcountingBill from 'src/containers/AccountingBill/fixAccountingBill';

const FixAcountingBillPage = (props) => {
	return (
		<>
			<Head title="FixAcountingBillPage" />
			<FixAcountingBill />
		</>
	);
};

export default FixAcountingBillPage;
