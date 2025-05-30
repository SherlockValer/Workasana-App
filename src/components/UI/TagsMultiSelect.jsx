import { useState } from "react";
// import { getTags } from "../../services/tagsAPI";
import { FaCaretDown } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { tags, colorMap } from "../../utils/getTagData";

const TagsMultiSelect = ({ tagList, selectedTags, selectTags }) => {
  // const [tagList, setTagList] = useState([]);

  const [isOpen, setOpen] = useState(false);

  // const getTagsList = async () => {
  //   try {
  //     const response = await getTags();
  //     if (response.status === 200) {
  //       console.log(response.data);
  //       setTagList(response.data.data.tags);
  //     }
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  // useEffect(() => {
  //   getTagsList();
  // }, []);

  const handleTagCheckbox = (e) => {
    const { checked, value } = e.target;
    checked
      ? selectTags((prev) => [...prev, value])
      : selectTags((prev) => prev.filter((tag) => tag !== value));
  };

  const handleDeleteSelect = (e, tagName) => {
    e.stopPropagation();
    selectTags((prev) => prev.filter((tag) => tag !== tagName));
  };

  return (
    <div className="col-span-2">
      <label
        htmlFor="tags"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select Tags
      </label>

      <div className="w-full">
        <div
          onClick={() => setOpen((isOpen) => !isOpen)}
          className="h-auto flex justify-between align-middle bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm p-2.5 cursor-pointer"
        >
          <div className="flex flex-wrap gap-1">
            {selectedTags?.length !== 0
              ? selectedTags?.map((tag) => {
                  const tagData = tags.find((t) => t.name === tag);
                  const className =
                    colorMap[tagData.color] || "bg-gray-500 text-white";
                  return (
                    <div
                      className={`${className} flex gap-1 leading-none p-2  rounded-sm shadow-lg`}
                    >
                      <div>{tag}</div>
                      <BsX
                        onClick={(e) => handleDeleteSelect(e, tag)}
                        className="cursor-pointer"
                      />
                    </div>
                  );
                })
              : "Add Tags"}
          </div>
          <div>
            <FaCaretDown className="text-base" />
          </div>
        </div>
        <div className="w-full relative">
          {isOpen && (
            <div className="absolute top-2 z-10 left-0 grid grid-cols-3 gap-y-2 justify-items-center bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-sm w-full p-2.5">
              {tagList?.length !== 0 &&
                tagList?.map((tag) => (
                  <label
                    key={tag._id}
                    htmlFor={tag.name}
                    className="w-25 flex align-middle gap-2"
                  >
                    <input
                      type="checkbox"
                      value={tag.name}
                      id={tag.name}
                      checked={selectedTags.includes(tag.name)}
                      onChange={(e) => handleTagCheckbox(e)}
                    />
                    {tag.name}
                  </label>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsMultiSelect;
