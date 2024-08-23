import axios from "axios";
import { useEffect, useState } from "react";
import { OrdersApi } from "../../utils/api";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopOrderedItems() {
  // State to store top ordered items
  const [topOrderedItemsState, setTopOrderedItemsState] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Fetch top ordered items when component mounts
  useEffect(() => {
    const fetchTopOrderedItems = async () => {
      try {
        const response = await axios.get(`${OrdersApi}/topOrderedItems`);
        setTopOrderedItemsState(response.data);
      } catch (error) {
        console.error("Error fetching top ordered items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopOrderedItems();
  }, []);

  // Handle card click to navigate to product details page
  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <h3 className="tw-text-center tw-text-3xl tw-font-bold tw-mb-6">
        Top Ordered Items
      </h3>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4">
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <div
                key={index}
                className="tw-w-full tw-h-[24rem] tw-flex tw-flex-col"
              >
                <Card className="tw-h-full">
                  <CardHeader className="tw-flex-1">
                    <Skeleton className="tw-h-full tw-w-full" />
                  </CardHeader>
                  <CardContent className="tw-flex-1">
                    <Skeleton className="tw-h-6 tw-mb-4" />
                    <Skeleton className="tw-h-4 tw-mb-2" />
                    <Skeleton className="tw-h-4" />
                  </CardContent>
                </Card>
              </div>
            ))
          : topOrderedItemsState.map((item) => (
              <div
                key={item.productId}
                className="tw-w-full tw-h-[24rem] tw-flex tw-flex-col"
              >
                <Card
                  onClick={() => handleCardClick(item.productId)}
                  className="tw-h-full tw-cursor-pointer hover:tw-shadow-lg hover:tw-shadow-gray-400 hover:tw-bg-gray-100"
                >
                  {/* Product Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="tw-w-full tw-h-48 tw-object-contain tw-rounded-t-lg"
                  />

                  <CardContent className="tw-flex-1 tw-overflow-hidden">
                    <CardTitle className="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-2">
                      {item.title}
                    </CardTitle>
                    <p className="tw-text-lg tw-font-bold tw-text-blue-600 tw-mb-2">
                      Price: ${item.price}
                    </p>
                    <p className="tw-text-gray-600">
                      Ordered: {item.orderCount} times
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
      </div>
    </>
  );
}
