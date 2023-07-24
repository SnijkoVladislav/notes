<template>
  <div class="relative w-3/12 max-md:w-auto">
    <button @click="isShow = !isShow" class="absolute z-20 p-2 border top-0 left-0 bg-amber-200 md:hidden">
      <Icon name="mdi-light:home" size="24px" color="gray" />
    </button>
    <div class="h-full flex flex-col border-r p-2 max-md:hidden" :class="{ '!block bg-white absolute z-10 top-0 bottom-0 w-[300px] border-t': isShow }">
      <div class="flex my-2 mx-2 max-md:justify-end">
        <button class="px-2 py-1 mr-2 hover:bg-amber-200 border rounded" @click="addNewNote">
          <Icon name="mdi-light:plus" size="22px" color="gray" />
        </button>
        <button class="px-2 py-1 hover:bg-amber-200 border rounded" @click="deleteNote">
          <Icon name="mdi-light:delete" size="22px" color="gray" />
        </button>
      </div>
      <ul>
        <li v-for="note in notes" class="cursor-pointer rounded p-2" :class="{'bg-amber-200' : activeNodeId === note?.id}" @click="() => setActive(note)">
          <h5 class="text-sm">{{ note.name || "New note" }}</h5>
          <p class="text-xs whitespace-nowrap overflow-hidden text-ellipsis"><b>{{ getTime(note.createdAt) }}</b> {{ note.text || "No additional text" }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="isShow" @click="isShow = false" class="bg-gray-800/30 absolute z-0 left-0 right-0 top-0 bottom-0"></div>
</template>
<script setup lang="ts">
import { Note } from "types";
import { useNotes } from "../composables/useNotes" 

const route = useRoute()
const router = useRouter();
const { addNote, notes, delNote } = useNotes()

const isShow = ref(false)
const activeNodeId = ref(Number(route.query.id))

function setActive(note: Note) {
  activeNodeId.value = note.id
  router.push({
    query: {
      id: note.id,
    },
  })
}

function getTime(time: string) {
  const date = new Date(time)
  return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` 
}

function addNewNote() {
  addNote({
    name: "",
    text: ""
  })
}

function deleteNote() {
  if(!activeNodeId.value) return
  delNote(activeNodeId.value)
  router.replace({ query: {} })
}
</script>