import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getTokenLocal } from "@/utils/common";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { setAuthentication } from "@/redux/authSlice";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  useEffect(() => {
    if (!getTokenLocal()) {
      if (typeof window !== "undefined") {
        router.push("/login");
      }
    } else {
      dispatch(setAuthentication(true));
    }
  }, []);
  console.log(isAuthenticated);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default function AppWrapper(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}
