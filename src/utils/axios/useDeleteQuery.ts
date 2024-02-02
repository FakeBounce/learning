import useAxios, { Options } from 'axios-hooks';

interface UseDeleteQueryProps {
  endpoint: string;
  options?: Options;
}
export const useDeleteQuery = (props: UseDeleteQueryProps) => {
  const { endpoint, options } = props;

  const defaultOptions = { manual: true, useCache: false };

  const mergedOptions = { ...defaultOptions, ...options };

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: endpoint,
      method: 'DELETE'
    },
    mergedOptions
  );

  return [{ data, loading, error }, execute] as const;
};
