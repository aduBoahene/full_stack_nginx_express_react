import { Menu } from "lucide-react";
import Image from "next/image";
import Menus from "./Menus";

const Sidebar = () => {
  return (
    <div className="  dark:bg-[#141414] w-[20%] flex-none   shadow-sm ">
      <div className="h-screen flex flex-col justify-between">
        <div className=" flex-col gap-8 pt-4 px-4  rounded-lg ju">
          <div className="flex flex-col pt-4 justify-center items-center gap-2 mb-2">
            <Image
              src="/bethniel.svg"
              alt="Bethniel Logo"
              className="dark:invert"
              width={124}
              height={45}
              priority
            />
            <p className=" font-bold text-base">Partners Hub</p>
            {/* <button>
              <Menu className="hover:bg-accent rounded-md w-10 h-8" />
            </button> */}
          </div>
          <hr />
          <div className="h-full overflow-auto mt-12">
            <Menus />{" "}
          </div>
        </div>
        <div>
          <hr />

          {/* <UserBox /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;