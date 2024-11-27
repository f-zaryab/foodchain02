import FeaturedItems from "./components/FeaturedItems";
import MenuItemsList from "./layouts/MenuItemsList";
import "@mantine/carousel/styles.css";
import "./App.css";

// async function getUser() {
//   const url = "/api/menu/get";
//   const headers = {
//     // Authorization: "Bearer YOUR_ACCESS_TOKEN",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   };

//   try {
//     const response = await axios.get(url, { headers });
//     console.log(response?.data?.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

function App() {
  return (
    <main>
      <div>
        <FeaturedItems />
      </div>

      <MenuItemsList />
    </main>
  );
}

export default App;
