import { useState, useEffect } from "react";
import { Nav } from "src/components/Nav/Nav";
import { Card } from "src/components/Card/Card";
import { Controls } from "src/components/Controls/Controls";
import styles from "./Swipe.module.css";
import classNames from "classnames";

export const Swipe = function () {
  const [cardBuffer, setCardBuffer] = useState([
    {
      image: "images/lamp.jpeg",
      title: "Stara lampa",
      description:
        "Fajna lampa, nie działa text text text text text text text text text text",
    },
    {
      image: "images/lamp.jpeg",
      title: "Fajna lampa",
      description: "Fajna lampa, nie działa",
    },
    {
      image: "images/lamp.jpeg",
      title: "YYYYYYYYYYY lampa",
      description: "Fajna lampa, nie działa",
    },
  ]);

  const [indexCard, setIndexCard] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(cardBuffer);
        setCardBuffer((cardBuffer) =>
          cardBuffer.concat(
            res.map((el) => {
              return {
                image: el.images[0],
                title: el.title,
                description: el.description,
              };
            })
          )
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Nav />
      {cardBuffer && cardBuffer.length > 0 ? (
        <div className={styles.content}>
          <Buffer infoBuffer={cardBuffer} />
          <Controls
            rightOnClick={() => {
              if (indexCard < cardBuffer.length) {
                const first = document.querySelectorAll(
                  "." + styles.gridElement
                )[indexCard];
                first.classList.add(styles.swipeRight);

                setIndexCard(indexCard + 1);
                setTimeout(() => first.classList.add(styles.none), 2000);
              }
            }}
            leftOnClick={() => {
              if (indexCard < cardBuffer.length) {
                const first = document.querySelectorAll(
                  "." + styles.gridElement
                )[indexCard];
                first.classList.add(styles.swipeLeft);

                setIndexCard(indexCard + 1);
                setTimeout(() => first.classList.add(styles.none), 2000);
              }
            }}
          />
        </div>
      ) : (
        <p>XDDDDDD</p>
      )}
    </>
  );
};

const Buffer = function ({ infoBuffer }) {
  return (
    <div className={styles.bufferContainer}>
      {console.log(infoBuffer)}
      {infoBuffer &&
        infoBuffer.length > 0 &&
        infoBuffer?.map((el, index) => (
          <Card
            image={el.image}
            title={el.title}
            description={el.description}
            className={classNames(
              styles.gridElement
            )}
            style={{zIndex: -index}}
            id={index === 0 ? "firstCard" : undefined}
            key={index}
          />
        ))}
    </div>
  );
};
