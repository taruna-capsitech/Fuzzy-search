import React from "react";
// import accounts from './assets/accountDB.json';
import newAccountDB from './assets/newAccountDB.json';
import { ReactSelectDropDown } from "./Components/ReactSelectDropDown";

export default function App() { 

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 25,
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            gap: 10,
          }}
        >
          <label>Flex search</label>
          <ReactSelectDropDown options={newAccountDB}/>
        </div>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            gap: 10,
          }}
        >
          <label>Fuse search</label>
          <CustomDropdown
            options={accounts}
            isFuse={true}
            isElasticLunr={false}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            gap: 10,
          }}
        >
          <label>Elasticlunr search</label>
          <CustomDropdown
            options={accounts}
            isFuse={false}
            isElasticLunr={true}
          />
        </div>*/}
      </div> 
    </>
  );
}
