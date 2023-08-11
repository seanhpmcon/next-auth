import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {

    const formData = new URLSearchParams({
        'refresh_token': session.refresh_token,
        'client_id': 'testclient',
        'client_secret': 'SO1nZwn5TCNZpRrR6ucCC72O2mTQT13S'
    });

    // this will log out the user on Keycloak side
    //const url = `${process.env.KEYCLOAK_ISSUER}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

    const url = `http://172.24.160.1:8099/realms/test-auth/protocol/openid-connect/logout`;

    try {
      const resp = await fetch(url, {  method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData });
    } catch (err) {
        console.log(err)
      return new Response({ status: 500 });
    }
  }
  return new Response({ status: 200 });
}