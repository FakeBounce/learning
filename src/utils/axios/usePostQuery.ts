import useAxios, { Options } from 'axios-hooks';

interface usePostQueryProps {
  endpoint: string;
  options?: Options;
}
export const usePostQuery = (props: usePostQueryProps) => {
  const { endpoint, options } = props;

  const defaultOptions = { manual: false, useCache: false };

  const mergedOptions = { ...defaultOptions, ...options };

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: endpoint,
      method: 'POST'
    },
    mergedOptions
  );

  return [{ data, loading, error }, execute] as const;
};
