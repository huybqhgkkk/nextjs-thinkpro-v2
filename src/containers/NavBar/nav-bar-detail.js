import React from 'react';
import { Button, Card, PageHeader, Statistic, Descriptions } from 'antd';
import { formatNumberNoD } from 'src/constants/function';
import { ArrowDownOutlined, DownloadOutlined } from '@ant-design/icons';

const NavBarDetail = ({object_info, title, accounting, debt}) => {
	const renderContent = (column = 3) => (
		<>
			<Descriptions size="small" column={column}>
				<Descriptions.Item label="Tài khoản kế toán">{`${accounting?.kind}-${accounting?.name}`}</Descriptions.Item>
				<Descriptions.Item label="Điện thoại">{object_info?.phone}</Descriptions.Item>
				{/*<Descriptions.Item label="" />*/}
				{/*<Descriptions.Item label="" />*/}

			</Descriptions>
			<Descriptions size="small" column={1}>
				<Descriptions.Item label="Địa chỉ">{object_info?.address}</Descriptions.Item>
			</Descriptions>
		</>

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
				value={formatNumberNoD(debt?.amount)}
				valueStyle={{ textAlign: 'left' }}
				prefix={<ArrowDownOutlined style={{ color: '#1554F6' }} />}
				suffix="₫"
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
			breadcrumbName: 'Công nợ',
		},
		{
			path: 'first',
			breadcrumbName: `${title}`,
		},
		{
			path: 'second',
			breadcrumbName: `${object_info?.name}`,
		},
	];

	return (
		<>
			<Card>
				<PageHeader
					breadcrumb={{ routes }}
					className="site-page-header-responsive"
					onBack={() => window.history.back()}
					title={title}
					subTitle={object_info?.code}
					extra={[
						<Button type="primary" icon={<DownloadOutlined />}>Tải xuống</Button>,
					]}
					footer={null}
				>
					<Content extra={extraContent}>{renderContent()}</Content>
				</PageHeader>
			</Card>
		</>
	);
};

export default NavBarDetail;
