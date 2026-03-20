import { Client, Databases, ID, Query } from "react-native-appwrite";

// Track the searches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // check if a record of that search has already been stores
  // If a document is found increment the searchCountField
  // if not, create a new document in appwrite

  try {
    const result = await database.listDocuments(DATABASE_ID, "metrics", [
      Query.equal("searchTerm", query),
    ]);
    console.log(result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(DATABASE_ID, "metrics", existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, "metrics", ID.unique(), {
        title: movie.title,
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
