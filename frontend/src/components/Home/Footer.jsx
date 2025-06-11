import { Facebook, Twitter, Youtube, YoutubeIcon } from "lucide-react";


function Footer() {

 return (
      <div className="block w-full mt-32 -mb-32">
            <footer className="footer flex justify-around p-10 bg-[var(--bg-color)] text-[var(--text-color)]">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
              <Twitter />
          </a>
          <a>
              <YoutubeIcon />
          </a>
          <a>
            <Facebook/>
          </a>
        </div>
      </nav>
      
    </footer>

    <aside className="w-full text-center p-6 bg-[var(--bg-color)] text-[var(--text-color)]">
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
      </div>
);
}
export default Footer