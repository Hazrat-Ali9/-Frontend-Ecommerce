import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewProduct from "../Product/NewProduct";
import useProduct from "../../Hook/useProduct";
import NewHome from "./Details/NewHome";
import LpgDetails from "./Details/LpgDetails";
import FavDetails from "./Details/FavDetails";
import SpecialDetails from "./Details/SpecialDetails";
import ExclusiveDetails from "./Details/ExclusiveDetails";
import MostDetails from "./Details/MostDetails";
import TradingDEtails from "./Details/TradingDEtails";
import PopularDetails from "./Details/PopularDetails";
import FlashDEtails from "./Details/FlashDEtails";
import AllDetails from "./Details/AllDetails";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Home = () => {
  const [products] = useProduct();
  const [items, setItems] = useState([]);
  const [user, userLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const navigate = useNavigate();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const initialCountdown = { hours: 5, minutes: 0, seconds: 0 };
  const [countdown, setCountdown] = useState(
    JSON.parse(localStorage.getItem("countdown")) || initialCountdown
  );

  const [favorites, setFavorite] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/favorite")
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserRole(user.email);
    }
  }, [user]);

  const fetchUserRole = async (email) => {
    try {
      const adminResponse = await fetch(`http://localhost:7000/admin/${email}`);
      const adminData = await adminResponse.json();
      setIsAdmin(adminData.admin);

      const vendorResponse = await fetch(
        `http://localhost:7000/vendor/${email}`
      );
      const vendorData = await vendorResponse.json();
      setIsVendor(vendorData.vendor);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/product");
        const data = await response.json();
        const discounted = data.filter((product) => product.discount);
        const shuffled = shuffleArray(discounted);
        const selectedProducts = shuffled.slice(0, 6);

        setDiscountedProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = { ...prevCountdown };
        if (newCountdown.seconds > 0) {
          newCountdown.seconds -= 1;
        } else {
          if (newCountdown.minutes > 0) {
            newCountdown.minutes -= 1;
            newCountdown.seconds = 59;
          } else {
            if (newCountdown.hours > 0) {
              newCountdown.hours -= 1;
              newCountdown.minutes = 59;
              newCountdown.seconds = 59;
            } else {
              clearInterval(interval);
            }
          }
        }
        localStorage.setItem("countdown", JSON.stringify(newCountdown));
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchProductsByDiscount = async (discountPercentage) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/discount?discountPercentage=${discountPercentage}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  const handleButtonClick = async (discountPercentage) => {
    try {
      const filteredProducts = await fetchProductsByDiscount(
        discountPercentage
      );
      setItems(filteredProducts);
      // Navigate to discount component
      navigate("/discount", { state: { products: filteredProducts } });
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };
  return (
    <div>
      <img
        className="w-full mx-10"
        src="https://www.self-shopping.com/static/media/self-platfrom.2182d0b69eecc52ed1c7.png"
        alt=""
      />
      <div className="container mt-28 grid grid-cols-3 md:grid-cols-6 px-5">
        {user && (
          <div>
            {isVendor ? (
              <Link to="/myRole">
               <div className="card w-28 h-44">
            <figure>
              <img
                className="w-16 h-16 rounded-full"
                src="https://cdn.iconscout.com/icon/free/png-256/free-dashboard-3561467-2985479.png?f=webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="font-semibold text-sm  mx-auto">
                আমার ড্যাশবোর্ড
              </h2>
            </div>
          </div>
              </Link>
            ) : (
              <Link to="/own">
                <div className="card w-28 h-44">
            <figure>
              <img
                className="w-20 h-20 rounded-full"
                src="https://p1.hiclipart.com/preview/706/286/553/numix-circle-for-windows-wolfenstein-the-new-order-icon-png-icon.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="font-semibold text-sm  mx-auto">আমার অর্ডার</h2>
            </div>
          </div>
              </Link>
            )}
          </div>
        )}

        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-24 h-24 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsgr2CieAnHqG-tWArxzlNOiS8JoizbDepMRibNMqug&s"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">
              ফেবারিট প্রোডাক্ট
            </h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-20 h-20 rounded-full"
              src="https://cdn3.emoji.gg/emojis/3336-verified-red.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">
              ভ্যারিফাইড প্রোডাক্ট
            </h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-16 h-16 rounded-full"
              src="https://cdn-icons-png.flaticon.com/256/8471/8471732.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">সকল ক্যাটাগরি</h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-16 h-16 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sCS8IDiEY1abqq2TRc5H9sZlpCUjyJGsSlPAiX_2ag&s"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className=" font-semibold text-sm  mx-auto">ভেন্ডর সার্চ</h2>
          </div>
        </div>
      </div>

      
      <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            নতুন পণ্য
          </h1>
        </div>
        <Link to="/new">
          <a className="text-xl font-bold text-red-500" href="">
            See More
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "newProduct")
          .map((product) => (
            <NewHome key={product._id} product={product} />
          ))}
      </div>

      <div className="flex justify-between items-center mt-5 px-5 bg-red-500 h-16">
        <h1 className="text-xl font-bold text-white">Flash Sale</h1>
        <h1 className="text-md font-normal text-white">
          {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </h1>
        <a className="text-xl font-bold text-white" href="">
          See More
        </a>
      </div>
      <div className="bg-orange-500 h-72">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 px-5">
          {discountedProducts.map((product) => (
            <FlashDEtails key={product._id} product={product} />
          ))}
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-3 px-5">
        <div className="h-32 bg-blue-500">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">20%</h1>
          </div>
        </div>
        <div className="h-32 bg-emerald-300">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">10%</h1>
          </div>
        </div>
        <div className="h-32 bg-orange-600">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">5%</h1>
          </div>
        </div>
        <Link to="/discount" onClick={() => handleButtonClick(20)}>
          20% Discount
        </Link>
        <Link to="/discount" onClick={() => handleButtonClick(10)}>
          10% Discount
        </Link>
        <Link to="/discount" onClick={() => handleButtonClick(5)}>
          5% Discount
        </Link>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      
      <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-xl mt-3 px-3">
            ফেভারিট প্রোডাক্ট
          </h1>
        </div>

        <Link to="/favorite">
          <a className="text-xl font-bold text-red-500" href="">
            সকল প্রোডাক্ট
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {favorites
          .filter((favorite) => favorite.type === "favoriteProduct")
          .slice(0, 7)
          .map((favorite) => (
            <FavDetails key={favorite._id} favorite={favorite} />
          ))}
      </div>
      
      <div className="flex justify-center items-center mt-5 px-5 bg-red-500 h-16">
        <h1 className="text-xl font-bold text-white">
          আপনার প্রয়োজনীয় আরো পণ্য
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-14 px-5">
        {products.slice(0, 20).map((product) => (
          <AllDetails key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
