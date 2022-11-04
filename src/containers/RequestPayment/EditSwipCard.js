// import React, { useEffect, useRef, useState } from 'react';
// import { Row, Col, Input, Select, Popconfirm, Form, Alert, message } from 'antd';
// import ProTable from '@ant-design/pro-table';
// import _ from 'lodash';
// // eslint-disable-next-line camelcase
// import { useSelector, useDispatch } from 'react-redux';
// import { PlusOutlined } from '@ant-design/icons';
// import {  action_updateFee } from 'src/redux/actions/common';
// import { showmessageSuccess } from 'src/constants/function';
// import moment from 'moment';
// import { action_getListTransaction } from 'src/redux/actions/request-payment';




// const EditEmployeeSalary = ({dataRow, data, onChangeDataRow}) => {

// 	const { TextArea } = Input;
// 	const { Search } = Input;
// 	const { Option } = Select;
// 	const feeEditRecordRef = useRef();

// 	const dispatch = useDispatch();
// 	const [form] = Form.useForm();


// 	//Delete Record
// 	const handleDeleteRecord = (key) => {
// 		const dataSourse = [...dataRow];
// 		onChangeDataRow(dataSourse.filter(value => value?.id !== key))
// 	}
// 	//thay doi trang thai phieu
	// const columns = [
	// 	{
	// 		title: 'Thời gian',
	// 		dataIndex: 'created_at',
	// 		key: 'created_at',
	// 	},
	// 	{
	// 		title: 'Phiếu ghi',
	// 		dataIndex: 'code',
	// 		key: 'code',
	// 	},
	// 	{
	// 		title: 'Chứng từ',
	// 		dataIndex: 'license',
	// 		key: 'license',
	// 	},
	// 	{
	// 		title: 'Giá trị phiếu',
	// 		dataIndex: 'amount_label',
	// 		key: 'amount_label',
	// 	},
	// 	{
	// 		title: 'Phí trả NCC',
	// 		dataIndex: 'fee',
	// 		key: 'fee',
	// 		render: (text, record, index, action) => {

	// 			const [form] = Form.useForm();
	// 			return (
	// 		<Form form={form} autoComplete="off" name="basic">
	// 		<Form.Item
	// 			name = "fee"
	// 			rules={[
	// 				{ required: true, message: 'Please input your cost!' },
	// 				({ getFieldValue }) => ({
	// 					validator(_, value) {
	// 					  if (value > record.amount) {

	// 						  return Promise.reject(`Giá trị này phải nhỏ hơn "Giá trị phiếu"`);

	// 					  }
	// 					  return Promise.resolve();
	// 					},
	// 				  }),
	// 				  {
	// 					  pattern: /^[0-9]+$/,
	// 					  message: "Chỉ nhập số"
	// 				  },
	// 			]}

	// 		>
	// 			{/* {console.log(record?.fee)} */}
	// 			<Input
	// 				prefix={"₫"}
	// 				placeholder="0"
	// 				onChange={(e) => {
	// 					record.fee = e.target.value;
	// 					action.reloadAndRest();
	// 				}}
	// 				disabled={!record?.statusEdit}
	// 				value={record?.fee}
	// 				defaultValue={record?.fee}


	// 			/>
	// 		</Form.Item>
	// 	</Form>
	// 			);
	// 		}
	// 	},
	// 	{
	// 		title: 'Thực thu',
	// 		width: '164px',
	// 		dataIndex: 'amount_real_label',
	// 		key: 'amount_real_label',
	// 		render: (text, record) => `${record?.amount - (record?.fee)? record?.fee : 0} đ`
	// 	},
	// 	{
	// 		title: 'Hành động',
	// 		width: '164px',
	// 		dataIndex: 'profit',
	// 		key: 'profit',
	// 		render: (text, record, index, action) => <>
	// 			<Row align="middle">
	// 				<Col span={6}>
	// 					<a
	// 						hidden={record?.statusEdit}
	// 						disabled={record?.isEditing}
	// 						onClick={() => {
	// 							record.statusEdit = true;
	// 							feeEditRecordRef.current = record?.fee;
	// 							dataRow.map(value => {
	// 								if(value?.id != record?.id) value.isEditing = true;
	// 							})
	// 						 	action?.reloadAndRest();
	// 						}}
	// 					>Sửa
	// 					</a>
	// 					<a
	// 						hidden={!record?.statusEdit}
	// 						onClick={ async () => {

	// 							record.statusEdit = false
	// 							dataRow.map(value => {
	// 								if(value?.id != record?.id) value.isEditing = false;
	// 							})
	// 							const updateFee = await dispatch(await action_updateFee({id: record?.id, amount: record?.amount, fee: record?.fee}))
	// 							updateFee && showmessageSuccess("Sửa thành công!")
	// 							action?.reloadAndRest();
	// 						}}
	// 					>Lưu
	// 					</a>
	// 				</Col>
	// 				<Col span={8}>
	// 					<Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDeleteRecord(record.id)} >
	// 						<a hidden={record?.statusEdit} disabled={record?.isEditing}>Xóa</a>
	// 					</Popconfirm>
	// 					<Popconfirm title="Bạn có chắc chắn muốn hủy?" onConfirm={() => {
	// 						record.statusEdit = false
	// 						const dataSourse = [...dataRow]
	// 						record.fee = feeEditRecordRef.current;
	// 						const result = dataSourse.map(value => {
	// 							if(value?.id != record?.id) value.isEditing = false;
	// 							return value;
	// 						})
	// 						onChangeDataRow([...result])
	// 						action?.reloadAndRest();
	// 						}}
	// 						>
	// 						<a hidden={!record?.statusEdit}>Hủy</a>
	// 					</Popconfirm>
	// 				</Col>
	// 			</Row>
    //                                         </>,
	// 	},
	// ];


// 	return (

// 							<ProTable
// 								headerTitle={<span style={{ fontSize: '16px' }}> Danh sách phiếu thu</span>}
// 								columns={columns}
// 								rowKey="id"
// 								options={{ density: false }}
// 								dataSource={dataRow}
// 								pagination={false}
// 								search={false}
// 								toolBarRender={() => [
// 								// eslint-disable-next-line react/jsx-key
// 									<Row style={{ width: '100%', }}>
// 										<Col span={24}>
// 											<Form form={form} style={{marginTop: '8px'}}>
// 												<Form.Item name="code">
// 													<Search placeholder="tìm mã phiếu và thêm"  enterButton={<PlusOutlined onClick={async () => {
// 														const result = await dispatch(await action_getListTransaction({code: form.getFieldValue("code")}));
// 														if(result) {
// 															if (!_.isEmpty(result.data)){
// 																message.success("Thêm phiếu thành công")
// 															}else {
// 																message.error("Mã phiếu không tồn tại");
// 															}
// 															onChangeDataRow(prev => [...prev,...result?.data]);
// 															form.resetFields();
// 														}
// 													}}/>}
// 													/>
// 												</Form.Item>
// 											</Form>

// 										</Col>
// 									</Row>,
// 								]}

// 								// eslint-disable-next-line react/jsx-no-duplicate-props
// 								options={false}
// 								// eslint-disable-next-line react/jsx-props-no-multi-spaces
// 								tableRender={(props, dom, { toolbar, alert, table }) =>
//                                 <Row style={{ padding: '0 24px',  background: 'white'}}>
// 									<Col span={24}>{toolbar}</Col>
// 									<Col span={24} style={{  marginBottom: '16px' }}>
// 										<Alert description={<span><b>Tổng tiền thực thu:</b> 1.230.000 đ. <b>Tổng phí:</b> 0 đ</span>} type="info" />
// 									</Col>
// 									<Col span={24}>{table}</Col>
//                                 </Row>}
// 							/>


// 	);
// };
// export default EditEmployeeSalary;





import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { formatNumber } from 'src/constants/function';
import { Row, Col, Select, Alert, message } from 'antd';
import _ from 'lodash';
// eslint-disable-next-line camelcase
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { action_updateFee } from 'src/redux/actions/common';
import { showmessageSuccess } from 'src/constants/function';
import { action_getListTransactionSearch } from 'src/redux/actions/request-payment';
import { action_cancelDocumentDetail } from 'src/redux/actions/payment-card'
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;
const {Text} = Typography;
let money = 0;
const handleCaculationSum = (data, type) => {
	return data.reduce((total, items) => {
		return total+=(items[type] ? items[type] : 0);
	},0)
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
	
  const inputNode =  <InputNumber
  	formatter={value => `${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
	parser={value => value.replace(/,/, '#').replace(/\./g, '').replace(/#/,'.')}
	addonBefore={"₫"} 
  placeholder="0"
  />;
  
  return (
    <td {...restProps}>
      {editing ? (
		  
	<Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
		  rules={[
			{ required: true, message: 'Không được bỏ trống!' },
			({ getFieldValue }) => ({
				validator(_, value) {
				  if (value > record.amount) {

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
          {inputNode}
        </Form.Item>
        
      ) : (
        children
      )}
    </td>
  );
};

const EditSwipCard = ({dataRow, data, onChangeDataRow}) => {
	const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [formS] = Form.useForm();
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key, record) => {
    try {
      const row = await form.validateFields();
	  row.fee = Math.floor(row?.fee)
      const newData = [...dataRow];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
		console.log(newData);
        onChangeDataRow(newData);
        setEditingKey('');
		const updateFee = await dispatch(await action_updateFee({id: record?.id, amount: record?.amount, fee: row?.fee}))
		updateFee && showmessageSuccess("Sửa thành công!")
      } else {
        newData.push(row);
        onChangeDataRow(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDeleteRecord = async (key) => {
	const result = await dispatch( await action_cancelDocumentDetail({id: key}) );
	if(result) {
		message.success('Xóa thành công!');
		const dataSourse = [...dataRow];
		onChangeDataRow(dataSourse.filter(value => value?.id !== key))
	}
	
}

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
	{
		title: 'Phí trả NCC',
		dataIndex: 'fee',
		key: 'fee',
		editable: true,
		render: (text, record, index, action) => {
			return (
		<Form autoComplete="off" name="basic">
		<Form.Item
			name = "fee"
			rules={[
				{ required: true, message: 'Không được bỏ trống!' },
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
				value={record?.fee}
				defaultValue={record?.fee}
			/>
		</Form.Item>
	</Form>
			);
		}
	},
	{
		title: 'Thực thu',
		width: '164px',
		dataIndex: 'amount_real_label',
		key: 'amount_real_label',
		render: (text, record) => formatNumber(record?.amount - (record?.fee ?record?.fee : 0))
	},
	{
		title: 'Hành động',
		width: '164px',
		dataIndex: 'profit',
		key: 'profit',
		render: (_, record) => {
			const editable = isEditing(record);
			return editable ? (
			  <Text>
				<Typography.Link
				  onClick={() => save(record.id, record)}
				  style={{
					marginRight: 8,
				  }}
				>
				  Lưu
				</Typography.Link>
				<Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={cancel}>
				  <a>Hủy</a>
				</Popconfirm>
			  </Text>
			) : (
				<>
					<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}  style={{marginRight: '10px'}}>
						Sửa
					</Typography.Link>
					<Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDeleteRecord(record.id)}  >
						<a disabled={editingKey !== ''}>Xóa</a>
					</Popconfirm>
				</>

			);
		  },
	},
];




  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
		dataIndex: col.dataIndex,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
		<Row style={{background: 'white', padding: '0 24px'}}>
			<Col span={24} style={{padding: '16px 2px'}}>
				<Row align="middle" justify="space-between">
					<Col span={6} style={{paddingLeft: '8px'}}>
						<Text strong style={{fontSize: '16px'}}>Danh sách phiếu thu</Text>
					</Col>
					<Col span={6} style={{paddingRight: '8px'}}>
						<Row style={{ width: '100%' }}>
							<Col span={24}>
								<Form form={formS} style={{marginTop: '8px'}}>
									<Form.Item name="code">
										<Search placeholder="Tìm chính xác và thêm"  enterButton={<PlusOutlined onClick={async () => {
											const result = await dispatch(await action_getListTransactionSearch({code: formS.getFieldValue("code")}));
											if(result) {
												if (!_.isEmpty(result.data)){
													message.success("Thêm phiếu thành công")
												}
												onChangeDataRow(prev => [...prev,...result?.data])
												formS.resetFields();
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
				<Alert type="info" description={<Text><b>Tổng tiền thực thu:</b> {formatNumber(handleCaculationSum(dataRow,'amount') - handleCaculationSum(dataRow,'fee'))} <b>Tổng phí: </b>{formatNumber(handleCaculationSum(dataRow,'fee'))}</Text>} type="info" />
			</Col>
			<Col span={24}>
			<Table
				components={{
				body: {
					cell: EditableCell,
				},
				}}
				bordered
				pagination={false}
				dataSource={dataRow}
				columns={mergedColumns}
			/>
			</Col>
		</Row>
      
    </Form>
  );
};
export default EditSwipCard;
