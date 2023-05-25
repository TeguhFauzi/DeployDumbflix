import Navbar from "../component/Navbar";
import TransactionProfil from "../component/Transaction";
import Profile from "../component/Profile";

export default function Transaction() {
    return (
      <div className="MyTransaction">
        <Navbar />
        <div className="container" style={{ marginTop: 77 }}>
          <div className="d-flex justify-content-between" style={{ padding: "0 0px" }}>
            <Profile />
            <TransactionProfil />
          </div>
        </div>
      </div>
    );
  }