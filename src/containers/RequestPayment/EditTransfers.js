import React from 'react';
import { Row, Col, Input, Select, Alert, Typography, Table } from 'antd';
import _ from 'lodash';
// eslint-disable-next-line camelcase
import { formatNumber, TotalSumAlert } from 'src/constants/function';

const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const EditSwipCard = ({ dataRow }) => {
	// thay doi trang thai phieu
	const columns = [
		{
			title: 'Thời gian',
			dataIndex: 'created_at',
			key: 'created_at',
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
		},
		// {
		// 	title: 'Phí trả NCC',
		// 	dataIndex: 'fee',
		// 	key: 'fee',
		// 	render: (text, record, index, action) => {

		// 		const [form] = Form.useForm();
		// 		return (
		// 	<Form form={form} autoComplete="off" name="basic">
		// 	<Form.Item
		// 		name = "fee"
		// 		rules={[
		// 			{ required: true, message: 'Please input your cost!' },
		// 			({ getFieldValue }) => ({
		// 				validator(_, value) {
		// 				  if (value > record.amount) {

		// 					  return Promise.reject(`Giá trị này phải nhỏ hơn "Giá trị phiếu"`);

		// 				  }
		// 				  return Promise.resolve();
		// 				},
		// 			  }),
		// 			  {
		// 				  pattern: /^[0-9]+$/,
		// 				  message: "Chỉ nhập số"
		// 			  },
		// 		]}

		// 	>
		// 		{/* {console.log(record?.fee)} */}
		// 		<Input
		// 			prefix={"₫"}
		// 			placeholder="0"
		// 			onChange={(e) => {
		// 				record.fee = e.target.value;
		// 				action.reloadAndRest();
		// 			}}
		// 			disabled={!record?.statusEdit}
		// 			value={formatNumberNoD(record?.fee)}
		// 			defaultValue={formatNumberNoD(record?.fee)}

		// 		/>
		// 	</Form.Item>
		// </Form>
		// 		);
		// 	}
		// },
		{
			title: 'Thực thu',
			width: '164px',
			dataIndex: 'amount_real_label',
			key: 'amount_real_label',
			// render: (text, record) => formatNumber(record?.amount - (record?.fee ?record?.fee : 0))
		},

	];

	return (
		<Row style={{ background: 'white', padding: '0 24px' }}>
			<Col span={24} style={{ padding: '16px 2px' }}>
				<Row align="middle" justify="space-between">
					<Col span={6} style={{ paddingLeft: '8px' }}>
						<Text strong style={{ fontSize: '16px' }}>Danh sách phiếu thu</Text>
					</Col>
				</Row>
			</Col>
			<Col span={24} style={{ marginBottom: '16px' }}>
				<Alert type="info" description={<Text><b>Tổng tiền thực thu:</b> {formatNumber(TotalSumAlert(dataRow, 'amount_real'))}</Text>} type="info" />
			</Col>
			<Col span={24}>
				<Table
					headerTitle={<Text style={{ fontSize: '16px' }}> Danh sách phiếu thu</Text>}
					columns={columns}
					rowKey="id"
					options={{ density: false }}
					dataSource={dataRow}
					pagination={false}
				/>
			</Col>
		</Row>

	);
};
export default EditSwipCard;
