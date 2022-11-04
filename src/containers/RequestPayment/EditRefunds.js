import React from 'react';
import { Row, Col, Input, Select, Form, Alert, message, Typography, InputNumber, Table } from 'antd';
import _ from 'lodash';
// eslint-disable-next-line camelcase
import { PlusOutlined } from '@ant-design/icons';

import { formatNumber, TotalSumAlert } from 'src/constants/function';
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;
const {Text} = Typography

const EditRefunds = ({dataRow, data,onChangeDataRow}) => {
	const [form] = Form.useForm();
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
			title: 'Tài khoản của khách hàng',
			dataIndex: 'amount_label',
			key: 'amount_label',
		},
		{
			title: 'Giá trị phiếu',
			dataIndex: 'fee',
			key: 'fee',
			render: (text, record, index, action) => {
				return (
			<Form autoComplete="off" name="basic">
			<Form.Item
				name = "fee"
				rules={[
					{ required: true, message: 'Please input your cost!' },
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
				<InputNumber
					formatter={value => `${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
					parser={value => value.replace(/,/, '#').replace(/\./g, '').replace(/#/,'.')}
					addonBefore={"₫"}
					placeholder="0"
					disabled={!record?.statusEdit}
					value={(record?.fee)}
					defaultValue={(record?.fee)}


				/>
			</Form.Item>
		</Form>
				);
			}
		},
		{
			title: 'Thực chi',
			width: '164px',
			dataIndex: 'amount_real_label',
			key: 'amount_real_label',
			render: (text, record) => formatNumber(record?.amount - (record?.fee ?record?.fee : 0))
		},

	];


	return (
		<Row style={{background: 'white', padding: '0 24px'}}>
			<Col span={24} style={{padding: '16px 2px'}}>
				<Row align="middle" justify="space-between">
					<Col span={6} style={{paddingLeft: '8px'}}>
						<Text strong style={{fontSize: '16px'}}>Danh sách phiếu thu</Text>
					</Col>
					<Col span={6} style={{paddingRight: '8px'}}>
						<Row style={{ width: '100%' }}>
							<Col span={24}>
								<Form form={form} style={{marginTop: '8px'}}>
									<Form.Item name="code">
										<Search placeholder="Tìm chính xác và thêm"  enterButton={<PlusOutlined onClick={async () => {
											const result = await dispatch(await action_getListTransactionSearch({code: form.getFieldValue("code")}));
											if(result) {
												if (!_.isEmpty(result.data)){
													message.success("Thêm phiếu thành công")
												}
												onChangeDataRow(prev => [...prev,...result?.data])
												form.resetFields();
											}else {
												message.error("Mã phiếu không tồn tại");
											}
										}}/>}
										/>
									</Form.Item>
								</Form>

							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
			<Col span={24} style={{marginBottom: '16px'}}>
				<Alert type="info" description={<Text><b>Tổng tiền thực thu:</b> {formatNumber(TotalSumAlert(dataRow,'amount_real'))}</Text>} type="info" />
			</Col>
			<Col span={24}>
			<Table
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
export default EditRefunds;
