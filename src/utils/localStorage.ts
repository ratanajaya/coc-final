const ls = {
  load: <T>(key: string) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return undefined;
      }
      return JSON.parse(serializedValue) as T;
    } catch (err) {
      return undefined;
    }
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  
  set: (key: string, value: any) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch {
      // ignore write errors
    }
  },

  clear: () => {
    localStorage.clear();
  }
}

export default ls;