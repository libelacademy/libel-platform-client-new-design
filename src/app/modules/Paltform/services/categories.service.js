import axios from 'axios';

export const getAllCategories = async () => {
  try {
    const { data: response } = await axios.get(
      'http://localhost:5000/api/categories',
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return [];
  }
}