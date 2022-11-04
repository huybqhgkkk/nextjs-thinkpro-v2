import React from 'react';
import { Card, PageHeader, Statistic } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { formatNumberNoD } from 'src/constants/function';

const NavBar3 = (props) => {
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
				title="Tổng tiền"
				value={formatNumberNoD(summarys?.amount)}
				precision={0}
				valueStyle={{ textAlign: 'left' }}
				// prefix={<ArrowDownOutlined style={{ color: '#06C1D4' }} />}
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

			{/*	<Row> */}
			{/*	<Card  style={{ width: '100%'}}> */}
			{/*		<Row> */}
			{/*			<Col span={12}> */}
			{/*				<p className="title-main-layout">Phiếu thu chi</p> */}
			{/*			</Col> */}
			{/*			<Col span={12} style={{ paddingRight:24, paddingTop:14}}> */}
			{/*				<div className="flex-end-content"> */}
			{/*					<div></div> */}
			{/*					<Statistic */}
			{/*						title="Tổng tiền" */}
			{/*						value={112893800} */}
			{/*						precision={3} */}
			{/*						valueStyle={{ textAlign: "left" }} */}
			{/*						prefix={<ArrowDownOutlined style={{color: "#06C1D4"}}/>} */}
			{/*						suffix="d" */}
			{/*					/> */}
			{/*				</div> */}

			{/*			</Col> */}
			{/*		</Row> */}
			{/*	</Card> */}
			{/* </Row> */}
		</>
	);
};

export default NavBar3;
