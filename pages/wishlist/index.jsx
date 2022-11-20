import { Nav } from "src/components/Nav/Nav";
import styles from "../../styles/Wishlist.module.css";

export default function Wishlist() {
  const mockData = [
    {
      itemTitle: "Sofa",
      itemImage: "https://source.unsplash.com/random/?sofa",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      address: "ul. Skłodowskiej Curie Marii 95\n25-652 Kielce",
      phoneNumber: "123456789",
    },
    {
      itemTitle: "Laptop",
      itemImage: "https://source.unsplash.com/random/?laptop",
      firstName: "James",
      lastName: "Smith",
      email: "james.smith@gmail.com",
      address: "ul. Kolberga Oskara 82\n41-710 Ruda Śląska",
      phoneNumber: "987654321",
    },
  ];

  return (
    <>
      <Nav />
      {mockData.map((item) => (
        <>
          <ul className={styles.list}>
            <li> {item.itemTitle}</li>
            <li className={styles.imageItem}>
              <img className={styles.image} src={item.itemImage} />
            </li>
            <li>
              {item.firstName} {item.lastName}
            </li>
            <li>
              <a className={styles.link} href={`mailto:${item.email}`}>
                {item.email}
              </a>
            </li>
            <li> {item.address} </li>
            <li>
              <a className={styles.link} href={`tel:${item.phoneNumber}`}>
                {item.phoneNumber}
              </a>
            </li>
          </ul>
        </>
      ))}
    </>
  );
}
