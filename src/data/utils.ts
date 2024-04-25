import { Table, UpdateSpec } from "dexie";

export const addRecord = async <T>(table: Table<T, number>, record: T) => {
  const id = await table.add(record);
  return { ...record, id };
};

export const getRecord = async <T>(table: Table<T, number>, id: number) => {
  return await table.get(id);
};

export const updateRecord = async <T>(
  table: Table<T, number>,
  id: number,
  changes: UpdateSpec<T>
) => {
  await table.update(id, changes);
  return await table.get(id);
};

export const removeRecord = async <T>(table: Table<T, number>, id: number) => {
  try {
    await table.delete(id);
    return true;
  } catch (err) {
    return false;
  }
};
