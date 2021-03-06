import { ElasticSearchConnection } from "../elasticsearch";

export async function create(id: string, title: string, tagArr: []) {
  const client = await new ElasticSearchConnection().getConnection();
  //save ticket id also
  const data = await client.index({
    index: "ticketing",
    id: id,
    body: {
      id: id,
      title: title,
      tags: tagArr,
    },
  });
}

export async function getSearchSuggestions(searchString: string) {
  const client = await new ElasticSearchConnection().getConnection();
  let results: any[] = [];
  try {
    const { body } = await client.search({
      index: "ticketing",
      body: {
        size: 12,
        query: {
          query_string: {
            query: searchString + "*",
            fields: ["title", "tags"],
          },
        },
      },
    });

    const hits = body.hits.hits;

    hits.map((item: any) => {
      results.push(item._source);
    });

    console.log(body.hits.total);

    console.log("results", results);

    return { results: results, total: body.hits.total };
  } catch (err) {
    console.log(err);
    return;
  }
}
