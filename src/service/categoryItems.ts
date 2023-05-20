import axios from "axios";

const BASE_URL = "https://dummyjson.com/products/category";

const getCategoryItems = async (category: string) => {
  try {
    console.log("category: ", category)
    const response = await axios.get(`${BASE_URL}/${category}`);
    return response.data.products;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data catitems");
  }
};

const categoryItemsService = {
  getCategoryItems,
};

export default categoryItemsService;
