"use server";

export const getAllUsers = async ({ token }: { token: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await res.json();

  return data;
};
