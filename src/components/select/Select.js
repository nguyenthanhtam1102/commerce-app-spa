import clsx from "clsx";
import { useState } from "react";

export const SelectOption = ({ option }) => {
    return (
        <div className="px-4 py-2 hover:bg-slate-100">
            {option}
        </div>
    )
}

export const SelectOptionsPanel = ({ show, options, setSelected }) => {
    return (
        <div
            className={clsx(
                `absolute text-left min-w-[12rem] top-10 right-0 rounded-lg border bg-white py-3 z-50 cursor-pointer`,
                { hidden: !show }
            )}
        >
            <ul>
                {options.map((option, index) => (
                    <li 
                        key={index}
                        onClick={() => setSelected(index)}    
                    >
                        <SelectOption option={option}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Select = ({ options, tws }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(-1);

    return (
        <div
            className="relative min-w-[10rem] text-sm font-semibold w-fit rounded-lg border px-4 py-2 flex items-center text-left"
            onClick={() => setShow(!show)}
        >
            <label className="w-full">
                {selected === -1 && "Select option"}
                {selected !== -1 &&
                    selected >= 0 &&
                    selected < options.length &&
                    options[selected]}
            </label>
            <i className="fa-solid fa-angle-down ml-2"></i>

            <SelectOptionsPanel 
                show={show} 
                options={options} 
                setSelected={setSelected}
            />
        </div>
    );
};

export default Select;
