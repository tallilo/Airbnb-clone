import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";

import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Iparams {
  listingId?: string;
}

export default async function page({ params }: { params: Iparams }) {
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={currentUser}
      />
    </div>
  );
}
