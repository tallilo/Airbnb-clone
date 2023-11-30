import React from "react";
import EmptyState from "../components/EmptyState";
import getFavoriteListing from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";
export default async function page() {
  const listings = await getFavoriteListing();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like tou have no favorites listings"
      />
    );
  }
  return <FavoriteClient listings={listings} currentUser={currentUser} />;
}
//
