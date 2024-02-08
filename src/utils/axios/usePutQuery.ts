import useAxios, { Options } from 'axios-hooks';

interface usePutQueryProps {
  endpoint: string;
  options: Options;
}
export const usePutQuery = (props: usePutQueryProps) => {
  const { endpoint, options } = props;

  const defaultOptions = { manual: false, useCache: false };

  const mergedOptions = { ...defaultOptions, ...options };

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: endpoint,
      method: 'PUT'
    },
    mergedOptions
  );

  return [{ data, loading, error }, execute] as const;
};
