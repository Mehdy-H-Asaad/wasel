import Image from "next/image";
import riyalIcon from "../../../public/assets/imgs/saudi-riyal-svgrepo-com (1).svg";
import { SaudiRiyalIcon } from "lucide-react";
type CurrencyProps = {
  value: number;
  locale?: string;
};

export const FormatRiyal = ({ value, locale = "en-US" }: CurrencyProps) => {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <span className="inline-flex items-center gap-1">
      {/* <Image
        src={riyalIcon}
        alt="SAR"
        width={14}
        height={14}
        style={{ verticalAlign: "middle" }}
      /> */}
      <SaudiRiyalIcon className="w-4 h-4" />
      {formatted}
    </span>
  );
};
