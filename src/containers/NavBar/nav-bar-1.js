/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, PageHeader, Statistic } from 'antd';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { formatNumberNoD } from 'src/constants/function';

const NavBar1 = (props) => {
	const { summarys, debt, title, check } = props;

	const ExtraContent = () => {
		return <div
			style={{
				display: 'flex',
				width: 'max-content',
				justifyContent: 'flex-end',
			}}
		>
			<Statistic
				title={check ? 'Yêu cầu thu' : 'Dư nợ'}
				value={summarys ? formatNumberNoD(summarys[0]?.amount) : formatNumberNoD(debt?.debt || 0)}
				valueStyle={{ textAlign: 'left' }}
				prefix={<ArrowDownOutlined style={{ color: '#1554F6' }} />}
				suffix="₫"
			/>
			<Statistic
				style={{ paddingLeft: 24 }}
				title={check ? 'Yêu cầu chi' : 'Dư có'}
				value={summarys ? formatNumberNoD(summarys[1]?.amount) : formatNumberNoD(debt?.credit || 0)}
				valueStyle={{ textAlign: 'left' }}
				prefix={<ArrowUpOutlined style={{ color: '#06C1D4' }} />}
				suffix="₫"
			/>

		</div>;
	};

	return (
		<>
			<Card>
				<PageHeader
					// breadcrumb={{ routes }}
					className="site-page-header-responsive"
					// onBack={() => window.history.back()}
					title={title}
					extra={[
						<ExtraContent />,
					]}
					footer={null}
				/>
			</Card>

			{/* <Row> */}
			{/*	<Card style={{ width: '100%' }}> */}
			{/*		<Row> */}
			{/*			<Col span={12}> */}
			{/*				<p className="title-main-layout">{props.title}</p> */}
			{/*			</Col> */}
			{/*			<Col span={12} style={{ paddingRight: 24, paddingTop: 14 }}> */}
			{/*				<div className="flex-end-content"> */}
			{/*					<Statistic */}
			{/*						title={<span style={{ fontSize: '14px' }}>Yêu cầu thu</span>} */}
			{/*						value={summarys ? summarys[0]?.amount : debt?.amount} */}
			{/*						precision={0} */}
			{/*						valueStyle={{ marginRight: 34 }} */}
			{/*						prefix={<ArrowUpOutlined style={{ color: '#1554F6' }} />} */}
			{/*						suffix="đ" */}
			{/*					/> */}

			{/* <Statistic */}
			{/*	title={<span style={{ fontSize: '14px' }}>Yêu cầu chi</span>} */}
			{/*	value={summarys ? summarys[1]?.amount : debt?.debt } */}
			{/*	precision={0} */}
			{/*	// valueStyle={{ color: '#1554F6' }} */}
			{/*	prefix={<ArrowDownOutlined style={{ color: '#06C1D4' }} />} */}
			{/*	suffix="đ" */}
			{/* /> */}
			{/*				</div> */}
			{/*			</Col> */}
			{/*		</Row> */}
			{/*	</Card> */}
			{/* </Row> */}

		</>
	);
};

export default NavBar1;
