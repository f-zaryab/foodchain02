import { useEffect } from "react";
// lib
import useStore from "../../store/store";
import { Link } from "react-router-dom";

const KitchenList = () => {
  const { fetchKitchenList, kitchenList } = useStore();

  useEffect(() => {
    fetchKitchenList();
  }, [fetchKitchenList]);

  return (
    <div>
      <h1>Kitchen List</h1>
      <ul>
        {kitchenList.length > 0 &&
          kitchenList.map((item) => (
            <ul id={item.kitchen_id}>
              <Link to={`/dashboard/kitchen/${item.kitchen_id}`}>
                <div
                  style={{
                    border: "1px solid green",
                    borderRadius: "1rem",
                    padding: "1rem",
                  }}
                >
                  <p>Name: {item.name}</p>
                  <p>Postcode: {item.postcode}</p>
                  <p>ManagerID: {item.manager_id}</p>
                  <p>KitchenID: {item.kitchen_id}</p>
                  <p>Adress: {item.address}</p>
                  <p>City: {item.city}</p>
                  <p>Status: {item.status}</p>
                </div>
              </Link>
            </ul>
          ))}
      </ul>
    </div>
  );
};

export default KitchenList;
