import { http, HttpResponse } from 'msw';

const handlers = [
    http.get("https://jsonplaceholder.typicode.com/posts/1", async () => {
      console.log("Mocked API call");
      return HttpResponse.json({title: "Data fetched successfully",
        body: "Data fetched body"
      }, {status: 200});
    })
];

export default handlers