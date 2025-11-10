import { Button } from "./ui/button";
import logo from "/logo.svg";

export function Footer() {
  return (
    <footer className="bg-[#0A2243] p-10 flex justify-around gap-10 w-full">
      {/* Brand / Logo */}
      <aside className="flex flex-col items-center gap-3">
        <img src={logo} alt="" className="h-10" />

        <p className="text-sm text-white">
          <span className="font-semibold">ProFolio.</span>
          <br />
          Providing simple and efficient <br /> portfolio solutions.
        </p>
      </aside>

      {/* Services */}
      <div className="flex gap-10">

      <div className="flex flex-col gap-2">
        <h6 className="font-semibold mb-2 uppercase tracking-wide text-white">
          Services
        </h6>

        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            Branding
          </Button>
        </a>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <h6 className="font-semibold mb-2 uppercase tracking-wide text-white">
          Company
        </h6>
        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            About us
          </Button>
        </a>
        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            Contact
          </Button>
        </a>
      </div>

      {/* Legal */}
      <div className="flex flex-col gap-2">
        <h6 className="font-semibold mb-2 uppercase tracking-wide text-white">
          Legal
        </h6>
        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            Terms of use
          </Button>
        </a>
        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            Privacy policy
          </Button>
        </a>
        <a href="#">
          <Button variant={"link"} className={"text-white"}>
            Cookie policy
          </Button>
        </a>
      </div>
      </div>
    </footer>
  );
}
