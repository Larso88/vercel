import {
    createContext,
    useContext,
    type ReactNode,
    type FC,
} from "react";
import useBreakpoint, { type Breakpoint } from "../hooks/useBreakpoint";

type BreakpointContextType = Breakpoint;

const BreakpointContext = createContext<BreakpointContextType | null>(null);

export const BreakpointProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
        throw new Error("useBreakpointContext must be used within a BreakpointProvider");
    }

    return context;
};
