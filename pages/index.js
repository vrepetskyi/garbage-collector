import { Card } from "../src/components/Card/Card";
import styles from "../styles/Home.module.css";
import { Nav } from "./../src/components/Nav/Nav";
import { Controls } from "../src/components/Controls/Controls";
import { Container } from "src/components/Container/Container";
import { Swipe } from "src/pages/Swipe/Swipe";

export default function Home() {
  return (
    <Container>
      <Swipe />
    </Container>
  );
}
