"use client";
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}
// created in order to solve the hidration problem by turn down the ssr in client components
const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
