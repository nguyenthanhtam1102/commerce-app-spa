import { useEffect, useState } from "react"
import CustomCheckbox from '../../../../checkbox/custom-checkbox/CustomCheckbox';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchCategories } from "../../../../../redux/slices/categoriesSlice";

const CategorySelect = ({handleSelectedChange}) => {
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [show, setShow] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const {categories, loading, error} = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const handleToggleShow = () => {
        setShow(!show);
    };

    const handleCategoriesSelectedChange = (category, checked) => {
        let categoriesSelectedCopy = [...categoriesSelected];
        if(checked) {
            categoriesSelectedCopy.push(category);
            setCategoriesSelected(categoriesSelectedCopy);
        } else {
            let index = categoriesSelectedCopy.findIndex(item => item.id === category.id);
            if(index >= 0) {
                categoriesSelectedCopy.splice(index, 1);
                setCategoriesSelected(categoriesSelectedCopy);
            }
        }

        handleSelectedChange(categoriesSelectedCopy);
    }

    const handleSearchInputChange = (event) => {
        setSearchKey(event.target.value);
    }

    const handleSearchInputKeyPress = (event) => {
        if(event.key === 'Enter') {

        }
    }

    useEffect(() => {
        dispatch(fetchCategories({}));
    }, [])

    return (
        <div className="category-select relative text-sm">
            <div 
                className="category-select-box px-4 py-2 border rounded-md select-none"
                onClick={handleToggleShow}
            >
                {categoriesSelected.length > 0 
                ? categoriesSelected.reduce((result, currentItem) => currentItem.name + ', ' + result, '')
                : 'Choose Category'}
            </div>
            <div className={`category-select-options absolute w-full mt-1 p-4 border rounded-md shadow-md bg-white
                ${show ? 'block' : 'hidden'}
            `}>
                <div>
                    <input 
                        className="text-xs px-4 py-2 border border-slate-400 rounded-md outline-none w-full" 
                        type="search" 
                        placeholder="Search Category"
                        value={searchKey}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleSearchInputKeyPress}
                    />
                </div>
                <div className="mt-2">
                    {loading 
                    ? <i className="fa-duotone fa-spinner-third mx-auto animate-spin"></i>
                    : categories && categories.map((category) => (
                        <div key={category.id}>
                            <CustomCheckbox
                                className={'py-1.5'}
                                label={category.name}
                                checkedIcon={<i className="fa-solid fa-check mr-2"></i>}
                                notCheckedIcon={<i className="fa-regular fa-square mr-2"></i>}
                                handleCheckedChange={(checked) => {
                                    handleCategoriesSelectedChange({id: category.id, name: category.name}, checked);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySelect;