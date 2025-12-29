<!--
  - ykkz000_s blog
  - Copyright (C) 2025  ykkz000
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <div class="user-simple-display">
    <div v-if="currentUser.id === -1">
      <router-link :to="{path: '/login', query: {redirect: router.currentRoute.value.fullPath}}" class="login-link">请登录</router-link>
    </div>
    <div v-else>
      <el-dropdown trigger="hover" placement="bottom" class="user-dropdown">
        <span class="user-dropdown-link">欢迎，{{ currentUser.username }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link type="primary" @click="processLogout">退出登录</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useGlobalStore} from "@/store";
import {logout} from "@/apis";
import router from "@/router";
import {storeToRefs} from "pinia";

const globalStore = useGlobalStore();
const currentUser = storeToRefs(globalStore).currentUser;

const processLogout = () => {
  logout().then(() => {
    router.go(0);
  });
};
</script>
<style scoped>
.user-simple-display {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  margin-right: 20px;
}

.login-link {
  color: white;
}

.user-dropdown {
  align-items: center;
}

.user-dropdown-link {
  outline: none;
  color: white;
}
</style>
