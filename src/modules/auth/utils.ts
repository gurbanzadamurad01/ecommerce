import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();

  console.log("value: ", value);
  console.log("prefix: ", prefix);

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    ...(process.env.NODE_ENV === "production" && {
      domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    }),
  });
};
