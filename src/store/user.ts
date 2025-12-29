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

import {defineStore} from "pinia";
import {ref} from "vue";

export const useGlobalStore = defineStore('global', () => {
    const currentUser = ref<User>({id: -1, username: "", role: 1});
    function setCurrentUser(user: User) {
        currentUser.value = user;
    }
    return {currentUser, setCurrentUser};
});