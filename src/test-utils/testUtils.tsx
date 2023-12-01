import { useEffect, ReactElement } from "react";
import { QueryClientProvider, QueryClient, setLogger } from "react-query";
import { render as rtlRender } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "globals/themes";
import { AppProvider, DateRangeProvider } from "presentation/hooks/contexts";
import { useUserDetails } from "presentation/hooks/common";
import { Types } from "presentation/hooks/contexts/reducers";
import { UserDetailsRes } from "domain/entity/shared/models";
import { JobFunctions, Role } from "models/User";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => null,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

type DefaultRenderParams = Parameters<typeof rtlRender>;
type RenderUI = DefaultRenderParams[0];
type RtlRenderOptions = DefaultRenderParams[1];
type RenderReturnType = {
  result: ReturnType<typeof rtlRender>;
  history: ReturnType<typeof createMemoryHistory>;
};

type RenderOptions = RtlRenderOptions & {
  liveBlocksOrgId?: string;
  user?: Partial<UserDetailsRes>;
  path?: string;
  routePath?: string;
};

const defaultUser: UserDetailsRes = {
  fullName: "Test User",
  email: "testuser@crstl.so",
  id: "4842e3a8-9a75-43a5-a9b1-01786c36f1c1",
  organizationId: "test",
  organizationName: "ACME",
  role: Role.Admin,
  jobFunction: JobFunctions.Customer_Service,
  createdAt: new Date(),
  isRegistered: true,
  isActive: true,
  emailDomain: "gmail.com",
  lastSignInTime: "2021-11-28T04:31:01.768Z",
  timezone: "America/Los_Angeles",
  altLabel: "",
  timezoneId: "America-Los_Angeles",
  imageUrl: "",
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function SetupUser(data: UserDetailsRes) {
  const [, dispatch] = useUserDetails();

  useEffect(() => {
    dispatch({
      type: Types.AddUserDetails,
      payload: {
        data,
        isLoading: false,
      },
    });
  }, [data, dispatch]);

  return null;
}

function render(
  ui: RenderUI,
  {
    liveBlocksOrgId = "test",
    path = "/",
    routePath = "/",
    user = {},
    ...options
  }: RenderOptions = {}
): RenderReturnType {
  const history = createMemoryHistory({ initialEntries: [path] });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <Router history={history}>
        <Route path={routePath}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AppProvider>
                <DateRangeProvider>
                  <SetupUser {...defaultUser} {...user} />
                  {children}
                </DateRangeProvider>
              </AppProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </Route>
      </Router>
    );
  }
  return {
    result: rtlRender(ui, { wrapper: Wrapper, ...options }),
    history,
  };
}

export { render };
