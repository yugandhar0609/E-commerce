import React from "react";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-hero bg-center bg-no-repeat h-screen w-full">
      <div className="max_padd_container relative top-32 xs:top-52">
        <h1 className="h1 capitalize max-w-[33rem]">Digital shopping hub</h1>
        <p className="text-gray-50 regular-16 mt-6 max-w-[33rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora
          incidunt, fugiat natus quidem tenetur iure molestias commodi beatae
          nisi aspernatur excepturi expedita accusamus, quis velit odit aut
          impedit dolor?
        </p>
        <div className="flexStart !items-center gap-x-4 my-10">
          <div className="flexCenter gap-x-3 !regular-24 text-yellow-400">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
          </div>
          <div className="bold-16 sm:bold-20">
            176k
            <span className="regular-16 sm:regular-20">Excellent Reviews</span>
          </div>
        </div>
        <div className="max-xs:flex-col flex gap-2 ">
          <Link to="" className={"btn_dark_rounded flexCenter"}>
            Shop Now
          </Link>
          <Link to="" className={"btn_dark_rounded flexCenter gap-x-2"}>
            Offer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
