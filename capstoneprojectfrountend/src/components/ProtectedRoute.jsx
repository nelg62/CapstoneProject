const { useUserContext } = require("@/context/UserContext");
const { useRouter } = require("next/router");
const { useEffect } = require("react");

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
