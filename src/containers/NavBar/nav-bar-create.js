import React from 'react';
import {Breadcrumb, Button, Card, Col, Descriptions, PageHeader, Row, Statistic,DatePicker} from 'antd';
import {ArrowDownOutlined, ArrowLeftOutlined, DownloadOutlined, EditOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { formatNumber } from 'src/constants/function';
import moment from 'moment';
import {
	ProFormDatePicker,
	ProFormDateRangePicker,
	ProFormDateTimePicker,
	ProFormDateTimeRangePicker,
	ProFormTimePicker,
} from '@ant-design/pro-form';
import {formatNumberNoD} from 'src/constants/function'
const NavBarCreate = ({object_debt, record, onChangeConfirmAt}) => {
	const router = useRouter();
	const dateFormat = 'DD/MM/YYYY HH:MM';
	const renderContent = (column = 4) => (
		<Descriptions size="small" column={column}>
			<Descriptions.Item label="Thời gian hạch toán">
				<DatePicker showTime={{ format: 'HH:MM' }} defaultValue={moment()} format={dateFormat} onChange={(e) => {
					onChangeConfirmAt(moment(e).format('hh:mm DD-MM-YYYY'))
				}}/>

			</Descriptions.Item>
			<Descriptions.Item label="Đối tượng nộp">{object_debt?.object_info?.name}</Descriptions.Item>
			<Descriptions.Item label="Địa chỉ">{object_debt?.object_info?.address}</Descriptions.Item>
			<Descriptions.Item label=""></Descriptions.Item>
			<Descriptions.Item label="Công nợ thu hộ">{formatNumber(object_debt?.debt?.debt)}</Descriptions.Item>

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
				value={formatNumberNoD(112893800)}
				precision={3}
				valueStyle={{ textAlign: "left" }}
				prefix={<ArrowDownOutlined style={{color: "#1554F6"}}/>}
				suffix="₫"
			/>

		</div>
	);

	const Content = ({ children, extra }) => (
		<div className="content" style={{display:"flex"}}>
			<div className="main">{children}</div>
			<div className="extra">{extra}</div>
		</div>
	);

	const routes = [
		{
			path: 'index',
			breadcrumbName: 'Phiếu thu chi',
		},
		{
			path: 'first',
			breadcrumbName: `Thu tiền ${record?.kind_label} ${object_debt?.object_info?.name}`,
		},
	];
	return (
		<>
			<Card>
				<PageHeader
					breadcrumb={{ routes }}
					className="site-page-header-responsive"
					onBack={() => window.history.back()}
					title={`Thu tiền ${record?.kind_label} ${object_debt?.object_info?.name}`}
					// subTitle="DWG - NCC046"
					// extra={[
					// 	<Button type="primary" icon={<DownloadOutlined />} >Tải xuống</Button>
					// ]}
					footer={null}
				>
					{renderContent()}
				</PageHeader>
			</Card>
		</>
	);
};

export default NavBarCreate;
