import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
function NewCoupon(props) {
  const { onClose, setRefreshList } = props;
  const { userInfo } = useContext(UserContext);

  const [couponDetails, setCouponDetails] = useState({
    userId: userInfo._id,
    numCodes: 0,
    redemptionLimit: 0,
    format: "alphanumeric",
    customPrefix: "",
    productId: "",
    applicableTo: "sku",
    discountType: "percentage",
    discountValue: 0,
    maxDiscountAmount: 0,
    length: 0,
    type: "static",
    conditions: "none",
    conditionsValue: 0,
    expiry: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleNewCoupon = (e) => {
    e.preventDefault();
    console.log(couponDetails);
    axios
      .post("https://fragile-fox-sock.cyclic.app/coupon/coupon-gen", couponDetails, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setShowToast(true);
        setRefreshList((prevState) => !prevState);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCouponDetails({ ...couponDetails, [name]: value });
  };

  return (
    <div className="w-screen z-40 h-screen absolute top-0 left-0 bg-opacity-40 bg-black flex justify-center items-center">
      {/* Toast for coupon creation success */}
      {showToast ? (
        <div className="toast toast-end top-10 toast-top">
          <div className="alert p-5 text-md alert-success">
            <span>Coupon created successfully 🎉 🎉</span>
          </div>
        </div>
      ) : null}

      {/* ------------------------------ */}
      <div className="max-w-2xl w-full bg-white rounded-lg p-5">
        <h2 className=" text-black font-bold text-2xl">Place an Order</h2>
        <div className="flex flex-col">
          <form onSubmit={handleNewCoupon}>
            <div className="flex flex-row mb-2">
              <div className="flex flex-col pr-4 w-1/2">
                <label className="text-black text-md">Order Name</label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  required
                  className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-black text-md">Coupon Format</label>
                <select
                  name="format"
                  onChange={handleChange}
                  required
                  className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                >
                  <option value="alphanumeric">alphanumeric</option>
                  <option value="alphabetic">alphabetic</option>
                  <option value="numeric">numeric</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-4 w-1/2">
                <label className="text-black text-md">Coupon type</label>
                <select
                  onChange={handleChange}
                  name="type"
                  required
                  className=" cursor-pointer border-1 w-full border-purple-300 bg-blue-200 rounded-lg p-2"
                >
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </div>
              <div className="flex flex-col pr-4 w-1/5">
                <label className="text-black text-md">Code Length</label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="number"
                  name="length"
                  required
                  className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                />
              </div>
              <div className="flex flex-col w-2/5">
                <label className="text-black text-md">Custom Prefix</label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="text"
                  required
                  name="customPrefix"
                  className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-4 w-1/2">
                <label className="text-black text-md">Applicable to:</label>
                <select
                  onChange={handleChange}
                  name="applicableTo"
                  required
                  className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                >
                  <option value="sku">SKU</option>
                  <option value="cart">Cart</option>
                </select>
              </div>
              {couponDetails.applicableTo === "sku" ? (
                <div className="flex flex-col w-full">
                  <label className="text-black text-md">Product Id:</label>
                  <input autoComplete="off"
                    onChange={handleChange}
                    type="text"
                    name="productId"
                    required
                    className="border-1 border-purple-300 w-[90%] bg-blue-200 rounded-lg p-2"
                  />
                </div>
              ) : null}

              <div className="flex flex-col w-full">
                <label className="text-black text-md">
                  Discount Value{" "}
                  {couponDetails.discountType === "percentage" ? (
                    <span>(%)</span>
                  ) : (
                    <span>(in Rs.)</span>
                  )}
                </label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="number"
                  name="discountValue"
                  required
                  className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-4 w-1/2">
                <label className="text-black text-md">Discount Type</label>
                <select
                  onChange={handleChange}
                  name="discountType"
                  required
                  className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                >
                  <option value="percentage">Percentage</option>
                  <option value="amount">Fixed</option>
                </select>
              </div>

              {couponDetails.discountType === "percentage" ? (
                <div className="flex flex-col w-fit">
                  <label className="text-black text-md">
                    Max Discount (in Rs.){" "}
                  </label>
                  <input autoComplete="off"
                    onChange={handleChange}
                    type="number"
                    name="maxDiscountAmount"
                    required
                    className="border-1 border-purple-300 w-[90%] bg-blue-200 rounded-lg p-2"
                  />
                </div>
              ) : null}

              <div className="flex flex-col w-fit">
                <label className="text-black text-md">
                  {couponDetails.type === "static" ? (
                    <p>Redemption Limit</p>
                  ) : (
                    <p>Number of Coupons</p>
                  )}{" "}
                </label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="number"
                  required
                  name={`${
                    couponDetails.type == "static"
                      ? "redemptionLimit"
                      : "numCodes"
                  }`}
                  className="border-1 border-purple-300 w-full bg-blue-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="flex flex-col mr-4 w-1/2">
                <label className="text-black text-md">Expiry Date</label>
                <input autoComplete="off"
                  onChange={handleChange}
                  type="date"
                  name="expiry"
                  required
                  className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-black text-md">Condition:</label>
                <select
                  onChange={handleChange}
                  name="conditions"
                  required
                  className=" cursor-pointer border-1 w-full border-purple-300 bg-blue-200 rounded-lg p-2"
                >
                  <option value="none">None</option>
                  <option value="minCartValue">Minimum Value</option>
                  <option value="minCartQuantity">Minimum Quantity</option>
                </select>
              </div>
              {couponDetails.conditions != "none" && (
                <div className="flex flex-col ml-4">
                  <label className="text-black text-md">Condition Value</label>
                  <input autoComplete="off"
                    type="number"
                    onChange={handleChange}
                    required
                    name="conditionValue"
                    className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button className="bg-purple-500 text-white max-w-md w-32 rounded-lg p-2 mt-5 hover:bg-purple-600">
                Place Order
              </button>
              <button
                className="bg-red-500 text-white max-w-md w-32 rounded-lg p-2 mt-5 hover:bg-red-600"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCoupon;
