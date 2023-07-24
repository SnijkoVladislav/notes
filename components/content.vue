<template>
  <div class="p-5 h-full">
    <div class="flex justify-between max-md:justify-center pb-2">
      <button class="px-2 py-1 mr-2 hover:bg-amber-200 border rounded" :class="{ 'bg-amber-200': isEdit }" @click="isEdit = !isEdit">
        <Icon name="mdi-light:script" size="18px" color="gray" />
      </button>
      <div class="flex border rounded text-xs p-2">
        <Icon name="mdi-light:magnify" size="18px" color="gray" />
        <input :disabled="isEdit" class="outline-0 text-gray-700" @input="searchText" />
      </div>
    </div>
    <div class="flex justify-center my-2"><span class="text-sm">{{ createdAt }}</span></div>
    <textarea v-if="isEdit" :value="node?.text" @input="saveText" class="min-h-[80vh] w-full outline-0"></textarea>
    <pre v-if="!isEdit" v-html="markdownText" ref="searchTarget" class="markdown-body min-h-[80vh] w-full"></pre>
  </div>
</template>
<script setup lang="ts">
import "github-markdown-css"
import MarkdownIt from "markdown-it"

import { useNotes } from "../composables/useNotes"

const md = new MarkdownIt();

const route = useRoute()
const node = ref()
const isEdit = ref(false)
const searchTarget = ref()
const markdownText = computed(() => md.render(node.value?.text || ''))
const createdAt = computed(() => node.value?.createdAt && new Date(node.value?.createdAt).toLocaleString())

const { getNote, putNote } = useNotes()

async function saveText(e: Event) {
  const newText = (e.target as HTMLInputElement).value
  const newName = node.value?.text.split(/[\r\n]+/)[0];

  await putNote(node.value?.id, {
    ...node.value,
    text: newText,
    name: newName
  })

  node.value.text = newText
  node.value.name = newName 
}

function searchText(e: Event) {
  highlightText(searchTarget.value, (e.target as HTMLInputElement).value)
}

async function init() {
  if(!route.query.id) {
    node.value = {}
    return 
  }

  const nodeFromDb = await getNote(Number(route.query.id))

  if (nodeFromDb) {
    node.value = nodeFromDb
    isEdit.value = !nodeFromDb.text
  }
}

watch(() => route.query.id, async () => {
  await init()
})

onMounted(async () => {
  await init()
})
</script>