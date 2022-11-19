import "../styles/globals.css";
import "../styles/variables.css";

function MyApp({ Component, pageProps }) {
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 420,
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
