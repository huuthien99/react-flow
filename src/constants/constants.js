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
    dataDefault: { typeWait: "random", timeWaitFrom: 1, timeWaitTo: 3 },
  },
  HTTP_REQUEST: { label: "HTTP Request", form: HttpRequestForm },
  TEMPORARY_MEMORY: { label: "Temporary Memory", form: TemporaryMemoryForm },
  LOG: { label: "Log", form: LogForm },
  NEW_TAB: { label: "New Tab", form: NewTabForm },
  OPEN_URL: { label: "Open URL", form: OpenUrlForm },
  SWITCH_TAB: { label: "Switch Tab", form: SwitchTabForm },
  CLOSE_TAB: { label: "Close Tab", form: CloseTabForm },
  RELOAD: { label: "Reload", form: ReloadForm },
  GET_URL: { label: "Get URL", form: GetUrlForm },
  GET_CONTENT_HTML: { label: "Get Content HTML", form: GetContentHtmlForm },
  SWITCH_IFRAME: { label: "Switch Iframe", form: SwitchIframeForm },
};

export const dialogTypes = {
  NODE: "node",
  SETTINGS: "settings",
};

export const AppOptions = {
  IS_ANIMATED_EDGE: true,
  IS_AUTO_SAVE: false,
  IS_DEBUG_MODE: false,
};
