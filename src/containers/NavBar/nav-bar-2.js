import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Card, Col, PageHeader, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, ShoppingCartOutlined, SwapOutlined, InboxOutlined } from '@ant-design/icons';
import { formatNumberNoD } from 'src/constants/function';

const NavBar2 = (props) => {
	const { title, summarys } = props;

	const ExtraContent = () => {
		return <div
			style={{
				display: 'flex',
				width: 'max-content',
				justifyContent: 'flex-end',
			}}
		>
			<Statistic
				title="Tổng tồn"
				value={formatNumberNoD(summarys?.amount)}
				precision={3}
				valueStyle={{ marginRight: 34 }}
				prefix={<InboxOutlined style={{ color: '#1554F6' }} />}
				suffix="₫"
			/>
			<Statistic
				title="Đang chuyển"
				value={summarys?.credit}
				precision={3}
				valueStyle={{ textAlign: 'left !important' }}
				prefix={<SwapOutlined style={{ color: '#06C1D4' }} />}
				suffix="₫"
			/>

		</div>;
	};
	return (
		<>
			<Card>
				<PageHeader
					// breadcrumb={{ routes }}
					className="Quỹ tồn cửa hàng"
					// onBack={() => window.history.back()}
					title={title}
					extra={[
						<ExtraContent />,
					]}
					footer={null}
				/>
			</Card>
		</>
	);
};

export default NavBar2;
