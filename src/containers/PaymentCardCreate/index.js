import React, { useRef, useState } from 'react';
import {
	Button,
	Row,
	Col,
	Space,
	Card,
	Select,
	Layout,
	Upload,
	message,
	Typography
} from 'antd';
import {UploadOutlined} from '@ant-design/icons'
import _ from 'lodash';
import NavBarCreate from '../NavBar/nav-bar-create';
import { useSelector, useDispatch } from 'react-redux';
import { action_confirmTransaction } from '../../redux/actions/request-payment'
import moment from 'moment';
import { useRouter } from 'next/router';
import CreateSwipCart from '../RequestPayment/CreateSwipCard'
import CreateTransfers from '../RequestPayment/CreateTransfers';
import CreateRefunds from '../RequestPayment/CreateRefunds';
import { UPLOAD_FILE_TYPE } from '../../utils/constants';


const dateFormat = 'hh:mm DD-MM-YYYY'
const { Option } = Select;
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
//QUet the va tra gop, thu COD, thu tien cong thanh toan giong nhau && chuyen khoan, thu tien tu cua hang && CHi hoan  giong nhau
function PaymentCardCreate(props) {
	//render list bank
	const {object_debt, transaction, listBank} = useSelector(state => state.requestpayment.dataCreateDoc);
	const [dataTable, setDataTable] = useState(transaction || []);
	const bank_account_idRef= useRef();
	const upLoadFile= useRef([]);
	const kind_tran = !_.isEmpty(transaction) ? transaction[0].kind : null;
	const dispatch = useDispatch();
	const router = useRouter();
	const [dateConfirmAt, setDateConfirmAt] = useState(moment(Date.now()).format(dateFormat));
	const countSizeFile = useRef(0);
	const renderListBank = (list) => {
		const reuslt = list.map(bank => {
			return (
				<Option value={bank.id}>
					{bank?.bank_account_full_label}
				</Option>
			)
		})
		return reuslt;
	}
	//Tao va hach toan
	const HandleCreateAndSubmit = (value) => {
		console.log(value);
	}

	return (<>
		<Layout>

			<NavBarCreate object_debt={object_debt} record={!_.isEmpty(dataTable) ? dataTable[0] : []} onChangeConfirmAt={setDateConfirmAt}/>


				<Row style={{ marginTop: '24px' }}>
					<Col span={20} style={{ margin: 'auto' }}>
						{kind_tran == 5 || kind_tran == 1  ?
							<CreateTransfers transaction={dataTable} onCreateAndSubmit={HandleCreateAndSubmit}/>
							: kind_tran == 4 || kind_tran == 2 || kind_tran == 3 || kind_tran == 11 ? <CreateSwipCart
								transaction={dataTable}
								onCreateAndSubmit={HandleCreateAndSubmit}
							/>
							: kind_tran == 6  ? <CreateRefunds transaction={dataTable}/>
							: <> </>

						}


					</Col>

					<Col span={20} style={{ margin: 'auto', marginTop: 24 }} className="create__debt--fix">
						<Card title="Tài khoản nhận tiền của công ty" bodyStyle={{padding: '24px !important'}}>
							<Select
								size="medium"
								defaultValue={!_.isEmpty(dataTable) ? dataTable[0]?.bank_account_company?.id : null}
								style={{ width: 542, padding:"24px,0,24px,24px" }}
								onChange={(value, e) => {
									bank_account_idRef.current = value;
								}}
							>
								{renderListBank(listBank || [])}
							</Select>
						</Card>
					</Col>

					<Col span={20} style={{ marginTop: '24px', background: 'white', marginBottom: '268px' }} offset={2}>
						<Card style={{padding: '24px 24px'}} bordered={false}>
							<div style={{ width: '30%' }}>
									<Upload
										accept={UPLOAD_FILE_TYPE}
										multiple
										onChange={(value)=>{
											upLoadFile.current = value.fileList
										}}
									beforeUpload={(file) => {
										const isLt2M = (file.size +countSizeFile.current) / 1024 / 1024 <= 5;
										if (isLt2M) {
											countSizeFile.current = countSizeFile.current + file.size;
											return false;
										}
										else {
											message.error('Dung lượng file phải nhỏ hơn 5MB!');
											return true;
										}
									}}
									>
										<Button icon={<UploadOutlined />} >Tải đính kèm lên</Button>
										<p><Text type="secondary" style={{fontSize: '14px'}}>Dung lượng tối đa 5MB</Text></p>
									</Upload>
								</div>
						</Card>
					</Col>
				</Row>






			<Footer style={{padding: '30px 0 0 0', position: 'fixed', bottom: 0,right: 0, left: 0}}>
				<Row>
				<Col span={24} className="cus-button-footer">
					<div />
					<Space>
						<Button type="primary" onClick={async () => {
							const tr = {};
							const test = [...dataTable]
							test.map((items,index) => {

									tr[`transactions[${index}][id]`] = items?.id
									tr[`transactions[${index}][fee]`] = items?.fee
									tr[`transactions[${index}][amount]`] = items?.amount
									tr[`transactions[${index}][object][id]`] =items?.object?.object_id
									tr[`transactions[${index}][object][type]`] = items?.object?.object_type
								return true;
							});
							const im = {};
							upLoadFile.current.map((items, index) => {
								im[`images[${index}]`]  = items.originFileObj
							})
							const urlBody = {
								kind: dataTable[0]?.kind,
								bank_account_id: bank_account_idRef.current || dataTable[0]?.bank_account_company?.id,
								// transactions: dataTable,
								confirmed_at: dateConfirmAt,
								title: `Thu ${dataTable[0]?.kind_label.toLowerCase()} ${dataTable[0]?.object?.name}`,
								status: 1,

							}
							 const result = await dispatch( await action_confirmTransaction({...urlBody,...tr,...im}));
							result && message.success('Tạo phiếu thành công') &&  router.back();


						}}>Tạo và hạch toán</Button>

						<Button onClick={async () => {
							const tr = {};
							const test = [...dataTable]
							test.map((items,index) => {

									tr[`transactions[${index}][id]`] = items?.id
									tr[`transactions[${index}][fee]`] = items?.fee
									tr[`transactions[${index}][amount]`] = items?.amount
									tr[`transactions[${index}][object][id]`] =items?.object?.object_id
									tr[`transactions[${index}][object][type]`] = items?.object?.object_type
								return true;
							});
							const im = {};
							upLoadFile.current.map((items, index) => {
								im[`images[${index}]`]  = items.originFileObj
							})
							const urlBody = {
								kind: dataTable[0]?.kind,
								bank_account_id: bank_account_idRef.current || dataTable[0]?.bank_account_company?.id,
								// transactions: dataTable,
								confirmed_at: dateConfirmAt,
								title: `Thu ${dataTable[0]?.kind_label.toLowerCase()} ${dataTable[0]?.object?.name}`,
								status: 3,

							}
							 const result = await dispatch( await action_confirmTransaction({...urlBody,...tr,...im}));
							result && message.success("Tạo thành công!") && router.back();
						}}>Tạo và lưu nháp</Button>
						<Button style={{marginRight:16}} onClick={async () => {
							router.back();
						}}>Đóng, không lưu</Button>
					</Space>

				</Col>
           </Row>
			</Footer>
		</Layout>

         </>

	);
}

export default PaymentCardCreate;
