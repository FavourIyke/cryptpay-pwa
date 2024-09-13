import React, { useEffect, useState } from "react";

export const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);

  useEffect(() => {
    // Safe Area Insets (for iOS)
    const safeAreaTop = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--safe-area-inset-top");

    if (safeAreaTop) {
      setStatusBarHeight(parseInt(safeAreaTop, 10));
    } else {
      // Fallback calculation if `safe-area-inset-top` is not available
      const calculatedHeight = window.outerHeight - window.innerHeight;
      setStatusBarHeight(calculatedHeight > 0 ? calculatedHeight : 20); // Default to 20px if no insets
    }
  }, []);

  return statusBarHeight;
};
