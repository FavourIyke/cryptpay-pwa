import React, { useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowUp } from "react-icons/sl";

const FAQ = ({ setSupportMode }: any) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (questionNumber: number) => {
    setActiveQuestion((prevActiveQuestion) =>
      prevActiveQuestion === questionNumber ? null : questionNumber
    );
  };

  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSupportMode(1);
        }}
        className="flex items-center gap-2"
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Got any question?
      </h4>
      <div className="w-full mt-8 overflow-auto lgss:h-[700px]">
        <div
          onClick={() => toggleQuestion(1)}
          className={
            activeQuestion === 1
              ? "py-4 border-b border-gray-200 rounded-xl dark:border-gray-600 bg-[#dfdede] dark:bg-[#282828] px-4"
              : "py-4 border-b border-gray-200 dark:border-gray-600"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold text-[14px]">
              What is Celler ?
            </h4>
            {activeQuestion === 1 ? (
              <SlArrowUp className="text-gray-400 dark:text-gray-50 text-[16px]" />
            ) : (
              <SlArrowDown className="text-gray-400 dark:text-gray-50 text-[16px]" />
            )}
          </div>
          {activeQuestion === 1 && (
            <h4 className="text-left text-gray-600 dark:text-gray-400 mt-4 text-[14px]">
              Celler is a comprehensive cryptocurrency platform that allows
              users to buy, sell, swap, and deposit various cryptocurrencies. It
              also provides advanced features for managing and tracking your
              digital assets.
            </h4>
          )}
        </div>

        <div
          onClick={() => toggleQuestion(2)}
          className={
            activeQuestion === 2
              ? "py-4 mt-4 border-b border-gray-200 rounded-xl dark:border-gray-600 bg-gray-200 dark:bg-[#282828] px-4"
              : "py-6 mt-4 border-b border-gray-200 dark:border-gray-600"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold text-[14px]">
              How do I create an account on Celler ?
            </h4>
            {activeQuestion === 2 ? (
              <SlArrowUp className="text-gray-400 dark:text-gray-50 text-[16px]" />
            ) : (
              <SlArrowDown className="text-gray-400 dark:text-gray-50 text-[16px]" />
            )}
          </div>
          {activeQuestion === 2 && (
            <h4 className="text-left text-gray-600 dark:text-gray-400 mt-4 text-[14px]">
              Visit our website or open the mobile app, then click 'Sign Up' and
              enter your email, phone number, and password. Verify your email or
              phone through the received verification link or code.
            </h4>
          )}
        </div>

        <div
          onClick={() => toggleQuestion(3)}
          className={
            activeQuestion === 3
              ? "py-4 mt-4 border-b border-gray-200 rounded-xl dark:border-gray-600 bg-gray-200 dark:bg-[#282828] px-4"
              : "py-4 mt-4 border-b border-gray-200 dark:border-gray-600"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold text-[14px]">
              What cryptocurrencies can I trade on Celler ?
            </h4>
            {activeQuestion === 3 ? (
              <SlArrowUp className="text-gray-400 dark:text-gray-50 text-[16px]" />
            ) : (
              <SlArrowDown className="text-gray-400 dark:text-gray-50 text-[16px]" />
            )}
          </div>
          {activeQuestion === 3 && (
            <h4 className="text-left text-gray-600 dark:text-gray-400 mt-4 text-[14px]">
              On Celler , you can trade a variety of popular cryptocurrencies,
              including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), and Solana
              (SOL), among others. We continuously update our list to include
              new and emerging cryptocurrencies.
            </h4>
          )}
        </div>

        <div
          onClick={() => toggleQuestion(4)}
          className={
            activeQuestion === 4
              ? "py-4 mt-4 border-b border-gray-200 rounded-xl dark:border-gray-600 bg-gray-200 dark:bg-[#282828] px-4"
              : "py-4 mt-4 border-b border-gray-200 dark:border-gray-600"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold text-[14px]">
              Are my funds safe with Celler ?
            </h4>
            {activeQuestion === 4 ? (
              <SlArrowUp className="text-gray-400 dark:text-gray-50 text-[16px]" />
            ) : (
              <SlArrowDown className="text-gray-400 dark:text-gray-50 text-[16px]" />
            )}
          </div>
          {activeQuestion === 4 && (
            <h4 className="text-left text-gray-600 dark:text-gray-400 mt-4 text-[14px]">
              Yes, your funds are safe with Celler . We prioritize the security
              of your assets by employing advanced encryption protocols, secure
              storage solutions, and regular security audits. Additionally, we
              adhere to industry best practices to protect your information and
              transactions. For added security, we recommend enabling two-factor
              authentication on your account.
            </h4>
          )}
        </div>

        <div
          onClick={() => toggleQuestion(5)}
          className={
            activeQuestion === 5
              ? "py-4 mt-4 border-b border-gray-200 rounded-xl dark:border-gray-600 bg-gray-200 dark:bg-[#282828] px-4"
              : "py-4 mt-4 border-b border-gray-200 dark:border-gray-600"
          }
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold text-[14px]">
              What are the fees associated with using Celler ?
            </h4>
            {activeQuestion === 5 ? (
              <SlArrowUp className="text-gray-400 dark:text-gray-50 text-[16px]" />
            ) : (
              <SlArrowDown className="text-gray-400 dark:text-gray-50 text-[16px]" />
            )}
          </div>
          {activeQuestion === 5 && (
            <h4 className="text-left text-gray-600 dark:text-gray-400 mt-4 text-[14px]">
              Celler charges fees for certain transactions and services. These
              may include trading fees, withdrawal fees, and deposit fees, which
              vary depending on the type of transaction and the cryptocurrency
              involved.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
