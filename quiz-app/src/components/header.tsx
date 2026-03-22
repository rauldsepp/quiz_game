import logo from "../assets/logo.png";

export default function Header() {
    return (
        <header className="w-full bg-gray-50 p-5 mb-8">
            <div className="flex items-baseline">
                <img src={logo} alt="logo" className="w-30 h-10 object-contain"></img>
            </div>
        </header>
    );
}