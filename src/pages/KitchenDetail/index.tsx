import { useEffect } from "react";
import { useParams } from "react-router-dom";
// src
import useStore from "../../store/store";

const KitchenDetailPage = () => {
  const { id } = useParams();
  const { kitchenDetail, fetchSingleKitchenDetail } = useStore();

  useEffect(() => {
    if (id) {
      fetchSingleKitchenDetail(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Kitchen detail Page</h1>
      <p>ID: {id}</p>
      {kitchenDetail.length > 0 && (
        <div>
          <p>Name: {kitchenDetail[0].name}</p>
          <p>KitchenID: {kitchenDetail[0].kitchen_id}</p>
          <p>ManagedID: {kitchenDetail[0].manager_id}</p>
          <p>Phone: {kitchenDetail[0].phone}</p>
          <p>Status: {kitchenDetail[0].status}</p>
          <p>Adress: {kitchenDetail[0].address}</p>
          <p>City: {kitchenDetail[0].city}</p>
          <p>Postcode: {kitchenDetail[0].postcode}</p>
          <p>Status: {kitchenDetail[0].status}</p>
        </div>
      )}
    </div>
  );
};

export default KitchenDetailPage;
