import { Card } from "../src/components/Card/Card";
import styles from "../styles/Home.module.css";
import { Nav } from "./../src/components/Nav/Nav";
import { Controls } from "../src/components/Controls/Controls";

export default function Home() {
  return (
    <>
      <Nav />
      <Card image="images/lamp.jpeg" title="Stara lampa" description="Fajna lampa, nie działa" />
      <Controls />
    </>
  );
}
