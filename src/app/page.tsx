"use client";

import LogInComponent from "@/components/LogInComponent";
import FooterComponent from "@/components/ui/footerComponent";
import HeaderComponent from "@/components/ui/headerComponent";

export default function Home() {
  return (
    <div className="font-roboto m-0 max-h-screen">
      <HeaderComponent />

      <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4">
        <LogInComponent />
      </div>

      <FooterComponent />
    </div>
  );
}
