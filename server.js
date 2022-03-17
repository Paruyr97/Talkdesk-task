const express = require("express");
const cors = require("cors");
const { data } = require("./data.js");
const { pagesCount, PORT } = require("./constants.js");
const {
  getPageData,
  sortCategories,
  filterDataByCategory,
  sortBySumOfPrices,
} = require("./helper.js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(getPageData(data, 1));
});

app.get("/categories", (req, res) => {
  res.json(sortCategories(data));
});

app.get("/:page", (req, res) => {
  res.json({
    data: sortBySumOfPrices(getPageData(data, Number(req.params.page))),
    dataLength: Math.ceil(data.length / pagesCount),
  });
});

app.get("/category/:category", (req, res) => {
  res.json(sortBySumOfPrices(filterDataByCategory(data, req.params.category)));
});

app.listen(PORT, () => console.log(`server runs on port ${PORT}`));
