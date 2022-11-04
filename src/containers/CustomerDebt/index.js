import React, {useEffect, useRef, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Button, Row, Col, Input, Form, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {action_getListCustomerDebt, action_getListDebtDetail} from '../../redux/actions/debt'
import {MapMoneyToNumber} from '../../constants/function'
import Router, { useRouter } from 'next/router'
import _ from 'lodash';
import NavBar1 from "../NavBar/nav-bar-1";
import ToolTable from 'src/components/toolTable';

function CustomerDebtComponent(props) {
    const {data,pagination,summarys} = useSelector(state => state.debt.listCustomerDebt);
    const dispatch = useDispatch();
    const router = useRouter()

	const formData = useRef({
		per_page: 10,
		page: 1,
		// type: null,
		object_type: 1,
		status_work: [],
		accounting: "131",
		phone: null,
		name: null,
		code: null,
		bank_account_full_label: null,
	})

	const [formCode] = Form.useForm();
	const [formName] = Form.useForm();
	const [formPhone] = Form.useForm();
	const [formBank] = Form.useForm();
	const [loading, setLoading] = useState(false);


    useEffect(() => {
        getListCustomerDebt({
            "per_page": 10,
            "page": 1,
            "object_type": 1,
            "status_work": [],
            "accounting": "131",
        });
    },[])
    // Get LIST EMPLOYEE

	const getListCustomerDebt = async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getListCustomerDebt({...formData.current, ...urlFormData}));
		setLoading(false);
		if(result) formData.current =  {...formData.current, ...urlFormData};
	}

	const handleSearch = (value) => {
		const formData = {...value, ...{page: pagination?.current_page, per_page: pagination?.per_page}}
		getListCustomerDebt(formData);
	}

// Man chi tiet cua 1 cot
const handleShowDetailRecord = async (formData, record) => {
    const result = await dispatch(await action_getListDebtDetail(formData, record));
    return !_.isEmpty(result)?true:false;
}


const columns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'code',
        key:"code",
		filterDropdown: () => (
			<div style={{padding: 8}}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formCode}
				>
					<Form.Item name="code" style={{width: 164, marginLeft: "auto"}}>
						<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm chính xác"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formCode.resetFields();
								getListCustomerDebt({code: null});
								}}>Xóa</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
		),
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        key: "name",
		filterDropdown: () => (
			<div style={{padding: 8}}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formName}
				>
					<Form.Item name="name" style={{width: 164, marginLeft: "auto"}}>
						<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formName.resetFields();
								getListCustomerDebt({name: null});
								}}>Xóa</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
		),
    },
    {
        title: 'SĐT khách hàng',
        dataIndex: ['object','phone'],
        key:"phone",
		filterDropdown: () => (
			<div style={{padding: 8}}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formPhone}
				>
					<Form.Item name="phone" style={{width: 164, marginLeft: "auto"}}>
						<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm chính xác"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formPhone.resetFields();
								getListCustomerDebt({phone: null});
								}}>Xóa</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
		),
    },

    {
        title: 'Tài khoản',
        dataIndex: ["accountBanks","bank_account_full_label"],
		// filterDropdown: () => (
		// 	<div style={{padding: 8}}>
		// 		<Form
		// 			name="basic"
		// 			onFinish={handleSearch}
		// 			autoComplete="off"
		// 			form={formBank}
		// 		>
		// 			<Form.Item name="bank_account_full_label" style={{width: 164, marginLeft: "auto"}}>
		// 				<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm chính xác"/>
		// 			</Form.Item>

		// 			<Form.Item style={{paddingTop: '8px'}}>
		// 				<Row justify="space-between" align="middle">
		// 					<Col span={10}>
		// 						<Button type="primary" htmlType="submit">Áp dụng</Button>
		// 					</Col>
		// 					<Col span={10} >
		// 						<Button style={{float: 'right'}} onClick={() => {
		// 						formBank.resetFields();
		// 						getListCustomerDebt({bank_account_full_label: null});
		// 						}}>Xóa</Button>
		// 					</Col>
		// 				</Row>
		// 			</Form.Item>
		// 		</Form>
		// 	</div>
		// ),
		// filterIcon: (filtered) => (
		// 	<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
		// ),
    },
    // {
    //     title: 'Tên đơn vị',
    //     dataIndex: 'department_name',
    //     key: "department_name",
    //     filterDropdown: () => (
    //         <div style={{ padding: 8 }}>
    //           <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
    //         </div>
    //       ),
    //     filterIcon: (filtered) => (
    //     <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    //     ),
    // },
    {
        title: 'Chuyển khoản chờ xác nhận',
        dataIndex: 'profit_label',
        key: "wait",
        width: 238
    },
    {
        title: 'Dư nợ',
        width: '164px',
        dataIndex: 'debt_label',
        key: "debt_label",
        sorter: (a,b) => MapMoneyToNumber(a.debt_label) - MapMoneyToNumber(b.debt_label),
    },
    {
        title: 'Dư có',
        width: '164px',
        dataIndex: 'profit_label',
        key: "profit_label",
        sorter: (a,b) => MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
    },
];

//reload data table
	const handleReloadTable = () => {
		getListCustomerDebt({
			per_page: 10,
			page: 1,
			object_type: 1,
			status_work: [],
			accounting: "131",
			phone: null,
			name: null,
			code: null,
			bank_account_full_label: null,
		})
		formCode.resetFields();
		formName.resetFields();
		formPhone.resetFields();
	}
    return (<>
			<NavBar1 title={"Công nợ khách hàng"} debt={summarys}></NavBar1>
			<Row style={{marginTop: '24px'}}>
				<Col span={20} style={{margin: 'auto', padding: '16px 24px', background: 'white'}} className="table--fix">
					<Row align="middle" style={{marginBottom: '16px'}}>
						<Col span={4} style={{marginLeft: 'auto', padding: '8px 0 24px 0'}}>
							<ToolTable 
								 onReload={handleReloadTable} 
								 hideAdd={true} 
								 hideDelete={true}
							/>
						</Col>

						<Col span={24}>
							<Table columns={columns}
								loading={loading}
								rowKey="id"
								dataSource={data}
								onRow={(record) => {
									return {
										onClick: async () => {
											record.page_name = "Công nợ khách hàng"
											const result = await handleShowDetailRecord({
												"object[id]": record.object.object_id,
												"object[type]": record.object.object_type,
												accounting: record.accounting,
											}, record)
											result && Router.push(`/congno/khachhang/chitiet/?id=${record?.object?.object_id}&type=${record?.object?.object_type}&accounting=${record?.accounting}`);

										}
									}
								}}
								pagination={{
									total: pagination?.total,
									showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
									defaultPageSize: 10,
									defaultCurrent: 1,
									current:  pagination?.current_page,
									pageSizeOptions: [10,20,50],
									onShowSizeChange: (page,pageSize) => {
										getListCustomerDebt({page, per_page: pageSize});
									},
								}}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
	</>

    );
}

export default CustomerDebtComponent;
