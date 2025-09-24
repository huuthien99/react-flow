import React from "react";

function Header() {
  const handleSave = (e) => {
    e.stopPropagation();
    console.log("Lưu trạng thái flow (chức năng chưa được triển khai)");
  };
  return (
    <div
      style={{
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <p
        onClick={handleSave}
        style={{ paddingRight: 20, fontSize: 14, cursor: "pointer" }}
      >
        Lưu lại
      </p>
    </div>
  );
}

export default Header;
