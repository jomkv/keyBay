import { Fragment } from "react";

import Navbar from "../components/Navbar";
import Item from "../components/Item";

function Home() {
  return (
    <Fragment>
      <Navbar />
      <div
        id="mybgcolor2"
        className="p-4 row row-cols-1 row-cols-md-3 g-0 custom-margin"
      >
        <Item name="rakk pluma" price="1500" />
        <Item name="rakk pluma" price="1500" />
        <Item name="rakk pluma" price="1500" />
        <Item name="rakk pluma" price="1500" />
        <Item name="rakk pluma" price="1500" />
        <Item name="rakk pluma" price="1500" />
      </div>
    </Fragment>
  );
}

export default Home;
