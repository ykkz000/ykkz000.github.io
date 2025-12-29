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
  <el-container class="full-page" direction="horizontal">
    <el-aside width="200px" class="admin-navbar">
      <el-menu mode="vertical" background-color="var(--theme-card-color)" text-color="var(--theme-background-color)"
               active-text-color="var(--theme-background-color)" class="admin-navbar-menu" router>
        <el-menu-item
            index="/admin"
            class="admin-navbar-item"
            v-bind:class="{'is-active': currentPath === '/admin'}">
          <h3>首页</h3>
        </el-menu-item>
        <el-menu-item
            index="/admin/blog"
            class="admin-navbar-item"
            v-bind:class="{ 'is-active': currentPath === '/admin/blog'}">
          <h3>博客管理</h3>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="admin-main">
      <router-view :key="viewKey"/>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const currentPath = computed(() => route.path);
const viewKey = route.path + Math.random();

</script>
<style scoped>
.full-page {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: 100vw;
}

.admin-navbar {
  width: 200px;
  height: 100%;
  background-color: var(--theme-card-color);
}

.admin-navbar-menu {
  width: 100%;
}

.admin-navbar-item {
  width: 100%;
}

.admin-navbar-item:hover {
  background-color: var(--theme-background-color);
  color: var(--theme-text-color);
}

.is-active {
  background-color: var(--theme-background-color);
  color: var(--theme-text-color);
}

.admin-main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 30px;
}
</style>

