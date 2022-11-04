import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown, Modal, Row, Col, Tooltip, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import Router from 'next/router';
import Link from 'next/link';

import { BiKey } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';

import {
	ExclamationCircleOutlined,
} from '@ant-design/icons';

import Avatar from 'src/components/Avatar';

import AuthStorage from 'src/utils/auth-storage';
import authStorage from 'src/utils/auth-storage';
import classes from './style.module.less';

const propTypes = {
	style: PropTypes.object,
};

const defaultProps = {
	style: {},
};
const { Text } = Typography;
const AvatarDropDown = (props) => {
	const { style } = props;
	const user = authStorage.userId;
	const { paymentDetail: { paid } = {} } = user || {};

	const dispatch = useDispatch();

	const handleLogout = React.useCallback(async () => {
		Modal.confirm({
			title: 'Bạn có chắc muốn thoát?',
			icon: <ExclamationCircleOutlined />,
			// content: 'Are you sure?',
			onOk: async () => {
				// await dispatch(await actionLogout(() => {
				// 	Router.push('/login');
				// }));
				await AuthStorage.destroy();
				Router.push('/login');
			},
			okText: <>Thoát</>,
			cancelText: <>Hủy</>,
			onCancel() {
				console.log('Cancel');
			},
		});
	}, [dispatch]);
	const menu = (
		<Menu className={classes.menuDropdown}>
			<div className={classes.name}>
				<Avatar
					size={50}
					src={user?.avatar ? user.avatar : 'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-3.jpg'}
					fullName={user?.name}
					vip={paid}
				/>
				<div className={classes.fullName}>
					<strong>{user?.name}</strong>
					<div className="text-small">{user?.email}</div>
				</div>
			</div>
			<Menu.Divider />
			{/* <Menu.Item>
				<Link href="/profile">
					<a className={classes.item}>
						<FiUser />
						<span>Profile</span>
					</a>
				</Link>
			</Menu.Item> */}
			<Menu.Item key="change">
				<Link href="/change-password">
					<a className={classes.item}>
						<BiKey />
						<Text>Thay đổi mật khẩu</Text>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="logout">
				<a className={classes.item} onClick={handleLogout}>
					<AiOutlineLogout />
					<Text>Đăng xuất</Text>
				</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown style={style} overlay={menu} trigger={['click']}>
			<Row align="middle">
				<Col span={6}>
					<Avatar
						size={{ xl: 24 }}
						src={user?.avatar ? user.avatar : 'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-3.jpg'}
						fullName={user?.name}
						style={{
							cursor: 'pointer',
						}}
						vip={paid}
					/>
				</Col>

				<Col
					span={18}
					style={{
					// marginLeft: '8px',
						lineHeight: '22px',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						overflow: 'hidden' }}
				><Tooltip title={user?.name}>{user?.name}</Tooltip>
				</Col>
			</Row>

		</Dropdown>
	);
};

AvatarDropDown.propTypes = propTypes;
AvatarDropDown.defaultProps = defaultProps;

export default AvatarDropDown;
