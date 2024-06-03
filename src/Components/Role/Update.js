import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/product/${id}`);
        const productData = response.data;
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setCategory(productData.category);
        setExistingImage(productData.image);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    if (category) formData.append("category", category);
    if (discount) formData.append("discount", discount);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `http://localhost:7000/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product updated successfully:", response.data);
      navigate("/all");
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Name:
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Description:
              <textarea
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Price:
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Category:
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select w-full max-w-xs"
            >
              <option disabled selected>
                প্রোডাক্ট ক্যাটাগরি সিলেক্ট করুন
              </option>
              <option>থ্রি-পিস</option>
              <option>Mobile Accessories</option>
              <option>চশমা</option>
              <option>ঘড়ি</option>
              <option>স্মার্ট ফোন</option>
              <option>টি-শার্ট</option>
              <option>জুতা</option>
              <option>শাড়ি</option>
              <option>শার্ট</option>
              <option>ল্যাপটপ</option>
              <option>পেন্ট</option>
              <option>ইলেকট্রনিক্স</option>
              <option>কিডস</option>
              <option>ডেস্কটপ</option>
              <option> কসমেটিক্স</option>
              <option>গিফট</option>
            </select>
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Image:
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label
              htmlFor="discount"
              className="text-gray-800 font-semibold block my-3 text-md"
            >
              Discount (%):
              <select
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              >
                <option value="">No Discount</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
              </select>
            </label>

            <button
              class="w-full mt-6 bg-orange-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
