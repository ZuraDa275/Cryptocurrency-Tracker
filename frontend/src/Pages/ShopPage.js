import { FourCryptoCards } from "../components/FourCryptoCards";
import cryptoImage from "../CryptoBuckShop.png";

export default function ShopPage() {
  const items = [
    {
      id: 1,
      name: "500",
      price: "666.00",
      image: cryptoImage,
    },
    {
      id: 2,
      name: "2,500",
      price: "1,664.00",
      image: cryptoImage,
    },
    {
      id: 3,
      name: "5,000",
      price: "2,664.00",
      image: cryptoImage,
    },
    {
      id: 4,
      name: "10,000",
      price: "6,660.00",
      image: cryptoImage,
    },
  ];
  return (
    <>
      <FourCryptoCards items={items} />
    </>
  );
}
