import React from 'react';
import Head from 'src/components/Head';
import AccountingBillComponent from 'src/containers/AccountingBill';

function AccountingBillPage(props) {
	return (
		<>
			<Head title="Phiếu kế Toán" />
			<AccountingBillComponent />
		</>
	);
}

AccountingBillPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

AccountingBillPage.defaultProps = {
	// classes: {},
};
export default AccountingBillPage;
