// /* eslint-disable no-nested-ternary */
// import { useSelector, useDispatch } from 'react-redux';
// import { UploadOutlined } from '@ant-design/icons';
// import moment from 'moment';

// import React, { useEffect, useState, useRef  } from 'react';
// import { EditableProTable, IntlProvider } from '@ant-design/pro-table';
// import { Button, Input, Select, Row, Col, Card, Upload, Popconfirm, InputNumber, Typography } from 'antd';
// import _ from 'lodash';
// import { useRouter } from 'next/router';
// import { action_getDetailAccountingBill, action_updateManyAccounting } from 'src/redux/actions/accounting-bill';
// import { action_getListAccountOnlyChild, action_getObjectAccounting } from 'src/redux/actions/common';
// import CommentComponent from 'src/components/Comment';
// import viVNIntl from 'antd/lib/locale/vi_VN';
// import NavBarAccountingEdit from '../NavBar/NavBarAccountingEdit';
// const { TextArea } = Input;
// const { Search } = Input;
// const { Option } = Select;
// const tabList = [
// 	{
// 	  key: 'tab1',
// 	  tab: 'Bình luận',
// 	},
// 	{
// 	  key: 'tab2',
// 	  tab: 'Lịch sử hoạt động',
// 	},
// ];

// const FixAcountingBill = () => {
// 	const { data } = useSelector(state => state.accountingbill.dataDetailAccountingBill);
// 	const [dataSource, setDataSource] = useState([]);
// 	const [listAccount, setListAccount] = useState([]);
// 	const [comments, setComments] = useState([]);
// 	const [histories, setHistories] = useState([]);
// 	const { TextArea } = Input;
// 	const [oldRecord, setOldRecord] = useState({})
// 	const { Option } = Select;
// 	const router = useRouter();
// 	const dispatch = useDispatch();
// 	const objectEdit = useRef({});
// 	let updateMany = {
// 		confirmed_at: moment(data?.confirmed_at).format('YYYY-MM-DD'),
// 		title: data?.note,
// 		status: data?.status,
// 		bank_account_id: data?.bank_account_id,
// 		id: data?.id,
// 	};
// 	// Thay doi ngay hach toan (update)
// 	const handleUpdateComfirmDate = async (value) => {
// 		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, confirmed_at: moment(value).format('YYYY-MM-DD') }));
// 		if (updateDate) {
// 			updateMany = ({ ...updateMany, confirmed_at: moment(value).format('hh:mm DD-MM-YYYY') });
// 		}
// 	};
// 	// thay doi trang thai phieu
// 	const handleUpdateStatus = async (value) => {
// 		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, ...value }));
// 		if (updateDate) {
// 			updateMany = ({ ...updateMany, ...value });
// 			return updateDate;
// 		}
// 	};

// 	// get detail acoooutng
// 	const getDetailAccounting = async () => {
// 		dispatch(await action_getDetailAccountingBill({
// 			status: 1,
// 			per_page: 10,
// 			page: 1,
// 		  }, router.query?.id));
// 	};
// 	useEffect(() => {
// 		getDetailAccounting();
// 	}, []);

// 	useEffect(() => {
// 		if (!_.isEmpty(data)) {
// 			setComments(data.comments);
// 			setHistories(data.histories);
// 			setDataSource(data.document_detail);
// 		}
// 	}, [data]);

// 	// get list account has
// 	useEffect(() => {
// 		const getListAccount = async () => {
// 			const result = await dispatch(await action_getListAccountOnlyChild());
// 			result && setListAccount(result);
// 		};
// 		getListAccount();
// 	}, []);
// 	// render option
// 	const renderAccount = (list) => {
// 		return list.map(item => {
// 			return (
// 				<Option value={item.id}>{item.uuid + '-' + item.name}</Option>
// 			);
// 		});
// 	};
// 	// render opton sender
// 	const renderUserDebt = (list) => {
// 		return list.map(item => {
// 			return (
// 				<Option value={item.id}>{item.full_name}</Option>
// 			);
// 		});
// 	};

// 	// select tai khoan no
// 	const handleChangeAccountSender = async (e, record) => {
// 		record.accounting_debt = e;
// 		record.senderable.code = null;
// 		record.senderable.name = ""
// 		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
// 		if (result) record.arrSender = result.data;
// 	};

// 	// select tai khoan co
// 	const handleSelectAccountReceive = async (e, record) => {
// 		record.accounting_profit = e;
// 		record.receiverable.code = null;
// 		record.receiverable.name = ""
// 		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
// 		if (result) record.arrReceive = result.data;
// 	};
// 	const columns = [
// 		{
// 			title: 'STT',
// 			valueType: 'index',
// 		},
// 		{
// 			title: 'Diễn giải',
// 			dataIndex: 'note',
// 			key: 'note',
// 			
// 			render: (text, record) => <TextArea
// 				disabled={!record?.isEditing}
// 				value={record?.note}
// 				style={{ resize: 'none' }}
// 				defaultValue={text}
// 				onChange={(e) => {
// 					record.note = e.target.value;
// 				}}
// 			/>,
// 		},
// 		{
// 			title: 'Tài khoản nợ',
// 			key: 'state',
// 			// dataIndex: 'state',
// 			with: '100%',
// 			
// 			render: (text, record, index, action) => <Select
// 				showSearch
// 				disabled={!record?.isEditing}
// 				style={{ width: '100%' }}
// 				placeholder="Select a person"
// 				optionFilterProp="children"
// 				onChange={async (e) => {
// 					await handleChangeAccountSender(e, record);
// 					action.reloadAndRest();
// 				}}
// 				defaultValue={record.accounting_debt}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			>
// 				 {renderAccount(listAccount)}
//                                             </Select>,
// 		},
// 		{
// 			title: 'Tài khoản có',
// 			key: 'account',
// 			
// 			render: (text, record, index, action) => <Select
// 				showSearch
// 				disabled={!record?.isEditing}
// 				style={{ width: '100%' }}
// 				placeholder="Select a person"
// 				onChange={async (e) => {
// 					await handleSelectAccountReceive(e, record);
// 					action.reloadAndRest();
// 				}}
// 				optionFilterProp="children"
// 				defaultValue={record.accounting_profit || null}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			>
// 				{renderAccount(listAccount)}
//                                             </Select>,
// 		},

// 		{
// 			title: 'Số tiền',
// 			key: 'amount_label',
// 			dataIndex: 'amount_label',
// 			
// 			formItemProps: {
// 				rules: [
// 					{
// 						required: true,
// 						whitespace: true,
// 						message: '此项是必填项',
// 					},
// 					{
// 						message: '必须包含数字',
// 						pattern: /[0-9]/,
// 					},
// 					{
// 						max: 16,
// 						whitespace: true,
// 						message: '最长为 16 位',
// 					},
// 					{
// 						min: 6,
// 						whitespace: true,
// 						message: '最小为 6 位',
// 					},
// 				],
// 			},
// render: (text, record) => <InputNumber
// 							disabled={!record?.isEditing}
// 							defaultValue={record?.amount}
// 							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// 							parser={value => value.replace(/\$\s?|(,*)/g, '')}
// 						/>
// 		},
// 		{
// 			title: 'Mã đối tượng nợ',
// 			key: 'code_debt',
// 			
// 			render: (text, record) => <Select
// 				showSearch
// 				style={{ width: '100%' }}
// 				disabled={!record?.isEditing}
// 				placeholder="Select a person"
// 				optionFilterProp="children"
// 				defaultValue={record?.senderable?.code}
// 				value={record?.senderable?.code}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 				onChange={(e) => {

// 				}}
// 			>
// 				{renderUserDebt(record?.arrSender || [])}
//                              </Select>,
// 		},
// 		{
// 			title: 'Tên đối tượng nợ',

// 			dataIndex: ['senderable', 'name'],
// 			key: 'name_debt',
// 			editable: (text, record, index) => {
// 				return index !== 0;
// 			},
// 			render: (text, record) => <>{text}</>,
// 		},
// 		{
// 			title: 'Mã đối tượng có',
// 			key: 'code_receive',
// 			
// 			render: (text, record) => <Select
// 				showSearch
// 				style={{ width: '100%' }}
// 				disabled={!record?.isEditing}
// 				value={record?.receiverable?.code}
// 				placeholder="Select a person"
// 				optionFilterProp="children"
// 				defaultValue={record?.receiverable?.code || null}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			>
// 				{renderUserDebt(record?.arrReceive || [])}
//                              </Select>,
// 		},
// 		{
// 			title: 'Tên đối tượng có',
// 			dataIndex: ['receiverable', 'name'],
// 			key: 'name_has',
// 			editable: (text, record, index) => {
// 				return index !== 0;
// 			},
// 		},
// 		{
// 			title: 'Hành động',
// 			
// 			render: (text, record, _, action) => {

// 				return record?.isEditing ? (
// 				  <span>
// 					<Typography.Link
// 					  onClick={() => save(record.id, record)}
// 					  style={{
// 						marginRight: 8,
// 					  }}
// 					>
// 					  Lưu
// 					</Typography.Link>
// 					<Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={() => {
// 						record.isEditing = false;
// 							const newData = [...dataSource].map(items => {
// 								if(items?.id == oldRecord?.id) items = {...oldRecord}
// 								return items;
// 							})

// 							setDataSource(newData)
// 							console.log(newData);
// 							setOldRecord({})
// 							// setDataSource([])
// 						// action.reloadAndRest()
// 					}}>
// 					  <a>Hủy</a>
// 					</Popconfirm>
// 				  </span>
// 				) : (
// 					<>
// 						<Typography.Link disabled={record?.isEditing} onClick={() => {
// 							setOldRecord({...record})
// 							record.isEditing = true;
// 							// objectEdit.current = {...record}

// 							action.reloadAndRest()
// 						}}  style={{marginRight: '10px'}}>
// 							Sửa
// 						</Typography.Link>
// 						<Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => setDataSource(dataSource.filter((item) => item.id !== record.id))}  >
// 							<a disabled={record?.isEditing}>Xóa</a>
// 						</Popconfirm>
// 					</>

// 				);
// 			  },

// 		},
// 	];
// 	console.log(dataSource);
// 	return (
// 		<>
// 			<NavBarAccountingEdit data={data} onChangeStatus={handleUpdateStatus} onChangeConfirmDate={handleUpdateComfirmDate} />
// 			<Row style={{ marginTop: '24px' }} gutter={16}>
// 				<Col span={1}> </Col>
// 				<Col span={16}>
// 					<Row>
// 						<Col span={24}>

// 							<EditableProTable
// 								columns={columns}
// 								rowKey="id"
// 								value={[...dataSource]}
// 								onChange={setDataSource}
// 								recordCreatorProps={{
// 									newRecordType: 'dataSource',
// 									record: () => ({
// 										id: Date.now(),
// 									}),
// 									creatorButtonText: <>Thêm dòng</>,
// 								}}

// 								editable={{
// 									type: 'multiple',
// 									onValuesChange: (record, recordList) => {
// 										setDataSource(recordList);
// 									},

// 								}}

// 							/>

// 						</Col>
// 						<Col span={24}>
// 							<Card style={{ padding: '24px', marginTop: '24px' }}>
// 								<div style={{ width: '30%' }}>
// 									<Upload defaultFileList={listUpload}>
// 										<Button icon={<UploadOutlined />}>Click to Upload</Button>
// 									</Upload>
// 								</div>
// 							</Card>
// 						</Col>
// 					</Row>

// 				</Col>

// 				<Col span={6} style={{ height: '500px' }}>
// 					<CommentComponent comments={comments} histories={histories} onSetComments={setComments} kind={1} id={data?.id} />
// 				</Col>
// 				<Col span={1}> </Col>
// 			</Row>
// 		</>

// 	);
// };
// export default FixAcountingBill;

// import { useSelector, useDispatch } from 'react-redux';
// import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import moment from 'moment';

// import React, { useEffect, useRef, useState } from 'react';
// import ProTable, { EditableProTable } from '@ant-design/pro-table';
// import { Button, Input, Select, Row, Col, Card, Upload, Popconfirm, Typography, Form, InputNumber, Alert } from 'antd';
// import _ from 'lodash';
// import { useRouter } from 'next/router';
// import { action_getDetailAccountingBill, action_updateManyAccounting, action_updateAccountingDetail } from 'src/redux/actions/accounting-bill';
// import { action_getListAccountOnlyChild, action_getObjectAccounting } from 'src/redux/actions/common';
// import CommentComponent from 'src/components/Comment';
// import NavBarAccountingEdit from '../NavBar/NavBarAccountingEdit';

// const listUpload = [{
// 	uid: '1',
// 	name: 'xxx.png',
// 	status: 'done',
// 	response: 'Server Error 500', // custom error message to show
// 	url: 'http://www.baidu.com/xxx.png',
// },
// {
// 	uid: '2',
// 	name: 'yyy.png',
// 	status: 'done',
// 	url: 'http://www.baidu.com/yyy.png',
// },
// {
// 	uid: '3',
// 	name: 'zzz.png',
// 	status: 'error',
// 	response: 'Server Error 500', // custom error message to show
// 	url: 'http://www.baidu.com/zzz.png',
// }];

// const { TextArea } = Input;
// const { Search } = Input;
// const { Option } = Select;

// const FixAcountingBill = () => {
// 	const { data } = useSelector(state => state.accountingbill.dataDetailAccountingBill);
// 	const [dataSource, setDataSource] = useState([]);
// 	const [listAccount, setListAccount] = useState([]);
// 	const [comments, setComments] = useState([]);
// 	const [histories, setHistories] = useState([]);
// 	const { TextArea } = Input;
// 	const [form] = Form.useForm();
// 	const { Option } = Select;
// 	const router = useRouter();
// 	const dispatch = useDispatch();
// 	const nameDoituongno = useRef('');
// 	const nameDoituongco = useRef('');
// 	let updateMany = {
// 		confirmed_at: moment(data?.confirmed_at).format('YYYY-MM-DD'),
// 		title: data?.note,
// 		status: data?.status,
// 		bank_account_id: data?.bank_account_id,
// 		id: data?.id,
// 	};
// 	const EditableCell = ({
// 		editing,
// 		dataIndex,
// 		title,
// 		inputType,
// 		record,
// 		index,
// 		children,
// 		...restProps
// 	  }) => {
// 		const inputNode = inputType == 'note' ? <TextArea

// 			style={{ resize: 'none', width: '150px' }}

// 		/> : inputType == 'accounting_debt' ? <Select
// 										showSearch
// 										style={{ width: '100%', width: '80px' }}
// 										placeholder="Select a person"
// 										optionFilterProp="children"
// 										onChange={async (e) => {
// 											await handleChangeAccountSender(e, record);
// 										}}
// 										defaultValue={record.accounting_debt}
// 										filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 									>
// 										{renderAccount(listAccount)}
// 									</Select>
// 								: inputType == 	'accounting_profit' ? <Select
// 																showSearch
// 																style={{ width: '80px' }}
// 																placeholder="Select a person"
// 																onChange={async (e) => {
// 																await handleSelectAccountReceive(e, record);
// 															}}
// 																optionFilterProp="children"
// 																// defaultValue={record.accounting_profit || null}
// 																filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 															>
// 																{renderAccount(listAccount)}
// 															</Select>
// 									: inputType == 'amount' ? <InputNumber
// 											formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// 											parser={value => value.replace(/\$\s?|(,*)/g, '')}
// 									/>
// 										// eslint-disable-next-line no-nested-ternary
// 										: inputType == 'code_debt' ? <Select

// 												showSearch
// 												style={{ width: '80px' }}
// 												placeholder="Select a person"
// 												optionFilterProp="children"
// 												filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 												onChange={(e, value) => {
// 													console.log(value);
// 													record.senderableNew = value;
// 													form.setFieldsValue({'code_debt': value.children.split('-')[0]})
// 											}}
// 										>
// 											{renderUserDebt(record?.arrSender || [])}
// 														</Select>
// 											: inputType == 'code_receive' ? <Select

// 													showSearch
// 													style={{ width: '80px' }}
// 													placeholder="Select a person"
// 													optionFilterProp="children"
// 													onChange={(e, value) => {
// 														record.receiverableNew = value;
// 														form.setFieldsValue({'code_receive': value.children.split('-')[0]})
// 													}}
// 													defaultValue={record?.receiverable?.code || null}
// 													filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 											>
// 												{renderUserDebt(record?.arrReceive || [])}
// 															</Select> : '';
// 		return (
// 			<td {...restProps}>
// 				{editing ? (
// 					<Form.Item
// 						name={inputType}
// 						style={{
// 				  margin: 0,
// 						}}
// 					>
// 						{inputNode}
// 					</Form.Item>
// 				) : (
// 			  children
// 				)}
// 			</td>
// 		);
// 	  };
	//   const handleUpdateTitle = async (value) => {
	// 	const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, title: value }));
	// 	if (updateDate) {
	// 		updateMany = ({ ...updateMany, title: value });
	// 		return true;
	// 	}
	//   }
// 	// Thay doi ngay hach toan (update)
// 	const handleUpdateComfirmDate = async (value) => {
// 		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, confirmed_at: moment(value).format('YYYY-MM-DD') }));
// 		if (updateDate) {
// 			updateMany = ({ ...updateMany, confirmed_at: moment(value).format('hh:mm DD-MM-YYYY') });
// 		}
// 	};
// 	// thay doi trang thai phieu
// 	const handleUpdateStatus = async (value) => {
// 		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, ...value }));
// 		if (updateDate) {
// 			updateMany = ({ ...updateMany, ...value });
// 			return updateDate;
// 		}
// 	};

// 	// get detail acoooutng
// 	const getDetailAccounting = async () => {
// 		dispatch(await action_getDetailAccountingBill({
// 			status: 1,
// 			per_page: 10,
// 			page: 1,
// 		  }, router.query?.id));
// 	};
// 	useEffect(() => {
// 		getDetailAccounting();
// 	}, []);

// 	useEffect(() => {
// 		if (!_.isEmpty(data)) {
// 			setComments(data.comments);
// 			setHistories(data.histories);
// 			setDataSource(data.document_detail);
// 		}
// 	}, [data]);

// 	// get list account has
// 	useEffect(() => {
// 		const getListAccount = async () => {
// 			const result = await dispatch(await action_getListAccountOnlyChild());
// 			result && setListAccount(result);
// 		};
// 		getListAccount();
// 	}, []);
// 	// render option
// 	const renderAccount = (list) => {
// 		return list.map(item => {
// 			return (
// 				<Option value={item.id}>{item.uuid + '-' + item.name}</Option>
// 			);
// 		});
// 	};
// 	// render opton sender
// 	const renderUserDebt = (list) => {
// 		return list.map(item => {
// 			return (
// 				<Option value={item.id} key={item?.type}>{item.full_name}</Option>
// 			);
// 		});
// 	};

// 	// select tai khoan no
// 	const handleChangeAccountSender = async (e, record) => {
// 		if(!_.isEmpty(record?.senderable)) {
// 			record.senderable.name = '';
// 		}
// 		record.senderableNew = {value: null, key: null}
// 		form.setFieldsValue({ 'code_debt': null });
// 		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
// 		if (result) {
// 			record.arrSender = result.data;
// 			const newData = [...dataSource];
// 			setDataSource(newData);
// 		}
// 	};

// 	// select tai khoan co
// 	const handleSelectAccountReceive = async (e, record) => {

// 		if(!_.isEmpty(record?.receiverable)) {
// 			record.receiverable.name = '';
// 		}
// 		record.receiverableNew = {value: null, key: null}
// 		form.setFieldsValue({ 'code_receive': null, 'name_debt': '' });
// 		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
// 		if (result) {
// 			record.arrReceive = result.data;
// 			const newData = [...dataSource];
// 			setDataSource(newData);
// 		}
// 	};
// 	const [editingKey, setEditingKey] = useState('');
// 	const isEditing = (record) => record.id === editingKey;

// 	const edit = (record) => {
// 		console.log(record);
// 		form.setFieldsValue({
// 			code_debt: '',
// 			code_receive: '',
// 			note: '',
// 			accounting_debt: '',
// 			accounting_profit: '',
// 			amount: '',
// 			...record, 'code_debt': record?.senderable?.code, code_receive: record?.receiverable?.code,note: record?.note, accounting_profit : record?.accounting_profit, accounting_debt: record?.accounting_debt, amount: record?.amount
// 		});
// 		nameDoituongco.current = record?.receiverable?.name;
// 		nameDoituongno.current = record?.senderable?.name;
// 		setEditingKey(record.id);
// 	};

// 	const cancel = (record) => {
// 		record.senderable = {...record?.senderable,name: nameDoituongno.current};
// 		record.receiverable = {...record?.receiverable,name: nameDoituongco.current };
// 		setEditingKey('');
// 	};

// 	const save = async (key, record) => {
// 		try {
// 			const row = await form.validateFields();
// 			const newData = [...dataSource];
// 			const index = newData.findIndex((item) => key === item.id);
// 			if (index > -1) {
// 				const item = {...newData[index], senderable: {code: row.code_debt}, receiverable: {code: row.code_receive}};
// 				newData.splice(index, 1, { ...item, ...row });
// 				setDataSource(newData);
// 				setEditingKey('');
// 				const urlFormdata = {
// 					receiverable_type: !_.isEmpty(newData[index].receiverableNew) ? Math.floor(newData[index]?.receiverableNew?.key) || null : newData[index]?.receiverable_type,
// 					receiverable_id: !_.isEmpty(newData[index].receiverableNew) ? newData[index].receiverableNew?.value || null : newData[index]?.receiverable_id,
// 					senderable_type: !_.isEmpty(newData[index].senderableNew) ? Math.floor(newData[index]?.senderableNew?.key) || null : newData[index]?.senderable_type,
// 					senderable_id: !_.isEmpty(newData[index].senderableNew) ?newData[index]?.senderableNew?.value || null : newData[index]?.senderable_id,
// 				}
// 				const updateRecrod = await dispatch(await action_updateAccountingDetail({...row,...urlFormdata,id: data?.id}));
// 				updateRecrod && showmessageSuccess('Lưu thành công!');
// 			} else {
// 				newData.push(row);
// 				setDataSource(newData);
// 				setEditingKey('');
// 			}
// 		} catch (errInfo) {
// 			console.log('Validate Failed:', errInfo);
// 		}
// 	};

// 	const columns = [
// 		{
// 			title: 'STT',
// 			valueType: 'index',
// 		},
// 		{
// 			title: 'Diễn giải',
// 			dataIndex: 'note',
// 			key: 'note',
// 			// 
// 			width: 150,
// 			editableN: true,
// 			// editableN: true,
// 			// render: (text, record) => <TextArea
// 			// 	style={{ resize: 'none' }}
// 			// 	defaultValue={text}
// 			// 	onChange={(e) => {
// 			// 		record.note = e.target.value;
// 			// 	}}
// 			// />,
// 		},
// 		{
// 			title: 'Tài khoản nợ',
// 			key: 'accounting_debt',
// 			// dataIndex: 'state',
// 			with: '88px',
// 			
// 			editableN: true,
// 			render: (text, record, index, action) => <Select
// 				disabled
// 				showSearch
// 				style={{ width: '80px' }}
// 				placeholder="Select a person"
// 				optionFilterProp="children"
// 				onChange={async (e) => {
// 					await handleChangeAccountSender(e, record);
// 					// action.reloadAndRest();
// 				}}
// 				defaultValue={record.accounting_debt}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			>
// 				 {renderAccount(listAccount)}
//                                             </Select>,
// 		},
// 		{
// 			title: 'Tài khoản có',
// 			key: 'accounting_profit',
// 			with: '88px',
// 			editableN: true,
// 			editableN: true,
// 			render: (text, record, index, action) => <Select
// 				disabled
// 				showSearch
// 				style={{ width: '80px' }}
// 				placeholder="Select a person"
// 				onChange={async (e) => {
// 					await handleSelectAccountReceive(e, record);
// 				}}
// 				optionFilterProp="children"
// 				defaultValue={record.accounting_profit || null}
// 				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			>
// 				{renderAccount(listAccount)}
//                                             </Select>,
// 		},

// 		{
// 			title: 'Số tiền',
// 			key: 'amount',
// 			dataIndex: 'amount_label',
// 			editableN: true,
// 			formItemProps: {
// 				rules: [
// 					{
// 						required: true,
// 						whitespace: true,
// 						message: '此项是必填项',
// 					},
// 					{
// 						message: '必须包含数字',
// 						pattern: /[0-9]/,
// 					},
// 					{
// 						max: 16,
// 						whitespace: true,
// 						message: '最长为 16 位',
// 					},
// 					{
// 						min: 6,
// 						whitespace: true,
// 						message: '最小为 6 位',
// 					},
// 				],
// 			},
			// render: (text, record) => <InputNumber
			// 							disabled={!record?.isEditing}
			// 							defaultValue={record?.amount}
			// 							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			// 							parser={value => value.replace(/\$\s?|(,*)/g, '')}
			// 						/>
// 		},
// 		{
// 			title: 'Mã đối tượng nợ',
// 			dataIndex: ['senderable', 'code'],
// 			key: 'code_debt',
// 			
// 			editableN: true,
// 			// render: (text, record) => <Select
// 			//
// 			// 	showSearch
// 			// 	style={{ width: '100%' }}
// 			// 	placeholder="Select a person"
// 			// 	optionFilterProp="children"
// 			// 	defaultValue={record?.senderable?.code}
// 			// 	filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			// 	onChange={(e) => {

// 			// 	}}
// 			// >
// 			// 	{renderUserDebt(record?.arrSender || [])}
// 			//                  </Select>,
// 		},
// 		{
// 			title: 'Tên đối tượng nợ',

// 			dataIndex: ['senderable', 'name'],
// 			key: 'name_debt',
// 			
// 			render: (text, record) => <>{text}</>,
// 		},
// 		{
// 			title: 'Mã đối tượng có',
// 			key: 'code_receive',
// 			dataIndex: ['receiverable', 'code'],
// 			
// 			editableN: true,
// 			// render: (text, record) => <Select
// 			//
// 			// 	showSearch
// 			// 	style={{ width: '100%' }}
// 			// 	placeholder="Select a person"
// 			// 	optionFilterProp="children"
// 			// 	defaultValue={record?.receiverable?.code || null}
// 			// 	filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// 			// >
// 			// 	{renderUserDebt(record?.arrReceive || [])}
// 			//                  </Select>,
// 		},
// 		{
// 			title: 'Tên đối tượng có',
// 			dataIndex: ['receiverable', 'name'],
// 			key: 'name_has',
// 			
// 		},
// 		{
// 			title: 'Hành động',
// 			
// 			render: (_, record) => {
// 				const editable = isEditing(record);
// 				return editable ? (
// 					<span>
// 						<Typography.Link
// 							onClick={() => save(record.id, record)}
// 							style={{
// 								marginRight: 8,
// 		  }}
// 						>
// 							Lưu
// 						</Typography.Link>
// 						<Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={() => cancel(record)}>
// 							<a>Hủy</a>
// 						</Popconfirm>
// 					</span>
// 				) : (
// 					<>
// 						<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: '10px' }}>
// 							Sửa
// 						</Typography.Link>
// 						<Popconfirm
// 							title="Bạn có chắc chắn muốn xoá?"
// 							onConfirm={() => {
// 								setDataSource(dataSource.filter((item) => item.id !== record.id));
// 				  }}
// 						>
// 							<a disabled={editingKey !== ''}>Xóa</a>
// 						</Popconfirm>
// 					</>

// 				);
// 			},

// 		},
// 	];

// 	const mergedColumns = columns.map((col) => {
// 		if (!col.editableN) {
// 		  return col;
// 		}

// 		return {
// 		  ...col,
// 		  onCell: (record) => ({
// 				record,
// 				inputType: col.key,
// 				dataIndex: col.dataIndex,
// 				editing: isEditing(record),
// 		  }),
// 		};
// 	  });

// 	return (
// 		<>
// 			<NavBarAccountingEdit data={data} onChangeStatus={handleUpdateStatus} onChangeConfirmDate={handleUpdateComfirmDate} onChangeTitle={handleUpdateTitle}/>
// 			<Row style={{ marginTop: '24px' }} gutter={16}>
// 				<Col span={1}> </Col>
// 				<Col span={16}>
// 					<Row>
// 						<Col span={24}>
// 							<Form form={form} component={false}>
// 								<ProTable
// 									components={{
// 										body: {
// 											cell: EditableCell,
// 										},
// 									}}
// 									toolbar={false}
// 									options={false}
// 									search={false}
// 									pagination={false}
// 									columns={mergedColumns}
// 									rowKey="id"
// 									dataSource={dataSource}
// 									onChange={setDataSource}
// 									tableRender={(props, dom, { toolbar, alert, table }) => <Row style={{ padding: '0 24px', background: '#FFFFFF' }}>
// 										{/* <Col span={24}>{toolbar}</Col> */}
// 										<Col span={24} style={{ padding: '24px 0 0 0', marginBottom: '16px' }}>
// 											<Alert description={<span><b>Tổng tiền thực thu:</b> </span>} type="info" />
// 										</Col>
// 										<Col span={24}>{table}</Col>
// 										<Col span={24} style={{padding: '16px 0 19px 0 '}}>
// 											<Button icon={<PlusOutlined/>} style={{width: '100%', border: '1px dashed'}} onClick={() => {
// 												setDataSource(prev => [...prev, {isEditing: false, id: Date.now()}])
// 											}}>Thêm dòng</Button>
// 										</Col>
//                                      </Row>}
// 									// recordCreatorProps={{
// 									// 	newRecordType: 'dataSource',
// 									// 	record: () => ({
// 									// 		id: Date.now(),
// 									// 	}),
// 									// 	creatorButtonText: <>Thêm dòng</>,
// 									// }}

// 									// editable={{
// 									// 	type: 'multiple',
// 									// 	onValuesChange: (record, recordList) => {
// 									// 		setDataSource(recordList);
// 									// 	},

// 									// }}

// 								/>
// 							</Form>
// 						</Col>
// 						<Col span={24}>
// 							<Card style={{ padding: '24px', marginTop: '24px' }}>
// 								<div style={{ width: '30%' }}>
// 									<Upload defaultFileList={listUpload}>
// 										<Button icon={<UploadOutlined />}>Click to Upload</Button>
// 									</Upload>
// 								</div>
// 							</Card>
// 						</Col>
// 					</Row>

// 				</Col>

// 				<Col span={6} style={{ height: '991px' }}>
// 					<CommentComponent comments={comments} histories={histories} onSetComments={setComments} kind={1} id={data?.id} />
// 				</Col>
// 				<Col span={1}> </Col>
// 			</Row>
// 		</>

// 	);
// };
// export default FixAcountingBill;




import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState, useRef  } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
	Button,
	Input,
	Select,
	Row,
	Col,
	Card,
	Upload,
	Typography,
	InputNumber,
	message,
	Space,
	Alert,
	Popconfirm,
	Table
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { action_getDetailAccountingBill, 
	action_addAccountingDetail, 
	action_updateManyAccounting, 
	action_updateAccountingDetail, 
	action_deleteFileAccounting,
	action_cancelAccountingDocumentDetail,
	action_getHistoryDocumentAccounting
} from 'src/redux/actions/accounting-bill';
import { action_getListAccountOnlyChild, action_getObjectAccounting } from 'src/redux/actions/common';
import CommentComponent from 'src/components/Comment';
import NavBarAccountingEdit from '../NavBar/NavBarAccountingEdit';
import { UPLOAD_FILE_TYPE, NEXT_MEDIA_API } from 'src/utils/constants';
import {TotalSumAlert, formatNumber} from 'src/constants/function'
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;
const tabList = [
	{
	  key: 'tab1',
	  tab: 'Bình luận',
	},
	{
	  key: 'tab2',
	  tab: 'Lịch sử hoạt động',
	},
];
const {Text} = Typography;
const FixAcountingBill = () => {
	const { data } = useSelector(state => state.accountingbill.dataDetailAccountingBill);
	const [dataSource, setDataSource] = useState([]);
	const [listAccount, setListAccount] = useState([]);
	const [comments, setComments] = useState([]);
	const [histories, setHistories] = useState([]);
	const [listUpload, setListUpload] = useState([]);
	const { TextArea } = Input;
	const { Option } = Select;
	const router = useRouter();
	const countSizeFile = useRef(0)
	const dispatch = useDispatch();
	let updateMany = {
		confirmed_at: moment(data?.confirmed_at).format('YYYY-MM-DD'),
		title: data?.note,
		status: data?.status,
		bank_account_id: data?.bank_account_id,
		id: data?.id,
		status_note: data?.note,
	}
	// Thay doi ngay hach toan (update)
	const handleUpdateComfirmDate = async (value) => {
		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, confirmed_at: moment(value).format('YYYY-MM-DD') }));
		if (updateDate) {
			updateMany = ({ ...updateMany, confirmed_at: moment(value).format('YYYY-MM-DD') });
			data.confirmed_at = moment(value).format('YYYY-MM-DD');
		}
	};
	const handleUpdateTitle = async (value) => {
		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, title: value, }));
		if (updateDate) {
			updateMany = ({ ...updateMany, title: value });
			data.note = value;
			message.success('Lưu thành công!')
			return true;
		}
	  }
	// thay doi trang thai phieu
	const handleUpdateStatus = async (value) => {
		const updateDate = await dispatch(await action_updateManyAccounting({ ...updateMany, ...value }));
		if (updateDate) {
			const getHistoris = await dispatch(await action_getHistoryDocumentAccounting({},  router.query?.id));
			setHistories(getHistoris?.data)
			updateMany = ({ ...updateMany, ...value });
			data.status = value.status;

			return updateDate;
		}
	};

	// get detail acoooutng
	const getDetailAccounting = async () => {
		dispatch(await action_getDetailAccountingBill({
			// status: 1,
			// per_page: 10,
			// page: 1,
		  }, router.query?.id));
	};
	useEffect(() => {
		getDetailAccounting();
	}, []);

	useEffect(() => {
		if (!_.isEmpty(data)) {
			setComments(data.comments);
			setHistories(data.histories);
			setDataSource(data.document_detail);
			setListUpload(data?.attachments.map(items => {
				const fileName = items?.file_path.split('/');
				return {
					uid: items?.id,
					name: fileName[_.size(fileName)-1],
					status: 'done',
					url: `${NEXT_MEDIA_API}/${items?.file_path}`,
				}
			}))
		}
	}, [data]);

	// get list account has
	useEffect(() => {
		const getListAccount = async () => {
			const result = await dispatch(await action_getListAccountOnlyChild());
			result && setListAccount(result);
		};
		getListAccount();
	}, []);
	// render option
	const renderAccount = (list) => {
		return list.map(item => {
			return (
				<Option value={item.id}>{item.uuid + '-' + item.name}</Option>
			);
		});
	};
	// render opton sender
	const renderUserDebt = (list) => {
		return list.map((item, index) => {
			return (
				<>
				{item.id ? <Option style={{width: '100%', padding: '5px 12px'}} value={item.id} key={item?.type + "-" + item.name}>
					<Row>
						<Col span={24} style={{marginBottom: '8xp'}}>
							 <Text strong>{item?.code + "-" +item.name}</Text>
						</Col>
						<Col span={14}>
							Địa chỉ: {item.full_name}
						</Col>
						<Col span={8} offset={1}>
							Điện thoại: {item.phone}
						</Col>
					</Row>
				</Option> : ""}
				</>
			);
		});
	};

	// select tai khoan no
	const handleChangeAccountSender = async (e, record) => {
		record.accounting_debt = e;
		if(!_.isEmpty(record?.senderable)) {

			record.senderable.id = null;
			record.senderable.name = "";
			record.senderable.full_name = ""
		}
		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
		if (result) record.arrSender = result.data;
	};

	// select tai khoan co
	const handleSelectAccountReceive = async (e, record) => {
		record.accounting_profit = e;
		if(!_.isEmpty(record?.receiverable)) {

			record.receiverable.id = null;
			record.receiverable.name = "";
			record.receiverable.full_name = ""
		}

		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
		if (result) record.arrReceive = result.data;
	};
	const columns = [
		{
			title: 'STT',
			render: (text, record) =>{return dataSource.indexOf(record) + 1}
				
		},
		{
			title: 'Diễn giải',
			dataIndex: 'note',
			key: 'note',
			render: (text, record) => <TextArea
				style={{ resize: 'none', width: '88px' }}
				defaultValue={text}
				onChange={(e) => {
					record.note = e.target.value;
				}}
			/>,
		},
		{
			title: 'Tài khoản nợ',
			key: 'state',
			// dataIndex: 'state',
			render: (text, record, index, action) => <Select
				showSearch
				style={{ width: '88px' }}
				placeholder="Tìm kiếm"
				optionFilterProp="children"
				dropdownStyle={{minWidth: '250px'}}
				onChange={async (e) => {
					await handleChangeAccountSender(e, record);
					setDataSource([...dataSource]);
				}}
				defaultValue={record.accounting_debt}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			>
				 {renderAccount(listAccount)}
			</Select>,
		},
		{
			title: 'Tài khoản có',
			key: 'account',
			render: (text, record, index, action) => <Select
				showSearch
				style={{ width: '88px' }}
				placeholder="Tìm kiếm"
				dropdownStyle={{minWidth: '250px'}}
				onChange={async (e) => {
					await handleSelectAccountReceive(e, record);
					setDataSource([...dataSource]);
				}}
				optionFilterProp="children"
				defaultValue={record.accounting_profit || null}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			>
				{renderAccount(listAccount)}
			</Select>,
		},

		{
			title: 'Số tiền',
			key: 'amount',
			dataIndex: 'amount_label',
			formItemProps: {
				rules: [
					{
						required: true,
						whitespace: true,
						message: '此项是必填项',
					},
					{
						message: '必须包含数字',
						pattern: /[0-9]/,
					},
					{
						max: 16,
						whitespace: true,
						message: '最长为 16 位',
					},
					{
						min: 6,
						whitespace: true,
						message: '最小为 6 位',
					},
				],
			},
			render: (text, record, index, action) => <InputNumber
											onChange={(e) => {
												record.amount = e;
												setDataSource([...dataSource]);
											}}
											defaultValue={record?.amount}
											formatter={value => `${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
											parser={value => value.replace(/,/, '#').replace(/\./g, '').replace(/#/,'.')}
										/>
		},
		{
			title: 'Mã đối tượng nợ',
			key: 'code_debt',
			render: (text, record,index, action) => <Select
				showSearch
				style={{ width: '100px' }}
				placeholder="Tìm kiếm"
				optionFilterProp="children"
				dropdownStyle={{minWidth: '370px'}}
				value={record?.senderable?.id}
				// defaultValue={record?.senderable?.id}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				onChange={(e, value) => {
					record.senderable = {...record?.senderable, id: e, type: value?.key.split('-')[0], name: value?.key.split('-')[1]};
					setDataSource([...dataSource]);
				}}
			>
				{renderUserDebt(!_.isEmpty(record?.arrSender) ? record?.arrSender : !_.isEmpty(record?.senderable) ? [record?.senderable] : [])}
			</Select>,
		},
		{
			title: 'Tên đối tượng nợ',
			dataIndex: ['senderable', 'name'],
			key: 'name_debt',
			render: (text, record) => <>{text}</>,
		},
		{
			title: 'Mã đối tượng có',
			key: 'code_receive',
			render: (text, record, index, action) => <Select
				showSearch
				style={{ width: '100px' }}
				placeholder="Tìm kiếm"
				dropdownStyle={{minWidth: '370px'}}
				optionFilterProp="children"
				value={record?.receiverable?.id}
				onChange={(e, value) => {
					record.receiverable = {...record?.receiverable, id: e, type: value?.key.split('-')[0], name: value?.key.split('-')[1]};
					setDataSource([...dataSource]);
				}}
				defaultValue={record?.receiverable?.id || null}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			>
				{renderUserDebt(!_.isEmpty(record?.arrReceive) ? record?.arrReceive : !_.isEmpty(record?.receiverable) ? [record?.receiverable] : [])}
			</Select>,
		},
		{
			title: 'Tên đối tượng có',
			dataIndex: ['receiverable', 'name'],
			key: 'name_has',
		},
		{
			title: 'Hành động',
			render: (text, record, _, action) => [
				<a
				onClick={async() => {
					if(!record?.new) {
							const urlFormData = {
								id: record?.new ? data?. id : record?.id,
								amount: record?.amount,
								note: record?.note,
								accounting_debt: record?.accounting_debt,
								accounting_profit: record?.accounting_profit,
								receiverable_id: record?.receiverable?.id,
								receiverable_type: record?.receiverable?.id ? record?.receiverable?.type : null,
								senderable_id: record?.senderable?.id,
								senderable_type: record?.senderable?.id ? record?.senderable?.type : null,
							}
								const result = await dispatch(await action_updateAccountingDetail(urlFormData));
								if(result) {
									message.success('Lưu thành công!');
								} else {
									message.error("Không được bổ trống!")
								}
					} else {
						const urlFormData = {
							id: record?.new ? data?. id : record?.id,
							'accounting_record[amount]': record?.amount,
							'accounting_record[note]': record?.note,
							'accounting_record[accounting_debt]': record?.accounting_debt,
							'accounting_record[accounting_profit]': record?.accounting_profit,
							'accounting_record[receiverable_id]': record?.receiverable?.id,
							'accounting_record[receiverable_type]': record?.receiverable?.id ? record?.receiverable?.type : null,
							'accounting_record[senderable_id]': record?.senderable?.id,
							'accounting_record[senderable_type]': record?.senderable?.id ? record?.senderable?.type : null,
						}
						const result = await dispatch(await action_addAccountingDetail(urlFormData));
							if(result) {
								message.success('Lưu thành công!');
							} else {
								message.error("Không được bổ trống!")
							}
					}

				}}
				>
					Lưu
				</a>,
				// <a
				//   style={{marginLeft: '10px'}}
				// 	key="delete"
				// 	onClick={async () => {
						// const result = await dispatch( await action_cancelAccountingDocumentDetail({id: record?.id, document_accounting_id: router.query?.id}));
						// if(result) {
						// 	message.success("Xóa thành công!");
						// 	setDataSource(dataSource.filter((item) => item.id !== record.id));
						// }
						
				//   }}
				// >
				// 	Xóa
				// </a>,
				<Popconfirm
					title="Bạn thật sự có muốn xóa ?"
					onConfirm={async () => {
						if(!record?.new) {
							const result = await dispatch( await action_cancelAccountingDocumentDetail({id: record?.id, document_accounting_id: router.query?.id}));
							if(result) {
								message.success("Xóa thành công!");
								setDataSource(dataSource.filter((item) => item.id !== record.id));
							}
						} else {
							message.success("Xóa thành công!");
							setDataSource(dataSource.filter((item) => item.id !== record.id));
						}
						
					}}
				>
					<a  style={{marginLeft: '10px'}}>Xóa</a>
				</Popconfirm>
			  ],

		},
	];

	const handleUploadFile = async (value, type) => {
		// 1: upload, 2: delete file
		if(type == 1) {
			const result = await dispatch(await action_updateManyAccounting({ ...updateMany, 'images[0]': value}))
			if(result) {

				// setListUpload(result?.data?.attachments.map(items => {
				// 	const fileName = items?.file_path.split('/');
				// 	return {
				// 		uid: items?.id,
				// 		name: fileName[_.size(fileName)-1],
				// 		status: 'done',
				// 		url: `${process.env.NEXT_PUBLIC_API_URL}/${items?.file_path}`,
				// 	}
				// }))
				const newFile = result?.attachments.map(items => {
					const fileName = items?.file_path.split('/');
					return {
						uid: items?.id,
						name: fileName[_.size(fileName)-1],
						status: 'done',
						url: `${process.env.NEXT_PUBLIC_API_URL}/${items?.file_path}`,
					}
				})
				setListUpload(prev => [...prev,...newFile]);
			}
		} else {
			const result = await dispatch(await action_deleteFileAccounting({file_id: value?.uid, id: router.query?.id}));
			if(result) {
				const newListFile = [...listUpload]
				setListUpload(newListFile.filter(items => items.uid != value.uid))
				message.success("Xoá thành công!");
			} else message.error("Xóa thất bại!")
		}

	}
	return (
		<>
			<NavBarAccountingEdit data={data} onChangeStatus={handleUpdateStatus} onChangeConfirmDate={handleUpdateComfirmDate} onChangeTitle={handleUpdateTitle}/>
			<Row style={{ marginTop: '24px' }} gutter={16}>
				<Col span={1}> </Col>
				<Col span={16}>
					<Row>
						<Col span={24}>
							<Row style={{padding: '24px', background: 'white'}}>
									<Col span={24} style={{marginBottom: '16px'}}>
										<Alert type="info" description={<Text><b>Tổng số tiền: </b>{formatNumber(TotalSumAlert(dataSource, 'amount'))}</Text>} type="info" />
									</Col>
									<Col span={24}>
										<Table
											size="small"
											pagination={false}
											columns={columns}
											rowKey="id"
											dataSource={dataSource}
											// tableRender={(props, defaultDom, {toolbar, alert, table}) => 
											// <Row style={{padding: '24px', background: 'white'}}>
											// 	<Col span={24} style={{marginBottom: '16px'}}>
											// 		<Alert type="info" description={<Text><b>Tổng số tiền: </b>{formatNumber(TotalSumAlert(dataSource, 'amount'))}</Text>} type="info" />
											// 	</Col>
											// 	<Col span={24}>
											// 		{table}
											// 	</Col>
											// </Row>
												
											// }
											// recordCreatorProps={{
											// 	newRecordType: 'dataSource',
											// 	record: () => ({
											// 		id: Date.now(),
											// 		new: true,
											// 	}),
											// 	creatorButtonText: <>Thêm dòng</>,
											// }}

											// editable={{
											// 	type: 'multiple',
											// 	onValuesChange: (record, recordList) => {
											// 		setDataSource(recordList);
											// 	},
											// }}
										/>
									</Col>
									<Col span={24} style={{marginTop: '8px'}}>
								<Button 
									icon={<PlusOutlined/>} 	style={{border: '1px dashed #D9D9D9', width: '100%'}}
									onClick={() => {
										setDataSource([...dataSource, {id: Date.now(), new: true,}])
									}}
								>Thêm dòng	
								</Button>
							</Col>
								</Row>
						</Col>
						<Col span={24}>
							<Card style={{ padding: '24px', marginTop: '24px' }}>
								<div style={{ width: '30%' }}>
									<Upload
										fileList={listUpload}
										accept={UPLOAD_FILE_TYPE}
										multiple
										beforeUpload={(file) => {
											const isLt2M = (file.size +countSizeFile.current) / 1024 / 1024 <= 5;
											if (isLt2M) {
												countSizeFile.current = countSizeFile.current + file.size;
												handleUploadFile(file, 1);
												return false;
											}
											else {
												message.error('Dung lượng file phải nhỏ hơn 5MB!');
												return true;
											}
										}}
										onRemove={async (e) => {
											handleUploadFile(e, 2);
										}}
									>
										<Space direction="vertical">
											<Button icon={<UploadOutlined />}>Tải đính kèm lên</Button>
											<Text type="secondary" style={{fontSize: '14px'}}>Dung lượng file phải nhỏ hơn 5MB!</Text>
										</Space>
									</Upload>
								</div>
							</Card>
						</Col>
					</Row>

				</Col>

				<Col span={6} style={{ height: '991px' }}>
					<CommentComponent comments={comments} histories={histories} onSetComments={setComments} kind={1} id={data?.id} />
				</Col>
				<Col span={1}> </Col>
			</Row>
		</>

	);
};
export default FixAcountingBill;
