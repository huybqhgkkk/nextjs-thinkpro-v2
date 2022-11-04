import React, { useState } from 'react';
import { Row, Col, Typography, Alert, Table } from 'antd';
import _ from 'lodash';
import { formatNumber, TotalSumAlert } from '../../constants/function';

const { Paragraph } = Typography;
function CreateRefunds({ transaction }) {
	// const { transaction} = useSelector(state => state.requestpayment.dataCreateDoc);
	const [dataTable, setDataTable] = useState(transaction || []);

	const columns = [
		{
			title: 'Thời gian hạch toán',
			dataIndex: 'created_at',
			width: 200,
		},
		{
			title: 'Phiếu ghi',
			dataIndex: 'code',
			key: 'code',

		},
		{
			title: 'Chứng từ',
			dataIndex: 'license',
			key: 'license',
		},
		{
			title: 'Tài khoản của khách hàng',
			key: 'bank_account',
			render: (text, record) => <Paragraph copyable>{record?.bank_account_company?.bank_account_full_label}</Paragraph>,

		},

		{
			title: 'Giá trị phiếu',
			dataIndex: 'amount_label',
			key: 'amount_label',
			width: 216,

		},
		{
			title: 'Thực chi',
			dataIndex: 'real_amout',
			render: (text, record) => formatNumber(record.amount - (record.fee ? record?.fee : 0)),
		},
	];
	return (
		<Row style={{ background: 'white', padding: '24px' }}>
			<Col span={24} style={{ marginBottom: '16px' }}>
				<Alert description={<span><b>Tổng tiền thực chi:</b> {formatNumber(TotalSumAlert(dataTable, 'amount') + TotalSumAlert(dataTable, 'fee'))}</span>} type="info" />
			</Col>
			<Col span={24}>
				<Table
					columns={columns}
					rowKey="id"
					dataSource={dataTable}
					options={false}
					// tableRender={(props, dom, { toolbar, alert, table }) => <Row style={{ background: 'white', padding: '24px' }}>
					// 	<Col span={24} style={{ padding: '9px 0px', marginBottom: '16px' }}>
					// 		<Alert description={<span><b>Tổng tiền thực chi:</b> {formatNumber(TotalSumAlert(dataTable, 'amount') + TotalSumAlert(dataTable, 'fee'))}</span>} type="info" />
					// 	</Col>
					// 	<Col span={24}>
					// 		{table}
					// 	</Col>
					// </Row>}
					search={false}
					pagination={false}

				/>
			</Col>
		</Row>
	);
}

export default CreateRefunds;
