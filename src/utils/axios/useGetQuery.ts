import useAxios, { Options } from 'axios-hooks';

interface UseGetQueryProps {
  endpoint: string;
  params?: Record<string, any>;
  options?: Options;
}
export const useGetQuery = (props: UseGetQueryProps) => {
  const { endpoint, params, options } = props;
  const [{ data, loading, error }, refetch, cancel] = useAxios(
    {
      method: 'get',
      url: endpoint,
      params: params
    },
    { useCache: false, ...options }
  );

  return [{ data, loading, error }, refetch, cancel] as const;
};
