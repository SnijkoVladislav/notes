import { Note } from "types";
import { get, add, del, getAll } from "../services/db";

export const useNotes = () => {
  const notes: Ref<Note[]> = ref([]);

  async function addNote(data: { name: string; text: string }) {
    await add(data);
    notes.value = await getAll();
  }

  async function delNote(id: string) {
    await del(id);
    notes.value = await getAll();
  }

  async function getNote(id: string) {
    return await get(id);
  }

  onMounted(async () => {
    notes.value = await getAll();
  });

  return { addNote, getNote, notes, delNote };
};
