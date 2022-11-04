import React, { useEffect, useRef, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Button, Row, Col, Input, Typography, Form, Table, Alert } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {action_getEmployeeSalary} from '../../redux/actions/debt'
import {MapMoneyToNumber} from '../../constants/function'
import { action_createDebtEmployee } from 'src/redux/actions/debt';
import { useRouter } from 'next/router'
import _ from 'lodash';
import NavBar1 from "../NavBar/nav-bar-1";
import {formatNumber} from 'src/constants/function'
import Router from 'next/router'
import ToolTable from 'src/components/toolTable';
let formData = {
	per_page: 10,
	page: 1,
	// type: null,
	object_type: 1,
	status_work: [],
	accounting: "3341",
	department_name: null,
	name: null,
	code: null,
	department_code: null,


}
const { Text } = Typography;
function EmployeeSalaryComponent(props) {
    const router = useRouter()
    const {data,pagination,summarys} = useSelector(state => state.debt.listEmployeeSalary);
    const listRowSelect = useRef([]);
    const dispatch = useDispatch();
	const [check,setCheck] = useState(true);
	const [formCode] = Form.useForm();
	const [formName] = Form.useForm();
	const [formDepartmentCode] = Form.useForm();
	const [formDepartmentName] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [arrRowSelect, setArrRowSelect] = useState([]);
	useEffect(() => {
		getListEmployeeSalary({
			"per_page": 10,
			"page": 1,
			"object_type": 1,
			"status_work": [],
			"accounting": "3341"
		});

	}, [])
	// Get LIST EMPLOYEE
	const getListEmployeeSalary = async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getEmployeeSalary({...formData, ...urlFormData}));
		setLoading(false);
		if(result) {
			formData = {...formData, ...urlFormData}
		}
	}

	const handleSearch = (value) => {
		const formData = {...value, ...{page: pagination?.current_page, per_page: pagination?.per_page}}
		getListEmployeeSalary(formData);
	}

	const handleSum = (data) => {
		const result = data.reduce((sum, value) => {
			return sum += value.amount;
		}, 0)
		return result;
	}
// Man chi tiet cua 1 cot

	const columns = [
		{
			title: 'Mã nhân viên',
			dataIndex: 'code',
			key: "code",
			filterDropdown: () => (
				<div style={{padding: 8}}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formCode}
					>
						<Form.Item name="code" style={{width: 164, marginLeft: "auto"}}>
							<Input suffix={<SearchOutlined/>} placeholder="Tìm chính xác"/>
						</Form.Item>

						<Form.Item style={{paddingTop: '8px'}}>
							<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formCode.resetFields();
								getListEmployeeSalary({code: null});
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
			title: 'Tên nhân viên',
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
							<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm..."/>
						</Form.Item>
						<Form.Item style={{paddingTop: '8px'}}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10} >
									<Button style={{float: 'right'}} onClick={() => {
									formName.resetFields();
									getListEmployeeSalary({name: null});
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
			title: 'Mã đơn vị',
			dataIndex: 'department_code',
			filterDropdown: () => (
				<div style={{padding: 8}}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formDepartmentCode}
					>
						<Form.Item name="department_code" style={{width: 164, marginLeft: "auto"}}>
							<Input suffix={<SearchOutlined/>} placeholder="Tìm chính xác"/>
						</Form.Item>

						<Form.Item style={{paddingTop: '8px'}}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10} >
									<Button style={{float: 'right'}} onClick={() => {
									formDepartmentCode.resetFields();
									getListEmployeeSalary({department_code: null});
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
			title: 'Tên đơn vị',
			dataIndex: 'department_name',
			key: "department_name",
			filterDropdown: () => (
				<div style={{padding: 8}}>
					<Form
						name="basic"
						onFinish={handleSearch}
						autoComplete="off"
						form={formDepartmentName}
					>
						<Form.Item name="department_name" style={{width: 164, marginLeft: "auto"}}>
							<Input suffix={<SearchOutlined/>} placeholder="Tìm kiếm..."/>
						</Form.Item>

						<Form.Item style={{paddingTop: '8px'}}>
							<Row justify="space-between" align="middle">
								<Col span={10}>
									<Button type="primary" htmlType="submit">Áp dụng</Button>
								</Col>
								<Col span={10} >
									<Button style={{float: 'right'}} onClick={() => {
									formDepartmentName.resetFields();
									getListEmployeeSalary({department_name: null});
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
			title: 'Dư nợ',
			width: '164px',
			dataIndex: 'debt_label',
			key: "debt_label",

        render: (text, record) => {
          if(record.debt != 0) return text;
          else return "0 ₫";
        },
        sorter: (a,b) => MapMoneyToNumber(a.debt_label) - MapMoneyToNumber(b.debt_label),
    },
    {
        title: 'Dư có',
        width: '164px',
        dataIndex: 'profit_label',
        key: "profit_label",
        render: (text, record) => {
          if(record.profit != 0) return text;
          else return "0 ₫";
        },
        sorter: (a,b) => MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
    },
];

//reload data table
	const handleReloadTable = () => {
		getListEmployeeSalary({
			per_page: 10,
			page: 1,
			object_type: 1,
			status_work: [],
			accounting: "3341",
			department_name: null,
			name: null,
			code: null,
			department_code: null,
		})
		formCode.resetFields();
		formName.resetFields();
		formDepartmentCode.resetFields();
		formDepartmentName.resetFields();
	}

//tao phieu
	const handleCreateFolder = async () => {
		const resultObjectDebt = await dispatch( await action_createDebtEmployee({}, listRowSelect.current));
		resultObjectDebt && router.push('/congno/luongnhanvien/taophieu')
	}
    return (
		<>
			<NavBar1 title={"Lương nhân viên"} debt={summarys}/>
			<Row style={{marginTop: '24px'}}>
				<Col span={20} style={{margin: 'auto', padding: '16px 24px', background: 'white'}} className="table--fix">
					<Row align="middle" style={{marginBottom: '16px'}}>
						<Col span={4} style={{marginLeft: 'auto', paddingTop: 10}}>
							<ToolTable
								 onReload={handleReloadTable}
								 hideAdd={_.isEmpty(arrRowSelect)}
								 hideDelete={true}
								 onAdd={handleCreateFolder}
							/>
						</Col>
						<Col span={24} style={{marginBottom: '8px', padding: '16px 0'}} hidden={_.isEmpty(arrRowSelect)}>
							<Alert message={
							<Text>
								<Text strong>Đã chọn: </Text> {_.size(arrRowSelect)}/{_.size(data)} nhân viên. <b>Tổng giá trị đã chọn:</b> = {formatNumber(handleSum(arrRowSelect))}
							</Text>
							}></Alert>
						</Col>

						<Col span={24}>
							<Table
								columns={columns}
								onChange={ (pagination, filters, sorter) => {
									getListEmployeeSalary({page: pagination?.current, per_page: pagination?.pageSize})
								}}
								rowSelection = {{
								hideSelectAll: true,
								onSelect: (record,selected, selectedRows, nativeEvent) => {
									setArrRowSelect(selectedRows);
									if(!_.isEmpty(selectedRows))  selectedRows[0].kind = 9;
									listRowSelect.current = selectedRows;
									if(_.isEmpty(selectedRows)) {
										setCheck(true)
									data.map(value => {
										value.hidden = false;
										return value;
									})
									} else {
										setCheck(false)
									if(record.debt == 0 ) {
										data.map(value => {
										if(value.debt != 0) value.hidden = true;
										else value.hidden = false;
										return value;
										})
									} else {
										data.map(value => {
										if(value.profit != 0) value.hidden = true;
										else value.hidden = false;
										return value;
										})
									}

									}
								},

								renderCell: (checked, record, index, originNode) => {
								if(!record.hidden) return originNode;

								},
								}}
								loading={loading}
								rowKey="id"
								onRow={(record) => {
									return {
										onClick: async () => {
											Router.push(`/congno/luongnhanvien/chitiet/?id=${record?.object?.object_id}&type=${record?.object?.object_type}&accounting=${record?.accounting}`)
										}
									}
								}}
								dataSource={data}
								pagination={{
									total: pagination?.total,
									showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
									defaultPageSize: 10,
									defaultCurrent: 1,
									current:  pagination?.current_page,
									pageSizeOptions: [10, 20, 50],
									// onShowSizeChange: (page, pageSize) => {
									// 	getListEmployeeSalary({page, per_page: pageSize});

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

export default EmployeeSalaryComponent;
