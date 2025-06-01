import React, {createContext, ReactNode, useContext} from 'react';
import useBreakpoint from '../hooks/useBreakPoint.ts';

type BreakpointContextType = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

const BreakpointContext = createContext<BreakpointContextType | null>(null);

export const BreakpointProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const breakpoints = useBreakpoint();
    return (
        <BreakpointContext.Provider value={breakpoints}>
            {children}
        </BreakpointContext.Provider>
    );
};

export const useBreakpointContext = (): BreakpointContextType => {
    const context = useContext(BreakpointContext);
    if (!context) {
        throw new Error('useBreakpointContext must be used within a BreakpointProvider');
    }
    return context;
};