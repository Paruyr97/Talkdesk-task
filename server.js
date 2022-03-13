const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { getPageData, filterDataBySearch, sortCategories, filterDataByCategory, sortBySumOfPrices } = require('./helper.js');
const { data } = require('./data.js');
const { pagesCount } = require('./constants.js');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json(getPageData(data, 1));
})

app.get('/categories', (req, res) => {
    res.json(sortCategories(data));
})

app.get('/pagesInfo', (req, res) => {
    res.json({
        pagesCount: 3,
        dataLength: Math.ceil(data.length / pagesCount)
    });
})

app.get('/search/:searchItem', (req, res) => {
    res.json(sortBySumOfPrices(filterDataBySearch(data, req.params.searchItem)));
})
 
app.get('/:page', (req, res) => {
    res.json(sortBySumOfPrices(getPageData(data, Number(req.params.page))));
})

app.get('/category/:category', (req, res) => {
    res.json(sortBySumOfPrices(filterDataByCategory(data, req.params.category)));
})

app.listen(PORT, () => console.log(`server runs on port ${PORT}`));
