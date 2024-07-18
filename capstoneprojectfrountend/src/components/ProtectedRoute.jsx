import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (Components) => {
  return (props) => {
    const { userState } = useUserContext();
    const router = useRouter();

    useEffect(() => {
      if (!userState.isAuthenticated) {
        router.push("/login");
      }
    }, [userState.isAuthenticated, router]);
    return userState.isAuthenticated ? <Components {...props} /> : null;
  };
};

export default ProtectedRoute;
