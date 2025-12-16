"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Clock from "./Clock";

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-black py-12 px-6 border-t-[1.5px] bg-white">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8">
        {/* Image and Initials */}
        <div className="flex flex-col items-center mb-6 md:mb-0 ">
          <Image
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max"
            alt="Your Initials"
            width={340} // adjust as needed
            height={120} // adjust as needed
            className="object-cover"
          />
          {/* <p className="mt-2 text-xl font-semibold">CSC</p> */}
        </div>

        {/* Navigation and other info */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-12">
          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3">(NAVIGATION)</h3>
            <ul className="text-2xl font-semibold">
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/shop">SHOP</Link>
              </li>
              <li>
                <Link href="/about">ABOUT</Link>
              </li>
              <li>
                <Link href="/contact">CONTACT</Link>
              </li>
              <li>
                <Link href="/videos">VIDEOS</Link>
              </li>
            </ul>
          </div>

          {/* Other Info (Hidden on small screens) */}
          <div className="hidden md:flex flex-col">
            <h3 className="font-semibold mb-3">(INFO)</h3>
            <ul className="text-2xl font-semibold space-y-2">
              <li className="flex">
                <span className="">E: </span>{" "}
                <span className="font-medium"> the.twobrothers.studios@gmail.com</span>
              </li>
              <li className="flex">
                <span className="">M: </span>{" "}
                <span className="font-medium"> +1 (805) 754-7679</span>
              </li>
              <li className="flex">
                <span className="">H: </span>{" "}
                <span className="font-medium"> Monday-Friday, 9am-5pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col md:flex-row justify-between text-left">
        {/* Column 1 */}
        <div className="flex flex-col text-md font-semibold mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} TWO BROTHERS, ALL RIGHTS RESERVED</p>
          <p>SAN DIEGO🡒CA (PST)</p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col text-md font-semibold mb-4 md:mb-0">
          <p><a href="https://www.youtube.com/@TwoBrothers.Studios" target="_blank">YOUTUBE</a></p>
          <p><a href="https://www.youtube.com/@TwoBrothers.Studios" target="_blank">INSTAGRAM</a></p>
          <p><a href="https://www.youtube.com/@TwoBrothers.Studios" target="_blank">TIKTOK</a></p>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col text-md font-semibold">
          <Clock />
        </div>
      </div>
    </footer>
  );
};

export default Footer;