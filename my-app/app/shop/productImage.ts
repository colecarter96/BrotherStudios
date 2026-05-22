import type { CSSProperties } from "react";

/** Edge clip on slug PDP images with `aspect: "auto"` only (shop grid is separate). */
export const SLUG_AUTO_EDGE_TRIM_X_PCT = 3;
export const SLUG_AUTO_EDGE_TRIM_Y_PCT = 15;

export function slugAutoEdgeTrimStyle(): CSSProperties {
  return {
    clipPath: `inset(${SLUG_AUTO_EDGE_TRIM_Y_PCT}% ${SLUG_AUTO_EDGE_TRIM_X_PCT}% ${SLUG_AUTO_EDGE_TRIM_Y_PCT}% ${SLUG_AUTO_EDGE_TRIM_X_PCT}%)`,
  };
}
