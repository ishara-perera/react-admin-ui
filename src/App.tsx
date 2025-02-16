import Home from "./pages/home/Home";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import Students from "./pages/students/Students.tsx";
import Student from "./pages/student/Student.tsx";
import Classrooms from "./pages/classrooms/Classrooms.tsx";
import Classroom from "./pages/classroom/Classroom.tsx";


const queryClient = new QueryClient();

function App() {
    const Layout = () => {
        return (
            <div className="main">
                <Navbar/>
                <div className="container">
                    <div className="menuContainer">
                        <Menu/>
                    </div>
                    <div className="contentContainer">
                        <QueryClientProvider client={queryClient}>
                            <Outlet/>
                        </QueryClientProvider>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/users",
                    element: <Users/>,
                },
                {
                    path: "/students",
                    element: <Students/>,
                },
                {
                    path: "/classrooms",
                    element: <Classrooms/>,
                },
                {
                    path: "/classroom",
                    element: <Classroom/>,
                },
                {
                    path: "/students/:id",
                    element: <Student/>
                },
                {
                    path: "/products",
                    element: <Products/>,
                },
                {
                    path: "/users/:id",
                    element: <User/>,
                },
                {
                    path: "/products/:id",
                    element: <Product/>,
                },
            ],
        },
        {
            path: "/login",
            element: <Login/>,
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
