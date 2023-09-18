import { useState } from "react";

const CustomCheckbox = ({className, label, checkedIcon, notCheckedIcon, defaultChecked = false, handleCheckedChange}) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleToggleChecked = () => {
        setChecked(!checked);
        if(handleCheckedChange) {
            handleCheckedChange(!checked);
        }
    }

    return (
        <div className={(`checkbox flex items-center justify-center w-fit ${className}`).trim()}>
            <div 
                className={(`${checked ? 'block' : 'hidden'}`).trim()}
                onClick={handleToggleChecked}
            >
                {checkedIcon}
            </div>
            <div 
                className={(`${checked ? 'hidden' : 'block'}`).trim()}
                onClick={handleToggleChecked}
            >
                {notCheckedIcon}
            </div>
            <div
                onClick={handleToggleChecked}
            >
                <label className="select-none">{label}</label>
            </div>
        </div>
    );
}

export default CustomCheckbox;