import CloseTabForm from "@/templateForm/CloseTabForm";
import GetContentHtmlForm from "@/templateForm/GetContentHtmlForm";
import GetUrlForm from "@/templateForm/GetUrlForm";
import HttpRequestForm from "@/templateForm/HttpRequestForm";
import LogForm from "@/templateForm/LogForm";
import NewTabForm from "@/templateForm/NewTabForm";
import OpenUrlForm from "@/templateForm/OpenUrlForm";
import ReloadForm from "@/templateForm/ReloadForm";
import SwitchIframeForm from "@/templateForm/SwitchIframeForm";
import SwitchTabForm from "@/templateForm/SwitchTabForm";
import TemporaryMemoryForm from "@/templateForm/TemporaryMemoryForm";
import WaitForm from "@/templateForm/WaitForm";

export const typeNodes = {
  WAIT: {
    label: "Wait",
    form: WaitForm,
    dataDefault: {
      typeWait: "random",
      timeWaitFrom: 1,
      timeWaitTo: 3,
      isSelectedPointDebug: false,
    },
  },
  HTTP_REQUEST: {
    label: "HTTP Request",
    form: HttpRequestForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  TEMPORARY_MEMORY: {
    label: "Temporary Memory",
    form: TemporaryMemoryForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  LOG: {
    label: "Log",
    form: LogForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  NEW_TAB: {
    label: "New Tab",
    form: NewTabForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  OPEN_URL: {
    label: "Open URL",
    form: OpenUrlForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  SWITCH_TAB: {
    label: "Switch Tab",
    form: SwitchTabForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  CLOSE_TAB: {
    label: "Close Tab",
    form: CloseTabForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  RELOAD: {
    label: "Reload",
    form: ReloadForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  GET_URL: {
    label: "Get URL",
    form: GetUrlForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  GET_CONTENT_HTML: {
    label: "Get Content HTML",
    form: GetContentHtmlForm,
    dataDefault: { isSelectedPointDebug: false },
  },
  SWITCH_IFRAME: {
    label: "Switch Iframe",
    form: SwitchIframeForm,
    dataDefault: { isSelectedPointDebug: false },
  },
};

export const dialogTypes = {
  NODE: "node",
  SETTINGS: "settings",
};

export const AppOptions = {
  IS_ANIMATED_EDGE: true,
  IS_AUTO_SAVE: false,
  IS_DEBUG_MODE: false,
  DIAGRAM_OPTIONS: {
    meshType: "dots",
    transparent: 30,
    gap: 20,
    size: 1,
  },
};
