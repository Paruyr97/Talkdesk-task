const { pagesCount } =  require("./constants");

const getPageData = (data, page) => {
    return data.slice(page * pagesCount - pagesCount, page * pagesCount);
}

const sortCategories = (data) => {
    let allCategories = [];

    data.forEach(({ categories }) => {
        allCategories = [...allCategories, ...categories];
    });

    return [...new Set(allCategories)].sort((a, b) => a.charCodeAt() - b.charCodeAt());
}

const filterDataByCategory = (data, category) => {
    return data.filter(({ categories }) => {
        return categories.includes(category);
    })
}

const getSumOfPrices = (data) => {
    return data.reduce((acc, curr) => acc + curr.price, 0);
}

const sortBySumOfPrices = (data) => {
    return [...data].sort((a, b) => {
        return getSumOfPrices(a.subscriptions) - getSumOfPrices(b.subscriptions);
    })
}

module.exports = {
    getPageData,
    sortCategories,
    filterDataByCategory,
    sortBySumOfPrices,
}
