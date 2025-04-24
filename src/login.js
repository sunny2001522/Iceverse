fetch("http://localhost:3005/api/v1/user/login", { method: "GET" })
  .then((response) => response.json())
  .then((res) => {
    // { status: 'true', result: [{...}] }
    console.log(res);
  });
