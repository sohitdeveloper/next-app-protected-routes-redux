import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Login from "@/pages/login";
import { userLogin } from "@/services/global";

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
describe("Login", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  test("login the user", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const mockResponse = new Response(
      JSON.stringify({
        data: {
          user: {
            id: "b3627d15-5573-47ac-949b-bd2d11db4267",
            email: "sri@some.org",
            role: "admin",
          },
          token:
            "39754f808ae01152f844f53e81873ad7b8183915aade89b2a5096e86bb45def2",
        },
      }),
      {
        status: 200,
        statusText: "OK",
        headers: { "Content-type": "application/json" },
      }
    );

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const email: any = screen.getByPlaceholderText(/username/i);
    fireEvent.change(email, { target: { value: "sohit@gmail.com" } });
    const password: any = screen.getByPlaceholderText(/password/i);
    fireEvent.change(password, { target: { value: "root" } });
    const btn = screen.getByRole("button", {
      name: /login/i,
    });
    fireEvent.click(btn);
    const result = await userLogin({
      email: email.value,
      password: password.value,
    });
  });
});
