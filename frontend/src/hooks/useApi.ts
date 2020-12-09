import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApi = (params: { initialUrl: string; initialData?: any }) => {
  const [url, setUrl] = useState(params.initialUrl);
  const [data, setData] = useState(params.initialData ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(true);

  const refresh = () => setRefreshToggle(!refreshToggle);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await axios.get(`/api/${url}`);
        setData(res.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, refreshToggle]);

  return [
    { data, isLoading, isError },
    { setUrl, refresh },
  ];
};
