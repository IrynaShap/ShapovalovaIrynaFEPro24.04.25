function createDataBase() {
  const OBJECT_KEYS = ['title', 'description'];
  const STORAGE_KEY = 'todoDB';

  const validateObject = (obj) => {
    if (typeof obj !== 'object') return false;
    return OBJECT_KEYS.every(key => obj.hasOwnProperty(key));
  };

  const getData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const setData = (data) => {
    if (!validateObject(data)) return null;
    const current = getData();
    const id = current.length ? current[current.length - 1].id + 1 : 1;
    const item = { ...data, id };
    current.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return item;
  };

  const deleteData = ({ id }) => {
    const current = getData();
    const idx = current.findIndex(item => item.id === id);
    if (idx === -1) return null;
    const [deleted] = current.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return deleted;
  };

  return { getData, setData, deleteData };
}

const dataBase = createDataBase();