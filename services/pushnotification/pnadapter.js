import { AdminCreatedPNAdapter } from "./admin_created.pnadapter";


const PN_ADAPTERS = {
  ADMIN_CREATED_PN: 0,
};

const ADAPTER_REPO = {
  [PN_ADAPTERS.ADMIN_CREATED_PN]: AdminCreatedPNAdapter,
};

const getPNAdapter = (type) => {
  return ADAPTER_REPO[type];
};
export { PN_ADAPTERS, getPNAdapter };
