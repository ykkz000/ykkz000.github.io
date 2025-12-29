<template>
  <header>
    <div class="wrapper">
      <el-icon class="logo" :size="48">
        <icon-logo />
      </el-icon>
    </div>
    <div class="wrapper navbar-container">
      <nav>
        <router-link to="/">主页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/admin">管理</router-link>
      </nav>
    </div>
    <div class="wrapper search-input-container">
      <el-input
          placeholder="Search..."
          prefix-icon="el-icon-search"
          v-model="searchText"
          @keyup.enter="handleSearch">
        <template #prefix>
          <el-icon>
            <search/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <div class="wrapper user-display-container">
      <user-simple-display />
    </div>
  </header>
  <main>
    <router-view :key="viewKey"/>
  </main>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Search} from '@element-plus/icons-vue';
import IconLogo from '@/components/icons/IconLogo.vue'
import router from "@/router";
import UserSimpleDisplay from "@/components/user/UserSimpleDisplay.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const searchText = ref('');
const viewKey = route.path + Math.random();

const handleSearch = () => {
  router.push({
    name: 'Search',
    query: {
      t: searchText.value,
    },
  });
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  color: var(--theme-text-color);
  background-color: var(--theme-background-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

header .wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.navbar-container a {
  color: var(--theme-text-color);
  font-weight: bold;
  text-decoration: none;
  padding: 0 10px;
  font-size: 1.2rem;
}

.search-input-container {
  margin-left: auto;
  width: 30%;
}

.user-display-container {
  margin-left: 10px;
  margin-right: 0;
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end !important;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 50px 0 0 0;
  width: 70vw;
}
</style>
