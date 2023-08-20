// ⭐ Company Name (non-editable)
// ⭐ Email
// ⭐ Username
// ⭐ Password
// ⭐ Profile picture

import { ImArrowDown } from "react-icons/im";
import { LuCopy } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import React, { useState } from "react";
import CodeBlock from "../Components/CodeBlock";
import { TiTickOutline } from "react-icons/ti";
import Clipboard from "clipboard";
import { UserContext } from "../Components/ContextAPI/UserContext";
import { useContext } from "react";
function ProfilePage() {
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("VERIFY");
  const [image, setImage] = useState("https://github.com/omkar-here.png");
  const { userInfo } = useContext(UserContext);
  const [code, setCode] = useState({
    api: `
      axios
      .post("https://sore-veil-toad.cyclic.cloud/coupon/verify", 
          {
            userId: "64a1c9e74a47fb83b59c70c1";
            couponCode: __;
            quantity: __;
            totalAmount: __;
            productIdList: [__];
          }, 
          {
            headers: { "Content-Type": "application/json",},
          })    
            .then((response) => {
            
            })
            .catch((error) => {
            });
      `,
  });
  const handleRedeemTabClick = () => {
    setActiveTab("REDEEM");
    setCode({
      api: `
      axios
      .post("https://sore-veil-toad.cyclic.cloud/coupon/confirm", 
          {
            userId: "64a1c9e74a47fb83b59c70c1";
            couponCode: __;
            quantity: __;
            totalAmount: __;
            productIdList: [__];
          }, 
          {
            headers: { "Content-Type": "application/json",},
          })    
            .then((response) => {
            
            })
            .catch((error) => {
            });
      `,
    });
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(URL.createObjectURL(imageFile));
  };
  const handleVerifyTabClick = () => {
    setActiveTab("VERIFY");
    setCode({
      api: `
      axios
      .post("https://sore-veil-toad.cyclic.cloud/coupon/verify", 
          {
            userId: "64a1c9e74a47fb83b59c70c1";
            couponCode: __;
            quantity: __;
            totalAmount: __;
            productIdList: [__];
          }, 
          {
            headers: { "Content-Type": "application/json",},
          })    
            .then((response) => {
            
            })
            .catch((error) => {
            });
      `,
    });
  };
  const handleClickCopy = (code) => {
    const clipboard = new Clipboard(".copy-button", {
      text: () => code,
    });

    clipboard.on("success", () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000); // Reset "Copied" status after 1.5 seconds
      clipboard.destroy();
    });
  };

  return (
    <div className="min-h-screen py-10 h-full">
      <h1 className="font-bold text-gray-700 pl-16 pb-10 text-3xl">
        Profile Page
      </h1>
      <div className="  flex-col gap-x-10">
        {/* Profile Details */}
        <div className="m-auto w-[90%] bg-white shadow-2xl p-10 rounded-lg ">
          <div className="flex justify-start gap-x-20">
            <div className="relative  pr-10">
              <img
                className="border-2 ml-10 rounded-full bg-slate-300 w-56 "
                src={image}
                alt="Omkar"
              />
              <div className="">
                <input
                  accept="image/*"
                  type="file"
                  id="fileInput"
                  className="hidden"
                  placeholder=""
                  onChange={handleImageChange}
                />

                <label
                  htmlFor="fileInput"
                  className="px-2 right-0 py-2 text-xs bg-sky-500 text-black absolute rounded cursor-pointer"
                >
                  Change image
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 mt-5">
              <p className=" text-xl">
                <strong>User Name:</strong> {userInfo.userName}
              </p>
              <p className=" text-xl">
                <strong>Company Name:</strong> {console.log(userInfo)}
                {userInfo.companyName}
              </p>
              <p className=" text-xl">
                <strong>Email Id:</strong> {userInfo.email}
              </p>
              <p className=" text-xl">
                <strong>Total Coupons Generated:</strong>{" "}
                {userInfo.totalCouponsGenerated}
              </p>
              <p className=" text-xl">
                <strong>Total Coupons Used:</strong> {userInfo.totalCouponsUsed}
              </p>
            </div>
          </div>
        </div>
        <div className="  m-auto w-[90%] mt-10  shadow-2xl  rounded-lg  ">
          <div className="flex shadow-lg  h-15  m-auto flex-row  bg-[#2db6e2]  rounded-xl rounded-bl-none rounded-br-none">
            <div className="flex items-end  justify-between w-full p-2 pb-0">
              <span className=" font-monospace text-2xl m-3 ">
                Connect to our services using this API Template.{" "}
              </span>
              <div className="tabs inline-block pr-10">
                <a
                  className={`tab tab-lifted hover:border-purple-500 border-[#2db6e2] font-bold ${
                    activeTab === "VERIFY" ? "tab-active" : ""
                  }`}
                  onClick={() => handleVerifyTabClick()}
                >
                  VERIFY
                </a>
                <a
                  className={`tab tab-lifted hover:border-purple-500 border-[#2db6e2] font-bold ${
                    activeTab === "REDEEM" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    handleRedeemTabClick();
                  }}
                >
                  REDEEM
                </a>
              </div>
            </div>
          </div>
          <div className="flex  m-auto ">
            <div className="block w-[50%] bg-[#9fdcf0] p-6">
              <div className=" rounded-2xl text-[#333333] text-lg p-6 pt-3 bg-[#E5E7EB]">
                <h6 className=" font-bold">
                  Documentation{" "}
                  <ImArrowDown className="inline-block w-6 pl-0  text-orange-400 border-[#49ad13]" />
                </h6>
                {activeTab === "VERIFY" ? (
                  <div>
                    <p className="mt-4">
                      Easily include our coupon verification feature on your
                      website with just a simple copy-paste of the provided
                      code.
                    </p>
                    <p className="mt-2">
                      By adjusting the details like user ID, coupon code,
                      quantity, and product list, your website can effortlessly
                      check and validate coupons when users interact with it.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="mt-4">
                      Easily include our coupon redemption feature on your
                      website with just a simple copy-paste of the provided
                      code.
                    </p>
                    <p className="mt-2">
                      By adjusting the details like user ID, coupon code,
                      quantity, and product list, your website can effortlessly
                      redeem coupons when users interact with it.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className=" bg-white w-[65%]">
              <LuCopy
                onClick={() => {
                  console.log(code.api);
                  handleClickCopy(code.api);
                }}
                className="copy-button text-3xl right-[5%] mt-5 absolute inline-block ml-3 cursor-pointer p-1 rounded-lg"
              />
              {isCopied ? (
                <TiTickOutline className="text-2xl  text-white absolute inline-block  right-[10%] mt-6 rounded-full bg-blue-500" />
              ) : (
                <></>
              )}
              <CodeBlock code={code.api} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
