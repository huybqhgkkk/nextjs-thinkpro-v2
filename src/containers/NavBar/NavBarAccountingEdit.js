import React, { useRef, useState, useEffect } from 'react';
import {
	Card,
	Col,
	Row,
	Select,
	Typography,
	Modal,
	Input,
	Descriptions,
	Statistic,
	PageHeader,
	Button, DatePicker, Form, Tooltip, message,
} from 'antd';
import _ from 'lodash';
import {
	ArrowDownOutlined,
	LinkOutlined,
	PlusOutlined,
	PrinterOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';

const { Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY HH:MM';
const dateFormatApi = 'YYYY-MM-DD';
const 	NavBarAccountingEdit = (props) => {
	const { data, onChangeConfirmDate, onChangeStatus, onChangeTitle } = props;
	const router = useRouter();
	const [form] = Form.useForm();
	const currentStatus = useRef({});
	const currentDate = useRef();
	const [changeDate, setChangeDate] = useState(false);
	const [contentInModal, setContentInModal] = useState(null);
	const [statusModal, setStatusModal] = useState(false);
	const [reasonChangeStatus, setReasonChangeStatus] = useState();
	const handleShowModalPassStatus = (value, attribute) => {
		if (value != currentStatus.current.value) {
			setContentInModal({ from: currentStatus.current, to: attribute });
			setStatusModal(true);
		}
	};
	useEffect(() => {
		currentStatus.current = { value: data?.status, children: data?.status_label };
		currentDate.current = moment(data?.confirmed_at, dateFormatApi);
	}, [data]);
	const modalPassStatus = (visible) => {
		const handleHideModal = () => {
			setContentInModal(currentStatus.current);
			setStatusModal(false);
		};

		const handleAccept = async () => {

			const result = await onChangeStatus({ status_note: reasonChangeStatus, status: contentInModal?.to?.value });
			if (result) {
				currentStatus.current = { ...contentInModal?.to };
				setReasonChangeStatus('');
				setStatusModal(false);
			}
		};
		return (
			<Modal
				title={<b>Xác nhận chuyển trạng thái</b>}
				visible={visible}
				onOk={handleAccept}
				onCancel={handleHideModal}
				okText="Chuyển trạng thái"
			>
				<Row>
					<Col span={24}>
						Chuyển trạng thái từ <b>{contentInModal?.from?.children}</b> sang <b>{contentInModal?.to?.children} </b>
					</Col>

					<Col span={24} style={{ marginTop: '24px' }}>
						<Form>
							<Form.Item
								name="status_note"
								label="Điền lý do"
								rules={[{ required: true, message: 'Please input Intro' }]}
							>
								<Input.TextArea
									rows={3}
									value={reasonChangeStatus}
									onChange={(e) => {
										setReasonChangeStatus(e.target.value)
									}}
								/>
							</Form.Item>
						</Form>

					</Col>
				</Row>
			</Modal>
		);
	};
	const renderContent = (column = 3) => (
		<Descriptions size="small" column={column}>
			<Descriptions.Item label="Trạng thái">
				<Select
					style={{ width: 152 }}
					value={currentStatus.current.value}
					onChange={handleShowModalPassStatus}
					defaultValue={currentStatus.current?.value}
				>
					<Option value={3}>Lưu nháp</Option>
					<Option value={1}>Thành công</Option>
					<Option value={2}>Bị huỷ</Option>
				</Select>
			</Descriptions.Item>
			<Descriptions.Item label="Thời gian tạo">{data?.created_at}</Descriptions.Item>
			<Descriptions.Item label="Người tạo">{data?.created_by?.full_name}</Descriptions.Item>

			<Descriptions.Item label="Thời gian hạch toán">
				<DatePicker
					defaultValue={currentDate.current}
					format={dateFormatApi}
					showTime={{ format: 'HH:MM' }}
					onChange={async (e) => {
						 onChangeConfirmDate(e);
						currentDate.current = moment(e, dateFormatApi)
						setChangeDate(!changeDate);
					}}
					value={currentDate.current}
				/>
			</Descriptions.Item>
			<Descriptions.Item label="Số chứng từ"><a>{data?.code}</a></Descriptions.Item>
			<Descriptions.Item label="Diễn giải">
				{/* <TextArea style={{ width: 345 }} placeholder="Chi phí nhân công" autoSize={{ maxRows: 1 }} /> */}
				<Form form={form}>
					<Form.Item name="title">
						<Input placeholder="Chi phí nhân công" 
						suffix={
								// <SaveOutlined onClick={async () => {
								// 	const result = await onChangeTitle(form.getFieldValue('title'))
								// 	result && form.resetFields();
								// }}/> 
								<Text style={{color: '#06C1D4', cursor: 'pointer'}} onClick={async () => {
									const result = await onChangeTitle(form.getFieldValue('title'))
									result && form.resetFields();
								}}>Lưu</Text>
					} 
					
					style={{ width: 345 }}/>
					</Form.Item>
				</Form>

			</Descriptions.Item>
		</Descriptions>
	);

	const extraContent = (
		<div
			style={{
				display: 'flex',
				width: 'max-content',
				justifyContent: 'flex-end',
			}}
		>
			<Statistic
				title="Dư nợ"
				value={112893800}
				precision={3}
				valueStyle={{ textAlign: 'left' }}
				prefix={<ArrowDownOutlined style={{ color: '#1554F6' }} />}
				suffix="d"
			/>

		</div>
	);

	const Content = ({ children, extra }) => (
		<div className="content" style={{ display: 'flex' }}>
			<div className="main">{children}</div>
			<div className="extra">{extra}</div>
		</div>
	);

	const routes = [
		{
			path: 'index',
			breadcrumbName: 'Phiếu kế toán',
		},
		{
			path: 'first',
			// breadcrumbName: `${data?.note}`,
			breadcrumbName: `${data?.title}`,
		},
	];

	return (
		<>
			<Card>
				<PageHeader
					breadcrumb={{ routes }}
					className="site-page-header-responsive"
					onBack={() => window.history.back()}
					title={data?.note}
					// subTitle="DWG - NCC046"
					extra={[
						<Button icon={<PrinterOutlined />} />,
						<Button  icon={
							<Tooltip title="copy Link">
								<LinkOutlined onClick={() => {navigator.clipboard.writeText(location.href) && message.success("Copy thành công")}}/>
							</Tooltip>
						} >
						</Button>
					]}
					footer={null}
				>
					{/* <Content extra={extraContent}>{renderContent()}</Content> */}
					{renderContent()}
					{modalPassStatus(statusModal)}
				</PageHeader>
			</Card>
		</>
	);
};

export default NavBarAccountingEdit;
