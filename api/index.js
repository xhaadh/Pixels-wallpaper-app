import axios from "axios";

const API_KEY = "47557003-592fd67fc67ba20f10180cd75";
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

// Function to format URL with optional query parameters
const formatUrl = (params) => {
  let url = apiUrl+"&per_page=25&safesearch=true&editors_choice=true";

  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map (key=>{
    let value = key=='q'? encodeURIComponent (params [key]) : params[key];
    url += `&${key}=${value}`;
});

  console.log("Final URL: ", url);
  return url;
};

// Axios API call with error handling
export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    return { success: true, data: response.data };
  } catch (err) {
    console.log("Got error: ", err.message);
    return { success: false, msg: err.message };
  }
};
