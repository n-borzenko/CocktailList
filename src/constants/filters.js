const FILTERS_RECEIVED = "FILTERS_RECEIVED";

export default {
    FILTERS_RECEIVED,
};

export const filterTypes = {
    category: "category",
    alcoholic: "alcoholic",
    glass: "glass",
    ingridient: "ingridient",
};

export const filterTitles = {
    [filterTypes.category]: "Categories",
    [filterTypes.alcoholic]: "Alcoholic",
    [filterTypes.glass]: "Glasses",
    [filterTypes.ingridient]: "Ingridients",
};
