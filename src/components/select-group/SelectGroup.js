import CustomSelectGroup, { CustomSelectBox, CustomSelectOption, CustomSelectOptions } from './custom-select-group/CustomSelectGroup';

const SelectGroup = ({className, options, handleSelectedChange}) => {
    return (
        <CustomSelectGroup
            className={`${className}`}
            handleSelectedChange={handleSelectedChange}
        >
            <CustomSelectBox
                className={`border rounded-md px-4 py-2 w-fit bg-white`}
            >
                Choose Item
            </CustomSelectBox>
            <CustomSelectOptions
                className={`border rounded-md py-2 mt-1 bg-white z-50`}
            >
                {options.map((option, index) => (
                    <CustomSelectOption
                        className={`px-4 py-2 hover:bg-slate-100`} 
                        key={index}
                        value={index}    
                    >   
                        {option}
                    </CustomSelectOption>
                ))}
            </CustomSelectOptions>
        </CustomSelectGroup>
    )
}

export default SelectGroup;