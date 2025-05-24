import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

export function calculateMortgage(price: number, downPayment: number, interestRate: number, years: number): number {
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const mortgage = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(mortgage);
}

export const propertyTypes = [
  "Single-Family Home",
  "Multi-Family",
  "Condo",
  "Townhouse",
  "Commercial",
  "Vacant Land"
];

export const neighborhoods = [
  "The Fan District",
  "Scott's Addition",
  "Manchester",
  "Church Hill",
  "Shockoe Bottom",
  "Short Pump",
  "Midlothian",
  "West End",
  "Highland Springs",
  "Sandston",
  "North Richmond",
  "South Richmond",
  "Museum District",
  "Jackson Ward",
  "Oregon Hill"
];

export const distressedTypes = [
  "Pre-Foreclosure",
  "Foreclosure",
  "Bank-Owned (REO)",
  "Short Sale",
  "Probate",
  "Tax Lien",
  "Fixer-Upper"
];