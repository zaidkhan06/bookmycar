import { Car, BadgeDollarSign, Headphones, Search, CalendarCheck, CarFront } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="w-full mt-10 bg-white py-12 px-6 text-center rounded-2xl">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose <span className="text-blue-800">BookMyCar?</span></h2>

      {/* 3 Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {/* Feature 1 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center">
          <Car className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">Wide Range of Cars</h3>
          <p className="text-gray-700 mt-2">Choose from economy to luxury vehicles.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center">
          <BadgeDollarSign className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">Affordable Pricing</h3>
          <p className="text-gray-700 mt-2">Best price guarantee with no hidden charges.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center">
          <Headphones className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">24/7 Customer Support</h3>
          <p className="text-gray-700 mt-2">We’re here to help you anytime, anywhere.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center w-full sm:w-1/3">
          <Search className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">1. Search Your Car</h3>
          <p className="text-gray-700 mt-2">Use our search bar to find the perfect ride.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center w-full sm:w-1/3">
          <CalendarCheck className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">2. Book Instantly</h3>
          <p className="text-gray-700 mt-2">Click ‘Book Now’ and fill in your details.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-[#DCD5FB] p-6 rounded-xl shadow flex flex-col items-center text-center w-full sm:w-1/3">
          <CarFront className="text-blue-800 w-10 h-10 mb-4" />
          <h3 className="font-bold text-lg text-blue-800">3. Pick Up & Drive</h3>
          <p className="text-gray-700 mt-2">Collect your car and enjoy the ride!</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
