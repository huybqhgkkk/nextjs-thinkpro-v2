import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Button, Row, Col, Input, Form, Table} from 'antd';
import {SearchOutlined } from '@ant-design/icons'
import {action_getListBankFunds, action_getListDebtDetail} from '../../redux/actions/debt'
import {MapMoneyToNumber} from '../../constants/function'
import Router, { useRouter } from 'next/router'
import _ from 'lodash';
import NavBar2 from "../NavBar/nav-bar-2";
import ToolTable from 'src/components/toolTable';

let formData = {
	per_page: 10,
	page :1,
	object_type: 2,
	accounting: "1361A",
	name: null,
	code: null,
	tinh_thanhpho: null,
}
function BankFundsComponent(props) {
    const {data = [],pagination = [], summarys} = useSelector(state => state.debt.listBankFunds);
    const dispatch = useDispatch();
    const router = useRouter()
	const [formCode] = Form.useForm();
	const [formName] = Form.useForm();
	const [formCity] = Form.useForm();
	const [loading, setLoading] = useState(false);
    useEffect(() => {
        getListBankFunds({
            "per_page": 10,
            "page": 1,
            "object_type": 2,
            "status_work": [],
            "accounting": "1361A"
          });
    },[])
    // Get BankFunds

	const  getListBankFunds =  async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getListBankFunds({...formData ,...urlFormData}));
		setLoading(false);
		if(result) formData = {...formData ,...urlFormData};
	}

	const handleSearch = (value) => {
		const formData = {...value}
		getListBankFunds(formData);
	}
    // Man chi tiet cua 1 cot
    const handleShowDetailRecord = async (formData, record) => {
        const result = await dispatch(await action_getListDebtDetail(formData, record));
        return !_.isEmpty(result)?true:false;
    }
const columns = [
    {
        title: 'Mã chi nhánh',
        dataIndex: 'code',
        key:"code",
        with: '149px  ',
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formCode}
				>
					<Form.Item name="code" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm chính xác"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formCode.resetFields();
								getListBankFunds({'code': null});
								}}>Xóa</Button>
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
        title: 'Tên cửa hàng',
        dataIndex: 'name',
        key: "name",
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formName}
				>
					<Form.Item name="name" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm..."/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formName.resetFields();
								getListBankFunds({'name': null});
								}}>Xóa</Button>
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
        title: 'Tỉnh, thành phố',
        dataIndex: 'tinh_thanhpho',
        key:"tinh_thanhpho",
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formCity}
				>
					<Form.Item name="tinh_thanhpho" style={{width: 164,marginLeft: "auto"}}>
						<Input  allowClear={true} placeholder="Tìm kiếm..." />
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
									formCity.resetFields();
									getListBankFunds({'tinh_thanhpho': null});
								}}>Xóa</Button>
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
        title: 'Tài khoản',
        dataIndex: 'accounting',
		// filterDropdown: () => (
		// 	<div style={{ padding: 8 }}>
		// 		<Form
		// 			name="basic"
		// 			onFinish={handleSearch}
		// 			autoComplete="off"
		// 		>
		// 			<Form.Item name="accounting" style={{width: 164,marginLeft: "auto"}}>
		// 				<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm..."/>
		// 			</Form.Item>

		// 			<Form.Item style={{paddingTop: '8px'}}>
		// 				<Row justify="space-between" align="middle">
		// 					<Col span={10}>
		// 						<Button type="primary" htmlType="submit">Áp dụng</Button>
		// 					</Col>
		// 					<Col span={10} >
		// 						<Button style={{float: 'right'}} onClick={() => {
		// 						formAccount.resetFields();
		// 						getListBankFunds({'accounting': null});
		// 						}}>Xóa</Button>
		// 					</Col>
		// 				</Row>
		// 			</Form.Item>
		// 		</Form>
		// 	</div>
		// ),
		// filterIcon: (filtered) => (
		// 	<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		// ),
    },
    // {
    //     title: 'Tên đơn vị',
    //     dataIndex: 'department_name',
    //     key: "department_name",
	// 	filterDropdown: () => (
	// 		<div style={{ padding: 8 }}>
	// 			<Form
	// 				name="basic"
	// 				onFinish={handleSearch}
	// 				autoComplete="off"
	// 			>
	// 				<Form.Item name="department_name" style={{width: 164,marginLeft: "auto"}}>
	// 					<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm..."/>
	// 				</Form.Item>

	// 				<Form.Item >
	// 					<Button type="primary" htmlType="submit">Áp dụng</Button>
	// 				</Form.Item>
	// 			</Form>
	// 		</div>
	// 	),
	// 	filterIcon: (filtered) => (
	// 		<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
	// 	),
    // },
    {
        title: 'Tổng tồn quỹ',
        dataIndex: 'amount',
        key: "amount",
    },
    {
        title: 'Đang chuyển chờ kế toán xác nhận',
        dataIndex: 'transaction_label',
        key: "transaction_label",
        // valueType: 'option',
        // render: () => [
        //     <a key="link">链路</a>,
        //     <a key="link2">报警</a>,
        //     <a key="link3">监控</a>,
        //     <TableDropdown key="actionGroup" menus={[
        //             { key: 'copy', name: '复制' },
        //             { key: 'delete', name: '删除' },
        //         ]}/>,
        // ],
        sorter: (a,b) => MapMoneyToNumber(a.debt_label) - MapMoneyToNumber(b.debt_label),
    },
    {
        title: 'Quỹ khả dụng',
        dataIndex: 'available_balances_label',
        key: "available_balances_label",
        sorter: (a,b) => MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
    },
];

//reaload data table
	const handleReloadTable = () => {
		getListBankFunds({
			per_page: 10,
			page :1,
			object_type: 2,
			accounting: "1361A",
			name: null,
			code: null,
			tinh_thanhpho: null,
		});
		formCode.resetFields();
		formName.resetFields();
		formCity.resetFields();
	}
    return (<>
			<NavBar2 title={"Quỹ tồn cửa hàng"} summarys={summarys}></NavBar2>
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
							<Table 
								columns={columns}
								rowKey="id"
								dataSource={data}
								onRow={(record) => {
									return {
										onClick: async () => {
											record.page_name = "Quỹ tồn chi nhánh"
											const result = await handleShowDetailRecord({
												"object[id]": record.object.object_id,
												"object[type]": record.object.object_type,
												accounting: record.accounting,
											}, record)
											result && Router.push(`/congno/quytonchinhanh/chitiet/?id=${record?.object?.object_id}&type=${record?.object?.object_type}&accounting=${record?.accounting}`);
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
										getListBankFunds({page, per_page: pageSize});
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

export default BankFundsComponent;
