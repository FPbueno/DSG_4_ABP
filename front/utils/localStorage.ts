import AsyncStorage from "@react-native-async-storage/async-storage";

// Salvar dados no LocalStorage
export const saveToLocalStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error saving to AsyncStorage:", error);
  }
};

// Ler dados do LocalStorage
export const loadFromLocalStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error loading from AsyncStorage:", error);
    return null;
  }
};

// Remover dados do LocalStorage
export const removeFromLocalStorage = (key: string): void => {
  AsyncStorage.removeItem(key);
};
