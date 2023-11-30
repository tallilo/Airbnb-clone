"use client";
import React from "react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { safeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import toast from "react-hot-toast";

interface ReservationClientProps {
  reservations: safeReservation;
  currentUser: SafeUser | null;
}

export default function ReservationsClient({
  reservations,
  currentUser,
}: ReservationClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("reservation Cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
