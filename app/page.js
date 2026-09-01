import Hero from "./sections/Hero";
import Steps from "./sections/Steps";
import Featured from "./sections/Featured";
import Contacts from "./sections/Contacts";
import { getCatalog } from "@/lib/catalog";

export default async function Home() {
 const { products } = await getCatalog();
  return (
    <main>
      <Hero />
      <Featured products={products}/>
      <Steps />
      <Contacts />
    </main>
  );
}
