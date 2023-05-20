import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products/categories';


const getCategories = async () => {
    try {
    const response = await axios.get(BASE_URL);
    return response.data;
}
catch (error) {
    throw new Error("Error fetching data categories");
    }
}

const categoriesService = {
    getCategories
}

export default categoriesService;