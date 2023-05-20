import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

interface IDataAPI {
  limit?: number;
  skip?: number;
  select?: string;
}

export interface IData {
  id: string;
  price: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
  rating : number;
  images: string[];
}

const getData = async ({
  limit = 10,
  skip = 0,
  select = "title,price,thumbnail,discountPercentage,id,rating",
}: IDataAPI): Promise<IData[]> => {
  const params = {
    limit,
    skip,
    select,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.products;
  } catch (error) {
    throw new Error("Error fetching data data");
  }
};

const dataService = {
  getData,
};

export default dataService;
