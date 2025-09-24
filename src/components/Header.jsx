import React from "react";

function Header() {
  const handleSave = (e) => {
    e.stopPropagation();
    console.log("Lưu trạng thái flow (chức năng chưa được triển khai)");
  };
  return (
    <div className="w-full h-16 flex items-center justify-end">
      <p onClick={handleSave} className="pr-5 text-[14px] cursor-pointer">
        Lưu lại
      </p>
    </div>
  );
}

export default Header;
