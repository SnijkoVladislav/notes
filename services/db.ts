import { openDB, DBSchema } from "idb";

interface DB extends DBSchema {
  notes: {
    value: {
      name: string;
      createdAt: string;
      text: string;
    };
    key: string;
  };
}

const dbPromise = openDB<DB>("db", 1, {
  upgrade(db) {
    db.createObjectStore("notes", {
      keyPath: "id",
      autoIncrement: true,
    });
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
  return (await dbPromise).add("notes", {
    ...data,
    createdAt: new Date().toISOString(),
  });
}

async function getAll() {
  return (await dbPromise).getAll("notes");
}

export { get, add, del, getAll };
