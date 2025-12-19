// src/hooks/useBreakpoint.ts
import { useState, useEffect } from "react";

export type Breakpoint = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

export const useBreakpoint = (): Breakpoint => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setBreakpoint({
                isMobile: width <= 768,
                isTablet: width > 768 && width <= 1024,
                isDesktop: width > 1024,
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return breakpoint;
};

export default useBreakpoint;
