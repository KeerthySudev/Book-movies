"use client";

import styles from './bookTickets.module.css';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; 

export default function BookingSummary() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const seatIDs = searchParams.get('seatIDs');
    // ?.split(',');
    const showId = searchParams.get('showID');
    const totalPrice = searchParams.get('total');
    const userId = '66dfe95bf56a51458f4ff32b';
    const [seats, setSeats] = useState([]);

    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setSeats(seatIDs.split(",").map((c) => c.trim()));
        const formData = {
            userId,
            showId,
            seatIDs,
            totalPrice,
        };

  

        try {
          const response = await fetch("http://localhost:5000/api/user/confirmBooking", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert("Booking added successfully");
          } else {
            alert("Failed book");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while adding the movie");
        }
      };

      // const handlePayment = () => {
      //   router.push(`/user/payment?seatIDs=${seatIDs}&showID=${showId}&total=${totalPrice}`);
      // };

      const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        loadRazorpayScript();
        if (seatIDs && showId && totalPrice) {
          // Call backend API to create Razorpay order
          fetch('http://localhost:5000/api/user/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: Number(totalPrice),
                seats: seatIDs.split(",").map(seat => seat.trim()),
                showId,
                userId }),
          })
            .then((res) => res.json())
            .then((data) => {
              // Proceed with Razorpay checkout using data from backend (order ID, amount)
              const options = {
                key: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
                amount: data.order.amount, // Amount from Razorpay
                currency: data.order.currency,
                name: 'Movie Ticket Booking',
                description: 'Booking Tickets',
                order_id: data.order.id, // Razorpay order ID
                handler: function (response) {
                  // Handle success and pass payment info to server
                  handlePaymentSuccess(response, seatIDs, showId);
                },
                prefill: {
                  name: 'User Name',
                  email: 'user@example.com',
                },
                theme: {
                  color: '#F37254',
                },
              };
    
              const razorpay = new (window as any).Razorpay(options); // TypeScript fix here
                razorpay.open();
            });
        }
      }
      const handlePaymentSuccess = (response: any, seats: string, showId: string) => {
        // Post payment success data to your backend for confirmation
        fetch('http://localhost:5000/api/user/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            seats,
            showId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert('Payment successful!');
              router.push('/user/movies');
            } else {
              alert('Payment failed!');
            }
          });
      };
  return (
    <main>
      <div className={styles.receiptContainer}>
      <h2 className={styles.title}>Booking Receipt</h2>
      <div className={styles.receiptDetails}>
        <p>
          <strong>Seat IDs:</strong> {seatIDs}
        </p>
        <p>
          <strong>Show ID:</strong> {showId}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{totalPrice}
        </p>
      </div>
      <button onClick={handlePayment} className={styles.payButton}>
        Pay
      </button>
    </div>
    </main>
  );
}
