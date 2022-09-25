import AppBody from "../components/AppBody/AppBody";
import Array from "../components/Array/Array";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          height: "80px",
        }}
      >
        <AppBody />
      </div>
    </div>
  );
};

export default Home;
