import React from "react";

interface KMSygnetProps {
  className?: string;
  size?: number;
}

export function KMSygnet({ className = "", size = 40 }: KMSygnetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer elegant gold circle */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="#DCAE4F"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Monogram KM in gold */}
      <path
        d="M30 32.5V68M30 52.5L58 32.5M30 52.5L55 68M44 42.5L56 56L70.5 39V68"
        stroke="#DCAE4F"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
