// import React, { useRef, useState } from 'react';
// import { Button, Row, Col, Input, Space, Card, Select, Layout, Form, Popconfirm, Upload, InputNumber  } from 'antd';
// import ProTable from '@ant-design/pro-table';
// import {UploadOutlined} from '@ant-design/icons'
// import _ from 'lodash';
// import NavBarCreate from '../NavBar/nav-bar-create';
// import { useSelector, useDispatch } from 'react-redux';
// import { action_confirmTransaction } from '../../redux/actions/request-payment'
// import moment from 'moment';
// import {showmessageSuccess} from 'src/constants/function'
// import { useRouter } from 'next/router';
// import {formatNumber} from 'src/constants/function'
// const dateFormat = 'hh:mm DD-MM-YYYY'
// const { Option } = Select;

// const { Header, Footer, Sider, Content } = Layout;
// function SupplierPaySlips({debt}) {
// 	//render list bank

// 	const bank_account_idRef= useRef();
// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const renderListBank = (list) => {
// 		const reuslt = list.map(bank => {
// 			return (
// 				<Option value={bank.id}>
// 					{bank?.bank_account_full_label}
// 				</Option>
// 			)
// 		})
// 		return reuslt;
// 	}
// 	//xoa 1 ban ghi
// 	const handleDeleteRecord = (key) => {
// 		const dataSource = [...dataTable];
// 		setDataTable( dataSource.filter((item) => item.id !== key))
// 	}
	// const columns = [
	// 	{
	// 		title: 'Mã nhà cung cấp',
	// 		dataIndex: 'code',
	// 		width: 200
	// 	},
	// 	{
	// 		title: 'Tên nhà cung cấp',
	// 		dataIndex: 'name',
	// 		key: 'name',

	// 	},

	// 	{
	// 		title: 'Dư có',
	// 		dataIndex: 'debt_label',
	// 		key: 'debt_label',
	// 		width: 216,

	// 	},
	// 	{
	// 		title: 'Chi trả đợt này',
	// 		dataIndex: 'fee',
	// 		key: 'fee',
	// 		with: 250,
	// 		render: (text, record, index, action) => <Form  autoComplete="off" name="basic">
	// 			<Form.Item
	// 				name = "fee"
	// 				rules={[
	// 					{ required: true, message: 'Please input your cost!' },
	// 					({ getFieldValue }) => ({
	// 						validator(_, value) {
	// 						  if (value > record.amount) {

	// 							  return Promise.reject(`Giá trị này phải nhỏ hơn "Giá trị phiếu"`);

	// 						  }
	// 						  return Promise.resolve();
	// 						},
	// 					  }),
	// 					  {
	// 						  pattern: /^[0-9]+$/,
	// 						  message: "Chỉ nhập số"
	// 					  },
	// 				]}

	// 			>
	// 				<Input
	// 				placeholder="0"
	// 				prefix={"₫"}
	// 				 onChange={(e) => {
	// 					if(e.target.value <= record.amount) {
	// 						record.fee = e.target.value
	// 						action.reloadAndRest();
	// 					}
	// 				}}/>
	// 			</Form.Item>
	// 		</Form>
	// 	},
	// 	{
	// 		title: 'Dư có còn lại',
	// 		dataIndex: 'readebt_labell_amout',
	// 		render: (text, record) => formatNumber(record.amount - (record.fee ? record?.fee : 0)),
	// 	},



	// ];


// 	return (

// 						<ProTable
// 							columns={columns}
// 							rowKey="id"
// 							dataSource={debt}
// 							options={false}
// 							tableRender={(props,dom,{ toolbar,alert,table}) =>
// 								<Row style={{background:'white', padding: '24px'}}>
// 									<Col span={24} style={{padding: '9px 16px', marginBottom: '16px'}} className="title-table">
// 										<span ><b>Tổng tiền thực thu:</b> 1.230.000 đ. <b>Tổng phí trả NCC:</b> 0 đ</span>
// 									</Col>
// 									<Col span={24}>
// 										{table}
// 									</Col>
// 								</Row>
// 							}

// 							search={false}
// 							pagination={false}
// 						/>
// 	);
// }

// export default SupplierPaySlips;


import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { formatNumber } from 'src/constants/function';
import { Row, Col, Select, Alert, message } from 'antd';
import _ from 'lodash';
import { action_cancelDocumentDetail } from 'src/redux/actions/payment-card'
// eslint-disable-next-line camelcase
import { useDispatch } from 'react-redux';
import { action_updateFee } from 'src/redux/actions/common';
import { showmessageSuccess } from 'src/constants/function';
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;
const {Text} = Typography;
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
  	placeholder="0"/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
			width: '180px'
          }}
		  rules={[
			{ required: true, message: 'Không được để trống!!' },
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

const SupplierPaySlips = ({dataRow, data, onChangeDataRow}) => {
	const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
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
		title: 'Mã nhà cung cấp',
		dataIndex: ['object', 'code'],
		width: 200
	},
	{
		title: 'Tên nhà cung cấp',
		dataIndex: ['object','full_name'],
		key: 'name',

	},

	{
		title: 'Dư có',
		dataIndex: 'amount_label',
		key: 'debt_label',
		width: 120,

	},
	{
		title: 'Chi trả đợt này',
		dataIndex: 'fee',
		key: 'fee',
		with: '250px',
		editable: true,
		render: (text, record, index, action) => <Form  autoComplete="off" name="basic">
			<Form.Item
			style={{width: '180px'}}
				name = "fee"
				rules={[
					{ required: true, message: 'Không được để trống!' },
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
					placeholder="0"
					formatter={value => `${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
					parser={value => value.replace(/,/, '#').replace(/\./g, '').replace(/#/,'.')}
					addonBefore={"₫"}
					disabled={!record?.statusEdit}
					value={record?.fee}
					defaultValue={record?.fee}
				/>
			</Form.Item>
		</Form>
	},
	{
		title: 'Dư có còn lại',
		dataIndex: 'readebt_labell_amout',
		render: (text, record) => formatNumber(record.amount - (record.fee ? record?.fee : 0)),
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
				</Row>
			</Col>
			<Col span={24} style={{marginBottom: '16px'}}>
			<Alert type="info" description={<Text><b>Tổng tiền thực thu:</b> {formatNumber(handleCaculationSum(dataRow || [],'amount'))}</Text>} type="info" />
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
export default SupplierPaySlips;
