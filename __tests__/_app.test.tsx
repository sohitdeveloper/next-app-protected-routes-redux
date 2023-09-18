import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AppWrapper from "@/pages/_app";
import { Router } from "next/router";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));
describe("MyApp", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <AppWrapper
          pageProps={{}}
          Component={() => null}
          router={{} as Router}
        />
      </Provider>
    );
    // You can add assertions here to check if the component renders correctly.
  });
});
