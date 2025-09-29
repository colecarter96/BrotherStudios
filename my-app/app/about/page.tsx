"use client";

import LocomotiveScrollWrapper from "../components/LocomotiveScrollWrapper";
import Footer from "../components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function About() {
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)"); 
        const update = () => setIsMdUp(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return (
            <LocomotiveScrollWrapper>
                <section
                    data-scroll-section
                    className="md:h-[100dvh] flex justify-center items-center pt-28 pb-16 md:pt-0 md:pb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto items-center">
                        {isMdUp ? (
                        <div
                            data-scroll 
                            data-scroll-speed="-4" 
                        >
                            <div className="relative w-100 h-100 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]">
                                <Image
                                    src="/IMG_8149-min.png"
                                    alt="Bryce Photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        ) : (
                        <div>
                            <div className="relative w-100 h-100 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] mx-auto">
                                <Image
                                    src="/IMG_8149-min.png"
                                    alt="Bryce Photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        )}
                        {isMdUp ? (
                        <div
                            data-scroll 
                            data-scroll-speed="-2" 
                            className="mx-8"
                        >
                            <div className="mr-2">
                                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">Bryce Carter</h1>
                                <p className="pt-10 font-medium tracking-tight text-xl">
                                    Bryce is really just about all things new and fun. He is 
                                    pursuing a degree in Computer Science at Miramar College and plans to transfer. He loves to longboard
                                    and shortboard too. In the warmer months you'll find him with the gnarliest tan in the summer and ocean/sunbleached hair.
                                    In the colder months, dude has jeans on just about every day probably skating
                                    or maybe on his moped on the way to work. 
                                     

                                </p>

                                <p className="pt-4 font-medium tracking-tight text-xl">
                                    He will never back down from trying something new, and he is a wizard 
                                    when it comes to hand eye coordination. If he could eat raw fish everyday he would
                                    and if it wasn't raw fish, it would probably be ramen. His favorite show is the Office 
                                    and he probably knows all the lyrics to every song you can think of.
                                </p>
                            </div>
                        </div>
                        ) : (
                        <div>
                            <div className="px-2">
                                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">Bryce Carter</h1>
                                <p className="pt-10 font-medium tracking-tight text-xl">
                                    Bryce is really just about all things new and fun. He is 
                                    pursuing a degree in Computer Science at Miramar College. He loves to longboard
                                    and shortboard too. In the warmer months you'll find him with the gnarliest tan in the summer and ocean/sunbleached hair.
                                    In the colder months, dude has jeans on just about every day probably skating
                                    or maybe on his moped on the way to work. 
                                    

                                </p>

                                <p className="pt-4 font-medium tracking-tight text-xl">
                                    He will never back down from trying something new, and he is a wizard 
                                    when it comes to hand eye coordination. If he could eat raw fish everyday he would
                                    and if it wasn't raw fish, it would probably be ramen. His favorite show is the Office 
                                    and he probably knows all the lyrics to every song you can think of.
                                </p>
                            </div>
                        </div>
                        )}
                    </div>
                </section>

                <section
                    data-scroll-section
                    className="md:h-[100dvh] flex justify-center items-center py-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-center">
                    {isMdUp ? (
                    <div
                            data-scroll 
                            data-scroll-speed="-2" 
                        >
                            <div className="ml-4">
                                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">Bryce Carter</h1>
                                <p className="pt-10 font-medium tracking-tight text-xl">
                                    Bryce is really just about all things new and fun. He is 
                                    pursuing a degree in Computer Science at Miramar College. He loves to longboard
                                    and shortboard too. In the warmer months you'll find him with the gnarliest tan in the summer and ocean/sunbleached hair.
                                    In the colder months, dude has jeans on just about every day probably skating
                                    or maybe on his moped on the way to work. 
                                     

                                </p>

                                <p className="pt-4 font-medium tracking-tight text-xl">
                                    He will never back down from trying something new, and he is a wizard 
                                    when it comes to hand eye coordination. If he could eat raw fish everyday he would
                                    and if it wasn't raw fish, it would probably be ramen. His favorite show is the Office 
                                    and he probably knows all the lyrics to every song you can think of.
                                </p>
                            </div>
                        </div>
                    ) : (
                    <div>
                            <div className="px-2">
                                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">Bryce Carter</h1>
                                <p className="pt-10 font-medium tracking-tight text-xl">
                                    Bryce is really just about all things new and fun. He is 
                                    pursuing a degree in Computer Science at Miramar College. He loves to longboard
                                    and shortboard too. In the warmer months you'll find him with the gnarliest tan in the summer and ocean/sunbleached hair.
                                    In the colder months, dude has jeans on just about every day probably skating
                                    or maybe on his moped on the way to work. 
                                    

                                </p>

                                <p className="pt-4 font-medium tracking-tight text-xl">
                                    He will never back down from trying something new, and he is a wizard 
                                    when it comes to hand eye coordination. If he could eat raw fish everyday he would
                                    and if it wasn't raw fish, it would probably be ramen. His favorite show is the Office 
                                    and he probably knows all the lyrics to every song you can think of.
                                </p>
                            </div>
                        </div>
                    )}
                    {isMdUp ? (
                        <div
                            data-scroll 
                            data-scroll-speed="-4" 
                        >
                            <div className="relative w-100 h-100 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]">
                                <Image
                                    src="/IMG_8149-min.png"
                                    alt="Bryce Photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="relative w-100 h-100 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] mx-auto">
                                <Image
                                    src="/IMG_8149-min.png"
                                    alt="Bryce Photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}
                        
                    </div>
                </section>

                <section 
                    data-scroll-section
                >
                    <Footer />
                </section>
            </LocomotiveScrollWrapper>
        );
  }
  