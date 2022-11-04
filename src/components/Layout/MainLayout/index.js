import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Layout, BackTop, Menu, Row, Col, Image } from 'antd';

import Header from 'src/components/Layout/Header';
import AvatarDropDown from 'src/components/AvatarDropDown';
import Notifications from 'src/components/Notifications';
import CookieAlert from 'src/components/CookieAlert';

const { Content, Footer } = Layout;

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};
const { SubMenu } = Menu;
const routers = {
	'yeucauthuchi': 1,
	'/': 1,
	'phieuthuchi': 3,
	'accounting-bill': 4,
	'payment-card-reseen': 3,
	'fix-accounting-bill': 4,
	'create-accounting': 4,
	'phieuketoan': 4,
};
const MainLayout = (props) => {
	const { children } = props;
	const router = useRouter();
	const cp = router.pathname == '/_error' ? 1 : routers[router.pathname.split('/')[1]] || 2;
	const [current, setCurrent] = useState(cp);
	const [collapsed, setCollapsed] = useState(true);
	const [mobiShow, setMobiShow] = useState(false);
	const [broken, setBroken] = useState(false);
	useEffect(() => {
		const handleRouteChange = () => {
			setMobiShow(false);
		};
		Router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			Router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);
	useEffect(() => {
		if (router.pathname == '/_error') {
			router.push('/yeucauthuchi');
		}
	}, []);
	const handleClick = (e) => {
		setCurrent(e.key);
	};
	return (
		<>
			<Layout>

				<Header>
					<Row justify="space-between" align="middle" style={{ height: '100%' }}>
						<Col
							span={2}
							style={{ padding: '10px 0 10px 16px', height: '100%' }}
							onClick={() => {
								handleClick({ key: 1 });
							}}
						>
							<Link href="/yeucauthuchi"><Image src="/images/pro2.svg" preview={false} style={{ cursor: 'pointer', maxWidth: 144 }} /></Link>

						</Col>

						<Col span={19} style={{ height: '100%', paddingTop: '10px' }}>
							<Menu onClick={handleClick} selectedKeys={`${current}`} mode="horizontal" style={{ height: '100%' }}>
								<Menu.Item key="1">
									<Link href="/yeucauthuchi">Yêu cầu thu chi</Link>
								</Menu.Item>
								<SubMenu key="2" title="Công nợ">
									<Menu.Item key="setting:1">
										<Link href="/congno/luongnhanvien">Lương nhân viên</Link>
									</Menu.Item>
									<Menu.Item key="setting:2">
										<Link href="/congno/nhacungcap">Công nợ nhà cung cấp</Link>
									</Menu.Item>
									<Menu.Item key="setting:3">
										<Link href="/congno/khachhang">Công nợ khách hàng</Link>
									</Menu.Item>
									<Menu.Item key="setting:4">
										<Link href="/congno/thuho">Công nợ thu hộ</Link>
									</Menu.Item>
									<Menu.Item key="setting:5">
										<Link href="/congno/quytonchinhanh">Quỹ tồn chi nhánh</Link>
									</Menu.Item>

								</SubMenu>

								<Menu.Item key="3">
									<Link href="/phieuthuchi">Phiếu thu chi</Link>
								</Menu.Item>

								<Menu.Item key="4">
									<Link href="/phieuketoan">Phiếu kế toán</Link>
								</Menu.Item>
							</Menu>
						</Col>

						<Col span={3} style={{ height: '100%' }}>
							<Row align="middle" justify="space-between" style={{ height: '100%' }}>
								<Col span={3} style={{ cursor: 'pointer' }}>
									<Notifications />
								</Col>

								<Col span={17}>
									<AvatarDropDown />
								</Col>
							</Row>
						</Col>

					</Row>
				</Header>

				{/* {mobiShow && broken && <div className={classes.overlay} onClick={() => setMobiShow(false)} />} */}
				<Content>

					{children}
				</Content>

				<Footer style={{ display: 'none' }} />
			</Layout>
			<BackTop />
			<CookieAlert />
		</>
	);
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
