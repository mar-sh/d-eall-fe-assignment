import { BASE_API_URL } from "../../utils/constants";

export default function handler(req, res) {
  const queries = new URLSearchParams(req.query);

  return fetch(`${BASE_API_URL}/fee-assessment-books?${queries.toString()}`)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch(() => []); // to prevent the site from breaking since the provided API does not have error response
}
