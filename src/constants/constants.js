import ClickMouseForm from "@/templateForm/ClickMouseForm";
import CloseTabForm from "@/templateForm/CloseTabForm";
import ConditionNodeForm from "@/templateForm/ConditionNodeForm";
import GetContentHtmlForm from "@/templateForm/GetContentHtmlForm";
import GetUrlForm from "@/templateForm/GetUrlForm";
import HttpRequestForm from "@/templateForm/HttpRequestForm";
import LogForm from "@/templateForm/LogForm";
import NewTabForm from "@/templateForm/NewTabForm";
import OpenUrlForm from "@/templateForm/OpenUrlForm";
import ReloadForm from "@/templateForm/ReloadForm";
import SelectOptionsForm from "@/templateForm/SelectOptionsForm";
import SwitchIframeForm from "@/templateForm/SwitchIframeForm";
import SwitchTabForm from "@/templateForm/SwitchTabForm";
import TemporaryMemoryForm from "@/templateForm/TemporaryMemoryForm";
import TypingTextForm from "@/templateForm/TypingTextForm";
import WaitForm from "@/templateForm/WaitForm";
import { v4 as uuidv4 } from "uuid";

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
    dataDefault: {
      isSelectedPointDebug: false,
      url: "",
      typeLoad: "domContent",
      timeWait: 0,
    },
  },
  OPEN_URL: {
    label: "Open URL",
    form: OpenUrlForm,
    dataDefault: {
      isSelectedPointDebug: false,
      url: "",
      typeLoad: "domContent",
      timeWait: 0,
    },
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
  CONDITION_NODE: {
    label: "Condition",
    form: ConditionNodeForm,
    dataDefault: {
      isSelectedPointDebug: false,
      branches: [
        {
          id: uuidv4(),
          operator: "",
          conditions: [],
          label: "Branch 1",
        },
      ],
    },
  },
  CLICK_MOUSE: {
    label: "Click mouse",
    form: ClickMouseForm,
    dataDefault: {
      isSelectedPointDebug: false,
      mode: "click",
      pushBtn: "left",
      selectType: "selector",
      selectorType: "xpath",
      coordinates: {
        x: 0,
        y: 0,
      },
      timeWait: 10,
      elementSelector: "",
    },
  },
  TYPING_TEXT: {
    label: "Typing Text",
    form: TypingTextForm,
    dataDefault: {
      isSelectedPointDebug: false,
      selectorType: "",
      text: "",
      time: 0.1,
      elementSelector: "",
    },
  },
  SELECT_OPTION: {
    label: "Select Options", // chọn tùy chọn
    form: SelectOptionsForm,
    dataDefault: {
      isSelectedPointDebug: false,
      selectorType: "",
      elementSelector: "",
      value: "",
      timeWait: 10,
    },
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
