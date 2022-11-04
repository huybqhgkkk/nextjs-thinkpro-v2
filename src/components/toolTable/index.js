/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Tooltip, Popconfirm } from 'antd';
import { ReloadOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';

function ToolTable({ onReload, onDelete, onAdd, hideDelete, hideAdd }) {
	return (
		<Row align="middle">
			<Col span={14} style={{ marginLeft: 'auto' }}>
				<Row>
					<Col span={8} style={{ cursor: 'pointer' }}>

						<Popconfirm
							placement="left"
							title="Bạn có chắc chắn muốn xóa?"
							okText="Có"
							cancelText="Không"
							onConfirm={onDelete}
						>
							<DeleteOutlined hidden={hideDelete} />
						</Popconfirm>
					</Col>
					<Col span={8} onClick={onAdd} style={{ cursor: 'pointer' }}>
						<FolderAddOutlined hidden={hideAdd} />
					</Col>
					<Col span={8} onClick={onReload} style={{ cursor: 'pointer' }}>
						<Tooltip placement="top" title="Làm mới">
							<ReloadOutlined />
						</Tooltip>

					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default ToolTable;
