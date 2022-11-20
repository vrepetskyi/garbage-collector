import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Nav.module.css";

export const Nav = function () {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <ButtonIcon onClick={() => router.push("/profile")} iconType="settings" color="grey" />
      <Link href="/"><img src="images/Logotyp.svg" alt="logo" className={styles.logo} /></Link>
      <ButtonIcon onClick={() => router.push("/wishlist")} iconType="heart" color="grey" />
    </div>
  );
};
