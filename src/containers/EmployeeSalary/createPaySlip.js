import React, { useState } from 'react';
import {
	Row,
	Col,
	Input,
	Table,
	Select,
	Layout,
	Form,
	Popconfirm,
	Typography,
	Alert,
	Tooltip,
} from 'antd';
import _ from 'lodash';
import { formatNumber } from 'src/constants/function';

const dateFormat = 'hh:mm DD-MM-YYYY';
const { Option } = Select;
const { Text } = Typography;
const listUpload = [{
	uid: '1',
	name: 'xxx.png',
	status: 'done',
	response: 'Server Error 500', // custom error message to show
	url: 'http://www.baidu.com/xxx.png',
},
{
	uid: '2',
	name: 'yyy.png',
	status: 'done',
	url: 'http://www.baidu.com/yyy.png',
},
{
	uid: '3',
	name: 'zzz.png',
	status: 'error',
	response: 'Server Error 500', // custom error message to show
	url: 'http://www.baidu.com/zzz.png',
}];

const { Header, Footer, Sider, Content } = Layout;
function CreatePaySlip({ debt }) {
	const [dataTable, setDataTable] = useState(debt || []);
	// xoa 1 ban ghi
	const handleDeleteRecord = (key) => {
		const dataSource = [...dataTable];
		setDataTable(dataSource.filter((item) => item.id !== key));
	};
	const columns = [
		{
			title: 'Mã nhân viên',
			dataIndex: 'code',
			width: 200,
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'name',
			key: 'name',

		},
		{
			title: 'Mã đơn vị',
			dataIndex: 'department_code',
			key: 'department_code',
		},

		{
			title: 'Dư có',
			dataIndex: 'profit_label',
			key: 'profit_label',
			width: 216,

		},
		{
			title: 'Chi trả đợt này',
			dataIndex: 'fee',
			key: 'fee',
			with: 250,
			render: (text, record, index, action) => <Form autoComplete="off" name="basic">
				<Tooltip
					trigger={['focus']}
					title={formatNumber(record?.fee || 0)}
					placement="topLeft"
					overlayClassName="numeric-input"
				>

					<Form.Item
						name="fee"
						rules={[
							{ required: true, message: 'Không được bỏ trống!' },
							({ getFieldValue }) => ({
								validator(_, value) {
								  if (value > record.profit) {

									  return Promise.reject(`Giá trị này phải nhỏ hơn "Dư có"`);

								  }
								  return Promise.resolve();
								},
							  }),
						  {
							  pattern: /^[0-9]+$/,
							  message: 'Chỉ nhập số',
						  },
						]}

					>
						<Input
							placeholder="0"
							prefix="₫"
							onChange={(e) => {
							if (e.target.value <= record.profit) {
								dataTable.map(item => {
									if(record?.id == item?.id) item.fee = e.target.value;
									return item; 
								})
								setDataTable([...dataTable]);
							}
							}}
						/>
					</Form.Item>
				</Tooltip>
                                            </Form>,
		},
		{
			title: 'Dư có còn lại',
			dataIndex: 'real_amout',
			render: (text, record) => formatNumber(record?.profit - (record.fee ? record?.fee : 0)),
		},

		{
			title: 'Hành động',
			render: (value, record) => (
				<Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDeleteRecord(record.id)}>
					<a>Xóa</a>
				</Popconfirm>
			),
		},

	];
	const handleCaculateSum = (data) => {
		return data.reduce((sum, items) => {
			return sum += ((items.fee ? items.fee : 0) + items.profit);
		}, 0);
	};
	return (
		<Row style={{ background: 'white', padding: '24px' }}>
			<Col span={24} style={{ marginBottom: '16px' }}>
				<Alert type="info" description={<Text><b>Tổng tiền thực chi:</b> {formatNumber(handleCaculateSum(dataTable))} </Text>} type="info" />
			</Col>
			<Col span={24}>
			<Table
				columns={columns}
				rowKey="id"
				dataSource={dataTable}
				pagination={false}
			/>
			</Col>
		</Row>
		

	);
}

export default CreatePaySlip;
