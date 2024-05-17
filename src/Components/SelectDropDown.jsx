import React, { useState } from "react";
import "./CustomDropdown.css"; // Import CSS file for styling
import useFlexSearch from "../hooks/useFlexSearch";
import useFuseSearch from "../hooks/useFuseSearch";
import useElasticLunrSearch from "../hooks/useElasticLunr";

const CustomDropdown = ({ options, isFuse, isElasticLunr }) => {
  const { onSearch, flexResult } = useFlexSearch({ initialOptions: options, limit: 1800 });
  const { onFuseSearch, fuseResult } = useFuseSearch({ initialOptions: options });
  const { onElasticLunrSearch, elasticlunrResult } = useElasticLunrSearch({ initialOptions: options });
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [list, setList] = useState();

  React.useEffect(() => {
    if(flexResult || fuseResult || elasticlunrResult){
      let newList = (!isFuse && !isElasticLunr) ? flexResult : isFuse ? fuseResult : elasticlunrResult;
      if(newList && newList?.length > 0){
        let groupedData = newList?.reduce((acc, obj) => {
          const { group, ...rest } = (!isFuse && !isElasticLunr) ? obj?.doc : isFuse ? obj?.item : obj;
          acc[group] = acc[group] || { name: group, itms: [] };
          acc[group].itms.push(rest);
          return acc;
        }, {});
        setList(Object.values(groupedData));
      }
    }
  }, [elasticlunrResult, flexResult, fuseResult, isElasticLunr, isFuse])

  const handleInputChange = (event) => {
    setShowOptions(true);
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleFuseSearch = (e) => {
    setShowOptions(true);
    setInputValue(e.target.value);
    onFuseSearch(e.target.value);
  }

  const handleElasticSearch = (e) => {
    setShowOptions(true);
    setInputValue(e.target.value);
    onElasticLunrSearch(e.target.value);
  }

  const handleOptionClick = (option) => {
    setInputValue(`${option?.name} - ${option?.code}`);
    setShowOptions(false);
  };
  
  return (
    <div className="custom-dropdown">
      <input
        type="text"
        value={inputValue}
        onFocus={(!isFuse && !isElasticLunr) ? handleInputChange : isFuse ? handleFuseSearch : handleElasticSearch}
        onChange={(!isFuse && !isElasticLunr) ? handleInputChange : isFuse ? handleFuseSearch : handleElasticSearch}
        placeholder="Type to search..."
        className="dropdown-input"
      />
      {showOptions && <ul className="dropdown-options">
        {list && list?.length > 0 && list?.map((group) => (
          <>
            <li key={group?.name} style={{background: '#afd0f0'}}>{group?.name}</li>
            {group?.itms && group?.itms?.length > 0 && group?.itms?.map((itm) => (
              <li key={itm?.id} onClick={() => handleOptionClick(itm)}>
                {`${itm?.name} - ${itm?.code}`}
              </li>
            ))}
          </>
        ))}
      </ul>}
    </div>
  );
};

export default CustomDropdown;
