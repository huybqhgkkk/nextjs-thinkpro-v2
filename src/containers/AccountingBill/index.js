import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {FilterFilled, SearchOutlined} from '@ant-design/icons'
import {MapMoneyToNumber} from  '../../constants/function'
import { useRouter } from 'next/router'
import { action_getListAccountingBill } from 'src/redux/actions/accounting-bill';
import { DatePicker, Table, Select, Row, Col, Input, Badge, Form, Button, Typography } from 'antd';
import moment from "moment";
import NavBarAccounting1 from "../NavBar/nav-bar-accounting1";
import ToolTable from 'src/components/toolTable';

let formData = {
	per_page: 10,
	page: 1,
	status: 1,
	code: null,
	name: null,
	start_date: null,
	end_date: null,
}

const {Text} = Typography;
const { Option } = Select;

function PickerWithType({ type, onChange }) {
	if (type === 'date') return <DatePicker onChange={onChange} style={{width: '100%'}}/>;
	if (type === 'year') return <DatePicker onChange={onChange} style={{width: '100%'}} picker={"year"} defaultValue={moment('2021','yyyy')}/>;
	return <DatePicker picker={type} onChange={onChange} style={{width: '100%'}}/>;
}
function AccountingBillComponent(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    const [type, setType] = useState('year');
	const [formCode] = Form.useForm();
    const { data = [], pagination = {} } = useSelector(state => state.accountingbill.listAccountingBill)
	const [formNote] = Form.useForm();
	const [formName] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [formStatus] = Form.useForm();
    //get list accountin bill



    useEffect(() => {
        getListAccountingBill({page: 1, per_page: 10,status: 1});

    },[])

	const  getListAccountingBill =  async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getListAccountingBill({...formData,...urlFormData}));
		setLoading(false)
		if(result) {
			formData = {...formData,...urlFormData};
		}
	}

	const handleSearch = (value) => {
		const formData = {...value,...{page: pagination?.current_page,per_page: pagination?.per_page}}
		getListAccountingBill(formData);
	}

	const handleSearchTime = async (value) => {
		var start_date, end_date;
		if (type == "year") {
			start_date = "00:00 01-01-" + moment(value).format("YYYY");
			end_date = "23:59 31-12-" + moment(value).format("YYYY");
		}else if (type == "quarter"){
			start_date = "00:00 "+moment(value).format("DD-MM-YYYY")
			end_date = "00:00 " + moment(value).add(3, 'months').format("DD-MM-YYYY");
		}else if (type == "month"){
			start_date = "00:00 "+moment(value).format("DD-MM-YYYY")
			end_date = "00:00 " + moment(value).add(1, 'months').format("DD-MM-YYYY");
		}
		else if (type == "week"){
			start_date = "00:00 "+moment(value).subtract(1,"days").format("DD-MM-YYYY")
			end_date = "00:00 " + moment(value).add(6, 'days').format("DD-MM-YYYY");
		}else {
			start_date = "00:00 "+moment(value).format("DD-MM-YYYY");
			end_date = "23:59 "+moment(value).format("DD-MM-YYYY");
		}


		// dispatch(await action_getListDocument({...formData,page: 1, per_page: 10, start_date:start_date, end_date: end_date}))
		if (!value){
			handleSearch({start_date:null, end_date: null});
		}else handleSearch({start_date:start_date, end_date: end_date});
	}



const columns = [
    {
        title: 'Ng??y h???ch to??n',
        dataIndex: 'confirmed_at',
        key:"confirmed_at",
		sorter: (a, b) => moment(a.confirmed_at).unix() - moment(b.confirmed_at).unix()
    },
    {
        title: 'Ng??y t???o',
        dataIndex: 'created_at',
        key: "created_at",
		sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
    },
    {
        title: 'S??? ch???ng t???',
        dataIndex: "code",
        key:"code",
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formCode}
				>
					<Form.Item name="code" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="T??m ki???m ch??nh x??c"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">??p d???ng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formCode.resetFields();
								getListAccountingBill({'code': null});
								}}>X??a</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		render: (text, record) => <a onClick={(e) => {
			e.stopPropagation();
		}}>{text}</a>
    },

    {
        title: 'S??? ti???n',
        dataIndex: 'amount_label',
        key: "amount_label",
		sorter: (a,b) =>MapMoneyToNumber(a.amount_label) - MapMoneyToNumber(b.amount_label),
    },

    {
        title: 'Di???n gi???i phi???u',
        dataIndex: 'note',
        key: "note",
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formNote}
				>
					<Form.Item name="note" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="T??m ki???m"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">??p d???ng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formNote.resetFields();
								getListAccountingBill({'note': null});
								}}>X??a</Button>
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
        title: 'Ng?????i t???o',
        key: "user_create",
        render: (text, record) => <>{`${record?.user?.name}-${record?.user?.code}`}</>,
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formName}
				>
					<Form.Item name="name" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="T??m ki???m"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">??p d???ng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formName.resetFields();
								getListAccountingBill({'name': null});
								}}>X??a</Button>
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
        title: 'Tr???ng th??i',
        dataIndex: 'status_label',
        key: "status",
		initialValue: '2',
		filterIcon: () => <FilterFilled/>,
		render: (record,value) => {
			if (value.status == 1) {
				return <>
					<Badge status="success" />
					<Text>Th??nh c??ng</Text>
				</>
			} else if (value.status == 2){
				return <>
					<Badge status="error" />
					<Text>B??? hu???</Text>
				</>
			}else 	return <>
				<Badge status="warning" />
				<Text>L??u nh??p</Text>
			</>
		},
		filterDropdown: () => {
			return (
				<Form form={formStatus}>
					<Form.Item name="status">
						<Select defaultValue={1} style={{width: '100%'}} onChange={(e) => {
							getListAccountingBill({status: e})
							
						}} >
							<Option value={1}>Th??nh c??ng</Option>
							<Option  value={2}>B??? hu???</Option>
							<Option value={3}>L??u nh??p</Option>
						</Select>
					</Form.Item>
				</Form>
				
			)
		}
    },
];

	const createAccounting = async () => {
		router.push('/phieuketoan/taophieu')
	}
	//reload data table
	const handleReloadTable = () => {
		getListAccountingBill({
			per_page: 10,
			page: 1,
			status: 1,
			code: null,
			name: null,
				start_date: null,
				end_date: null,
		})
		formCode.resetFields();
		formNote.resetFields();
		formName.resetFields();
		formStatus.setFieldsValue({status: 1})
	}

    return (<>
		{/*<NavBar1 title={"Phi???u k??? to??n"} ></NavBar1>*/}
			<NavBarAccounting1 title={"Phi???u k??? to??n"} onCreate={createAccounting}></NavBarAccounting1>
			<Row style={{marginTop: '24px'}}>
				<Col span={20} style={{margin: 'auto', background: 'white'}} className="table--fix">
					<Row style={{padding: '0 24px'}}>
						<Col span={24} style={{padding: '24px 8px'}}>
							<Row align="middle" justify="space-between">
								<Col span={2}>
									<Text strong>{pagination?.total} B???n ghi</Text>
								</Col>
								<Col span={10}>
									<Row align="middle" >
										<Col span={14} style={{marginLeft: 'auto'}}>
											<Row justify="space-between">
												<Col span={6} style={{marginRight: '8px'}}>
													<Select value={type} onChange={setType} style={{float: 'right'}}>
														<Option value="date">Ng??y</Option>
														<Option value="week">Tu???n</Option>
														<Option value="month">Th??ng</Option>
														<Option value="quarter">Qu??</Option>
														<Option value="year">N??m</Option>
													</Select>
												</Col>
												<Col span={17}>
													<PickerWithType type={type} onChange={handleSearchTime}/>
												</Col>
											</Row>
										</Col>
										<Col span={4} >
											<ToolTable hideAdd={true} hideDelete={true} onReload={handleReloadTable}/>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
						<Col span={24}>
						<Table 
							columns={columns}
							onChange={async(pagination, filters) => {
								getListAccountingBill({...formData, page: pagination?.current, per_page: pagination?.pageSize});
							}}
							dateFormatter="string"
							rowKey="id"
							onRow={(record) => {
								return {
									onClick: async () => {
										router.push(`/phieuketoan/chitiet/${record?.id}`)
									}
								}
							}}
							dataSource={data}
							loading={loading}
							pagination={{
								total: pagination?.total,
								showTotal: (total, range) => `${range[0]}-${range[1]} c???a ${total} b???n ghi`,
								defaultPageSize: 10,
								defaultCurrent: 1,
								current:  pagination?.current_page,
								pageSizeOptions: [10,20,50],
								// onShowSizeChange: (page,pageSize) => {
								// 	getListAccountingBill({page, per_page: pageSize});

								// },
							}}
					/>
						</Col>
					</Row>
				</Col>
			</Row>
	</>

    );
}

export default AccountingBillComponent;
