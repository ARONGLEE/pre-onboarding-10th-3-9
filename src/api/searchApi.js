import apiRequest from '.';

const URL = '/search?';

export const getSearchData = async (param) => {
  try {
    const response = await apiRequest.searchGet(`${URL}q=${param}`);
    const data = await response.data.result;
    console.log(data);

    return data;
  } catch (error) {
    throw new Error('getSearchData API Error');
  }
};
