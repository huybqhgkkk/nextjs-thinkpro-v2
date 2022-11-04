import { InputNumber, Row, Col, Input, DatePicker, Button, Upload, Select, Popconfirm, Form, Alert, Typography, Space, Table } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { action_getListAccountOnlyChild, action_getObjectAccounting } from 'src/redux/actions/common';
import { formatNumber, showmessageSuccess, TotalSumAlert } from 'src/constants/function';
import { useRouter } from 'next/router';
import { UPLOAD_FILE_TYPE } from 'src/utils/constants';
import NavBarCreateAccounting2 from '../NavBar/nav-bar-accounting2';
import { action_createAccountingBill } from '../../redux/actions/accounting-bill';

const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

const { Text } = Typography;
const CreateAccountingBillComponent = () => {
	const dispatch = useDispatch();
	const [dataSource, setDataSource] = useState([{ id: 1 }]);
	const [listAccount, setListAccount] = useState([]);
	const title = useRef();
	const upLoadFile = useRef([]);
	const [listUpload, setListUpload] = useState([]);
	const confirmAt = useRef();
	const router = useRouter();
	const [form] = Form.useForm();
	const renderAccount = (list) => {
		return list.map(item => {
			return (
				<Option value={item.id}>{item.uuid + '-' + item.name}</Option>
			);
		});
	};
	// get list account has
	useEffect(() => {
		const getListAccount = async () => {
			const result = await dispatch(await action_getListAccountOnlyChild());
			result && setListAccount(result);
		};
		getListAccount();
	}, []);
	// render opton sender
	// const renderUserDebt = (list) => {
	// 	return list.map((item, index) => {
	// 		return (
	// 			<Option value={item.id} key={item?.type + '-' + index}>{item.full_name}</Option>
	// 		);
	// 	});
	// };
	const renderUserDebt = (list) => {
		return list.map((item, index) => {
			return (
				<>
					{item.id ? <Option style={{ width: '100%', padding: '5px 12px' }} value={item.id} key={item?.type + '-' + item.name}>
						<Row>
							<Col span={24} style={{marginBottom: '8xp'}}>
								<Text strong>{item?.code + "-" + item?.name}</Text>
							</Col>
							<Col span={14}>
								Địa chỉ: {item?.full_name}
							</Col>
							<Col span={8} offset={1}>
								Điện thoại: {item?.phone}
							</Col>
						</Row>
                </Option> : <Option /> }
				</>
			);
		});
	};

	// select tai khoan no
	const handleChangeAccountSender = async (e, record) => {
		record.accounting_debt = e;
		const result = await dispatch(await action_getObjectAccounting({ 'id': e.toString() }));
		if (result) record.arrSender = result.data;
	};

	// select tai khoan co
	const handleSelectAccountReceive = async (e, record) => {
		record.accounting_profit = e;
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
				style={{ resize: 'none' }}
				defaultValue={''}
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
				style={{ width: '100px' }}
				placeholder="Tìm kiếm"
				dropdownStyle={{ minWidth: '250px' }}
				optionFilterProp="children"
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
				style={{width: '100px' }}
				dropdownStyle={{ minWidth: '250px' }}
				placeholder="Tìm kiếm"
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
			key: 'amount_label',
			dataIndex: 'amount_label',
			render: (text, record, index, action) => <InputNumber
				placeholder="0"
				onChange={(e) => {
					record.amount = e;
					setDataSource([...dataSource]);
				}}
				formatter={value => `${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
				parser={value => value.replace(/,/, '#').replace(/\./g, '').replace(/#/,'.')}
			/>,
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
		},
		{
			title: 'Mã đối tượng nợ',
			key: 'code_debt',
			render: (text, record, index, action) => <Select
				showSearch
				dropdownStyle={{ minWidth: '370px' }}
				style={{ width: '100px' }}
				placeholder="Tìm kiếm"
				optionFilterProp="children"
				defaultValue={record?.senderable?.code}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				onChange={(e, value) => {
					record.senderable_id = e;
					record.name_debt = value?.key.split('-')[1];
					record.senderable_type = Math.floor(value.key.split('-')[0]);
					setDataSource([...dataSource]);
				}}
			>
				{renderUserDebt(record?.arrSender || [])}
			</Select>,
		},
		{
			title: 'Tên đối tượng nợ',

			dataIndex: 'name_debt',
			key: 'name_debt',
			render: (text, record) => <>{text}</>,
		},
		{
			title: 'Mã đối tượng có',
			key: 'code_receive',
			render: (text, record, index, action) => <Select
				showSearch
				style={{ width: '100px' }}
				dropdownStyle={{ minWidth: '370px' }}
				placeholder="Tìm kiếm"
				optionFilterProp="children"
				defaultValue={record?.receiverable?.code || null}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				onChange={(e, value) => {
					record.receiverable_id = e;
					record.name_has = value?.key.split('-')[1];
					record.receiverable_type = Math.floor(value.key.split('-')[0]);
					setDataSource([...dataSource]);
				}}
			>
				{renderUserDebt(record?.arrReceive || [])}
			</Select>,
		},
		{
			title: 'Tên đối tượng có',
			dataIndex: 'name_has',
			key: 'name_has',
		},
		{
			title: 'Hành động',
			render: (text, record) => <Popconfirm
				title="Bạn thật sự có muốn xóa ?"
				onConfirm={() => {
					const data = [...dataSource];
					setDataSource(data.filter(value => value.id != record?.id));
				}}
			>
				<a>Xóa</a>
			</Popconfirm>,

		},
	];
	return (<>
		<NavBarCreateAccounting2 title="Tạo phiếu kế toán" />
		<Row style={{ marginTop: '24px' }}>
			<Col span={20} style={{ margin: 'auto' }}>
				<Row>
					<Col
						span={24}
						style={{
							height: '124px',
							padding: '24px 24px 38px 24px',
							background: 'white',
							marginBottom: '24px',
						}}
					>
						<Form
							form={form}
							layout="vertical"
							style={{ height: '100%' }}
						>
							<Row align="middle" style={{ height: '100%' }}>
								<Col span={8} style={{ height: '100%' }}>
									<Form.Item label="Diễn giải" name="title">
										<TextArea
											// autoSize={{ maxRows: 1 }}
											style={{ padding: '5px 12px', resize: 'auto', height: '32px', overflow: 'hidden' }}
											placeholder="Nội dung..."
											ref={title}
										/>
									</Form.Item>
								</Col>

								<Col span={8} offset={2} style={{ height: '100%' }}>
									<Form.Item label="Ngày hạch toán" style={{ height: '100%' }} name="comfirm_at">
										<DatePicker
											// size="large"
											style={{ width: '100%' }}
											defaultValue={moment(new Date(), dateFormat)}
											format={dateFormat}
											ref={confirmAt}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Col>

					<Col span={24}>
						<Row style={{ padding: '24px', background: 'white' }}>
							<Col span={24} style={{ background: '#F0F5FF', marginBottom: '16px' }}>
								<Alert style={{ padding: '9px 16px' }} description={<Text><b>Tổng số tiền: </b>{formatNumber(TotalSumAlert(dataSource, 'amount'))}</Text>} type="info" />
							</Col>

							<Col span={24}>
								<Table
									columns={columns}
									rowKey="id"
									dataSource={dataSource}
									pagination={false}
								/>
							</Col>
							<Col span={24} style={{marginTop: '8px'}}>
								<Button 
									icon={<PlusOutlined/>} 	style={{border: '1px dashed #D9D9D9', width: '100%'}}
									onClick={() => {
										setDataSource([...dataSource, {id: Date.now()}])
									}}
								>Thêm dòng	
								</Button>
							</Col>
						</Row>
					</Col>

					<Col span={24} style={{ marginTop: '24px', background: 'white', marginBottom: '200px' }}>
						<Row style={{ padding: '24px' }}>
							<Col span={6}>
								<Upload
									accept={UPLOAD_FILE_TYPE}
									multiple
									onChange={(value) => {
										upLoadFile.current = value.fileList;
									}}
									beforeUpload={(file) => {
										const isLt2M = (file.size + countSizeFile.current) / 1024 / 1024 <= 5;
										if (isLt2M) {
											countSizeFile.current += file.size;
											return false;
										}

										message.error('Dung lượng file phải nhỏ hơn 5MB!');
										return true;
									}}
								>
									<Space direction="vertical">
										<Button icon={<UploadOutlined />}>Tải đính kèm lên</Button>
										<Text type="secondary" style={{ fontSize: '14px' }}>Dung lượng file phải nhỏ hơn 5MB!</Text>
									</Space>
								</Upload>
							</Col>
						</Row>

					</Col>
				</Row>
			</Col>
		</Row>

		<Row style={{ marginTop: 30, position: 'fixed', bottom: 0, right: 0, left: 0 }}>
			<Col span={24} className="cus-button-footer">
				<div />
				{/* <div className="button-flex"> */}
				<Space>
					<Button
						type="primary"
						onClick={async () => {
							const tr = {};
							const test = [...dataSource];
							test.map((items, index) => {
								tr[`accounting_records[${index}][accounting_debt]`] = items?.accounting_debt;
								tr[`accounting_records[${index}][accounting_profit]`] = items?.accounting_profit;
								tr[`accounting_records[${index}][receiverable_id]`] = items?.receiverable_id;
								tr[`accounting_records[${index}][receiverable_type]`] = items?.receiverable_type;
								tr[`accounting_records[${index}][senderable_type]`] = items?.senderable_type;
								tr[`accounting_records[${index}][senderable_id]`] = items?.senderable_id;
								tr[`accounting_records[${index}][amount]`] = items?.amount;
								tr[`accounting_records[${index}][note]`] = items?.note;
								return true;
							});
							const im = {};
							upLoadFile.current.map((items, index) => {
								im[`images[${index}]`] = items.originFileObj;
							});

							const urlBody = {
								title: form.getFieldValue()?.title,
								// accounting_records: dataSource,
								confirmed_at: form.getFieldValue()?.confirmed_at ? 	moment(form.getFieldValue()?.confirmed_at).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
								status: 1,
							};
							const result = await dispatch(await action_createAccountingBill({ ...urlBody, ...tr, ...im }));
							result && showmessageSuccess('Tạo thành công!', () => {
								router.back();
							});
						}}
					>Tạo và hạch toán
					</Button>
					<Button onClick={async () => {
						const tr = {};
						const test = [...dataSource];
						test.map((items, index) => {
							tr[`accounting_records[${index}][accounting_debt]`] = items?.accounting_debt;
							tr[`accounting_records[${index}][accounting_profit]`] = items?.accounting_profit;
							tr[`accounting_records[${index}][receiverable_id]`] = items?.receiverable_id;
							tr[`accounting_records[${index}][receiverable_type]`] = items?.receiverable_type;
							tr[`accounting_records[${index}][senderable_type]`] = items?.senderable_type;
							tr[`accounting_records[${index}][senderable_id]`] = items?.senderable_id;
							tr[`accounting_records[${index}][amount]`] = items?.amount;
							tr[`accounting_records[${index}][note]`] = items?.note;
							return true;
						});
						const im = {};
						upLoadFile.current.map((items, index) => {
							im[`images[${index}]`] = items.originFileObj;
						});
						const urlBody = {
							title: form.getFieldValue()?.title,
							// accounting_records: dataSource,
							confirmed_at: form.getFieldValue()?.confirmed_at ? 	moment(form.getFieldValue()?.confirmed_at).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
							status: 3,
						};
						const result = await dispatch(await action_createAccountingBill({ ...urlBody, ...tr, ...im }));
						result && showmessageSuccess('Tạo thành công!', () => {
							router.back();
						});
					}}
					>Tạo và lưu nháp
					</Button>
					<Button
						style={{ marginRight: 16 }}
						onClick={async () => {
							router.back();
						}}
					>Đóng, không lưu
					</Button>
				</Space>
			</Col>
		</Row>
	</>);
};
export default CreateAccountingBillComponent;
