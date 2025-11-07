"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import FAQsImg from "../../../../public/assets/imgs/undraw_correct-answer_vjt7.svg";
import { SectionTitle } from "@/components/common/SectionTitle";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export const FAQs = () => {
  const FAQS_DATA = [
    {
      id: 1,
      question: "Is Faotarah ZATCA compliant?",
      answer:
        "Yes, Faotarah is fully ZATCA-compliant and automatically fulfills all Saudi Arabia e-invoicing requirements, ensuring your business stays regulation-ready.",
    },
    {
      id: 2,
      question: "What payment methods does Faotarah support?",
      answer:
        "Faotarah supports all major payment methods including Mada, Visa, Mastercard, Apple Pay, and more. All transactions are secure and Sharia-compliant.",
    },
    {
      id: 3,
      question: "How secure are the transactions?",
      answer:
        "We use advanced encryption and security protocols to safeguard all transactions. Your data and your customers' payment information are protected with industry-leading security measures.",
    },
    {
      id: 4,
      question: "Can I track my transactions in real-time?",
      answer:
        "Yes, our comprehensive dashboard provides real-time transaction tracking, detailed analytics, and financial reports to help you make informed business decisions.",
    },
  ];

  return (
    <div className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-main-green/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex justify-center text-center"
        >
          <SectionTitle
            title="Frequently Asked Questions"
            description="Answers for most common questions about Faotarah"
          />
        </motion.div>

        <div className="flex items-start justify-center gap-20 flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 max-w-lg relative hidden lg:block"
          >
            <div className="sticky top-32">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-main-green/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative p-8 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-3xl border border-gray-800">
                  <Image
                    src={FAQsImg}
                    alt="FAQs"
                    width={480}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-6 bg-gradient-to-br from-main-green/10 to-transparent rounded-2xl border border-main-green/20"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-main-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Still have questions?
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Can&apos;t find the answer you&apos;re looking for? Feel
                      free to reach out to our support team.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 max-w-2xl w-full"
          >
            <Accordion type="single" collapsible className="w-full">
              <div className="flex flex-col gap-4">
                {FAQS_DATA.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${faq.id}`}
                      className="border border-gray-800 rounded-2xl px-6 bg-gradient-to-br from-[#1a1a1a] to-[#151515] hover:border-main-green/30 transition-all duration-300 overflow-hidden"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:text-main-green transition-colors py-6 hover:no-underline">
                        <span className="text-left">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </div>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
