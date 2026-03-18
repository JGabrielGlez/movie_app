// Will allow us to handle multiple API req

import { useEffect, useState } from "react";

// Fetch Functions coul be :
// fetchMovies,
// fetchMovieDetails
//
// T is a generic function that can allow us to later on pass the specifuc data type
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  //
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Una vez creados esos states, ahora lo siguiente es crear la función que se traiga la data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      //   Se pasa como parámetro
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      // Esto lo que hace es setear el error, checa si lo del catch es un tipo Error, si lo es, lo pasa tal cual, sino, crea un error estándar con un mensaje definido
      // @ts-ignore
      setError(error instanceof Error ? error : new Error("An error ocurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  //   Se usa cuando queremos hacer algo al inicio de que nuestro componente cargue
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
