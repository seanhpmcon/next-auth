import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <div>{session.user.name}</div>
      <div>{session.role}</div>
      <div>{session.refresh_token}</div>
    </div>
  )
}
