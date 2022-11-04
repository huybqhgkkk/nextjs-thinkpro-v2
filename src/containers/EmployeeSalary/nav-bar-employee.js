import React from 'react';
import {Breadcrumb, Button, Card, Col, Descriptions, PageHeader, Row, Statistic,DatePicker} from 'antd';
import {ArrowDownOutlined, ArrowLeftOutlined, DownloadOutlined, EditOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';
import _ from 'lodash'
const NavBarEmployeeCreate = ({object_debt, debt_size, accounting, debt}) => {
	const router = useRouter();
	const dateFormat = 'DD/MM/YYYY HH:MM';
	const renderContent = (column = 4) => (
		<Descriptions size="small" column={column}>
			<Descriptions.Item label="Thời gian hạch toán">
				<DatePicker showTime={{ format: 'HH:MM' }} defaultValue={moment()} format={dateFormat} />
			</Descriptions.Item>

			{accounting != 3341 && <Descriptions.Item label="Địa chỉ">{object_debt?.object_info?.address}</Descriptions.Item>}
			<Descriptions.Item label="Đối tượng nộp">{debt_size} đối tượng</Descriptions.Item>
		</Descriptions>
	);



	const routes = [
		{
			path: 'index',
			breadcrumbName: 'Phiếu thu chi',
		},
		{
			path: 'first',
			breadcrumbName: `${accounting == 3341 ? "Thanh toán lương" : `Trả nợ nhà cung cấp ${!_.isEmpty(debt) ? debt[0]?.name : ""}` }`,
		},
	];
	return (
		<>
			<Card>
				<PageHeader
					breadcrumb={{ routes }}
					className="site-page-header-responsive"
					onBack={() => window.history.back()}
					title={`${accounting == 3341 ? "Thanh toán lương" : `Trả nợ nhà cung cấp ${!_.isEmpty(debt) ? debt[0]?.name : ""}` }`}
					footer={null}
				>
					{renderContent()}
				</PageHeader>
			</Card>
		</>
	);
};

export default NavBarEmployeeCreate;
