const ENDPOINT = "https://www.thecocktaildb.com/api/json/v1/";
const APIKEY = "1";
const BASEURL = `${ENDPOINT}${APIKEY}`;

const methods = {
    get: "get",
};

const configs = {
    search: {
        method: methods.get,
        url: "/search.php",
    },
    filter: {
        method: methods.get,
        url: "/filter.php",
    },
    list: {
        method: methods.get,
        url: "/list.php",
    },
    cocktail: {
        method: methods.get,
        url: "/lookup.php",
    },
    random: {
        method: methods.get,
        url: "/random.php",
    },
    ingredient: {
        method: methods.get,
        url: "/search.php",
    },
};

export default {
    BASEURL,
    configs,
};
