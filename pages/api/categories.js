import { BASE_API_URL } from "../../utils/constants";

export default function handler(req, res) {
  return fetch(`${BASE_API_URL}/fee-assessment-categories`)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => error);
}
