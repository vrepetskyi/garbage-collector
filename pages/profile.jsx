import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default function Profile({ name, surname, email, address, products }) {
  return (
    <div>
      <p>{name}</p>
      <p>{surname}</p>
      <p>{email}</p>
      <p>{address}</p>
      <div>
        {products.forEach((product) => (
          <div>
            {product.images.length && (
              <img src={product.images[0]} alt={product.title} />
            )}
            <p>{product.title}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <Link href="/upload">Add product</Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const path = "http://" + context.req.headers.host + "/api/profile";

  const cookie = context.req.headers.cookie
    .split("; ")
    .find((cookie) => cookie.includes("token"));

  console.log(cookie);

  const response = await fetch(cookie ? path + "?" + cookie : path, {
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
