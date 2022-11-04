import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Space, Card, Select, Layout, Upload, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { showmessageSuccess } from 'src/constants/function';
import { useRouter } from 'next/router';
import { action_getListBankOfCompany } from 'src/redux/actions/common';
import { action_confirmdebt } from '../../redux/actions/debt';
import CreatePaySlip from '../EmployeeSalary/createPaySlip';
import NavBarEmployeeCreate from '../EmployeeSalary/nav-bar-employee';
import { UPLOAD_FILE_TYPE } from '../../utils/constants';
import CreateSupplierDoc from '../SupplierDebt/createSupplierDoc';

const { Text, Title } = Typography;

const dateFormat = 'hh:mm DD-MM-YYYY';
const { Option } = Select;
const listUpload = [{
	uid: '1',
	name: 'xxx.png',
	status: 'done',
	response: 'Server Error 500', // custom error message to show
	url: 'http://www.baidu.com/xxx.png',
},
{
	uid: '2',
	name: 'yyy.png',
	status: 'done',
	url: 'http://www.baidu.com/yyy.png',
},
{
	uid: '3',
	name: 'zzz.png',
	status: 'error',
	response: 'Server Error 500', // custom error message to show
	url: 'http://www.baidu.com/zzz.png',
}];
const { Header, Footer, Sider, Content } = Layout;
// QUet the va tra gop, thu COD, thu tien cong thanh toan giong nhau && chuyen khoan, thu tien tu cua hang && CHi hoan  giong nhau
function DebtCreateDoc(props) {
	// render list bank
	const { debt, object_debt } = useSelector(state => state.debt.listCreateDebtDoc);
	const [dataTable, setDataTable] = useState(debt || []);
	const bank_account_idRef = useRef();
	const upLoadFile = useRef([]);
	const countSizeFile = useRef(0);
	const accounting = !_.isEmpty(debt) ? debt[0].accounting : null;
	const dispatch = useDispatch();
	const router = useRouter();
	const [listBank, setListBank] = useState([]);
	useEffect(() => {
		const getListBank = async () => {
			const result = await dispatch(await action_getListBankOfCompany());
			result && setListBank(result?.data);
		};
		getListBank();
	}, []);
	const renderListBank = (list) => {
		const reuslt = list.map(bank => {
			return (
				<Option value={bank.id}>
					{bank?.bank_account_full_label}
				</Option>
			);
		});
		return reuslt;
	};

	return (<>
		<Layout>

			<NavBarEmployeeCreate debt_size={_.size(debt)} accounting={accounting} object_debt={object_debt} debt={debt} />

			<Row style={{ marginTop: '24px' }}>
				<Col span={20} style={{ margin: 'auto' }}>
					{accounting == 3341 ?
						<CreatePaySlip debt={debt} /> : <CreateSupplierDoc debt={debt} />}

				</Col>

				<Col span={20} style={{ margin: 'auto', marginTop: 24 }} className="create__debt--fix">
					<Card title={<Title level={5}>{accounting == 3341 ? 'Tài khoản chi trả' : 'Tài khoản chi'}</Title>} bodyStyle={{ padding: '24px !important' }}>
						<Select
							size="medium"
							defaultValue={!_.isEmpty(dataTable) ? dataTable[0]?.bank_account_company?.id : null}
							style={{ width: 542, padding: '24px,0,24px,24px' }}
							onChange={(value) => {
								bank_account_idRef.current = value;
							}}
						>
							{!_.isEmpty(listBank) && renderListBank(listBank)}
						</Select>
					</Card>
				</Col>

				<Col span={20} style={{ marginTop: '24px', background: 'white', marginBottom: '268px' }} offset={2}>
					<Card style={{ padding: '12px 24px' }} bordered={false}>
						<div style={{ width: '30%' }}>
							<Upload
								// defaultFileList={listUpload}
								accept={UPLOAD_FILE_TYPE}
								beforeUpload={(file) => {
									const isLt2M = (file.size + countSizeFile.current) / 1024 / 1024 <= 5;
									if (isLt2M) {
										countSizeFile.current += file.size;
										return false;
									}

									message.error('Dung lượng file phải nhỏ hơn 5MB!');
									return true;
								}}
								multiple
								onChange={(value) => {
									upLoadFile.current = value.fileList;
								}}
							>
								<Space direction="vertical">
									<Button icon={<UploadOutlined />}>Tải đính kèm lên</Button>
									<Text type="secondary" style={{ fontSize: '14px' }}>Dung lượng file phải nhỏ hơn 5MB!</Text>
								</Space>
							</Upload>

						</div>
					</Card>
				</Col>
			</Row>

			<Footer style={{ padding: '30px 0 0 0', position: 'fixed', bottom: 0, right: 0, left: 0 }}>
				<Row>
					<Col span={24} className="cus-button-footer">
						<div />
						<Space>
							<Button
								type="primary"
								onClick={async () => {
									const tr = {};
									const test = [...dataTable];
									test.map((items, index) => {
										tr[`objects[${index}][id]`] = items?.object_id;
										tr[`objects[${index}][type]`] = items?.object_type;
										tr[`objects[${index}][amount]`] = items?.fee || 0;
										tr[`objects[${index}][bank_account_id]`] = items?.object?.bank_account_company_id || bank_account_idRef.current;
										return true;
									});
									const im = {};
									upLoadFile.current.map((items, index) => {
										im[`images[${index}]`] = items.originFileObj;
									});
									const urlBody = {
										kind: dataTable[0]?.kind,
										bank_account_id: bank_account_idRef.current || dataTable[0]?.bank_account_company_id,
										confirmed_at: moment(Date.now()).format(dateFormat),
										title: dataTable[0]?.kind == 9 ? 'Chi lương' : 'Chi trả công nợ',
										status: 1,
										// images: upLoadFile.current
									};
									const result = await dispatch(await action_confirmdebt({ ...urlBody, ...tr, ...im }));
									result && showmessageSuccess('Tạo thành công!', () => {
										router.back();
									});
								}}
							>Tạo và hạch toán
							</Button>

							<Button onClick={async () => {
								const tr = {};
								const test = [...dataTable];
								test.map((items, index) => {
									tr[`objects[${index}][id]`] = items?.object_id;
									tr[`objects[${index}][type]`] = items?.object_type;
									tr[`objects[${index}][amount]`] = items?.fee || 0;
									tr[`objects[${index}][bank_account_id]`] = items?.object?.bank_account_company_id || bank_account_idRef.current;
									return true;
								});
								const im = {};
								upLoadFile.current.map((items, index) => {
									im[`images[${index}]`] = items.originFileObj;
								});
								const urlBody = {
									kind: dataTable[0]?.kind,
									bank_account_id: bank_account_idRef.current || dataTable[0]?.bank_account_company_id,
									confirmed_at: moment(Date.now()).format(dateFormat),
									title: dataTable[0]?.kind == 9 ? 'Chi lương' : 'Chi trả công nợ',
									status: 3,
								};
								const result = await dispatch(await action_confirmdebt({ ...urlBody, ...im, ...tr }));
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
			</Footer>
		</Layout>

         </>

	);
}

export default DebtCreateDoc;
