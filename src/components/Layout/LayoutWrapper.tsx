type Props = {
    children: React.ReactNode;
};

export const LayoutWrapper = ({ children }: Props) => {
    return (
        <div
            style={{
                paddingLeft: window.innerWidth >= 768 ? '120px' : '0px',
                transition: 'padding 0.3s ease',
            }}
        >
            {children}
        </div>
    );
};
