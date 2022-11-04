import merge from 'lodash/merge';
import queryString from 'query-string';

import { notification } from 'antd';
import Router from 'next/router';

import CONSTANTS from 'src/constants/urls';

import AuthStorage from './auth-storage';

const mandatory = () => {
	return Promise.reject(new Error('Fetch API Missing parameter!'));
};

const { API_URL, API_URL_REAL_TIME } = CONSTANTS;

const fetchApi = async ({ url, options, payload = {}, dispatch = f => f, typeApi } = mandatory(), cb = f => f) => {
	try {
		const defaultOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		};

		const opts = merge(defaultOptions, options);

		// set token
		if (await AuthStorage.token) {
			opts.headers.Authorization = 'Bearer ' + AuthStorage.token;
		}
		let uri;
		if (!typeApi) uri = API_URL + url;
		 // else uri = API_URL_REAL_TIME + url;
		 else uri = API_URL + '/realtime' + url;
		if (payload && Object.keys(payload).length > 0) {
			if (opts && opts.method === 'GET') {
				uri = queryString.stringifyUrl({ url: uri, query: payload });
			} else {
				if (opts.headers['Content-Type'] === 'multipart/form-data') {
					delete opts.headers['Content-Type'];

					const formData = new FormData();
					Object.entries(payload).forEach(([key, val]) => {
						if (val) {
							if (key === 'assetFiles' || key === 'pdfFiles' || key === 'images' || key === 'newImages' || key === 'newPdfFiles' || key === 'newMediaFiles' || key === 'deleteImages' || key === 'deletePdfFiles' || key === 'deleteMediaFiles' || key === 'transactions' || key == 'objects') {
								val.forEach((file, index) => {
									formData.append(key, file);
								});
							} else if (key === 'kind_label_req') {
								val.forEach((file, index) => {
									formData.append('kind' + `[${index}]`, file);
								});
							} else {
								formData.append(key, val);
							}
						}
					});

					opts.body = formData;
				} else {
					opts.body = JSON.stringify(payload);
				}
			}
		}

		if (process.env.NODE_ENV === 'development') {
			console.log('------');
			console.log('Call API: url, options, payload', uri, opts, payload);
		}
		const response = await fetch(uri, opts);
		if (process.env.NODE_ENV === 'development') {
			console.log('------');
		}

		if (response.ok && (response.status === 204 || response.statusText === 'No Content')) {
			cb(null, {});
			return {};
		}

		const data = await response.json();
		if (response.status !== 200) {
			throw data;
		}

		cb(null, data || {});
		return data || {};
	} catch (err) {
		if (process.env.NODE_ENV === 'development') {
			console.log('Call API Error: ', err);
			// notification.error({
			// 	message: 'Lỗi!',
			// 	description: err.error?.message || err.message || err.toString(),
			// });
		}

		if (err.statusCode === 401 && (err.error?.message == 'Unauthenticated.' || err.message == 'Unauthenticated.' || err.toString() == 'Unauthenticated.')) {
			Modal.success({
				content: 'VUI LÒNG ĐĂNG NHẬP 	LẠI',
				onOk: Router.push('/login'),
			});
		}

		if (process.browser) {
			notification.error({
				message: 'Lỗi!',
				description: err.error?.message || err.message || err.toString(),
			});
		}

		if (err.statusCode === 403 || err.statusCode === 401) {
			// AuthStorage.destroy();
			// dispatch({ type: 'LOGOUT_SUCCESS' });
			if (process.browser) {
				Router.replace('/forbidden');
			}
		}

		cb(err);
		throw err;
	}
};

export default fetchApi;
