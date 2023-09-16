import clsx from "clsx";
import { useCallback, useState } from "react";

const TabPanel = ({headers, contents}) => {
    const [selected, setSelected] = useState(0);

    return (
        <div className="tab-panel">
            <div className="tab-headers-container flex">
                {headers.map((header, index) => 
                    <div 
                        key={index} 
                        className={clsx(
                            'tab-header',
                            {'active': index === selected}
                        )}
                        onClick={() => setSelected(index)}
                    >{header}</div>
                )}
            </div>
            <div className="tab-contents-container">
                {contents[selected]}
            </div>
        </div>
    )
}

export default TabPanel;