import { clone } from 'lodash';

import type { Token } from 'next-auth/jwt';
import type { OptionsType } from 'cookies-next/lib/types';

import { initializeApollo } from '@/common/apollo/client/apolloClient';
import { REFRESH_TOKEN } from '@/common/queries/auth/auth.mutation';

/**
 * 토큰 가져오기
 * 토큰 유효기간이 지낫을 경우 refresh token 요청 후 리턴
 *
 * @params token Muffin 토큰
 */
export default async function getTokenApi(
  _token: Token,
  cookieOptions?: OptionsType,
) {
  const apolloClient = initializeApollo();

  if (_token) {
    const token = clone(_token);
    const isRenew = Date.now() / 1000 > (_token.accessExpireTime ?? 0);
    if (isRenew) {
      // refresh token
      const {
        data: { tokenAuthorizationRefresh },
      } = await apolloClient.mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          authorizationToken: _token.accessToken,
          refreshInput: {
            refreshToken: _token.refreshToken,
          },
        },
      });

      token.accessToken = tokenAuthorizationRefresh.accessToken;
      token.accessExpireTime = tokenAuthorizationRefresh.accessExpireTime;
      token.refreshToken = tokenAuthorizationRefresh.refreshToken;
      token.refreshExpireTime = tokenAuthorizationRefresh.refreshExpireTime;
    }

    return {
      isRenew,
      token,
    };
  } else {
    // Not Signed in
    throw 'Unauthorized';
  }
}
