import { useState } from "react";
import { Nav } from "src/components/Nav/Nav";
import { Card } from "src/components/Card/Card";
import { Controls } from "src/components/Controls/Controls";
import styles from "./Swipe.module.css";
import classNames from "classnames";

export const Swipe = function ({ cardBuffer }) {
  const [indexCard, setIndexCard] = useState(0);

  return (
    <>
      <Nav />
      <div className={styles.content}>
        <Buffer infoBuffer={cardBuffer} />
        <Controls
          rightOnClick={() => {
            const first = document.querySelectorAll("." + styles.gridElement)[
              indexCard
            ];
            first.classList.add(styles.swipeRight);

            setIndexCard(indexCard + 1);
            setTimeout(() => first.classList.add(styles.none), 2000);
          }}
          leftOnClick={() => {
            const first = document.querySelectorAll("." + styles.gridElement)[
              indexCard
            ];
            first.classList.add(styles.swipeLeft);

            setIndexCard(indexCard + 1);
            setTimeout(() => first.classList.add(styles.none), 2000);
          }}
        />
      </div>
    </>
  );
};

const Buffer = function ({ infoBuffer }) {
  return (
    <div className={styles.bufferContainer}>
      {infoBuffer &&
        infoBuffer?.map((el, index) => (
          <Card
            image={el.image}
            title={el.title}
            description={el.description}
            className={classNames(
              styles.gridElement,
              styles[`visibility-${index}`]
            )}
            id={index === 0 ? "firstCard" : undefined}
            key={index}
          />
        ))}
      {infoBuffer.length < 10 && (
        <p className={styles.outOfProducts}>You have seen all the products!</p>
      )}
    </div>
  );
};
