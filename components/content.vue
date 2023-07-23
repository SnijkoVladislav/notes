<template>
  <div class="m-10">
    <button @click="isEdit = !isEdit">
      <Icon name="mdi-light:script" color="black" />
    </button>
    <div>
      <input @input="searchText" />
    </div>
  </div>
  <textarea v-if="isEdit" :value="node?.text" @input="saveText"></textarea>
  <pre v-if="!isEdit" v-html="markdownText" ref="searchTarget"></pre>
</template>
<script setup lang="ts">
import MarkdownIt from "markdown-it"
import { useNotes } from "../composables/useNotes" 

const md = new MarkdownIt();

const route = useRoute()
const node = ref()
const isEdit = ref(false)
const searchTarget = ref()
const markdownText = computed(() => md.render(node.value?.text || ''))

const { getNote, putNote } = useNotes()

async function saveText(e: Event) {
  await putNote(node.value?.id, {
    ...node.value,
    text: (e.target as HTMLInputElement).value
  })
  await initText()
}

function searchText(e: Event) {
  const textSearch = (e.target as HTMLInputElement).value;
  const regexPattern = new RegExp(textSearch, 'gi');
  let text = searchTarget.value.innerHTML;
  text = text.replace(/(<mark class="highlightColor">|<\/mark>)/gim, '');

  if(textSearch) {
    const newText = text.replace(regexPattern, '<mark class="highlightColor">$&</mark>');
    searchTarget.value.innerHTML = newText;
  } else {
    searchTarget.value.innerHTML = text;
  }
}

async function initText() {
  if(!route.query.id) return

  const nodeFromDb = await getNote(Number(route.query.id))

  if (nodeFromDb) {
    node.value = nodeFromDb
  }
}

watch(() => route.query.id, async () => {
  await initText()
})

onMounted(async () => {
  await initText()
})
</script>