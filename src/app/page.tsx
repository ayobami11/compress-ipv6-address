import AddressForm from "@/components/address-form";
import AddressList from "@/components/address-list";
import ToggleMode from "@/components/toggle-mode";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <ToggleMode />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Compress IPv6 Address</h1>
        <AddressForm />
        <Separator />
        <AddressList />
      </main>
    </>
  );
}
