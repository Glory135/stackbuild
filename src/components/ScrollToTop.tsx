'use client'

import { toTop } from "@/utils/utilityFunctions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    toTop()
  }, [pathname]);

  return null;
};

export default ScrollToTop;
