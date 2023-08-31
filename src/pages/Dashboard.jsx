import { useState, useContext } from "react";
import CircularProgressBar from "../Components/CircularProgressBar";
import { MdAutoGraph } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
import { BsFillCartFill } from "react-icons/bs";
import { GiShoppingBag } from "react-icons/gi";
import NewCoupon from "../Components/modals/NewCoupon";
import EditCoupon from "../Components/modals/EditCoupon";
import { UserContext } from "../Components/ContextAPI/UserContext";
import CountUpExample from "../Components/CountUp";
import CountUp from "react-countup";
import axios from "axios";
import { useEffect } from "react";

export const Dashboard = (props) => {
  const [showNewCouponModal, setShowNewCouponModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState(false);
  const [totalCouponsCount, setTotalCouponsCount] = useState(0);
  const [totalCouponsUsed, setTotalCouponsUsed] = useState(0);
  const [refreshList, setRefreshList] = useState(true);
  const [orderList, setOrderList] = useState();
  const [staticCount, setStaticCount] = useState(0);
  const [dynamicCount, setDynamicCount] = useState(0);
  const { userInfo } = useContext(UserContext);

  function getTotalCoupons() {
    axios
      .post("https://fine-suit-lamb.cyclic.app/coupon/fetchUserCoupons", {
        userId: userInfo._id,
      })
      .then((res) => {
        console.log(res.data.userCouponsCount);
        setTotalCouponsCount(res.data.userCouponsCount);
      });
  }

  function getTotalUsedCoupons() {
    // axios
    //   .post("https://fine-suit-lamb.cyclic.app/coupon/fetchRedeemedCouponsCount", {
    //     userId: userInfo._id,
    //   })
    //   .then((res) => {
    //     console.log("User");
    //     console.log(res.data.totalCouponsUsed);
    //     setTotalCouponsUsed(res.data.totalCouponsUsed);
    //   });
    console.log("Used Coupons +" ) 
    setTotalCouponsUsed(userInfo.totalCouponsUsed);
  }

  function getRecentOrders() {
    axios
      .post("https://fine-suit-lamb.cyclic.app/coupon/fetchRecentOrders", {
        userId: userInfo._id,
      })
      .then((res) => {
        setOrderList(res.data.result);
      });
  }

  function getStaticDynamicCount() {
    axios
      .post("https://fine-suit-lamb.cyclic.app/coupon/fetchStaticDynamicCouponsCount", {
        userId: userInfo._id,
      })
      .then((res) => {
        console.log(res);
        setStaticCount(res.data.staticCount);
        setDynamicCount(res.data.dynamicCount);
      });
  }

  useEffect(() => {

    getTotalCoupons();
    getTotalUsedCoupons();
    getRecentOrders();
    getStaticDynamicCount();
  }, [refreshList]);

  return (
    <div className="flex h-full min-h-screen bg-[#f6f6f9]">
      {console.log(userInfo)}
      {showNewCouponModal && (
        <NewCoupon
          setRefreshList={setRefreshList}
          onClose={() => setShowNewCouponModal(false)}
        />
      )}
      {editCoupon && <EditCoupon onClose={() => setEditCoupon(false)} />}
      <div className="absolute top-5 right-16">
        <span className=" text-xl">
          Hey, <span className="font-bold">{userInfo.userName}</span>
        </span>
        <p className="text-right w-full">Admin</p>
      </div>

      <div className="mt-[-60px] p-10 bg-[#f6f6f9]">
        <h1 className="flex justify-items-start font-bold bg-[#f6f6f9] pb-5 pt-24 text-3xl">
          Dashboard{" "}
        </h1>

        <div className="flex">
          <div className=" w-4/5">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex card w-90 p-2 h-[200px] shadow-2xl relative bg-white text-primary-content">
                <div className="flex p-8 pl-8 pr-none gap-3 ">
                  <SlGraph className=" w-24 h-full text-white bg-red-400 rounded-full" />

                  <h2 className=" card-title text-xl font-bold text-left text-black">
                    Total Coupons Generated
                  </h2>
                </div>
                <div className="absolute bottom-6 right-10">
                  <p className="font-bold text-2xl  mb-0 text-black">
                    <CountUp end={totalCouponsCount} duration={4} />
                  </p>
                  <p className="font-bold text-2xl bg-gradient-to-t mt-[-20px] w-4 from-gray-300 to-transparent transform scale-y-[-1] opacity-20 text-black">
                    <CountUp end={totalCouponsCount} duration={4} />
                  </p>
                </div>
              </div>
              <div className="card w-90 p-2  bg-white h-[200px] shadow-2xl relative text-primary-content">
                <div className="flex p-8 pl-8 pr-none gap-2">
                  <VscGraph className=" w-14 h-14  text-white bg-blue-400 rounded-full mr-2" />
                  <h2 className="card-title w-40 text-xl font-bold text-left text-black">
                    Total Coupons Used
                  </h2>
                  <div className="absolute bottom-6 right-10">
                    <p className="font-bold text-2xl  mb-0 text-black">
                      <CountUp end={totalCouponsUsed} duration={4} />
                    </p>
                    <p className="font-bold text-2xl bg-gradient-to-t mt-[-20px] w-4 from-gray-300 to-transparent transform scale-y-[-1] opacity-20 text-black">
                      <CountUp end={totalCouponsUsed} duration={4} />
                    </p>
                  </div>{" "}
                </div>
              </div>
              <div className="card w-90  relative h-[200px] shadow-2xl pb-0 pt-[15px]   bg-white text-primary-content">
                <div className=" flex p-8 pl-8 pr-none gap-2">
                  <MdAutoGraph className=" w-20 h-14  text-white bg-green-400 rounded-full" />
                  <h2 className="card-title w-22 text-xl font-bold text-black ">
                    Total Coupons Remaining
                  </h2>
                  <div className="absolute bottom-6 right-10">
                    <p className="font-bold text-2xl  mb-0 text-black">
                      <CountUp
                        end={totalCouponsCount - totalCouponsUsed}
                        duration={4}
                      />
                    </p>
                    <p className="font-bold text-2xl bg-gradient-to-t mt-[-20px] w-4 from-gray-300 to-transparent transform scale-y-[-1] opacity-20 text-black">
                      <CountUp
                        end={totalCouponsCount - totalCouponsUsed}
                        duration={4}
                      />
                    </p>
                  </div>
                </div>
              </div>
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
                  {orderList?.map((order, key) => {
                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={key}
                      >
                        <td className="px-6 py-4 text-center">{order.type}</td>
                        <td className="px-6 py-4 text-center">{order.name}</td>

                        <td className="px-6 py-4 text-center">
                          {order.customPrefix}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.couponList?.length}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.format}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.discountType}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.discountValue}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {new Date(order.expiry).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-1/5 ml-5">
            <span className="flex font-bold justify-items-start text-xl mb-5 mt-8">
              Sales analytics
            </span>
            <div>
              <div className="flex relative bg-white font-bold rounded-xl shadow-2xl flex-col justify-start items-start">
                <span className="flex pl-3 py-6 pt-3 text-left">
                  <BsFillCartFill className="inline-block mr-2 h-10 w-10 p-2 text-white bg-blue-400 rounded-full" />
                  Static Coupons
                </span>
                <div className="absolute bottom-1 right-3">
                  <p className="font-bold text-xl mb-0 text-black">
                    <CountUp end={staticCount} duration={4} />
                  </p>
                  <p className="font-bold text-xl bg-gradient-to-t mt-[-20px] w-4 from-gray-300 to-transparent transform scale-y-[-1] opacity-20 text-black">
                    <CountUp end={staticCount} duration={4} />
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 relative">
              <div className="flex bg-white font-bold rounded-xl shadow-2xl flex-col justify-start items-start">
                <span className="flex pl-3 py-6 pt-3 text-left">
                  <GiShoppingBag className="inline-block mr-2 h-10 w-10 p-2 text-white bg-green-400 rounded-full" />
                  Dynamic Coupons
                </span>
                <div className="absolute bottom-1 right-3">
                  <p className="font-bold text-xl mb-0 text-black">
                    <CountUp end={dynamicCount} duration={4} />
                  </p>
                  <p className="font-bold text-xl bg-gradient-to-t mt-[-20px] w-4 from-gray-300 to-transparent transform scale-y-[-1] opacity-20 text-black">
                    <CountUp end={dynamicCount} duration={4} />
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 ">
              <button
                className="flex w-full border-dashed border-2 rounded-xl border-blue-600 hover:border-blue-400 cursor-pointer hover:text-blue-400 hover:bg-blue-100 font-bold shadow-2xl text-blue-600 flex-col justify-center items-center"
                onClick={() => setShowNewCouponModal(true)}
              >
                <span className="px-8 py-8">Create New Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
