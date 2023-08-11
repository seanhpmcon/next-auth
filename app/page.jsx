'use client'

import Script from 'next/script'
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react"

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function Home() {
  const myVariable = 'Hello, world!';
  const { data: session, status } = useSession()
  
  return (
    <div>
      <p>Hello World!</p>
      <div id="myScriptContainer" data-variable={myVariable} />
      <Script src="/script.js" />
      {status === "authenticated" ? (
        <button onClick={() => {
          keycloakSessionLogOut().then(() => signOut());
        }}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('keycloak')}>Sign in</button>
      )}
      
    </div>
  )
}