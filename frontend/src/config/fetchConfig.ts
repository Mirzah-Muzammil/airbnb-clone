export const API_BASE_URL = "http://localhost:5001";

type FetchOptions = RequestInit & {
  path: string;
};

export const apiFetch = ({ path, ...options }: FetchOptions) =>
  fetch(`${API_BASE_URL}${path}`, options);
