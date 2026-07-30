import {test} from '../utils/fixtures.spec';

test('Smoke Test', async ({api}) => {

    const response = api
        .path('articles')
        .params({ limit: 10, offset: 0 })
        .getRequest()
    console.log(response)
});  