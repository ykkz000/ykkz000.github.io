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
  <div class="card" @click="() => {router.push({path: '/view/' + item.id});}">
    <h2>{{ item.title }}</h2>
    <div class="time-container">
      <div>最后更新时间
        <el-icon size="14px">
          <Clock/>
        </el-icon>
        {{ timestampToDate(item.lastModifiedDate) }}
      </div>
      <div>创建时间
        <el-icon size="14px">
          <Clock/>
        </el-icon>
        {{ timestampToDate(item.createdDate) }}
      </div>
    </div>
    <p>
      <el-tag v-for="tag in item.blogTags" :key="tag" class="blog-tag">
        <router-link :to="{path: '/tag', query: {t: tag}}" class="tag-link">{{ tag }}</router-link>
      </el-tag>
    </p>
    <p>{{ item.abstractContent }}</p>
  </div>
</template>
<script setup lang="ts">
import {Clock} from "@element-plus/icons-vue";
import {timestampToDate} from "@/utils";
import router from "@/router";

defineProps({
  item: {
    type: Object as () => BlogAbstract,
    required: true,
  }
});

</script>
<style scoped>
.time-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
}

.blog-tag {
  margin-right: 4px;
}

.tag-link {
  text-decoration: none;
}
</style>
