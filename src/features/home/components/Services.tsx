"use client";

import Image from "next/image";
import SaudiImg from "../../../../public/assets/imgs/saudi-riyal-svgrepo-com (1).svg";
import { MdFactCheck } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { BiBrain } from "react-icons/bi";
import { SectionTitle } from "@/components/common/SectionTitle";
import { motion } from "framer-motion";

export const Services = () => {
  const SERVICES_DATA = [
    {
      id: 1,
      title: "Built for KSA's market",
      description:
        "Specially designed for KSA businesses to automatically fulfill all ZATCA e-invoicing requirements",
    },
    {
      id: 2,
      title: "Payments & ZATCA Compliance",
      description:
        "From secure payments to automated tax submissions, Faotarah ensures your business meets Saudi Arabia's e-invoicing regulations without hassle",
      icon: <MdFactCheck size={40} />,
    },
    {
      id: 3,
      title: "Secure Payments",
      description:
        "Safeguard your transactions with advanced payment security while Faotarah automates your tax compliance, ensuring full alignment with ZATCA regulations in Saudi Arabia",
      icon: <GoShieldCheck size={40} />,
    },
    {
      id: 4,
      title: "Smart Payments",
      description:
        "Simplify transactions and stay ZATCA-compliant with Faotarah, your all-in-one payment and tax solution for KSA businesses",
      icon: <BiBrain size={40} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        easeOut: true,
      },
    },
  };

  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-main-green/5 to-transparent" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex justify-center text-center"
        >
          <SectionTitle
            title="Why Faotarah"
            description="Fast and secure – empowering your business to grow effortlessly."
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-main-green/20 to-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative flex flex-col gap-5 justify-center bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-10 rounded-3xl border border-gray-800 group-hover:border-main-green/30 transition-all duration-300 h-full overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-main-green/5 rounded-full blur-3xl" />

                {/* Icon container */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-2xl bg-main-green/10 border border-main-green/20 group-hover:bg-main-green/20 group-hover:scale-110 transition-all duration-300">
                    {service.icon ? (
                      <div className="">{service.icon}</div>
                    ) : (
                      <Image height={40} src={SaudiImg} alt="SAUDI-IMG" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3  transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-main-green to-emerald-400 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
