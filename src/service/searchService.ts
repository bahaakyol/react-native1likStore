import axios from "axios";
import { IData } from "./dataService";

const BASE_URL = "https://dummyjson.com/products/search?q=";

interface ISearchAPI {
  search: string;
}

const searchResults = async ({ search }: ISearchAPI): Promise<IData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}${search}`);
    return response.data.products;
  } catch (error) {
    throw new Error("Error fetching data search");
  }
};

const searchService = {
  searchResults,
};

export default searchService;
