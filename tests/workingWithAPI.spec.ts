import { test, expect, request } from '@playwright/test';
import tags from '../data/tags.json';


test('Get tags', async ({ request }) =>{
  const response = await request.get("https://conduit-api.bondaracademy.com/api/tags");
  const responseBody = response.json();
  console.log(responseBody);

  expect(response.status()).toEqual(200);

});

test("Get All Articles", async ({request}) =>{
  const articles = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const articlesJSON = await articles.json();

  expect(articles.status()).toEqual(200);
  expect(articlesJSON.articles.length).toBeLessThanOrEqual(10);
  expect(articlesJSON.articlesCount).toEqual(10);

  console.log(articlesJSON);

})

// test('Create Article', async ({request})=>{
//   const tokenResponse = await request.post('https://conduit-api.bondaracdemy.com/api/users/lonin', {
//     data: {"user": {"email": "haqqanihaqiq@gmail.com", "password": "632637Haghani?"}}
//   });
//   const tokenResponseJSON = tokenResponse.json();
//   const authToken = tokenResponseJSON.user.token;
//   console.log(authToken);
// })