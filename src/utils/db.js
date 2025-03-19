import { openDB } from "idb";

const DB_NAME = "myPWADB";
const STORE_NAME = "api-response";

export const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        },
    });
    return db;
};

export const saveIntoDB = async (key, data) => {
    const db = await initDB();
    await db.put(STORE_NAME, { id: key, data });
};

export const getData = async (key) => {
    const db = await initDB();
    const data = await db.get(STORE_NAME, key);
    return data?.data;
};
