import { ReactFlowProvider } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AppOptions } from "./constants/constants";
import { DialogProvider } from "./context/DialogContext";
import { DnDProvider } from "./context/DnDContext";
import { routes } from "./routers/router";

const AppContext = createContext();

function App() {
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("appOptions");
    return saved
      ? JSON.parse(saved)
      : {
          animated: AppOptions.IS_ANIMATED_EDGE,
          isAutoSave: AppOptions.IS_AUTO_SAVE,
          isDebugMode: AppOptions.IS_DEBUG_MODE,
          diagramOptions: { ...AppOptions.DIAGRAM_OPTIONS },
        };
  });

  useEffect(() => {
    const prev = localStorage.getItem("appOptions");
    const next = JSON.stringify(options);
    if (prev !== next) {
      localStorage.setItem("appOptions", next);
    }
  }, [options]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/procedure", { replace: true });
    }
  }, [pathname]);

  return (
    <AppContext.Provider value={[options, setOptions]}>
      <ReactFlowProvider>
        <DnDProvider>
          <DialogProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routes.map((route, i) => (
                  <Route key={i} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Suspense>
          </DialogProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </AppContext.Provider>
  );
}

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
