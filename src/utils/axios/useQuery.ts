import useAxios, { Options } from 'axios-hooks';

interface useQueryProps {
  endpoint: string;
  method: string;
  isManual?: boolean;
  params?: Record<string, any>;
  options: Options;
}

export const useQuery = (props: useQueryProps) => {
  const { method, endpoint, isManual = false, options, params } = props;

  const defaultOptions = { manual: isManual, useCache: false };

  const mergedOptions = { ...defaultOptions, ...options };

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: endpoint,
      method: method,
      params: params
    },
    mergedOptions
  );

  return [{ data, loading, error }, execute] as const;
};
