import { useEffect, useState } from 'react';

export const useLocalStorage = <T extends string>(
    key: string,
    defaultValue: T,
    persist: boolean = true
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (!persist) return;
        try {
            const currentValue = (localStorage.getItem(key) ?? defaultValue) as T;
            if (value !== currentValue) {
                setValue(currentValue);
            }
        } catch (error) {
            console.error(`Error reading ${key} from localStorage`, error);
        }
    }, []);

    useEffect(() => {
        if (!persist) return;
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage;
