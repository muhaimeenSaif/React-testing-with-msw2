import { http, HttpResponse } from 'msw';

const handler = [
    http.get("https://jsonplaceholder.typicode.com/posts/1", async () => {
      return HttpResponse.json({message: "Data fetched successfully"}, {status: 200});
    })
];

export default handler