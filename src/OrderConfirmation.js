import "./styles.css";
import AdminNavbar from "./AdminNavbar";
import Memory from "./Memory";
import BottomBar from "./BottomBar";
import AddBoxIcon from "@material-ui/icons/AddBox";

const OrderConfirmation = () => {
  let state = {
    //state is by default an object
    products: [
      {
        productID: "00199",
        productTitle: "Clay Pot",
        quantity: 4,
        subtotal: 800
      },
      {
        productID: "00199",
        productTitle: "Clay Pot",
        quantity: 4,
        subtotal: 800
      },
      {
        productID: "00199",
        productTitle: "Clay Pot",
        quantity: 4,
        subtotal: 800
      },
      {
        productID: "00199",
        productTitle: "Clay Pot",
        quantity: 4,
        subtotal: 800
      },
      {
        productID: "00199",
        productTitle: "Clay Pot",
        quantity: 4,
        subtotal: 800
      }
    ]
  };

  let address = "Sherlock Holmes, 221B Bakers Street";

  const renderTableData = () => {
    return state.products.map((product, index) => {
      const { productID, productTitle, quantity, price, subtotal } = product; //destructuring
      return (
        <tr className="data">
          <td>{productID}</td>
          <td>{productTitle}</td>
          <td>{quantity}</td>
          <td>{subtotal / quantity}</td>
          <td>{subtotal}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <AdminNavbar />
      <Memory
        panel="Customer Panel "
        page="Shopping Cart / Checkout /"
        current=" Order Confirmation"
      />{" "}
      {/* when three links needed in panel, include a '/' in the middle 'page' argument */}
      <h1>Order Confirmation</h1>
      <h2>Order Details</h2>
      <div className="table-responsive">
        <table className="table table-size">
          <thead>
            <tr className="top-row">
              <th>Product ID</th>
              <th>Product Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      <div className="totalBill">
        <br />
        Total: Rs.900
        <br />
      </div>
      <div className="shippingAddress">
        <h3>Shipping address</h3>
        {address}
      </div>
      <input
        type="submit"
        className="confirmOrder-button"
        value="Confirm Order"
      ></input>
      <BottomBar />
    </div>
  );
};
export default OrderConfirmation;