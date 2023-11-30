import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("invalid ID");
  }

  let favoritesIds = [...(currentUser.favoritesIds || [])];

  favoritesIds.push(listingId);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesIds,
    },
  });
  return NextResponse.json(user);
}
export async function DELETE(req: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }

  let favoritesIds = [...(currentUser.favoritesIds || [])];

  favoritesIds = favoritesIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoritesIds,
    },
  });
  return NextResponse.json(user);
}
