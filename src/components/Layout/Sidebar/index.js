import React from 'react';
// import PropTypes from 'prop-types';

// import { useDispatch } from 'react-redux';
// import useAsyncRetry from 'react-use/lib/useAsyncRetry';

// import AuthStorage from 'src/utils/auth-storage';

import { useRouter } from 'next/router';

import { Menu } from 'antd';
import {
	DashboardOutlined,
	UsergroupAddOutlined,
	AntDesignOutlined,
} from '@ant-design/icons';

const propTypes = {
	// children: PropTypes.node,
};

const defaultProps = {};

const Sidebar = () => {
	// const { } = props;

	const router = useRouter();

	// const dispatch = useDispatch();

	// const { value: countUnread = {} } = useAsyncRetry(async () => {
	// 	const response = await dispatch(await count({
	// 		status: 'new',
	// 	}));

	// 	return response;
	// }, []);

	// eslint-disable-next-line no-unused-vars
	const [, root, sub] = router.pathname?.split('/');

	return (
		<Menu
			defaultSelectedKeys={['/']}
			selectedKeys={['/' + (sub && sub !== '[id]' ? sub : root)]}
			defaultOpenKeys={['/' + root]}
			mode="inline"
			theme="dark"
			style={{
				padding: '15px 0',
			}}
		>
			<Menu.Item key="/" onClick={() => router.push('/')} icon={<DashboardOutlined />}>
				<span>Dashboard</span>
			</Menu.Item>
			<Menu.Item key="/transaction" onClick={() => router.push('/transaction')} icon={<AntDesignOutlined />}>
				<span>Xử lý thu chi</span>
			</Menu.Item>
			<Menu.Item key="/listtransaction" onClick={() => router.push('/listtransaction')} icon={<AntDesignOutlined />}>
				<span>Phiếu thu chi</span>
			</Menu.Item>
			<Menu.Item key="/dept" onClick={() => router.push('/dept')} icon={<AntDesignOutlined />}>
				<span>Công nợ</span>
			</Menu.Item>
			<Menu.Item key="/users" onClick={() => router.push('/users')} icon={<UsergroupAddOutlined />}>
				<span>Users</span>
			</Menu.Item>
		</Menu>
	);
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
