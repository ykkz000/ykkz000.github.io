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
  <div class="card pagination-container">
    <el-pagination
        :page-sizes="[10, 20, 30, 40, 50]"
        :total="pageContent.totalElements"
        :page-count="pageContent.totalPages"
        :page-size="pageContent.pageSize"
        :current-page="pageContent.pageNumber"
        @current-change="pageNumberChange"
        @size-change="pageSizeChange"
        layout="total, sizes, prev, pager, next, jumper"/>
  </div>
</template>
<script setup lang="ts">
const prop = defineProps({
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

const emit = defineEmits(["changePage"]);

const pageNumberChange = (pageNumber: number) => {
  emit("changePage", pageNumber, prop.pageContent.pageSize);
}
const pageSizeChange = (pageSize: number) => {
  emit("changePage", prop.pageContent.pageNumber, pageSize);
}
</script>
<style scoped>
.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
</style>