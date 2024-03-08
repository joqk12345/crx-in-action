<script
  lang="ts"
  setup
>
import { ref, onMounted, Ref } from 'vue'
import TaskDialog from '@/content/components/taskDialog.vue'


// 对话框显示状态
const isShowMainDialog = ref(false)
const wordCount: Ref<number> = ref(0)
const webtext: Ref<string> = ref('')

onMounted(() => {
  getText()
})

function getText() {
  // Get the webpage content
  const webContent = document.body.innerText;
  if (webContent) {
    // Extract all the words from the content
    const words = webContent.match(/[^\s]+/g);
    const length = words?.length;
    // Log the text and word count
    // console.log(webContent);
    // console.log("Word Count: " + length);
    // Set the values in the webtext and wordCount fields
    try {
      if (words != null) {
        webtext.value = words.join('');
      }
    } catch (e) {
      // Handle the exception appropriately
    }
    if (typeof length !== 'undefined') {
      wordCount.value = length;
    }
  } else {
    console.log("Web content is null");
  }
}
</script>

<template>
  <el-config-provider namespace="CRX-el">
    <div class="CRX-content">
      <div
        class="content-entry"
        @click="isShowMainDialog = true"
      >
      </div>
      <!-- <div class="crt-control-btn">
                <el-button @click="doSendMessageTobackground">点击</el-button>
            </div> -->
      <!-- <MainDialog
                :wordCount="wordCount"
                :webtext="webtext"
                :visible="isShowMainDialog"
                @onClose="() => { isShowMainDialog = false }"
            /> -->
      <TaskDialog
        :wordCount="wordCount"
        :webtext="webtext"
        :visible="isShowMainDialog"
        @onClose="() => { isShowMainDialog = false }"
      />
    </div>
  </el-config-provider>
</template>

<style
  scoped
  lang="stylus"
>
.CRX-content
    .content-entry
        position: fixed
        z-index: 9999
        bottom: 100px
        right: 20px
        width: 50px
        height: 50px
        background: url(images/content-icon.png)
        background-size: 100% 100%
        background-size: 100% 100%
        cursor: pointer
    .crt-control-btn
        position: fixed
        z-index: 9999
        bottom: 20px
        right: 20px

.CRX-el-overlay
    background-color:red
</style>
