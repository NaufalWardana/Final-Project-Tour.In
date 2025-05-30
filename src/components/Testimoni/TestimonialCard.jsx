import React from "react";
import { Quote, Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => (
  <div className="group h-[400px] bg-white rounded-md shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl border border-gray-100 flex flex-col">
    <div className="p-6 relative z-10 flex flex-col flex-grow">
      {/* Ikon kutipan */}
      <Quote className="absolute top-4 left-4 text-blue-100 w-16 h-16 -z-10" />
      <div className="flex-grow">
        {/* Kutipan testimonial */}
        <p className="text-center text-gray-700 italic mb-6 relative z-20">
          "{testimonial.quote}"
        </p>
      </div>
      <div className="mt-auto">
        <div className="flex items-center">
          {/* Avatar pengguna */}
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-100"
          />
          <div>
            {/* Nama pengguna */}
            <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
            <div className="flex items-center text-gray-600">
              {/* Ikon lokasi */}
              <testimonial.icon className="w-4 h-4 mr-2 text-blue-300" />
              <span className="text-sm">{testimonial.location}</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          {/* Rating bintang */}
          {[...Array(testimonial.rating)].map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-300 fill-current"
            />
          ))}
        </div>
      </div>
    </div>
    {/* Garis bawah animasi */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </div>
);

export default TestimonialCard;
