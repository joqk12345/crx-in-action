<template>
  <el-dialog
    v-model="isVisible"
    v-if="isVisible"
    title="任务列表"
    width="920"
    draggable
  >

    <div class="C-task-main">
      <el-table
        :data="paginatedData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="150"
        />
        <el-table-column
          prop="title"
          label="标题"
          width="180"
        />
        <el-table-column
          prop="url"
          label="链接地址"
          width="180"
        />
        <el-table-column
          prop="status"
          label="状态"
        />
        <el-table-column
          prop="download_link"
          label="下载链接"
          width="180"
        />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :default-current-page="1"
        :page-size="pagesize.valueOf()"
        :current-page="current_page.valueOf()"
        layout="prev, pager, next"
        :total="total.valueOf()"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      />

    </div>
  </el-dialog>
</template>

<script
  lang="ts"
  setup
>
import { computed, watch, watchEffect } from 'vue';
import { ref } from 'vue'
import { Task } from '../../db/db.ts';


interface Props {
  visible: boolean;
  wordCount: number;
  webtext: string;
}
// let tableData: Task[] = reactive([]);
const tableData = ref<Task[]>([]);
const emit = defineEmits(['onClose'])
const props = defineProps<Props>();
const isVisible = ref(props.visible);
watchEffect(() => {
  isVisible.value = props.visible;
  //get data
  chrome.runtime.sendMessage(
    {
      action: 'getTasks',
    },
    (response) => {
      console.log("get response result")
      console.log(response.data);
      tableData.value = response.data;
      total.value = response.data.length
    }
  )
});

watch(isVisible, (newVal) => {
  if (!newVal) {
    emit('onClose')
  }
});

function sortData(data: Task[]): Task[] {
  return data.sort((a: Task, b: Task) => {
    const dateA = new Date(a.date!);
    const dateB = new Date(b.date!);
    return dateB.getTime() - dateA.getTime();
  });
}

//页码
const pagesize = ref(5)
const total = ref(0)
const current_page = ref(1)

const paginatedData = computed(() => {
  const startIndex = (current_page.value - 1) * pagesize.value
  const endIndex = startIndex + pagesize.value
  return sortData(tableData.value).slice(startIndex, endIndex)
})


// tableData = [
//   {
//     date: '2016-05-02',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   },
//   {
//     date: '2016-05-04',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   },
//   {
//     date: '2016-05-01',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   }, {
//     date: '2016-05-02',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   },
//   {
//     date: '2016-05-04',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   },
//   {
//     date: '2016-05-01',
//     title: 'Tom',
//     url: 'https://www.baidu.com',
//     download_link: 'https://www.baidu.com',
//     status: 'pending'
//   },
// ]


const handleCurrentChange = (val: number) => {
  // current_page.value = val
  console.log(`当前页: ${val}`)
  current_page.value = val
}
const handlePrevClick = (val: number) => {
  // current_page.value = val
  console.log(`上一页: ${val}`)
  current_page.value = val
}
const handleNextClick = (val: number) => {
  // current_page.value = val
  console.log(`下一页: ${val}`)
  current_page.value = val
}

</script>

<style
  scoped
  lang="stylus"
>
.my-header
  display: flex;
  flex-direction: row;
  justify-content: space-between;
.pagination
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  
</style>