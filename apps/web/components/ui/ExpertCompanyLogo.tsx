import React from "react";

interface ExpertCompanyLogoProps {
  className?: string;
  size?: number;
  variant?: "white" | "navy";
}

export function ExpertCompanyLogo({
  className = "",
  size = 34,
  variant = "white",
}: ExpertCompanyLogoProps) {
  const strokeColor = variant === "white" ? "#FFFFFF" : "#0F2A5C";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Expert Company Logo"
    >
      {/* 3 Skyscraper / architectural outline silhouettes matching mockup */}
      <path
        d="M6 31V16L12 11V31"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 31V7L21 7V31"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 31V14L28 18V31"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base line */}
      <path
        d="M4 31H30"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Architectural window accent cuts */}
      <line
        x1="17"
        y1="12"
        x2="17"
        y2="26"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="19"
        x2="9"
        y2="26"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="22"
        x2="25"
        y2="26"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
