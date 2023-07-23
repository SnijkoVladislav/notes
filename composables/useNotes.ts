import { Note } from "types";
import { get, add, del, put, getAll } from "../services/db";

export const useNotes = () => {
  const notes: Ref<Note[]> = ref([]);

  async function addNote(data: { name: string; text: string }) {
    await add(data);
    notes.value = (await getAll()) as Note[];
  }

  async function delNote(id: number) {
    await del(id);
    notes.value = (await getAll()) as Note[];
  }

  async function getNote(id: number) {
    return await get(id);
  }

  async function putNote(id: number, data: Note) {
    await put(id, data);
    notes.value = (await getAll()) as Note[];
  }

  onMounted(async () => {
    notes.value = (await getAll()) as Note[];
  });

  return { addNote, getNote, notes, delNote, putNote };
};
