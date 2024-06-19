import React, { useState, useEffect } from 'react';
import useFlexSearch from "../hooks/useFlexSearch";
import Select from 'react-select'

export const ReactSelectDropDown = ({options}) => {
    const [ inputValue, setInputValue ] = useState(''); 
    const { onSearch, flexResult } = useFlexSearch({ initialOptions: options, limit: 1800 });
    const [list, setList] = useState();

    useEffect(() => {
        if(flexResult){
          if(flexResult && flexResult?.length > 0) setList(flexResult);
        }
      }, [flexResult]);

    return(
        <Select 
          styles={{groupHeading: (p) => ({...p, color: '#0078d4', fontWeight: 'bold'})}}
          inputValue={inputValue} 
          options={list} 
          placeholder='Search...' 
          filterOption={(options, inputValue) => flexResult}
          onInputChange={(newValue, {action}) => {
            if(action === 'input-change'){
              setInputValue(newValue);
              onSearch(newValue);
            }
          }}
        />
    )
}