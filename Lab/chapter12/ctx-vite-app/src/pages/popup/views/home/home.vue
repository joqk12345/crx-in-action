<template>
  <div class="P-home">
    <el-form
      :model="form"
      label-width="150px"
      width="200px"
      label-position="left"
    >
      <div class="main-container">
        <el-form-item label="字数">
          <el-input v-model="form.wordcount" />
        </el-form-item>
        <el-form-item label="文本语言检测">
          <el-select
            v-model="form.detected_language"
            clearable
          >
            <el-option
              label="英文"
              value="en-US"
            />
            <el-option
              label="简体中文"
              value="zh-CN"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="目标语言">
          <el-select
            v-model="form.target_language"
            clearable
          >
            <el-option
              label="英语"
              value="en-US"
            />
            <el-option
              label="简体中文"
              value="zh-CN"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click="onSubmit"
          >
            确认
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <div class="settings_btn">
      <el-button
        class="btn"
        type="info"
        @click="gotoSettings"
      >
        <div class="setting_ico">
          <el-icon>
            <Setting />
          </el-icon>
        </div>
        设置
      </el-button>

    </div>


    <div class="logo">
      <el-text
        class="mx-1"
        type="info"
      >内容转音频</el-text>
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
import { reactive } from 'vue'
const form = reactive({
  wordcount: '',
  detected_language: '',
  target_language: '',
})
// const onSubmit = () => {
//   console.log('submit!', form)
// }

const onSubmit = async () => {
  console.log('submit!', form)
  //获取当前激活tab页的信息
  let queeryOptions = {
    active: true,
    currentWindow: true,
  }
  chrome.tabs.query(queeryOptions, async (tabs) => {
    let activateTab = tabs[0];
    let id = activateTab.id;
    let title = activateTab.title!;
    let url = activateTab.url!;

    console.log("sendMessage from popup", url, title, id, activateTab)
    chrome.runtime.sendMessage({
      action: "addTask",
      tabInfo: activateTab,
      id: id,
      url: url,
      title: title
    }, function (response) {
      console.log("sendMessage from popup", response)
    })

    //关闭页面
    window.close()
  })
}


const gotoSettings = () => {
  console.log('gotoSettings')
  window.open('/options.html')
}

</script>

<style
  scoped
  lang="stylus"
>
.P-home
    position relative
    width: 350px
    height: 280px
    background-color:#14C9C9
    padding-top: 20px
    padding-right:10px

.main-container
  margin-left: 2px
.main-container label
  font-weight: bold
  font-size: 15px
.settings_btn
  radius: 10px
  margin-left:5px
.setting_ico
  margin-right: 3px
.logo
  position: absolute
  bottom: 10px
  left: 48%
.logo span
  font-size: 20px
  font-weight: bold
  color: #114BA3
  
</style>
