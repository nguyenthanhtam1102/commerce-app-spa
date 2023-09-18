import './ImagePickerItem.scss';


const ImagePickerItem = ({data, handleDeleteImage}) =>  {
    return (
        <div className="image-picker-item relative w-full h-full">
            <img
                className="w-full h-full rounded-md border-2"
                src={data.url} alt=""
            />
            <div className="image-picker-item-eclipse w-full h-full bg-slate-400 opacity-50 absolute top-0 left-0 rounded-md">
                <div className="relative w-full h-full flex justify-center items-center">
                    <svg className="w-7 h-5 absolute top-1.5 right-1.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        onClick={() => handleDeleteImage(data.id)}
                    >
                        <path fill="currentColor" d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875L6.187 8zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h3zm-9 0h4V4h-4v1z"/>
                    </svg>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4L8 1m0 0v5m0-5L5 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M8 15l-.53.53a.75.75 0 001.06 0L8 15zm-3.53-2.47l3 3 1.06-1.06-3-3-1.06 1.06zM8.75 15v-5h-1.5v5h1.5zm-.22.53l3-3-1.06-1.06-3 3 1.06 1.06z" fill="currentColor"></path>
                        <path d="M12 11l3-3m0 0h-5m5 0l-3-3M4 5L1 8m0 0h5M1 8l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ImagePickerItem;