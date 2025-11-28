import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.username = (profile as any).login;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).username = token.username;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after login
      if (url.startsWith('/')) return url === '/dashboard' ? url : '/dashboard';
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`;
      return baseUrl + '/dashboard';
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
