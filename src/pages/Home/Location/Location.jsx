import "leaflet/dist/leaflet.css";
import { BsTrainFront } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker, HiOutlineMailOpen } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const Location = () => {
  return (
    <div className="mt-6 pb-12 md:pb-24">
      <SectionHeader title="Apartment’s location" desc="Prime location near parks, transit, shopping, and dining for your convenience."></SectionHeader>

      <div>
        <div className="flex flex-col md:flex-row gap-10 justify-between mt-16 mb-16">
          <div className="w-full max-w-96">
            <h1 className="text-[3rem] sm:text-[3.45rem] lg:text-[3.4rem] xl:text-[3.65rem] leading-[3.7rem] sm:leading-[4.5rem] font-semibold">Directions</h1>
            <div className="space-y-2 max-w-[36.875rem] mx-auto lg:mx-0 text-lg leading-8 mt-6">
              <p>
                <span className="inline-flex gap-2 items-center font-semibold border-b-[0.1875rem] bg-[#6b59f51e] border-b-primary-color">
                  <BsTrainFront />
                  By Public Transport:
                </span>{" "}
                Take the train to Sylhet Station, walk 2 mins.
              </p>
              <p>
                <span className="inline-flex gap-2 items-center font-semibold border-b-[0.1875rem] bg-[#6b59f51e] border-b-primary-color">
                  <IoCarSportOutline />
                  By Car:
                </span>{" "}
                Take the Main Street exit from Dhaka-Sylhet Highway, follow signs to Upashahar.
              </p>
            </div>
          </div>

          <div className="w-full max-w-96 pt-12">
            <ul className="space-y-6">
              <li className="flex gap-3">
                <HiOutlineMailOpen className="text-xl mt-1" />
                <p>
                  <span className="font-semibold">Email</span> <br />
                  <a href="mailto:contact@tenantix.com" className="underline cursor-pointer">
                    contact@tenantix.com
                  </a>
                </p>
              </li>

              <li className="flex gap-3">
                <FiPhone className="text-xl mt-1" />
                <p>
                  <span className="font-semibold">Phone</span> <br />
                  <a href="tel:+8801745678901" className="underline cursor-pointer">
                    +8801745678901
                  </a>
                </p>
              </li>

              <li className="flex gap-3">
                <HiOutlineLocationMarker className="text-xl mt-1" />
                <p>
                  <span className="font-semibold">Address</span> <br />
                  Street 12, Upashahar, Sylhet
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <MapContainer center={[24.88938953803653, 91.89110781554236]} zoom={15} className="rounded-3xl shadow" style={{ height: "25rem", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[24.88938953803653, 91.89110781554236]}>
              <Popup>
                Our Apartment <br /> Street 12, Block A.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Location;
