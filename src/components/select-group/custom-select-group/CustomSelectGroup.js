import React, { useEffect, useState } from "react"

export const CustomSelectOptions = ({className, children, selectedOption, handleSelect, isShow}) => {
    const selectOptions = [];

    React.Children.forEach(children, (child) => {
        if(React.isValidElement(child)) {
            if(child.type === CustomSelectOption) {
                const { value } = child.props;
                const isSelected = (selectedOption && selectedOption.value === value);
    
                selectOptions.push(
                    React.cloneElement(child, {
                        isSelected,
                        onClick: handleSelect
                    })
                );
            }
        }
    });

    return (
        <div className={(`
            select-options absolute 
            ${className}
            ${isShow ? 'block' : 'hidden'}    
        `).trim()}>
            {selectOptions}
        </div>
    )
}

export const CustomSelectOption = ({className, children, value, isSelected, onClick}) => {
    return (
        <div 
            className={(`select-option ${className} ${isSelected ? 'selected' : ''}`).trim()}
            onClick={() => onClick({value, option: children})}
        >
            {children}
        </div>
    )
}

export const CustomSelectBox = ({className, children, onClick}) => {
    return (
        <div
            className={(`select-box ${className}`).trim()}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

const CustomSelectGroup = ({className, children, defaultSelected, handleSelectedChange}) => {
    let selectBox = null;
    let selectOptions = null;

    const [selectOptionsShow, setSelectOptionsShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (selectOption) => {
        setSelectedOption(selectOption);
        setSelectOptionsShow(false);
        if(handleSelectedChange) {
            handleSelectedChange(selectOption);
        }
    }

    React.Children.forEach(children, (child) => {
        if(React.isValidElement(child)) {
            if(child.type === CustomSelectBox) {
                selectBox = React.cloneElement(
                    child,
                    selectedOption 
                    ? {children: selectedOption.option, onClick: () => setSelectOptionsShow(!selectOptionsShow)}
                    : {onClick: () => setSelectOptionsShow(!selectOptionsShow)}
                )
            } 
            else if(child.type === CustomSelectOptions) {
                selectOptions = React.cloneElement(
                    child, 
                    {selectedOption, handleSelect, isShow: selectOptionsShow}
                );
            }
        }
    });

    useEffect(() => {
        setSelectedOption(defaultSelected);
    }, [defaultSelected]);

    return (
        <div className={(`select-group relative cursor-pointer select-none ${className}`).trim()}>
            {selectBox}
            {selectOptions}
        </div>
    )
}

export default CustomSelectGroup;