export default (cookies) =>
  cookies["persist%3Aroot"] === undefined ||
  !JSON.parse(JSON.parse(cookies["persist%3Aroot"]).grade)?.grade
    ? {
        redirect: {
          destination: "/",
        },
      }
    : null;
