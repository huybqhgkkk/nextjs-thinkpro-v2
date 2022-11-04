import React, { useEffect, useRef, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Button, Row, Col, Input, Form, Table } from 'antd';
import {SearchOutlined } from '@ant-design/icons'
import {action_getListSupplierDebt,action_getListDebtDetail} from '../../redux/actions/debt'
import {MapMoneyToNumber} from  '../../constants/function'
import { useRouter } from 'next/router'
import _ from 'lodash';
import NavBar1 from "../NavBar/nav-bar-1";
import { action_getObectDebt } from 'src/redux/actions/common';
import Router from 'next/router'
import ToolTable from 'src/components/toolTable';
let formData = {
	per_page: 10,
	page :1,
	object_type: 3,
	accounting: "331",
	name: null,
	code: null,
	acronym: null
}
function SupplierDebtComponent(props) {
    const {data = [],pagination = [], summarys} = useSelector(state => state.debt.listSupplierDebt);
    const dispatch = useDispatch();
    const listRowSelect = useRef([]);
    const router = useRouter();
	const [check,setCheck] = useState(true);
	const [loading, setLoading] = useState(false);
	const [formCode] = Form.useForm();
	const [formName] = Form.useForm();
	const [formDepartmentCode] = Form.useForm();
	const [arrRowSelect, setArrRowSelect] = useState([]);
	// const [form]
    useEffect(() => {
        getListSupplierDebt({
            "per_page": 10,
            "page": 1,
            "object_type": 3,
            // "status_work": [],
            "accounting": "331"
          });
    },[])
    // Get List Supplier Deb
	const  getListSupplierDebt =  async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getListSupplierDebt({...formData ,...urlFormData}));
		setLoading(false)
		if(result) formData = {...formData ,...urlFormData}
	}

	const handleSearch = (value) => {
		const formData = {...value,...{page: pagination?.current_page,per_page: pagination?.per_page}}
		getListSupplierDebt(formData);
	}

// Man chi tiet cua 1 cot
const handleShowDetailRecord = async (formData) => {
    const result = await dispatch(await action_getListDebtDetail(formData));
    return !_.isEmpty(result)?true:false;
}


const columns = [
    {
        title: 'Mã NCC',
        dataIndex: 'code',
        key:"code",
        width: 149,
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
								getListSupplierDebt({code: null});
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
        title: 'Tên viết tắt',
        dataIndex: 'name',
        key: "name",
        width: 149,
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formName}
				>
					<Form.Item name="name" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formName.resetFields();
								getListSupplierDebt({name: null});
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
        title: 'Tên NCC',
        dataIndex: 'department_code',
        key:"department_code",
        width: 694,
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formDepartmentCode}
				>
					<Form.Item name="department_code" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formDepartmentCode.resetFields();
								getListSupplierDebt({department_code: null});
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
        width: 129,

    },
    {
        title: 'Dư nợ',
        dataIndex: 'debt_label',
        key: "debt_label",
        width: 195,
        sorter: (a,b) => MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
    },
    {
        title: 'Dư có',
        dataIndex: 'profit_label',
        width: 207,
        key: "profit_label",

        sorter: (a,b) => MapMoneyToNumber(a.debt_label) - MapMoneyToNumber(b.debt_label),
    },

];

//reload data table
	const handleReloadTable = () => {
		getListSupplierDebt({
			per_page: 10,
			page :1,
			object_type: 3,
			accounting: "331",
			name: null,
			code: null,
			acronym: null
		})
		formCode.resetFields();
		formName.resetFields();
		formDepartmentCode.resetFields();
	}
	//tao phieu
	const handleCreateFolder = async () => {
		const resultObjectDebt = await dispatch( await action_getObectDebt({
			"object[id]": (listRowSelect.current[0])?.object?.object_id,
			"object[type]": (listRowSelect.current[0])?.object?.object_type,
			kind: 7,
		}, "CREATE_SUPPLIER_DEBT_SUCCESS", listRowSelect.current));
		resultObjectDebt && router.push('/congno/nhacungcap/taophieu')
	}
    return (<>
			<NavBar1 title={"Công nợ nhà cung cấp"} debt={summarys}></NavBar1>
			<Row style={{marginTop: '24px'}}>
				<Col span={20} style={{margin: 'auto', padding: '16px 24px', background: 'white'}} className="table--fix">
					<Row align="middle" style={{marginBottom: '16px'}}>
						<Col span={4} style={{marginLeft: 'auto',padding: '8px 0 24px 0'}}>
							<ToolTable 
								 onReload={handleReloadTable} 
								 hideAdd={_.isEmpty(arrRowSelect)} 
								 hideDelete={true}
								 onAdd={handleCreateFolder}
							/>
						</Col>

						<Col span={24}>
							<Table columns={columns}
								rowKey="id"
								dataSource={data}
								onRow={(record) => {
									return {
										onClick: async () => {
											Router.push(`/congno/nhacungcap/chitiet/?id=${record?.object?.object_id}&type=${record?.object?.object_type}&accounting=${record?.accounting}`)
										}
									}	
								}}
								rowSelection = {{
									hideSelectAll:true,
									onSelect: (record,selected, selectedRows) => {
										setArrRowSelect(selectedRows);
										if(!_.isEmpty(selectedRows))  selectedRows[0].kind = 7;
										listRowSelect.current = selectedRows;
										if(_.isEmpty(selectedRows)) {
											setCheck(true)
											data.map(value => {
											value.hidden = false;
											return value;
											})
										} else {
											setCheck(false);
											data.map(value => {
												if(value?.code.toLowerCase() != record?.code.toLowerCase()) value.hidden = true;
												else value.hidden = false;
											})
										}
								},

								renderCell: (checked, record, index, originNode) => {
								if(!record.hidden) return originNode;

								},
								}}
								pagination={{
									total: pagination?.total,
									showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
									defaultPageSize: 10,
									defaultCurrent: 1,
									current:  pagination?.current_page,
									pageSizeOptions: [10,20,50],
									onShowSizeChange: (page,pageSize) => {
										getListSupplierDebt({page, per_page: pageSize});
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

export default SupplierDebtComponent;
