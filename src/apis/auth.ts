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

import api, {ApiResultPromise} from '@/apis/base'

export const login = async (login: Login): ApiResultPromise<void> => {
    return await api.post(`/auth/login`, login);
}

export const logout = async (): ApiResultPromise<void> => {
    return await api.post(`/auth/logout`);
}

export const getMe = async (): ApiResultPromise<User> => {
    return await api.get(`/auth/me`);
}
