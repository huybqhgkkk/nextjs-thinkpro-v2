import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Modal, Card, Typography, Avatar, Button, Select, Upload, Divider, Form, message,Space, Popconfirm } from 'antd';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { action_getListBankPayment, action_getDocumentDetail, action_getHistoryDocument } from 'src/redux/actions/payment-card';
import { action_deleteAttachment, action_updateMany } from 'src/redux/actions/common';
import moment from 'moment';
import { useRouter } from 'next/router';
import CommentComponent from 'src/components/Comment';
import EditEmployeeSalary from '../EmployeeSalary/EditEmployeeSalary';
import EditSwipCard from '../RequestPayment/EditSwipCard';
import EditTransfers from '../RequestPayment/EditTransfers';
import EditRefunds from '../RequestPayment/EditRefunds';
import NavBarCreate2 from '../NavBar/nav-bar-create2';
import { UPLOAD_FILE_TYPE, NEXT_MEDIA_API } from 'src/utils/constants';
import SupplierPaySlips from '../SupplierDebt/supplierPaySlip';

const { Option } = Select;
const {Text, Title} = Typography;

const PopUpPaymentCard = () => {
	const { data = {}, object_info, debt } = useSelector(state => state.paymentcard.dataDetailDocument);
	const countSizeFile = useRef(0);
	const dispatch = useDispatch();
	const router = useRouter();
	const [formBank] = Form.useForm();
	// const { histories } = data;
	const [histories, setHistories] = useState([]);
	const kind = data?.kind;
	const [comments, setComments] = useState([]);
	const [dataRow, setDataRow] = useState([]);
	const [listBank, setListBank] = useState([]);
	const [listUpload, setListUpload] = useState([]);
	const [showUpdateText, setShowUpdateText] = useState('');
	let updateMany = {
		confirmed_at: data?.confirmed_at,
		title: data?.title,
		status: data?.status,
		bank_account_id: data?.bank_account_id,
		id: data?.id,
		status_note: data?.note
	};
	useEffect(() => {
		if (!_.isEmpty(data)) {
			setDataRow(data?.detail);
			setComments(data?.comments);
			setHistories(data?.histories);
			setListUpload(data?.attachments.map(items => {
				const fileName = items?.file_path.split('/');
				return {
					uid: items?.id,
					name: fileName[_.size(fileName)-1],
					status: 'done',
					url: `${NEXT_MEDIA_API}/${items?.file_path}`,
				}
			}))

		}
	}, [data]);
	// get detail

	const getListDocumentDetail = async () => {
		 dispatch(await action_getDocumentDetail({
			status: 1,
			page: 1,
			per_page: 10,
		}, router.query));
	};

	useEffect(() => {
		getListDocumentDetail();
	}, []);

	// Thay doi ngay hach toan (update)
	const handleUpdateComfirmDate = async (value) => {
		const updateDate = await dispatch(await action_updateMany({ ...updateMany, confirmed_at: moment(value).format('hh:mm DD-MM-YYYY') }));
		if (updateDate) updateMany = ({ ...updateMany, confirmed_at: moment(value).format('hh:mm DD-MM-YYYY') });
	};
	// thay doi trang thai phieu
	const handleUpdateStatus = async (value) => {
		const updateDate = await dispatch(await action_updateMany({ ...updateMany, ...value }));
		if (updateDate) {
			updateMany = ({ ...updateMany, ...value });
			const getHistory = await dispatch(await action_getHistoryDocument({}, router.query));
			setHistories(getHistory?.data);
			return updateDate;
		}
	};
	  // Get List Bank
	useEffect(() => {
		const getListBank = async () => {
			const result = await dispatch(await action_getListBankPayment());
			result && setListBank(result?.data);
		};
		getListBank();
	}, []);
	// render lít bank

	const renderListBank = (banks) => {
		const options = banks.map(bank => {
			return (
				<Option value={bank?.id}>
					{bank?.bank_account_full_label}
				</Option>
			);
		});
		return options;
	};

	const handleUploadFile = async (value, type) => {
		// 1: upload, 2: delete file
		if(type == 1) {
			const result = await dispatch(await action_updateMany({ ...updateMany, 'images[0]': value}))
			if(result) {

				// setListUpload(result?.data?.attachments.map(items => {
				// 	const fileName = items?.file_path.split('/');
				// 	return {
				// 		uid: items?.id,
				// 		name: fileName[_.size(fileName)-1],
				// 		status: 'done',
				// 		url: `${process.env.NEXT_PUBLIC_API_URL}/${items?.file_path}`,
				// 	}
				// }))
				const newFile = result?.attachments.map(items => {
					const fileName = items?.file_path.split('/');
					return {
						uid: items?.id,
						name: fileName[_.size(fileName)-1],
						status: 'done',
						url: `${NEXT_MEDIA_API}/${items?.file_path}`,
					}
				})
				setListUpload(prev => [...prev,...newFile]);
			}
		} else {
			const result = await dispatch(await action_deleteAttachment({file_id: value?.uid, id: router.query?.id}));
			if(result) {
				const newListFile = [...listUpload]
				setListUpload(newListFile.filter(items => items.uid != value.uid))
				message.success("Xoá thành công!");
			} else message.error("Xóa thất bại!")
		}

	}
 // modal show update succeess
	const ModalShowSuccess  = (text) => {

			Modal.success({
				content: text,
				onOk: () => {
					setShowUpdateText('');
				}
			},);

	}
	return (
		<>
			<NavBarCreate2
				data={data}
				onChangeConfirmDate={handleUpdateComfirmDate}
				onChangeStatus={handleUpdateStatus}
				nav={{object_info, debt}}
				kind={kind}
			/>
			<Row style={{ marginTop: '24px' }} gutter={16}>
				<Col span={1}> </Col>
				<Col span={16}>
					<Row>
						<Col span={24} style={{paddingBottom: '24px' , background:"#fff"}}>
							{kind == 4 || kind == 3 || kind == 2 || kind == 11 ? <EditSwipCard dataRow={dataRow} data={data} onChangeDataRow={setDataRow} />
								:kind == 7 ? <SupplierPaySlips dataRow={dataRow} data={data} onChangeDataRow={setDataRow}/>
									: kind == 6 ? <EditRefunds dataRow={dataRow} data={data} onChangeDataRow={setDataRow} />
										: kind == 9 ? <EditEmployeeSalary dataRow={dataRow} data={data} onChangeDataRow={setDataRow} />
										: <EditTransfers dataRow={dataRow} data={data} onChangeDataRow={setDataRow} />
									}

						</Col>
						{console.log('data', data)}
						<Col span={24} style={{padding: '0 0 12px 0', background:"#fff"}}><Divider style={{margin: 0, background: 'white'}} /></Col>
						<Col span={24} style={{padding: '0 12px', background: 'white'}}>
							<Card style={{border: 'none', padding: 24}}>
								<Title level={5} style={{marginBottom: '16px'}}>Tài khoản chi</Title>
								{/* <Form form={formBank}>
									<Form.Item name="bank_account_id"> */}
										{!_.isEmpty(data) && 
										
										<Select
										showSearch
										style={{ width: '40%' }}
										placeholder="Tìm kiếm"
										optionFilterProp="children"
										defaultValue={data?.bank_account_id}
										// value={data?.bank_account_id}
										onChange={async (e) => {
											const dataUpdate = { ...updateMany, bank_account_id: e };
											const result = dispatch(await action_updateMany(dataUpdate));
											if (result) {
												updateMany = dataUpdate;
												setShowUpdateText('Cập nhật thành công!')
												// formBank.setFieldsValue({'bank_account_id': e})
											}
										}}
									>
										{!_.isEmpty(listBank) && renderListBank(listBank)}
									</Select>
										
										}
									
									{/* </Form.Item>
								</Form> */}
								
							</Card>
						</Col>

						<Col span={24}>
							<Card style={{ padding: '24px', marginTop: '24px' }}>
								<div style={{ width: '30%' }}>
									<Upload
										// defaultFileList={listUpload}
										fileList={listUpload}
										accept={UPLOAD_FILE_TYPE}
										multiple
										onRemove={async (e) => {
											// const result = await dispatch(await action_deleteAttachment({file_id: e?.uid, id: router.query?.id}));
											// if(result) {
											// 	const newListFile = [...listUpload]
											// 	setListUpload(newListFile.filter(items => items.uid != e.uid))
											// 	message.success("Xoá thành công!");
											// } else message.error("Xóa thất bại!")
											handleUploadFile(e, 2);
										}}
										beforeUpload={(file) => {
											const isLt2M = (file.size +countSizeFile.current) / 1024 / 1024 <= 5;
											if (isLt2M) {
												countSizeFile.current = countSizeFile.current + file.size;
												handleUploadFile(file, 1);
												return false;
											}
											else {
												message.error('Dung lượng file phải nhỏ hơn 5MB!');
												return true;
											}
										}}
										// onChange={async (value)=>{
										// 	const result = await dispatch(await action_updateMany({ ...updateMany, 'images[0]': value.file}))
										// 	if(result) {

										// 		setListUpload(result?.data?.attachments.map(items => {
										// 			const fileName = items?.file_path.split('/');
										// 			return {
										// 				uid: items?.id,
										// 				name: fileName[_.size(fileName)-1],
										// 				status: 'done',
										// 				url: `${process.env.NEXT_PUBLIC_API_URL}/${items?.file_path}`,
										// 			}
										// 		}))
										// 	}
										// 	// console.log(value.file);
										// }}

									>
										<Space direction="vertical">
										<Button icon={<UploadOutlined />}>Tải đính kèm lên</Button>
										<Text type="secondary" style={{fontSize: '14px'}}>Dung lượng file phải nhỏ hơn 5MB!</Text>
										</Space>

									</Upload>
								</div>
							</Card>
						</Col>
					</Row>

				</Col>

				<Col span={6} style={{ height: 700 }}>
					<CommentComponent comments={comments} histories={histories} onSetComments={setComments} id={data?.id} />
				</Col>
				<Col span={1}> </Col>
			</Row>
			{showUpdateText!='' && ModalShowSuccess(showUpdateText)}
		</>

	);
};
export default PopUpPaymentCard;
