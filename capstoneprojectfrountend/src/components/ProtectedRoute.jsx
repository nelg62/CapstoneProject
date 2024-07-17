import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (Components) => {
  return (props) => {
    const { user } = useUserContext();
    const router = useRouter();

    useEffect(() => {
      if (!user.isAuthenticated) {
        router.push("/login");
      }
    }, [user.isAuthenticated, router]);
    return user.isAuthenticated ? <Components {...props} /> : null;
  };
};

export default ProtectedRoute;
