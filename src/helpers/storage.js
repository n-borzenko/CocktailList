export const setToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
};

export const getFromStorage = (key, defaultValue = null) => {
    try {
        let value = localStorage[key];
        value = value ? JSON.parse(value) : null;
        return (
            value ||
            (typeof defaultValue === "function" ? defaultValue() : defaultValue)
        );
    } catch (error) {
        console.error(error);
    }
};
