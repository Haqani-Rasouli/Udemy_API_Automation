import { test, expect } from '@playwright/test';

let authToken: string;
test.beforeAll('run before all tests', async ({request}) => {
  const tokenResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        user: {
          email: "haqqanihaqiq@gmail.com",
          password: "632637Haghani?"
        }
      }
    }
  );

  const tokenResponseJSON = await tokenResponse.json();
  authToken = 'Token ' + tokenResponseJSON.user.token;
});

test('Get tags', async ({ request }) => {
  const response = await request.get("https://conduit-api.bondaracademy.com/api/tags");
  const responseBody = await response.json();

  expect(response.status()).toEqual(200);
});

test("Get All Articles", async ({ request }) => {
  const articles = await request.get(
    'https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0'
  );
  const articlesJSON = await articles.json();

  expect(articles.status()).toEqual(200);
  expect(articlesJSON.articles.length).toBeLessThanOrEqual(10);
  expect(articlesJSON.articlesCount).toEqual(10);
});

test('Create Article', async ({ request }) => {
  let Title = "Title " + Math.random().toString(36).substring(2, 15);

  // Create Article
  const newArticleResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles/',
    {
      data: {
        article: {
          title: Title,
          description: "NOTHING TO SAY",
          body: "LOREM EPSOM",
          tagList: ["PLAYWRIGHT, API, JAVA, WORKING"]
        }
      },
      headers: {
        Authorization: authToken
      }
    }
  );

  const newArticleResponseJSON = await newArticleResponse.json();

  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual(Title);

  // Update Article
  const slugId = newArticleResponseJSON.article.slug;

  const updateArticleResponse = await request.put(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      data: {
        article: {
          title: Title + " UPDATED",
          description: "NOTHING TO SAY UPDATED",
          body: "LOREM EPSOM UPDATED",
          tagList: ["PLAYWRIGHT, API, JAVA, WORKING"]
        }
      },
      headers: {
        Authorization: authToken
      }
    }
  );

  const updatedSlugId = (await updateArticleResponse.json()).article.slug;

  // Delete Article
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${updatedSlugId}`,
    {
      headers: {
        Authorization: authToken
      }
    }
  );

  expect(deleteArticleResponse.status()).toEqual(204);
});

