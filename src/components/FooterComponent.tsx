
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FooterComponent = () => {
  const path = usePathname();

 

  

  const selectedPage = () => {
    switch (true) {
      case path === "/Trip/TripList":
        return {
          css: "w-auto h-10 items-center pl-2 mt-1",
          alt: "Plane",
          text: "Initiate a Trip",
          src: "/assets/Icons/Orion_aircraft-climb_white.svg",
          href: {
            pathname: "/Trip/AddTrip",
            query: { mode: "add" },
          },
          onClick: undefined,
        };
      
      default:
        return {
          css: "w-auto h-8 items-center pl-3 mt-2 ",
          alt: "map",
          text: "Go to Trip List",
          src: "/assets/Icons/Orion_destination-map 1.svg",
          href: "/Trip/TripList",
          onClick: undefined,
        };
    }
  };
  const bottom = selectedPage();
  return (
    <div className="fixed lg:relative  bottom-0 w-full">
      <div className=" bg-[#1ABC9C]  py-5 rounded-t-4xl  ">
        <div className="text-white flex justify-center text-4xl font-medium ">
          <Link href={bottom.href} onClick={bottom.onClick} className="flex">
            <p>{bottom.text}</p>
            <img className={bottom.css} src={bottom.src} alt={bottom.alt} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
