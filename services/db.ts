import { openDB, DBSchema } from "idb";

interface DB extends DBSchema {
  notes: {
    value: {
      name: string;
      createdAt: string;
      text: string;
      id: number;
    };
    key: string;
    indexes: { "by-id": number };
  };
}

const dbPromise = openDB<DB>("db", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes");
    store.createIndex("by-id", "id");
  },
});

async function get(id: number) {
  // @ts-ignore idb woned string but work with number
  return (await dbPromise).get("notes", id);
}

async function del(id: number) {
  // @ts-ignore idb woned string but work with number
  return (await dbPromise).delete("notes", id);
}

async function add(data: { name: string; text: string }) {
  const currentDate = new Date();
  const id = currentDate.getTime();
  const createdAt = currentDate.toISOString();
  return (await dbPromise).add(
    "notes",
    {
      ...data,
      createdAt: createdAt,
      id,
    },
    // @ts-ignore idb woned string but work with number
    id
  );
}

async function put(id: number, data: { name: string; text: string }) {
  // @ts-ignore idb woned string but work with number
  return (await dbPromise).put("notes", data, id);
}

async function getAll() {
  return (await dbPromise).getAll("notes");
}

export { get, add, del, put, getAll };
