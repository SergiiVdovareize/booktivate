import { API_BASE } from "./config";

export default class ApiGateway {
  constructor(baseUrlGetter = () => API_BASE) {
    this.getBaseUrl = typeof baseUrlGetter === "function" ? baseUrlGetter : () => baseUrlGetter;
  }

  get = async (path) => {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dto = await response.json();
    return dto;
  };

  post = async (path, payload) => {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dto = await response.json();
    return dto;
  };
}
