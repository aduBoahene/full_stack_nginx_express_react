import { Badge } from "lucide-react";

export default function InsurancePage() {
  return (
    <>
      <div>
        <h2 className=" text-3xl font-bold tracking-tight">Overview</h2>
      </div>

      <div className="flex flex-row gap-4">
        <div className="w-[245px] flex flex-col gap-4 border border-[#EAECF0] rounded-xl p-6">
          <div>
            <p className="text-sm font-normal text-[#9AA6BC]">
              Number of Policyholders
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="font-semibold text-2xl text-[#101828]">GHS 1,280</p>
            <Badge>6</Badge>
          </div>
        </div>
        <div className="w-[245px] flex flex-col gap-4 border border-[#EAECF0] rounded-xl p-6">
          <div>
            <p className="text-sm font-normal text-[#9AA6BC]">
              Total Premium Payable
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="font-semibold text-2xl text-[#101828]">GHS 1,280</p>
            <Badge>6</Badge>
          </div>
        </div>

        <div className="w-[506px] flex flex-row gap-8 border justify-between border-[#EAECF0] rounded-xl p-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-normal text-[#9AA6BC]">
                Total Premium Paid
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-between">
              <p className="font-semibold text-2xl text-[#101828]">GHS 1,280</p>
              <Badge>6</Badge>
            </div>
          </div>
          <div className="border h-[66px] border-[#F3F5F6]"></div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-normal text-[#9AA6BC]">
                Total Premium Outstanding
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-between">
              <p className="font-semibold text-2xl text-[#101828]">GHS 1,280</p>
              <Badge>6</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full pr-8">
        <div>
          <h2 className=" text-2xl font-bold tracking-tight">Policy Holders</h2>
        </div>
        <div>
          {/* <PolicyHolders /> */}
        </div>
      </div>
    </>
  );
}
