import React, { useState } from 'react';
import { Row, Col, Input, Form, Popconfirm,Alert, Tooltip, Table } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import {formatNumber, TotalSumAlert} from '../../constants/function'

function CreateSwipCart({transaction, onCreateAndSubmit}) {
	// const { transaction} = useSelector(state => state.requestpayment.dataCreateDoc);
	const [dataTable, setDataTable] = useState(transaction || []);
	const router = useRouter();
	const handleDeleteRecord = (key) => {
		const dataSource = [...dataTable];
		setDataTable( dataSource.filter((item) => item.id !== key))
	}
	onCreateAndSubmit(dataTable);
	const columns = [
		{
			title: 'Thời gian hạch toán',
			dataIndex: 'created_at',
			width: 200
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
			title: 'Giá trị phiếu',
			dataIndex: 'amount_label',
			key: 'amount_label',
			width: 216,

		},
		{
			title: 'Phí trả NCC',
			dataIndex: 'fee',
			key: 'fee',
			with: 250,
			render: (text, record, index) => <Form  autoComplete="off" name="basic">
				<Tooltip
					 trigger={['focus']}
					 title={formatNumber(record?.fee || 0)}
					 placement="topLeft"
					 overlayClassName="numeric-input"
				>
					<Form.Item
					name = "fee"
					rules={[
						{ required: true, message: 'Chỉ nhập số' },
						({ getFieldValue }) => ({
							validator(_, value) {
							  if (value > record.amount) {

								  return Promise.reject(`Giá trị này phải nhỏ hơn "Giá trị phiếu"`);

							  }
							  return Promise.resolve();
							},
						  }),
						  {
							  pattern: /^[0-9]+$/,
							  message: "Chỉ nhập số"
						  },
					]}

				>
					<Input
					prefix={"₫"}
					placeholder="0"
					onChange={(e) => {
						if(e.target.value <= record.amount) {
							dataTable.map(item => {
								if(record?.id == item?.id) item.fee = e.target.value;
								return item; 
							})
							setDataTable([...dataTable]);
						}
					}}/>
				</Form.Item>
				</Tooltip>
				
			</Form>
		},
		{
			title: 'Thực thu',
			dataIndex: 'real_amout',
			render: (text, record) => formatNumber(record.amount - (record?.fee ? record?.fee : 0 )),
		},

		{
			title: 'Hành động',
			render: (value, record) => (
				<Popconfirm title="Bạn có chắc chắn muốn xoá?" okText="Xoá" cancelText="Không" onConfirm={() => handleDeleteRecord(record.id)}>
					<a>Xóa</a>
				</Popconfirm>
			),
		},

	];


	return (
		<Row style={{background: 'white', padding: '24px'}}>
			<Col span={24} style={{marginBottom: '16px'}}>
				<Alert description={<span ><b>Tổng tiền thực thu: </b>{formatNumber(TotalSumAlert(dataTable, 'amount') + TotalSumAlert(dataTable, 'fee') )} <b>Tổng phí trả NCC: </b>{formatNumber(TotalSumAlert(dataTable, 'fee'))}</span>} type="info" />
			</Col>
			<Col span={24}>
				<Table
						columns={columns}
						rowKey="id"
						dataSource={dataTable}
						options={false}
						// tableRender={(props,dom,{ toolbar,alert,table}) =>
						// 	<Row style={{background:'white', padding: '24px'}}>
						// 		<Col span={24} style={{padding: '9px 0px', marginBottom: '16px'}}>
						// 			<Alert description={<span ><b>Tổng tiền thực thu: </b>{formatNumber(TotalSumAlert(dataTable, 'amount') + TotalSumAlert(dataTable, 'fee') )} <b>Tổng phí trả NCC: </b>{formatNumber(TotalSumAlert(dataTable, 'fee'))}</span>} type="info" />
						// 		</Col>
						// 		<Col span={24}>
						// 			{table}
						// 		</Col>
						// 	</Row>
						// }

						search={false}
						pagination={false}

				/>
			</Col>
		</Row>
						

	);
}

export default CreateSwipCart;
