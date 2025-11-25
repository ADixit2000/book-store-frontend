import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems
    .reduce((total, item) => total + item.newPrice, 0)
    .toFixed(2);

  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = React.useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
        address: data.address,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };
    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirm Order!",
        text: "Order placed succesfully",
        icon: "success",
        confirmButtonText: "Yes its Okay",
      });
      navigate("/orders");
    } catch (error) {
      console.log("Error in placing order: ", error);
      alert("Failed to placing order");
    }
  };

  if (isLoading) return <div>Loading.....................</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 mb-2">
          Cash On Delivery
        </h2>
        <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
        <p className="text-gray-500 mb-2">Total Items: ${cartItems.length}</p>

        <div className="bg-white rounded shadow-lg p-6 md:p-8 mb-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3"
          >
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2 grid gap-4 md:grid-cols-5">
              <div className="md:col-span-5">
                <label>Full Name</label>
                <input
                  {...register("name", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </div>

              <div className="md:col-span-5">
                <label>Email Address</label>
                <input
                  disabled
                  defaultValue={currentUser?.email}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-5">
                <label>Phone Number</label>
                <input
                  {...register("phone", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    Phone number is required
                  </span>
                )}
              </div>

              <div className="md:col-span-3">
                <label>Address / Street</label>
                <input
                  {...register("address", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">Address required</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label>City</label>
                <input
                  {...register("city", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-2">
                <label>Country</label>
                <input
                  {...register("country", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-2">
                <label>State</label>
                <input
                  {...register("state", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-1">
                <label>Zipcode</label>
                <input
                  {...register("zipcode", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-5 mt-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-2">
                  I agree to the{" "}
                  <Link className="underline text-blue-600">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link className="underline text-blue-600">
                    Shopping Policy
                  </Link>
                  .
                </label>
              </div>

              <div className="md:col-span-5 text-right">
                <button
                  disabled={!isChecked}
                  className={`${
                    isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  Place an Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
