import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = (Components) => {
  return (props) => {
    const { userState } = useUserContext();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (!userState.isAuthenticated) {
        router.push("/login");
      } else {
        setIsReady(true);
      }
    }, [userState.isAuthenticated, router]);

    if (!isReady) {
      return <div>Loading...</div>;
    }
    return <Components {...props} />;
  };
};

export default ProtectedRoute;
