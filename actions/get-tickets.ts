"use server";

export const getAllTickets = async ({ token }: { token: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await res.json();

  return data;
};
