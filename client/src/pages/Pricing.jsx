import React, { useState } from 'react'
import Switch from '../components/ui/Switch';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card,CardTitle,CardContent,CardHeader } from '../components/ui/Card';


const Pricing = () => {
  const [isYearly,setIsYearly]=useState(false);
  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: ["10 document uploads", "5 languages", "Basic analytics", "Email support"]
    },
    {
      name: "Pro",
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: ["Unlimited uploads", "All languages", "Advanced analytics", "Priority support", "Custom branding"]
    }
  ];
  
  return (
    <div>
       {/* Pricing Section */}
       <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="flex justify-center items-center mb-8">
              <span className={`mr-2 ${!isYearly ? 'font-bold' : ''}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`ml-2 ${isYearly ? 'font-bold' : ''}`}>Yearly <span className="text-sm text-gray-600">(Save 20%)</span></span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className="border-2 border-black hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-black text-white p-6">
                    <CardTitle className="text-3xl font-extrabold">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-5xl font-bold mb-6">
                      ${isYearly ? (plan.yearlyPrice / 12).toFixed(2) : plan.monthlyPrice.toFixed(2)}
                      <span className="text-xl font-normal text-gray-600">/month</span>
                    </p>
                    {isYearly && (
                      <p className="text-sm text-gray-600 mb-6">Billed annually at ${plan.yearlyPrice.toFixed(2)}/year</p>
                    )}
                    <ul className="mb-8 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3 font-semibold transition-colors duration-300">
                      Get Started with {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center mt-12 text-gray-600">All plans come with a 14-day free trial. No credit card required.</p>
          </div>
        </section>
      
    </div>
  )
}

export default Pricing;

// import React from 'react';
// import { Check } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Pricing = () => {
//     const navigate=useNavigate();
//   const plans = [
//     {
//       name: 'Free',
//       price: '$0',
//       period: 'month',
//       features: [
//         'Basic features',
//         '5 Free Quiz Creation',
//         'Upto 10 People can take the Quiz'
    
//       ],
//       buttonText: 'Get Started',
//       buttonStyle: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//     },
//     {
//       name: 'Premium',
//       price: 'NA',
//       period: 'month',
//       features: [
//         'Unlimited Quiz Creation',
//         '100 People can take the Quiz',
//         'Price will be decided based on beta study'
//       ],
//       buttonText: 'Launching Soon',
//       buttonStyle: 'bg-black text-white hover:bg-gray-800'
//     }
//   ];
//   const handleButton=()=>{
//     // console.log("hii");
//       navigate('/signup');
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8">
//       {plans.map((plan, index) => (
//         <div key={index} className="w-full max-w-sm bg-slate-300 rounded-lg shadow-lg overflow-hidden">
//           <div className="px-6 py-8">
//             <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
//             <p className="text-center text-gray-600 mb-6">
//               <span className="text-4xl font-bold">{plan.price}</span>
//               <span className="text-xl">/{plan.period}</span>
//             </p>
//             <ul className="mb-8">
//               {plan.features.map((feature, featureIndex) => (
//                 <li key={featureIndex} className="flex items-center mb-3">
//                   <Check className="h-5 w-5 text-green-500 mr-2" />
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="px-6 pb-8">
//             <button  onClick={ plan.name==='Free' ? handleButton:undefined} className={`w-full py-2 px-4 rounded-full font-bold transition duration-300 ${plan.buttonStyle}`}>
//               {plan.buttonText}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Pricing;