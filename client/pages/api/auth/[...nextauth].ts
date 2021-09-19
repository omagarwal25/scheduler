import axios from 'axios';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';

const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
  }),
];

const callbacks: any = {
  signIn: async function signIn({ user, account, profile }: any) {
    if (account.provider === 'github') {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });
      const emails = await emailRes.json();
      const primaryEmail = emails.find((e: any) => e.primary).email;
      user.email = primaryEmail;

      const githubUser = {
        email: user.email,
        id: user.id,
        login: user.name,
      };

      const res = await fetch('http://scheduler-backend:6060/auth/login', {
        method: 'POST',
        body: JSON.stringify(githubUser),
        redirect: 'follow',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const token = await res.json();

      user.accessToken = await token.access_token;

      return true;
    } else if (account.provider === 'discord') {
      console.log(user, account, profile);

      const discordUser = {
        email: user.email,
        id: user.id,
        login: user.name,
      };

      const res = await fetch('http://scheduler-backend:6060/auth/login', {
        method: 'POST',
        body: JSON.stringify(discordUser),
        redirect: 'follow',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const token = await res.json();

      user.accessToken = await token.access_token;

      return true;
    }

    return false;
  },

  jwt: async function jwt({ token, user }: any) {
    if (user) {
      token = { accessToken: user.accessToken };
    }

    return token;
  },

  session: async function session({ session, token }: any) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
};

export default (req: any, res: any) => NextAuth(req, res, options);
