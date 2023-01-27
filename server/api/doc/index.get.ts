import { getDocs } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  //   const query = getQuery(event);

  const docs = await getDocs();

  // const docs = [
  //   {
  //     id: "2039i0s9fi09",
  //     user_id: "preginald",
  //     title: "How to use Rsync",
  //   },
  // ];
  return docs;
});
