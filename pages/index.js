import { Container } from "src/components/Container/Container";
import { Swipe } from "src/pages/Swipe/Swipe";

export default function Home({ products }) {
  const cardBuffer = products.map((product) => ({
    title: product.title,
    description: product.description,
    image: product.images[0],
  }));
  console.log(cardBuffer)
  return (
    <Container>
      <Swipe cardBuffer={cardBuffer} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const path = "http://" + context.req.headers.host + "/api/products";

  const cookie = context.req.headers.cookie;

  const response = await fetch(cookie ? path + "?" + cookie : path, {
    method: "GET",
  });

  return {
    props: await response.json(),
  };
}
