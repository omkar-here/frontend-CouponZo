import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../Components/ContextAPI/UserContext";
import React from "react";
import axios from "axios";

function OrdersPage() {
  const [orderList, setOrderList] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrderList, setFilteredOrderList] = useState([]);

  useEffect(() => {
    axios
      .post("https://fragile-fox-sock.cyclic.app/coupon/fetchOrders", {
        userId: userInfo._id,
      })
      .then((orderList) => {
        setOrderList(orderList?.data.result);
        setFilteredOrderList(orderList?.data.result);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    const filteredList = orderList.filter((order) =>
      order.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredOrderList(filteredList);
  };

  const fetchOrderCoupons = (orderId, index) => {
    // Modified the function parameters
    axios
      .get("https://fragile-fox-sock.cyclic.app/coupon/fetchCoupons", {
        params: {
          orderId: orderId,
        },
      })
      .then((orderCoupons) => {
        // Once the data is fetched, update the orderList state with the new data
        console.log(orderCoupons.data);
        setFilteredOrderList((prevOrderList) => {
          const updatedOrderList = prevOrderList.map((order, i) => {
            if (i === index) {
              return {
                ...order,
                coupons: orderCoupons.data,
              };
            } else {
              return order;
            }
          });
          return updatedOrderList;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleAccordion = (index) => {
    fetchOrderCoupons(filteredOrderList[index]._id, index);
    setFilteredOrderList((prevOrderList) => {
      const updatedOrderList = prevOrderList.map((order, i) => {
        if (i === index) {
          return { ...order, open: !order.open };
        } else {
          return order;
        }
      });
      return updatedOrderList;
    });
  };

  return (
    <div className="w-[90%] mx-auto min-h-screen">
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between pr-20">
        <h3 className=" font-bold  text-2xl mb-5 pt-8">All Orders</h3>
        <input autoComplete="off"
          type="text"
          placeholder="Search your Order"
          value={searchTerm}
          onChange={handleSearchChange}
          className="inline-block rounded-xl"
        />
      </div>

      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
        <table className="w-full max-w-full text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-sm bg-[#6ea8e2]">
              <th scope="col" className="px-1 text-center py-3">
                Order Type
              </th>
              <th scope="col" className="px-1 text-center py-3  ">
                Order Name
              </th>
              <th scope="col" className="px-1 text-center py-3">
                Custom Prefix
              </th>
              <th scope="col" className="px-1 text-center py-3">
                No. of Coupons
              </th>
              <th scope="col" className="px-1 text-center py-3 ">
                Format
              </th>
              <th scope="col" className="px-1 text-center py-3">
                Discount Type
              </th>
              <th scope="col" className="px-1 text-center py-3">
                Discount Value
              </th>
              <th scope="col" className="px-1 text-center py-3">
                Expiry
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrderList?.map((order, key) => {
              return (
                <React.Fragment key={key}>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={key}
                    onClick={() => toggleAccordion(key)}
                  >
                    <td className="px-6 py-4 text-center">{order.type}</td>
                    <td className="px-6 py-4 text-center">{order.name}</td>

                    <td className="px-6 py-4 text-center">
                      {order.customPrefix}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.couponList?.length}
                    </td>
                    <td className="px-6 py-4 text-center">{order.format}</td>
                    <td className="px-6 py-4 text-center">
                      {order.discountType}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.discountValue}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(order.expiry).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          setEditCoupon(true);
                        }}
                      >
                        {order.couponList?.length > 0 &&
                          (order.open == true ? (
                            <svg
                              data-accordion-icon
                              className="w-3 h-3 rotate-180 shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          ) : (
                            <svg
                              data-accordion-icon
                              className="w-3 h-3 rotate-0 shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          ))}
                      </button>
                    </td>
                  </tr>
                  <tr className="w-full">
                    {order.open && order.couponList?.length > 0 && (
                      <td colSpan={9} className="w-full">
                        <table className="w-full text-gray-500 dark:text-gray-400  border-solid border-[1px] border-[#7c8189]">
                          <thead className="w-full text-gray-500 uppercase bg-[#ECECF0] dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-sm w-full ">
                              <th scope="col" className="px-1 text-center py-3">
                                Coupon Code
                              </th>
                              <th
                                scope="col"
                                className="px-1 text-center py-3  "
                              >
                                Coupon Status
                              </th>
                              <th scope="col" className="px-1 text-center py-3">
                                Discount Type
                              </th>
                              <th scope="col" className="px-1 text-center py-3">
                                Discount Value
                              </th>
                              <th scope="col" className="px-1 text-center py-3">
                                Expiry
                              </th>
                              <th scope="col" className="px-1 text-center py-3">
                                Conditions
                              </th>
                              {order?.type == "static" && (
                                <th
                                  scope="col"
                                  className="px-1 text-center py-3"
                                >
                                  Redemption Limit
                                </th>
                              )}
                              <th scope="col" className="px-1 text-center py-3">
                                Condition value
                              </th>
                            </tr>
                          </thead>
                          {order.coupons?.map((coupon, key) => {
                            return (
                              <tr key={key}>
                                <td
                                  scope="col"
                                  className="px-1 text-center py-3 select-text"
                                >
                                  {coupon.code}
                                </td>
                                <td
                                  scope="col"
                                  className="px-1 text-center py-3  "
                                >
                                  {coupon.redemptionLimit <= 0 ? (
                                    <p className="text-red-400">Redeemed</p>
                                  ) : (
                                    <p className=" text-green-400">Available</p>
                                  )}
                                </td>
                                <td
                                  scope="col"
                                  className="px-1 text-center py-3 select-text"
                                >
                                  {coupon.discountType}
                                </td>

                                <td
                                  scope="col"
                                  className="px-1 text-center py-3"
                                >
                                  {coupon.discountValue}
                                </td>

                                <td
                                  scope="col"
                                  className="px-1 text-center py-3"
                                >
                                  {new Date(coupon.expiry).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </td>
                                <td
                                  scope="col"
                                  className="px-1 text-center py-3"
                                >
                                  {coupon.conditions}
                                </td>
                                {order?.type == "static" && (
                                  <td
                                    scope="col"
                                    className="px-1 text-center py-3"
                                  >
                                    {coupon.redemptionLimit}
                                  </td>
                                )}
                                <td
                                  scope="col"
                                  className="px-1 text-center py-3"
                                >
                                  {coupon.conditionsValue}
                                </td>
                                {/* {order.type === "static" ? (
                                  <td
                                    scope="col"
                                    className="px-1 text-center py-3"
                                  >
                                    {order.couponList?.length -
                                      coupon.redemptionLimit}
                                  </td>
                                ) : (
                                  <></>
                                )} */}
                              </tr>
                            );
                          })}
                        </table>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
