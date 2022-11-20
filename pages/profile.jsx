export default function Profile() {
  return null;
}

export async function getServerSideProps(context) {
  const response = await fetch(
    "http://" + context.req.headers.host + "/api/profile",
    {
      method: "GET",
    }
  );

  if (response.status === 401)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: (await response.json()).data,
  };
}
