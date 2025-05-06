// components/Layout/LayoutWrapper.tsx
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const LayoutWrapper = ({ children }: Props) => {
    return (
        <div className="transition-all duration-300 ease-in-out pl-0 md:pl-[120px]">
            {children}
        </div>
    );
};
