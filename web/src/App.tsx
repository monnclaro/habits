import "./libs/dayjs";

import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex w-full max-w-5xl flex-col gap-16 px-6">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}
