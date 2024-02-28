import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Square = ({ children }: Props) => {
    return (
        <div className='h-36 border-solid border-4 border-slate-400 font-display text-7xl text-center flex justify-center items-center cursor-pointer'>
            <span>{children}</span>
        </div>
    );
};

export default Square;
