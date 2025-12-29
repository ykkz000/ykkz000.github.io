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
    <el-form>
      <el-form-item>
        <el-button v-if="blogTable != null" type="primary" @click="router.push({path: `/admin/edit/blog/${selectedRowId}`})" color="var(--theme-background-color)">
          <span v-if="selectedRowId != -1" class="button-text">编辑</span><span v-else class="button-text">新增</span>
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="data.content" @row-click="chooseRow" ref="blogTable"
                  highlight-current-row>
          <el-table-column prop="id" label="ID" width="100"/>
          <el-table-column prop="title" label="标题" width="350"/>
          <el-table-column prop="blogTags" :formatter="dataFormatter" label="标签" width="350"/>
          <el-table-column prop="createDate" :formatter="dataFormatter" label="创建时间" width="200"/>
          <el-table-column prop="lastModifiedDate" :formatter="dataFormatter" label="更新时间" width="200"/>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="child-flex-right pagination-container">
          <el-pagination
              :page-sizes="[10, 20, 30, 40, 50]"
              :total="data.totalElements"
              :page-count="data.totalPages"
              :page-size="data.pageSize"
              :current-page="data.pageNumber"
              @current-change="pageNumberChange"
              @size-change="pageSizeChange"
              layout="total, sizes, prev, pager, next, jumper"/>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {searchBlogByEmpty} from "@/apis";
import router from "@/router";

let data = ref<PageContent<BlogAbstract>>({
  totalPages: 0,
  totalElements: 0,
  pageSize: 10,
  pageNumber: 0,
  content: [],
} as PageContent<BlogAbstract>);

const blogTable = ref<any>();
const selectedRowId = ref(-1);

const changePage = (pageNumber: number, pageSize: number = 10) => {
  searchBlogByEmpty(pageNumber - 1, pageSize)
      .then(res => {
        data.value.totalElements = res.data.data.totalElements;
        data.value.totalPages = res.data.data.totalPages;
        data.value.pageNumber = res.data.data.pageNumber + 1;
        data.value.pageSize = res.data.data.pageSize;
        data.value.content.length = 0;
        data.value.content.push(...res.data.data.content);
      });
}

const pageNumberChange = (pageNumber: number) => {
  changePage(pageNumber, data.value.pageSize);
}
const pageSizeChange = (pageSize: number) => {
  changePage(data.value.pageNumber, pageSize);
}

const chooseRow = (row: BlogAbstract, column: any, event: Event) => {
  if (row.id === selectedRowId.value) {
    selectedRowId.value = -1;
    blogTable.value.setCurrentRow(null);
  } else {
    selectedRowId.value = row.id;
    blogTable.value.setCurrentRow(row);
  }
}

const dataFormatter = (row: BlogAbstract, column: any, cellValue: any, index: number) => {
  if (column.property === 'blogTags') {
    return row.blogTags.join(',');
  }
  if (column.property === 'createDate') {
    return new Date(row.createdDate).toLocaleString();
  }
  if (column.property === 'lastModifiedDate') {
    return new Date(row.lastModifiedDate).toLocaleString();
  }
  return cellValue;
}

changePage(1);
</script>
<style scoped>
.pagination-container {
  padding-top: 20px;
  width: 100%;
}
:deep .el-table__body tr.current-row > td {
  background-color: var(--theme-background-color) !important;
  color: var(--theme-text-color) !important;
}
</style>
