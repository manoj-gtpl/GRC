import axios from "axios";

export const fetchOrganizations = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/organization/register/");
    return res.data.organizations || [];
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return [];
  }
};
