import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/banner";
import RowList from "../../Components/Rows/RowList/RowList";

const home = () => {
  return (
    <div>
      <Header />
      <Banner />
      {/* <RowList /> */}
      <RowList/>
      <Footer />
    </div>
  );
};

export default home;
