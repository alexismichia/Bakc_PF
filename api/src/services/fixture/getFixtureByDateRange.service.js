const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.sportmonks.com/v3/football/fixtures/between";

exports.getFixtureByDateRangeFromAPI = async (startDate, endDate) => {
  let URL = `${BASE_URL}/${startDate}/${endDate}`;
  const allData = [];
  const includeData = "participants"
  try {
    while (URL) {
      const response = await axios.get(URL, {
        params: {
        //   per_page: 2,
          api_token: API_KEY,
          include: includeData
        },
      });
      const responseData = response.data.data;
      allData.push(...responseData);

      const pagination = response.data.pagination;
      URL = pagination?.next_page;

      if (!pagination?.has_more) {
        URL = null;
      }
    }
    return allData;
  } catch (error) {
    console.error(`Error fetching data from API: ${error}`);
    throw error;
  }
};
