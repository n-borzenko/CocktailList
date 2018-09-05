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
};

export default {
    BASEURL,
    configs,
};
