import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImagePickerItem from "./ImagePickerItem/ImagePickerItem";
import { v4 as uuidv4 } from 'uuid';
import { convertFileToBase64 } from "../../Utils/FileUtils";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createNewAsset } from '../../redux/slices/assetsSlice'
import { 
  createNewAssetApi,
  deleteAssetApi
} from '../../api/assetsApi';

const ImagePicker = ({imageList, setImageList}) => {
  
  
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets.asset)
  const isLoading = useSelector((state) => state.assets.isLoading)
  const isError = useSelector((state) => state.assets.isError)
  
  const inputImage = useRef();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...imageList];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    reorderedItems.forEach((item, index) => {
      item.index = index;
    });

    setImageList(reorderedItems);
  };

  const handleAddImage = async (file) => {
      let base64 = await convertFileToBase64(file);
      base64 = base64.replace(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, '');

      const response = await createNewAsset({
        filename: file.name,
        contents: base64
      })

      setImageList([...imageList, response.data])
  }

  const handleDeleteImage = async (id) => {
    const response = await deleteAssetApi(id)
    
    if(response?.status >= 200) {
      setImageList([...imageList.filter(item => item.id !== id)])
    }
  };

  const handleCreateNewAssets = () => {
    imageList.map(item => {
      dispatch(createNewAsset({
        filename: item.image.name,
        contents: convertFileToBase64(item.image)
      }))
    })
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ROOT" type="group" direction="both">
          {(provided) => (
            <div
              className="grid grid-cols-7 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageList.map((image, index) => (
                <Draggable 
                    draggableId={image.id} 
                    index={index} 
                    key={image.id}>
                    {(provided) => (
                        <div
                        className={`${index === 0 && "col-span-2 row-span-2"}`}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        >
                            <ImagePickerItem data={image} handleDeleteImage={handleDeleteImage} />
                        </div>
                    )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <label className="text-xs font-semibold" htmlFor="input-image">
        Browse from device
        <img
          className="mx-auto mt-3"
          src="https://prium.github.io/phoenix/v1.11.0/assets/img/icons/image-icon.png"
          alt="Browse from device"
        />
      </label>
      <input
        ref={inputImage} 
        id="input-image" type="file" hidden onChange={(e) => {e.target.files && e.target.files.length > 0 && handleAddImage(e.target.files[0])}}/>
    </>
  );
};

export default ImagePicker;
