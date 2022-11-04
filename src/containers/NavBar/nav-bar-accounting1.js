import React from 'react';
import { Breadcrumb, Button, Card, Col, Row, PageHeader, Tabs, Statistic, Descriptions, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

const NavBarAccounting1 = (props) => {
	const { summarys, debt, title, onCreate } = props;

	return (
		<>
			<Card>
				<PageHeader
					className="site-page-header-responsive"
					title={title}
					extra={[
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={onCreate}
						>Tạo phiếu kế toán
						</Button>,
					]}
					footer={null}
				/>
			</Card>
		</>
	);
};

export default NavBarAccounting1;
