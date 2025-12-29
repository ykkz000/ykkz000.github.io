/*
 * ykkz000_s blog
 * Copyright (C) 2025  ykkz000
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {ElMessage} from "element-plus";

export interface Result<T> {
    code: number;
    message: string;
    timestamp: number;
    data: T;
}

export type ApiResultPromise<T> = Promise<AxiosResponse<Result<T>>>;

const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error);
        if (error.response) {
            ElMessage.error(error.response.data.message);
        } else {
            ElMessage.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
