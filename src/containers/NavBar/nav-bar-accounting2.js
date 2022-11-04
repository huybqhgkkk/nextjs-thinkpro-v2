import React from 'react';
import { Breadcrumb, Button, Card, Col, Row, PageHeader, Tabs, Statistic, Descriptions, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

const NavBarAccounting2 = (props) => {
	const { summarys, debt, title, onCreate } = props;
	const routes = [
		{
			path: 'first',
			breadcrumbName: 'Phiếu kế toán',
		},
		// {
		// 	path: 'second',
		// 	breadcrumbName: "Tạo phiếu",
		// },
	];

	return (
		<>
			<Card>
				<PageHeader
					onBack={() => window.history.back()}
					className="site-page-header-responsive"
					breadcrumb={{ routes }}
					title={title}
					footer={null}
				/>
			</Card>
		</>
	);
};

export default NavBarAccounting2;
