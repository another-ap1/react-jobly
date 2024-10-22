import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //getting compnay details
  static async getCompany(handle) {
    let res = await axios.get(`${BASE_URL}/companies/${handle}`);
    return res.company;
  }
  static async getCompanies(nameLike) {
    let res = await axios.get(`${BASE_URL}/companies`, { nameLike });
    return res.companies;
  }

  //user log in,sign up and getting the user
  static async getCurrentUser(username) {
    let res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.user;
  }
  static async login(data) {
    let res = await axios.get(`${BASE_URL}/auth/token`, data);
    return res.token;
  }
  static async signup(data) {
    let res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.token;
  }
  static async saveProfile(username, data) {
    let res = await axios.patch(`users/${username}`, data);
    return res.user;
  }

  //getting jobs and applying to the job
  static async getJobs(title) {
    let res = await axios.get(`${BASE_URL}/jobs`, { title });
    return res.jobs;
  }
  static async applyToJob(username, id) {
    await axios.post(`${BASE_URL}/users/${username}/jobs/${id}`, {});
  }

  
}

export default JoblyApi;

//for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";