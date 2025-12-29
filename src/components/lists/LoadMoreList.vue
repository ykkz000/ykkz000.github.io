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
  <div v-if="pageContent.totalElements === 0" class="card">{{noDataMsg}}</div>
  <component v-for="item in pageContent.content" :is="child" :item="item"/>
  <div v-if="pageContent.totalElements > pageContent.content.length" class="load-more-container">
    <el-button @click="$emit('loadMore')" color="var(--theme-background-color)" size="large" round>
      <el-icon color="white">
        <ArrowDown/>
      </el-icon>
      <span class="load-more-text">加载更多</span>
    </el-button>
  </div>
</template>
<script setup lang="ts">
import {ArrowDown} from "@element-plus/icons-vue";

defineProps({
  noDataMsg: {
    type: String,
    required: true,
  },
  pageContent: {
    type: Object as () => PageContent<any>,
    required: true,
  },
  child: {
    type: Object,
    required: true,
  }
});

defineEmits(["loadMore"]);
</script>
<style scoped>
.load-more-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.load-more-text {
  color: var(--theme-text-color);
  font-size: 16px;
  font-weight: bold;
}
</style>
