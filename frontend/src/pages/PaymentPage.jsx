import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const PaymentPage = () => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth(); 

    const [variant, setVariant] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const stateVariant = location.state?.variant;
        const stateFrom = location.state?.fromDate;
        const stateTo = location.state?.toDate;
        const statePrice = location.state?.totalPrice;

        // fallback to localStorage
        const savedVariant = JSON.parse(localStorage.getItem("selectedVariant"));

        if (!stateVariant && !savedVariant) {
            navigate("/search");
            return;
        }

        const finalVariant = stateVariant || savedVariant;

       
        if (!finalVariant._id) {
            alert("Invalid variant data. Please select the car again.");
            navigate("/search");
            return;
        }

        setVariant(finalVariant);
        setFromDate(stateFrom || localStorage.getItem("fromDate"));
        setToDate(stateTo || localStorage.getItem("toDate"));
        setTotalPrice(statePrice || Number(localStorage.getItem("totalPrice")));
    }, [location.state, navigate]);

    const handlePayment = async () => {
        if (!user || !variant) {
            alert("User or car info missing. Please try again.");
            return;
        }

        try {
            // Create Razorpay order
            const { data: order } = await axios.post(
                `${API_URL}/payment/create-order`,
                { amount: totalPrice * 100 }
            );

            const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: "BookMyCar",
                description: `${variant.company} ${variant.name} Booking`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        await axios.post(`${API_URL}/payment/verify`, {
                            userId: user._id,
                            variantId: variant._id,
                            fromDate,
                            toDate,
                            totalPrice,
                            paymentId: response.razorpay_payment_id,
                        });

                        alert("Booking Successful!");
                        navigate("/profile");
                    } catch (err) {
                        console.error("Booking failed:", err.response?.data || err);
                        alert("Booking failed. Please contact support.");
                    }
                },

                theme: { color: "#DCD5FB" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment initiation failed:", err);
            alert("Payment initiation failed.");
        }
    };

    if (!variant) return null;

    return (
        <div className="min-h-screen pt-24 bg-gray-100 px-4 sm:px-10 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4 ">
                    Payment for {variant.company} {variant.name}
                </h2>

                <div className="text-gray-700 mb-4 flex flex-row justify-center gap-10 bg-[#DCD5FB] rounded">
                    <p>
                        <strong>From:</strong> {fromDate}
                    </p>
                    <p>
                        <strong>To:</strong> {toDate}
                    </p>
                </div>
                <div className="text-gray-700 mb-4 flex flex-row justify-center gap-10 bg-[#DCD5FB] rounded">
                    <p>
                        <strong>Total Days:</strong>{" "}
                        {Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1}
                    </p>
                </div>
                <div className="text-gray-700 mb-4 flex flex-row justify-center gap-10 bg-[#DCD5FB] rounded">
                    <p>
                        <strong>Total Price:</strong> ₹{totalPrice}
                    </p>
                </div>

                <button
                    onClick={handlePayment}
                    className="mt-4 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Pay Now
                </button>
            </div>
           
            
        </div>
      
    );
};

export default PaymentPage;
