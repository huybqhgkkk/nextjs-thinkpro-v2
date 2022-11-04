import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import AuthStorage from 'src/utils/auth-storage';
import Router from 'next/router';

import { Form, Input, Button, Tooltip, Row, Col, Checkbox, Image, Space } from 'antd';

import { actionLogin } from 'src/redux/actions/auth';

const Login = (props) => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		if (AuthStorage.loggedIn) {
			Router.push('/request-payment');
		}
	}, []);

	const onFinish = async (values) => {
		try {
			// setLoading(true);
			await dispatch(await actionLogin({
				...values,
			}));
			Router.push('/request-payment');
		} finally {
			// setLoading(false);
		}
	};

	return (
		<>

			<Row
				style={{
					padding: '110px 0 145px 0',
					height: '100%',
				}}
			>
				<Col span={6} style={{ margin: 'auto' }}>
					<Row wrap>

						<Col span={24} style={{ marginBottom: '60px' }}>
							<Image
								preview={false}
								src="./images/pro2.svg"
								alt="Picture of the author"
								width="100%"
							/>
						</Col>
						<Col span={24} style={{ fontWeight: '550', marginBottom: 22, lineHeight: '24px', fontSize: 16 }}>Đăng nhập</Col>
						<Col span={24}>
							<Form
								name="normal_login"
								className="login-form"
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<Form.Item
									name="phone"
									rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
								>
									<Input
										className="input__login--fix"
										size="large"
										placeholder="Nhập số điện thoại"
										prefix={<PhoneOutlined style={{ color: '#1890ff' }} />}
									/>
								</Form.Item>

								<Form.Item
									name="password"
									rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
								>
									<Input.Password
										className="input__login--fix"
										size="large"
										placeholder="Nhập mật khẩu"
										prefix={<LockOutlined style={{ color: '#1890ff' }} />}
									/>
								</Form.Item>

								{/* <Form.Item name="remember" valuePropName="checked" style={{marginBottom:26}}> */}
								{/*	<Checkbox>Nhớ tài khoản</Checkbox> */}
								{/*	<Tooltip placement="rightBottom" title="Liên hệ bộ phận Hành chính Nhân sự để cấp lại mật khẩu."> */}
								{/*		<a style={{ float: 'right' }}>Quên mật khẩu?</a> */}
								{/*	</Tooltip> */}

								{/* </Form.Item> */}

								<Form.Item wrapperCol={{ span: 24 }}>
									<Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
										Đăng nhập
									</Button>
								</Form.Item>

							</Form>
						</Col>

					</Row>
				</Col>
			</Row>

		</>
	);
};

// import { LoginForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
// import { LockOutlined, PhoneOutlined } from '@ant-design/icons';

// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import AuthStorage from 'src/utils/auth-storage';
// import Router from 'next/router';

// import { Form, Input, Button, Tooltip, Row, Col, Checkbox, Image } from 'antd';

// import { actionLogin } from 'src/redux/actions/auth';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

// const iconStyles = {
// 	marginLeft: '16px',
// 	color: 'rgba(0, 0, 0, 0.2)',
// 	fontSize: '24px',
// 	verticalAlign: 'middle',
// 	cursor: 'pointer',
// };
// const Login = (props) => {
// 	return (
// 		<Row>
// 			<Col span={8} offset={8}>
// 				<LoginForm
// 					logo="../images/pro2.svg"
// 					labelAlign
// 				>

// 					<ProFormText
// 						name="phone"
// 						fieldProps={{
// 							size: 'middle',
// 							prefix: <PhoneOutlined className="prefixIcon" style={{ color: 'blue' }} />,
// 						}}
// 						placeholder="nhập số điện thoại"
// 						rules={[
// 							{
// 								required: true,
// 								message: 'please type this input!',
// 							},
// 						]}
// 					/>
// 					<ProFormText.Password
// 						name="password"
// 						fieldProps={{
// 							size: 'middle',
// 							prefix: <LockOutlined className="prefixIcon" style={{ color: 'blue' }} />,
// 						}}
// 						placeholder="nhập mật khẩu"
// 						rules={[
// 							{
// 								required: true,
// 								message: 'please type this input!',
// 							},
// 						]}
// 					/>

// 					<div style={{
// 						marginBottom: 24,
// 					}}
// 					>
// 						<ProFormCheckbox noStyle name="autoLogin">
// 							Nhớ tài khoản
// 						</ProFormCheckbox>
// 						<a style={{
// 							float: 'right',
// 						}}
// 						>
// 							<Tooltip title="Liên hệ bộ phận Hành chính Nhân sự để cấp lại mật khẩu." placement="right">
// 								Quên mật khẩu?
// 							</Tooltip>

// 						</a>
// 					</div>
// 				</LoginForm>
// 			</Col>

// 		</Row>);
// };

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

export default Login;
