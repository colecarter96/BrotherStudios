"use client";

import Link from "next/link";
import React from "react";

type VariantLinkProps = {
  href: string;
  slug: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
};

export default function VariantLink({ href, slug, color, className, children }: VariantLinkProps) {
  const onClick = React.useCallback(() => {
    try {
      if (color) {
        window.sessionStorage.setItem(`prefColor:${slug}`, color);
      }
    } catch {
      // ignore storage errors
    }
  }, [slug, color]);

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

