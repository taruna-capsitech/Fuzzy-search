import React from "react";
import CustomDropdown from "./Components/SelectDropDown";
import accounts from './assets/accountDB.json';

export default function App() { 
  // const [options, setOptions] = React.useState();

  // const getData = async() => {
  //   try{
  //     const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4NzRDNkMwQTM4RjUwNjQxQkMyMjEwRUM2Mjg0QzE1IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2FjY291bnRzdWF0LmFjdGluZ29mZmljZS5jb20vIiwibmJmIjoxNzE1NTgwNzY0LCJpYXQiOjE3MTU1ODA3NjQsImV4cCI6MTcxNTU4NDM2NCwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoid2ViIiwic3ViIjoiNjBhZjYyZTIxZGJlNjQxMWIwNTYyMzIxIiwiYXV0aF90aW1lIjoxNzE0OTc2MDM1LCJpZHAiOiJsb2NhbCIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiMjAwOGY1MTItMjIwNC00ZTA0LWJkZDYtZjdjMjgwZWZhMGE5Iiwicm9sZSI6WyJBRE1JTiIsIk1BTkFHRVIiLCJBTExDTElFTlRTIiwiUkVWSUVXRVIiLCJBVURJVE9SIiwiQ0FMTEFHRU5UIiwiQ0FMTE1PTklUT1IiLCJDSEFUQUdFTlQiLCJDSEFUTU9OSVRPUiIsIkZST05URU5EIiwiQkFDS0VOREFDQ09VTlRBTlQiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoibXVrZXNoQGNhcHNpdGVjaC5jb20iLCJuYW1lIjoibXVrZXNoQGNhcHNpdGVjaC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiOTQxMzU3MDc5MzYiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJnaXZlbl9uYW1lIjoiTXVrZXNoIEphbmdpZCIsInAiOiIyIiwibXRlYW0iOiIxIiwidGVhbXMiOiI1YjQ2MmJkM2U0ZmU1YzJlZmM1Njk5NTAiLCJ0cm9sZSI6IjMiLCJzaWQiOiIwMUJBRjEyMUU1MzY4MUIyQ0U3MEFFMzlBRUZGQjhFMyJ9.GZTyE4CZWBgZ20WqP1Csl2ok2yVn4j5qpXkcbkd7QBoysZJehv1X74CYlK0WEnux8HbRB-OdPA29EpeV-LyT34fuwJBkBfCCk-akLclgktIZrHbfRDLuVjYuNVey5_5xpvpn3UtWIYf3sBVYC_gY81xGwzd5zReCBkbCCTw8oHIJcCwtxyYvNYqj_By3uNQqGun41-zIdSB6uJPnhNVP2MO1d59noLPy0bTV96QhjIeqNIrXuLYSnJ1a4EC2bFt90fWU4VNC1mpeKHasr4KMj0Qe-1rbEJ-ahaPLnrQtdbqRM6yZFm3NTWbi6tgoTw010S53lptvF0vyQsdm7ggMJg"
  //     const axiosInstance = axios.create({
  //       baseURL: `https://localhost:5004`,
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     let response = await axiosInstance.get(`/AccountsProduction/Clients/5ce8ecd9bca2320eb462afa8/Accounts?start=0&length=1500&search=&sortCol=code&sortDir=asc&accountTypeId=0&businessType=0&status=&accountGroupId=0`);
  //     // let newItems = response?.data?.result?.items?.map((itm) => ({ value: itm?.id, label: itm?.name }));
  //     if(response?.data?.result?.items) setOptions(response?.data?.result?.items);
  //   }
  //   catch(err){
  //     console.log(err ?? 'something went wrong');
  //   }
  // }
  
  // React.useEffect(() => {
  //   getData();
  // }, [])

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
          <CustomDropdown
            options={accounts}
            isFuse={false}
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
        </div>
      </div>
    </>
  );
}
