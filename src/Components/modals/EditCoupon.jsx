function EditCoupon() {
  return (
    <div className="w-screen z-40 h-screen absolute top-0 left-0 bg-opacity-40 bg-black flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg p-5">
        <h2 className=" text-black font-bold text-2xl">Add Coupon</h2>
        <div className="flex flex-col">
          <div className="flex flex-row mb-2">
            <div className="flex flex-col mr-4 w-1/2">
              <label className="text-black text-md">Coupon type</label>
              <select className=" cursor-pointer border-1 w-full border-purple-300 bg-blue-200 rounded-lg p-2">
                <option value="static">Static</option>
                <option value="dynamic">Dynamic</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-black text-md">Coupon Format</label>
              <select className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2">
                <option value="alphanumeric">alphanumeric</option>
                <option value="alphabetic">alphabetic</option>
                <option value="numeric">numeric</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row mb-2">
            <div className="flex flex-col mr-4 w-1/2">
              <label className="text-black text-md">Coupon Length</label>
              <input
                type="number"
                className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black text-md">Custom Prefix</label>
              <input
                type="text"
                className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex flex-row mb-2">
            <div className="flex flex-col mr-4 w-1/2">
              <label className="text-black text-md">Applicable to:</label>
              <select className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2">
                <option value="sku">SKU</option>
                <option value="cart">Cart</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black text-md">Discount Value</label>
              <input
                type="number"
                className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex flex-row mb-2">
            <div className="flex flex-col mr-4 w-1/2">
              <label className="text-black text-md">Discount Type</label>
              <select className=" cursor-pointer border-1 border-purple-300 bg-blue-200 rounded-lg p-2">
                <option value="percentage">Percentage</option>
                <option value="amount">Fixed</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black text-md">Redemption Limit</label>
              <input
                type="number"
                className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex flex-row mb-2">
            <div className="flex flex-col mr-4 w-1/2">
              <label className="text-black text-md">Expiry Date</label>
              <input
                type="date"
                className="border-1 border-purple-300 bg-blue-200 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black text-md">Condition:</label>
              <select className=" cursor-pointer border-1 w-full border-purple-300 bg-blue-200 rounded-lg p-2">
                <option value="none">None</option>
                <option value="minV">Minimum Value</option>
                <option value="minQ">Minimum Quantity</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-purple-500 text-white max-w-md w-32 rounded-lg p-2 mt-5 hover:bg-purple-600">
              Save Coupon
            </button>
            <button
              className="bg-red-500 text-white max-w-md w-32 rounded-lg p-2 mt-5 hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCoupon;
