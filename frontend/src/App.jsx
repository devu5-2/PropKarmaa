import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);

  return (


    <div className="bg-cover bg-[url('https://propkarmaa.com/wp-content/uploads/2024/05/website-banner-scaled.jpg')] font-roboto min-h-screen p-0 m-0">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
