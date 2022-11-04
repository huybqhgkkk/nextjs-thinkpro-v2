/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable eqeqeq */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { Button, Input, Row, Col, Card, Avatar, Typography, Empty, Divider } from 'antd';
import { actionAddComment, actionAddCommentAccounting } from 'src/redux/actions/common';
import authStorage from 'src/utils/auth-storage';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const tabList = [
	{
	  key: 'tab1',
	  tab: 'Bình luận',
	},
	{
	  key: 'tab2',
	  tab: 'Lịch sử hoạt động',
	},
];
const { Title, Text } = Typography;
// kind = 1 thi comment man tao phieu ke toan, khonog co thi la man con lai
function CommentComponent({ histories, comments, onSetComments, kind, id }) {
	const [activeTabKey1, setActiveTabKey1] = useState('tab1');
	const commentRef = useRef();
	const onTab1Change = key => {
		setActiveTabKey1(key);
	  };
	const dispatch = useDispatch();
	const { TextArea } = Input;
	const contentList = {
		tab1:
	<>
		<Row style={{ marginTop: '12px' }}>
			<Col span={24} style={{ maxHeight: 440, overflowY: 'scroll' }}>
				<Row>
					{
						_.isEmpty(comments) ?
							<Col span={24} style={{ padding: '12px 24px' }}>
								<Empty
									image={Empty.PRESENTED_IMAGE_SIMPLE}
									description={
										<span>Không có bình luận nào</span>
									}
								/>
							</Col>
							: ''
					}
					{!_.isEmpty(comments) && comments.map(value => {
						return (
							<>
								<Col span={24} style={{ padding: '12px 24px' }}>
									<Row justify="space-between">
										<Col span={2}>
											<Avatar src="https://joeschmoe.io/api/v1/random" />
										</Col>
										<Col span={20}>
											<Row>
												<Col span={24}>
													<span style={{ fontSize: '14px', lineHeight: '22px', fontWeight: '550' }}>{value?.user?.name}</span>
												</Col>
												<Col span={24}>
													<span style={{ fontSize: '14px', lineHeight: '22px' }}>{value?.content}</span>
												</Col>
												<Col span={24}>
													<Text type="secondary" style={{ fontSize: '14px', lineHeight: '22px' }}>{value?.created_at}</Text>
												</Col>
											</Row>
										</Col>
									</Row>
								</Col>
								<Divider style={{ margin: 0 }} />
							</>

						);
					}) }

				</Row>
			</Col>
		</Row>

	</>,
		tab2:

	<Row style={{ maxHeight: 440, overflowY: 'scroll', marginTop: '12px' }}>
		{
			_.isEmpty(histories) ?
				<Col span={24} style={{ padding: '12px 24px' }}>
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={
							<span>Không có lịch sử nào</span>
						}
					/>
				</Col>
				: ''
		}
		{!_.isEmpty(histories) && histories.map(value => {
			return (
				<>
					<Col span={24} style={{ padding: '12px 24px' }}>
						<Row justify="space-around">
							<Col span={2}>
								<Avatar src="https://joeschmoe.io/api/v1/random" />
							</Col>
							<Col span={20}>
								<Row>
									<Col span={24}>
										<Text style={{ fontSize: '14px', lineHeight: '22px', fontWeight: '550' }}>{value?.title}</Text>
									</Col>
									{/* <Col span={24} style={{ padding: '12px', background: '#F5F5F5' }}> */}
									{/*	<Text type="secondary" style={{ fontSize: '14px', lineHeight: '22px' }}>Lý do</Text> */}
									{/*	<p>{value?.content}</p> */}
									{/* </Col> */}
									{
										value?.title.search('tạo') != -1 ? '' : <Col span={24} style={{ padding: '12px', background: '#F5F5F5' }}>
											<Text type="secondary" style={{ fontSize: '14px', lineHeight: '22px' }}>Lý do</Text>
											<p>{value?.content}</p>
										</Col>
									}
									<Col span={24}>
										<Text type="secondary" style={{ fontSize: '14px', lineHeight: '22px' }}>{value?.created_at}</Text>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
					<Divider style={{ margin: 0 }} />
				</>

			);
		})}
	</Row>,
	};
	return (
		<Card
			title={<Title level={5}>Thông tin thêm</Title>}
			bordered={false}
			style={{ width: '100%', position: 'relative' }}
			tabList={tabList}
			headStyle={{ padding: '0 24px' }}
			activeTabKey={activeTabKey1}
			onTabChange={key => {
				onTab1Change(key);
			}}
			className="fix-card"
		>
			{contentList[activeTabKey1]}
			{activeTabKey1 == 'tab1' && 	<Col span={24} style={{ height: '138px', position: 'static', bottom: 0, right: 0, left: '0', background: 'white', boxShadow: '0px -2px 20px 0px rgba(0, 0, 0, 0.1)' }}>
				<Row style={{ width: '100%', padding: '24px 24px 18px' }} className="comment_component">
					<Col span={24}>
						<TextArea
							rows={4}
							name="content"
							style={{ height: '56px' }}
							placeholder="Nhập nội dung bình luận"
							ref={commentRef}
							onChange={async (e) => {
								if (e.key === 'Enter') {
									const urlCommentFormData = {
										content: commentRef.current.resizableTextArea.textArea.value,
										id,
									};
									let result;
									if (kind == 1) {
										result = await dispatch(await actionAddCommentAccounting(urlCommentFormData));
									} else {
										result = await dispatch(await actionAddComment(urlCommentFormData));
									}

									if (result) {
										const newComment = {
											'content': result?.data?.content,
											'user': {
												'id': authStorage?.userId?.id,
												'name': authStorage.userId?.name,
											},
											'created_at': result?.data?.created_at,
										};
										onSetComments(prev => [...prev, newComment]);
										commentRef.current.resizableTextArea.textArea.value = '';
									}
								}
							}}
						/>
					</Col>
					<Col span={24} style={{ marginTop: '8px' }}>
						<Button
							style={{ width: '100%', background: 'rgba(21, 84, 246, 1)', color: 'white' }}
							onClick={async () => {
								const urlCommentFormData = {
									content: commentRef.current.resizableTextArea.textArea.value,
									id,
								};
								let result;
								if (kind == 1) {
									result = await dispatch(await actionAddCommentAccounting(urlCommentFormData));
								} else {
									result = await dispatch(await actionAddComment(urlCommentFormData));
								}

								if (result) {
									const newComment = {
										'content': result?.data?.content,
										'user': {
											'id': authStorage?.userId?.id,
											'name': authStorage.userId?.name,
										},
										'created_at': result?.data?.created_at,
									};
									onSetComments(prev => [...prev, newComment]);
									commentRef.current.resizableTextArea.textArea.value = '';
								}
							}}
						>Gửi bình luận
						</Button>
					</Col>
				</Row>
			</Col>}
		</Card>
	);
}

export default CommentComponent;
