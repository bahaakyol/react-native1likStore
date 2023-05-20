import axios from "axios";
import { IData } from "./dataService";

const BASE_URL = "https://dummyjson.com/products";

export interface IById {
  id: string;
  brand: string;
  category : string;
  description : string;
  discountPercentage : number;
  price : number;
  thumbnail : string;
  title : string;
  stock : number;
  rating : number;
  image : string;
}

const getProduct = async ({ id }: IById): Promise<IData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data getProduct");
  }
};

const getProductService = {
  getProduct,
};

export default getProductService;
