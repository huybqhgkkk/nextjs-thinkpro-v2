/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Dropdown, Menu, Tabs, Typography, Row, Col, Divider, notification } from 'antd';
import _ from 'lodash';
import {
	BellOutlined, CheckOutlined, PlusOutlined, CloseOutlined, EditOutlined, FileOutlined, SwapOutlined,
} from '@ant-design/icons';
import { actionGetListNotify, actionMarkRead, actionMarkReadAll } from 'src/redux/actions/common';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classes from './style.module.less';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const Notifications = () => {
	const socket = useSelector(state => state.common.socket);
	const [listNotify, setListNotify] = useState([]);
	const dispatch = useDispatch();
	const [sizeNotify, setSizeNitify] = useState();
	// get list notify
	const router = useRouter();
	const getListNotify = async () => {
		const result = await dispatch(await actionGetListNotify({ type: 'fa' }, 'real_time'));
		if (result) {
			setListNotify(result?.data);
			setSizeNitify(result?.total_unmark_read);
		}
	};

	useEffect(() => {
		getListNotify();
	}, []);
	// Listen from server socket
	useEffect(() => {
		if (!_.isEmpty(socket)) {
			socket.on('fa_notification', (data) => {
				setListNotify(prev => [data, ...prev]);
				setSizeNitify(prev => prev + 1);
				notification.open({
					// message: `${data?.title}`,
					// duration: 0,
					description: (<>
						<Row
							style={{ padding: '0 16px 16px 8px', minHeight: '128px' }}
							className={classes.list_notify_item}
							// onClick={async () => {
							// 	const result = await dispatch(await action_markRead({ type: 'fa', id: items?.id }, 'real_time'));
							// 	if (result) {
							// 		router.push(`${items.url}`);
							// 	}
							// }}
						>
							{/* <Col span={3} style={{ marginRight: '24px' }}> */}
							{/*	<Avatar icon={<PlusOutlined />} style={{ background: 'rgba(19, 194, 194, 1)' }} /> */}
							{/* </Col> */}
							<Col span={24}>
								<Row>
									<Col span={24}>
										<Title level={5}>{data?.title}</Title>
									</Col>
									<Col span={24} style={{ marginTop: '4px' }}>

										<Text style={{ lineHeight: '22px' }}>{data?.body}</Text>

									</Col>

									<Col span={24} style={{ marginTop: '4px' }}>
										<Text type="secondary">{data?.created_at}</Text>
									</Col>
								</Row>
							</Col>
						</Row>
					</>),
					icon: data?.icon == 'draft' ? <Avatar icon={<FileOutlined />} style={{ background: 'rgba(140, 140, 140, 1)' }} />
						: data?.icon == 'plus' ? <Avatar icon={<PlusOutlined />} style={{ background: 'rgba(19, 194, 194, 1)' }} />
							: data?.icon == 'close' ? <Avatar icon={<CloseOutlined />} style={{ background: 'rgba(245, 34, 45, 1)' }} />
								: data?.icon == 'edit' ? <Avatar icon={<EditOutlined />} style={{ background: 'rgba(250, 140, 22, 1)' }} />
									: <Avatar icon={<SwapOutlined />} style={{ background: 'rgba(114, 46, 209, 1)' }} />,

				});
			//    $('#future').append(data.socket_id + ': ' + data.message + "<br/>");
			});

			socket.on('fa_mark_read', () => {
			});
		}
	}, [socket]);

	const menu = (
		<div style={{ position: 'relative' }}>
			<Menu>
				<Tabs defaultActiveKey="1" style={{ width: '100%' }} tabBarStyle={{ padding: '4px 24px 0 24px', margin: 0 }}>
					<TabPane
						tab={
							<Row align="middle">

								<Text>Tất cả</Text>

								<Badge count={sizeNotify} style={{ background: 'rgba(234, 237, 249, 1)', color: 'blue', marginLeft: '4px' }} />

							</Row>

						}
						key="1"
						style={{ marginRight: '32px' }}
					>

						{ listNotify.map(items => {
							return (
								<>
									<Row
										style={{ padding: '16px', minHeight: '128px' }}
										className={items?.seen ? classes.list_notify_item_seened : classes.list_notify_item}
										onClick={async () => {
											if (!items?.seen) {
												const result = await dispatch(await actionMarkRead({ type: 'fa', id: items?.id }, 'real_time'));
												if (result) {
													const newList = [...listNotify];
													setListNotify(newList.map(noti => {
														if (noti?.id === items?.id) noti.seen = true;
														return noti;
													}));
													setSizeNitify(prev => prev - 1);
													router.push(`/${items.url}`);
												}
											}
										}}
									>
										<Col span={3} style={{ marginRight: '24px' }}>
											{items?.icon == 'draft' ? <Avatar icon={<FileOutlined />} style={{ background: 'rgba(140, 140, 140, 1)' }} />
												: items?.icon == 'plus' ? <Avatar icon={<PlusOutlined />} style={{ background: 'rgba(19, 194, 194, 1)' }} />
													: items?.icon == 'close' ? <Avatar icon={<CloseOutlined />} style={{ background: 'rgba(245, 34, 45, 1)' }} />
														: items?.icon == 'edit' ? <Avatar icon={<EditOutlined />} style={{ background: 'rgba(250, 140, 22, 1)' }} />
															: <Avatar icon={<SwapOutlined />} style={{ background: 'rgba(114, 46, 209, 1)' }} />}

										</Col>
										<Col span={18}>
											<Row>
												<Col span={24}>
													<Title level={5}>{items?.title}</Title>
												</Col>
												<Col span={24} style={{ marginTop: '4px' }}>

													<Text style={{ lineHeight: '22px' }}>{items?.body}</Text>

												</Col>

												<Col span={24} style={{ marginTop: '4px' }}>
													<Text type="secondary">{items?.created_at}</Text>
												</Col>
											</Row>
										</Col>
									</Row>
									<Divider style={{ margin: 0 }} />
								</>
							);
						})}

					</TabPane>
				</Tabs>
			</Menu>
			<Row
				className={classes.list_notify_item}
				style={{ position: 'sticky', bottom: 0, left: 0, right: 0, background: 'white', height: '48px', boxShadow: '0px -2px 20px 0px rgba(0, 0, 0, 0.1)' }}
				align="middle"
				onClick={async () => {
					const result = await dispatch(await actionMarkReadAll({ type: 'fa' }, 'real_time'));
					if (result) {
						// setSizeNitify(0);
						getListNotify();
					}
				}}
			>
				<Col span={24} style={{ textAlign: 'center', cursor: 'pointer' }}>
					<CheckOutlined style={{ marginRight: '8px' }} />
					<Text>Đánh dấu đã đọc tất cả</Text>
				</Col>
			</Row>
		</div>
	);

	return (

		<Dropdown
			overlay={menu}
			trigger="click"
			placement="bottomRight"
			overlayStyle={{ width: 334, height: '550px', overflowY: 'scroll', boxShadow: ' 0px 9px 28px 8px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
		>
			<Badge count={sizeNotify} offset={[-1, 7]}>
				<Avatar icon={<BellOutlined />} size={{ xl: 32 }} style={{ background: 'transparent', color: 'black' }} />
			</Badge>
		</Dropdown>

	);
};

export default Notifications;
