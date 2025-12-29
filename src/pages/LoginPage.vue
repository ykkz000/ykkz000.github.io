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
  <div class="card">
    <h1>登录</h1>
  </div>
  <div class="card">
    <el-form>
      <el-form-item label="用户名" label-width="100px">
        <el-input v-model="username" placeholder="Username" class="login-input"/>
      </el-form-item>
      <el-form-item label="密码" label-width="100px">
        <el-input v-model="password" placeholder="Password" class="login-input" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="var(--theme-background-color)" @click="processLogin"><span class="button-text">登录</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="card">
    <h2>注</h2>
    <p>目前不开放注册</p>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {login} from "@/apis";
import router from "@/router";
import {useRoute} from "vue-router";

const username = ref<string>("");
const password = ref<string>("");

const route = useRoute();

const processLogin = () => {
  login({username: username.value, password: password.value}).then(res => {
    if ("redirect" in route.query) {
      router.push({path: route.query.redirect as string});
    } else {
      router.push({path: '/'});
    }
  });
}
</script>
<style scoped>
.login-input {
  width: 200px;
}
</style>
