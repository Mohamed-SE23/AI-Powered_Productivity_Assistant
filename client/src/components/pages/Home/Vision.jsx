import React from "react";
import { landingPage } from "../../../data/data";

const Vision = () => {
  const visionAndMission = landingPage.visionAndMission;

  return (
    <div className="my-20">
    <h1 className="text-4xl font-bold text-[#333] text-center mb-14">Vision and Mission</h1>
    <div className="md:flex-col md:space-y-16">
      {visionAndMission.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-row-reverse items-center gap-14 w-[65%] bg-white mb-16 p-8 shadow-lg rounded [&:nth-child(2)]:ml-auto
                                  lg:gap-4 md:flex-col md:m-auto md:w-[85%]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-[90px] w-auto lg:h-[160px]"
            />
            <div>
              <h1
                className="text-[#575757] mb-2 text-xl font-semibold
                                      lg:text-lg"
              >
                {item.title}
              </h1>
              <p className="text-[#575757] md:text-sm">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Vision;
