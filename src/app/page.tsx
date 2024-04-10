import AddressForm from "@/components/address-form";
import AddressList from "@/components/address-list";
import ToggleMode from "@/components/toggle-mode";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <div className="py-16 w-[90%] mx-auto">
          <div className="flex gap-6 justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Compress IPv6 Address</h1>
            <ToggleMode />
          </div>
          <AddressForm />
          <AddressList />
        </div>
      </main>
    </>
  );
}
