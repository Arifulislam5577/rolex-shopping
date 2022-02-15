import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../Redux/Actions/orderActions";
import Loader from "../Loader/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const adminOrderDetails = useSelector((state) => state.adminOrder);
  const { isLoading, isError, adminOrder } = adminOrderDetails;

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const paidOrder = adminOrder?.filter((order) => {
    return order.isPaid === true;
  });

  const deliveredOrder = adminOrder?.filter((order) => {
    return order.isDelivered === true;
  });

  const pendingOrder = adminOrder?.filter((order) => {
    return order.isDelivered === false;
  });

  const todaysOrder = adminOrder?.filter((order) => {
    return new Date(order.createdAt).getDate() === new Date().getDate();
  });

  const totalSell = adminOrder?.reduce(
    (acc, order) => acc + order.orderCalculation.totalPrice,
    0
  );

  const totalIncomeTax = adminOrder?.reduce(
    (acc, order) => acc + order.orderCalculation.totalPrice * 0.05,
    0
  );

  const totalProductSell = adminOrder?.reduce(
    (acc, order) => acc + order.orderCalculation.totalItems,
    0
  );

  console.log(adminOrder);
  console.log(totalProductSell);
  return (
    <section className="dashboard py-5">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <h1 className="bg-danger text-light text-uppercase text-center">
            {isError}
          </h1>
        ) : (
          <>
            <div className="row my-5">
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <h1 className="fw-bolder text-light fs-1 mb-4">
                    {adminOrder?.length}
                  </h1>
                  <h4>Total Order</h4>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <div className="paid-order">
                    <h1 className="fw-bolder text-light fs-1 mb-4">
                      {paidOrder?.length}
                    </h1>
                    <h4>Paid Order</h4>
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <div className="delivered-order">
                    <h1 className="fw-bolder text-light fs-1 mb-4">
                      {deliveredOrder?.length}
                    </h1>
                    <h4>Delivered Order</h4>
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <h1 className="fw-bolder text-light fs-1 mb-4">
                    {pendingOrder?.length}
                  </h1>
                  <h4>Pending Order</h4>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <h1 className="fw-bolder text-light fs-1 mb-4">
                    ${totalSell?.toFixed(2)}
                  </h1>
                  <h4>Total Sell</h4>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <div className="paid-order">
                    <h1 className="fw-bolder text-light fs-1 mb-4">
                      {todaysOrder?.length}
                    </h1>
                    <h4>Today Sell</h4>
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <div className="delivered-order">
                    <h1 className="fw-bolder text-light fs-1 mb-4">
                      {totalProductSell}
                    </h1>
                    <h4>Total Product sell</h4>
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                <div className="total-order p-5 border border-1 rounded-2 bg-primary text-light text-uppercase text-center">
                  <h1 className="fw-bolder text-light fs-1 mb-4">
                    ${totalIncomeTax?.toFixed(2)}
                  </h1>
                  <h4>Income tax</h4>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
