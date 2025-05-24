"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, calculateMortgage } from "@/lib/utils";

interface MortgageCalculatorProps {
  propertyPrice: number;
  className?: string;
}

const MortgageCalculator = ({ propertyPrice, className = "" }: MortgageCalculatorProps) => {
  const [price, setPrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const payment = calculateMortgage(price, downPayment, interestRate, loanTerm);
    setMonthlyPayment(payment);
  }, [price, downPayment, interestRate, loanTerm]);

  const handlePriceChange = (value: number) => {
    setPrice(value);
    setDownPayment((value * downPaymentPercent) / 100);
  };

  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    setDownPaymentPercent(Math.round((value / price) * 100));
  };

  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    setDownPayment((price * value) / 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#003366] dark:text-[#0066CC] flex items-center justify-center">
          <Calculator className="h-6 w-6 mr-2 text-[#FFC107]" />
          Mortgage Calculator
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Estimate your monthly mortgage payments for this property.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            Property Price
          </label>
          <Input
            type="number"
            value={price}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="mb-1"
          />
          <Slider
            value={[price]}
            min={100000}
            max={2000000}
            step={5000}
            onValueChange={(value) => handlePriceChange(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$100,000</span>
            <span>$2,000,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            Down Payment: {formatCurrency(downPayment)} ({downPaymentPercent}%)
          </label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
            className="mb-1"
          />
          <Slider
            value={[downPaymentPercent]}
            min={5}
            max={50}
            step={1}
            onValueChange={(value) => handleDownPaymentPercentChange(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Percent className="h-4 w-4 mr-1 text-gray-500" />
            Interest Rate: {interestRate}%
          </label>
          <Slider
            value={[interestRate]}
            min={2}
            max={10}
            step={0.1}
            onValueChange={(value) => setInterestRate(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2%</span>
            <span>10%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            Loan Term: {loanTerm} years
          </label>
          <Slider
            value={[loanTerm]}
            min={15}
            max={30}
            step={5}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>15 years</span>
            <span>30 years</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-[#003366] dark:text-[#0066CC]">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Principal and Interest only. Taxes and insurance not included.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Loan Amount</p>
            <p className="font-semibold">{formatCurrency(price - downPayment)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total Interest</p>
            <p className="font-semibold">
              {formatCurrency(monthlyPayment * loanTerm * 12 - (price - downPayment))}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MortgageCalculator;