<template>
  <div>
    <div>
      <button @click="addNewNote">
        <Icon name="mdi-light:plus" color="black" />
      </button>
      <button @click="deleteNote">
        <Icon name="mdi-light:delete" color="black" />
      </button>
    </div>
    <ul>
      <li v-for="note in notes" class="cursor-pointer" :class="{'bg-red-500' : activeNodeId === note?.id}" @click="() => setActive(note)">
        <h5>{{ note.name }}</h5>
        <p><span>{{ getTime(note.createdAt) }}</span> {{ note.text }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { Note } from "types";
import { useNotes } from "../composables/useNotes" 

const route = useRoute()
const activeNodeId = ref(Number(route.query.id))

const { addNote, notes, delNote } = useNotes()

const router = useRouter();
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
    name: "New note",
    text: "No additional text"
  })
}

function deleteNote() {
  if(!activeNodeId.value) return
  delNote(activeNodeId.value)
  router.replace({ query: {} })
}
</script>