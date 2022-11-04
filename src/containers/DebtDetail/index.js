import React, { useEffect, useState } from 'react';
import { MapMoneyToNumber } from '../../constants/function';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Card,
	Input,
	DatePicker,
	Typography,
	Row,
	Col,
	Form,
	Descriptions,
	Table,
} from 'antd';
import {
	SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import NavBarDetail from '../NavBar/nav-bar-detail';
import {
	action_getListDebtDetail
} from '../../redux/actions/debt';
import _ from 'lodash';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { dateFormat } = 'YYYY/MM/DD h:MM:SS';
let formData = {
	per_page: 10,
	page: 1,
	'object[type]': null,
	accounting: '331',
	name: null,
	code: null,
	acronym: null,
	'object[id]': null,
	start_date: null,
	end_date: null,
	license: null
};

function DebtDetailComponent(props) {
	const [form2] = Form.useForm();

	const {
		data,
		pagination,
		balance_beginning,
		balance_end_of_term,
		debt_fluctuation,
		object_info,
		record,
		accounting,
		debt
	} = useSelector(state => state.debt.listDebtDetail);

	const [a,setA] = useState();
	const [b,setB] = useState();
	const [c,setC] = useState();
	const [check,setCheck] = useState();

	// const a = new URLSearchParams(location.search).get('id');
	// const b = new URLSearchParams(location.search).get('type');
	// const c = new URLSearchParams(location.search).get('accounting');
	const dispatch = useDispatch();
	const handleShowDetailRecord = async (urlFormData) => {
		const result = await dispatch(await action_getListDebtDetail({ ...formData, ...urlFormData }));
		// return !_.isEmpty(result)  ?true:false;
	};

	useEffect(() => {
		let a = new URLSearchParams(location.search).get('id');
		let b = new URLSearchParams(location.search).get('type');
		let c = new URLSearchParams(location.search).get('accounting');

		setA(a);
		setB(b);
		setC(c);
		setCheck(new URLSearchParams(location.search).get('check'))
		handleShowDetailRecord({
			page: 1,
			per_page: 10,
			'object[type]': b,
			'object[id]': a,
			accounting: c
		});
	}, []);

	const columns = [
		{
			title: 'Thời gian',
			dataIndex: 'created_at',
			key: 'created_at',

		},
		{
			title: 'Chứng từ',
			dataIndex: 'license',
			key: 'license',
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Form
						name="basic"
						onFinish={(e) => {
							handleShowDetailRecord({
								page: pagination?.current_page,
								per_page: pagination?.per_page,
								'object[type]': record?.object_type,
								'object[id]': record?.object_id,
								accounting: record?.accounting, ...e
							});
						}}
						autoComplete="off"
						form={form2}
					>
						<Form.Item name="license" style={{
							width: 164,
							marginLeft: 'auto'
						}}>
							<Input suffix={<SearchOutlined/>} placeholder="Tìm chính xác"/>
						</Form.Item>

						<Form.Item style={{ padding: '8px 0 0 0' }}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10}>
									<Button style={{ float: 'right' }} onClick={() => {
										form2.resetFields();
										handleShowDetailRecord({
											page: pagination?.current_page,
											per_page: pagination?.per_page,
											'object[type]': record?.object_type,
											'object[id]': record?.object_id,
											accounting: record?.accounting,
											license: null
										});
									}}>Xóa</Button>
								</Col>
							</Row>
						</Form.Item>

					</Form>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>
			),
		},
		{
			title: 'Diễn giải chung',
			dataIndex: 'note',
			key: 'note',

		},

		{
			title: 'Diễn giải',
			dataIndex: 'explain',

		},
		{
			title: 'Ghi nợ',
			dataIndex: 'debt_record',
			key: 'debt_record',

		},
		{
			title: 'Ghi có',
			dataIndex: 'profit_record',
			key: 'profit_record',
			width: 238
		},
		{
			title: 'Dư nợ',
			width: '164px',
			dataIndex: 'debt_amount',
			key: 'debt_amount',

			sorter: (a, b) => MapMoneyToNumber(a.debt_amount) - MapMoneyToNumber(b.debt_amount),
		},
		{
			title: 'Dư có',
			width: '164px',
			dataIndex: 'profit_amount',
			key: 'profit_amount',
			sorter: (a, b) => MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
		},
	];
	return (
		<>
			<NavBarDetail title={c == "1361A" ? "Quỹ tồn chi nhánh": c == '3341' ? "Lương nhân viên" : c == '331' ? "Công nợ nhà cung cấp" : c == '131' ? b == 1 ? "Công nợ khách hàng" : "Công nợ thu hộ" : '' }
				object_info={object_info} accounting={accounting}
				debt={debt}

			></NavBarDetail>

			<Row style={{marginBottom: '40px'}}>
				<Col span={20} className="mar mar-left">
					<Text style={{ paddingRight: 8 }}>
						Lọc theo thời gian
					</Text>
					<RangePicker
						showTime
						defaultValue={[moment('2021/11/06'), moment('2021/11/06')]}
						format={dateFormat}
						onChange={(e) => {
							const formDate = {
								'start_date': !_.isEmpty(e) ? moment(e[0]._d)
									.format('YYYY-MM-DD hh:MM:SS') : null,
								'end_date': !_.isEmpty(e) ? moment(e[1]._d)
									.format('YYYY-MM-DD hh:MM:SS') : null,
							};
							handleShowDetailRecord({
								page: pagination?.current_page,
								per_page: pagination?.per_page,
								'object[type]': b,
								'object[id]': a,
								accounting: c, ...formDate
							});

						}}
					/>
				</Col>

				<Col span={20} className="mar title__container">
					<Row gutter={16}>
						<Col span={6} className="create__debt--fix">
							<Card title="Đầu kỳ" bordered={false} style={{ width: '100%' }}>
								<Descriptions size="small" column={1} layout="vertical">
									<Descriptions.Item label={balance_beginning?.type == 2 ? "Dư nợ" : "Dư có"}
													   className="money-debt">{balance_beginning?.label}</Descriptions.Item>
								</Descriptions>
							</Card>
						</Col>
						<Col span={12} className="create__debt--fix">
							<Card title="Phát sinh" bordered={false} style={{ width: '100%' }}>
								<Row>
									<Col span={12}>
										<Descriptions size="small" column={1} layout="vertical">
											<Descriptions.Item label="Dư nợ"
															   className="money-debt">{debt_fluctuation?.debt_label}</Descriptions.Item>
										</Descriptions>
									</Col>
									<Col span={12}>
										<Descriptions size="small" column={1} layout="vertical">
											<Descriptions.Item label="Dư có"
															   className="money-debt">{debt_fluctuation?.credit_label}</Descriptions.Item>
										</Descriptions>
									</Col>
								</Row>


							</Card>
						</Col>
						<Col span={6} className="create__debt--fix">
							<Card title="Cuối kỳ" bordered={false} style={{ width: '100%' }}>
								<Descriptions size="small" column={1} layout="vertical">
									<Descriptions.Item label={balance_end_of_term?.type == 1 ? "Dư có" : "Dư nợ"}
													   className="money-debt">{balance_end_of_term?.label}</Descriptions.Item>
								</Descriptions>
							</Card>
						</Col>
					</Row>
				</Col>

				<Col span={20} className="mar" style={{padding: '24px', background: 'white'}}>
					<Table
						columns={columns}
						rowSelection={false}
						rowKey="id"
						dataSource={data}
						pagination={{
							total: pagination?.total,
							showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
							defaultPageSize: 10,
							defaultCurrent: 1,
							pageSizeOptions: [10, 20, 50],
							onChange: (page, pageSize) => {
								handleShowDetailRecord({
									page: page,
									per_page: pageSize,
									'object[type]': b,
									'object[id]': a,
									accounting: c,
								});

							},
						}}
					/>
				</Col>
			</Row>

		</>
	);
}

export default DebtDetailComponent;
