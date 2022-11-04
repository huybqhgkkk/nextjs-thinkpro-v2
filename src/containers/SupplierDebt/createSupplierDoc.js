import React, { useState } from 'react';
import {
	Table,
	Row,
	Col,
	Input,
	Select,
	Layout,
	Form,
	Typography,
	Alert,
	Tooltip
} from 'antd';
import _ from 'lodash';
import {TotalSumAlert} from 'src/constants/function'
import {formatNumber} from 'src/constants/function'
const dateFormat = 'hh:mm DD-MM-YYYY'
const { Option } = Select;
const {Text} = Typography;
const { Header, Footer, Sider, Content } = Layout;
function CreateSupplierDoc({debt}) {
	//render list bank
	const [dataTable, setDataTable] = useState(debt || []);
	const columns = [
		{
			title: 'Mã nhà cung cấp',
			dataIndex: 'code',
			width: 200
		},
		{
			title: 'Tên nhà cung cấp',
			dataIndex: 'name',
			key: 'name',

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
			render: (text, record, index, action) => <Form  autoComplete="off" name="basic">
				<Tooltip
					 trigger={['focus']}
					 title={formatNumber(record?.fee || 0)}
					 placement="topLeft"
					 overlayClassName="numeric-input"
				>
					<Form.Item
					name = "fee"
					rules={[
						{ required: true, message: 'Vui lòng nhập giá trị số!' },
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
							  message: "Chỉ nhập số"
						  },
					]}

				>
					<Input
					placeholder="0"
					prefix={"₫"}
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
			title: 'Dư có còn lại',
			dataIndex: 'readebt_labell_amout',
			render: (text, record) => formatNumber(record.profit - (record.fee ? record.fee : 0)),
		},



	];


	return (
		<Row style={{ background: 'white', padding: '24px' }}>
			<Col span={24} style={{ marginBottom: '16px' }}>
				<Alert type="info" description={<Text ><b>Tổng tiền thực chi:</b> {formatNumber(TotalSumAlert(dataTable, 'fee'))} </Text>} type="info" />
			</Col>
			<Col span={24}>
				<Table
					columns={columns}
					rowKey="id"
					dataSource={dataTable}
					// tableRender={(props,dom,{ toolbar,alert,table}) =>
					// 	<Row style={{background:'white', padding: '24px'}}>
					// 		<Col span={24} style={{ marginBottom: '16px'}} className="title-table">
					// 			<Alert type="info" description={<Text ><b>Tổng tiền thực chi:</b> {formatNumber(TotalSumAlert(dataTable, 'fee'))} </Text>} type="info" />
					// 		</Col>
					// 		<Col span={24}>
					// 			{table}
					// 		</Col>
					// 	</Row>
					// }
					pagination={false}
				/>
			</Col>
		</Row>

						
	);
}

export default CreateSupplierDoc;
