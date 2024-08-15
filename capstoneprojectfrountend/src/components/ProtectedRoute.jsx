import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = (Components) => {
  return (props) => {
    const { userState } = useUserContext(); // Get userState os access userState.isAuthenticated from userContext
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      // console.log("protected reoute", userState);
      // If user is not authenticated redirect to login page
      if (!userState.isAuthenticated) {
        // console.log("protected route 2");
        router.push("/login");
      } else {
        // User is authenticated set ready to true
        setIsReady(true);
      }
    }, [userState.isAuthenticated, router]);

    // If not ready / not authenticated display loading message
    if (!isReady) {
      return <div>Loading...</div>;
    }

    // Render protected components once ready
    return <Components {...props} />;
  };
};

export default ProtectedRoute;
