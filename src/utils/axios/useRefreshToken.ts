import { MutableRefObject } from 'react';

export const useRefreshToken = async (props: {
  axiosInstance: any;
  refreshState: MutableRefObject<any>;
  setRefreshState: (element: null | any) => void;
  refresh: any;
}) => {
  const { axiosInstance, refreshState, setRefreshState, refresh } = props;

  if (!refreshState.current) {
    setRefreshState(
      refreshToken(axiosInstance, refresh).then((token) => {
        setRefreshState(null);
        return token;
      })
    );
  }

  return refreshState.current.then((token: string) => {
    return token;
  });
};

const refreshToken = async (
  axiosInstance: (arg0: {
    method: string;
    url: string;
    headers: { authorization: string };
    refresh: boolean;
  }) => any,
  refresh: string
) => {
  try {
    return await axiosInstance({
      method: 'post',
      url: '/users/refresh',
      headers: { authorization: 'Bearer ' + refresh },
      refresh: true
    });
  } catch (error) {
    console.error(error);
  }
};
