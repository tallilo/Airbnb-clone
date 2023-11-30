"use cleint";
import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

export default function ListingCategory({
  icon: Icon,
  description,
  label,
}: ListingCategoryProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
}
