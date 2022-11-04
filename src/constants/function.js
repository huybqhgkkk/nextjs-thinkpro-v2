import { Modal } from 'antd';
import moment from 'moment';

export const MapMoneyToNumber = (money) => {
	return money.replace(/\./g, '').split(' ')[0];
};

export const showmessageSuccess = (mess, cb) => {
	return (
		Modal.success({
			content: mess,
			onOk: cb,
		})
	);
};

export const formatNumber = (value) => {
	value += '';
	const list = value.split('.');
	const prefix = list[0].charAt(0) === '-' ? '-' : '';
	let num = prefix ? list[0].slice(1) : list[0];
	let result = '';
	while (num.length > 3) {
	  result = `.${num.slice(-3)}${result}`;
	  num = num.slice(0, num.length - 3);
	}
	if (num) {
	  result = num + result;
	}
	return `${prefix}${result}${list[1] ? `.${list[1]}` : ''} ₫`;
};

export const formatNumberNoD = (value) => {
	value += '';
	const list = value.split('.');
	const prefix = list[0].charAt(0) === '-' ? '-' : '';
	let num = prefix ? list[0].slice(1) : list[0];
	let result = '';
	while (num.length > 3) {
	  result = `.${num.slice(-3)}${result}`;
	  num = num.slice(0, num.length - 3);
	}
	if (num) {
	  result = num + result;
	}
	return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export const TotalSumAlert = (data, type) => {
	return data.reduce((total, items) => {
		return total += (items[type] ? Math.floor(items[type]) : 0);
	}, 0);
};

export const sortTime = (arr) => {
	return arr.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	},
	);
};
