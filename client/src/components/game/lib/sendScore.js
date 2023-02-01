import axios from "axios";

export default async function sendScore(score, userId) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_REST_PORT}/scores/`,
      { score, userId }
    );
  } catch (err) {
    console.log(err);
  }
}
