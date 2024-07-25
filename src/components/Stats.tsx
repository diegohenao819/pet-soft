"use client";

import { usePetContext } from "@/lib/hooks";

const Stats = () => {
    const {numberPets} = usePetContext();
  return (
    <div className="flex justify-between mt-5">
        <section className="px-4 ">
          <h1 className="text-white text-3xl font-semibold">
            Pet<span className="font-bold">Soft</span>
          </h1>
          <p className="text-white/70">Manage your pet daycare with ease!</p>
        </section>

        <section className="text-center px-4">
          <p className="text-lg font-bold text-white">{numberPets} </p>
          <p className="text-white/60">Current guests</p>
        </section>
      </div>
  )
}

export default Stats