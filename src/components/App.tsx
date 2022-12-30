import Logo from "./Logo";
import ColorEditor from "./ColorEditor";
import NavItem from "./NavItem";

import { QueueListIcon, PencilIcon } from "@heroicons/react/24/outline";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex flex-1 w-full">
        <nav className="static w-60 border-r border-slate-200 z-10">
          <Logo />
          <NavItem icon={<QueueListIcon />} title={"Palettes"} />
          <NavItem icon={<PencilIcon />} title={"Editor"} />
        </nav>
        <main className="flex-1 overflow-auto">
          <div className="p-8 ">
            <ColorEditor color="#D66577" />
          </div>
        </main>
      </div>
      <footer className="p-4 bg-slate-50 border-t">
        <div>Footer</div>
      </footer>
    </div>
  );
}

export default App;
