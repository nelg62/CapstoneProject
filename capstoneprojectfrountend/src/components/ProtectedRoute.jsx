import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = (Components) => {
  return (props) => {
    const { userState, userDispatch } = useUserContext();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    function verifyUserLoggedIn() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`${UserApi}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const user = response.data;
            console.log("loccal store", user);
            userDispatch({
              type: UserAction.Login,
              payload: { user, token },
            });
          })
          .catch(() => {
            localStorage.removeItem("token");
            router.push("/login");
          });
      }
    }

    useEffect(() => {
      console.log("protected reoute", userState);
      if (!userState.isAuthenticated) {
        console.log("protected route 2");
        router.push("/login");
      } else {
        setIsReady(true);
      }
    }, []);

    if (!isReady) {
      return <div>Loading...</div>;
    } else {
      return <Components {...props} />;
    }
  };
};

export default ProtectedRoute;
