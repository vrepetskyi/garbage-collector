import Link from "next/link";
const cookie = require("cookie");

export default function Profile({ name, surname, email, address, products }) {
  return (
    <div>
      <p>{name}</p>
      <p>{surname}</p>
      <p>{email}</p>
      <p>{address}</p>
      <Link href="/upload">Add product</Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const path = "http://" + context.req.headers.host + "/api/profile";

  let token;
  try {
    token = cookie.parse(context.req.headers.cookie || "")?.token;
  } catch {}

  const response = await fetch(token ? path + "?token=" + token : path, {
    method: "GET",
  });

  if (response.status !== 200)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: await response.json(),
  };
}
