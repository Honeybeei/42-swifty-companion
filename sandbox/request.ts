import "dotenv/config";

const UID = process.env.UID || "";
const SECRET = process.env.SECRET || "";

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
  secret_valid_until: number;
}

interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string | null;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  staff?: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: string | null;
  alumni?: boolean;
  active?: boolean;
}

async function getAccessToken(): Promise<AccessTokenResponse | undefined> {
  const url = "https://api.intra.42.fr/oauth/token";
  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: UID,
    client_secret: SECRET,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = (await response.json()) as AccessTokenResponse;
    return result;
  } catch (error) {
    console.error("Error getting access token:", error);
    return undefined;
  }
}

async function sendGetRequest<T>(
  accessToken: string,
  url: string
): Promise<T | undefined> {
  if (!accessToken) {
    console.error("Access token is required for GET request.");
    return undefined;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = (await response.json()) as T;
    return result;
  } catch (error) {
    console.error("Error sending GET request:", error);
    return undefined;
  }
}

async function getUserByLogin(
  accessToken: string,
  login: string,
  save_it_to_file: boolean
): Promise<User | undefined> {
  const url = `https://api.intra.42.fr/v2/users/${login}`;
  const result = await sendGetRequest<User>(accessToken, url);
  if (save_it_to_file && result) {
    const fs = require("fs");
    const filePath = `./user_data/${login}_user.json`;
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
  }
  return result;
}

async function main() {
  const tokenResponse = await getAccessToken();
  if (!tokenResponse) {
    console.error("Failed to retrieve access token.");
    return;
  }

  const accessToken = tokenResponse.access_token;
  console.log("-------------------------------------------------------------");
  console.log("Access Token:", accessToken);
  console.log("-------------------------------------------------------------");

  // Test getUserByLogin function
  const user3 = await getUserByLogin(accessToken, "seoyoo", true);
}

main();
