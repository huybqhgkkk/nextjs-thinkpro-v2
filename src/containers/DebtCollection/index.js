import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Button, Row, Col, Input, Form, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {
	action_getListDebtCollection,
	action_getListDebtDetail} from '../../redux/actions/debt'
import {MapMoneyToNumber} from  '../../constants/function'
import Router, { useRouter } from 'next/router'
import _ from 'lodash';
import NavBar1 from "../NavBar/nav-bar-1";
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
function DebtCollectionComponent(props) {
    const router = useRouter()
    const {data,pagination,summarys} = useSelector(state => state.debt.listDebtCollection);
    const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [formCode] = Form.useForm();
	const [formName] = Form.useForm();
	const [formDepartmentName] = Form.useForm();
	const [formAccouting] = Form.useForm();


    useEffect(() => {
        getListDebtCollection({
            "per_page": 10,
            "page": 1,
            "object_type": 3,
            "status_work": [],
            "accounting": "131"
          });
    },[])
    // Get LIST EMPLOYEE
	const  getListDebtCollection =  async (urlFormData) => {
		setLoading(true);
		const result = await dispatch(await action_getListDebtCollection({...formData ,...urlFormData}));
		setLoading(false);
		if(result) formData = {...formData ,...urlFormData};
	}

	const handleSearch = (value) => {
		const formData = {...value,...{page: pagination?.current_page,per_page: pagination?.per_page}}
		getListDebtCollection(formData);
	}
    // Man chi tiet cua 1 cot
    const handleShowDetailRecord = async (formData, record) => {
        const result = await dispatch(await action_getListDebtDetail(formData, {...record, page_name: "Công nợ thu hộ"}));
        return !_.isEmpty(result)  ?true:false;
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
								getListDebtCollection({'code': null});
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
        dataIndex: 'department_name',
        key: "acronym",
        width: 149,
		filterDropdown: () => (
			<div style={{ padding: 8 }}>
				<Form
					name="basic"
					onFinish={handleSearch}
					autoComplete="off"
					form={formDepartmentName}
				>
					<Form.Item name="acronym" style={{width: 164,marginLeft: "auto"}}>
						<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm"/>
					</Form.Item>

					<Form.Item style={{paddingTop: '8px'}}>
						<Row justify="space-between" align="middle">
							<Col span={10}>
								<Button type="primary" htmlType="submit">Áp dụng</Button>
							</Col>
							<Col span={10} >
								<Button style={{float: 'right'}} onClick={() => {
								formDepartmentName.resetFields();
								getListDebtCollection({acronym: null});
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
        dataIndex: "name",
        key:"name",
        width: 697,
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
								getListDebtCollection({name: null});
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
        width: 160,
		// filterDropdown: () => (
		// 	<div style={{ padding: 8 }}>
		// 		<Form
		// 			name="basic"
		// 			onFinish={handleSearch}
		// 			autoComplete="off"
		// 			form={formAccouting}
		// 		>
		// 			<Form.Item name="accounting" style={{width: 164,marginLeft: "auto"}}>
		// 				<Input  suffix={<SearchOutlined/>} placeholder="Tìm kiếm chính xác"/>
		// 			</Form.Item>

		// 			<Form.Item style={{paddingTop: '8px'}}>
		// 				<Row justify="space-between" align="middle">
		// 					<Col span={10}>
		// 						<Button type="primary" htmlType="submit">Áp dụng</Button>
		// 					</Col>
		// 					<Col span={10} >
		// 						<Button style={{float: 'right'}} onClick={() => {
		// 						formAccouting.resetFields();
		// 						getListDebtCollection({accounting: null});
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

    {
        title: 'Dư nợ',
        width: 200,
        dataIndex: 'debt_label',
        key: "debt_label",
        sorter: (a,b) =>MapMoneyToNumber(a.debt_label) - MapMoneyToNumber(b.debt_label),
    },
    {
        title: 'Dư có',
        width: 200,
        dataIndex: 'profit_label',
        key: "profit_label",
        sorter: (a,b) =>MapMoneyToNumber(a.profit_label) - MapMoneyToNumber(b.profit_label),
    },
];

//reload data table
	const handleReloadTable = () => {
		getListDebtCollection({
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
			formDepartmentName.resetFields();
			formAccouting.resetFields();
	}
    return (<>
		<NavBar1 title={"Công nợ thu hộ"} debt={summarys}></NavBar1>
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
								onRow={(record) => {
									return {
										onClick: async () => {
											const result = await handleShowDetailRecord({
												"object[id]": record.object.object_id,
												"object[type]": record.object.object_type,
												accounting: record.accounting,
											}, record)
											result && Router.push(`/congno/thuho/chitiet/?id=${record?.object?.object_id}&type=${record?.object?.object_type}&accounting=${record?.accounting}&check=1`);
										}
									}
								}}
								dataSource={data}
								pagination={{
									total: pagination?.total,
									showTotal: (total, range) => `${range[0]}-${range[1]} của  ${total} bản ghi`,
									defaultPageSize: 10,
									defaultCurrent: 1,
									current:  pagination?.current_page,
									pageSizeOptions: [10,20,50],
									onShowSizeChange: (page,pageSize) => {
										getListDebtCollection({page, per_page: pageSize});
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

export default DebtCollectionComponent;
