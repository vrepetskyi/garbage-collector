import { Container } from "src/components/Container/Container";
import { Swipe } from "src/pages/Swipe/Swipe";
const cookie = require("cookie");

export default function Home({ products }) {
  const cardBuffer = products.map((product) => ({
    title: product.title,
    description: product.description,
    image: product.images[0],
  }));

  return (
    <Container>
      <Swipe cardBuffer={cardBuffer} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const path = "http://" + context.req.headers.host + "/api/products";

  const token = cookie.parse(context.req.headers.cookie).token;

  const response = await fetch(token ? path + "?token=" + token : path, {
    method: "GET",
  });

  return {
    props: await response.json(),
  };
}
