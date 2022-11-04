import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Router from 'next/router';
import {
	Button,
	Tooltip,
	Input,
	DatePicker,
	Select,
	Typography,
	Row,
	Col,
	Table,
	Badge,
	Popover,
	Form,
	Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import ToolTable from 'src/components/toolTable';
import { MapMoneyToNumber } from '../../constants/function';
import { action_getListDocument } from '../../redux/actions/payment-card';
import NavBar3 from '../NavBar/nav-bar-3';

function PickerWithType({ type, onChange }) {
	if (type === 'date') return <DatePicker onChange={onChange} style={{width: '100%'}}/>;
	if (type === 'year') return <DatePicker onChange={onChange} style={{width: '100%'}} picker="year" defaultValue={moment('2021', 'yyyy')} />;
	return <DatePicker picker={type} onChange={onChange} style={{width: '100%'}}/>;
}
const { Paragraph, Text } = Typography;
const { Option } = Select;
let formData = {
	per_page: 10,
	page: 1,
	code: null,
	name: null,
	object_code: null,
	start_date: null,
	end_date: null,
	status: 1,
	type: 1,
};
const PaymentCardComponent = (props) => {
	const { data, pagination, summarys } = useSelector(state => state.paymentcard.dataListDocument);
	const dispatch = useDispatch();
	const [formCode] = Form.useForm();
	const [formCodeUser] = Form.useForm();
	const [type, setType] = useState('year');
	const [loading, setLoading] = useState(false);
	const [formName] = Form.useForm();
	const [formTypeLabel] = Form.useForm();
	const [formStatus] = Form.useForm();
	useEffect(() => {
		getListDocument();
	}, []);
	const getListDocument = async (urlFormData) => {
		setLoading(true);
		const re = await dispatch(await action_getListDocument({ ...formData, ...urlFormData }));
		setLoading(false);
		if (re) {
			formData = { ...formData, ...urlFormData };
		}
	};

	const handleSearch = (value) => {
		const formData = { ...value };
		getListDocument(formData);
	};

	const handleSearchTime = async (value) => {
		let start_date; let
			end_date;
		if (type == 'year') {
			 start_date = '00:00 01-01-' + moment(value).format('YYYY');
			 end_date = '23:59 31-12-' + moment(value).format('YYYY');
		} else if (type == 'quarter') {
			start_date = '00:00 ' + moment(value).format('DD-MM-YYYY');
			end_date = '00:00 ' + moment(value).add(3, 'months').format('DD-MM-YYYY');
		} else if (type == 'month') {
			start_date = '00:00 ' + moment(value).format('DD-MM-YYYY');
			end_date = '00:00 ' + moment(value).add(1, 'months').format('DD-MM-YYYY');
		} else if (type == 'week') {
			start_date = '00:00 ' + moment(value).subtract(1, 'days').format('DD-MM-YYYY');
			end_date = '00:00 ' + moment(value).add(6, 'days').format('DD-MM-YYYY');
		} else {
			start_date = '00:00 ' + moment(value).format('DD-MM-YYYY');
			end_date = '23:59 ' + moment(value).format('DD-MM-YYYY');
		}

		// dispatch(await action_getListDocument({...formData,page: 1, per_page: 10, start_date:start_date, end_date: end_date}))
		if (!value) {
			handleSearch({ start_date: null, end_date: null });
		} else handleSearch({ start_date, end_date });
	};

	const columns = [
		{
			title: 'Thời gian hạch toán',
			width: 182,
			dataIndex: 'created_at',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),

		},
		{
			title: 'Mã chứng từ',
			with: 149,
			dataIndex: 'code',
			key: 'code',
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formCode}
					>
						<Form.Item name="code" style={{ width: 164, marginLeft: 'auto' }}>
							<Input suffix={<SearchOutlined />} placeholder="Tìm kiếm chính xác" />
						</Form.Item>

						<Form.Item style={{ paddingTop: '8px' }}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10}>
									<Button
										style={{ float: 'right' }}
										onClick={() => {
											formCode.resetFields();
											getListDocument({ code: null });
										}}
									>Xóa
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Form>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
			render: (text, record) => <Tooltip
				placement="topLeft"
				color="white"
				title={<Paragraph
					copyable
					onClick={(e) => {
						e.stopPropagation();
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>{text}
				</Paragraph>}
			>
				{text}
                             </Tooltip>,
		},
		{
			title: 'Loại phiếu',
			width: 108,
			dataIndex: 'type_label',
			key: 'type_label',
			// filters: true,
			onFilter: true,
			filterDropdown: () => {
				return (
					<Form form={formTypeLabel}>
						<Form.Item name="typeLabel">
							<Select
								defaultValue={1}
								style={{ width: '100%' }}
								onChange={(e) => {
									getListDocument({ type: e });
								}}
							>
								<Option value={1}>Thu</Option>
								<Option value={2}>Chi</Option>
								<Option value={null}>Tìm theo cả 2</Option>
							</Select>
						</Form.Item>
					</Form>

				);
			},

		},
		{
			title: 'Diễn giải chung',
			width: 261,
			dataIndex: 'note',
			key: 'note',
		},
		{
			title: 'Mã đối tượng',
			width: 180,
			dataIndex: 'object_code_label',
			key: 'object_code_label',
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formCodeUser}
					>
						<Form.Item name="object_code_label" style={{ width: 164, marginLeft: 'auto' }}>
							<Input suffix={<SearchOutlined />} placeholder="Tìm kiếm chính xác" />
						</Form.Item>

						<Form.Item style={{ paddingTop: '8px' }}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10}>
									<Button
										style={{ float: 'right' }}
										onClick={() => {
											formCodeUser.resetFields();
											getListDocument({ 'object_code': null });
										}}
									>Xóa
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Form>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
			render: (text, record) => {
				if (record.detail?.length > 1) {
					return <>
						<Popover
							placement="right"
							title={record.detail?.length + ' đối tượng'}
							content={
								record.detail?.map((value) => {
									return (
										<p>{value?.object?.full_name}</p>
									);
								})

							}
						>
							<a>Xem {record.detail?.length} đối tượng</a>
						</Popover>
					</>;
				} return <Tooltip
					placement="topLeft"
					color="white"
					title={<Paragraph
						copyable
						onClick={(e) => {
							e.stopPropagation();
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>{record.detail[0]?.object?.code}
            </Paragraph>}
				>
					{record.detail[0]?.object?.code}
				</Tooltip>;
			},

		},
		{
			title: 'Tên đối tượng',
			dataIndex: 'object_label',
			with: 328,
			key: 'name',
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formName}
					>
						<Form.Item name="object_label" style={{ width: 164, marginLeft: 'auto' }}>
							<Input suffix={<SearchOutlined />} placeholder="Tìm Kiếm..." />

						</Form.Item>

						<Form.Item style={{ paddingTop: '8px' }}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10}>
									<Button
										style={{ float: 'right' }}
										onClick={() => {
											formName.resetFields();
											getListDocument({ 'name': null });
										}}
									>Xóa
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Form>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
		},
		{
			title: 'Số tiền',
			width: 149,
			dataIndex: 'amount_label',
			key: 'amount_label',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => MapMoneyToNumber(a.amount_label) - MapMoneyToNumber(b.amount_label),

		},
		{
			title: 'Trạng thái',
			width: 192,
			dataIndex: 'status_label',
			key: 'status',
			onFilter: (value, record) => record.status = value,
			filterDropdown: () => {
				return (
					<Form form={formStatus}>
						<Form.Item name="status">
							<Select
								defaultValue={1}
								style={{ width: '100%' }}
								onChange={(e) => {
									getListDocument({ status: e });
								}}
							>
								<Option value={1}>Thành công</Option>
								<Option value={2}>Bị huỷ</Option>
								<Option value={3}>Lưu nháp</Option>
							</Select>
						</Form.Item>
					</Form>

				);
			},
			render: (record, value) => {
				if (value.status == 1) {
					return <>
						<Badge status="success" />
						<Text>Thành công</Text>
            </>;
				} if (value.status == 2) {
					return <>
						<Badge status="error" />
						<Text>Bị huỷ</Text>
            </>;
				} return <>
					<Badge status="warning" />
					<Text>Lưu nháp</Text>
             </>;
			},
		},
	];
	//reload table
	const handleReloadTable = () => {
		getListDocument( {
			per_page: 10,
			page: 1,
			code: null,
			name: null,
			object_code: null,
			start_date: null,
			end_date: null,
			status: 1,
			type: 1,
		})
		formCode.resetFields();
		formCodeUser.resetFields();
		formName.resetFields();
		formTypeLabel.setFieldsValue({"typeLabel": 1});
		formStatus.setFieldsValue({status: 1})
	}

	return (<>
		<NavBar3 title="Phiếu thu chi" summarys={summarys} />

		<Row style={{ marginTop: '24px' }} align="middle">
			<Col span={20} style={{ margin: 'auto', background: 'white', padding: '24px' }} className="table--fix">
				<Row align="middle">
					<Col span={24} style={{padding: '0 0 24px 0'}}>
						<Row align="middle">
							<Col span={2}>
								<Text strong>{pagination?.total} Bản ghi</Text>
							</Col>
							<Col span={10} style={{marginLeft: 'auto'}}>
								<Row align="middle">
									<Col span={14} style={{marginLeft: 'auto'}}>
										<Row>
											<Col span={6} style={{marginRight: '8px'}}>
												<Select value={type} onChange={setType} style={{float: 'right'}}>
													<Option value="date">Ngày</Option>
													<Option value="week">Tuần</Option>
													<Option value="month">Tháng</Option>
													<Option value="quarter">Quý</Option>
													<Option value="year">Năm</Option>
												</Select>
											</Col>
											<Col span={17}>
												<PickerWithType type={type} onChange={handleSearchTime} style={{ width: '100%' }} />
											</Col>
										</Row>
									</Col>
									<Col span={4}>
										<ToolTable hideAdd={true} hideDelete={true} onReload={handleReloadTable}/>
									</Col>
								</Row>
							</Col>

							
						</Row>
					</Col>
					<Col span={24}>
						<Table
							columns={columns}
							rowSelection={false}
							dataSource={data}
							loading={loading}
							onChange={async(pagination, filters) => {
								console.log(filters);
								getListDocument({...formData, page: pagination?.current, per_page: pagination?.pageSize});
							}}
							rowKey="id"
							onRow={(record) => {
								return {
									onClick: async () => {
										Router.push(`/phieuthuchi/chitiet/${record?.id}`);
									}, // click row
								};
								}}
		
							pagination={{
								total: pagination?.total,
								showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
								defaultPageSize: 10,
								defaultCurrent: 1,
								current:  pagination?.current_page,
								pageSizeOptions: [10,20,50],
								// onShowSizeChange: async (current, size) => {
								// const result = await getListDocument({...formData, page: current,per_page: size});
								// if (result) formData = {...formData, page: current,per_page: size};
								// }
							}}
						/>
					</Col>
				</Row>
			</Col>

		</Row>
         </>

	);
};

export default PaymentCardComponent;
