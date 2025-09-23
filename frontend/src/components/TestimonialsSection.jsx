import { motion as _motion } from "framer-motion";
import { useMemo } from "react";
import AvatarImg from "../assets/avtar.png"; // <-- your avatar image

const generateTestimonials = () => {
  const comments = [
    "Smooth booking experience. Car was in great condition!",
    "Very affordable and professional service. Will use again.",
    "Customer support was super helpful during the whole process.",
    "Booked a car last minute for a weekend trip — process was seamless and the car was spotless!",
    "Highly recommend this platform for hassle-free car rentals.",
    "Amazing service! The car was clean and comfortable.",
    "Quick and easy booking process. Loved it!",
    "Staff was polite and helpful, very satisfied.",
    "Best car rental experience I've had so far.",
    "Perfect for weekend trips. Will use again.",
    "Smooth booking experience. Car was in great condition!",
  "Very affordable and professional service. Will use again.",
  "Customer support was super helpful during the whole process.",
  "Booked a car last minute for a weekend trip — process was seamless and the car was spotless!",
  "Highly recommend this platform for hassle-free car rentals.",
  "Amazing service! The car was clean and comfortable.",
  "Quick and easy booking process. Loved it!",
  "Staff was polite and helpful, very satisfied.",
  "Best car rental experience I've had so far.",
  "Perfect for weekend trips. Will use again.",
  "Car was delivered on time and in perfect condition.",
  "The app is user-friendly and booking is super easy.",
  "Prices are very reasonable compared to other rental services.",
  "Friendly staff and excellent customer support.",
  "Car was exactly as described in the listing.",
  "Enjoyed a hassle-free rental experience.",
  "Will definitely recommend to friends and family.",
  "Loved the clean and well-maintained vehicles.",
  "Easy pickup and drop-off process.",
  "Transparent pricing, no hidden charges.",
  "Booking confirmation was instant and reliable.",
  "Support team answered all my queries promptly.",
  "Convenient and flexible rental options.",
  "Car had all the features I needed for a road trip.",
  "Highly professional service throughout the booking.",
  "App interface is sleek and intuitive.",
  "Quick response from customer service.",
  "The car engine was smooth and fuel-efficient.",
  "Affordable for both short-term and long-term rentals.",
  "Loved the prompt delivery at my doorstep.",
  "Vehicle had excellent cleanliness and hygiene.",
  "Easy payment process with multiple options.",
  "Staff explained all the car features clearly.",
  "Reliable service, never had any issues.",
  "Perfect for business trips and personal use.",
  "Cars are regularly serviced and maintained.",
  "Flexible return and pick-up timings.",
  "Booking process is very fast and convenient.",
  "App notifications are timely and helpful.",
  "No hassles with insurance or documentation.",
  "Car interiors were spotless and comfortable.",
  "The platform is trustworthy and transparent.",
  "Easy cancellation and refund process.",
  "Rental experience exceeded my expectations.",
  "Friendly and courteous staff throughout.",
  "Loved the GPS-enabled cars for easy navigation.",
  "Excellent value for money.",
  "Smooth experience from start to finish.",
  "Cars have latest safety features.",
  "Very satisfied with the overall experience.",
  "Prompt service and professional staff."
  ];

  let testimonials = [];
  for (let i = 0; i < 100; i++) {
    const text = comments[Math.floor(Math.random() * comments.length)];
    testimonials.push({ text, img: AvatarImg });
  }

  // Shuffle array
  testimonials.sort(() => Math.random() - 0.5);

  return testimonials;
};

const TestimonialsSection = () => {
  const testimonials = useMemo(() => generateTestimonials(), []);
  const displayedTestimonials = testimonials.slice(0, 4); // show 4 per visit

  return (
    <div className="w-full bg-gradient-to-r from-purple-50 via-white to-purple-50 py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        What Our Customers Say
      </h2>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayedTestimonials.map((testimonial, index) => (
          <_motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center text-center gap-4"
          >
            {/* <img
              src={testimonial.img}
              alt="User Avatar"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover pt-2 border-2 border-blue-800"
            /> */}
            <p className="text-gray-700 italic text-sm md:text-base">"{testimonial.text}"</p>
          </_motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
