import "./chunk-EQCVQC35.js";

// node_modules/@radixdlt/babylon-gateway-api-sdk/dist/babylon-gateway-api-sdk.mjs
var jn = Object.defineProperty;
var ei = (e, t, n) => t in e ? jn(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var p = (e, t, n) => (ei(e, typeof t != "symbol" ? t + "" : t, n), n);
var O = {
  Mainnet: 1,
  Stokenet: 2,
  Alphanet: 10,
  Betanet: 11,
  Kisharnet: 12,
  RCnetV1: 12,
  Zabanet: 14,
  RCnetV3: 14,
  Gilganet: 32,
  Enkinet: 33,
  Hammunet: 34,
  Nergalnet: 35,
  Mardunet: 36,
  Dumunet: 37,
  LocalNet: 240,
  InternalTestNet: 241,
  Simulator: 242
};
var ti = {
  Mainnet: {
    networkName: "Mainnet",
    networkId: O.Mainnet,
    gatewayUrl: "https://mainnet.radixdlt.com",
    dashboardUrl: "https://dashboard.radixdlt.com"
  },
  Stokenet: {
    networkName: "Stokenet",
    networkId: O.Stokenet,
    gatewayUrl: "https://stokenet.radixdlt.com",
    dashboardUrl: "https://stokenet-dashboard.radixdlt.com"
  },
  Kisharnet: {
    networkName: "Kisharnet",
    networkId: O.Kisharnet,
    gatewayUrl: "https://kisharnet-gateway.radixdlt.com",
    dashboardUrl: "https://kisharnet-dashboard.radixdlt.com"
  },
  RCnetV1: {
    networkName: "RCnetV1",
    networkId: O.RCnetV1,
    gatewayUrl: "https://rcnet.radixdlt.com",
    dashboardUrl: "https://rcnet-dashboard.radixdlt.com"
  },
  Mardunet: {
    networkName: "Mardunet",
    networkId: O.Mardunet,
    gatewayUrl: "https://mardunet-gateway.radixdlt.com",
    dashboardUrl: "https://mardunet-dashboard.rdx-works-main.extratools.works"
  },
  Zabanet: {
    networkName: "Zabanet",
    networkId: O.Zabanet,
    gatewayUrl: "https://zabanet-gateway.radixdlt.com",
    dashboardUrl: "https://rcnet-v3-dashboard.radixdlt.com"
  },
  RCnetV3: {
    networkName: "RCNetV3",
    networkId: O.RCnetV3,
    gatewayUrl: "https://zabanet-gateway.radixdlt.com",
    dashboardUrl: "https://rcnet-v3-dashboard.radixdlt.com"
  },
  Gilganet: {
    networkName: "Gilganet",
    networkId: O.Gilganet,
    gatewayUrl: "https://gilganet-gateway.radixdlt.com",
    dashboardUrl: "https://gilganet-dashboard.rdx-works-main.extratools.works"
  },
  Enkinet: {
    networkName: "Enkinet",
    networkId: O.Enkinet,
    gatewayUrl: "https://enkinet-gateway.radixdlt.com",
    dashboardUrl: "https://enkinet-dashboard.rdx-works-main.extratools.works"
  },
  Hammunet: {
    networkName: "Hammunet",
    networkId: O.Hammunet,
    gatewayUrl: "https://hammunet-gateway.radixdlt.com",
    dashboardUrl: "https://hammunet-dashboard.rdx-works-main.extratools.works"
  },
  Dumunet: {
    networkName: "Dumunet",
    networkId: O.Dumunet,
    gatewayUrl: "https://dumunet-gateway.radixdlt.com",
    dashboardUrl: "https://dumunet-dashboard.rdx-works-main.extratools.works"
  }
};
var ri = Object.values(ti).reduce(
  (e, t) => (e[t.networkId] = t, e),
  {}
);
var ni = "https://mainnet.radixdlt.com".replace(/\/+$/, "");
var Ee = class {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : ni;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || Ce;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
  get agent() {
    return this.configuration.agent;
  }
  get dispatcher() {
    return this.configuration.dispatcher;
  }
};
var ii = new Ee();
var w = class {
  constructor(t = ii) {
    p(this, "middleware");
    p(this, "fetchApi", async (t2, n) => {
      let i = { url: t2, init: n };
      for (const o of this.middleware)
        o.pre && (i = await o.pre({
          fetch: this.fetchApi,
          ...i
        }) || i);
      let a;
      try {
        a = await (this.configuration.fetchApi || fetch)(i.url, i.init);
      } catch (o) {
        for (const u of this.middleware)
          u.onError && (a = await u.onError({
            fetch: this.fetchApi,
            url: i.url,
            init: i.init,
            error: o,
            response: a ? a.clone() : void 0
          }) || a);
        if (a === void 0)
          throw o;
      }
      for (const o of this.middleware)
        o.post && (a = await o.post({
          fetch: this.fetchApi,
          url: i.url,
          init: i.init,
          response: a.clone()
        }) || a);
      return a;
    });
    this.configuration = t, this.middleware = t.middleware;
  }
  withMiddleware(...t) {
    const n = this.clone();
    return n.middleware = n.middleware.concat(...t), n;
  }
  withPreMiddleware(...t) {
    const n = t.map((i) => ({ pre: i }));
    return this.withMiddleware(...n);
  }
  withPostMiddleware(...t) {
    const n = t.map((i) => ({ post: i }));
    return this.withMiddleware(...n);
  }
  async request(t, n) {
    const { url: i, init: a } = await this.createFetchParams(t, n), o = await this.fetchApi(i, a);
    if (o && o.status >= 200 && o.status < 300)
      return o;
    throw await Z.from(o);
  }
  async createFetchParams(t, n) {
    let i = this.configuration.basePath + t.path;
    t.query !== void 0 && Object.keys(t.query).length !== 0 && (i += "?" + this.configuration.queryParamsStringify(t.query));
    const a = Object.assign({}, this.configuration.headers, t.headers);
    Object.keys(a).forEach((A) => a[A] === void 0 ? delete a[A] : {});
    const o = typeof n == "function" ? n : async () => n, u = {
      agent: this.configuration.agent,
      dispatcher: this.configuration.dispatcher,
      method: t.method,
      headers: a,
      body: t.body,
      credentials: this.configuration.credentials
    }, s = {
      ...u,
      ...await o({
        init: u,
        context: t
      })
    }, S = {
      ...s,
      body: oi(s.body) || s.body instanceof URLSearchParams || ai(s.body) ? s.body : JSON.stringify(s.body)
    };
    return { url: i, init: S };
  }
  clone() {
    const t = this.constructor, n = new t(this.configuration);
    return n.middleware = this.middleware.slice(), n;
  }
};
function ai(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function oi(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
var Z = class _Z extends Error {
  constructor(n, i, a) {
    super(a ? JSON.stringify(a) : "Unknown error occurred");
    p(this, "name", "ResponseError");
    this.fetchResponse = n, this.status = i, this.errorResponse = a;
  }
  static async from(n) {
    const i = n.status;
    try {
      const a = await n.json();
      return new _Z(n, i, a);
    } catch {
      return new _Z(n, i, void 0);
    }
  }
};
var c = class extends Error {
  constructor(n, i) {
    super(i);
    p(this, "name", "RequiredError");
    this.field = n;
  }
};
var pp = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function r(e, t) {
  const n = e[t];
  return n != null;
}
function Ce(e, t = "") {
  return Object.keys(e).map((n) => xe(n, e[n], t)).filter((n) => n.length > 0).join("&");
}
function xe(e, t, n = "") {
  const i = n + (n.length ? `[${e}]` : e);
  if (t instanceof Array) {
    const a = t.map((o) => encodeURIComponent(String(o))).join(`&${encodeURIComponent(i)}=`);
    return `${encodeURIComponent(i)}=${a}`;
  }
  if (t instanceof Set) {
    const a = Array.from(t);
    return xe(e, a, n);
  }
  return t instanceof Date ? `${encodeURIComponent(i)}=${encodeURIComponent(t.toISOString())}` : t instanceof Object ? Ce(t, i) : `${encodeURIComponent(i)}=${encodeURIComponent(String(t))}`;
}
function gp(e, t) {
  return Object.keys(e).reduce(
    (n, i) => ({ ...n, [i]: t(e[i]) }),
    {}
  );
}
function yp(e) {
  for (const t of e)
    if (t.contentType === "multipart/form-data")
      return true;
  return false;
}
var l = class {
  constructor(t, n = (i) => i) {
    this.raw = t, this.transformer = n;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
};
var Op = class {
  constructor(t) {
    this.raw = t;
  }
  async value() {
  }
};
var Sp = class {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.blob();
  }
};
var Np = class {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.text();
  }
};
var bp = {
  ResourceBadge: "ResourceBadge",
  NonFungibleBadge: "NonFungibleBadge"
};
function qe(e) {
  return ui(e);
}
function ui(e, t) {
  return e;
}
function Fp(e) {
  return e;
}
var Ap = {
  NonFungibleBadge: "NonFungibleBadge"
};
function Rp(e) {
  let t = true;
  return t = t && "badge_type" in e, t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t = t && "last_updated_at_state_version" in e, t;
}
function hp(e) {
  return Me(e);
}
function Me(e, t) {
  return e == null ? e : {
    badge_type: e.badge_type,
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function li(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type,
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
var kp = {
  ResourceBadge: "ResourceBadge"
};
function Tp(e) {
  let t = true;
  return t = t && "badge_type" in e, t = t && "resource_address" in e, t = t && "last_updated_at_state_version" in e, t;
}
function vp(e) {
  return Ue(e);
}
function Ue(e, t) {
  return e == null ? e : {
    badge_type: e.badge_type,
    resource_address: e.resource_address,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function si(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type,
      resource_address: e.resource_address,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function le(e) {
  return ci(e);
}
function ci(e, t) {
  if (e == null)
    return e;
  switch (e.badge_type) {
    case "NonFungibleBadge":
      return { ...Me(e), badge_type: "NonFungibleBadge" };
    case "ResourceBadge":
      return { ...Ue(e), badge_type: "ResourceBadge" };
    default:
      throw new Error(`No variant of AccountAuthorizedDepositorsResponseItem exists with 'badge_type=${e.badge_type}'`);
  }
}
function se(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.badge_type) {
      case "NonFungibleBadge":
        return li(e);
      case "ResourceBadge":
        return si(e);
      default:
        throw new Error(`No variant of AccountAuthorizedDepositorsResponseItem exists with 'badge_type=${e.badge_type}'`);
    }
  }
}
function Jp(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Ip(e) {
  return di(e);
}
function di(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(le)
  };
}
function Vp(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(se)
    };
}
function wp(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Pp(e) {
  return _i(e);
}
function _i(e, t) {
  return e == null ? e : {
    items: e.items.map(le)
  };
}
function Dp(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(se)
    };
}
var Ep = {
  NonFungibleBadge: "NonFungibleBadge"
};
function Cp(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t = t && "last_updated_at_state_version" in e, t;
}
function xp(e) {
  return fi(e);
}
function fi(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id,
    last_updated_at_state_version: e.last_updated_at_state_version,
    badge_type: r(e, "badge_type") ? e.badge_type : void 0
  };
}
function qp(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id,
      last_updated_at_state_version: e.last_updated_at_state_version,
      badge_type: e.badge_type
    };
}
var Mp = {
  ResourceBadge: "ResourceBadge"
};
function Up(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "last_updated_at_state_version" in e, t;
}
function Bp(e) {
  return mi(e);
}
function mi(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    last_updated_at_state_version: e.last_updated_at_state_version,
    badge_type: r(e, "badge_type") ? e.badge_type : void 0
  };
}
function Kp(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      last_updated_at_state_version: e.last_updated_at_state_version,
      badge_type: e.badge_type
    };
}
function Lp(e) {
  let t = true;
  return t = t && "badge_type" in e, t;
}
function Gp(e) {
  return pi(e);
}
function pi(e, t) {
  return e == null ? e : {
    badge_type: qe(e.badge_type)
  };
}
function Hp(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type
    };
}
var zp = {
  Accept: "Accept",
  Reject: "Reject",
  AllowExisting: "AllowExisting"
};
function gi(e) {
  return yi(e);
}
function yi(e, t) {
  return e;
}
function Wp(e) {
  return e;
}
var $p = {
  Allowed: "Allowed",
  Disallowed: "Disallowed"
};
function Be(e) {
  return Oi(e);
}
function Oi(e, t) {
  return e;
}
function Xp(e) {
  return e;
}
function Zp(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "vault_exists" in e, t = t && "is_xrd" in e, t;
}
function Si(e) {
  return Ni(e);
}
function Ni(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    vault_exists: e.vault_exists,
    is_xrd: e.is_xrd,
    resource_preference_rule: r(e, "resource_preference_rule") ? Be(e.resource_preference_rule) : void 0
  };
}
function bi(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      vault_exists: e.vault_exists,
      is_xrd: e.is_xrd,
      resource_preference_rule: e.resource_preference_rule
    };
}
function Qp(e) {
  let t = true;
  return t = t && "default_deposit_rule" in e, t;
}
function Ke(e) {
  return Fi(e);
}
function Fi(e, t) {
  return e == null ? e : {
    is_badge_authorized_depositor: r(e, "is_badge_authorized_depositor") ? e.is_badge_authorized_depositor : void 0,
    default_deposit_rule: gi(e.default_deposit_rule),
    resource_specific_details: r(e, "resource_specific_details") ? e.resource_specific_details.map(Si) : void 0
  };
}
function Le(e) {
  if (e !== void 0)
    return e === null ? null : {
      is_badge_authorized_depositor: e.is_badge_authorized_depositor,
      default_deposit_rule: e.default_deposit_rule,
      resource_specific_details: e.resource_specific_details === void 0 ? void 0 : e.resource_specific_details.map(bi)
    };
}
var Yp = {
  NonFungibleBadge: "NonFungibleBadge"
};
function jp(e) {
  let t = true;
  return t = t && "badge_type" in e, t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t;
}
function eg(e) {
  return Ge(e);
}
function Ge(e, t) {
  return e == null ? e : {
    badge_type: e.badge_type,
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id
  };
}
function Ai(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type,
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id
    };
}
var tg = {
  NonFungibleBadge: "NonFungibleBadge"
};
function rg(e) {
  let t = true;
  return t = t && "non_fungible_id" in e, t;
}
function ng(e) {
  return Ri(e);
}
function Ri(e, t) {
  return e == null ? e : {
    non_fungible_id: e.non_fungible_id,
    badge_type: r(e, "badge_type") ? e.badge_type : void 0
  };
}
function ig(e) {
  if (e !== void 0)
    return e === null ? null : {
      non_fungible_id: e.non_fungible_id,
      badge_type: e.badge_type
    };
}
var ag = {
  ResourceBadge: "ResourceBadge"
};
function og(e) {
  let t = true;
  return t = t && "badge_type" in e, t = t && "resource_address" in e, t;
}
function ug(e) {
  return He(e);
}
function He(e, t) {
  return e == null ? e : {
    badge_type: e.badge_type,
    resource_address: e.resource_address
  };
}
function hi(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type,
      resource_address: e.resource_address
    };
}
function ze(e) {
  return ki(e);
}
function ki(e, t) {
  if (e == null)
    return e;
  switch (e.badge_type) {
    case "NonFungibleBadge":
      return { ...Ge(e), badge_type: "NonFungibleBadge" };
    case "ResourceBadge":
      return { ...He(e), badge_type: "ResourceBadge" };
    default:
      throw new Error(`No variant of TransactionAccountDepositPreValidationAuthorizedDepositorBadge exists with 'badge_type=${e.badge_type}'`);
  }
}
function We(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.badge_type) {
      case "NonFungibleBadge":
        return Ai(e);
      case "ResourceBadge":
        return hi(e);
      default:
        throw new Error(`No variant of TransactionAccountDepositPreValidationAuthorizedDepositorBadge exists with 'badge_type=${e.badge_type}'`);
    }
  }
}
function lg(e) {
  let t = true;
  return t = t && "account_address" in e, t = t && "resource_addresses" in e, t;
}
function sg(e) {
  return Ti(e);
}
function Ti(e, t) {
  return e == null ? e : {
    account_address: e.account_address,
    resource_addresses: e.resource_addresses,
    badge: r(e, "badge") ? ze(e.badge) : void 0
  };
}
function vi(e) {
  if (e !== void 0)
    return e === null ? null : {
      account_address: e.account_address,
      resource_addresses: e.resource_addresses,
      badge: We(e.badge)
    };
}
function cg(e) {
  let t = true;
  return t = t && "account_address" in e, t = t && "resource_addresses" in e, t;
}
function dg(e) {
  return Ji(e);
}
function Ji(e, t) {
  return e == null ? e : {
    account_address: e.account_address,
    resource_addresses: e.resource_addresses,
    badge: r(e, "badge") ? ze(e.badge) : void 0
  };
}
function _g(e) {
  if (e !== void 0)
    return e === null ? null : {
      account_address: e.account_address,
      resource_addresses: e.resource_addresses,
      badge: We(e.badge)
    };
}
var fg = {
  ResourceBadge: "ResourceBadge"
};
function mg(e) {
  return true;
}
function pg(e) {
  return Ii(e);
}
function Ii(e, t) {
  return e == null ? e : {
    badge_type: r(e, "badge_type") ? e.badge_type : void 0
  };
}
function gg(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type
    };
}
function yg(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "allows_try_deposit" in e, t;
}
function $e(e) {
  return Vi(e);
}
function Vi(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    allows_try_deposit: e.allows_try_deposit
  };
}
function Xe(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      allows_try_deposit: e.allows_try_deposit
    };
}
function Og(e) {
  let t = true;
  return t = t && "network" in e, t = t && "state_version" in e, t = t && "proposer_round_timestamp" in e, t = t && "epoch" in e, t = t && "round" in e, t;
}
function d(e) {
  return wi(e);
}
function wi(e, t) {
  return e == null ? e : {
    network: e.network,
    state_version: e.state_version,
    proposer_round_timestamp: e.proposer_round_timestamp,
    epoch: e.epoch,
    round: e.round
  };
}
function _(e) {
  if (e !== void 0)
    return e === null ? null : {
      network: e.network,
      state_version: e.state_version,
      proposer_round_timestamp: e.proposer_round_timestamp,
      epoch: e.epoch,
      round: e.round
    };
}
function Sg(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "allows_try_deposit_batch" in e, t = t && "deciding_factors" in e, t;
}
function Pi(e) {
  return Di(e);
}
function Di(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    allows_try_deposit_batch: e.allows_try_deposit_batch,
    resource_specific_behaviour: r(e, "resource_specific_behaviour") ? e.resource_specific_behaviour.map($e) : void 0,
    deciding_factors: Ke(e.deciding_factors)
  };
}
function Ng(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      allows_try_deposit_batch: e.allows_try_deposit_batch,
      resource_specific_behaviour: e.resource_specific_behaviour === void 0 ? void 0 : e.resource_specific_behaviour.map(Xe),
      deciding_factors: Le(e.deciding_factors)
    };
}
function bg(e) {
  let t = true;
  return t = t && "allows_try_deposit_batch" in e, t = t && "deciding_factors" in e, t;
}
function Fg(e) {
  return Ei(e);
}
function Ei(e, t) {
  return e == null ? e : {
    allows_try_deposit_batch: e.allows_try_deposit_batch,
    resource_specific_behaviour: r(e, "resource_specific_behaviour") ? e.resource_specific_behaviour.map($e) : void 0,
    deciding_factors: Ke(e.deciding_factors)
  };
}
function Ag(e) {
  if (e !== void 0)
    return e === null ? null : {
      allows_try_deposit_batch: e.allows_try_deposit_batch,
      resource_specific_behaviour: e.resource_specific_behaviour === void 0 ? void 0 : e.resource_specific_behaviour.map(Xe),
      deciding_factors: Le(e.deciding_factors)
    };
}
function Rg(e) {
  let t = true;
  return t = t && "locker_address" in e, t = t && "account_address" in e, t;
}
function Ze(e) {
  return Ci(e);
}
function Ci(e, t) {
  return e == null ? e : {
    locker_address: e.locker_address,
    account_address: e.account_address
  };
}
function Qe(e) {
  if (e !== void 0)
    return e === null ? null : {
      locker_address: e.locker_address,
      account_address: e.account_address
    };
}
var hg = {
  AccountLockerNotFoundError: "AccountLockerNotFoundError"
};
function kg(e) {
  let t = true;
  return t = t && "type" in e, t = t && "locker_address" in e, t = t && "account_address" in e, t;
}
function Tg(e) {
  return Ye(e);
}
function Ye(e, t) {
  return e == null ? e : {
    type: e.type,
    locker_address: e.locker_address,
    account_address: e.account_address
  };
}
function xi(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      locker_address: e.locker_address,
      account_address: e.account_address
    };
}
var vg = {
  AccountLockerNotFoundError: "AccountLockerNotFoundError"
};
function Jg(e) {
  return true;
}
function Ig(e) {
  return qi(e);
}
function qi(e, t) {
  return e == null ? e : {
    type: r(e, "type") ? e.type : void 0
  };
}
function Vg(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
var wg = {
  Fungible: "Fungible"
};
function Pg(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "vault_address" in e, t = t && "last_updated_at_state_version" in e, t = t && "amount" in e, t;
}
function Dg(e) {
  return je(e);
}
function je(e, t) {
  return e == null ? e : {
    type: e.type,
    resource_address: e.resource_address,
    vault_address: e.vault_address,
    last_updated_at_state_version: e.last_updated_at_state_version,
    amount: e.amount
  };
}
function Mi(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      vault_address: e.vault_address,
      last_updated_at_state_version: e.last_updated_at_state_version,
      amount: e.amount
    };
}
var Eg = {
  NonFungible: "NonFungible"
};
function Cg(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "vault_address" in e, t = t && "last_updated_at_state_version" in e, t = t && "total_count" in e, t;
}
function xg(e) {
  return et(e);
}
function et(e, t) {
  return e == null ? e : {
    type: e.type,
    resource_address: e.resource_address,
    vault_address: e.vault_address,
    last_updated_at_state_version: e.last_updated_at_state_version,
    total_count: e.total_count
  };
}
function Ui(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      vault_address: e.vault_address,
      last_updated_at_state_version: e.last_updated_at_state_version,
      total_count: e.total_count
    };
}
function ce(e) {
  return Bi(e);
}
function Bi(e, t) {
  if (e == null)
    return e;
  switch (e.type) {
    case "Fungible":
      return { ...je(e), type: "Fungible" };
    case "NonFungible":
      return { ...et(e), type: "NonFungible" };
    default:
      throw new Error(`No variant of AccountLockerVaultCollectionItem exists with 'type=${e.type}'`);
  }
}
function de(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.type) {
      case "Fungible":
        return Mi(e);
      case "NonFungible":
        return Ui(e);
      default:
        throw new Error(`No variant of AccountLockerVaultCollectionItem exists with 'type=${e.type}'`);
    }
  }
}
function qg(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Mg(e) {
  return Ki(e);
}
function Ki(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(ce)
  };
}
function Ug(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(de)
    };
}
function Bg(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Kg(e) {
  return Li(e);
}
function Li(e, t) {
  return e == null ? e : {
    items: e.items.map(ce)
  };
}
function Lg(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(de)
    };
}
var Gg = {
  Fungible: "Fungible",
  NonFungible: "NonFungible"
};
function Gi(e) {
  return Hi(e);
}
function Hi(e, t) {
  return e;
}
function Hg(e) {
  return e;
}
function zg(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "vault_address" in e, t = t && "last_updated_at_state_version" in e, t;
}
function Wg(e) {
  return zi(e);
}
function zi(e, t) {
  return e == null ? e : {
    type: Gi(e.type),
    resource_address: e.resource_address,
    vault_address: e.vault_address,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function $g(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      vault_address: e.vault_address,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
var Xg = {
  Fungible: "Fungible"
};
function Zg(e) {
  let t = true;
  return t = t && "amount" in e, t;
}
function Qg(e) {
  return Wi(e);
}
function Wi(e, t) {
  return e == null ? e : {
    amount: e.amount,
    type: r(e, "type") ? e.type : void 0
  };
}
function Yg(e) {
  if (e !== void 0)
    return e === null ? null : {
      amount: e.amount,
      type: e.type
    };
}
var jg = {
  NonFungible: "NonFungible"
};
function ey(e) {
  let t = true;
  return t = t && "total_count" in e, t;
}
function ty(e) {
  return $i(e);
}
function $i(e, t) {
  return e == null ? e : {
    total_count: e.total_count,
    type: r(e, "type") ? e.type : void 0
  };
}
function ry(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      type: e.type
    };
}
function ny(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "resource_preference_rule" in e, t = t && "last_updated_at_state_version" in e, t;
}
function _e(e) {
  return Xi(e);
}
function Xi(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    resource_preference_rule: Be(e.resource_preference_rule),
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function fe(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      resource_preference_rule: e.resource_preference_rule,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function iy(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function ay(e) {
  return Zi(e);
}
function Zi(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(_e)
  };
}
function oy(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(fe)
    };
}
function uy(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function ly(e) {
  return Qi(e);
}
function Qi(e, t) {
  return e == null ? e : {
    items: e.items.map(_e)
  };
}
function sy(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(fe)
    };
}
function cy(e) {
  return true;
}
function f(e) {
  return Yi(e);
}
function Yi(e, t) {
  return e == null ? e : {
    state_version: r(e, "state_version") ? e.state_version : void 0,
    timestamp: r(e, "timestamp") ? e.timestamp === null ? null : new Date(e.timestamp) : void 0,
    epoch: r(e, "epoch") ? e.epoch : void 0,
    round: r(e, "round") ? e.round : void 0
  };
}
function m(e) {
  if (e !== void 0)
    return e === null ? null : {
      state_version: e.state_version,
      timestamp: e.timestamp === void 0 ? void 0 : e.timestamp === null ? null : e.timestamp.toISOString(),
      epoch: e.epoch,
      round: e.round
    };
}
function dy(e) {
  return true;
}
function _y(e) {
  return ji(e);
}
function ji(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0
  };
}
function fy(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state)
    };
}
var my = {
  Xrd: "XRD",
  Usd: "USD"
};
function py(e) {
  let t = true;
  return t = t && "amount" in e, t = t && "unit" in e, t;
}
function tt(e) {
  return ea(e);
}
function ea(e, t) {
  return e == null ? e : {
    amount: e.amount,
    unit: e.unit
  };
}
function rt(e) {
  if (e !== void 0)
    return e === null ? null : {
      amount: e.amount,
      unit: e.unit
    };
}
function gy(e) {
  let t = true;
  return t = t && "method_name" in e, t;
}
function ta(e) {
  return ra(e);
}
function ra(e, t) {
  return e == null ? e : {
    method_name: e.method_name,
    royalty_amount: r(e, "royalty_amount") ? tt(e.royalty_amount) : void 0
  };
}
function na(e) {
  if (e !== void 0)
    return e === null ? null : {
      method_name: e.method_name,
      royalty_amount: rt(e.royalty_amount)
    };
}
function yy(e) {
  let t = true;
  return t = t && "is_enabled" in e, t;
}
function ia(e) {
  return aa(e);
}
function aa(e, t) {
  return e == null ? e : {
    is_enabled: e.is_enabled,
    method_rules: r(e, "method_rules") ? e.method_rules.map(ta) : void 0
  };
}
function oa(e) {
  if (e !== void 0)
    return e === null ? null : {
      is_enabled: e.is_enabled,
      method_rules: e.method_rules === void 0 ? void 0 : e.method_rules.map(na)
    };
}
var Oy = {
  General: "General",
  Transfer: "Transfer",
  PoolContribution: "PoolContribution",
  PoolRedemption: "PoolRedemption",
  ValidatorStake: "ValidatorStake",
  ValidatorUnstake: "ValidatorUnstake",
  ValidatorClaim: "ValidatorClaim",
  AccountDepositSettingsUpdate: "AccountDepositSettingsUpdate"
};
function nt(e) {
  return ua(e);
}
function ua(e, t) {
  return e;
}
function la(e) {
  return e;
}
function Sy(e) {
  let t = true;
  return t = t && "entity_address" in e, t = t && "resource_address" in e, t = t && "balance_change" in e, t;
}
function sa(e) {
  return ca(e);
}
function ca(e, t) {
  return e == null ? e : {
    entity_address: e.entity_address,
    resource_address: e.resource_address,
    balance_change: e.balance_change
  };
}
function da(e) {
  if (e !== void 0)
    return e === null ? null : {
      entity_address: e.entity_address,
      resource_address: e.resource_address,
      balance_change: e.balance_change
    };
}
var Ny = {
  FeePayment: "FeePayment",
  FeeDistributed: "FeeDistributed",
  TipDistributed: "TipDistributed",
  RoyaltyDistributed: "RoyaltyDistributed"
};
function _a(e) {
  return fa(e);
}
function fa(e, t) {
  return e;
}
function by(e) {
  return e;
}
function Fy(e) {
  let t = true;
  return t = t && "type" in e, t = t && "entity_address" in e, t = t && "resource_address" in e, t = t && "balance_change" in e, t;
}
function ma(e) {
  return pa(e);
}
function pa(e, t) {
  return e == null ? e : {
    type: _a(e.type),
    entity_address: e.entity_address,
    resource_address: e.resource_address,
    balance_change: e.balance_change
  };
}
function ga(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      entity_address: e.entity_address,
      resource_address: e.resource_address,
      balance_change: e.balance_change
    };
}
function Ay(e) {
  let t = true;
  return t = t && "entity_address" in e, t = t && "resource_address" in e, t = t && "added" in e, t = t && "removed" in e, t;
}
function ya(e) {
  return Oa(e);
}
function Oa(e, t) {
  return e == null ? e : {
    entity_address: e.entity_address,
    resource_address: e.resource_address,
    added: e.added,
    removed: e.removed
  };
}
function Sa(e) {
  if (e !== void 0)
    return e === null ? null : {
      entity_address: e.entity_address,
      resource_address: e.resource_address,
      added: e.added,
      removed: e.removed
    };
}
function Ry(e) {
  let t = true;
  return t = t && "fungible_fee_balance_changes" in e, t = t && "fungible_balance_changes" in e, t = t && "non_fungible_balance_changes" in e, t;
}
function Na(e) {
  return ba(e);
}
function ba(e, t) {
  return e == null ? e : {
    fungible_fee_balance_changes: e.fungible_fee_balance_changes.map(ma),
    fungible_balance_changes: e.fungible_balance_changes.map(sa),
    non_fungible_balance_changes: e.non_fungible_balance_changes.map(ya)
  };
}
function Fa(e) {
  if (e !== void 0)
    return e === null ? null : {
      fungible_fee_balance_changes: e.fungible_fee_balance_changes.map(ga),
      fungible_balance_changes: e.fungible_balance_changes.map(da),
      non_fungible_balance_changes: e.non_fungible_balance_changes.map(Sa)
    };
}
var hy = {
  Bool: "Bool",
  I8: "I8",
  I16: "I16",
  I32: "I32",
  I64: "I64",
  I128: "I128",
  U8: "U8",
  U16: "U16",
  U32: "U32",
  U64: "U64",
  U128: "U128",
  String: "String",
  Enum: "Enum",
  Array: "Array",
  Bytes: "Bytes",
  Map: "Map",
  Tuple: "Tuple",
  Reference: "Reference",
  Own: "Own",
  Decimal: "Decimal",
  PreciseDecimal: "PreciseDecimal",
  NonFungibleLocalId: "NonFungibleLocalId"
};
function N(e) {
  return Aa(e);
}
function Aa(e, t) {
  return e;
}
function ky(e) {
  return e;
}
var Ty = {
  Array: "Array"
};
function vy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "element_kind" in e, t = t && "elements" in e, t;
}
function Jy(e) {
  return it(e);
}
function it(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    element_kind: N(e.element_kind),
    element_type_name: r(e, "element_type_name") ? e.element_type_name : void 0,
    elements: e.elements.map(g)
  };
}
function Ra(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      element_kind: e.element_kind,
      element_type_name: e.element_type_name,
      elements: e.elements.map(y)
    };
}
var Iy = {
  Bool: "Bool"
};
function Vy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function wy(e) {
  return at(e);
}
function at(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function ha(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var Py = {
  Bytes: "Bytes"
};
function Dy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "element_kind" in e, t = t && "hex" in e, t;
}
function Ey(e) {
  return ot(e);
}
function ot(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    element_kind: N(e.element_kind),
    element_type_name: r(e, "element_type_name") ? e.element_type_name : void 0,
    hex: e.hex
  };
}
function ka(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      element_kind: e.element_kind,
      element_type_name: e.element_type_name,
      hex: e.hex
    };
}
var Cy = {
  Decimal: "Decimal"
};
function xy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function qy(e) {
  return ut(e);
}
function ut(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ta(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var My = {
  Enum: "Enum"
};
function Uy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "variant_id" in e, t = t && "fields" in e, t;
}
function By(e) {
  return lt(e);
}
function lt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    variant_id: e.variant_id,
    variant_name: r(e, "variant_name") ? e.variant_name : void 0,
    fields: e.fields.map(g)
  };
}
function va(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      variant_id: e.variant_id,
      variant_name: e.variant_name,
      fields: e.fields.map(y)
    };
}
var Ky = {
  I128: "I128"
};
function Ly(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function Gy(e) {
  return st(e);
}
function st(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ja(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var Hy = {
  I16: "I16"
};
function zy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function Wy(e) {
  return ct(e);
}
function ct(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ia(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var $y = {
  I32: "I32"
};
function Xy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function Zy(e) {
  return dt(e);
}
function dt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Va(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var Qy = {
  I64: "I64"
};
function Yy(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function jy(e) {
  return _t(e);
}
function _t(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function wa(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var eO = {
  I8: "I8"
};
function tO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function rO(e) {
  return ft(e);
}
function ft(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Pa(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
function nO(e) {
  let t = true;
  return t = t && "key" in e, t = t && "value" in e, t;
}
function mt(e) {
  return Da(e);
}
function Da(e, t) {
  return e == null ? e : {
    key: g(e.key),
    value: g(e.value)
  };
}
function pt(e) {
  if (e !== void 0)
    return e === null ? null : {
      key: y(e.key),
      value: y(e.value)
    };
}
var iO = {
  Map: "Map"
};
function aO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "key_kind" in e, t = t && "value_kind" in e, t = t && "entries" in e, t;
}
function oO(e) {
  return gt(e);
}
function gt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    key_kind: N(e.key_kind),
    key_type_name: r(e, "key_type_name") ? e.key_type_name : void 0,
    value_kind: N(e.value_kind),
    value_type_name: r(e, "value_type_name") ? e.value_type_name : void 0,
    entries: e.entries.map(mt)
  };
}
function Ea(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      key_kind: e.key_kind,
      key_type_name: e.key_type_name,
      value_kind: e.value_kind,
      value_type_name: e.value_type_name,
      entries: e.entries.map(pt)
    };
}
var uO = {
  NonFungibleLocalId: "NonFungibleLocalId"
};
function lO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function sO(e) {
  return yt(e);
}
function yt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ca(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var cO = {
  Own: "Own"
};
function dO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function _O(e) {
  return Ot(e);
}
function Ot(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function xa(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var fO = {
  PreciseDecimal: "PreciseDecimal"
};
function mO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function pO(e) {
  return St(e);
}
function St(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function qa(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var gO = {
  Reference: "Reference"
};
function yO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function OO(e) {
  return Nt(e);
}
function Nt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ma(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var SO = {
  String: "String"
};
function NO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function bO(e) {
  return bt(e);
}
function bt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ua(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var FO = {
  Tuple: "Tuple"
};
function AO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "fields" in e, t;
}
function RO(e) {
  return Ft(e);
}
function Ft(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    fields: e.fields.map(g)
  };
}
function Ba(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      fields: e.fields.map(y)
    };
}
var hO = {
  U128: "U128"
};
function kO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function TO(e) {
  return At(e);
}
function At(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ka(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var vO = {
  U16: "U16"
};
function JO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function IO(e) {
  return Rt(e);
}
function Rt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function La(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var VO = {
  U32: "U32"
};
function wO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function PO(e) {
  return ht(e);
}
function ht(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ga(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var DO = {
  U64: "U64"
};
function EO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function CO(e) {
  return kt(e);
}
function kt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function Ha(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
var xO = {
  U8: "U8"
};
function qO(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "value" in e, t;
}
function MO(e) {
  return Tt(e);
}
function Tt(e, t) {
  return e == null ? e : {
    kind: e.kind,
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0,
    value: e.value
  };
}
function za(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name,
      value: e.value
    };
}
function g(e) {
  return Wa(e);
}
function Wa(e, t) {
  if (e == null)
    return e;
  switch (e.kind) {
    case "Array":
      return { ...it(e), kind: "Array" };
    case "Bool":
      return { ...at(e), kind: "Bool" };
    case "Bytes":
      return { ...ot(e), kind: "Bytes" };
    case "Decimal":
      return { ...ut(e), kind: "Decimal" };
    case "Enum":
      return { ...lt(e), kind: "Enum" };
    case "I128":
      return { ...st(e), kind: "I128" };
    case "I16":
      return { ...ct(e), kind: "I16" };
    case "I32":
      return { ...dt(e), kind: "I32" };
    case "I64":
      return { ..._t(e), kind: "I64" };
    case "I8":
      return { ...ft(e), kind: "I8" };
    case "Map":
      return { ...gt(e), kind: "Map" };
    case "NonFungibleLocalId":
      return { ...yt(e), kind: "NonFungibleLocalId" };
    case "Own":
      return { ...Ot(e), kind: "Own" };
    case "PreciseDecimal":
      return { ...St(e), kind: "PreciseDecimal" };
    case "Reference":
      return { ...Nt(e), kind: "Reference" };
    case "String":
      return { ...bt(e), kind: "String" };
    case "Tuple":
      return { ...Ft(e), kind: "Tuple" };
    case "U128":
      return { ...At(e), kind: "U128" };
    case "U16":
      return { ...Rt(e), kind: "U16" };
    case "U32":
      return { ...ht(e), kind: "U32" };
    case "U64":
      return { ...kt(e), kind: "U64" };
    case "U8":
      return { ...Tt(e), kind: "U8" };
    default:
      throw new Error(`No variant of ProgrammaticScryptoSborValue exists with 'kind=${e.kind}'`);
  }
}
function y(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.kind) {
      case "Array":
        return Ra(e);
      case "Bool":
        return ha(e);
      case "Bytes":
        return ka(e);
      case "Decimal":
        return Ta(e);
      case "Enum":
        return va(e);
      case "I128":
        return Ja(e);
      case "I16":
        return Ia(e);
      case "I32":
        return Va(e);
      case "I64":
        return wa(e);
      case "I8":
        return Pa(e);
      case "Map":
        return Ea(e);
      case "NonFungibleLocalId":
        return Ca(e);
      case "Own":
        return xa(e);
      case "PreciseDecimal":
        return qa(e);
      case "Reference":
        return Ma(e);
      case "String":
        return Ua(e);
      case "Tuple":
        return Ba(e);
      case "U128":
        return Ka(e);
      case "U16":
        return La(e);
      case "U32":
        return Ga(e);
      case "U64":
        return Ha(e);
      case "U8":
        return za(e);
      default:
        throw new Error(`No variant of ProgrammaticScryptoSborValue exists with 'kind=${e.kind}'`);
    }
  }
}
function UO(e) {
  let t = true;
  return t = t && "name" in e, t = t && "emitter" in e, t = t && "data" in e, t;
}
function $a(e) {
  return Xa(e);
}
function Xa(e, t) {
  return e == null ? e : {
    name: e.name,
    emitter: e.emitter,
    data: g(e.data)
  };
}
function Za(e) {
  if (e !== void 0)
    return e === null ? null : {
      name: e.name,
      emitter: e.emitter,
      data: y(e.data)
    };
}
var BO = {
  Unknown: "Unknown",
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  Pending: "Pending",
  Rejected: "Rejected"
};
function U(e) {
  return Qa(e);
}
function Qa(e, t) {
  return e;
}
function KO(e) {
  return e;
}
function LO(e) {
  return true;
}
function Ya(e) {
  return ja(e);
}
function ja(e, t) {
  return e == null ? e : {
    status: r(e, "status") ? U(e.status) : void 0,
    fee_summary: r(e, "fee_summary") ? e.fee_summary : void 0,
    costing_parameters: r(e, "costing_parameters") ? e.costing_parameters : void 0,
    fee_destination: r(e, "fee_destination") ? e.fee_destination : void 0,
    fee_source: r(e, "fee_source") ? e.fee_source : void 0,
    state_updates: r(e, "state_updates") ? e.state_updates : void 0,
    next_epoch: r(e, "next_epoch") ? e.next_epoch : void 0,
    output: r(e, "output") ? e.output : void 0,
    events: r(e, "events") ? e.events.map($a) : void 0,
    error_message: r(e, "error_message") ? e.error_message : void 0
  };
}
function eo(e) {
  if (e !== void 0)
    return e === null ? null : {
      status: e.status,
      fee_summary: e.fee_summary,
      costing_parameters: e.costing_parameters,
      fee_destination: e.fee_destination,
      fee_source: e.fee_source,
      state_updates: e.state_updates,
      next_epoch: e.next_epoch,
      output: e.output,
      events: e.events === void 0 ? void 0 : e.events.map(Za),
      error_message: e.error_message
    };
}
function GO(e) {
  let t = true;
  return t = t && "state_version" in e, t = t && "epoch" in e, t = t && "round" in e, t = t && "round_timestamp" in e, t = t && "transaction_status" in e, t;
}
function j(e) {
  return to(e);
}
function to(e, t) {
  return e == null ? e : {
    state_version: e.state_version,
    epoch: e.epoch,
    round: e.round,
    round_timestamp: e.round_timestamp,
    transaction_status: U(e.transaction_status),
    payload_hash: r(e, "payload_hash") ? e.payload_hash : void 0,
    intent_hash: r(e, "intent_hash") ? e.intent_hash : void 0,
    fee_paid: r(e, "fee_paid") ? e.fee_paid : void 0,
    affected_global_entities: r(e, "affected_global_entities") ? e.affected_global_entities : void 0,
    confirmed_at: r(e, "confirmed_at") ? e.confirmed_at === null ? null : new Date(e.confirmed_at) : void 0,
    error_message: r(e, "error_message") ? e.error_message : void 0,
    raw_hex: r(e, "raw_hex") ? e.raw_hex : void 0,
    receipt: r(e, "receipt") ? Ya(e.receipt) : void 0,
    manifest_instructions: r(e, "manifest_instructions") ? e.manifest_instructions : void 0,
    manifest_classes: r(e, "manifest_classes") ? e.manifest_classes === null ? null : e.manifest_classes.map(nt) : void 0,
    message: r(e, "message") ? e.message : void 0,
    balance_changes: r(e, "balance_changes") ? Na(e.balance_changes) : void 0
  };
}
function ee(e) {
  if (e !== void 0)
    return e === null ? null : {
      state_version: e.state_version,
      epoch: e.epoch,
      round: e.round,
      round_timestamp: e.round_timestamp,
      transaction_status: e.transaction_status,
      payload_hash: e.payload_hash,
      intent_hash: e.intent_hash,
      fee_paid: e.fee_paid,
      affected_global_entities: e.affected_global_entities,
      confirmed_at: e.confirmed_at === void 0 ? void 0 : e.confirmed_at === null ? null : e.confirmed_at.toISOString(),
      error_message: e.error_message,
      raw_hex: e.raw_hex,
      receipt: eo(e.receipt),
      manifest_instructions: e.manifest_instructions,
      manifest_classes: e.manifest_classes === void 0 ? void 0 : e.manifest_classes === null ? null : e.manifest_classes.map(la),
      message: e.message,
      balance_changes: Fa(e.balance_changes)
    };
}
var HO = {
  Explicit: "Explicit",
  Owner: "Owner"
};
function ro(e) {
  return no(e);
}
function no(e, t) {
  return e;
}
function zO(e) {
  return e;
}
function WO(e) {
  let t = true;
  return t = t && "resolution" in e, t;
}
function io(e) {
  return ao(e);
}
function ao(e, t) {
  return e == null ? e : {
    resolution: ro(e.resolution),
    explicit_rule: r(e, "explicit_rule") ? e.explicit_rule : void 0
  };
}
function oo(e) {
  if (e !== void 0)
    return e === null ? null : {
      resolution: e.resolution,
      explicit_rule: e.explicit_rule
    };
}
var $O = {
  Main: "Main",
  Metadata: "Metadata",
  Royalty: "Royalty",
  RoleAssignment: "RoleAssignment"
};
function uo(e) {
  return lo(e);
}
function lo(e, t) {
  return e;
}
function XO(e) {
  return e;
}
function ZO(e) {
  let t = true;
  return t = t && "name" in e, t = t && "module" in e, t;
}
function Pe(e) {
  return so(e);
}
function so(e, t) {
  return e == null ? e : {
    name: e.name,
    module: uo(e.module)
  };
}
function De(e) {
  if (e !== void 0)
    return e === null ? null : {
      name: e.name,
      module: e.module
    };
}
function QO(e) {
  let t = true;
  return t = t && "role_key" in e, t = t && "assignment" in e, t;
}
function co(e) {
  return _o(e);
}
function _o(e, t) {
  return e == null ? e : {
    role_key: Pe(e.role_key),
    assignment: io(e.assignment),
    updater_roles: r(e, "updater_roles") ? e.updater_roles.map(Pe) : void 0
  };
}
function fo(e) {
  if (e !== void 0)
    return e === null ? null : {
      role_key: De(e.role_key),
      assignment: oo(e.assignment),
      updater_roles: e.updater_roles === void 0 ? void 0 : e.updater_roles.map(De)
    };
}
function YO(e) {
  let t = true;
  return t = t && "owner" in e, t = t && "entries" in e, t;
}
function R(e) {
  return mo(e);
}
function mo(e, t) {
  return e == null ? e : {
    owner: e.owner,
    entries: e.entries.map(co)
  };
}
function h(e) {
  if (e !== void 0)
    return e === null ? null : {
      owner: e.owner,
      entries: e.entries.map(fo)
    };
}
function jO(e) {
  let t = true;
  return t = t && "method_name" in e, t;
}
function po(e) {
  return go(e);
}
function go(e, t) {
  return e == null ? e : {
    method_name: e.method_name,
    royalty_amount: r(e, "royalty_amount") ? tt(e.royalty_amount) : void 0
  };
}
function yo(e) {
  if (e !== void 0)
    return e === null ? null : {
      method_name: e.method_name,
      royalty_amount: rt(e.royalty_amount)
    };
}
function eS(e) {
  let t = true;
  return t = t && "is_enabled" in e, t;
}
function vt(e) {
  return Oo(e);
}
function Oo(e, t) {
  return e == null ? e : {
    is_enabled: e.is_enabled,
    method_rules: r(e, "method_rules") ? e.method_rules.map(po) : void 0
  };
}
function Jt(e) {
  if (e !== void 0)
    return e === null ? null : {
      is_enabled: e.is_enabled,
      method_rules: e.method_rules === void 0 ? void 0 : e.method_rules.map(yo)
    };
}
function tS(e) {
  return true;
}
function rS(e) {
  return So(e);
}
function So(e, t) {
  return e == null ? e : {
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0
  };
}
function nS(e) {
  if (e !== void 0)
    return e === null ? null : {
      cursor: e.cursor,
      limit_per_page: e.limit_per_page
    };
}
var iS = {
  BoolArray: "BoolArray"
};
function aS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function oS(e) {
  return It(e);
}
function It(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function No(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var uS = {
  Bool: "Bool"
};
function lS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function sS(e) {
  return Vt(e);
}
function Vt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function bo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var cS = {
  DecimalArray: "DecimalArray"
};
function dS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function _S(e) {
  return wt(e);
}
function wt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function Fo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var fS = {
  Decimal: "Decimal"
};
function mS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function pS(e) {
  return Pt(e);
}
function Pt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function Ao(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var gS = {
  GlobalAddressArray: "GlobalAddressArray"
};
function yS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function OS(e) {
  return Dt(e);
}
function Dt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function Ro(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var SS = {
  GlobalAddress: "GlobalAddress"
};
function NS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function bS(e) {
  return Et(e);
}
function Et(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function ho(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var FS = {
  I32Array: "I32Array"
};
function AS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function RS(e) {
  return Ct(e);
}
function Ct(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function ko(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var hS = {
  I32: "I32"
};
function kS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function TS(e) {
  return xt(e);
}
function xt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function To(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var vS = {
  I64Array: "I64Array"
};
function JS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function IS(e) {
  return qt(e);
}
function qt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function vo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var VS = {
  I64: "I64"
};
function wS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function PS(e) {
  return Mt(e);
}
function Mt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function Jo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var DS = {
  InstantArray: "InstantArray"
};
function ES(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t = t && "values_unix_timestamp_seconds" in e, t;
}
function CS(e) {
  return Ut(e);
}
function Ut(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values,
    values_unix_timestamp_seconds: e.values_unix_timestamp_seconds
  };
}
function Io(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values,
      values_unix_timestamp_seconds: e.values_unix_timestamp_seconds
    };
}
var xS = {
  Instant: "Instant"
};
function qS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t = t && "unix_timestamp_seconds" in e, t;
}
function MS(e) {
  return Bt(e);
}
function Bt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value,
    unix_timestamp_seconds: e.unix_timestamp_seconds
  };
}
function Vo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value,
      unix_timestamp_seconds: e.unix_timestamp_seconds
    };
}
function US(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t;
}
function Kt(e) {
  return wo(e);
}
function wo(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id
  };
}
function Lt(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id
    };
}
var BS = {
  NonFungibleGlobalIdArray: "NonFungibleGlobalIdArray"
};
function KS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function LS(e) {
  return Gt(e);
}
function Gt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values.map(Kt)
  };
}
function Po(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values.map(Lt)
    };
}
var GS = {
  NonFungibleGlobalId: "NonFungibleGlobalId"
};
function HS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t;
}
function zS(e) {
  return Ht(e);
}
function Ht(e, t) {
  return e == null ? e : {
    type: e.type,
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id
  };
}
function Do(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id
    };
}
var WS = {
  NonFungibleLocalIdArray: "NonFungibleLocalIdArray"
};
function $S(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function XS(e) {
  return zt(e);
}
function zt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function Eo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var ZS = {
  NonFungibleLocalId: "NonFungibleLocalId"
};
function QS(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function YS(e) {
  return Wt(e);
}
function Wt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function Co(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var jS = {
  OriginArray: "OriginArray"
};
function eN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function tN(e) {
  return $t(e);
}
function $t(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function xo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var rN = {
  Origin: "Origin"
};
function nN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function iN(e) {
  return Xt(e);
}
function Xt(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function qo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var aN = {
  EcdsaSecp256k1: "EcdsaSecp256k1"
};
function oN(e) {
  let t = true;
  return t = t && "key_type" in e, t = t && "key_hex" in e, t;
}
function uN(e) {
  return Zt(e);
}
function Zt(e, t) {
  return e == null ? e : {
    key_type: e.key_type,
    key_hex: e.key_hex
  };
}
function Mo(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_type: e.key_type,
      key_hex: e.key_hex
    };
}
var lN = {
  EddsaEd25519: "EddsaEd25519"
};
function sN(e) {
  let t = true;
  return t = t && "key_type" in e, t = t && "key_hex" in e, t;
}
function cN(e) {
  return Qt(e);
}
function Qt(e, t) {
  return e == null ? e : {
    key_type: e.key_type,
    key_hex: e.key_hex
  };
}
function Uo(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_type: e.key_type,
      key_hex: e.key_hex
    };
}
function J(e) {
  return Bo(e);
}
function Bo(e, t) {
  if (e == null)
    return e;
  switch (e.key_type) {
    case "EcdsaSecp256k1":
      return { ...Zt(e), key_type: "EcdsaSecp256k1" };
    case "EddsaEd25519":
      return { ...Qt(e), key_type: "EddsaEd25519" };
    default:
      throw new Error(`No variant of PublicKey exists with 'key_type=${e.key_type}'`);
  }
}
function I(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.key_type) {
      case "EcdsaSecp256k1":
        return Mo(e);
      case "EddsaEd25519":
        return Uo(e);
      default:
        throw new Error(`No variant of PublicKey exists with 'key_type=${e.key_type}'`);
    }
  }
}
var dN = {
  PublicKeyArray: "PublicKeyArray"
};
function _N(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function fN(e) {
  return Yt(e);
}
function Yt(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values.map(J)
  };
}
function Ko(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values.map(I)
    };
}
var mN = {
  EcdsaSecp256k1: "EcdsaSecp256k1"
};
function pN(e) {
  let t = true;
  return t = t && "key_hash_type" in e, t = t && "hash_hex" in e, t;
}
function gN(e) {
  return jt(e);
}
function jt(e, t) {
  return e == null ? e : {
    key_hash_type: e.key_hash_type,
    hash_hex: e.hash_hex
  };
}
function Lo(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hash_type: e.key_hash_type,
      hash_hex: e.hash_hex
    };
}
var yN = {
  EddsaEd25519: "EddsaEd25519"
};
function ON(e) {
  let t = true;
  return t = t && "key_hash_type" in e, t = t && "hash_hex" in e, t;
}
function SN(e) {
  return er(e);
}
function er(e, t) {
  return e == null ? e : {
    key_hash_type: e.key_hash_type,
    hash_hex: e.hash_hex
  };
}
function Go(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hash_type: e.key_hash_type,
      hash_hex: e.hash_hex
    };
}
function te(e) {
  return Ho(e);
}
function Ho(e, t) {
  if (e == null)
    return e;
  switch (e.key_hash_type) {
    case "EcdsaSecp256k1":
      return { ...jt(e), key_hash_type: "EcdsaSecp256k1" };
    case "EddsaEd25519":
      return { ...er(e), key_hash_type: "EddsaEd25519" };
    default:
      throw new Error(`No variant of PublicKeyHash exists with 'key_hash_type=${e.key_hash_type}'`);
  }
}
function re(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.key_hash_type) {
      case "EcdsaSecp256k1":
        return Lo(e);
      case "EddsaEd25519":
        return Go(e);
      default:
        throw new Error(`No variant of PublicKeyHash exists with 'key_hash_type=${e.key_hash_type}'`);
    }
  }
}
var NN = {
  PublicKeyHashArray: "PublicKeyHashArray"
};
function bN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function FN(e) {
  return tr(e);
}
function tr(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values.map(te)
  };
}
function zo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values.map(re)
    };
}
var AN = {
  PublicKeyHash: "PublicKeyHash"
};
function RN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function hN(e) {
  return rr(e);
}
function rr(e, t) {
  return e == null ? e : {
    type: e.type,
    value: te(e.value)
  };
}
function Wo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: re(e.value)
    };
}
var kN = {
  PublicKey: "PublicKey"
};
function TN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function vN(e) {
  return nr(e);
}
function nr(e, t) {
  return e == null ? e : {
    type: e.type,
    value: J(e.value)
  };
}
function $o(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: I(e.value)
    };
}
var JN = {
  StringArray: "StringArray"
};
function IN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function VN(e) {
  return ir(e);
}
function ir(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function Xo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var wN = {
  String: "String"
};
function PN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function DN(e) {
  return ar(e);
}
function ar(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function Zo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var EN = {
  U32Array: "U32Array"
};
function CN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function xN(e) {
  return or(e);
}
function or(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function Qo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var qN = {
  U32: "U32"
};
function MN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function UN(e) {
  return ur(e);
}
function ur(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function Yo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var BN = {
  U64Array: "U64Array"
};
function KN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function LN(e) {
  return lr(e);
}
function lr(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function jo(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var GN = {
  U64: "U64"
};
function HN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function zN(e) {
  return sr(e);
}
function sr(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function eu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var WN = {
  U8Array: "U8Array"
};
function $N(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value_hex" in e, t;
}
function XN(e) {
  return cr(e);
}
function cr(e, t) {
  return e == null ? e : {
    type: e.type,
    value_hex: e.value_hex
  };
}
function tu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value_hex: e.value_hex
    };
}
var ZN = {
  U8: "U8"
};
function QN(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function YN(e) {
  return dr(e);
}
function dr(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function ru(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
var jN = {
  UrlArray: "UrlArray"
};
function eb(e) {
  let t = true;
  return t = t && "type" in e, t = t && "values" in e, t;
}
function tb(e) {
  return _r(e);
}
function _r(e, t) {
  return e == null ? e : {
    type: e.type,
    values: e.values
  };
}
function nu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      values: e.values
    };
}
var rb = {
  Url: "Url"
};
function nb(e) {
  let t = true;
  return t = t && "type" in e, t = t && "value" in e, t;
}
function ib(e) {
  return fr(e);
}
function fr(e, t) {
  return e == null ? e : {
    type: e.type,
    value: e.value
  };
}
function iu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      value: e.value
    };
}
function mr(e) {
  return au(e);
}
function au(e, t) {
  if (e == null)
    return e;
  switch (e.type) {
    case "Bool":
      return { ...Vt(e), type: "Bool" };
    case "BoolArray":
      return { ...It(e), type: "BoolArray" };
    case "Decimal":
      return { ...Pt(e), type: "Decimal" };
    case "DecimalArray":
      return { ...wt(e), type: "DecimalArray" };
    case "GlobalAddress":
      return { ...Et(e), type: "GlobalAddress" };
    case "GlobalAddressArray":
      return { ...Dt(e), type: "GlobalAddressArray" };
    case "I32":
      return { ...xt(e), type: "I32" };
    case "I32Array":
      return { ...Ct(e), type: "I32Array" };
    case "I64":
      return { ...Mt(e), type: "I64" };
    case "I64Array":
      return { ...qt(e), type: "I64Array" };
    case "Instant":
      return { ...Bt(e), type: "Instant" };
    case "InstantArray":
      return { ...Ut(e), type: "InstantArray" };
    case "NonFungibleGlobalId":
      return { ...Ht(e), type: "NonFungibleGlobalId" };
    case "NonFungibleGlobalIdArray":
      return { ...Gt(e), type: "NonFungibleGlobalIdArray" };
    case "NonFungibleLocalId":
      return { ...Wt(e), type: "NonFungibleLocalId" };
    case "NonFungibleLocalIdArray":
      return { ...zt(e), type: "NonFungibleLocalIdArray" };
    case "Origin":
      return { ...Xt(e), type: "Origin" };
    case "OriginArray":
      return { ...$t(e), type: "OriginArray" };
    case "PublicKey":
      return { ...nr(e), type: "PublicKey" };
    case "PublicKeyArray":
      return { ...Yt(e), type: "PublicKeyArray" };
    case "PublicKeyHash":
      return { ...rr(e), type: "PublicKeyHash" };
    case "PublicKeyHashArray":
      return { ...tr(e), type: "PublicKeyHashArray" };
    case "String":
      return { ...ar(e), type: "String" };
    case "StringArray":
      return { ...ir(e), type: "StringArray" };
    case "U32":
      return { ...ur(e), type: "U32" };
    case "U32Array":
      return { ...or(e), type: "U32Array" };
    case "U64":
      return { ...sr(e), type: "U64" };
    case "U64Array":
      return { ...lr(e), type: "U64Array" };
    case "U8":
      return { ...dr(e), type: "U8" };
    case "U8Array":
      return { ...cr(e), type: "U8Array" };
    case "Url":
      return { ...fr(e), type: "Url" };
    case "UrlArray":
      return { ..._r(e), type: "UrlArray" };
    default:
      throw new Error(`No variant of MetadataTypedValue exists with 'type=${e.type}'`);
  }
}
function pr(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.type) {
      case "Bool":
        return bo(e);
      case "BoolArray":
        return No(e);
      case "Decimal":
        return Ao(e);
      case "DecimalArray":
        return Fo(e);
      case "GlobalAddress":
        return ho(e);
      case "GlobalAddressArray":
        return Ro(e);
      case "I32":
        return To(e);
      case "I32Array":
        return ko(e);
      case "I64":
        return Jo(e);
      case "I64Array":
        return vo(e);
      case "Instant":
        return Vo(e);
      case "InstantArray":
        return Io(e);
      case "NonFungibleGlobalId":
        return Do(e);
      case "NonFungibleGlobalIdArray":
        return Po(e);
      case "NonFungibleLocalId":
        return Co(e);
      case "NonFungibleLocalIdArray":
        return Eo(e);
      case "Origin":
        return qo(e);
      case "OriginArray":
        return xo(e);
      case "PublicKey":
        return $o(e);
      case "PublicKeyArray":
        return Ko(e);
      case "PublicKeyHash":
        return Wo(e);
      case "PublicKeyHashArray":
        return zo(e);
      case "String":
        return Zo(e);
      case "StringArray":
        return Xo(e);
      case "U32":
        return Yo(e);
      case "U32Array":
        return Qo(e);
      case "U64":
        return eu(e);
      case "U64Array":
        return jo(e);
      case "U8":
        return ru(e);
      case "U8Array":
        return tu(e);
      case "Url":
        return iu(e);
      case "UrlArray":
        return nu(e);
      default:
        throw new Error(`No variant of MetadataTypedValue exists with 'type=${e.type}'`);
    }
  }
}
function ab(e) {
  let t = true;
  return t = t && "raw_hex" in e, t = t && "programmatic_json" in e, t = t && "typed" in e, t;
}
function ou(e) {
  return uu(e);
}
function uu(e, t) {
  return e == null ? e : {
    raw_hex: e.raw_hex,
    programmatic_json: g(e.programmatic_json),
    typed: mr(e.typed)
  };
}
function lu(e) {
  if (e !== void 0)
    return e === null ? null : {
      raw_hex: e.raw_hex,
      programmatic_json: y(e.programmatic_json),
      typed: pr(e.typed)
    };
}
function ob(e) {
  let t = true;
  return t = t && "key" in e, t = t && "value" in e, t = t && "is_locked" in e, t = t && "last_updated_at_state_version" in e, t;
}
function me(e) {
  return su(e);
}
function su(e, t) {
  return e == null ? e : {
    key: e.key,
    value: ou(e.value),
    is_locked: e.is_locked,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function pe(e) {
  if (e !== void 0)
    return e === null ? null : {
      key: e.key,
      value: lu(e.value),
      is_locked: e.is_locked,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function ub(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function b(e) {
  return cu(e);
}
function cu(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(me)
  };
}
function F(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(pe)
    };
}
function lb(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function sb(e) {
  return du(e);
}
function du(e, t) {
  return e == null ? e : {
    items: e.items.map(me)
  };
}
function cb(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(pe)
    };
}
function db(e) {
  let t = true;
  return t = t && "typed" in e, t;
}
function _b(e) {
  return _u(e);
}
function _u(e, t) {
  return e == null ? e : {
    typed: mr(e.typed)
  };
}
function fb(e) {
  if (e !== void 0)
    return e === null ? null : {
      typed: pr(e.typed)
    };
}
var mb = {
  EntityNotFoundError: "EntityNotFoundError"
};
function pb(e) {
  let t = true;
  return t = t && "type" in e, t = t && "address" in e, t;
}
function gb(e) {
  return gr(e);
}
function gr(e, t) {
  return e == null ? e : {
    type: e.type,
    address: e.address
  };
}
function fu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      address: e.address
    };
}
var yb = {
  EntityNotFoundError: "EntityNotFoundError"
};
function Ob(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function Sb(e) {
  return mu(e);
}
function mu(e, t) {
  return e == null ? e : {
    address: e.address,
    type: r(e, "type") ? e.type : void 0
  };
}
function Nb(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      type: e.type
    };
}
function bb(e) {
  let t = true;
  return t = t && "schema_hash_hex" in e, t = t && "schema_hex" in e, t;
}
function ge(e) {
  return pu(e);
}
function pu(e, t) {
  return e == null ? e : {
    schema_hash_hex: e.schema_hash_hex,
    schema_hex: e.schema_hex
  };
}
function ye(e) {
  if (e !== void 0)
    return e === null ? null : {
      schema_hash_hex: e.schema_hash_hex,
      schema_hex: e.schema_hex
    };
}
function Fb(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function yr(e) {
  return gu(e);
}
function gu(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(ge)
  };
}
function Or(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ye)
    };
}
function Ab(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Rb(e) {
  return yu(e);
}
function yu(e, t) {
  return e == null ? e : {
    items: e.items.map(ge)
  };
}
function hb(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(ye)
    };
}
var kb = {
  InternalServerError: "InternalServerError"
};
function Tb(e) {
  let t = true;
  return t = t && "type" in e, t = t && "exception" in e, t = t && "cause" in e, t;
}
function vb(e) {
  return Sr(e);
}
function Sr(e, t) {
  return e == null ? e : {
    type: e.type,
    exception: e.exception,
    cause: e.cause
  };
}
function Ou(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      exception: e.exception,
      cause: e.cause
    };
}
var Jb = {
  InvalidEntityError: "InvalidEntityError"
};
function Ib(e) {
  let t = true;
  return t = t && "type" in e, t = t && "address" in e, t;
}
function Vb(e) {
  return Nr(e);
}
function Nr(e, t) {
  return e == null ? e : {
    type: e.type,
    address: e.address
  };
}
function Su(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      address: e.address
    };
}
function wb(e) {
  let t = true;
  return t = t && "path" in e, t = t && "errors" in e, t;
}
function br(e) {
  return Nu(e);
}
function Nu(e, t) {
  return e == null ? e : {
    path: e.path,
    errors: e.errors
  };
}
function Fr(e) {
  if (e !== void 0)
    return e === null ? null : {
      path: e.path,
      errors: e.errors
    };
}
var Pb = {
  InvalidRequestError: "InvalidRequestError"
};
function Db(e) {
  let t = true;
  return t = t && "type" in e, t = t && "validation_errors" in e, t;
}
function Eb(e) {
  return Ar(e);
}
function Ar(e, t) {
  return e == null ? e : {
    type: e.type,
    validation_errors: e.validation_errors.map(br)
  };
}
function bu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      validation_errors: e.validation_errors.map(Fr)
    };
}
var Cb = {
  InvalidTransactionError: "InvalidTransactionError"
};
function xb(e) {
  let t = true;
  return t = t && "type" in e, t;
}
function qb(e) {
  return Rr(e);
}
function Rr(e, t) {
  return e == null ? e : {
    type: e.type
  };
}
function Fu(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
var Mb = {
  NotSyncedUpError: "NotSyncedUpError"
};
function Ub(e) {
  let t = true;
  return t = t && "type" in e, t = t && "request_type" in e, t = t && "current_sync_delay_seconds" in e, t = t && "max_allowed_sync_delay_seconds" in e, t;
}
function Bb(e) {
  return hr(e);
}
function hr(e, t) {
  return e == null ? e : {
    type: e.type,
    request_type: e.request_type,
    current_sync_delay_seconds: e.current_sync_delay_seconds,
    max_allowed_sync_delay_seconds: e.max_allowed_sync_delay_seconds
  };
}
function Au(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      request_type: e.request_type,
      current_sync_delay_seconds: e.current_sync_delay_seconds,
      max_allowed_sync_delay_seconds: e.max_allowed_sync_delay_seconds
    };
}
var Kb = {
  TransactionNotFoundError: "TransactionNotFoundError"
};
function Lb(e) {
  let t = true;
  return t = t && "type" in e, t = t && "intent_hash" in e, t;
}
function Gb(e) {
  return kr(e);
}
function kr(e, t) {
  return e == null ? e : {
    type: e.type,
    intent_hash: e.intent_hash
  };
}
function Ru(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      intent_hash: e.intent_hash
    };
}
function hu(e) {
  return ku(e);
}
function ku(e, t) {
  if (e == null)
    return e;
  switch (e.type) {
    case "AccountLockerNotFoundError":
      return { ...Ye(e), type: "AccountLockerNotFoundError" };
    case "EntityNotFoundError":
      return { ...gr(e), type: "EntityNotFoundError" };
    case "InternalServerError":
      return { ...Sr(e), type: "InternalServerError" };
    case "InvalidEntityError":
      return { ...Nr(e), type: "InvalidEntityError" };
    case "InvalidRequestError":
      return { ...Ar(e), type: "InvalidRequestError" };
    case "InvalidTransactionError":
      return { ...Rr(e), type: "InvalidTransactionError" };
    case "NotSyncedUpError":
      return { ...hr(e), type: "NotSyncedUpError" };
    case "TransactionNotFoundError":
      return { ...kr(e), type: "TransactionNotFoundError" };
    default:
      throw new Error(`No variant of GatewayError exists with 'type=${e.type}'`);
  }
}
function Tu(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.type) {
      case "AccountLockerNotFoundError":
        return xi(e);
      case "EntityNotFoundError":
        return fu(e);
      case "InternalServerError":
        return Ou(e);
      case "InvalidEntityError":
        return Su(e);
      case "InvalidRequestError":
        return bu(e);
      case "InvalidTransactionError":
        return Fu(e);
      case "NotSyncedUpError":
        return Au(e);
      case "TransactionNotFoundError":
        return Ru(e);
      default:
        throw new Error(`No variant of GatewayError exists with 'type=${e.type}'`);
    }
  }
}
function Hb(e) {
  let t = true;
  return t = t && "message" in e, t;
}
function zb(e) {
  return vu(e);
}
function vu(e, t) {
  return e == null ? e : {
    message: e.message,
    code: r(e, "code") ? e.code : void 0,
    details: r(e, "details") ? hu(e.details) : void 0,
    trace_id: r(e, "trace_id") ? e.trace_id : void 0
  };
}
function Wb(e) {
  if (e !== void 0)
    return e === null ? null : {
      message: e.message,
      code: e.code,
      details: Tu(e.details),
      trace_id: e.trace_id
    };
}
function $b(e) {
  return true;
}
function Xb(e) {
  return Ju(e);
}
function Ju(e, t) {
  return e == null ? e : {
    from_ledger_state: r(e, "from_ledger_state") ? f(e.from_ledger_state) : void 0
  };
}
function Zb(e) {
  if (e !== void 0)
    return e === null ? null : {
      from_ledger_state: m(e.from_ledger_state)
    };
}
var Qb = {
  Global: "Global"
};
function Yb(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t = t && "amount" in e, t = t && "last_updated_at_state_version" in e, t;
}
function jb(e) {
  return Tr(e);
}
function Tr(e, t) {
  return e == null ? e : {
    aggregation_level: e.aggregation_level,
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0,
    amount: e.amount,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function Iu(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata),
      amount: e.amount,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function e0(e) {
  let t = true;
  return t = t && "vault_address" in e, t = t && "amount" in e, t = t && "last_updated_at_state_version" in e, t;
}
function B(e) {
  return Vu(e);
}
function Vu(e, t) {
  return e == null ? e : {
    vault_address: e.vault_address,
    amount: e.amount,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function K(e) {
  if (e !== void 0)
    return e === null ? null : {
      vault_address: e.vault_address,
      amount: e.amount,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function t0(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function vr(e) {
  return wu(e);
}
function wu(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(B)
  };
}
function Jr(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(K)
    };
}
var r0 = {
  Vault: "Vault"
};
function n0(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t = t && "vaults" in e, t;
}
function i0(e) {
  return Ir(e);
}
function Ir(e, t) {
  return e == null ? e : {
    aggregation_level: e.aggregation_level,
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0,
    vaults: vr(e.vaults)
  };
}
function Pu(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata),
      vaults: Jr(e.vaults)
    };
}
function Oe(e) {
  return Du(e);
}
function Du(e, t) {
  if (e == null)
    return e;
  switch (e.aggregation_level) {
    case "Global":
      return { ...Tr(e), aggregation_level: "Global" };
    case "Vault":
      return { ...Ir(e), aggregation_level: "Vault" };
    default:
      throw new Error(`No variant of FungibleResourcesCollectionItem exists with 'aggregation_level=${e.aggregation_level}'`);
  }
}
function Se(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.aggregation_level) {
      case "Global":
        return Iu(e);
      case "Vault":
        return Pu(e);
      default:
        throw new Error(`No variant of FungibleResourcesCollectionItem exists with 'aggregation_level=${e.aggregation_level}'`);
    }
  }
}
function a0(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Eu(e) {
  return Cu(e);
}
function Cu(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Oe)
  };
}
function xu(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Se)
    };
}
function o0(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function u0(e) {
  return qu(e);
}
function qu(e, t) {
  return e == null ? e : {
    items: e.items.map(Oe)
  };
}
function l0(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(Se)
    };
}
var Mu = {
  Global: "Global",
  Vault: "Vault"
};
function k(e) {
  return Uu(e);
}
function Uu(e, t) {
  return e;
}
function s0(e) {
  return e;
}
function c0(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t;
}
function d0(e) {
  return Bu(e);
}
function Bu(e, t) {
  return e == null ? e : {
    aggregation_level: k(e.aggregation_level),
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0
  };
}
function _0(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata)
    };
}
var f0 = {
  Global: "Global"
};
function m0(e) {
  let t = true;
  return t = t && "amount" in e, t = t && "last_updated_at_state_version" in e, t;
}
function p0(e) {
  return Ku(e);
}
function Ku(e, t) {
  return e == null ? e : {
    amount: e.amount,
    last_updated_at_state_version: e.last_updated_at_state_version,
    aggregation_level: r(e, "aggregation_level") ? e.aggregation_level : void 0
  };
}
function g0(e) {
  if (e !== void 0)
    return e === null ? null : {
      amount: e.amount,
      last_updated_at_state_version: e.last_updated_at_state_version,
      aggregation_level: e.aggregation_level
    };
}
var y0 = {
  Vault: "Vault"
};
function O0(e) {
  let t = true;
  return t = t && "vaults" in e, t;
}
function S0(e) {
  return Lu(e);
}
function Lu(e, t) {
  return e == null ? e : {
    vaults: vr(e.vaults),
    aggregation_level: r(e, "aggregation_level") ? e.aggregation_level : void 0
  };
}
function N0(e) {
  if (e !== void 0)
    return e === null ? null : {
      vaults: Jr(e.vaults),
      aggregation_level: e.aggregation_level
    };
}
function b0(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function F0(e) {
  return Gu(e);
}
function Gu(e, t) {
  return e == null ? e : {
    items: e.items.map(B)
  };
}
function A0(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(K)
    };
}
function R0(e) {
  let t = true;
  return t = t && "type" in e, t;
}
function h0(e) {
  return Hu(e);
}
function Hu(e, t) {
  return e == null ? e : {
    type: e.type
  };
}
function k0(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
function T0(e) {
  let t = true;
  return t = t && "state_version" in e, t;
}
function v0(e) {
  return zu(e);
}
function zu(e, t) {
  return e == null ? e : {
    state_version: e.state_version
  };
}
function J0(e) {
  if (e !== void 0)
    return e === null ? null : {
      state_version: e.state_version
    };
}
function I0(e) {
  let t = true;
  return t = t && "release_version" in e, t = t && "open_api_schema_version" in e, t = t && "image_tag" in e, t;
}
function Vr(e) {
  return Wu(e);
}
function Wu(e, t) {
  return e == null ? e : {
    release_version: e.release_version,
    open_api_schema_version: e.open_api_schema_version,
    image_tag: e.image_tag
  };
}
function wr(e) {
  if (e !== void 0)
    return e === null ? null : {
      release_version: e.release_version,
      open_api_schema_version: e.open_api_schema_version,
      image_tag: e.image_tag
    };
}
function V0(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "release_info" in e, t;
}
function $u(e) {
  return Xu(e);
}
function Xu(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    release_info: Vr(e.release_info)
  };
}
function w0(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      release_info: wr(e.release_info)
    };
}
function P0(e) {
  let t = true;
  return t = t && "release_info" in e, t;
}
function D0(e) {
  return Zu(e);
}
function Zu(e, t) {
  return e == null ? e : {
    release_info: Vr(e.release_info)
  };
}
function E0(e) {
  if (e !== void 0)
    return e === null ? null : {
      release_info: wr(e.release_info)
    };
}
var C0 = {
  InternalServerError: "InternalServerError"
};
function x0(e) {
  let t = true;
  return t = t && "exception" in e, t = t && "cause" in e, t;
}
function q0(e) {
  return Qu(e);
}
function Qu(e, t) {
  return e == null ? e : {
    exception: e.exception,
    cause: e.cause,
    type: r(e, "type") ? e.type : void 0
  };
}
function M0(e) {
  if (e !== void 0)
    return e === null ? null : {
      exception: e.exception,
      cause: e.cause,
      type: e.type
    };
}
var U0 = {
  InvalidEntityError: "InvalidEntityError"
};
function B0(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function K0(e) {
  return Yu(e);
}
function Yu(e, t) {
  return e == null ? e : {
    address: e.address,
    type: r(e, "type") ? e.type : void 0
  };
}
function L0(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      type: e.type
    };
}
var G0 = {
  InvalidRequestError: "InvalidRequestError"
};
function H0(e) {
  let t = true;
  return t = t && "validation_errors" in e, t;
}
function z0(e) {
  return ju(e);
}
function ju(e, t) {
  return e == null ? e : {
    validation_errors: e.validation_errors.map(br),
    type: r(e, "type") ? e.type : void 0
  };
}
function W0(e) {
  if (e !== void 0)
    return e === null ? null : {
      validation_errors: e.validation_errors.map(Fr),
      type: e.type
    };
}
var $0 = {
  InvalidTransactionError: "InvalidTransactionError"
};
function X0(e) {
  return true;
}
function Z0(e) {
  return el(e);
}
function el(e, t) {
  return e == null ? e : {
    type: r(e, "type") ? e.type : void 0
  };
}
function Q0(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
function Y0(e) {
  let t = true;
  return t = t && "ledger_state" in e, t;
}
function j0(e) {
  return tl(e);
}
function tl(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state)
  };
}
function eF(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state)
    };
}
var tF = {
  BoolArray: "BoolArray"
};
function rF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function nF(e) {
  return rl(e);
}
function rl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function iF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var aF = {
  Bool: "Bool"
};
function oF(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function uF(e) {
  return nl(e);
}
function nl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function lF(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var sF = {
  DecimalArray: "DecimalArray"
};
function cF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function dF(e) {
  return il(e);
}
function il(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function _F(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var fF = {
  Decimal: "Decimal"
};
function mF(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function pF(e) {
  return al(e);
}
function al(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function gF(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var yF = {
  GlobalAddressArray: "GlobalAddressArray"
};
function OF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function SF(e) {
  return ol(e);
}
function ol(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function NF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var bF = {
  GlobalAddress: "GlobalAddress"
};
function FF(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function AF(e) {
  return ul(e);
}
function ul(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function RF(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var hF = {
  I32Array: "I32Array"
};
function kF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function TF(e) {
  return ll(e);
}
function ll(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function vF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var JF = {
  I32: "I32"
};
function IF(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function VF(e) {
  return sl(e);
}
function sl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function wF(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var PF = {
  I64Array: "I64Array"
};
function DF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function EF(e) {
  return cl(e);
}
function cl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function CF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var xF = {
  I64: "I64"
};
function qF(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function MF(e) {
  return dl(e);
}
function dl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function UF(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var BF = {
  InstantArray: "InstantArray"
};
function KF(e) {
  let t = true;
  return t = t && "values" in e, t = t && "values_unix_timestamp_seconds" in e, t;
}
function LF(e) {
  return _l(e);
}
function _l(e, t) {
  return e == null ? e : {
    values: e.values,
    values_unix_timestamp_seconds: e.values_unix_timestamp_seconds,
    type: r(e, "type") ? e.type : void 0
  };
}
function GF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      values_unix_timestamp_seconds: e.values_unix_timestamp_seconds,
      type: e.type
    };
}
var HF = {
  Instant: "Instant"
};
function zF(e) {
  let t = true;
  return t = t && "value" in e, t = t && "unix_timestamp_seconds" in e, t;
}
function WF(e) {
  return fl(e);
}
function fl(e, t) {
  return e == null ? e : {
    value: e.value,
    unix_timestamp_seconds: e.unix_timestamp_seconds,
    type: r(e, "type") ? e.type : void 0
  };
}
function $F(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      unix_timestamp_seconds: e.unix_timestamp_seconds,
      type: e.type
    };
}
var XF = {
  NonFungibleGlobalIdArray: "NonFungibleGlobalIdArray"
};
function ZF(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function QF(e) {
  return ml(e);
}
function ml(e, t) {
  return e == null ? e : {
    values: e.values.map(Kt),
    type: r(e, "type") ? e.type : void 0
  };
}
function YF(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values.map(Lt),
      type: e.type
    };
}
var jF = {
  NonFungibleGlobalId: "NonFungibleGlobalId"
};
function eA(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_id" in e, t;
}
function tA(e) {
  return pl(e);
}
function pl(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_id: e.non_fungible_id,
    type: r(e, "type") ? e.type : void 0
  };
}
function rA(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_id: e.non_fungible_id,
      type: e.type
    };
}
var nA = {
  NonFungibleLocalIdArray: "NonFungibleLocalIdArray"
};
function iA(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function aA(e) {
  return gl(e);
}
function gl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function oA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var uA = {
  NonFungibleLocalId: "NonFungibleLocalId"
};
function lA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function sA(e) {
  return yl(e);
}
function yl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function cA(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var dA = {
  OriginArray: "OriginArray"
};
function _A(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function fA(e) {
  return Ol(e);
}
function Ol(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function mA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var pA = {
  Origin: "Origin"
};
function gA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function yA(e) {
  return Sl(e);
}
function Sl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function OA(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var SA = {
  PublicKeyArray: "PublicKeyArray"
};
function NA(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function bA(e) {
  return Nl(e);
}
function Nl(e, t) {
  return e == null ? e : {
    values: e.values.map(J),
    type: r(e, "type") ? e.type : void 0
  };
}
function FA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values.map(I),
      type: e.type
    };
}
var AA = {
  PublicKeyHashArray: "PublicKeyHashArray"
};
function RA(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function hA(e) {
  return bl(e);
}
function bl(e, t) {
  return e == null ? e : {
    values: e.values.map(te),
    type: r(e, "type") ? e.type : void 0
  };
}
function kA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values.map(re),
      type: e.type
    };
}
var TA = {
  PublicKeyHash: "PublicKeyHash"
};
function vA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function JA(e) {
  return Fl(e);
}
function Fl(e, t) {
  return e == null ? e : {
    value: te(e.value),
    type: r(e, "type") ? e.type : void 0
  };
}
function IA(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: re(e.value),
      type: e.type
    };
}
var VA = {
  PublicKey: "PublicKey"
};
function wA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function PA(e) {
  return Al(e);
}
function Al(e, t) {
  return e == null ? e : {
    value: J(e.value),
    type: r(e, "type") ? e.type : void 0
  };
}
function DA(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: I(e.value),
      type: e.type
    };
}
var EA = {
  StringArray: "StringArray"
};
function CA(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function xA(e) {
  return Rl(e);
}
function Rl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function qA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var MA = {
  String: "String"
};
function UA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function BA(e) {
  return hl(e);
}
function hl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function KA(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var LA = {
  String: "String",
  Bool: "Bool",
  U8: "U8",
  U32: "U32",
  U64: "U64",
  I32: "I32",
  I64: "I64",
  Decimal: "Decimal",
  GlobalAddress: "GlobalAddress",
  PublicKey: "PublicKey",
  NonFungibleGlobalId: "NonFungibleGlobalId",
  NonFungibleLocalId: "NonFungibleLocalId",
  Instant: "Instant",
  Url: "Url",
  Origin: "Origin",
  PublicKeyHash: "PublicKeyHash",
  StringArray: "StringArray",
  BoolArray: "BoolArray",
  U8Array: "U8Array",
  U32Array: "U32Array",
  U64Array: "U64Array",
  I32Array: "I32Array",
  I64Array: "I64Array",
  DecimalArray: "DecimalArray",
  GlobalAddressArray: "GlobalAddressArray",
  PublicKeyArray: "PublicKeyArray",
  NonFungibleGlobalIdArray: "NonFungibleGlobalIdArray",
  NonFungibleLocalIdArray: "NonFungibleLocalIdArray",
  InstantArray: "InstantArray",
  UrlArray: "UrlArray",
  OriginArray: "OriginArray",
  PublicKeyHashArray: "PublicKeyHashArray"
};
function kl(e) {
  return Tl(e);
}
function Tl(e, t) {
  return e;
}
function GA(e) {
  return e;
}
function HA(e) {
  let t = true;
  return t = t && "type" in e, t;
}
function zA(e) {
  return vl(e);
}
function vl(e, t) {
  return e == null ? e : {
    type: kl(e.type)
  };
}
function WA(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
var $A = {
  U32Array: "U32Array"
};
function XA(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function ZA(e) {
  return Jl(e);
}
function Jl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function QA(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var YA = {
  U32: "U32"
};
function jA(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function eR(e) {
  return Il(e);
}
function Il(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function tR(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var rR = {
  U64Array: "U64Array"
};
function nR(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function iR(e) {
  return Vl(e);
}
function Vl(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function aR(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var oR = {
  U64: "U64"
};
function uR(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function lR(e) {
  return wl(e);
}
function wl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function sR(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var cR = {
  U8Array: "U8Array"
};
function dR(e) {
  let t = true;
  return t = t && "value_hex" in e, t;
}
function _R(e) {
  return Pl(e);
}
function Pl(e, t) {
  return e == null ? e : {
    value_hex: e.value_hex,
    type: r(e, "type") ? e.type : void 0
  };
}
function fR(e) {
  if (e !== void 0)
    return e === null ? null : {
      value_hex: e.value_hex,
      type: e.type
    };
}
var mR = {
  U8: "U8"
};
function pR(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function gR(e) {
  return Dl(e);
}
function Dl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function yR(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var OR = {
  UrlArray: "UrlArray"
};
function SR(e) {
  let t = true;
  return t = t && "values" in e, t;
}
function NR(e) {
  return El(e);
}
function El(e, t) {
  return e == null ? e : {
    values: e.values,
    type: r(e, "type") ? e.type : void 0
  };
}
function bR(e) {
  if (e !== void 0)
    return e === null ? null : {
      values: e.values,
      type: e.type
    };
}
var FR = {
  Url: "Url"
};
function AR(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function RR(e) {
  return Cl(e);
}
function Cl(e, t) {
  return e == null ? e : {
    value: e.value,
    type: r(e, "type") ? e.type : void 0
  };
}
function hR(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      type: e.type
    };
}
var kR = {
  AccessControllerRecoveryBadge: "AccessControllerRecoveryBadge"
};
function TR(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "access_controller_address" in e, t;
}
function vR(e) {
  return Pr(e);
}
function Pr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    access_controller_address: e.access_controller_address
  };
}
function xl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      access_controller_address: e.access_controller_address
    };
}
var JR = {
  AccessControllerRecoveryBadge: "AccessControllerRecoveryBadge"
};
function IR(e) {
  let t = true;
  return t = t && "access_controller_address" in e, t;
}
function VR(e) {
  return ql(e);
}
function ql(e, t) {
  return e == null ? e : {
    access_controller_address: e.access_controller_address,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function wR(e) {
  if (e !== void 0)
    return e === null ? null : {
      access_controller_address: e.access_controller_address,
      kind: e.kind
    };
}
var PR = {
  AccountOwnerBadge: "AccountOwnerBadge"
};
function DR(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function ER(e) {
  return Dr(e);
}
function Dr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Ml(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var CR = {
  AccountOwnerBadge: "AccountOwnerBadge"
};
function xR(e) {
  return true;
}
function qR(e) {
  return Ul(e);
}
function Ul(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function MR(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var UR = {
  Ed25519SignatureResource: "Ed25519SignatureResource"
};
function BR(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function KR(e) {
  return Er(e);
}
function Er(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Bl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var LR = {
  GlobalCallerResource: "GlobalCallerResource"
};
function GR(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function HR(e) {
  return Cr(e);
}
function Cr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Kl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var zR = {
  IdentityOwnerBadge: "IdentityOwnerBadge"
};
function WR(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function $R(e) {
  return xr(e);
}
function xr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Ll(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
function XR(e) {
  let t = true;
  return t = t && "resource_address" in e, t;
}
function T(e) {
  return Gl(e);
}
function Gl(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    amount: r(e, "amount") ? e.amount : void 0
  };
}
function v(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      amount: e.amount
    };
}
var ZR = {
  MultiResourcePoolUnit: "MultiResourcePoolUnit"
};
function QR(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function YR(e) {
  return qr(e);
}
function qr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T)
  };
}
function Hl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v)
    };
}
var jR = {
  OneResourcePoolUnit: "OneResourcePoolUnit"
};
function eh(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function th(e) {
  return Mr(e);
}
function Mr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T)
  };
}
function zl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v)
    };
}
var rh = {
  PackageOfDirectCallerResource: "PackageOfDirectCallerResource"
};
function nh(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function ih(e) {
  return Ur(e);
}
function Ur(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Wl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var ah = {
  PackageOwnerBadge: "PackageOwnerBadge"
};
function oh(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function uh(e) {
  return Br(e);
}
function Br(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function $l(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var lh = {
  Secp256k1SignatureResource: "Secp256k1SignatureResource"
};
function sh(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function ch(e) {
  return Kr(e);
}
function Kr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Xl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var dh = {
  SystemExecutionResource: "SystemExecutionResource"
};
function _h(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function fh(e) {
  return Lr(e);
}
function Lr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function Zl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var mh = {
  TwoResourcePoolUnit: "TwoResourcePoolUnit"
};
function ph(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function gh(e) {
  return Gr(e);
}
function Gr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T)
  };
}
function Ql(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v)
    };
}
var yh = {
  ValidatorClaimNft: "ValidatorClaimNft"
};
function Oh(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "validator_address" in e, t;
}
function Sh(e) {
  return Hr(e);
}
function Hr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    validator_address: e.validator_address
  };
}
function Yl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      validator_address: e.validator_address
    };
}
var Nh = {
  ValidatorLiquidStakeUnit: "ValidatorLiquidStakeUnit"
};
function bh(e) {
  let t = true;
  return t = t && "kind" in e, t = t && "validator_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function Fh(e) {
  return zr(e);
}
function zr(e, t) {
  return e == null ? e : {
    kind: e.kind,
    validator_address: e.validator_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T)
  };
}
function jl(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      validator_address: e.validator_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v)
    };
}
var Ah = {
  ValidatorOwnerBadge: "ValidatorOwnerBadge"
};
function Rh(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function hh(e) {
  return Wr(e);
}
function Wr(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function es(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var kh = {
  Xrd: "Xrd"
};
function Th(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function vh(e) {
  return $r(e);
}
function $r(e, t) {
  return e == null ? e : {
    kind: e.kind
  };
}
function ts(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
function P(e) {
  return rs(e);
}
function rs(e, t) {
  if (e == null)
    return e;
  switch (e.kind) {
    case "AccessControllerRecoveryBadge":
      return { ...Pr(e), kind: "AccessControllerRecoveryBadge" };
    case "AccountOwnerBadge":
      return { ...Dr(e), kind: "AccountOwnerBadge" };
    case "Ed25519SignatureResource":
      return { ...Er(e), kind: "Ed25519SignatureResource" };
    case "GlobalCallerResource":
      return { ...Cr(e), kind: "GlobalCallerResource" };
    case "IdentityOwnerBadge":
      return { ...xr(e), kind: "IdentityOwnerBadge" };
    case "MultiResourcePoolUnit":
      return { ...qr(e), kind: "MultiResourcePoolUnit" };
    case "OneResourcePoolUnit":
      return { ...Mr(e), kind: "OneResourcePoolUnit" };
    case "PackageOfDirectCallerResource":
      return { ...Ur(e), kind: "PackageOfDirectCallerResource" };
    case "PackageOwnerBadge":
      return { ...Br(e), kind: "PackageOwnerBadge" };
    case "Secp256k1SignatureResource":
      return { ...Kr(e), kind: "Secp256k1SignatureResource" };
    case "SystemExecutionResource":
      return { ...Lr(e), kind: "SystemExecutionResource" };
    case "TwoResourcePoolUnit":
      return { ...Gr(e), kind: "TwoResourcePoolUnit" };
    case "ValidatorClaimNft":
      return { ...Hr(e), kind: "ValidatorClaimNft" };
    case "ValidatorLiquidStakeUnit":
      return { ...zr(e), kind: "ValidatorLiquidStakeUnit" };
    case "ValidatorOwnerBadge":
      return { ...Wr(e), kind: "ValidatorOwnerBadge" };
    case "Xrd":
      return { ...$r(e), kind: "Xrd" };
    default:
      throw new Error(`No variant of NativeResourceDetails exists with 'kind=${e.kind}'`);
  }
}
function D(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.kind) {
      case "AccessControllerRecoveryBadge":
        return xl(e);
      case "AccountOwnerBadge":
        return Ml(e);
      case "Ed25519SignatureResource":
        return Bl(e);
      case "GlobalCallerResource":
        return Kl(e);
      case "IdentityOwnerBadge":
        return Ll(e);
      case "MultiResourcePoolUnit":
        return Hl(e);
      case "OneResourcePoolUnit":
        return zl(e);
      case "PackageOfDirectCallerResource":
        return Wl(e);
      case "PackageOwnerBadge":
        return $l(e);
      case "Secp256k1SignatureResource":
        return Xl(e);
      case "SystemExecutionResource":
        return Zl(e);
      case "TwoResourcePoolUnit":
        return Ql(e);
      case "ValidatorClaimNft":
        return Yl(e);
      case "ValidatorLiquidStakeUnit":
        return jl(e);
      case "ValidatorOwnerBadge":
        return es(e);
      case "Xrd":
        return ts(e);
      default:
        throw new Error(`No variant of NativeResourceDetails exists with 'kind=${e.kind}'`);
    }
  }
}
var Jh = {
  Xrd: "Xrd",
  PackageOwnerBadge: "PackageOwnerBadge",
  AccountOwnerBadge: "AccountOwnerBadge",
  IdentityOwnerBadge: "IdentityOwnerBadge",
  ValidatorOwnerBadge: "ValidatorOwnerBadge",
  Secp256k1SignatureResource: "Secp256k1SignatureResource",
  Ed25519SignatureResource: "Ed25519SignatureResource",
  GlobalCallerResource: "GlobalCallerResource",
  PackageOfDirectCallerResource: "PackageOfDirectCallerResource",
  SystemExecutionResource: "SystemExecutionResource",
  ValidatorLiquidStakeUnit: "ValidatorLiquidStakeUnit",
  ValidatorClaimNft: "ValidatorClaimNft",
  OneResourcePoolUnit: "OneResourcePoolUnit",
  TwoResourcePoolUnit: "TwoResourcePoolUnit",
  MultiResourcePoolUnit: "MultiResourcePoolUnit",
  AccessControllerRecoveryBadge: "AccessControllerRecoveryBadge"
};
function ns(e) {
  return is(e);
}
function is(e, t) {
  return e;
}
function Ih(e) {
  return e;
}
function Vh(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function wh(e) {
  return as(e);
}
function as(e, t) {
  return e == null ? e : {
    kind: ns(e.kind)
  };
}
function Ph(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var Dh = {
  Ed25519SignatureResource: "Ed25519SignatureResource"
};
function Eh(e) {
  return true;
}
function Ch(e) {
  return os(e);
}
function os(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function xh(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var qh = {
  GlobalCallerResource: "GlobalCallerResource"
};
function Mh(e) {
  return true;
}
function Uh(e) {
  return us(e);
}
function us(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Bh(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var Kh = {
  IdentityOwnerBadge: "IdentityOwnerBadge"
};
function Lh(e) {
  return true;
}
function Gh(e) {
  return ls(e);
}
function ls(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Hh(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var zh = {
  MultiResourcePoolUnit: "MultiResourcePoolUnit"
};
function Wh(e) {
  let t = true;
  return t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function $h(e) {
  return ss(e);
}
function ss(e, t) {
  return e == null ? e : {
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Xh(e) {
  if (e !== void 0)
    return e === null ? null : {
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v),
      kind: e.kind
    };
}
var Zh = {
  OneResourcePoolUnit: "OneResourcePoolUnit"
};
function Qh(e) {
  let t = true;
  return t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function Yh(e) {
  return cs(e);
}
function cs(e, t) {
  return e == null ? e : {
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function jh(e) {
  if (e !== void 0)
    return e === null ? null : {
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v),
      kind: e.kind
    };
}
var ek = {
  PackageOfDirectCallerResource: "PackageOfDirectCallerResource"
};
function tk(e) {
  return true;
}
function rk(e) {
  return ds(e);
}
function ds(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function nk(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var ik = {
  PackageOwnerBadge: "PackageOwnerBadge"
};
function ak(e) {
  return true;
}
function ok(e) {
  return _s(e);
}
function _s(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function uk(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var lk = {
  Secp256k1SignatureResource: "Secp256k1SignatureResource"
};
function sk(e) {
  return true;
}
function ck(e) {
  return fs(e);
}
function fs(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function dk(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var _k = {
  SystemExecutionResource: "SystemExecutionResource"
};
function fk(e) {
  return true;
}
function mk(e) {
  return ms(e);
}
function ms(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function pk(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var gk = {
  TwoResourcePoolUnit: "TwoResourcePoolUnit"
};
function yk(e) {
  let t = true;
  return t = t && "pool_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function Ok(e) {
  return ps(e);
}
function ps(e, t) {
  return e == null ? e : {
    pool_address: e.pool_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Sk(e) {
  if (e !== void 0)
    return e === null ? null : {
      pool_address: e.pool_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v),
      kind: e.kind
    };
}
var Nk = {
  ValidatorClaimNft: "ValidatorClaimNft"
};
function bk(e) {
  let t = true;
  return t = t && "validator_address" in e, t;
}
function Fk(e) {
  return gs(e);
}
function gs(e, t) {
  return e == null ? e : {
    validator_address: e.validator_address,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Ak(e) {
  if (e !== void 0)
    return e === null ? null : {
      validator_address: e.validator_address,
      kind: e.kind
    };
}
var Rk = {
  ValidatorLiquidStakeUnit: "ValidatorLiquidStakeUnit"
};
function hk(e) {
  let t = true;
  return t = t && "validator_address" in e, t = t && "redemption_resource_count" in e, t = t && "unit_redemption_value" in e, t;
}
function kk(e) {
  return ys(e);
}
function ys(e, t) {
  return e == null ? e : {
    validator_address: e.validator_address,
    redemption_resource_count: e.redemption_resource_count,
    unit_redemption_value: e.unit_redemption_value.map(T),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Tk(e) {
  if (e !== void 0)
    return e === null ? null : {
      validator_address: e.validator_address,
      redemption_resource_count: e.redemption_resource_count,
      unit_redemption_value: e.unit_redemption_value.map(v),
      kind: e.kind
    };
}
var vk = {
  ValidatorOwnerBadge: "ValidatorOwnerBadge"
};
function Jk(e) {
  return true;
}
function Ik(e) {
  return Os(e);
}
function Os(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Vk(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
var wk = {
  Xrd: "Xrd"
};
function Pk(e) {
  return true;
}
function Dk(e) {
  return Ss(e);
}
function Ss(e, t) {
  return e == null ? e : {
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Ek(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind
    };
}
function Ck(e) {
  let t = true;
  return t = t && "xrd" in e, t = t && "secp256k1_signature_virtual_badge" in e, t = t && "ed25519_signature_virtual_badge" in e, t = t && "package_of_direct_caller_virtual_badge" in e, t = t && "global_caller_virtual_badge" in e, t = t && "system_transaction_badge" in e, t = t && "package_owner_badge" in e, t = t && "validator_owner_badge" in e, t = t && "account_owner_badge" in e, t = t && "identity_owner_badge" in e, t = t && "package_package" in e, t = t && "resource_package" in e, t = t && "account_package" in e, t = t && "identity_package" in e, t = t && "consensus_manager_package" in e, t = t && "access_controller_package" in e, t = t && "transaction_processor_package" in e, t = t && "metadata_module_package" in e, t = t && "royalty_module_package" in e, t = t && "access_rules_package" in e, t = t && "role_assignment_module_package" in e, t = t && "genesis_helper_package" in e, t = t && "faucet_package" in e, t = t && "consensus_manager" in e, t = t && "genesis_helper" in e, t = t && "faucet" in e, t = t && "pool_package" in e, t = t && "locker_package" in e, t = t && "transaction_tracker" in e, t;
}
function Ns(e) {
  return bs(e);
}
function bs(e, t) {
  return e == null ? e : {
    xrd: e.xrd,
    secp256k1_signature_virtual_badge: e.secp256k1_signature_virtual_badge,
    ed25519_signature_virtual_badge: e.ed25519_signature_virtual_badge,
    package_of_direct_caller_virtual_badge: e.package_of_direct_caller_virtual_badge,
    global_caller_virtual_badge: e.global_caller_virtual_badge,
    system_transaction_badge: e.system_transaction_badge,
    package_owner_badge: e.package_owner_badge,
    validator_owner_badge: e.validator_owner_badge,
    account_owner_badge: e.account_owner_badge,
    identity_owner_badge: e.identity_owner_badge,
    package_package: e.package_package,
    resource_package: e.resource_package,
    account_package: e.account_package,
    identity_package: e.identity_package,
    consensus_manager_package: e.consensus_manager_package,
    access_controller_package: e.access_controller_package,
    transaction_processor_package: e.transaction_processor_package,
    metadata_module_package: e.metadata_module_package,
    royalty_module_package: e.royalty_module_package,
    access_rules_package: e.access_rules_package,
    role_assignment_module_package: e.role_assignment_module_package,
    genesis_helper_package: e.genesis_helper_package,
    faucet_package: e.faucet_package,
    consensus_manager: e.consensus_manager,
    genesis_helper: e.genesis_helper,
    faucet: e.faucet,
    pool_package: e.pool_package,
    locker_package: e.locker_package,
    transaction_tracker: e.transaction_tracker
  };
}
function Fs(e) {
  if (e !== void 0)
    return e === null ? null : {
      xrd: e.xrd,
      secp256k1_signature_virtual_badge: e.secp256k1_signature_virtual_badge,
      ed25519_signature_virtual_badge: e.ed25519_signature_virtual_badge,
      package_of_direct_caller_virtual_badge: e.package_of_direct_caller_virtual_badge,
      global_caller_virtual_badge: e.global_caller_virtual_badge,
      system_transaction_badge: e.system_transaction_badge,
      package_owner_badge: e.package_owner_badge,
      validator_owner_badge: e.validator_owner_badge,
      account_owner_badge: e.account_owner_badge,
      identity_owner_badge: e.identity_owner_badge,
      package_package: e.package_package,
      resource_package: e.resource_package,
      account_package: e.account_package,
      identity_package: e.identity_package,
      consensus_manager_package: e.consensus_manager_package,
      access_controller_package: e.access_controller_package,
      transaction_processor_package: e.transaction_processor_package,
      metadata_module_package: e.metadata_module_package,
      royalty_module_package: e.royalty_module_package,
      access_rules_package: e.access_rules_package,
      role_assignment_module_package: e.role_assignment_module_package,
      genesis_helper_package: e.genesis_helper_package,
      faucet_package: e.faucet_package,
      consensus_manager: e.consensus_manager,
      genesis_helper: e.genesis_helper,
      faucet: e.faucet,
      pool_package: e.pool_package,
      locker_package: e.locker_package,
      transaction_tracker: e.transaction_tracker
    };
}
function xk(e) {
  let t = true;
  return t = t && "network_id" in e, t = t && "network_name" in e, t = t && "well_known_addresses" in e, t;
}
function As(e) {
  return Rs(e);
}
function Rs(e, t) {
  return e == null ? e : {
    network_id: e.network_id,
    network_name: e.network_name,
    well_known_addresses: Ns(e.well_known_addresses)
  };
}
function qk(e) {
  if (e !== void 0)
    return e === null ? null : {
      network_id: e.network_id,
      network_name: e.network_name,
      well_known_addresses: Fs(e.well_known_addresses)
    };
}
var Mk = {
  String: "String",
  Integer: "Integer",
  Bytes: "Bytes",
  Ruid: "Ruid"
};
function ne(e) {
  return hs(e);
}
function hs(e, t) {
  return e;
}
function Uk(e) {
  return e;
}
function Bk(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Xr(e) {
  return ks(e);
}
function ks(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items
  };
}
function Zr(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items
    };
}
function Kk(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Lk(e) {
  return Ts(e);
}
function Ts(e, t) {
  return e == null ? e : {
    items: e.items
  };
}
function Gk(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items
    };
}
var Hk = {
  Global: "Global"
};
function zk(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t = t && "amount" in e, t = t && "last_updated_at_state_version" in e, t;
}
function Wk(e) {
  return Qr(e);
}
function Qr(e, t) {
  return e == null ? e : {
    aggregation_level: e.aggregation_level,
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0,
    amount: e.amount,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function vs(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata),
      amount: e.amount,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function $k(e) {
  let t = true;
  return t = t && "total_count" in e, t = t && "vault_address" in e, t = t && "last_updated_at_state_version" in e, t;
}
function L(e) {
  return Js(e);
}
function Js(e, t) {
  return e == null ? e : {
    total_count: e.total_count,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: r(e, "items") ? e.items : void 0,
    vault_address: e.vault_address,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function G(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items,
      vault_address: e.vault_address,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function Xk(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Yr(e) {
  return Is(e);
}
function Is(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(L)
  };
}
function jr(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(G)
    };
}
var Zk = {
  Vault: "Vault"
};
function Qk(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t = t && "vaults" in e, t;
}
function Yk(e) {
  return en(e);
}
function en(e, t) {
  return e == null ? e : {
    aggregation_level: e.aggregation_level,
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0,
    vaults: Yr(e.vaults)
  };
}
function Vs(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata),
      vaults: jr(e.vaults)
    };
}
function Ne(e) {
  return ws(e);
}
function ws(e, t) {
  if (e == null)
    return e;
  switch (e.aggregation_level) {
    case "Global":
      return { ...Qr(e), aggregation_level: "Global" };
    case "Vault":
      return { ...en(e), aggregation_level: "Vault" };
    default:
      throw new Error(`No variant of NonFungibleResourcesCollectionItem exists with 'aggregation_level=${e.aggregation_level}'`);
  }
}
function be(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.aggregation_level) {
      case "Global":
        return vs(e);
      case "Vault":
        return Vs(e);
      default:
        throw new Error(`No variant of NonFungibleResourcesCollectionItem exists with 'aggregation_level=${e.aggregation_level}'`);
    }
  }
}
function jk(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Ps(e) {
  return Ds(e);
}
function Ds(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Ne)
  };
}
function Es(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(be)
    };
}
function eT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function tT(e) {
  return Cs(e);
}
function Cs(e, t) {
  return e == null ? e : {
    items: e.items.map(Ne)
  };
}
function rT(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(be)
    };
}
function nT(e) {
  let t = true;
  return t = t && "aggregation_level" in e, t = t && "resource_address" in e, t;
}
function iT(e) {
  return xs(e);
}
function xs(e, t) {
  return e == null ? e : {
    aggregation_level: k(e.aggregation_level),
    resource_address: e.resource_address,
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0
  };
}
function aT(e) {
  if (e !== void 0)
    return e === null ? null : {
      aggregation_level: e.aggregation_level,
      resource_address: e.resource_address,
      explicit_metadata: F(e.explicit_metadata)
    };
}
var oT = {
  Global: "Global"
};
function uT(e) {
  let t = true;
  return t = t && "amount" in e, t = t && "last_updated_at_state_version" in e, t;
}
function lT(e) {
  return qs(e);
}
function qs(e, t) {
  return e == null ? e : {
    amount: e.amount,
    last_updated_at_state_version: e.last_updated_at_state_version,
    aggregation_level: r(e, "aggregation_level") ? e.aggregation_level : void 0
  };
}
function sT(e) {
  if (e !== void 0)
    return e === null ? null : {
      amount: e.amount,
      last_updated_at_state_version: e.last_updated_at_state_version,
      aggregation_level: e.aggregation_level
    };
}
var cT = {
  Vault: "Vault"
};
function dT(e) {
  let t = true;
  return t = t && "vaults" in e, t;
}
function _T(e) {
  return Ms(e);
}
function Ms(e, t) {
  return e == null ? e : {
    vaults: Yr(e.vaults),
    aggregation_level: r(e, "aggregation_level") ? e.aggregation_level : void 0
  };
}
function fT(e) {
  if (e !== void 0)
    return e === null ? null : {
      vaults: jr(e.vaults),
      aggregation_level: e.aggregation_level
    };
}
function mT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function pT(e) {
  return Us(e);
}
function Us(e, t) {
  return e == null ? e : {
    items: e.items.map(L)
  };
}
function gT(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(G)
    };
}
function yT(e) {
  let t = true;
  return t = t && "vault_address" in e, t = t && "total_count" in e, t = t && "last_updated_at_state_version" in e, t;
}
function OT(e) {
  return Bs(e);
}
function Bs(e, t) {
  return e == null ? e : {
    vault_address: e.vault_address,
    total_count: e.total_count,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function ST(e) {
  if (e !== void 0)
    return e === null ? null : {
      vault_address: e.vault_address,
      total_count: e.total_count,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
var NT = {
  NotSyncedUpError: "NotSyncedUpError"
};
function bT(e) {
  let t = true;
  return t = t && "request_type" in e, t = t && "current_sync_delay_seconds" in e, t = t && "max_allowed_sync_delay_seconds" in e, t;
}
function FT(e) {
  return Ks(e);
}
function Ks(e, t) {
  return e == null ? e : {
    request_type: e.request_type,
    current_sync_delay_seconds: e.current_sync_delay_seconds,
    max_allowed_sync_delay_seconds: e.max_allowed_sync_delay_seconds,
    type: r(e, "type") ? e.type : void 0
  };
}
function AT(e) {
  if (e !== void 0)
    return e === null ? null : {
      request_type: e.request_type,
      current_sync_delay_seconds: e.current_sync_delay_seconds,
      max_allowed_sync_delay_seconds: e.max_allowed_sync_delay_seconds,
      type: e.type
    };
}
function RT(e) {
  return true;
}
function hT(e) {
  return Ls(e);
}
function Ls(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: r(e, "items") ? e.items : void 0
  };
}
function kT(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items
    };
}
function TT(e) {
  return true;
}
function vT(e) {
  return Gs(e);
}
function Gs(e, t) {
  return e == null ? e : {
    items: r(e, "items") ? e.items : void 0
  };
}
function JT(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items
    };
}
function IT(e) {
  let t = true;
  return t = t && "name" in e, t = t && "version" in e, t = t && "definition" in e, t;
}
function Fe(e) {
  return Hs(e);
}
function Hs(e, t) {
  return e == null ? e : {
    name: e.name,
    version: e.version,
    definition: e.definition,
    dependant_entities: r(e, "dependant_entities") ? e.dependant_entities : void 0,
    auth_template: r(e, "auth_template") ? e.auth_template : void 0,
    auth_template_is_locked: r(e, "auth_template_is_locked") ? e.auth_template_is_locked : void 0,
    royalty_config: r(e, "royalty_config") ? ia(e.royalty_config) : void 0,
    royalty_config_is_locked: r(e, "royalty_config_is_locked") ? e.royalty_config_is_locked : void 0
  };
}
function Ae(e) {
  if (e !== void 0)
    return e === null ? null : {
      name: e.name,
      version: e.version,
      definition: e.definition,
      dependant_entities: e.dependant_entities,
      auth_template: e.auth_template,
      auth_template_is_locked: e.auth_template_is_locked,
      royalty_config: oa(e.royalty_config),
      royalty_config_is_locked: e.royalty_config_is_locked
    };
}
function VT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function tn(e) {
  return zs(e);
}
function zs(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Fe)
  };
}
function rn(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Ae)
    };
}
function wT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function PT(e) {
  return Ws(e);
}
function Ws(e, t) {
  return e == null ? e : {
    items: e.items.map(Fe)
  };
}
function DT(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(Ae)
    };
}
var ET = {
  Native: "Native",
  ScryptoV1: "ScryptoV1"
};
function Re(e) {
  return $s(e);
}
function $s(e, t) {
  return e;
}
function CT(e) {
  return e;
}
function xT(e) {
  let t = true;
  return t = t && "vm_type" in e, t = t && "code_hash_hex" in e, t = t && "code_hex" in e, t;
}
function he(e) {
  return Xs(e);
}
function Xs(e, t) {
  return e == null ? e : {
    vm_type: Re(e.vm_type),
    code_hash_hex: e.code_hash_hex,
    code_hex: e.code_hex
  };
}
function ke(e) {
  if (e !== void 0)
    return e === null ? null : {
      vm_type: e.vm_type,
      code_hash_hex: e.code_hash_hex,
      code_hex: e.code_hex
    };
}
function qT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function nn(e) {
  return Zs(e);
}
function Zs(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(he)
  };
}
function an(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ke)
    };
}
function MT(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function UT(e) {
  return Qs(e);
}
function Qs(e, t) {
  return e == null ? e : {
    items: e.items.map(he)
  };
}
function BT(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(ke)
    };
}
var KT = {
  Array: "Array"
};
function LT(e) {
  let t = true;
  return t = t && "element_kind" in e, t = t && "elements" in e, t;
}
function GT(e) {
  return Ys(e);
}
function Ys(e, t) {
  return e == null ? e : {
    element_kind: N(e.element_kind),
    element_type_name: r(e, "element_type_name") ? e.element_type_name : void 0,
    elements: e.elements.map(g),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function HT(e) {
  if (e !== void 0)
    return e === null ? null : {
      element_kind: e.element_kind,
      element_type_name: e.element_type_name,
      elements: e.elements.map(y),
      kind: e.kind
    };
}
function zT(e) {
  let t = true;
  return t = t && "kind" in e, t;
}
function WT(e) {
  return js(e);
}
function js(e, t) {
  return e == null ? e : {
    kind: N(e.kind),
    type_name: r(e, "type_name") ? e.type_name : void 0,
    field_name: r(e, "field_name") ? e.field_name : void 0
  };
}
function $T(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind: e.kind,
      type_name: e.type_name,
      field_name: e.field_name
    };
}
var XT = {
  Bool: "Bool"
};
function ZT(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function QT(e) {
  return ec(e);
}
function ec(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function YT(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var jT = {
  Bytes: "Bytes"
};
function ev(e) {
  let t = true;
  return t = t && "element_kind" in e, t = t && "hex" in e, t;
}
function tv(e) {
  return tc(e);
}
function tc(e, t) {
  return e == null ? e : {
    element_kind: N(e.element_kind),
    element_type_name: r(e, "element_type_name") ? e.element_type_name : void 0,
    hex: e.hex,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function rv(e) {
  if (e !== void 0)
    return e === null ? null : {
      element_kind: e.element_kind,
      element_type_name: e.element_type_name,
      hex: e.hex,
      kind: e.kind
    };
}
var nv = {
  Decimal: "Decimal"
};
function iv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function av(e) {
  return rc(e);
}
function rc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function ov(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var uv = {
  Enum: "Enum"
};
function lv(e) {
  let t = true;
  return t = t && "variant_id" in e, t = t && "fields" in e, t;
}
function sv(e) {
  return nc(e);
}
function nc(e, t) {
  return e == null ? e : {
    variant_id: e.variant_id,
    variant_name: r(e, "variant_name") ? e.variant_name : void 0,
    fields: e.fields.map(g),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function cv(e) {
  if (e !== void 0)
    return e === null ? null : {
      variant_id: e.variant_id,
      variant_name: e.variant_name,
      fields: e.fields.map(y),
      kind: e.kind
    };
}
var dv = {
  I128: "I128"
};
function _v(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function fv(e) {
  return ic(e);
}
function ic(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function mv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var pv = {
  I16: "I16"
};
function gv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function yv(e) {
  return ac(e);
}
function ac(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Ov(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Sv = {
  I32: "I32"
};
function Nv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function bv(e) {
  return oc(e);
}
function oc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Fv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Av = {
  I64: "I64"
};
function Rv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function hv(e) {
  return uc(e);
}
function uc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function kv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Tv = {
  I8: "I8"
};
function vv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function Jv(e) {
  return lc(e);
}
function lc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Iv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Vv = {
  Map: "Map"
};
function wv(e) {
  let t = true;
  return t = t && "key_kind" in e, t = t && "value_kind" in e, t = t && "entries" in e, t;
}
function Pv(e) {
  return sc(e);
}
function sc(e, t) {
  return e == null ? e : {
    key_kind: N(e.key_kind),
    key_type_name: r(e, "key_type_name") ? e.key_type_name : void 0,
    value_kind: N(e.value_kind),
    value_type_name: r(e, "value_type_name") ? e.value_type_name : void 0,
    entries: e.entries.map(mt),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Dv(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_kind: e.key_kind,
      key_type_name: e.key_type_name,
      value_kind: e.value_kind,
      value_type_name: e.value_type_name,
      entries: e.entries.map(pt),
      kind: e.kind
    };
}
var Ev = {
  NonFungibleLocalId: "NonFungibleLocalId"
};
function Cv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function xv(e) {
  return cc(e);
}
function cc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function qv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Mv = {
  Own: "Own"
};
function Uv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function Bv(e) {
  return dc(e);
}
function dc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Kv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Lv = {
  PreciseDecimal: "PreciseDecimal"
};
function Gv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function Hv(e) {
  return _c(e);
}
function _c(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function zv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Wv = {
  Reference: "Reference"
};
function $v(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function Xv(e) {
  return fc(e);
}
function fc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function Zv(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var Qv = {
  String: "String"
};
function Yv(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function jv(e) {
  return mc(e);
}
function mc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function eJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var tJ = {
  Tuple: "Tuple"
};
function rJ(e) {
  let t = true;
  return t = t && "fields" in e, t;
}
function nJ(e) {
  return pc(e);
}
function pc(e, t) {
  return e == null ? e : {
    fields: e.fields.map(g),
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function iJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      fields: e.fields.map(y),
      kind: e.kind
    };
}
var aJ = {
  U128: "U128"
};
function oJ(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function uJ(e) {
  return gc(e);
}
function gc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function lJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var sJ = {
  U16: "U16"
};
function cJ(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function dJ(e) {
  return yc(e);
}
function yc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function _J(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var fJ = {
  U32: "U32"
};
function mJ(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function pJ(e) {
  return Oc(e);
}
function Oc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function gJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var yJ = {
  U64: "U64"
};
function OJ(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function SJ(e) {
  return Sc(e);
}
function Sc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function NJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var bJ = {
  U8: "U8"
};
function FJ(e) {
  let t = true;
  return t = t && "value" in e, t;
}
function AJ(e) {
  return Nc(e);
}
function Nc(e, t) {
  return e == null ? e : {
    value: e.value,
    kind: r(e, "kind") ? e.kind : void 0
  };
}
function RJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      value: e.value,
      kind: e.kind
    };
}
var hJ = {
  EcdsaSecp256k1: "EcdsaSecp256k1",
  EddsaEd25519: "EddsaEd25519"
};
function bc(e) {
  return Fc(e);
}
function Fc(e, t) {
  return e;
}
function kJ(e) {
  return e;
}
function TJ(e) {
  let t = true;
  return t = t && "key_type" in e, t;
}
function vJ(e) {
  return Ac(e);
}
function Ac(e, t) {
  return e == null ? e : {
    key_type: bc(e.key_type)
  };
}
function JJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_type: e.key_type
    };
}
var IJ = {
  EcdsaSecp256k1: "EcdsaSecp256k1"
};
function VJ(e) {
  let t = true;
  return t = t && "key_hex" in e, t;
}
function wJ(e) {
  return Rc(e);
}
function Rc(e, t) {
  return e == null ? e : {
    key_hex: e.key_hex,
    key_type: r(e, "key_type") ? e.key_type : void 0
  };
}
function PJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hex: e.key_hex,
      key_type: e.key_type
    };
}
var DJ = {
  EddsaEd25519: "EddsaEd25519"
};
function EJ(e) {
  let t = true;
  return t = t && "key_hex" in e, t;
}
function CJ(e) {
  return hc(e);
}
function hc(e, t) {
  return e == null ? e : {
    key_hex: e.key_hex,
    key_type: r(e, "key_type") ? e.key_type : void 0
  };
}
function xJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hex: e.key_hex,
      key_type: e.key_type
    };
}
var qJ = {
  EcdsaSecp256k1: "EcdsaSecp256k1",
  EddsaEd25519: "EddsaEd25519"
};
function kc(e) {
  return Tc(e);
}
function Tc(e, t) {
  return e;
}
function MJ(e) {
  return e;
}
function UJ(e) {
  let t = true;
  return t = t && "key_hash_type" in e, t;
}
function BJ(e) {
  return vc(e);
}
function vc(e, t) {
  return e == null ? e : {
    key_hash_type: kc(e.key_hash_type)
  };
}
function KJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hash_type: e.key_hash_type
    };
}
var LJ = {
  EcdsaSecp256k1: "EcdsaSecp256k1"
};
function GJ(e) {
  let t = true;
  return t = t && "hash_hex" in e, t;
}
function HJ(e) {
  return Jc(e);
}
function Jc(e, t) {
  return e == null ? e : {
    hash_hex: e.hash_hex,
    key_hash_type: r(e, "key_hash_type") ? e.key_hash_type : void 0
  };
}
function zJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      hash_hex: e.hash_hex,
      key_hash_type: e.key_hash_type
    };
}
var WJ = {
  EddsaEd25519: "EddsaEd25519"
};
function $J(e) {
  let t = true;
  return t = t && "hash_hex" in e, t;
}
function XJ(e) {
  return Ic(e);
}
function Ic(e, t) {
  return e == null ? e : {
    hash_hex: e.hash_hex,
    key_hash_type: r(e, "key_hash_type") ? e.key_hash_type : void 0
  };
}
function ZJ(e) {
  if (e !== void 0)
    return e === null ? null : {
      hash_hex: e.hash_hex,
      key_hash_type: e.key_hash_type
    };
}
var QJ = {
  FungibleResource: "FungibleResource"
};
function YJ(e) {
  let t = true;
  return t = t && "type" in e, t = t && "holder_address" in e, t = t && "last_updated_at_state_version" in e, t = t && "amount" in e, t;
}
function jJ(e) {
  return on(e);
}
function on(e, t) {
  return e == null ? e : {
    type: e.type,
    holder_address: e.holder_address,
    last_updated_at_state_version: e.last_updated_at_state_version,
    amount: e.amount
  };
}
function Vc(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      holder_address: e.holder_address,
      last_updated_at_state_version: e.last_updated_at_state_version,
      amount: e.amount
    };
}
var eI = {
  NonFungibleResource: "NonFungibleResource"
};
function tI(e) {
  let t = true;
  return t = t && "type" in e, t = t && "holder_address" in e, t = t && "last_updated_at_state_version" in e, t = t && "non_fungible_ids_count" in e, t;
}
function rI(e) {
  return un(e);
}
function un(e, t) {
  return e == null ? e : {
    type: e.type,
    holder_address: e.holder_address,
    last_updated_at_state_version: e.last_updated_at_state_version,
    non_fungible_ids_count: e.non_fungible_ids_count
  };
}
function wc(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      holder_address: e.holder_address,
      last_updated_at_state_version: e.last_updated_at_state_version,
      non_fungible_ids_count: e.non_fungible_ids_count
    };
}
function Te(e) {
  return Pc(e);
}
function Pc(e, t) {
  if (e == null)
    return e;
  switch (e.type) {
    case "FungibleResource":
      return { ...on(e), type: "FungibleResource" };
    case "NonFungibleResource":
      return { ...un(e), type: "NonFungibleResource" };
    default:
      throw new Error(`No variant of ResourceHoldersCollectionItem exists with 'type=${e.type}'`);
  }
}
function ve(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.type) {
      case "FungibleResource":
        return Vc(e);
      case "NonFungibleResource":
        return wc(e);
      default:
        throw new Error(`No variant of ResourceHoldersCollectionItem exists with 'type=${e.type}'`);
    }
  }
}
function nI(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function iI(e) {
  return Dc(e);
}
function Dc(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Te)
  };
}
function aI(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ve)
    };
}
function oI(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function uI(e) {
  return Ec(e);
}
function Ec(e, t) {
  return e == null ? e : {
    items: e.items.map(Te)
  };
}
function lI(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(ve)
    };
}
var sI = {
  FungibleResource: "FungibleResource"
};
function cI(e) {
  let t = true;
  return t = t && "amount" in e, t;
}
function dI(e) {
  return Cc(e);
}
function Cc(e, t) {
  return e == null ? e : {
    amount: e.amount,
    type: r(e, "type") ? e.type : void 0
  };
}
function _I(e) {
  if (e !== void 0)
    return e === null ? null : {
      amount: e.amount,
      type: e.type
    };
}
var fI = {
  FungibleResource: "FungibleResource",
  NonFungibleResource: "NonFungibleResource"
};
function xc(e) {
  return qc(e);
}
function qc(e, t) {
  return e;
}
function mI(e) {
  return e;
}
function pI(e) {
  let t = true;
  return t = t && "type" in e, t = t && "holder_address" in e, t = t && "last_updated_at_state_version" in e, t;
}
function gI(e) {
  return Mc(e);
}
function Mc(e, t) {
  return e == null ? e : {
    type: xc(e.type),
    holder_address: e.holder_address,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function yI(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      holder_address: e.holder_address,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
var OI = {
  NonFungibleResource: "NonFungibleResource"
};
function SI(e) {
  let t = true;
  return t = t && "non_fungible_ids_count" in e, t;
}
function NI(e) {
  return Uc(e);
}
function Uc(e, t) {
  return e == null ? e : {
    non_fungible_ids_count: e.non_fungible_ids_count,
    type: r(e, "type") ? e.type : void 0
  };
}
function bI(e) {
  if (e !== void 0)
    return e === null ? null : {
      non_fungible_ids_count: e.non_fungible_ids_count,
      type: e.type
    };
}
function FI(e) {
  return true;
}
function AI(e) {
  return Bc(e);
}
function Bc(e, t) {
  return e == null ? e : {
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    resource_address: r(e, "resource_address") ? e.resource_address : void 0
  };
}
function Kc(e) {
  if (e !== void 0)
    return e === null ? null : {
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      resource_address: e.resource_address
    };
}
function RI(e) {
  return true;
}
function hI(e) {
  return Lc(e);
}
function Lc(e, t) {
  return e == null ? e : {
    resource_address: r(e, "resource_address") ? e.resource_address : void 0
  };
}
function kI(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address
    };
}
function TI(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Gc(e) {
  return Hc(e);
}
function Hc(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Te)
  };
}
function vI(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ve)
    };
}
function JI(e) {
  return true;
}
function II(e) {
  return zc(e);
}
function zc(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0
  };
}
function VI(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor
    };
}
function wI(e) {
  let t = true;
  return t = t && "raw_hex" in e, t = t && "programmatic_json" in e, t;
}
function Q(e) {
  return Wc(e);
}
function Wc(e, t) {
  return e == null ? e : {
    raw_hex: e.raw_hex,
    programmatic_json: g(e.programmatic_json)
  };
}
function Y(e) {
  if (e !== void 0)
    return e === null ? null : {
      raw_hex: e.raw_hex,
      programmatic_json: y(e.programmatic_json)
    };
}
function PI(e) {
  let t = true;
  return t = t && "account_address" in e, t;
}
function DI(e) {
  return $c(e);
}
function $c(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    account_address: e.account_address
  };
}
function Xc(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      account_address: e.account_address
    };
}
function EI(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "account_address" in e, t;
}
function Zc(e) {
  return Qc(e);
}
function Qc(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(le),
    account_address: e.account_address
  };
}
function CI(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(se),
      account_address: e.account_address
    };
}
function xI(e) {
  let t = true;
  return t = t && "locker_address" in e, t = t && "account_address" in e, t;
}
function qI(e) {
  return Yc(e);
}
function Yc(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    locker_address: e.locker_address,
    account_address: e.account_address
  };
}
function jc(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      locker_address: e.locker_address,
      account_address: e.account_address
    };
}
function MI(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "locker_address" in e, t = t && "account_address" in e, t;
}
function ed(e) {
  return td(e);
}
function td(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(ce),
    locker_address: e.locker_address,
    account_address: e.account_address
  };
}
function UI(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(de),
      locker_address: e.locker_address,
      account_address: e.account_address
    };
}
function BI(e) {
  let t = true;
  return t = t && "account_lockers" in e, t;
}
function KI(e) {
  return rd(e);
}
function rd(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    account_lockers: e.account_lockers.map(Ze)
  };
}
function nd(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      account_lockers: e.account_lockers.map(Qe)
    };
}
function LI(e) {
  let t = true;
  return t = t && "account_lockers" in e, t;
}
function GI(e) {
  return id(e);
}
function id(e, t) {
  return e == null ? e : {
    account_lockers: e.account_lockers.map(Ze)
  };
}
function HI(e) {
  if (e !== void 0)
    return e === null ? null : {
      account_lockers: e.account_lockers.map(Qe)
    };
}
function zI(e) {
  let t = true;
  return t = t && "locker_address" in e, t = t && "account_address" in e, t = t && "last_touched_at_state_version" in e, t;
}
function ln(e) {
  return ad(e);
}
function ad(e, t) {
  return e == null ? e : {
    locker_address: e.locker_address,
    account_address: e.account_address,
    last_touched_at_state_version: e.last_touched_at_state_version
  };
}
function sn(e) {
  if (e !== void 0)
    return e === null ? null : {
      locker_address: e.locker_address,
      account_address: e.account_address,
      last_touched_at_state_version: e.last_touched_at_state_version
    };
}
function WI(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t;
}
function od(e) {
  return ud(e);
}
function ud(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    items: e.items.map(ln)
  };
}
function $I(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      items: e.items.map(sn)
    };
}
function XI(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function ZI(e) {
  return ld(e);
}
function ld(e, t) {
  return e == null ? e : {
    items: e.items.map(ln)
  };
}
function QI(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(sn)
    };
}
function YI(e) {
  let t = true;
  return t = t && "last_touched_at_state_version" in e, t;
}
function jI(e) {
  return sd(e);
}
function sd(e, t) {
  return e == null ? e : {
    last_touched_at_state_version: e.last_touched_at_state_version
  };
}
function eV(e) {
  if (e !== void 0)
    return e === null ? null : {
      last_touched_at_state_version: e.last_touched_at_state_version
    };
}
function tV(e) {
  let t = true;
  return t = t && "account_address" in e, t;
}
function rV(e) {
  return cd(e);
}
function cd(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    account_address: e.account_address
  };
}
function dd(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      account_address: e.account_address
    };
}
function nV(e) {
  let t = true;
  return t = t && "account_address" in e, t;
}
function iV(e) {
  return _d(e);
}
function _d(e, t) {
  return e == null ? e : {
    account_address: e.account_address
  };
}
function aV(e) {
  if (e !== void 0)
    return e === null ? null : {
      account_address: e.account_address
    };
}
function oV(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "account_address" in e, t;
}
function fd(e) {
  return md(e);
}
function md(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(_e),
    account_address: e.account_address
  };
}
function uV(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(fe),
      account_address: e.account_address
    };
}
function lV(e) {
  return true;
}
function cn(e) {
  return pd(e);
}
function pd(e, t) {
  return e == null ? e : {
    ancestor_identities: r(e, "ancestor_identities") ? e.ancestor_identities : void 0,
    component_royalty_config: r(e, "component_royalty_config") ? e.component_royalty_config : void 0,
    component_royalty_vault_balance: r(e, "component_royalty_vault_balance") ? e.component_royalty_vault_balance : void 0,
    package_royalty_vault_balance: r(e, "package_royalty_vault_balance") ? e.package_royalty_vault_balance : void 0,
    non_fungible_include_nfids: r(e, "non_fungible_include_nfids") ? e.non_fungible_include_nfids : void 0,
    explicit_metadata: r(e, "explicit_metadata") ? e.explicit_metadata : void 0,
    dapp_two_way_links: r(e, "dapp_two_way_links") ? e.dapp_two_way_links : void 0,
    native_resource_details: r(e, "native_resource_details") ? e.native_resource_details : void 0
  };
}
function dn(e) {
  if (e !== void 0)
    return e === null ? null : {
      ancestor_identities: e.ancestor_identities,
      component_royalty_config: e.component_royalty_config,
      component_royalty_vault_balance: e.component_royalty_vault_balance,
      package_royalty_vault_balance: e.package_royalty_vault_balance,
      non_fungible_include_nfids: e.non_fungible_include_nfids,
      explicit_metadata: e.explicit_metadata,
      dapp_two_way_links: e.dapp_two_way_links,
      native_resource_details: e.native_resource_details
    };
}
function sV(e) {
  let t = true;
  return t = t && "addresses" in e, t;
}
function cV(e) {
  return gd(e);
}
function gd(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    opt_ins: r(e, "opt_ins") ? cn(e.opt_ins) : void 0,
    addresses: e.addresses,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0
  };
}
function yd(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      opt_ins: dn(e.opt_ins),
      addresses: e.addresses,
      aggregation_level: e.aggregation_level
    };
}
function dV(e) {
  let t = true;
  return t = t && "addresses" in e, t;
}
function _V(e) {
  return Od(e);
}
function Od(e, t) {
  return e == null ? e : {
    opt_ins: r(e, "opt_ins") ? cn(e.opt_ins) : void 0,
    addresses: e.addresses,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0
  };
}
function fV(e) {
  if (e !== void 0)
    return e === null ? null : {
      opt_ins: dn(e.opt_ins),
      addresses: e.addresses,
      aggregation_level: e.aggregation_level
    };
}
function mV(e) {
  return true;
}
function Sd(e) {
  return Nd(e);
}
function Nd(e, t) {
  return e == null ? e : {
    parent_address: r(e, "parent_address") ? e.parent_address : void 0,
    owner_address: r(e, "owner_address") ? e.owner_address : void 0,
    global_address: r(e, "global_address") ? e.global_address : void 0
  };
}
function bd(e) {
  if (e !== void 0)
    return e === null ? null : {
      parent_address: e.parent_address,
      owner_address: e.owner_address,
      global_address: e.global_address
    };
}
function pV(e) {
  let t = true;
  return t = t && "dapp_address" in e, t;
}
function _n(e) {
  return Fd(e);
}
function Fd(e, t) {
  return e == null ? e : {
    dapp_address: e.dapp_address
  };
}
function fn(e) {
  if (e !== void 0)
    return e === null ? null : {
      dapp_address: e.dapp_address
    };
}
function gV(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function H(e) {
  return Ad(e);
}
function Ad(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(_n)
  };
}
function z(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(fn)
    };
}
function yV(e) {
  let t = true;
  return t = t && "entity_address" in e, t;
}
function mn(e) {
  return Rd(e);
}
function Rd(e, t) {
  return e == null ? e : {
    entity_address: e.entity_address
  };
}
function pn(e) {
  if (e !== void 0)
    return e === null ? null : {
      entity_address: e.entity_address
    };
}
function OV(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function hd(e) {
  return kd(e);
}
function kd(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(mn)
  };
}
function Td(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(pn)
    };
}
function SV(e) {
  return true;
}
function gn(e) {
  return vd(e);
}
function vd(e, t) {
  return e == null ? e : {
    dapps: r(e, "dapps") ? H(e.dapps) : void 0,
    entities: r(e, "entities") ? hd(e.entities) : void 0,
    primary_locker: r(e, "primary_locker") ? e.primary_locker : void 0
  };
}
function yn(e) {
  if (e !== void 0)
    return e === null ? null : {
      dapps: z(e.dapps),
      entities: Td(e.entities),
      primary_locker: e.primary_locker
    };
}
var NV = {
  Component: "Component"
};
function bV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "blueprint_name" in e, t = t && "blueprint_version" in e, t;
}
function FV(e) {
  return On(e);
}
function On(e, t) {
  return e == null ? e : {
    type: e.type,
    package_address: r(e, "package_address") ? e.package_address : void 0,
    blueprint_name: e.blueprint_name,
    blueprint_version: e.blueprint_version,
    state: r(e, "state") ? e.state : void 0,
    role_assignments: r(e, "role_assignments") ? R(e.role_assignments) : void 0,
    royalty_vault_balance: r(e, "royalty_vault_balance") ? e.royalty_vault_balance : void 0,
    royalty_config: r(e, "royalty_config") ? vt(e.royalty_config) : void 0,
    two_way_linked_dapp_address: r(e, "two_way_linked_dapp_address") ? e.two_way_linked_dapp_address : void 0,
    two_way_linked_dapp_details: r(e, "two_way_linked_dapp_details") ? gn(e.two_way_linked_dapp_details) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0
  };
}
function Jd(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      package_address: e.package_address,
      blueprint_name: e.blueprint_name,
      blueprint_version: e.blueprint_version,
      state: e.state,
      role_assignments: h(e.role_assignments),
      royalty_vault_balance: e.royalty_vault_balance,
      royalty_config: Jt(e.royalty_config),
      two_way_linked_dapp_address: e.two_way_linked_dapp_address,
      two_way_linked_dapp_details: yn(e.two_way_linked_dapp_details),
      native_resource_details: D(e.native_resource_details)
    };
}
var AV = {
  FungibleResource: "FungibleResource"
};
function RV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "role_assignments" in e, t = t && "divisibility" in e, t = t && "total_supply" in e, t = t && "total_minted" in e, t = t && "total_burned" in e, t;
}
function hV(e) {
  return Sn(e);
}
function Sn(e, t) {
  return e == null ? e : {
    type: e.type,
    role_assignments: R(e.role_assignments),
    divisibility: e.divisibility,
    total_supply: e.total_supply,
    total_minted: e.total_minted,
    total_burned: e.total_burned,
    two_way_linked_dapps: r(e, "two_way_linked_dapps") ? H(e.two_way_linked_dapps) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0
  };
}
function Id(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      role_assignments: h(e.role_assignments),
      divisibility: e.divisibility,
      total_supply: e.total_supply,
      total_minted: e.total_minted,
      total_burned: e.total_burned,
      two_way_linked_dapps: z(e.two_way_linked_dapps),
      native_resource_details: D(e.native_resource_details)
    };
}
var kV = {
  FungibleVault: "FungibleVault"
};
function TV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "balance" in e, t;
}
function vV(e) {
  return Nn(e);
}
function Nn(e, t) {
  return e == null ? e : {
    type: e.type,
    resource_address: e.resource_address,
    balance: B(e.balance)
  };
}
function Vd(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      balance: K(e.balance)
    };
}
var JV = {
  NonFungibleResource: "NonFungibleResource"
};
function IV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "role_assignments" in e, t = t && "non_fungible_id_type" in e, t = t && "total_supply" in e, t = t && "total_minted" in e, t = t && "total_burned" in e, t = t && "non_fungible_data_mutable_fields" in e, t;
}
function VV(e) {
  return bn(e);
}
function bn(e, t) {
  return e == null ? e : {
    type: e.type,
    role_assignments: R(e.role_assignments),
    non_fungible_id_type: ne(e.non_fungible_id_type),
    total_supply: e.total_supply,
    total_minted: e.total_minted,
    total_burned: e.total_burned,
    non_fungible_data_mutable_fields: e.non_fungible_data_mutable_fields,
    two_way_linked_dapps: r(e, "two_way_linked_dapps") ? H(e.two_way_linked_dapps) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0
  };
}
function wd(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      role_assignments: h(e.role_assignments),
      non_fungible_id_type: e.non_fungible_id_type,
      total_supply: e.total_supply,
      total_minted: e.total_minted,
      total_burned: e.total_burned,
      non_fungible_data_mutable_fields: e.non_fungible_data_mutable_fields,
      two_way_linked_dapps: z(e.two_way_linked_dapps),
      native_resource_details: D(e.native_resource_details)
    };
}
var wV = {
  NonFungibleVault: "NonFungibleVault"
};
function PV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "resource_address" in e, t = t && "balance" in e, t;
}
function DV(e) {
  return Fn(e);
}
function Fn(e, t) {
  return e == null ? e : {
    type: e.type,
    resource_address: e.resource_address,
    balance: L(e.balance)
  };
}
function Pd(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      resource_address: e.resource_address,
      balance: G(e.balance)
    };
}
var EV = {
  Package: "Package"
};
function CV(e) {
  let t = true;
  return t = t && "type" in e, t = t && "codes" in e, t = t && "vm_type" in e, t = t && "code_hash_hex" in e, t = t && "code_hex" in e, t;
}
function xV(e) {
  return An(e);
}
function An(e, t) {
  return e == null ? e : {
    type: e.type,
    codes: nn(e.codes),
    vm_type: Re(e.vm_type),
    code_hash_hex: e.code_hash_hex,
    code_hex: e.code_hex,
    royalty_vault_balance: r(e, "royalty_vault_balance") ? e.royalty_vault_balance : void 0,
    blueprints: r(e, "blueprints") ? tn(e.blueprints) : void 0,
    schemas: r(e, "schemas") ? yr(e.schemas) : void 0,
    role_assignments: r(e, "role_assignments") ? R(e.role_assignments) : void 0,
    two_way_linked_dapp_address: r(e, "two_way_linked_dapp_address") ? e.two_way_linked_dapp_address : void 0
  };
}
function Dd(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      codes: an(e.codes),
      vm_type: e.vm_type,
      code_hash_hex: e.code_hash_hex,
      code_hex: e.code_hex,
      royalty_vault_balance: e.royalty_vault_balance,
      blueprints: rn(e.blueprints),
      schemas: Or(e.schemas),
      role_assignments: h(e.role_assignments),
      two_way_linked_dapp_address: e.two_way_linked_dapp_address
    };
}
function Ed(e) {
  return Cd(e);
}
function Cd(e, t) {
  if (e == null)
    return e;
  switch (e.type) {
    case "Component":
      return { ...On(e), type: "Component" };
    case "FungibleResource":
      return { ...Sn(e), type: "FungibleResource" };
    case "FungibleVault":
      return { ...Nn(e), type: "FungibleVault" };
    case "NonFungibleResource":
      return { ...bn(e), type: "NonFungibleResource" };
    case "NonFungibleVault":
      return { ...Fn(e), type: "NonFungibleVault" };
    case "Package":
      return { ...An(e), type: "Package" };
    default:
      throw new Error(`No variant of StateEntityDetailsResponseItemDetails exists with 'type=${e.type}'`);
  }
}
function xd(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    switch (e.type) {
      case "Component":
        return Jd(e);
      case "FungibleResource":
        return Id(e);
      case "FungibleVault":
        return Vd(e);
      case "NonFungibleResource":
        return wd(e);
      case "NonFungibleVault":
        return Pd(e);
      case "Package":
        return Dd(e);
      default:
        throw new Error(`No variant of StateEntityDetailsResponseItemDetails exists with 'type=${e.type}'`);
    }
  }
}
function qV(e) {
  let t = true;
  return t = t && "address" in e, t = t && "metadata" in e, t;
}
function Rn(e) {
  return qd(e);
}
function qd(e, t) {
  return e == null ? e : {
    address: e.address,
    fungible_resources: r(e, "fungible_resources") ? Eu(e.fungible_resources) : void 0,
    non_fungible_resources: r(e, "non_fungible_resources") ? Ps(e.non_fungible_resources) : void 0,
    ancestor_identities: r(e, "ancestor_identities") ? Sd(e.ancestor_identities) : void 0,
    metadata: b(e.metadata),
    explicit_metadata: r(e, "explicit_metadata") ? b(e.explicit_metadata) : void 0,
    details: r(e, "details") ? Ed(e.details) : void 0
  };
}
function hn(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      fungible_resources: xu(e.fungible_resources),
      non_fungible_resources: Es(e.non_fungible_resources),
      ancestor_identities: bd(e.ancestor_identities),
      metadata: F(e.metadata),
      explicit_metadata: F(e.explicit_metadata),
      details: xd(e.details)
    };
}
function MV(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t;
}
function Md(e) {
  return Ud(e);
}
function Ud(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    items: e.items.map(Rn)
  };
}
function UV(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      items: e.items.map(hn)
    };
}
function BV(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function KV(e) {
  return Bd(e);
}
function Bd(e, t) {
  return e == null ? e : {
    items: e.items.map(Rn)
  };
}
function LV(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(hn)
    };
}
var GV = {
  Component: "Component"
};
function HV(e) {
  let t = true;
  return t = t && "blueprint_name" in e, t = t && "blueprint_version" in e, t;
}
function zV(e) {
  return Kd(e);
}
function Kd(e, t) {
  return e == null ? e : {
    package_address: r(e, "package_address") ? e.package_address : void 0,
    blueprint_name: e.blueprint_name,
    blueprint_version: e.blueprint_version,
    state: r(e, "state") ? e.state : void 0,
    role_assignments: r(e, "role_assignments") ? R(e.role_assignments) : void 0,
    royalty_vault_balance: r(e, "royalty_vault_balance") ? e.royalty_vault_balance : void 0,
    royalty_config: r(e, "royalty_config") ? vt(e.royalty_config) : void 0,
    two_way_linked_dapp_address: r(e, "two_way_linked_dapp_address") ? e.two_way_linked_dapp_address : void 0,
    two_way_linked_dapp_details: r(e, "two_way_linked_dapp_details") ? gn(e.two_way_linked_dapp_details) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0,
    type: r(e, "type") ? e.type : void 0
  };
}
function WV(e) {
  if (e !== void 0)
    return e === null ? null : {
      package_address: e.package_address,
      blueprint_name: e.blueprint_name,
      blueprint_version: e.blueprint_version,
      state: e.state,
      role_assignments: h(e.role_assignments),
      royalty_vault_balance: e.royalty_vault_balance,
      royalty_config: Jt(e.royalty_config),
      two_way_linked_dapp_address: e.two_way_linked_dapp_address,
      two_way_linked_dapp_details: yn(e.two_way_linked_dapp_details),
      native_resource_details: D(e.native_resource_details),
      type: e.type
    };
}
var $V = {
  FungibleResource: "FungibleResource"
};
function XV(e) {
  let t = true;
  return t = t && "role_assignments" in e, t = t && "divisibility" in e, t = t && "total_supply" in e, t = t && "total_minted" in e, t = t && "total_burned" in e, t;
}
function ZV(e) {
  return Ld(e);
}
function Ld(e, t) {
  return e == null ? e : {
    role_assignments: R(e.role_assignments),
    divisibility: e.divisibility,
    total_supply: e.total_supply,
    total_minted: e.total_minted,
    total_burned: e.total_burned,
    two_way_linked_dapps: r(e, "two_way_linked_dapps") ? H(e.two_way_linked_dapps) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0,
    type: r(e, "type") ? e.type : void 0
  };
}
function QV(e) {
  if (e !== void 0)
    return e === null ? null : {
      role_assignments: h(e.role_assignments),
      divisibility: e.divisibility,
      total_supply: e.total_supply,
      total_minted: e.total_minted,
      total_burned: e.total_burned,
      two_way_linked_dapps: z(e.two_way_linked_dapps),
      native_resource_details: D(e.native_resource_details),
      type: e.type
    };
}
var YV = {
  FungibleVault: "FungibleVault"
};
function jV(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "balance" in e, t;
}
function ew(e) {
  return Gd(e);
}
function Gd(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    balance: B(e.balance),
    type: r(e, "type") ? e.type : void 0
  };
}
function tw(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      balance: K(e.balance),
      type: e.type
    };
}
var rw = {
  FungibleResource: "FungibleResource",
  NonFungibleResource: "NonFungibleResource",
  FungibleVault: "FungibleVault",
  NonFungibleVault: "NonFungibleVault",
  Package: "Package",
  Component: "Component"
};
function Hd(e) {
  return zd(e);
}
function zd(e, t) {
  return e;
}
function nw(e) {
  return e;
}
function iw(e) {
  let t = true;
  return t = t && "type" in e, t;
}
function aw(e) {
  return Wd(e);
}
function Wd(e, t) {
  return e == null ? e : {
    type: Hd(e.type)
  };
}
function ow(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type
    };
}
var uw = {
  NonFungibleResource: "NonFungibleResource"
};
function lw(e) {
  let t = true;
  return t = t && "role_assignments" in e, t = t && "non_fungible_id_type" in e, t = t && "total_supply" in e, t = t && "total_minted" in e, t = t && "total_burned" in e, t = t && "non_fungible_data_mutable_fields" in e, t;
}
function sw(e) {
  return $d(e);
}
function $d(e, t) {
  return e == null ? e : {
    role_assignments: R(e.role_assignments),
    non_fungible_id_type: ne(e.non_fungible_id_type),
    total_supply: e.total_supply,
    total_minted: e.total_minted,
    total_burned: e.total_burned,
    non_fungible_data_mutable_fields: e.non_fungible_data_mutable_fields,
    two_way_linked_dapps: r(e, "two_way_linked_dapps") ? H(e.two_way_linked_dapps) : void 0,
    native_resource_details: r(e, "native_resource_details") ? P(e.native_resource_details) : void 0,
    type: r(e, "type") ? e.type : void 0
  };
}
function cw(e) {
  if (e !== void 0)
    return e === null ? null : {
      role_assignments: h(e.role_assignments),
      non_fungible_id_type: e.non_fungible_id_type,
      total_supply: e.total_supply,
      total_minted: e.total_minted,
      total_burned: e.total_burned,
      non_fungible_data_mutable_fields: e.non_fungible_data_mutable_fields,
      two_way_linked_dapps: z(e.two_way_linked_dapps),
      native_resource_details: D(e.native_resource_details),
      type: e.type
    };
}
var dw = {
  NonFungibleVault: "NonFungibleVault"
};
function _w(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "balance" in e, t;
}
function fw(e) {
  return Xd(e);
}
function Xd(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    balance: L(e.balance),
    type: r(e, "type") ? e.type : void 0
  };
}
function mw(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      balance: G(e.balance),
      type: e.type
    };
}
var pw = {
  Package: "Package"
};
function gw(e) {
  let t = true;
  return t = t && "codes" in e, t = t && "vm_type" in e, t = t && "code_hash_hex" in e, t = t && "code_hex" in e, t;
}
function yw(e) {
  return Zd(e);
}
function Zd(e, t) {
  return e == null ? e : {
    codes: nn(e.codes),
    vm_type: Re(e.vm_type),
    code_hash_hex: e.code_hash_hex,
    code_hex: e.code_hex,
    royalty_vault_balance: r(e, "royalty_vault_balance") ? e.royalty_vault_balance : void 0,
    blueprints: r(e, "blueprints") ? tn(e.blueprints) : void 0,
    schemas: r(e, "schemas") ? yr(e.schemas) : void 0,
    role_assignments: r(e, "role_assignments") ? R(e.role_assignments) : void 0,
    two_way_linked_dapp_address: r(e, "two_way_linked_dapp_address") ? e.two_way_linked_dapp_address : void 0,
    type: r(e, "type") ? e.type : void 0
  };
}
function Ow(e) {
  if (e !== void 0)
    return e === null ? null : {
      codes: an(e.codes),
      vm_type: e.vm_type,
      code_hash_hex: e.code_hash_hex,
      code_hex: e.code_hex,
      royalty_vault_balance: e.royalty_vault_balance,
      blueprints: rn(e.blueprints),
      schemas: Or(e.schemas),
      role_assignments: h(e.role_assignments),
      two_way_linked_dapp_address: e.two_way_linked_dapp_address,
      type: e.type
    };
}
function Sw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "resource_address" in e, t;
}
function Nw(e) {
  return Qd(e);
}
function Qd(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address,
    resource_address: e.resource_address
  };
}
function Yd(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address,
      resource_address: e.resource_address
    };
}
function bw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "resource_address" in e, t;
}
function Fw(e) {
  return jd(e);
}
function jd(e, t) {
  return e == null ? e : {
    address: e.address,
    resource_address: e.resource_address
  };
}
function Aw(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      resource_address: e.resource_address
    };
}
function Rw(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t = t && "resource_address" in e, t;
}
function e_(e) {
  return t_(e);
}
function t_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(B),
    address: e.address,
    resource_address: e.resource_address
  };
}
function hw(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(K),
      address: e.address,
      resource_address: e.resource_address
    };
}
function kw(e) {
  return true;
}
function kn(e) {
  return r_(e);
}
function r_(e, t) {
  return e == null ? e : {
    explicit_metadata: r(e, "explicit_metadata") ? e.explicit_metadata : void 0
  };
}
function Tn(e) {
  if (e !== void 0)
    return e === null ? null : {
      explicit_metadata: e.explicit_metadata
    };
}
function Tw(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function vw(e) {
  return n_(e);
}
function n_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0,
    opt_ins: r(e, "opt_ins") ? kn(e.opt_ins) : void 0
  };
}
function i_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address,
      aggregation_level: e.aggregation_level,
      opt_ins: Tn(e.opt_ins)
    };
}
function Jw(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function Iw(e) {
  return a_(e);
}
function a_(e, t) {
  return e == null ? e : {
    address: e.address,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0,
    opt_ins: r(e, "opt_ins") ? kn(e.opt_ins) : void 0
  };
}
function Vw(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      aggregation_level: e.aggregation_level,
      opt_ins: Tn(e.opt_ins)
    };
}
function ww(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t;
}
function o_(e) {
  return u_(e);
}
function u_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Oe),
    address: e.address
  };
}
function Pw(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Se),
      address: e.address
    };
}
function Dw(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function Ew(e) {
  return l_(e);
}
function l_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address
  };
}
function s_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address
    };
}
function Cw(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function xw(e) {
  return c_(e);
}
function c_(e, t) {
  return e == null ? e : {
    address: e.address
  };
}
function qw(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address
    };
}
function Mw(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t;
}
function d_(e) {
  return __(e);
}
function __(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(me),
    address: e.address
  };
}
function Uw(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(pe),
      address: e.address
    };
}
function Bw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "vault_address" in e, t = t && "resource_address" in e, t;
}
function Kw(e) {
  return f_(e);
}
function f_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address,
    vault_address: e.vault_address,
    resource_address: e.resource_address
  };
}
function m_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address,
      vault_address: e.vault_address,
      resource_address: e.resource_address
    };
}
function Lw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "vault_address" in e, t = t && "resource_address" in e, t;
}
function Gw(e) {
  return p_(e);
}
function p_(e, t) {
  return e == null ? e : {
    address: e.address,
    vault_address: e.vault_address,
    resource_address: e.resource_address
  };
}
function Hw(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      vault_address: e.vault_address,
      resource_address: e.resource_address
    };
}
function zw(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t = t && "resource_address" in e, t;
}
function g_(e) {
  return y_(e);
}
function y_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items,
    address: e.address,
    resource_address: e.resource_address
  };
}
function Ww(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items,
      address: e.address,
      resource_address: e.resource_address
    };
}
function $w(e) {
  return true;
}
function vn(e) {
  return O_(e);
}
function O_(e, t) {
  return e == null ? e : {
    non_fungible_include_nfids: r(e, "non_fungible_include_nfids") ? e.non_fungible_include_nfids : void 0
  };
}
function Jn(e) {
  if (e !== void 0)
    return e === null ? null : {
      non_fungible_include_nfids: e.non_fungible_include_nfids
    };
}
function Xw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "resource_address" in e, t;
}
function Zw(e) {
  return S_(e);
}
function S_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address,
    resource_address: e.resource_address,
    opt_ins: r(e, "opt_ins") ? vn(e.opt_ins) : void 0
  };
}
function N_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address,
      resource_address: e.resource_address,
      opt_ins: Jn(e.opt_ins)
    };
}
function Qw(e) {
  let t = true;
  return t = t && "address" in e, t = t && "resource_address" in e, t;
}
function Yw(e) {
  return b_(e);
}
function b_(e, t) {
  return e == null ? e : {
    address: e.address,
    resource_address: e.resource_address,
    opt_ins: r(e, "opt_ins") ? vn(e.opt_ins) : void 0
  };
}
function jw(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      resource_address: e.resource_address,
      opt_ins: Jn(e.opt_ins)
    };
}
function eP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t = t && "resource_address" in e, t;
}
function F_(e) {
  return A_(e);
}
function A_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(L),
    address: e.address,
    resource_address: e.resource_address
  };
}
function tP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(G),
      address: e.address,
      resource_address: e.resource_address
    };
}
function rP(e) {
  return true;
}
function In(e) {
  return R_(e);
}
function R_(e, t) {
  return e == null ? e : {
    non_fungible_include_nfids: r(e, "non_fungible_include_nfids") ? e.non_fungible_include_nfids : void 0,
    explicit_metadata: r(e, "explicit_metadata") ? e.explicit_metadata : void 0
  };
}
function Vn(e) {
  if (e !== void 0)
    return e === null ? null : {
      non_fungible_include_nfids: e.non_fungible_include_nfids,
      explicit_metadata: e.explicit_metadata
    };
}
function nP(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function iP(e) {
  return h_(e);
}
function h_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0,
    opt_ins: r(e, "opt_ins") ? In(e.opt_ins) : void 0
  };
}
function k_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address,
      aggregation_level: e.aggregation_level,
      opt_ins: Vn(e.opt_ins)
    };
}
function aP(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function oP(e) {
  return T_(e);
}
function T_(e, t) {
  return e == null ? e : {
    address: e.address,
    aggregation_level: r(e, "aggregation_level") ? k(e.aggregation_level) : void 0,
    opt_ins: r(e, "opt_ins") ? In(e.opt_ins) : void 0
  };
}
function uP(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      aggregation_level: e.aggregation_level,
      opt_ins: Vn(e.opt_ins)
    };
}
function lP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t;
}
function v_(e) {
  return J_(e);
}
function J_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Ne),
    address: e.address
  };
}
function sP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(be),
      address: e.address
    };
}
function cP(e) {
  let t = true;
  return t = t && "address" in e, t;
}
function dP(e) {
  return I_(e);
}
function I_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    address: e.address
  };
}
function V_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      address: e.address
    };
}
function _P(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "address" in e, t;
}
function w_(e) {
  return P_(e);
}
function P_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(ge),
    address: e.address
  };
}
function fP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ye),
      address: e.address
    };
}
function mP(e) {
  return true;
}
function wn(e) {
  return D_(e);
}
function D_(e, t) {
  return e == null ? e : {
    key_hex: r(e, "key_hex") ? e.key_hex : void 0,
    key_json: r(e, "key_json") ? g(e.key_json) : void 0
  };
}
function Pn(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_hex: e.key_hex,
      key_json: y(e.key_json)
    };
}
function pP(e) {
  let t = true;
  return t = t && "key_value_store_address" in e, t = t && "keys" in e, t;
}
function gP(e) {
  return E_(e);
}
function E_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    key_value_store_address: e.key_value_store_address,
    keys: e.keys.map(wn)
  };
}
function C_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      key_value_store_address: e.key_value_store_address,
      keys: e.keys.map(Pn)
    };
}
function yP(e) {
  let t = true;
  return t = t && "key_value_store_address" in e, t = t && "keys" in e, t;
}
function OP(e) {
  return x_(e);
}
function x_(e, t) {
  return e == null ? e : {
    key_value_store_address: e.key_value_store_address,
    keys: e.keys.map(wn)
  };
}
function SP(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_value_store_address: e.key_value_store_address,
      keys: e.keys.map(Pn)
    };
}
function NP(e) {
  let t = true;
  return t = t && "key" in e, t = t && "value" in e, t = t && "last_updated_at_state_version" in e, t = t && "is_locked" in e, t;
}
function Dn(e) {
  return q_(e);
}
function q_(e, t) {
  return e == null ? e : {
    key: Q(e.key),
    value: Q(e.value),
    last_updated_at_state_version: e.last_updated_at_state_version,
    is_locked: e.is_locked
  };
}
function En(e) {
  if (e !== void 0)
    return e === null ? null : {
      key: Y(e.key),
      value: Y(e.value),
      last_updated_at_state_version: e.last_updated_at_state_version,
      is_locked: e.is_locked
    };
}
function bP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "key_value_store_address" in e, t = t && "entries" in e, t;
}
function M_(e) {
  return U_(e);
}
function U_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    key_value_store_address: e.key_value_store_address,
    entries: e.entries.map(Dn)
  };
}
function FP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      key_value_store_address: e.key_value_store_address,
      entries: e.entries.map(En)
    };
}
function AP(e) {
  let t = true;
  return t = t && "key_value_store_address" in e, t = t && "entries" in e, t;
}
function RP(e) {
  return B_(e);
}
function B_(e, t) {
  return e == null ? e : {
    key_value_store_address: e.key_value_store_address,
    entries: e.entries.map(Dn)
  };
}
function hP(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_value_store_address: e.key_value_store_address,
      entries: e.entries.map(En)
    };
}
function kP(e) {
  let t = true;
  return t = t && "key" in e, t = t && "last_updated_at_state_version" in e, t;
}
function Je(e) {
  return K_(e);
}
function K_(e, t) {
  return e == null ? e : {
    key: Q(e.key),
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function Ie(e) {
  if (e !== void 0)
    return e === null ? null : {
      key: Y(e.key),
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function TP(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function vP(e) {
  return L_(e);
}
function L_(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Je)
  };
}
function JP(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Ie)
    };
}
function IP(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function VP(e) {
  return G_(e);
}
function G_(e, t) {
  return e == null ? e : {
    items: e.items.map(Je)
  };
}
function wP(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(Ie)
    };
}
function PP(e) {
  let t = true;
  return t = t && "key_value_store_address" in e, t;
}
function DP(e) {
  return H_(e);
}
function H_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    key_value_store_address: e.key_value_store_address
  };
}
function z_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      key_value_store_address: e.key_value_store_address
    };
}
function EP(e) {
  let t = true;
  return t = t && "key_value_store_address" in e, t;
}
function CP(e) {
  return W_(e);
}
function W_(e, t) {
  return e == null ? e : {
    key_value_store_address: e.key_value_store_address
  };
}
function xP(e) {
  if (e !== void 0)
    return e === null ? null : {
      key_value_store_address: e.key_value_store_address
    };
}
function qP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "key_value_store_address" in e, t;
}
function $_(e) {
  return X_(e);
}
function X_(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Je),
    key_value_store_address: e.key_value_store_address
  };
}
function MP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Ie),
      key_value_store_address: e.key_value_store_address
    };
}
function UP(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function BP(e) {
  return Z_(e);
}
function Z_(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    resource_address: e.resource_address,
    non_fungible_ids: e.non_fungible_ids
  };
}
function Q_(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      resource_address: e.resource_address,
      non_fungible_ids: e.non_fungible_ids
    };
}
function KP(e) {
  let t = true;
  return t = t && "is_burned" in e, t = t && "non_fungible_id" in e, t = t && "last_updated_at_state_version" in e, t;
}
function Cn(e) {
  return Y_(e);
}
function Y_(e, t) {
  return e == null ? e : {
    is_burned: e.is_burned,
    non_fungible_id: e.non_fungible_id,
    data: r(e, "data") ? Q(e.data) : void 0,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function xn(e) {
  if (e !== void 0)
    return e === null ? null : {
      is_burned: e.is_burned,
      non_fungible_id: e.non_fungible_id,
      data: Y(e.data),
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function LP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "resource_address" in e, t = t && "non_fungible_id_type" in e, t = t && "non_fungible_ids" in e, t;
}
function j_(e) {
  return ef(e);
}
function ef(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    resource_address: e.resource_address,
    non_fungible_id_type: ne(e.non_fungible_id_type),
    non_fungible_ids: e.non_fungible_ids.map(Cn)
  };
}
function GP(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      resource_address: e.resource_address,
      non_fungible_id_type: e.non_fungible_id_type,
      non_fungible_ids: e.non_fungible_ids.map(xn)
    };
}
function HP(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_id_type" in e, t = t && "non_fungible_ids" in e, t;
}
function zP(e) {
  return tf(e);
}
function tf(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_id_type: ne(e.non_fungible_id_type),
    non_fungible_ids: e.non_fungible_ids.map(Cn)
  };
}
function WP(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_id_type: e.non_fungible_id_type,
      non_fungible_ids: e.non_fungible_ids.map(xn)
    };
}
function $P(e) {
  let t = true;
  return t = t && "resource_address" in e, t;
}
function XP(e) {
  return rf(e);
}
function rf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    resource_address: e.resource_address
  };
}
function nf(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      resource_address: e.resource_address
    };
}
function ZP(e) {
  let t = true;
  return t = t && "resource_address" in e, t;
}
function QP(e) {
  return af(e);
}
function af(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address
  };
}
function YP(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address
    };
}
function jP(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function of(e) {
  return uf(e);
}
function uf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    resource_address: e.resource_address,
    non_fungible_ids: Xr(e.non_fungible_ids)
  };
}
function eD(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      resource_address: e.resource_address,
      non_fungible_ids: Zr(e.non_fungible_ids)
    };
}
function tD(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function rD(e) {
  return lf(e);
}
function lf(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_ids: Xr(e.non_fungible_ids)
  };
}
function nD(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_ids: Zr(e.non_fungible_ids)
    };
}
function iD(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function aD(e) {
  return sf(e);
}
function sf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    resource_address: e.resource_address,
    non_fungible_ids: e.non_fungible_ids
  };
}
function cf(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      resource_address: e.resource_address,
      non_fungible_ids: e.non_fungible_ids
    };
}
function oD(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function uD(e) {
  return df(e);
}
function df(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_ids: e.non_fungible_ids
  };
}
function lD(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_ids: e.non_fungible_ids
    };
}
function sD(e) {
  let t = true;
  return t = t && "non_fungible_id" in e, t = t && "is_burned" in e, t = t && "last_updated_at_state_version" in e, t;
}
function qn(e) {
  return _f(e);
}
function _f(e, t) {
  return e == null ? e : {
    non_fungible_id: e.non_fungible_id,
    owning_vault_address: r(e, "owning_vault_address") ? e.owning_vault_address : void 0,
    owning_vault_parent_ancestor_address: r(e, "owning_vault_parent_ancestor_address") ? e.owning_vault_parent_ancestor_address : void 0,
    owning_vault_global_ancestor_address: r(e, "owning_vault_global_ancestor_address") ? e.owning_vault_global_ancestor_address : void 0,
    is_burned: e.is_burned,
    last_updated_at_state_version: e.last_updated_at_state_version
  };
}
function Mn(e) {
  if (e !== void 0)
    return e === null ? null : {
      non_fungible_id: e.non_fungible_id,
      owning_vault_address: e.owning_vault_address,
      owning_vault_parent_ancestor_address: e.owning_vault_parent_ancestor_address,
      owning_vault_global_ancestor_address: e.owning_vault_global_ancestor_address,
      is_burned: e.is_burned,
      last_updated_at_state_version: e.last_updated_at_state_version
    };
}
function cD(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function ff(e) {
  return mf(e);
}
function mf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    resource_address: e.resource_address,
    non_fungible_ids: e.non_fungible_ids.map(qn)
  };
}
function dD(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      resource_address: e.resource_address,
      non_fungible_ids: e.non_fungible_ids.map(Mn)
    };
}
function _D(e) {
  let t = true;
  return t = t && "resource_address" in e, t = t && "non_fungible_ids" in e, t;
}
function fD(e) {
  return pf(e);
}
function pf(e, t) {
  return e == null ? e : {
    resource_address: e.resource_address,
    non_fungible_ids: e.non_fungible_ids.map(qn)
  };
}
function mD(e) {
  if (e !== void 0)
    return e === null ? null : {
      resource_address: e.resource_address,
      non_fungible_ids: e.non_fungible_ids.map(Mn)
    };
}
function pD(e) {
  let t = true;
  return t = t && "package_address" in e, t;
}
function gD(e) {
  return gf(e);
}
function gf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    package_address: e.package_address
  };
}
function yf(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      package_address: e.package_address
    };
}
function yD(e) {
  let t = true;
  return t = t && "package_address" in e, t;
}
function OD(e) {
  return Of(e);
}
function Of(e, t) {
  return e == null ? e : {
    package_address: e.package_address
  };
}
function SD(e) {
  if (e !== void 0)
    return e === null ? null : {
      package_address: e.package_address
    };
}
function ND(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "package_address" in e, t;
}
function Sf(e) {
  return Nf(e);
}
function Nf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Fe),
    package_address: e.package_address
  };
}
function bD(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Ae),
      package_address: e.package_address
    };
}
function FD(e) {
  let t = true;
  return t = t && "package_address" in e, t;
}
function AD(e) {
  return bf(e);
}
function bf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    package_address: e.package_address
  };
}
function Ff(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      package_address: e.package_address
    };
}
function RD(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t = t && "package_address" in e, t;
}
function Af(e) {
  return Rf(e);
}
function Rf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(he),
    package_address: e.package_address
  };
}
function hD(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ke),
      package_address: e.package_address
    };
}
function kD(e) {
  return true;
}
function TD(e) {
  return hf(e);
}
function hf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0
  };
}
function kf(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      cursor: e.cursor
    };
}
function vD(e) {
  return true;
}
function JD(e) {
  return Tf(e);
}
function Tf(e, t) {
  return e == null ? e : {
    cursor: r(e, "cursor") ? e.cursor : void 0
  };
}
function ID(e) {
  if (e !== void 0)
    return e === null ? null : {
      cursor: e.cursor
    };
}
function VD(e) {
  let t = true;
  return t = t && "stake" in e, t = t && "stake_percentage" in e, t = t && "key" in e, t;
}
function vf(e) {
  return Jf(e);
}
function Jf(e, t) {
  return e == null ? e : {
    stake: e.stake,
    stake_percentage: e.stake_percentage,
    key: J(e.key)
  };
}
function If(e) {
  if (e !== void 0)
    return e === null ? null : {
      stake: e.stake,
      stake_percentage: e.stake_percentage,
      key: I(e.key)
    };
}
function wD(e) {
  let t = true;
  return t = t && "fee_factor" in e, t;
}
function Vf(e) {
  return wf(e);
}
function wf(e, t) {
  return e == null ? e : {
    fee_factor: e.fee_factor
  };
}
function Pf(e) {
  if (e !== void 0)
    return e === null ? null : {
      fee_factor: e.fee_factor
    };
}
function PD(e) {
  let t = true;
  return t = t && "fee_factor" in e, t = t && "effective_at_epoch" in e, t;
}
function Df(e) {
  return Ef(e);
}
function Ef(e, t) {
  return e == null ? e : {
    fee_factor: e.fee_factor,
    effective_at_epoch: e.effective_at_epoch
  };
}
function Cf(e) {
  if (e !== void 0)
    return e === null ? null : {
      fee_factor: e.fee_factor,
      effective_at_epoch: e.effective_at_epoch
    };
}
function DD(e) {
  let t = true;
  return t = t && "current" in e, t;
}
function xf(e) {
  return qf(e);
}
function qf(e, t) {
  return e == null ? e : {
    current: Vf(e.current),
    pending: r(e, "pending") ? Df(e.pending) : void 0
  };
}
function Mf(e) {
  if (e !== void 0)
    return e === null ? null : {
      current: Pf(e.current),
      pending: Cf(e.pending)
    };
}
function ED(e) {
  let t = true;
  return t = t && "balance" in e, t = t && "last_changed_at_state_version" in e, t = t && "address" in e, t;
}
function W(e) {
  return Uf(e);
}
function Uf(e, t) {
  return e == null ? e : {
    balance: e.balance,
    last_changed_at_state_version: e.last_changed_at_state_version,
    address: e.address
  };
}
function $(e) {
  if (e !== void 0)
    return e === null ? null : {
      balance: e.balance,
      last_changed_at_state_version: e.last_changed_at_state_version,
      address: e.address
    };
}
function CD(e) {
  let t = true;
  return t = t && "address" in e, t = t && "stake_vault" in e, t = t && "pending_xrd_withdraw_vault" in e, t = t && "locked_owner_stake_unit_vault" in e, t = t && "pending_owner_stake_unit_unlock_vault" in e, t = t && "state" in e, t = t && "metadata" in e, t = t && "effective_fee_factor" in e, t;
}
function Un(e) {
  return Bf(e);
}
function Bf(e, t) {
  return e == null ? e : {
    address: e.address,
    stake_vault: W(e.stake_vault),
    pending_xrd_withdraw_vault: W(e.pending_xrd_withdraw_vault),
    locked_owner_stake_unit_vault: W(e.locked_owner_stake_unit_vault),
    pending_owner_stake_unit_unlock_vault: W(e.pending_owner_stake_unit_unlock_vault),
    state: e.state,
    active_in_epoch: r(e, "active_in_epoch") ? vf(e.active_in_epoch) : void 0,
    metadata: b(e.metadata),
    effective_fee_factor: xf(e.effective_fee_factor)
  };
}
function Bn(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      stake_vault: $(e.stake_vault),
      pending_xrd_withdraw_vault: $(e.pending_xrd_withdraw_vault),
      locked_owner_stake_unit_vault: $(e.locked_owner_stake_unit_vault),
      pending_owner_stake_unit_unlock_vault: $(e.pending_owner_stake_unit_unlock_vault),
      state: e.state,
      active_in_epoch: If(e.active_in_epoch),
      metadata: F(e.metadata),
      effective_fee_factor: Mf(e.effective_fee_factor)
    };
}
function xD(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Kn(e) {
  return Kf(e);
}
function Kf(e, t) {
  return e == null ? e : {
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(Un)
  };
}
function Ln(e) {
  if (e !== void 0)
    return e === null ? null : {
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(Bn)
    };
}
function qD(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "validators" in e, t;
}
function Lf(e) {
  return Gf(e);
}
function Gf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    validators: Kn(e.validators)
  };
}
function MD(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      validators: Ln(e.validators)
    };
}
function UD(e) {
  let t = true;
  return t = t && "validators" in e, t;
}
function BD(e) {
  return Hf(e);
}
function Hf(e, t) {
  return e == null ? e : {
    validators: Kn(e.validators)
  };
}
function KD(e) {
  if (e !== void 0)
    return e === null ? null : {
      validators: Ln(e.validators)
    };
}
function LD(e) {
  let t = true;
  return t = t && "_class" in e, t;
}
function Gn(e) {
  return zf(e);
}
function zf(e, t) {
  return e == null ? e : {
    _class: nt(e.class),
    match_only_most_specific: r(e, "match_only_most_specific") ? e.match_only_most_specific : void 0
  };
}
function Hn(e) {
  if (e !== void 0)
    return e === null ? null : {
      class: e._class,
      match_only_most_specific: e.match_only_most_specific
    };
}
var GD = {
  Deposit: "Deposit",
  Withdrawal: "Withdrawal"
};
function HD(e) {
  let t = true;
  return t = t && "event" in e, t;
}
function zn(e) {
  return Wf(e);
}
function Wf(e, t) {
  return e == null ? e : {
    event: e.event,
    emitter_address: r(e, "emitter_address") ? e.emitter_address : void 0,
    resource_address: r(e, "resource_address") ? e.resource_address : void 0
  };
}
function Wn(e) {
  if (e !== void 0)
    return e === null ? null : {
      event: e.event,
      emitter_address: e.emitter_address,
      resource_address: e.resource_address
    };
}
function zD(e) {
  return true;
}
function ie(e) {
  return $f(e);
}
function $f(e, t) {
  return e == null ? e : {
    raw_hex: r(e, "raw_hex") ? e.raw_hex : void 0,
    receipt_state_changes: r(e, "receipt_state_changes") ? e.receipt_state_changes : void 0,
    receipt_fee_summary: r(e, "receipt_fee_summary") ? e.receipt_fee_summary : void 0,
    receipt_fee_source: r(e, "receipt_fee_source") ? e.receipt_fee_source : void 0,
    receipt_fee_destination: r(e, "receipt_fee_destination") ? e.receipt_fee_destination : void 0,
    receipt_costing_parameters: r(e, "receipt_costing_parameters") ? e.receipt_costing_parameters : void 0,
    receipt_events: r(e, "receipt_events") ? e.receipt_events : void 0,
    receipt_output: r(e, "receipt_output") ? e.receipt_output : void 0,
    affected_global_entities: r(e, "affected_global_entities") ? e.affected_global_entities : void 0,
    manifest_instructions: r(e, "manifest_instructions") ? e.manifest_instructions : void 0,
    balance_changes: r(e, "balance_changes") ? e.balance_changes : void 0
  };
}
function ae(e) {
  if (e !== void 0)
    return e === null ? null : {
      raw_hex: e.raw_hex,
      receipt_state_changes: e.receipt_state_changes,
      receipt_fee_summary: e.receipt_fee_summary,
      receipt_fee_source: e.receipt_fee_source,
      receipt_fee_destination: e.receipt_fee_destination,
      receipt_costing_parameters: e.receipt_costing_parameters,
      receipt_events: e.receipt_events,
      receipt_output: e.receipt_output,
      affected_global_entities: e.affected_global_entities,
      manifest_instructions: e.manifest_instructions,
      balance_changes: e.balance_changes
    };
}
var WD = {
  User: "User",
  EpochChange: "EpochChange",
  All: "All"
};
var $D = {
  Asc: "Asc",
  Desc: "Desc"
};
function XD(e) {
  return true;
}
function ZD(e) {
  return Xf(e);
}
function Xf(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    from_ledger_state: r(e, "from_ledger_state") ? f(e.from_ledger_state) : void 0,
    cursor: r(e, "cursor") ? e.cursor : void 0,
    limit_per_page: r(e, "limit_per_page") ? e.limit_per_page : void 0,
    kind_filter: r(e, "kind_filter") ? e.kind_filter : void 0,
    manifest_accounts_withdrawn_from_filter: r(e, "manifest_accounts_withdrawn_from_filter") ? e.manifest_accounts_withdrawn_from_filter : void 0,
    manifest_accounts_deposited_into_filter: r(e, "manifest_accounts_deposited_into_filter") ? e.manifest_accounts_deposited_into_filter : void 0,
    manifest_badges_presented_filter: r(e, "manifest_badges_presented_filter") ? e.manifest_badges_presented_filter : void 0,
    manifest_resources_filter: r(e, "manifest_resources_filter") ? e.manifest_resources_filter : void 0,
    affected_global_entities_filter: r(e, "affected_global_entities_filter") ? e.affected_global_entities_filter : void 0,
    events_filter: r(e, "events_filter") ? e.events_filter.map(zn) : void 0,
    accounts_with_manifest_owner_method_calls: r(e, "accounts_with_manifest_owner_method_calls") ? e.accounts_with_manifest_owner_method_calls : void 0,
    accounts_without_manifest_owner_method_calls: r(e, "accounts_without_manifest_owner_method_calls") ? e.accounts_without_manifest_owner_method_calls : void 0,
    manifest_class_filter: r(e, "manifest_class_filter") ? Gn(e.manifest_class_filter) : void 0,
    event_global_emitters_filter: r(e, "event_global_emitters_filter") ? e.event_global_emitters_filter : void 0,
    order: r(e, "order") ? e.order : void 0,
    opt_ins: r(e, "opt_ins") ? ie(e.opt_ins) : void 0
  };
}
function Zf(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      from_ledger_state: m(e.from_ledger_state),
      cursor: e.cursor,
      limit_per_page: e.limit_per_page,
      kind_filter: e.kind_filter,
      manifest_accounts_withdrawn_from_filter: e.manifest_accounts_withdrawn_from_filter,
      manifest_accounts_deposited_into_filter: e.manifest_accounts_deposited_into_filter,
      manifest_badges_presented_filter: e.manifest_badges_presented_filter,
      manifest_resources_filter: e.manifest_resources_filter,
      affected_global_entities_filter: e.affected_global_entities_filter,
      events_filter: e.events_filter === void 0 ? void 0 : e.events_filter.map(Wn),
      accounts_with_manifest_owner_method_calls: e.accounts_with_manifest_owner_method_calls,
      accounts_without_manifest_owner_method_calls: e.accounts_without_manifest_owner_method_calls,
      manifest_class_filter: Hn(e.manifest_class_filter),
      event_global_emitters_filter: e.event_global_emitters_filter,
      order: e.order,
      opt_ins: ae(e.opt_ins)
    };
}
var QD = {
  User: "User",
  EpochChange: "EpochChange",
  All: "All"
};
var YD = {
  Asc: "Asc",
  Desc: "Desc"
};
function jD(e) {
  return true;
}
function eE(e) {
  return Qf(e);
}
function Qf(e, t) {
  return e == null ? e : {
    kind_filter: r(e, "kind_filter") ? e.kind_filter : void 0,
    manifest_accounts_withdrawn_from_filter: r(e, "manifest_accounts_withdrawn_from_filter") ? e.manifest_accounts_withdrawn_from_filter : void 0,
    manifest_accounts_deposited_into_filter: r(e, "manifest_accounts_deposited_into_filter") ? e.manifest_accounts_deposited_into_filter : void 0,
    manifest_badges_presented_filter: r(e, "manifest_badges_presented_filter") ? e.manifest_badges_presented_filter : void 0,
    manifest_resources_filter: r(e, "manifest_resources_filter") ? e.manifest_resources_filter : void 0,
    affected_global_entities_filter: r(e, "affected_global_entities_filter") ? e.affected_global_entities_filter : void 0,
    events_filter: r(e, "events_filter") ? e.events_filter.map(zn) : void 0,
    accounts_with_manifest_owner_method_calls: r(e, "accounts_with_manifest_owner_method_calls") ? e.accounts_with_manifest_owner_method_calls : void 0,
    accounts_without_manifest_owner_method_calls: r(e, "accounts_without_manifest_owner_method_calls") ? e.accounts_without_manifest_owner_method_calls : void 0,
    manifest_class_filter: r(e, "manifest_class_filter") ? Gn(e.manifest_class_filter) : void 0,
    event_global_emitters_filter: r(e, "event_global_emitters_filter") ? e.event_global_emitters_filter : void 0,
    order: r(e, "order") ? e.order : void 0,
    opt_ins: r(e, "opt_ins") ? ie(e.opt_ins) : void 0
  };
}
function tE(e) {
  if (e !== void 0)
    return e === null ? null : {
      kind_filter: e.kind_filter,
      manifest_accounts_withdrawn_from_filter: e.manifest_accounts_withdrawn_from_filter,
      manifest_accounts_deposited_into_filter: e.manifest_accounts_deposited_into_filter,
      manifest_badges_presented_filter: e.manifest_badges_presented_filter,
      manifest_resources_filter: e.manifest_resources_filter,
      affected_global_entities_filter: e.affected_global_entities_filter,
      events_filter: e.events_filter === void 0 ? void 0 : e.events_filter.map(Wn),
      accounts_with_manifest_owner_method_calls: e.accounts_with_manifest_owner_method_calls,
      accounts_without_manifest_owner_method_calls: e.accounts_without_manifest_owner_method_calls,
      manifest_class_filter: Hn(e.manifest_class_filter),
      event_global_emitters_filter: e.event_global_emitters_filter,
      order: e.order,
      opt_ins: ae(e.opt_ins)
    };
}
function rE(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "items" in e, t;
}
function Yf(e) {
  return jf(e);
}
function jf(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    total_count: r(e, "total_count") ? e.total_count : void 0,
    next_cursor: r(e, "next_cursor") ? e.next_cursor : void 0,
    items: e.items.map(j)
  };
}
function nE(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      total_count: e.total_count,
      next_cursor: e.next_cursor,
      items: e.items.map(ee)
    };
}
function iE(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function aE(e) {
  return em(e);
}
function em(e, t) {
  return e == null ? e : {
    items: e.items.map(j)
  };
}
function oE(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(ee)
    };
}
function uE(e) {
  let t = true;
  return t = t && "badge_type" in e, t = t && "resource_address" in e, t;
}
function lE(e) {
  return tm(e);
}
function tm(e, t) {
  return e == null ? e : {
    badge_type: qe(e.badge_type),
    resource_address: e.resource_address
  };
}
function sE(e) {
  if (e !== void 0)
    return e === null ? null : {
      badge_type: e.badge_type,
      resource_address: e.resource_address
    };
}
function cE(e) {
  let t = true;
  return t = t && "intent_hash" in e, t;
}
function dE(e) {
  return rm(e);
}
function rm(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    intent_hash: e.intent_hash,
    opt_ins: r(e, "opt_ins") ? ie(e.opt_ins) : void 0
  };
}
function nm(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      intent_hash: e.intent_hash,
      opt_ins: ae(e.opt_ins)
    };
}
function _E(e) {
  let t = true;
  return t = t && "intent_hash" in e, t;
}
function fE(e) {
  return im(e);
}
function im(e, t) {
  return e == null ? e : {
    intent_hash: e.intent_hash,
    opt_ins: r(e, "opt_ins") ? ie(e.opt_ins) : void 0
  };
}
function mE(e) {
  if (e !== void 0)
    return e === null ? null : {
      intent_hash: e.intent_hash,
      opt_ins: ae(e.opt_ins)
    };
}
function pE(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "transaction" in e, t;
}
function am(e) {
  return om(e);
}
function om(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    transaction: j(e.transaction)
  };
}
function gE(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      transaction: ee(e.transaction)
    };
}
function yE(e) {
  let t = true;
  return t = t && "transaction" in e, t;
}
function OE(e) {
  return um(e);
}
function um(e, t) {
  return e == null ? e : {
    transaction: j(e.transaction)
  };
}
function SE(e) {
  if (e !== void 0)
    return e === null ? null : {
      transaction: ee(e.transaction)
    };
}
function NE(e) {
  let t = true;
  return t = t && "ledger_state" in e, t;
}
function lm(e) {
  return sm(e);
}
function sm(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state)
  };
}
function bE(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state)
    };
}
var FE = {
  Unknown: "Unknown",
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  CommitPendingOutcomeUnknown: "CommitPendingOutcomeUnknown",
  PermanentlyRejected: "PermanentlyRejected",
  LikelyButNotCertainRejection: "LikelyButNotCertainRejection",
  Pending: "Pending"
};
function $n(e) {
  return cm(e);
}
function cm(e, t) {
  return e;
}
function AE(e) {
  return e;
}
var RE = {
  TransactionNotFoundError: "TransactionNotFoundError"
};
function hE(e) {
  let t = true;
  return t = t && "intent_hash" in e, t;
}
function kE(e) {
  return dm(e);
}
function dm(e, t) {
  return e == null ? e : {
    intent_hash: e.intent_hash,
    type: r(e, "type") ? e.type : void 0
  };
}
function TE(e) {
  if (e !== void 0)
    return e === null ? null : {
      intent_hash: e.intent_hash,
      type: e.type
    };
}
var vE = {
  HandlingSubmission: "HandlingSubmission",
  Concluded: "Concluded"
};
function _m(e) {
  return fm(e);
}
function fm(e, t) {
  return e;
}
function JE(e) {
  return e;
}
var IE = {
  Unknown: "Unknown",
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  CommitPendingOutcomeUnknown: "CommitPendingOutcomeUnknown",
  PermanentlyRejected: "PermanentlyRejected",
  TemporarilyRejected: "TemporarilyRejected",
  Pending: "Pending"
};
function mm(e) {
  return pm(e);
}
function pm(e, t) {
  return e;
}
function VE(e) {
  return e;
}
function wE(e) {
  return true;
}
function gm(e) {
  return ym(e);
}
function ym(e, t) {
  return e == null ? e : {
    radix_engine_toolkit_receipt: r(e, "radix_engine_toolkit_receipt") ? e.radix_engine_toolkit_receipt : void 0
  };
}
function Om(e) {
  if (e !== void 0)
    return e === null ? null : {
      radix_engine_toolkit_receipt: e.radix_engine_toolkit_receipt
    };
}
function PE(e) {
  let t = true;
  return t = t && "use_free_credit" in e, t = t && "assume_all_signature_proofs" in e, t = t && "skip_epoch_check" in e, t;
}
function Sm(e) {
  return Nm(e);
}
function Nm(e, t) {
  return e == null ? e : {
    use_free_credit: e.use_free_credit,
    assume_all_signature_proofs: e.assume_all_signature_proofs,
    skip_epoch_check: e.skip_epoch_check,
    disable_auth_checks: r(e, "disable_auth_checks") ? e.disable_auth_checks : void 0
  };
}
function bm(e) {
  if (e !== void 0)
    return e === null ? null : {
      use_free_credit: e.use_free_credit,
      assume_all_signature_proofs: e.assume_all_signature_proofs,
      skip_epoch_check: e.skip_epoch_check,
      disable_auth_checks: e.disable_auth_checks
    };
}
function DE(e) {
  let t = true;
  return t = t && "manifest" in e, t = t && "start_epoch_inclusive" in e, t = t && "end_epoch_exclusive" in e, t = t && "tip_percentage" in e, t = t && "nonce" in e, t = t && "signer_public_keys" in e, t = t && "flags" in e, t;
}
function EE(e) {
  return Fm(e);
}
function Fm(e, t) {
  return e == null ? e : {
    opt_ins: r(e, "opt_ins") ? gm(e.opt_ins) : void 0,
    manifest: e.manifest,
    blobs_hex: r(e, "blobs_hex") ? e.blobs_hex : void 0,
    start_epoch_inclusive: e.start_epoch_inclusive,
    end_epoch_exclusive: e.end_epoch_exclusive,
    notary_public_key: r(e, "notary_public_key") ? J(e.notary_public_key) : void 0,
    notary_is_signatory: r(e, "notary_is_signatory") ? e.notary_is_signatory : void 0,
    tip_percentage: e.tip_percentage,
    nonce: e.nonce,
    signer_public_keys: e.signer_public_keys.map(J),
    message: r(e, "message") ? e.message : void 0,
    flags: Sm(e.flags)
  };
}
function Am(e) {
  if (e !== void 0)
    return e === null ? null : {
      opt_ins: Om(e.opt_ins),
      manifest: e.manifest,
      blobs_hex: e.blobs_hex,
      start_epoch_inclusive: e.start_epoch_inclusive,
      end_epoch_exclusive: e.end_epoch_exclusive,
      notary_public_key: I(e.notary_public_key),
      notary_is_signatory: e.notary_is_signatory,
      tip_percentage: e.tip_percentage,
      nonce: e.nonce,
      signer_public_keys: e.signer_public_keys.map(I),
      message: e.message,
      flags: bm(e.flags)
    };
}
function CE(e) {
  let t = true;
  return t = t && "level" in e, t = t && "message" in e, t;
}
function Rm(e) {
  return hm(e);
}
function hm(e, t) {
  return e == null ? e : {
    level: e.level,
    message: e.message
  };
}
function km(e) {
  if (e !== void 0)
    return e === null ? null : {
      level: e.level,
      message: e.message
    };
}
function xE(e) {
  let t = true;
  return t = t && "encoded_receipt" in e, t = t && "receipt" in e, t = t && "resource_changes" in e, t = t && "logs" in e, t;
}
function Tm(e) {
  return vm(e);
}
function vm(e, t) {
  return e == null ? e : {
    encoded_receipt: e.encoded_receipt,
    radix_engine_toolkit_receipt: r(e, "radix_engine_toolkit_receipt") ? e.radix_engine_toolkit_receipt : void 0,
    receipt: e.receipt,
    resource_changes: e.resource_changes,
    logs: e.logs.map(Rm)
  };
}
function qE(e) {
  if (e !== void 0)
    return e === null ? null : {
      encoded_receipt: e.encoded_receipt,
      radix_engine_toolkit_receipt: e.radix_engine_toolkit_receipt,
      receipt: e.receipt,
      resource_changes: e.resource_changes,
      logs: e.logs.map(km)
    };
}
function ME(e) {
  let t = true;
  return t = t && "intent_hash" in e, t;
}
function UE(e) {
  return Jm(e);
}
function Jm(e, t) {
  return e == null ? e : {
    intent_hash: e.intent_hash
  };
}
function Im(e) {
  if (e !== void 0)
    return e === null ? null : {
      intent_hash: e.intent_hash
    };
}
function BE(e) {
  let t = true;
  return t = t && "intent_hash" in e, t;
}
function KE(e) {
  return Vm(e);
}
function Vm(e, t) {
  return e == null ? e : {
    intent_hash: e.intent_hash
  };
}
function LE(e) {
  if (e !== void 0)
    return e === null ? null : {
      intent_hash: e.intent_hash
    };
}
function GE(e) {
  let t = true;
  return t = t && "payload_hash" in e, t = t && "status" in e, t;
}
function Xn(e) {
  return wm(e);
}
function wm(e, t) {
  return e == null ? e : {
    payload_hash: e.payload_hash,
    status: U(e.status),
    payload_status: r(e, "payload_status") ? mm(e.payload_status) : void 0,
    payload_status_description: r(e, "payload_status_description") ? e.payload_status_description : void 0,
    error_message: r(e, "error_message") ? e.error_message : void 0,
    latest_error_message: r(e, "latest_error_message") ? e.latest_error_message : void 0,
    handling_status: r(e, "handling_status") ? _m(e.handling_status) : void 0,
    handling_status_reason: r(e, "handling_status_reason") ? e.handling_status_reason : void 0,
    submission_error: r(e, "submission_error") ? e.submission_error : void 0
  };
}
function Zn(e) {
  if (e !== void 0)
    return e === null ? null : {
      payload_hash: e.payload_hash,
      status: e.status,
      payload_status: e.payload_status,
      payload_status_description: e.payload_status_description,
      error_message: e.error_message,
      latest_error_message: e.latest_error_message,
      handling_status: e.handling_status,
      handling_status_reason: e.handling_status_reason,
      submission_error: e.submission_error
    };
}
function HE(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "status" in e, t = t && "intent_status" in e, t = t && "intent_status_description" in e, t = t && "known_payloads" in e, t;
}
function Pm(e) {
  return Dm(e);
}
function Dm(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    status: U(e.status),
    intent_status: $n(e.intent_status),
    intent_status_description: e.intent_status_description,
    known_payloads: e.known_payloads.map(Xn),
    committed_state_version: r(e, "committed_state_version") ? e.committed_state_version : void 0,
    permanently_rejects_at_epoch: r(e, "permanently_rejects_at_epoch") ? e.permanently_rejects_at_epoch : void 0,
    error_message: r(e, "error_message") ? e.error_message : void 0
  };
}
function zE(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      status: e.status,
      intent_status: e.intent_status,
      intent_status_description: e.intent_status_description,
      known_payloads: e.known_payloads.map(Zn),
      committed_state_version: e.committed_state_version,
      permanently_rejects_at_epoch: e.permanently_rejects_at_epoch,
      error_message: e.error_message
    };
}
function WE(e) {
  let t = true;
  return t = t && "status" in e, t = t && "intent_status" in e, t = t && "intent_status_description" in e, t = t && "known_payloads" in e, t;
}
function $E(e) {
  return Em(e);
}
function Em(e, t) {
  return e == null ? e : {
    status: U(e.status),
    intent_status: $n(e.intent_status),
    intent_status_description: e.intent_status_description,
    known_payloads: e.known_payloads.map(Xn),
    committed_state_version: r(e, "committed_state_version") ? e.committed_state_version : void 0,
    permanently_rejects_at_epoch: r(e, "permanently_rejects_at_epoch") ? e.permanently_rejects_at_epoch : void 0,
    error_message: r(e, "error_message") ? e.error_message : void 0
  };
}
function XE(e) {
  if (e !== void 0)
    return e === null ? null : {
      status: e.status,
      intent_status: e.intent_status,
      intent_status_description: e.intent_status_description,
      known_payloads: e.known_payloads.map(Zn),
      committed_state_version: e.committed_state_version,
      permanently_rejects_at_epoch: e.permanently_rejects_at_epoch,
      error_message: e.error_message
    };
}
function ZE(e) {
  let t = true;
  return t = t && "notarized_transaction_hex" in e, t;
}
function QE(e) {
  return Cm(e);
}
function Cm(e, t) {
  return e == null ? e : {
    notarized_transaction_hex: e.notarized_transaction_hex
  };
}
function xm(e) {
  if (e !== void 0)
    return e === null ? null : {
      notarized_transaction_hex: e.notarized_transaction_hex
    };
}
function YE(e) {
  let t = true;
  return t = t && "duplicate" in e, t;
}
function qm(e) {
  return Mm(e);
}
function Mm(e, t) {
  return e == null ? e : {
    duplicate: e.duplicate
  };
}
function jE(e) {
  if (e !== void 0)
    return e === null ? null : {
      duplicate: e.duplicate
    };
}
function eC(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function tC(e) {
  return Um(e);
}
function Um(e, t) {
  return e == null ? e : {
    items: e.items.map(_n)
  };
}
function rC(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(fn)
    };
}
function nC(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function iC(e) {
  return Bm(e);
}
function Bm(e, t) {
  return e == null ? e : {
    items: e.items.map(mn)
  };
}
function aC(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(pn)
    };
}
function oC(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function uC(e) {
  return Km(e);
}
function Km(e, t) {
  return e == null ? e : {
    items: e.items.map(Un)
  };
}
function lC(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(Bn)
    };
}
function sC(e) {
  let t = true;
  return t = t && "address" in e, t = t && "epochs_active_in" in e, t;
}
function Lm(e) {
  return Gm(e);
}
function Gm(e, t) {
  return e == null ? e : {
    address: e.address,
    proposals_made: r(e, "proposals_made") ? e.proposals_made : void 0,
    proposals_missed: r(e, "proposals_missed") ? e.proposals_missed : void 0,
    epochs_active_in: e.epochs_active_in
  };
}
function Hm(e) {
  if (e !== void 0)
    return e === null ? null : {
      address: e.address,
      proposals_made: e.proposals_made,
      proposals_missed: e.proposals_missed,
      epochs_active_in: e.epochs_active_in
    };
}
function cC(e) {
  let t = true;
  return t = t && "items" in e, t;
}
function Qn(e) {
  return zm(e);
}
function zm(e, t) {
  return e == null ? e : {
    items: e.items.map(Lm)
  };
}
function Yn(e) {
  if (e !== void 0)
    return e === null ? null : {
      items: e.items.map(Hm)
    };
}
function dC(e) {
  return true;
}
function _C(e) {
  return Wm(e);
}
function Wm(e, t) {
  return e == null ? e : {
    at_ledger_state: r(e, "at_ledger_state") ? f(e.at_ledger_state) : void 0,
    from_ledger_state: r(e, "from_ledger_state") ? f(e.from_ledger_state) : void 0,
    validator_addresses: r(e, "validator_addresses") ? e.validator_addresses : void 0
  };
}
function $m(e) {
  if (e !== void 0)
    return e === null ? null : {
      at_ledger_state: m(e.at_ledger_state),
      from_ledger_state: m(e.from_ledger_state),
      validator_addresses: e.validator_addresses
    };
}
function fC(e) {
  return true;
}
function mC(e) {
  return Xm(e);
}
function Xm(e, t) {
  return e == null ? e : {
    validator_addresses: r(e, "validator_addresses") ? e.validator_addresses : void 0
  };
}
function pC(e) {
  if (e !== void 0)
    return e === null ? null : {
      validator_addresses: e.validator_addresses
    };
}
function gC(e) {
  let t = true;
  return t = t && "ledger_state" in e, t = t && "validators" in e, t;
}
function Zm(e) {
  return Qm(e);
}
function Qm(e, t) {
  return e == null ? e : {
    ledger_state: d(e.ledger_state),
    validators: Qn(e.validators)
  };
}
function yC(e) {
  if (e !== void 0)
    return e === null ? null : {
      ledger_state: _(e.ledger_state),
      validators: Yn(e.validators)
    };
}
function OC(e) {
  let t = true;
  return t = t && "validators" in e, t;
}
function SC(e) {
  return Ym(e);
}
function Ym(e, t) {
  return e == null ? e : {
    validators: Qn(e.validators)
  };
}
function NC(e) {
  if (e !== void 0)
    return e === null ? null : {
      validators: Yn(e.validators)
    };
}
var bC = class extends w {
  async resourceHoldersPageRaw(t, n) {
    if (t.resourceHoldersRequest === null || t.resourceHoldersRequest === void 0)
      throw new c("resourceHoldersRequest", "Required parameter requestParameters.resourceHoldersRequest was null or undefined when calling resourceHoldersPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/extensions/resource-holders/page",
      method: "POST",
      headers: a,
      query: i,
      body: Kc(t.resourceHoldersRequest)
    }, n);
    return new l(o, (u) => Gc(u));
  }
  async resourceHoldersPage(t, n) {
    return await (await this.resourceHoldersPageRaw(t, n)).value();
  }
};
var jm = class extends w {
  async accountAuthorizedDepositorsPageRaw(t, n) {
    if (t.stateAccountAuthorizedDepositorsPageRequest === null || t.stateAccountAuthorizedDepositorsPageRequest === void 0)
      throw new c("stateAccountAuthorizedDepositorsPageRequest", "Required parameter requestParameters.stateAccountAuthorizedDepositorsPageRequest was null or undefined when calling accountAuthorizedDepositorsPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/account/page/authorized-depositors",
      method: "POST",
      headers: a,
      query: i,
      body: Xc(t.stateAccountAuthorizedDepositorsPageRequest)
    }, n);
    return new l(o, (u) => Zc(u));
  }
  async accountAuthorizedDepositorsPage(t, n) {
    return await (await this.accountAuthorizedDepositorsPageRaw(t, n)).value();
  }
  async accountLockerVaultsPageRaw(t, n) {
    if (t.stateAccountLockerPageVaultsRequest === null || t.stateAccountLockerPageVaultsRequest === void 0)
      throw new c("stateAccountLockerPageVaultsRequest", "Required parameter requestParameters.stateAccountLockerPageVaultsRequest was null or undefined when calling accountLockerVaultsPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/account-locker/page/vaults",
      method: "POST",
      headers: a,
      query: i,
      body: jc(t.stateAccountLockerPageVaultsRequest)
    }, n);
    return new l(o, (u) => ed(u));
  }
  async accountLockerVaultsPage(t, n) {
    return await (await this.accountLockerVaultsPageRaw(t, n)).value();
  }
  async accountLockersTouchedAtRaw(t, n) {
    if (t.stateAccountLockersTouchedAtRequest === null || t.stateAccountLockersTouchedAtRequest === void 0)
      throw new c("stateAccountLockersTouchedAtRequest", "Required parameter requestParameters.stateAccountLockersTouchedAtRequest was null or undefined when calling accountLockersTouchedAt.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/account-lockers/touched-at",
      method: "POST",
      headers: a,
      query: i,
      body: nd(t.stateAccountLockersTouchedAtRequest)
    }, n);
    return new l(o, (u) => od(u));
  }
  async accountLockersTouchedAt(t, n) {
    return await (await this.accountLockersTouchedAtRaw(t, n)).value();
  }
  async accountResourcePreferencesPageRaw(t, n) {
    if (t.stateAccountResourcePreferencesPageRequest === null || t.stateAccountResourcePreferencesPageRequest === void 0)
      throw new c("stateAccountResourcePreferencesPageRequest", "Required parameter requestParameters.stateAccountResourcePreferencesPageRequest was null or undefined when calling accountResourcePreferencesPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/account/page/resource-preferences",
      method: "POST",
      headers: a,
      query: i,
      body: dd(t.stateAccountResourcePreferencesPageRequest)
    }, n);
    return new l(o, (u) => fd(u));
  }
  async accountResourcePreferencesPage(t, n) {
    return await (await this.accountResourcePreferencesPageRaw(t, n)).value();
  }
  async entityFungibleResourceVaultPageRaw(t, n) {
    if (t.stateEntityFungibleResourceVaultsPageRequest === null || t.stateEntityFungibleResourceVaultsPageRequest === void 0)
      throw new c("stateEntityFungibleResourceVaultsPageRequest", "Required parameter requestParameters.stateEntityFungibleResourceVaultsPageRequest was null or undefined when calling entityFungibleResourceVaultPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/fungible-vaults/",
      method: "POST",
      headers: a,
      query: i,
      body: Yd(t.stateEntityFungibleResourceVaultsPageRequest)
    }, n);
    return new l(o, (u) => e_(u));
  }
  async entityFungibleResourceVaultPage(t, n) {
    return await (await this.entityFungibleResourceVaultPageRaw(t, n)).value();
  }
  async entityFungiblesPageRaw(t, n) {
    if (t.stateEntityFungiblesPageRequest === null || t.stateEntityFungiblesPageRequest === void 0)
      throw new c("stateEntityFungiblesPageRequest", "Required parameter requestParameters.stateEntityFungiblesPageRequest was null or undefined when calling entityFungiblesPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/fungibles/",
      method: "POST",
      headers: a,
      query: i,
      body: i_(t.stateEntityFungiblesPageRequest)
    }, n);
    return new l(o, (u) => o_(u));
  }
  async entityFungiblesPage(t, n) {
    return await (await this.entityFungiblesPageRaw(t, n)).value();
  }
  async entityMetadataPageRaw(t, n) {
    if (t.stateEntityMetadataPageRequest === null || t.stateEntityMetadataPageRequest === void 0)
      throw new c("stateEntityMetadataPageRequest", "Required parameter requestParameters.stateEntityMetadataPageRequest was null or undefined when calling entityMetadataPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/metadata",
      method: "POST",
      headers: a,
      query: i,
      body: s_(t.stateEntityMetadataPageRequest)
    }, n);
    return new l(o, (u) => d_(u));
  }
  async entityMetadataPage(t, n) {
    return await (await this.entityMetadataPageRaw(t, n)).value();
  }
  async entityNonFungibleIdsPageRaw(t, n) {
    if (t.stateEntityNonFungibleIdsPageRequest === null || t.stateEntityNonFungibleIdsPageRequest === void 0)
      throw new c("stateEntityNonFungibleIdsPageRequest", "Required parameter requestParameters.stateEntityNonFungibleIdsPageRequest was null or undefined when calling entityNonFungibleIdsPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/non-fungible-vault/ids",
      method: "POST",
      headers: a,
      query: i,
      body: m_(t.stateEntityNonFungibleIdsPageRequest)
    }, n);
    return new l(o, (u) => g_(u));
  }
  async entityNonFungibleIdsPage(t, n) {
    return await (await this.entityNonFungibleIdsPageRaw(t, n)).value();
  }
  async entityNonFungibleResourceVaultPageRaw(t, n) {
    if (t.stateEntityNonFungibleResourceVaultsPageRequest === null || t.stateEntityNonFungibleResourceVaultsPageRequest === void 0)
      throw new c("stateEntityNonFungibleResourceVaultsPageRequest", "Required parameter requestParameters.stateEntityNonFungibleResourceVaultsPageRequest was null or undefined when calling entityNonFungibleResourceVaultPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/non-fungible-vaults/",
      method: "POST",
      headers: a,
      query: i,
      body: N_(t.stateEntityNonFungibleResourceVaultsPageRequest)
    }, n);
    return new l(o, (u) => F_(u));
  }
  async entityNonFungibleResourceVaultPage(t, n) {
    return await (await this.entityNonFungibleResourceVaultPageRaw(t, n)).value();
  }
  async entityNonFungiblesPageRaw(t, n) {
    if (t.stateEntityNonFungiblesPageRequest === null || t.stateEntityNonFungiblesPageRequest === void 0)
      throw new c("stateEntityNonFungiblesPageRequest", "Required parameter requestParameters.stateEntityNonFungiblesPageRequest was null or undefined when calling entityNonFungiblesPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/non-fungibles/",
      method: "POST",
      headers: a,
      query: i,
      body: k_(t.stateEntityNonFungiblesPageRequest)
    }, n);
    return new l(o, (u) => v_(u));
  }
  async entityNonFungiblesPage(t, n) {
    return await (await this.entityNonFungiblesPageRaw(t, n)).value();
  }
  async entitySchemaPageRaw(t, n) {
    if (t.stateEntitySchemaPageRequest === null || t.stateEntitySchemaPageRequest === void 0)
      throw new c("stateEntitySchemaPageRequest", "Required parameter requestParameters.stateEntitySchemaPageRequest was null or undefined when calling entitySchemaPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/page/schemas",
      method: "POST",
      headers: a,
      query: i,
      body: V_(t.stateEntitySchemaPageRequest)
    }, n);
    return new l(o, (u) => w_(u));
  }
  async entitySchemaPage(t, n) {
    return await (await this.entitySchemaPageRaw(t, n)).value();
  }
  async keyValueStoreDataRaw(t, n) {
    if (t.stateKeyValueStoreDataRequest === null || t.stateKeyValueStoreDataRequest === void 0)
      throw new c("stateKeyValueStoreDataRequest", "Required parameter requestParameters.stateKeyValueStoreDataRequest was null or undefined when calling keyValueStoreData.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/key-value-store/data",
      method: "POST",
      headers: a,
      query: i,
      body: C_(t.stateKeyValueStoreDataRequest)
    }, n);
    return new l(o, (u) => M_(u));
  }
  async keyValueStoreData(t, n) {
    return await (await this.keyValueStoreDataRaw(t, n)).value();
  }
  async keyValueStoreKeysRaw(t, n) {
    if (t.stateKeyValueStoreKeysRequest === null || t.stateKeyValueStoreKeysRequest === void 0)
      throw new c("stateKeyValueStoreKeysRequest", "Required parameter requestParameters.stateKeyValueStoreKeysRequest was null or undefined when calling keyValueStoreKeys.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/key-value-store/keys",
      method: "POST",
      headers: a,
      query: i,
      body: z_(t.stateKeyValueStoreKeysRequest)
    }, n);
    return new l(o, (u) => $_(u));
  }
  async keyValueStoreKeys(t, n) {
    return await (await this.keyValueStoreKeysRaw(t, n)).value();
  }
  async nonFungibleDataRaw(t, n) {
    if (t.stateNonFungibleDataRequest === null || t.stateNonFungibleDataRequest === void 0)
      throw new c("stateNonFungibleDataRequest", "Required parameter requestParameters.stateNonFungibleDataRequest was null or undefined when calling nonFungibleData.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/non-fungible/data",
      method: "POST",
      headers: a,
      query: i,
      body: Q_(t.stateNonFungibleDataRequest)
    }, n);
    return new l(o, (u) => j_(u));
  }
  async nonFungibleData(t, n) {
    return await (await this.nonFungibleDataRaw(t, n)).value();
  }
  async nonFungibleIdsRaw(t, n) {
    if (t.stateNonFungibleIdsRequest === null || t.stateNonFungibleIdsRequest === void 0)
      throw new c("stateNonFungibleIdsRequest", "Required parameter requestParameters.stateNonFungibleIdsRequest was null or undefined when calling nonFungibleIds.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/non-fungible/ids",
      method: "POST",
      headers: a,
      query: i,
      body: nf(t.stateNonFungibleIdsRequest)
    }, n);
    return new l(o, (u) => of(u));
  }
  async nonFungibleIds(t, n) {
    return await (await this.nonFungibleIdsRaw(t, n)).value();
  }
  async nonFungibleLocationRaw(t, n) {
    if (t.stateNonFungibleLocationRequest === null || t.stateNonFungibleLocationRequest === void 0)
      throw new c("stateNonFungibleLocationRequest", "Required parameter requestParameters.stateNonFungibleLocationRequest was null or undefined when calling nonFungibleLocation.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/non-fungible/location",
      method: "POST",
      headers: a,
      query: i,
      body: cf(t.stateNonFungibleLocationRequest)
    }, n);
    return new l(o, (u) => ff(u));
  }
  async nonFungibleLocation(t, n) {
    return await (await this.nonFungibleLocationRaw(t, n)).value();
  }
  async packageBlueprintPageRaw(t, n) {
    if (t.statePackageBlueprintPageRequest === null || t.statePackageBlueprintPageRequest === void 0)
      throw new c("statePackageBlueprintPageRequest", "Required parameter requestParameters.statePackageBlueprintPageRequest was null or undefined when calling packageBlueprintPage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/package/page/blueprints",
      method: "POST",
      headers: a,
      query: i,
      body: yf(t.statePackageBlueprintPageRequest)
    }, n);
    return new l(o, (u) => Sf(u));
  }
  async packageBlueprintPage(t, n) {
    return await (await this.packageBlueprintPageRaw(t, n)).value();
  }
  async packageCodePageRaw(t, n) {
    if (t.statePackageCodePageRequest === null || t.statePackageCodePageRequest === void 0)
      throw new c("statePackageCodePageRequest", "Required parameter requestParameters.statePackageCodePageRequest was null or undefined when calling packageCodePage.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/package/page/codes",
      method: "POST",
      headers: a,
      query: i,
      body: Ff(t.statePackageCodePageRequest)
    }, n);
    return new l(o, (u) => Af(u));
  }
  async packageCodePage(t, n) {
    return await (await this.packageCodePageRaw(t, n)).value();
  }
  async stateEntityDetailsRaw(t, n) {
    if (t.stateEntityDetailsRequest === null || t.stateEntityDetailsRequest === void 0)
      throw new c("stateEntityDetailsRequest", "Required parameter requestParameters.stateEntityDetailsRequest was null or undefined when calling stateEntityDetails.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/entity/details",
      method: "POST",
      headers: a,
      query: i,
      body: yd(t.stateEntityDetailsRequest)
    }, n);
    return new l(o, (u) => Md(u));
  }
  async stateEntityDetails(t, n) {
    return await (await this.stateEntityDetailsRaw(t, n)).value();
  }
  async stateValidatorsListRaw(t, n) {
    if (t.stateValidatorsListRequest === null || t.stateValidatorsListRequest === void 0)
      throw new c("stateValidatorsListRequest", "Required parameter requestParameters.stateValidatorsListRequest was null or undefined when calling stateValidatorsList.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/state/validators/list",
      method: "POST",
      headers: a,
      query: i,
      body: kf(t.stateValidatorsListRequest)
    }, n);
    return new l(o, (u) => Lf(u));
  }
  async stateValidatorsList(t, n) {
    return await (await this.stateValidatorsListRaw(t, n)).value();
  }
};
var ep = class extends w {
  async validatorsUptimeRaw(t, n) {
    if (t.validatorsUptimeRequest === null || t.validatorsUptimeRequest === void 0)
      throw new c("validatorsUptimeRequest", "Required parameter requestParameters.validatorsUptimeRequest was null or undefined when calling validatorsUptime.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/statistics/validators/uptime",
      method: "POST",
      headers: a,
      query: i,
      body: $m(t.validatorsUptimeRequest)
    }, n);
    return new l(o, (u) => Zm(u));
  }
  async validatorsUptime(t, n) {
    return await (await this.validatorsUptimeRaw(t, n)).value();
  }
};
var tp = class extends w {
  async gatewayStatusRaw(t) {
    const n = {}, i = {}, a = await this.request({
      path: "/status/gateway-status",
      method: "POST",
      headers: i,
      query: n
    }, t);
    return new l(a, (o) => $u(o));
  }
  async gatewayStatus(t) {
    return await (await this.gatewayStatusRaw(t)).value();
  }
  async networkConfigurationRaw(t) {
    const n = {}, i = {}, a = await this.request({
      path: "/status/network-configuration",
      method: "POST",
      headers: i,
      query: n
    }, t);
    return new l(a, (o) => As(o));
  }
  async networkConfiguration(t) {
    return await (await this.networkConfigurationRaw(t)).value();
  }
};
var rp = class extends w {
  async streamTransactionsRaw(t, n) {
    if (t.streamTransactionsRequest === null || t.streamTransactionsRequest === void 0)
      throw new c("streamTransactionsRequest", "Required parameter requestParameters.streamTransactionsRequest was null or undefined when calling streamTransactions.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/stream/transactions",
      method: "POST",
      headers: a,
      query: i,
      body: Zf(t.streamTransactionsRequest)
    }, n);
    return new l(o, (u) => Yf(u));
  }
  async streamTransactions(t, n) {
    return await (await this.streamTransactionsRaw(t, n)).value();
  }
};
var np = class extends w {
  async accountDepositPreValidationRaw(t, n) {
    if (t.accountDepositPreValidationRequest === null || t.accountDepositPreValidationRequest === void 0)
      throw new c("accountDepositPreValidationRequest", "Required parameter requestParameters.accountDepositPreValidationRequest was null or undefined when calling accountDepositPreValidation.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/transaction/account-deposit-pre-validation",
      method: "POST",
      headers: a,
      query: i,
      body: vi(t.accountDepositPreValidationRequest)
    }, n);
    return new l(o, (u) => Pi(u));
  }
  async accountDepositPreValidation(t, n) {
    return await (await this.accountDepositPreValidationRaw(t, n)).value();
  }
  async transactionCommittedDetailsRaw(t, n) {
    if (t.transactionCommittedDetailsRequest === null || t.transactionCommittedDetailsRequest === void 0)
      throw new c("transactionCommittedDetailsRequest", "Required parameter requestParameters.transactionCommittedDetailsRequest was null or undefined when calling transactionCommittedDetails.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/transaction/committed-details",
      method: "POST",
      headers: a,
      query: i,
      body: nm(t.transactionCommittedDetailsRequest)
    }, n);
    return new l(o, (u) => am(u));
  }
  async transactionCommittedDetails(t, n) {
    return await (await this.transactionCommittedDetailsRaw(t, n)).value();
  }
  async transactionConstructionRaw(t) {
    const n = {}, i = {}, a = await this.request({
      path: "/transaction/construction",
      method: "POST",
      headers: i,
      query: n
    }, t);
    return new l(a, (o) => lm(o));
  }
  async transactionConstruction(t) {
    return await (await this.transactionConstructionRaw(t)).value();
  }
  async transactionPreviewRaw(t, n) {
    if (t.transactionPreviewRequest === null || t.transactionPreviewRequest === void 0)
      throw new c("transactionPreviewRequest", "Required parameter requestParameters.transactionPreviewRequest was null or undefined when calling transactionPreview.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/transaction/preview",
      method: "POST",
      headers: a,
      query: i,
      body: Am(t.transactionPreviewRequest)
    }, n);
    return new l(o, (u) => Tm(u));
  }
  async transactionPreview(t, n) {
    return await (await this.transactionPreviewRaw(t, n)).value();
  }
  async transactionStatusRaw(t, n) {
    if (t.transactionStatusRequest === null || t.transactionStatusRequest === void 0)
      throw new c("transactionStatusRequest", "Required parameter requestParameters.transactionStatusRequest was null or undefined when calling transactionStatus.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/transaction/status",
      method: "POST",
      headers: a,
      query: i,
      body: Im(t.transactionStatusRequest)
    }, n);
    return new l(o, (u) => Pm(u));
  }
  async transactionStatus(t, n) {
    return await (await this.transactionStatusRaw(t, n)).value();
  }
  async transactionSubmitRaw(t, n) {
    if (t.transactionSubmitRequest === null || t.transactionSubmitRequest === void 0)
      throw new c("transactionSubmitRequest", "Required parameter requestParameters.transactionSubmitRequest was null or undefined when calling transactionSubmit.");
    const i = {}, a = {};
    a["Content-Type"] = "application/json";
    const o = await this.request({
      path: "/transaction/submit",
      method: "POST",
      headers: a,
      query: i,
      body: xm(t.transactionSubmitRequest)
    }, n);
    return new l(o, (u) => qm(u));
  }
  async transactionSubmit(t, n) {
    return await (await this.transactionSubmitRaw(t, n)).value();
  }
};
var X = (e, t) => {
  const n = [];
  for (let i = 0, a = e.length; i < a; i += t)
    n.push(e.slice(i, i + t));
  return n;
};
var M = async (e, t) => {
  let n = t;
  const i = [];
  let a;
  do {
    const o = await e(n);
    a = o.ledger_state, i.push(...o.items), n = o.next_cursor;
  } while (n);
  return {
    aggregatedEntities: i,
    ledger_state: a
  };
};
var ip = class {
  constructor(t, n) {
    this.innerClient = t, this.configuration = n;
  }
  async getEntityDetailsVaultAggregated(t, n, i) {
    var s, S, A, E, C, x, Ve;
    const a = Array.isArray(t);
    if (a && t.length === 0)
      return Promise.resolve([]);
    if (a && t.length > this.configuration.maxAddressesCount) {
      const q = X(t, this.configuration.maxAddressesCount);
      return Promise.all(
        q.map(
          (V) => this.getEntityDetailsVaultAggregated(V, n, i)
        )
      ).then((V) => V.flat());
    }
    const { items: o, ledger_state: u } = await this.innerClient.stateEntityDetails({
      stateEntityDetailsRequest: {
        addresses: a ? t : [t],
        aggregation_level: Mu.Vault,
        opt_ins: {
          ancestor_identities: (s = n == null ? void 0 : n.ancestorIdentities) != null ? s : false,
          component_royalty_vault_balance: (S = n == null ? void 0 : n.componentRoyaltyVaultBalance) != null ? S : false,
          package_royalty_vault_balance: (A = n == null ? void 0 : n.packageRoyaltyVaultBalance) != null ? A : false,
          non_fungible_include_nfids: (E = n == null ? void 0 : n.nonFungibleIncludeNfids) != null ? E : true,
          explicit_metadata: (C = n == null ? void 0 : n.explicitMetadata) != null ? C : []
        },
        at_ledger_state: i
      }
    }).then((q) => this.ensureResourcesProperties(q));
    return a ? Promise.all(
      o.map(
        (q) => {
          var V, we;
          return this.queryAllResources(
            q,
            {
              explicitMetadata: (V = n == null ? void 0 : n.explicitMetadata) != null ? V : [],
              nonFungibleIncludeNfids: (we = n == null ? void 0 : n.nonFungibleIncludeNfids) != null ? we : true
            },
            i || {
              state_version: u.state_version
            }
          );
        }
      )
    ) : this.queryAllResources(
      o[0],
      {
        explicitMetadata: (x = n == null ? void 0 : n.explicitMetadata) != null ? x : [],
        nonFungibleIncludeNfids: (Ve = n == null ? void 0 : n.nonFungibleIncludeNfids) != null ? Ve : true
      },
      i || {
        state_version: u.state_version
      }
    );
  }
  async getEntityMetadata(t, n) {
    return this.innerClient.entityMetadataPage({
      stateEntityMetadataPageRequest: {
        address: t,
        cursor: n
      }
    });
  }
  async getNonFungibleLocation(t, n) {
    if (n.length > this.configuration.maxNftIdsCount) {
      const i = X(n, this.configuration.maxNftIdsCount);
      return Promise.all(
        i.map((a) => this.getNonFungibleLocation(t, a))
      ).then((a) => a.flat());
    }
    return this.innerClient.nonFungibleLocation({
      stateNonFungibleLocationRequest: {
        resource_address: t,
        non_fungible_ids: n
      }
    }).then((i) => i.non_fungible_ids);
  }
  async getAllEntityMetadata(t, n) {
    return M(
      this.getEntityMetadata.bind(this, t),
      n
    ).then((i) => i.aggregatedEntities);
  }
  async getValidators(t) {
    return this.innerClient.stateValidatorsList({
      stateValidatorsListRequest: {
        cursor: t || null
      }
    }).then(({ validators: n }) => n);
  }
  async getAllValidators(t) {
    return M((n) => this.getValidatorsWithLedgerState(n).then((a) => ({
      items: a.validators.items,
      ledger_state: a.ledger_state,
      next_cursor: a.validators.next_cursor
    })), t).then((n) => n.aggregatedEntities);
  }
  async getValidatorsWithLedgerState(t) {
    return this.innerClient.stateValidatorsList({
      stateValidatorsListRequest: {
        cursor: t || null
      }
    });
  }
  async getAllValidatorsWithLedgerState(t) {
    return M(
      (n) => this.getValidatorsWithLedgerState(n).then((i) => ({
        items: i.validators.items,
        ledger_state: i.ledger_state,
        next_cursor: i.validators.next_cursor
      })),
      t
    );
  }
  async getNonFungibleIds(t, n, i) {
    return this.innerClient.nonFungibleIds({
      stateNonFungibleIdsRequest: {
        resource_address: t,
        cursor: i,
        at_ledger_state: n
      }
    }).then(({ non_fungible_ids: a }) => a);
  }
  async getAllNonFungibleIds(t, n, i) {
    let a = i, o = n;
    const u = [];
    do {
      const s = await this.innerClient.nonFungibleIds({
        stateNonFungibleIdsRequest: {
          resource_address: t,
          cursor: o,
          at_ledger_state: a
        }
      });
      u.push(...s.non_fungible_ids.items), a = a || {
        state_version: s.ledger_state.state_version
      }, o = s.non_fungible_ids.next_cursor;
    } while (o);
    return u;
  }
  async getNonFungibleData(t, n, i) {
    const a = Array.isArray(n);
    if (a && n.length === 0)
      return Promise.resolve([]);
    if (a && n.length > this.configuration.maxNftIdsCount) {
      const u = X(n, this.configuration.maxNftIdsCount);
      return Promise.all(
        u.map(
          (s) => this.getNonFungibleData(t, s, i)
        )
      ).then((s) => s.flat());
    }
    const { non_fungible_ids: o } = await this.innerClient.nonFungibleData({
      stateNonFungibleDataRequest: {
        resource_address: t,
        non_fungible_ids: a ? n : [n],
        at_ledger_state: i
      }
    });
    return a ? o : o[0];
  }
  async getEntityFungiblesPageVaultAggregated(t, n) {
    return this.innerClient.entityFungiblesPage({
      stateEntityFungiblesPageRequest: {
        address: t,
        cursor: n == null ? void 0 : n.nextCursor,
        aggregation_level: "Vault",
        at_ledger_state: n == null ? void 0 : n.ledgerState,
        opt_ins: {
          explicit_metadata: n == null ? void 0 : n.explicitMetadata
        }
      }
    });
  }
  async getEntityNonFungiblesPageVaultAggregated(t, n) {
    return this.innerClient.entityNonFungiblesPage({
      stateEntityNonFungiblesPageRequest: {
        address: t,
        cursor: n == null ? void 0 : n.cursor,
        aggregation_level: "Vault",
        at_ledger_state: n == null ? void 0 : n.ledgerState,
        opt_ins: {
          explicit_metadata: n == null ? void 0 : n.explicitMetadata,
          non_fungible_include_nfids: n == null ? void 0 : n.nonFungibleIncludeNfids
        }
      }
    });
  }
  ensureResourcesProperties(t) {
    return {
      ...t,
      items: t.items.map((n) => ({
        ...n,
        fungible_resources: n.fungible_resources || {
          total_count: 0,
          items: []
        },
        non_fungible_resources: n.non_fungible_resources || {
          total_count: 0,
          items: []
        }
      }))
    };
  }
  async queryAllFungibles(t, n, i) {
    var u, s;
    const a = (u = t == null ? void 0 : t.fungible_resources) == null ? void 0 : u.next_cursor;
    if (!a)
      return Promise.resolve(t);
    const o = await M(
      (S) => this.getEntityFungiblesPageVaultAggregated(t.address, {
        nextCursor: S,
        ledgerState: i,
        explicitMetadata: n == null ? void 0 : n.explicitMetadata
      }),
      a
    );
    return Promise.resolve({
      ...t,
      fungible_resources: {
        items: [
          ...((s = t == null ? void 0 : t.fungible_resources) == null ? void 0 : s.items) || [],
          ...o.aggregatedEntities
        ]
      }
    });
  }
  async queryAllNonFungibles(t, n, i) {
    const a = t.non_fungible_resources.next_cursor;
    if (!a)
      return Promise.resolve(t);
    const o = await M(
      (u) => this.getEntityNonFungiblesPageVaultAggregated(
        t.address,
        {
          cursor: u,
          ledgerState: i,
          explicitMetadata: n == null ? void 0 : n.explicitMetadata,
          nonFungibleIncludeNfids: n == null ? void 0 : n.nonFungibleIncludeNfids
        }
      ),
      a
    );
    return Promise.resolve({
      ...t,
      non_fungible_resources: {
        items: [
          ...t.non_fungible_resources.items,
          ...o.aggregatedEntities
        ]
      }
    });
  }
  async queryAllResources(t, n, i) {
    const a = this.queryAllFungibles(
      t,
      n,
      i
    ), o = this.queryAllNonFungibles(
      t,
      n,
      i
    );
    return Promise.all([a, o]).then(
      (u) => ({
        ...t,
        fungible_resources: {
          ...t.fungible_resources,
          items: [...u[0].fungible_resources.items]
        },
        non_fungible_resources: {
          ...t.non_fungible_resources,
          items: [...u[1].non_fungible_resources.items]
        }
      })
    );
  }
};
var ap = 20;
var op = 29;
var oe = 200;
var up = "1.7.0";
var lp = class {
  constructor(t, n) {
    this.innerClient = t, this.configuration = n;
  }
  getValidatorsUptimeFromTo(t, n, i) {
    var a, o;
    if (t.length > (((a = this.configuration) == null ? void 0 : a.maxValidatorsUptimeCount) || oe)) {
      const u = X(
        t,
        ((o = this.configuration) == null ? void 0 : o.maxValidatorsUptimeCount) || oe
      );
      return Promise.all(
        u.map((s) => this.getValidatorsUptimeFromTo(s, n, i))
      ).then((s) => s.flat());
    }
    return this.innerClient.validatorsUptime({
      validatorsUptimeRequest: {
        validator_addresses: t,
        from_ledger_state: n !== void 0 ? n instanceof Date ? { timestamp: n } : { state_version: n } : void 0,
        at_ledger_state: i !== void 0 ? i instanceof Date ? { timestamp: i } : { state_version: i } : void 0
      }
    }).then((u) => u.validators.items);
  }
  getValidatorsUptime(t) {
    return this.innerClient.validatorsUptime({
      validatorsUptimeRequest: {
        validator_addresses: t
      }
    });
  }
};
var sp = class {
  constructor(t) {
    this.innerClient = t;
  }
  getCurrent() {
    return this.innerClient.gatewayStatus();
  }
  getNetworkConfiguration() {
    return this.innerClient.networkConfiguration();
  }
};
var cp = class {
  constructor(t) {
    this.innerClient = t;
  }
  getTransactionsList(t, n) {
    return this.innerClient.streamTransactions({
      streamTransactionsRequest: {
        cursor: n,
        affected_global_entities_filter: t
      }
    });
  }
};
var dp = class {
  constructor(t) {
    this.innerClient = t;
  }
  getStatus(t) {
    return this.innerClient.transactionStatus({
      transactionStatusRequest: {
        intent_hash: t
      }
    });
  }
  getCommittedDetails(t, n) {
    var i, a, o, u, s, S, A, E, C, x;
    return this.innerClient.transactionCommittedDetails({
      transactionCommittedDetailsRequest: {
        intent_hash: t,
        opt_ins: {
          raw_hex: (i = n == null ? void 0 : n.rawHex) != null ? i : true,
          receipt_events: (a = n == null ? void 0 : n.receiptEvents) != null ? a : true,
          receipt_fee_source: (o = n == null ? void 0 : n.receiptFeeSource) != null ? o : true,
          receipt_fee_destination: (u = n == null ? void 0 : n.receiptFeeDestination) != null ? u : true,
          receipt_costing_parameters: (s = n == null ? void 0 : n.receiptCostingParameters) != null ? s : true,
          receipt_fee_summary: (S = n == null ? void 0 : n.receiptFeeSummary) != null ? S : true,
          receipt_state_changes: (A = n == null ? void 0 : n.receiptStateChanges) != null ? A : true,
          affected_global_entities: (E = n == null ? void 0 : n.affectedGlobalEntities) != null ? E : true,
          balance_changes: (C = n == null ? void 0 : n.balanceChanges) != null ? C : true,
          receipt_output: (x = n == null ? void 0 : n.receiptOutput) != null ? x : true
        }
      }
    });
  }
};
var _p = class extends Ee {
  constructor(n) {
    super(n);
    p(this, "extendedConfiguration");
    this.extendedConfiguration = n;
  }
  get maxAddressesCount() {
    return this.extendedConfiguration.maxAddressesCount || ap;
  }
  get maxNftIdsCount() {
    return this.extendedConfiguration.maxNftIdsCount || op;
  }
  get maxValidatorsUptimeCount() {
    return this.extendedConfiguration.maxValidatorsUptimeCount || oe;
  }
};
var fp = (e) => e ? e.endsWith("/") ? e == null ? void 0 : e.slice(0, -1) : e : "";
var ue = class _ue {
  constructor(t) {
    p(this, "state");
    p(this, "stream");
    p(this, "status");
    p(this, "transaction");
    p(this, "statistics");
    p(this, "lowLevel");
    this.lowLevel = {
      state: new jm(t),
      stream: new rp(t),
      status: new tp(t),
      transaction: new np(t),
      statistics: new ep(t)
    }, this.state = new ip(this.lowLevel.state, t), this.stream = new cp(this.lowLevel.stream), this.status = new sp(this.lowLevel.status), this.transaction = new dp(this.lowLevel.transaction), this.statistics = new lp(this.lowLevel.statistics, t);
  }
  static initialize(t) {
    const n = _ue.constructConfiguration(t);
    return new _ue(n);
  }
  static constructConfiguration(t) {
    var a, o, u, s;
    const n = t.networkId && !t.basePath ? ri[t.networkId].gatewayUrl : fp(t == null ? void 0 : t.basePath), i = (a = t == null ? void 0 : t.applicationName) != null ? a : "Unknown";
    return new _p({
      ...t,
      basePath: n,
      applicationName: i,
      headers: {
        ...(o = t == null ? void 0 : t.headers) != null ? o : {},
        "RDX-Client-Name": "@radixdlt/babylon-gateway-api-sdk",
        "RDX-Client-Version": up,
        "RDX-App-Name": i,
        "RDX-App-Version": (u = t.applicationVersion) != null ? u : "Unknown",
        "RDX-App-Dapp-Definition": (s = t.applicationDappDefinitionAddress) != null ? s : "Unknown"
      }
    });
  }
};
export {
  bp as AccountAuthorizedDepositorBadgeType,
  qe as AccountAuthorizedDepositorBadgeTypeFromJSON,
  ui as AccountAuthorizedDepositorBadgeTypeFromJSONTyped,
  Fp as AccountAuthorizedDepositorBadgeTypeToJSON,
  Pp as AccountAuthorizedDepositorsCollectionAllOfFromJSON,
  _i as AccountAuthorizedDepositorsCollectionAllOfFromJSONTyped,
  Dp as AccountAuthorizedDepositorsCollectionAllOfToJSON,
  Ip as AccountAuthorizedDepositorsCollectionFromJSON,
  di as AccountAuthorizedDepositorsCollectionFromJSONTyped,
  Vp as AccountAuthorizedDepositorsCollectionToJSON,
  Ep as AccountAuthorizedDepositorsNonFungibleBadgeAllOfBadgeTypeEnum,
  xp as AccountAuthorizedDepositorsNonFungibleBadgeAllOfFromJSON,
  fi as AccountAuthorizedDepositorsNonFungibleBadgeAllOfFromJSONTyped,
  qp as AccountAuthorizedDepositorsNonFungibleBadgeAllOfToJSON,
  Ap as AccountAuthorizedDepositorsNonFungibleBadgeBadgeTypeEnum,
  hp as AccountAuthorizedDepositorsNonFungibleBadgeFromJSON,
  Me as AccountAuthorizedDepositorsNonFungibleBadgeFromJSONTyped,
  li as AccountAuthorizedDepositorsNonFungibleBadgeToJSON,
  Mp as AccountAuthorizedDepositorsResourceBadgeAllOfBadgeTypeEnum,
  Bp as AccountAuthorizedDepositorsResourceBadgeAllOfFromJSON,
  mi as AccountAuthorizedDepositorsResourceBadgeAllOfFromJSONTyped,
  Kp as AccountAuthorizedDepositorsResourceBadgeAllOfToJSON,
  kp as AccountAuthorizedDepositorsResourceBadgeBadgeTypeEnum,
  vp as AccountAuthorizedDepositorsResourceBadgeFromJSON,
  Ue as AccountAuthorizedDepositorsResourceBadgeFromJSONTyped,
  si as AccountAuthorizedDepositorsResourceBadgeToJSON,
  Gp as AccountAuthorizedDepositorsResponseItemBaseFromJSON,
  pi as AccountAuthorizedDepositorsResponseItemBaseFromJSONTyped,
  Hp as AccountAuthorizedDepositorsResponseItemBaseToJSON,
  le as AccountAuthorizedDepositorsResponseItemFromJSON,
  ci as AccountAuthorizedDepositorsResponseItemFromJSONTyped,
  se as AccountAuthorizedDepositorsResponseItemToJSON,
  zp as AccountDefaultDepositRule,
  gi as AccountDefaultDepositRuleFromJSON,
  yi as AccountDefaultDepositRuleFromJSONTyped,
  Wp as AccountDefaultDepositRuleToJSON,
  Ke as AccountDepositPreValidationDecidingFactorsFromJSON,
  Fi as AccountDepositPreValidationDecidingFactorsFromJSONTyped,
  Si as AccountDepositPreValidationDecidingFactorsResourceSpecificDetailsItemFromJSON,
  Ni as AccountDepositPreValidationDecidingFactorsResourceSpecificDetailsItemFromJSONTyped,
  bi as AccountDepositPreValidationDecidingFactorsResourceSpecificDetailsItemToJSON,
  Le as AccountDepositPreValidationDecidingFactorsToJSON,
  tg as AccountDepositPreValidationNonFungibleBadgeAllOfBadgeTypeEnum,
  ng as AccountDepositPreValidationNonFungibleBadgeAllOfFromJSON,
  Ri as AccountDepositPreValidationNonFungibleBadgeAllOfFromJSONTyped,
  ig as AccountDepositPreValidationNonFungibleBadgeAllOfToJSON,
  Yp as AccountDepositPreValidationNonFungibleBadgeBadgeTypeEnum,
  eg as AccountDepositPreValidationNonFungibleBadgeFromJSON,
  Ge as AccountDepositPreValidationNonFungibleBadgeFromJSONTyped,
  Ai as AccountDepositPreValidationNonFungibleBadgeToJSON,
  dg as AccountDepositPreValidationRequestAllOfFromJSON,
  Ji as AccountDepositPreValidationRequestAllOfFromJSONTyped,
  _g as AccountDepositPreValidationRequestAllOfToJSON,
  sg as AccountDepositPreValidationRequestFromJSON,
  Ti as AccountDepositPreValidationRequestFromJSONTyped,
  vi as AccountDepositPreValidationRequestToJSON,
  fg as AccountDepositPreValidationResourceBadgeAllOfBadgeTypeEnum,
  pg as AccountDepositPreValidationResourceBadgeAllOfFromJSON,
  Ii as AccountDepositPreValidationResourceBadgeAllOfFromJSONTyped,
  gg as AccountDepositPreValidationResourceBadgeAllOfToJSON,
  ag as AccountDepositPreValidationResourceBadgeBadgeTypeEnum,
  ug as AccountDepositPreValidationResourceBadgeFromJSON,
  He as AccountDepositPreValidationResourceBadgeFromJSONTyped,
  hi as AccountDepositPreValidationResourceBadgeToJSON,
  $e as AccountDepositPreValidationResourceSpecificBehaviourItemFromJSON,
  Vi as AccountDepositPreValidationResourceSpecificBehaviourItemFromJSONTyped,
  Xe as AccountDepositPreValidationResourceSpecificBehaviourItemToJSON,
  Fg as AccountDepositPreValidationResponseAllOfFromJSON,
  Ei as AccountDepositPreValidationResponseAllOfFromJSONTyped,
  Ag as AccountDepositPreValidationResponseAllOfToJSON,
  Pi as AccountDepositPreValidationResponseFromJSON,
  Di as AccountDepositPreValidationResponseFromJSONTyped,
  Ng as AccountDepositPreValidationResponseToJSON,
  Ze as AccountLockerAddressFromJSON,
  Ci as AccountLockerAddressFromJSONTyped,
  Qe as AccountLockerAddressToJSON,
  Ig as AccountLockerNotFoundErrorAllOfFromJSON,
  qi as AccountLockerNotFoundErrorAllOfFromJSONTyped,
  Vg as AccountLockerNotFoundErrorAllOfToJSON,
  vg as AccountLockerNotFoundErrorAllOfTypeEnum,
  Tg as AccountLockerNotFoundErrorFromJSON,
  Ye as AccountLockerNotFoundErrorFromJSONTyped,
  xi as AccountLockerNotFoundErrorToJSON,
  hg as AccountLockerNotFoundErrorTypeEnum,
  Kg as AccountLockerVaultCollectionAllOfFromJSON,
  Li as AccountLockerVaultCollectionAllOfFromJSONTyped,
  Lg as AccountLockerVaultCollectionAllOfToJSON,
  Mg as AccountLockerVaultCollectionFromJSON,
  Ki as AccountLockerVaultCollectionFromJSONTyped,
  Wg as AccountLockerVaultCollectionItemBaseFromJSON,
  zi as AccountLockerVaultCollectionItemBaseFromJSONTyped,
  $g as AccountLockerVaultCollectionItemBaseToJSON,
  ce as AccountLockerVaultCollectionItemFromJSON,
  Bi as AccountLockerVaultCollectionItemFromJSONTyped,
  Qg as AccountLockerVaultCollectionItemFungibleAllOfFromJSON,
  Wi as AccountLockerVaultCollectionItemFungibleAllOfFromJSONTyped,
  Yg as AccountLockerVaultCollectionItemFungibleAllOfToJSON,
  Xg as AccountLockerVaultCollectionItemFungibleAllOfTypeEnum,
  Dg as AccountLockerVaultCollectionItemFungibleFromJSON,
  je as AccountLockerVaultCollectionItemFungibleFromJSONTyped,
  Mi as AccountLockerVaultCollectionItemFungibleToJSON,
  wg as AccountLockerVaultCollectionItemFungibleTypeEnum,
  ty as AccountLockerVaultCollectionItemNonFungibleAllOfFromJSON,
  $i as AccountLockerVaultCollectionItemNonFungibleAllOfFromJSONTyped,
  ry as AccountLockerVaultCollectionItemNonFungibleAllOfToJSON,
  jg as AccountLockerVaultCollectionItemNonFungibleAllOfTypeEnum,
  xg as AccountLockerVaultCollectionItemNonFungibleFromJSON,
  et as AccountLockerVaultCollectionItemNonFungibleFromJSONTyped,
  Ui as AccountLockerVaultCollectionItemNonFungibleToJSON,
  Eg as AccountLockerVaultCollectionItemNonFungibleTypeEnum,
  de as AccountLockerVaultCollectionItemToJSON,
  Gg as AccountLockerVaultCollectionItemType,
  Gi as AccountLockerVaultCollectionItemTypeFromJSON,
  Hi as AccountLockerVaultCollectionItemTypeFromJSONTyped,
  Hg as AccountLockerVaultCollectionItemTypeToJSON,
  Ug as AccountLockerVaultCollectionToJSON,
  $p as AccountResourcePreferenceRule,
  Be as AccountResourcePreferenceRuleFromJSON,
  Oi as AccountResourcePreferenceRuleFromJSONTyped,
  Xp as AccountResourcePreferenceRuleToJSON,
  ly as AccountResourcePreferencesCollectionAllOfFromJSON,
  Qi as AccountResourcePreferencesCollectionAllOfFromJSONTyped,
  sy as AccountResourcePreferencesCollectionAllOfToJSON,
  ay as AccountResourcePreferencesCollectionFromJSON,
  Zi as AccountResourcePreferencesCollectionFromJSONTyped,
  oy as AccountResourcePreferencesCollectionToJSON,
  _e as AccountResourcePreferencesResponseItemFromJSON,
  Xi as AccountResourcePreferencesResponseItemFromJSONTyped,
  fe as AccountResourcePreferencesResponseItemToJSON,
  _y as AtLedgerStateMixinFromJSON,
  ji as AtLedgerStateMixinFromJSONTyped,
  fy as AtLedgerStateMixinToJSON,
  ni as BASE_PATH,
  w as BaseAPI,
  Sp as BlobApiResponse,
  ta as BlueprintMethodRoyaltyFromJSON,
  ra as BlueprintMethodRoyaltyFromJSONTyped,
  na as BlueprintMethodRoyaltyToJSON,
  ia as BlueprintRoyaltyConfigFromJSON,
  aa as BlueprintRoyaltyConfigFromJSONTyped,
  oa as BlueprintRoyaltyConfigToJSON,
  pp as COLLECTION_FORMATS,
  j as CommittedTransactionInfoFromJSON,
  to as CommittedTransactionInfoFromJSONTyped,
  ee as CommittedTransactionInfoToJSON,
  io as ComponentEntityRoleAssignmentEntryAssignmentFromJSON,
  ao as ComponentEntityRoleAssignmentEntryAssignmentFromJSONTyped,
  oo as ComponentEntityRoleAssignmentEntryAssignmentToJSON,
  co as ComponentEntityRoleAssignmentEntryFromJSON,
  _o as ComponentEntityRoleAssignmentEntryFromJSONTyped,
  fo as ComponentEntityRoleAssignmentEntryToJSON,
  R as ComponentEntityRoleAssignmentsFromJSON,
  mo as ComponentEntityRoleAssignmentsFromJSONTyped,
  h as ComponentEntityRoleAssignmentsToJSON,
  po as ComponentMethodRoyaltyFromJSON,
  go as ComponentMethodRoyaltyFromJSONTyped,
  yo as ComponentMethodRoyaltyToJSON,
  vt as ComponentRoyaltyConfigFromJSON,
  Oo as ComponentRoyaltyConfigFromJSONTyped,
  Jt as ComponentRoyaltyConfigToJSON,
  Ee as Configuration,
  rS as CursorLimitMixinFromJSON,
  So as CursorLimitMixinFromJSONTyped,
  nS as CursorLimitMixinToJSON,
  ii as DefaultConfig,
  sb as EntityMetadataCollectionAllOfFromJSON,
  du as EntityMetadataCollectionAllOfFromJSONTyped,
  cb as EntityMetadataCollectionAllOfToJSON,
  b as EntityMetadataCollectionFromJSON,
  cu as EntityMetadataCollectionFromJSONTyped,
  F as EntityMetadataCollectionToJSON,
  me as EntityMetadataItemFromJSON,
  su as EntityMetadataItemFromJSONTyped,
  pe as EntityMetadataItemToJSON,
  _b as EntityMetadataItemValueAllOfFromJSON,
  _u as EntityMetadataItemValueAllOfFromJSONTyped,
  fb as EntityMetadataItemValueAllOfToJSON,
  ou as EntityMetadataItemValueFromJSON,
  uu as EntityMetadataItemValueFromJSONTyped,
  lu as EntityMetadataItemValueToJSON,
  Sb as EntityNotFoundErrorAllOfFromJSON,
  mu as EntityNotFoundErrorAllOfFromJSONTyped,
  Nb as EntityNotFoundErrorAllOfToJSON,
  yb as EntityNotFoundErrorAllOfTypeEnum,
  gb as EntityNotFoundErrorFromJSON,
  gr as EntityNotFoundErrorFromJSONTyped,
  fu as EntityNotFoundErrorToJSON,
  mb as EntityNotFoundErrorTypeEnum,
  Rb as EntitySchemaCollectionAllOfFromJSON,
  yu as EntitySchemaCollectionAllOfFromJSONTyped,
  hb as EntitySchemaCollectionAllOfToJSON,
  yr as EntitySchemaCollectionFromJSON,
  gu as EntitySchemaCollectionFromJSONTyped,
  ge as EntitySchemaCollectionItemFromJSON,
  pu as EntitySchemaCollectionItemFromJSONTyped,
  ye as EntitySchemaCollectionItemToJSON,
  Or as EntitySchemaCollectionToJSON,
  zb as ErrorResponseFromJSON,
  vu as ErrorResponseFromJSONTyped,
  Wb as ErrorResponseToJSON,
  $a as EventsItemFromJSON,
  Xa as EventsItemFromJSONTyped,
  Za as EventsItemToJSON,
  bC as ExtensionsApi,
  Xb as FromLedgerStateMixinFromJSON,
  Ju as FromLedgerStateMixinFromJSONTyped,
  Zb as FromLedgerStateMixinToJSON,
  u0 as FungibleResourcesCollectionAllOfFromJSON,
  qu as FungibleResourcesCollectionAllOfFromJSONTyped,
  l0 as FungibleResourcesCollectionAllOfToJSON,
  Eu as FungibleResourcesCollectionFromJSON,
  Cu as FungibleResourcesCollectionFromJSONTyped,
  d0 as FungibleResourcesCollectionItemBaseFromJSON,
  Bu as FungibleResourcesCollectionItemBaseFromJSONTyped,
  _0 as FungibleResourcesCollectionItemBaseToJSON,
  Oe as FungibleResourcesCollectionItemFromJSON,
  Du as FungibleResourcesCollectionItemFromJSONTyped,
  Qb as FungibleResourcesCollectionItemGloballyAggregatedAggregationLevelEnum,
  f0 as FungibleResourcesCollectionItemGloballyAggregatedAllOfAggregationLevelEnum,
  p0 as FungibleResourcesCollectionItemGloballyAggregatedAllOfFromJSON,
  Ku as FungibleResourcesCollectionItemGloballyAggregatedAllOfFromJSONTyped,
  g0 as FungibleResourcesCollectionItemGloballyAggregatedAllOfToJSON,
  jb as FungibleResourcesCollectionItemGloballyAggregatedFromJSON,
  Tr as FungibleResourcesCollectionItemGloballyAggregatedFromJSONTyped,
  Iu as FungibleResourcesCollectionItemGloballyAggregatedToJSON,
  Se as FungibleResourcesCollectionItemToJSON,
  r0 as FungibleResourcesCollectionItemVaultAggregatedAggregationLevelEnum,
  y0 as FungibleResourcesCollectionItemVaultAggregatedAllOfAggregationLevelEnum,
  S0 as FungibleResourcesCollectionItemVaultAggregatedAllOfFromJSON,
  Lu as FungibleResourcesCollectionItemVaultAggregatedAllOfFromJSONTyped,
  N0 as FungibleResourcesCollectionItemVaultAggregatedAllOfToJSON,
  i0 as FungibleResourcesCollectionItemVaultAggregatedFromJSON,
  Ir as FungibleResourcesCollectionItemVaultAggregatedFromJSONTyped,
  Pu as FungibleResourcesCollectionItemVaultAggregatedToJSON,
  F0 as FungibleResourcesCollectionItemVaultAggregatedVaultAllOfFromJSON,
  Gu as FungibleResourcesCollectionItemVaultAggregatedVaultAllOfFromJSONTyped,
  A0 as FungibleResourcesCollectionItemVaultAggregatedVaultAllOfToJSON,
  vr as FungibleResourcesCollectionItemVaultAggregatedVaultFromJSON,
  wu as FungibleResourcesCollectionItemVaultAggregatedVaultFromJSONTyped,
  B as FungibleResourcesCollectionItemVaultAggregatedVaultItemFromJSON,
  Vu as FungibleResourcesCollectionItemVaultAggregatedVaultItemFromJSONTyped,
  K as FungibleResourcesCollectionItemVaultAggregatedVaultItemToJSON,
  Jr as FungibleResourcesCollectionItemVaultAggregatedVaultToJSON,
  xu as FungibleResourcesCollectionToJSON,
  ue as GatewayApiClient,
  h0 as GatewayErrorBaseFromJSON,
  Hu as GatewayErrorBaseFromJSONTyped,
  k0 as GatewayErrorBaseToJSON,
  hu as GatewayErrorFromJSON,
  ku as GatewayErrorFromJSONTyped,
  Tu as GatewayErrorToJSON,
  v0 as GatewayInfoResponseKnownTargetFromJSON,
  zu as GatewayInfoResponseKnownTargetFromJSONTyped,
  J0 as GatewayInfoResponseKnownTargetToJSON,
  Vr as GatewayInfoResponseReleaseInfoFromJSON,
  Wu as GatewayInfoResponseReleaseInfoFromJSONTyped,
  wr as GatewayInfoResponseReleaseInfoToJSON,
  D0 as GatewayStatusResponseAllOfFromJSON,
  Zu as GatewayStatusResponseAllOfFromJSONTyped,
  E0 as GatewayStatusResponseAllOfToJSON,
  $u as GatewayStatusResponseFromJSON,
  Xu as GatewayStatusResponseFromJSONTyped,
  w0 as GatewayStatusResponseToJSON,
  q0 as InternalServerErrorAllOfFromJSON,
  Qu as InternalServerErrorAllOfFromJSONTyped,
  M0 as InternalServerErrorAllOfToJSON,
  C0 as InternalServerErrorAllOfTypeEnum,
  vb as InternalServerErrorFromJSON,
  Sr as InternalServerErrorFromJSONTyped,
  Ou as InternalServerErrorToJSON,
  kb as InternalServerErrorTypeEnum,
  K0 as InvalidEntityErrorAllOfFromJSON,
  Yu as InvalidEntityErrorAllOfFromJSONTyped,
  L0 as InvalidEntityErrorAllOfToJSON,
  U0 as InvalidEntityErrorAllOfTypeEnum,
  Vb as InvalidEntityErrorFromJSON,
  Nr as InvalidEntityErrorFromJSONTyped,
  Su as InvalidEntityErrorToJSON,
  Jb as InvalidEntityErrorTypeEnum,
  z0 as InvalidRequestErrorAllOfFromJSON,
  ju as InvalidRequestErrorAllOfFromJSONTyped,
  W0 as InvalidRequestErrorAllOfToJSON,
  G0 as InvalidRequestErrorAllOfTypeEnum,
  Eb as InvalidRequestErrorFromJSON,
  Ar as InvalidRequestErrorFromJSONTyped,
  bu as InvalidRequestErrorToJSON,
  Pb as InvalidRequestErrorTypeEnum,
  Z0 as InvalidTransactionErrorAllOfFromJSON,
  el as InvalidTransactionErrorAllOfFromJSONTyped,
  Q0 as InvalidTransactionErrorAllOfToJSON,
  $0 as InvalidTransactionErrorAllOfTypeEnum,
  qb as InvalidTransactionErrorFromJSON,
  Rr as InvalidTransactionErrorFromJSONTyped,
  Fu as InvalidTransactionErrorToJSON,
  Cb as InvalidTransactionErrorTypeEnum,
  l as JSONApiResponse,
  d as LedgerStateFromJSON,
  wi as LedgerStateFromJSONTyped,
  j0 as LedgerStateMixinFromJSON,
  tl as LedgerStateMixinFromJSONTyped,
  eF as LedgerStateMixinToJSON,
  f as LedgerStateSelectorFromJSON,
  Yi as LedgerStateSelectorFromJSONTyped,
  m as LedgerStateSelectorToJSON,
  _ as LedgerStateToJSON,
  Oy as ManifestClass,
  nt as ManifestClassFromJSON,
  ua as ManifestClassFromJSONTyped,
  la as ManifestClassToJSON,
  nF as MetadataBoolArrayValueAllOfFromJSON,
  rl as MetadataBoolArrayValueAllOfFromJSONTyped,
  iF as MetadataBoolArrayValueAllOfToJSON,
  tF as MetadataBoolArrayValueAllOfTypeEnum,
  oS as MetadataBoolArrayValueFromJSON,
  It as MetadataBoolArrayValueFromJSONTyped,
  No as MetadataBoolArrayValueToJSON,
  iS as MetadataBoolArrayValueTypeEnum,
  uF as MetadataBoolValueAllOfFromJSON,
  nl as MetadataBoolValueAllOfFromJSONTyped,
  lF as MetadataBoolValueAllOfToJSON,
  aF as MetadataBoolValueAllOfTypeEnum,
  sS as MetadataBoolValueFromJSON,
  Vt as MetadataBoolValueFromJSONTyped,
  bo as MetadataBoolValueToJSON,
  uS as MetadataBoolValueTypeEnum,
  dF as MetadataDecimalArrayValueAllOfFromJSON,
  il as MetadataDecimalArrayValueAllOfFromJSONTyped,
  _F as MetadataDecimalArrayValueAllOfToJSON,
  sF as MetadataDecimalArrayValueAllOfTypeEnum,
  _S as MetadataDecimalArrayValueFromJSON,
  wt as MetadataDecimalArrayValueFromJSONTyped,
  Fo as MetadataDecimalArrayValueToJSON,
  cS as MetadataDecimalArrayValueTypeEnum,
  pF as MetadataDecimalValueAllOfFromJSON,
  al as MetadataDecimalValueAllOfFromJSONTyped,
  gF as MetadataDecimalValueAllOfToJSON,
  fF as MetadataDecimalValueAllOfTypeEnum,
  pS as MetadataDecimalValueFromJSON,
  Pt as MetadataDecimalValueFromJSONTyped,
  Ao as MetadataDecimalValueToJSON,
  fS as MetadataDecimalValueTypeEnum,
  SF as MetadataGlobalAddressArrayValueAllOfFromJSON,
  ol as MetadataGlobalAddressArrayValueAllOfFromJSONTyped,
  NF as MetadataGlobalAddressArrayValueAllOfToJSON,
  yF as MetadataGlobalAddressArrayValueAllOfTypeEnum,
  OS as MetadataGlobalAddressArrayValueFromJSON,
  Dt as MetadataGlobalAddressArrayValueFromJSONTyped,
  Ro as MetadataGlobalAddressArrayValueToJSON,
  gS as MetadataGlobalAddressArrayValueTypeEnum,
  AF as MetadataGlobalAddressValueAllOfFromJSON,
  ul as MetadataGlobalAddressValueAllOfFromJSONTyped,
  RF as MetadataGlobalAddressValueAllOfToJSON,
  bF as MetadataGlobalAddressValueAllOfTypeEnum,
  bS as MetadataGlobalAddressValueFromJSON,
  Et as MetadataGlobalAddressValueFromJSONTyped,
  ho as MetadataGlobalAddressValueToJSON,
  SS as MetadataGlobalAddressValueTypeEnum,
  TF as MetadataI32ArrayValueAllOfFromJSON,
  ll as MetadataI32ArrayValueAllOfFromJSONTyped,
  vF as MetadataI32ArrayValueAllOfToJSON,
  hF as MetadataI32ArrayValueAllOfTypeEnum,
  RS as MetadataI32ArrayValueFromJSON,
  Ct as MetadataI32ArrayValueFromJSONTyped,
  ko as MetadataI32ArrayValueToJSON,
  FS as MetadataI32ArrayValueTypeEnum,
  VF as MetadataI32ValueAllOfFromJSON,
  sl as MetadataI32ValueAllOfFromJSONTyped,
  wF as MetadataI32ValueAllOfToJSON,
  JF as MetadataI32ValueAllOfTypeEnum,
  TS as MetadataI32ValueFromJSON,
  xt as MetadataI32ValueFromJSONTyped,
  To as MetadataI32ValueToJSON,
  hS as MetadataI32ValueTypeEnum,
  EF as MetadataI64ArrayValueAllOfFromJSON,
  cl as MetadataI64ArrayValueAllOfFromJSONTyped,
  CF as MetadataI64ArrayValueAllOfToJSON,
  PF as MetadataI64ArrayValueAllOfTypeEnum,
  IS as MetadataI64ArrayValueFromJSON,
  qt as MetadataI64ArrayValueFromJSONTyped,
  vo as MetadataI64ArrayValueToJSON,
  vS as MetadataI64ArrayValueTypeEnum,
  MF as MetadataI64ValueAllOfFromJSON,
  dl as MetadataI64ValueAllOfFromJSONTyped,
  UF as MetadataI64ValueAllOfToJSON,
  xF as MetadataI64ValueAllOfTypeEnum,
  PS as MetadataI64ValueFromJSON,
  Mt as MetadataI64ValueFromJSONTyped,
  Jo as MetadataI64ValueToJSON,
  VS as MetadataI64ValueTypeEnum,
  LF as MetadataInstantArrayValueAllOfFromJSON,
  _l as MetadataInstantArrayValueAllOfFromJSONTyped,
  GF as MetadataInstantArrayValueAllOfToJSON,
  BF as MetadataInstantArrayValueAllOfTypeEnum,
  CS as MetadataInstantArrayValueFromJSON,
  Ut as MetadataInstantArrayValueFromJSONTyped,
  Io as MetadataInstantArrayValueToJSON,
  DS as MetadataInstantArrayValueTypeEnum,
  WF as MetadataInstantValueAllOfFromJSON,
  fl as MetadataInstantValueAllOfFromJSONTyped,
  $F as MetadataInstantValueAllOfToJSON,
  HF as MetadataInstantValueAllOfTypeEnum,
  MS as MetadataInstantValueFromJSON,
  Bt as MetadataInstantValueFromJSONTyped,
  Vo as MetadataInstantValueToJSON,
  xS as MetadataInstantValueTypeEnum,
  QF as MetadataNonFungibleGlobalIdArrayValueAllOfFromJSON,
  ml as MetadataNonFungibleGlobalIdArrayValueAllOfFromJSONTyped,
  YF as MetadataNonFungibleGlobalIdArrayValueAllOfToJSON,
  XF as MetadataNonFungibleGlobalIdArrayValueAllOfTypeEnum,
  Kt as MetadataNonFungibleGlobalIdArrayValueAllOfValuesFromJSON,
  wo as MetadataNonFungibleGlobalIdArrayValueAllOfValuesFromJSONTyped,
  Lt as MetadataNonFungibleGlobalIdArrayValueAllOfValuesToJSON,
  LS as MetadataNonFungibleGlobalIdArrayValueFromJSON,
  Gt as MetadataNonFungibleGlobalIdArrayValueFromJSONTyped,
  Po as MetadataNonFungibleGlobalIdArrayValueToJSON,
  BS as MetadataNonFungibleGlobalIdArrayValueTypeEnum,
  tA as MetadataNonFungibleGlobalIdValueAllOfFromJSON,
  pl as MetadataNonFungibleGlobalIdValueAllOfFromJSONTyped,
  rA as MetadataNonFungibleGlobalIdValueAllOfToJSON,
  jF as MetadataNonFungibleGlobalIdValueAllOfTypeEnum,
  zS as MetadataNonFungibleGlobalIdValueFromJSON,
  Ht as MetadataNonFungibleGlobalIdValueFromJSONTyped,
  Do as MetadataNonFungibleGlobalIdValueToJSON,
  GS as MetadataNonFungibleGlobalIdValueTypeEnum,
  aA as MetadataNonFungibleLocalIdArrayValueAllOfFromJSON,
  gl as MetadataNonFungibleLocalIdArrayValueAllOfFromJSONTyped,
  oA as MetadataNonFungibleLocalIdArrayValueAllOfToJSON,
  nA as MetadataNonFungibleLocalIdArrayValueAllOfTypeEnum,
  XS as MetadataNonFungibleLocalIdArrayValueFromJSON,
  zt as MetadataNonFungibleLocalIdArrayValueFromJSONTyped,
  Eo as MetadataNonFungibleLocalIdArrayValueToJSON,
  WS as MetadataNonFungibleLocalIdArrayValueTypeEnum,
  sA as MetadataNonFungibleLocalIdValueAllOfFromJSON,
  yl as MetadataNonFungibleLocalIdValueAllOfFromJSONTyped,
  cA as MetadataNonFungibleLocalIdValueAllOfToJSON,
  uA as MetadataNonFungibleLocalIdValueAllOfTypeEnum,
  YS as MetadataNonFungibleLocalIdValueFromJSON,
  Wt as MetadataNonFungibleLocalIdValueFromJSONTyped,
  Co as MetadataNonFungibleLocalIdValueToJSON,
  ZS as MetadataNonFungibleLocalIdValueTypeEnum,
  fA as MetadataOriginArrayValueAllOfFromJSON,
  Ol as MetadataOriginArrayValueAllOfFromJSONTyped,
  mA as MetadataOriginArrayValueAllOfToJSON,
  dA as MetadataOriginArrayValueAllOfTypeEnum,
  tN as MetadataOriginArrayValueFromJSON,
  $t as MetadataOriginArrayValueFromJSONTyped,
  xo as MetadataOriginArrayValueToJSON,
  jS as MetadataOriginArrayValueTypeEnum,
  yA as MetadataOriginValueAllOfFromJSON,
  Sl as MetadataOriginValueAllOfFromJSONTyped,
  OA as MetadataOriginValueAllOfToJSON,
  pA as MetadataOriginValueAllOfTypeEnum,
  iN as MetadataOriginValueFromJSON,
  Xt as MetadataOriginValueFromJSONTyped,
  qo as MetadataOriginValueToJSON,
  rN as MetadataOriginValueTypeEnum,
  bA as MetadataPublicKeyArrayValueAllOfFromJSON,
  Nl as MetadataPublicKeyArrayValueAllOfFromJSONTyped,
  FA as MetadataPublicKeyArrayValueAllOfToJSON,
  SA as MetadataPublicKeyArrayValueAllOfTypeEnum,
  fN as MetadataPublicKeyArrayValueFromJSON,
  Yt as MetadataPublicKeyArrayValueFromJSONTyped,
  Ko as MetadataPublicKeyArrayValueToJSON,
  dN as MetadataPublicKeyArrayValueTypeEnum,
  hA as MetadataPublicKeyHashArrayValueAllOfFromJSON,
  bl as MetadataPublicKeyHashArrayValueAllOfFromJSONTyped,
  kA as MetadataPublicKeyHashArrayValueAllOfToJSON,
  AA as MetadataPublicKeyHashArrayValueAllOfTypeEnum,
  FN as MetadataPublicKeyHashArrayValueFromJSON,
  tr as MetadataPublicKeyHashArrayValueFromJSONTyped,
  zo as MetadataPublicKeyHashArrayValueToJSON,
  NN as MetadataPublicKeyHashArrayValueTypeEnum,
  JA as MetadataPublicKeyHashValueAllOfFromJSON,
  Fl as MetadataPublicKeyHashValueAllOfFromJSONTyped,
  IA as MetadataPublicKeyHashValueAllOfToJSON,
  TA as MetadataPublicKeyHashValueAllOfTypeEnum,
  hN as MetadataPublicKeyHashValueFromJSON,
  rr as MetadataPublicKeyHashValueFromJSONTyped,
  Wo as MetadataPublicKeyHashValueToJSON,
  AN as MetadataPublicKeyHashValueTypeEnum,
  PA as MetadataPublicKeyValueAllOfFromJSON,
  Al as MetadataPublicKeyValueAllOfFromJSONTyped,
  DA as MetadataPublicKeyValueAllOfToJSON,
  VA as MetadataPublicKeyValueAllOfTypeEnum,
  vN as MetadataPublicKeyValueFromJSON,
  nr as MetadataPublicKeyValueFromJSONTyped,
  $o as MetadataPublicKeyValueToJSON,
  kN as MetadataPublicKeyValueTypeEnum,
  xA as MetadataStringArrayValueAllOfFromJSON,
  Rl as MetadataStringArrayValueAllOfFromJSONTyped,
  qA as MetadataStringArrayValueAllOfToJSON,
  EA as MetadataStringArrayValueAllOfTypeEnum,
  VN as MetadataStringArrayValueFromJSON,
  ir as MetadataStringArrayValueFromJSONTyped,
  Xo as MetadataStringArrayValueToJSON,
  JN as MetadataStringArrayValueTypeEnum,
  BA as MetadataStringValueAllOfFromJSON,
  hl as MetadataStringValueAllOfFromJSONTyped,
  KA as MetadataStringValueAllOfToJSON,
  MA as MetadataStringValueAllOfTypeEnum,
  DN as MetadataStringValueFromJSON,
  ar as MetadataStringValueFromJSONTyped,
  Zo as MetadataStringValueToJSON,
  wN as MetadataStringValueTypeEnum,
  zA as MetadataTypedValueBaseFromJSON,
  vl as MetadataTypedValueBaseFromJSONTyped,
  WA as MetadataTypedValueBaseToJSON,
  mr as MetadataTypedValueFromJSON,
  au as MetadataTypedValueFromJSONTyped,
  pr as MetadataTypedValueToJSON,
  ZA as MetadataU32ArrayValueAllOfFromJSON,
  Jl as MetadataU32ArrayValueAllOfFromJSONTyped,
  QA as MetadataU32ArrayValueAllOfToJSON,
  $A as MetadataU32ArrayValueAllOfTypeEnum,
  xN as MetadataU32ArrayValueFromJSON,
  or as MetadataU32ArrayValueFromJSONTyped,
  Qo as MetadataU32ArrayValueToJSON,
  EN as MetadataU32ArrayValueTypeEnum,
  eR as MetadataU32ValueAllOfFromJSON,
  Il as MetadataU32ValueAllOfFromJSONTyped,
  tR as MetadataU32ValueAllOfToJSON,
  YA as MetadataU32ValueAllOfTypeEnum,
  UN as MetadataU32ValueFromJSON,
  ur as MetadataU32ValueFromJSONTyped,
  Yo as MetadataU32ValueToJSON,
  qN as MetadataU32ValueTypeEnum,
  iR as MetadataU64ArrayValueAllOfFromJSON,
  Vl as MetadataU64ArrayValueAllOfFromJSONTyped,
  aR as MetadataU64ArrayValueAllOfToJSON,
  rR as MetadataU64ArrayValueAllOfTypeEnum,
  LN as MetadataU64ArrayValueFromJSON,
  lr as MetadataU64ArrayValueFromJSONTyped,
  jo as MetadataU64ArrayValueToJSON,
  BN as MetadataU64ArrayValueTypeEnum,
  lR as MetadataU64ValueAllOfFromJSON,
  wl as MetadataU64ValueAllOfFromJSONTyped,
  sR as MetadataU64ValueAllOfToJSON,
  oR as MetadataU64ValueAllOfTypeEnum,
  zN as MetadataU64ValueFromJSON,
  sr as MetadataU64ValueFromJSONTyped,
  eu as MetadataU64ValueToJSON,
  GN as MetadataU64ValueTypeEnum,
  _R as MetadataU8ArrayValueAllOfFromJSON,
  Pl as MetadataU8ArrayValueAllOfFromJSONTyped,
  fR as MetadataU8ArrayValueAllOfToJSON,
  cR as MetadataU8ArrayValueAllOfTypeEnum,
  XN as MetadataU8ArrayValueFromJSON,
  cr as MetadataU8ArrayValueFromJSONTyped,
  tu as MetadataU8ArrayValueToJSON,
  WN as MetadataU8ArrayValueTypeEnum,
  gR as MetadataU8ValueAllOfFromJSON,
  Dl as MetadataU8ValueAllOfFromJSONTyped,
  yR as MetadataU8ValueAllOfToJSON,
  mR as MetadataU8ValueAllOfTypeEnum,
  YN as MetadataU8ValueFromJSON,
  dr as MetadataU8ValueFromJSONTyped,
  ru as MetadataU8ValueToJSON,
  ZN as MetadataU8ValueTypeEnum,
  NR as MetadataUrlArrayValueAllOfFromJSON,
  El as MetadataUrlArrayValueAllOfFromJSONTyped,
  bR as MetadataUrlArrayValueAllOfToJSON,
  OR as MetadataUrlArrayValueAllOfTypeEnum,
  tb as MetadataUrlArrayValueFromJSON,
  _r as MetadataUrlArrayValueFromJSONTyped,
  nu as MetadataUrlArrayValueToJSON,
  jN as MetadataUrlArrayValueTypeEnum,
  RR as MetadataUrlValueAllOfFromJSON,
  Cl as MetadataUrlValueAllOfFromJSONTyped,
  hR as MetadataUrlValueAllOfToJSON,
  FR as MetadataUrlValueAllOfTypeEnum,
  ib as MetadataUrlValueFromJSON,
  fr as MetadataUrlValueFromJSONTyped,
  iu as MetadataUrlValueToJSON,
  rb as MetadataUrlValueTypeEnum,
  LA as MetadataValueType,
  kl as MetadataValueTypeFromJSON,
  Tl as MetadataValueTypeFromJSONTyped,
  GA as MetadataValueTypeToJSON,
  VR as NativeResourceAccessControllerRecoveryBadgeValueAllOfFromJSON,
  ql as NativeResourceAccessControllerRecoveryBadgeValueAllOfFromJSONTyped,
  JR as NativeResourceAccessControllerRecoveryBadgeValueAllOfKindEnum,
  wR as NativeResourceAccessControllerRecoveryBadgeValueAllOfToJSON,
  vR as NativeResourceAccessControllerRecoveryBadgeValueFromJSON,
  Pr as NativeResourceAccessControllerRecoveryBadgeValueFromJSONTyped,
  kR as NativeResourceAccessControllerRecoveryBadgeValueKindEnum,
  xl as NativeResourceAccessControllerRecoveryBadgeValueToJSON,
  qR as NativeResourceAccountOwnerBadgeValueAllOfFromJSON,
  Ul as NativeResourceAccountOwnerBadgeValueAllOfFromJSONTyped,
  CR as NativeResourceAccountOwnerBadgeValueAllOfKindEnum,
  MR as NativeResourceAccountOwnerBadgeValueAllOfToJSON,
  ER as NativeResourceAccountOwnerBadgeValueFromJSON,
  Dr as NativeResourceAccountOwnerBadgeValueFromJSONTyped,
  PR as NativeResourceAccountOwnerBadgeValueKindEnum,
  Ml as NativeResourceAccountOwnerBadgeValueToJSON,
  wh as NativeResourceDetailsBaseFromJSON,
  as as NativeResourceDetailsBaseFromJSONTyped,
  Ph as NativeResourceDetailsBaseToJSON,
  P as NativeResourceDetailsFromJSON,
  rs as NativeResourceDetailsFromJSONTyped,
  D as NativeResourceDetailsToJSON,
  Ch as NativeResourceEd25519SignatureResourceValueAllOfFromJSON,
  os as NativeResourceEd25519SignatureResourceValueAllOfFromJSONTyped,
  Dh as NativeResourceEd25519SignatureResourceValueAllOfKindEnum,
  xh as NativeResourceEd25519SignatureResourceValueAllOfToJSON,
  KR as NativeResourceEd25519SignatureResourceValueFromJSON,
  Er as NativeResourceEd25519SignatureResourceValueFromJSONTyped,
  UR as NativeResourceEd25519SignatureResourceValueKindEnum,
  Bl as NativeResourceEd25519SignatureResourceValueToJSON,
  Uh as NativeResourceGlobalCallerResourceValueAllOfFromJSON,
  us as NativeResourceGlobalCallerResourceValueAllOfFromJSONTyped,
  qh as NativeResourceGlobalCallerResourceValueAllOfKindEnum,
  Bh as NativeResourceGlobalCallerResourceValueAllOfToJSON,
  HR as NativeResourceGlobalCallerResourceValueFromJSON,
  Cr as NativeResourceGlobalCallerResourceValueFromJSONTyped,
  LR as NativeResourceGlobalCallerResourceValueKindEnum,
  Kl as NativeResourceGlobalCallerResourceValueToJSON,
  Gh as NativeResourceIdentityOwnerBadgeValueAllOfFromJSON,
  ls as NativeResourceIdentityOwnerBadgeValueAllOfFromJSONTyped,
  Kh as NativeResourceIdentityOwnerBadgeValueAllOfKindEnum,
  Hh as NativeResourceIdentityOwnerBadgeValueAllOfToJSON,
  $R as NativeResourceIdentityOwnerBadgeValueFromJSON,
  xr as NativeResourceIdentityOwnerBadgeValueFromJSONTyped,
  zR as NativeResourceIdentityOwnerBadgeValueKindEnum,
  Ll as NativeResourceIdentityOwnerBadgeValueToJSON,
  Jh as NativeResourceKind,
  ns as NativeResourceKindFromJSON,
  is as NativeResourceKindFromJSONTyped,
  Ih as NativeResourceKindToJSON,
  $h as NativeResourceMultiResourcePoolUnitValueAllOfFromJSON,
  ss as NativeResourceMultiResourcePoolUnitValueAllOfFromJSONTyped,
  zh as NativeResourceMultiResourcePoolUnitValueAllOfKindEnum,
  Xh as NativeResourceMultiResourcePoolUnitValueAllOfToJSON,
  YR as NativeResourceMultiResourcePoolUnitValueFromJSON,
  qr as NativeResourceMultiResourcePoolUnitValueFromJSONTyped,
  ZR as NativeResourceMultiResourcePoolUnitValueKindEnum,
  Hl as NativeResourceMultiResourcePoolUnitValueToJSON,
  Yh as NativeResourceOneResourcePoolUnitValueAllOfFromJSON,
  cs as NativeResourceOneResourcePoolUnitValueAllOfFromJSONTyped,
  Zh as NativeResourceOneResourcePoolUnitValueAllOfKindEnum,
  jh as NativeResourceOneResourcePoolUnitValueAllOfToJSON,
  th as NativeResourceOneResourcePoolUnitValueFromJSON,
  Mr as NativeResourceOneResourcePoolUnitValueFromJSONTyped,
  jR as NativeResourceOneResourcePoolUnitValueKindEnum,
  zl as NativeResourceOneResourcePoolUnitValueToJSON,
  rk as NativeResourcePackageOfDirectCallerResourceValueAllOfFromJSON,
  ds as NativeResourcePackageOfDirectCallerResourceValueAllOfFromJSONTyped,
  ek as NativeResourcePackageOfDirectCallerResourceValueAllOfKindEnum,
  nk as NativeResourcePackageOfDirectCallerResourceValueAllOfToJSON,
  ih as NativeResourcePackageOfDirectCallerResourceValueFromJSON,
  Ur as NativeResourcePackageOfDirectCallerResourceValueFromJSONTyped,
  rh as NativeResourcePackageOfDirectCallerResourceValueKindEnum,
  Wl as NativeResourcePackageOfDirectCallerResourceValueToJSON,
  ok as NativeResourcePackageOwnerBadgeValueAllOfFromJSON,
  _s as NativeResourcePackageOwnerBadgeValueAllOfFromJSONTyped,
  ik as NativeResourcePackageOwnerBadgeValueAllOfKindEnum,
  uk as NativeResourcePackageOwnerBadgeValueAllOfToJSON,
  uh as NativeResourcePackageOwnerBadgeValueFromJSON,
  Br as NativeResourcePackageOwnerBadgeValueFromJSONTyped,
  ah as NativeResourcePackageOwnerBadgeValueKindEnum,
  $l as NativeResourcePackageOwnerBadgeValueToJSON,
  T as NativeResourceRedemptionValueItemFromJSON,
  Gl as NativeResourceRedemptionValueItemFromJSONTyped,
  v as NativeResourceRedemptionValueItemToJSON,
  ck as NativeResourceSecp256k1SignatureResourceValueAllOfFromJSON,
  fs as NativeResourceSecp256k1SignatureResourceValueAllOfFromJSONTyped,
  lk as NativeResourceSecp256k1SignatureResourceValueAllOfKindEnum,
  dk as NativeResourceSecp256k1SignatureResourceValueAllOfToJSON,
  ch as NativeResourceSecp256k1SignatureResourceValueFromJSON,
  Kr as NativeResourceSecp256k1SignatureResourceValueFromJSONTyped,
  lh as NativeResourceSecp256k1SignatureResourceValueKindEnum,
  Xl as NativeResourceSecp256k1SignatureResourceValueToJSON,
  mk as NativeResourceSystemExecutionResourceValueAllOfFromJSON,
  ms as NativeResourceSystemExecutionResourceValueAllOfFromJSONTyped,
  _k as NativeResourceSystemExecutionResourceValueAllOfKindEnum,
  pk as NativeResourceSystemExecutionResourceValueAllOfToJSON,
  fh as NativeResourceSystemExecutionResourceValueFromJSON,
  Lr as NativeResourceSystemExecutionResourceValueFromJSONTyped,
  dh as NativeResourceSystemExecutionResourceValueKindEnum,
  Zl as NativeResourceSystemExecutionResourceValueToJSON,
  Ok as NativeResourceTwoResourcePoolUnitValueAllOfFromJSON,
  ps as NativeResourceTwoResourcePoolUnitValueAllOfFromJSONTyped,
  gk as NativeResourceTwoResourcePoolUnitValueAllOfKindEnum,
  Sk as NativeResourceTwoResourcePoolUnitValueAllOfToJSON,
  gh as NativeResourceTwoResourcePoolUnitValueFromJSON,
  Gr as NativeResourceTwoResourcePoolUnitValueFromJSONTyped,
  mh as NativeResourceTwoResourcePoolUnitValueKindEnum,
  Ql as NativeResourceTwoResourcePoolUnitValueToJSON,
  Fk as NativeResourceValidatorClaimNftValueAllOfFromJSON,
  gs as NativeResourceValidatorClaimNftValueAllOfFromJSONTyped,
  Nk as NativeResourceValidatorClaimNftValueAllOfKindEnum,
  Ak as NativeResourceValidatorClaimNftValueAllOfToJSON,
  Sh as NativeResourceValidatorClaimNftValueFromJSON,
  Hr as NativeResourceValidatorClaimNftValueFromJSONTyped,
  yh as NativeResourceValidatorClaimNftValueKindEnum,
  Yl as NativeResourceValidatorClaimNftValueToJSON,
  kk as NativeResourceValidatorLiquidStakeUnitValueAllOfFromJSON,
  ys as NativeResourceValidatorLiquidStakeUnitValueAllOfFromJSONTyped,
  Rk as NativeResourceValidatorLiquidStakeUnitValueAllOfKindEnum,
  Tk as NativeResourceValidatorLiquidStakeUnitValueAllOfToJSON,
  Fh as NativeResourceValidatorLiquidStakeUnitValueFromJSON,
  zr as NativeResourceValidatorLiquidStakeUnitValueFromJSONTyped,
  Nh as NativeResourceValidatorLiquidStakeUnitValueKindEnum,
  jl as NativeResourceValidatorLiquidStakeUnitValueToJSON,
  Ik as NativeResourceValidatorOwnerBadgeValueAllOfFromJSON,
  Os as NativeResourceValidatorOwnerBadgeValueAllOfFromJSONTyped,
  vk as NativeResourceValidatorOwnerBadgeValueAllOfKindEnum,
  Vk as NativeResourceValidatorOwnerBadgeValueAllOfToJSON,
  hh as NativeResourceValidatorOwnerBadgeValueFromJSON,
  Wr as NativeResourceValidatorOwnerBadgeValueFromJSONTyped,
  Ah as NativeResourceValidatorOwnerBadgeValueKindEnum,
  es as NativeResourceValidatorOwnerBadgeValueToJSON,
  Dk as NativeResourceXrdValueAllOfFromJSON,
  Ss as NativeResourceXrdValueAllOfFromJSONTyped,
  wk as NativeResourceXrdValueAllOfKindEnum,
  Ek as NativeResourceXrdValueAllOfToJSON,
  vh as NativeResourceXrdValueFromJSON,
  $r as NativeResourceXrdValueFromJSONTyped,
  kh as NativeResourceXrdValueKindEnum,
  ts as NativeResourceXrdValueToJSON,
  As as NetworkConfigurationResponseFromJSON,
  Rs as NetworkConfigurationResponseFromJSONTyped,
  qk as NetworkConfigurationResponseToJSON,
  Ns as NetworkConfigurationResponseWellKnownAddressesFromJSON,
  bs as NetworkConfigurationResponseWellKnownAddressesFromJSONTyped,
  Fs as NetworkConfigurationResponseWellKnownAddressesToJSON,
  Mk as NonFungibleIdType,
  ne as NonFungibleIdTypeFromJSON,
  hs as NonFungibleIdTypeFromJSONTyped,
  Uk as NonFungibleIdTypeToJSON,
  Lk as NonFungibleIdsCollectionAllOfFromJSON,
  Ts as NonFungibleIdsCollectionAllOfFromJSONTyped,
  Gk as NonFungibleIdsCollectionAllOfToJSON,
  Xr as NonFungibleIdsCollectionFromJSON,
  ks as NonFungibleIdsCollectionFromJSONTyped,
  Zr as NonFungibleIdsCollectionToJSON,
  tT as NonFungibleResourcesCollectionAllOfFromJSON,
  Cs as NonFungibleResourcesCollectionAllOfFromJSONTyped,
  rT as NonFungibleResourcesCollectionAllOfToJSON,
  Ps as NonFungibleResourcesCollectionFromJSON,
  Ds as NonFungibleResourcesCollectionFromJSONTyped,
  iT as NonFungibleResourcesCollectionItemBaseFromJSON,
  xs as NonFungibleResourcesCollectionItemBaseFromJSONTyped,
  aT as NonFungibleResourcesCollectionItemBaseToJSON,
  Ne as NonFungibleResourcesCollectionItemFromJSON,
  ws as NonFungibleResourcesCollectionItemFromJSONTyped,
  Hk as NonFungibleResourcesCollectionItemGloballyAggregatedAggregationLevelEnum,
  oT as NonFungibleResourcesCollectionItemGloballyAggregatedAllOfAggregationLevelEnum,
  lT as NonFungibleResourcesCollectionItemGloballyAggregatedAllOfFromJSON,
  qs as NonFungibleResourcesCollectionItemGloballyAggregatedAllOfFromJSONTyped,
  sT as NonFungibleResourcesCollectionItemGloballyAggregatedAllOfToJSON,
  Wk as NonFungibleResourcesCollectionItemGloballyAggregatedFromJSON,
  Qr as NonFungibleResourcesCollectionItemGloballyAggregatedFromJSONTyped,
  vs as NonFungibleResourcesCollectionItemGloballyAggregatedToJSON,
  be as NonFungibleResourcesCollectionItemToJSON,
  Zk as NonFungibleResourcesCollectionItemVaultAggregatedAggregationLevelEnum,
  cT as NonFungibleResourcesCollectionItemVaultAggregatedAllOfAggregationLevelEnum,
  _T as NonFungibleResourcesCollectionItemVaultAggregatedAllOfFromJSON,
  Ms as NonFungibleResourcesCollectionItemVaultAggregatedAllOfFromJSONTyped,
  fT as NonFungibleResourcesCollectionItemVaultAggregatedAllOfToJSON,
  Yk as NonFungibleResourcesCollectionItemVaultAggregatedFromJSON,
  en as NonFungibleResourcesCollectionItemVaultAggregatedFromJSONTyped,
  Vs as NonFungibleResourcesCollectionItemVaultAggregatedToJSON,
  pT as NonFungibleResourcesCollectionItemVaultAggregatedVaultAllOfFromJSON,
  Us as NonFungibleResourcesCollectionItemVaultAggregatedVaultAllOfFromJSONTyped,
  gT as NonFungibleResourcesCollectionItemVaultAggregatedVaultAllOfToJSON,
  Yr as NonFungibleResourcesCollectionItemVaultAggregatedVaultFromJSON,
  Is as NonFungibleResourcesCollectionItemVaultAggregatedVaultFromJSONTyped,
  OT as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemAllOfFromJSON,
  Bs as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemAllOfFromJSONTyped,
  ST as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemAllOfToJSON,
  L as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemFromJSON,
  Js as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemFromJSONTyped,
  G as NonFungibleResourcesCollectionItemVaultAggregatedVaultItemToJSON,
  jr as NonFungibleResourcesCollectionItemVaultAggregatedVaultToJSON,
  Es as NonFungibleResourcesCollectionToJSON,
  FT as NotSyncedUpErrorAllOfFromJSON,
  Ks as NotSyncedUpErrorAllOfFromJSONTyped,
  AT as NotSyncedUpErrorAllOfToJSON,
  NT as NotSyncedUpErrorAllOfTypeEnum,
  Bb as NotSyncedUpErrorFromJSON,
  hr as NotSyncedUpErrorFromJSONTyped,
  Au as NotSyncedUpErrorToJSON,
  Mb as NotSyncedUpErrorTypeEnum,
  $O as ObjectModuleId,
  uo as ObjectModuleIdFromJSON,
  lo as ObjectModuleIdFromJSONTyped,
  XO as ObjectModuleIdToJSON,
  vT as OptionalNonFungibleIdsCollectionAllOfFromJSON,
  Gs as OptionalNonFungibleIdsCollectionAllOfFromJSONTyped,
  JT as OptionalNonFungibleIdsCollectionAllOfToJSON,
  hT as OptionalNonFungibleIdsCollectionFromJSON,
  Ls as OptionalNonFungibleIdsCollectionFromJSONTyped,
  kT as OptionalNonFungibleIdsCollectionToJSON,
  PT as PackageBlueprintCollectionAllOfFromJSON,
  Ws as PackageBlueprintCollectionAllOfFromJSONTyped,
  DT as PackageBlueprintCollectionAllOfToJSON,
  tn as PackageBlueprintCollectionFromJSON,
  zs as PackageBlueprintCollectionFromJSONTyped,
  Fe as PackageBlueprintCollectionItemFromJSON,
  Hs as PackageBlueprintCollectionItemFromJSONTyped,
  Ae as PackageBlueprintCollectionItemToJSON,
  rn as PackageBlueprintCollectionToJSON,
  UT as PackageCodeCollectionAllOfFromJSON,
  Qs as PackageCodeCollectionAllOfFromJSONTyped,
  BT as PackageCodeCollectionAllOfToJSON,
  nn as PackageCodeCollectionFromJSON,
  Zs as PackageCodeCollectionFromJSONTyped,
  he as PackageCodeCollectionItemFromJSON,
  Xs as PackageCodeCollectionItemFromJSONTyped,
  ke as PackageCodeCollectionItemToJSON,
  an as PackageCodeCollectionToJSON,
  ET as PackageVmType,
  Re as PackageVmTypeFromJSON,
  $s as PackageVmTypeFromJSONTyped,
  CT as PackageVmTypeToJSON,
  GT as ProgrammaticScryptoSborValueArrayAllOfFromJSON,
  Ys as ProgrammaticScryptoSborValueArrayAllOfFromJSONTyped,
  KT as ProgrammaticScryptoSborValueArrayAllOfKindEnum,
  HT as ProgrammaticScryptoSborValueArrayAllOfToJSON,
  Jy as ProgrammaticScryptoSborValueArrayFromJSON,
  it as ProgrammaticScryptoSborValueArrayFromJSONTyped,
  Ty as ProgrammaticScryptoSborValueArrayKindEnum,
  Ra as ProgrammaticScryptoSborValueArrayToJSON,
  WT as ProgrammaticScryptoSborValueBaseFromJSON,
  js as ProgrammaticScryptoSborValueBaseFromJSONTyped,
  $T as ProgrammaticScryptoSborValueBaseToJSON,
  QT as ProgrammaticScryptoSborValueBoolAllOfFromJSON,
  ec as ProgrammaticScryptoSborValueBoolAllOfFromJSONTyped,
  XT as ProgrammaticScryptoSborValueBoolAllOfKindEnum,
  YT as ProgrammaticScryptoSborValueBoolAllOfToJSON,
  wy as ProgrammaticScryptoSborValueBoolFromJSON,
  at as ProgrammaticScryptoSborValueBoolFromJSONTyped,
  Iy as ProgrammaticScryptoSborValueBoolKindEnum,
  ha as ProgrammaticScryptoSborValueBoolToJSON,
  tv as ProgrammaticScryptoSborValueBytesAllOfFromJSON,
  tc as ProgrammaticScryptoSborValueBytesAllOfFromJSONTyped,
  jT as ProgrammaticScryptoSborValueBytesAllOfKindEnum,
  rv as ProgrammaticScryptoSborValueBytesAllOfToJSON,
  Ey as ProgrammaticScryptoSborValueBytesFromJSON,
  ot as ProgrammaticScryptoSborValueBytesFromJSONTyped,
  Py as ProgrammaticScryptoSborValueBytesKindEnum,
  ka as ProgrammaticScryptoSborValueBytesToJSON,
  av as ProgrammaticScryptoSborValueDecimalAllOfFromJSON,
  rc as ProgrammaticScryptoSborValueDecimalAllOfFromJSONTyped,
  nv as ProgrammaticScryptoSborValueDecimalAllOfKindEnum,
  ov as ProgrammaticScryptoSborValueDecimalAllOfToJSON,
  qy as ProgrammaticScryptoSborValueDecimalFromJSON,
  ut as ProgrammaticScryptoSborValueDecimalFromJSONTyped,
  Cy as ProgrammaticScryptoSborValueDecimalKindEnum,
  Ta as ProgrammaticScryptoSborValueDecimalToJSON,
  sv as ProgrammaticScryptoSborValueEnumAllOfFromJSON,
  nc as ProgrammaticScryptoSborValueEnumAllOfFromJSONTyped,
  uv as ProgrammaticScryptoSborValueEnumAllOfKindEnum,
  cv as ProgrammaticScryptoSborValueEnumAllOfToJSON,
  By as ProgrammaticScryptoSborValueEnumFromJSON,
  lt as ProgrammaticScryptoSborValueEnumFromJSONTyped,
  My as ProgrammaticScryptoSborValueEnumKindEnum,
  va as ProgrammaticScryptoSborValueEnumToJSON,
  g as ProgrammaticScryptoSborValueFromJSON,
  Wa as ProgrammaticScryptoSborValueFromJSONTyped,
  fv as ProgrammaticScryptoSborValueI128AllOfFromJSON,
  ic as ProgrammaticScryptoSborValueI128AllOfFromJSONTyped,
  dv as ProgrammaticScryptoSborValueI128AllOfKindEnum,
  mv as ProgrammaticScryptoSborValueI128AllOfToJSON,
  Gy as ProgrammaticScryptoSborValueI128FromJSON,
  st as ProgrammaticScryptoSborValueI128FromJSONTyped,
  Ky as ProgrammaticScryptoSborValueI128KindEnum,
  Ja as ProgrammaticScryptoSborValueI128ToJSON,
  yv as ProgrammaticScryptoSborValueI16AllOfFromJSON,
  ac as ProgrammaticScryptoSborValueI16AllOfFromJSONTyped,
  pv as ProgrammaticScryptoSborValueI16AllOfKindEnum,
  Ov as ProgrammaticScryptoSborValueI16AllOfToJSON,
  Wy as ProgrammaticScryptoSborValueI16FromJSON,
  ct as ProgrammaticScryptoSborValueI16FromJSONTyped,
  Hy as ProgrammaticScryptoSborValueI16KindEnum,
  Ia as ProgrammaticScryptoSborValueI16ToJSON,
  bv as ProgrammaticScryptoSborValueI32AllOfFromJSON,
  oc as ProgrammaticScryptoSborValueI32AllOfFromJSONTyped,
  Sv as ProgrammaticScryptoSborValueI32AllOfKindEnum,
  Fv as ProgrammaticScryptoSborValueI32AllOfToJSON,
  Zy as ProgrammaticScryptoSborValueI32FromJSON,
  dt as ProgrammaticScryptoSborValueI32FromJSONTyped,
  $y as ProgrammaticScryptoSborValueI32KindEnum,
  Va as ProgrammaticScryptoSborValueI32ToJSON,
  hv as ProgrammaticScryptoSborValueI64AllOfFromJSON,
  uc as ProgrammaticScryptoSborValueI64AllOfFromJSONTyped,
  Av as ProgrammaticScryptoSborValueI64AllOfKindEnum,
  kv as ProgrammaticScryptoSborValueI64AllOfToJSON,
  jy as ProgrammaticScryptoSborValueI64FromJSON,
  _t as ProgrammaticScryptoSborValueI64FromJSONTyped,
  Qy as ProgrammaticScryptoSborValueI64KindEnum,
  wa as ProgrammaticScryptoSborValueI64ToJSON,
  Jv as ProgrammaticScryptoSborValueI8AllOfFromJSON,
  lc as ProgrammaticScryptoSborValueI8AllOfFromJSONTyped,
  Tv as ProgrammaticScryptoSborValueI8AllOfKindEnum,
  Iv as ProgrammaticScryptoSborValueI8AllOfToJSON,
  rO as ProgrammaticScryptoSborValueI8FromJSON,
  ft as ProgrammaticScryptoSborValueI8FromJSONTyped,
  eO as ProgrammaticScryptoSborValueI8KindEnum,
  Pa as ProgrammaticScryptoSborValueI8ToJSON,
  hy as ProgrammaticScryptoSborValueKind,
  N as ProgrammaticScryptoSborValueKindFromJSON,
  Aa as ProgrammaticScryptoSborValueKindFromJSONTyped,
  ky as ProgrammaticScryptoSborValueKindToJSON,
  Pv as ProgrammaticScryptoSborValueMapAllOfFromJSON,
  sc as ProgrammaticScryptoSborValueMapAllOfFromJSONTyped,
  Vv as ProgrammaticScryptoSborValueMapAllOfKindEnum,
  Dv as ProgrammaticScryptoSborValueMapAllOfToJSON,
  mt as ProgrammaticScryptoSborValueMapEntryFromJSON,
  Da as ProgrammaticScryptoSborValueMapEntryFromJSONTyped,
  pt as ProgrammaticScryptoSborValueMapEntryToJSON,
  oO as ProgrammaticScryptoSborValueMapFromJSON,
  gt as ProgrammaticScryptoSborValueMapFromJSONTyped,
  iO as ProgrammaticScryptoSborValueMapKindEnum,
  Ea as ProgrammaticScryptoSborValueMapToJSON,
  xv as ProgrammaticScryptoSborValueNonFungibleLocalIdAllOfFromJSON,
  cc as ProgrammaticScryptoSborValueNonFungibleLocalIdAllOfFromJSONTyped,
  Ev as ProgrammaticScryptoSborValueNonFungibleLocalIdAllOfKindEnum,
  qv as ProgrammaticScryptoSborValueNonFungibleLocalIdAllOfToJSON,
  sO as ProgrammaticScryptoSborValueNonFungibleLocalIdFromJSON,
  yt as ProgrammaticScryptoSborValueNonFungibleLocalIdFromJSONTyped,
  uO as ProgrammaticScryptoSborValueNonFungibleLocalIdKindEnum,
  Ca as ProgrammaticScryptoSborValueNonFungibleLocalIdToJSON,
  Bv as ProgrammaticScryptoSborValueOwnAllOfFromJSON,
  dc as ProgrammaticScryptoSborValueOwnAllOfFromJSONTyped,
  Mv as ProgrammaticScryptoSborValueOwnAllOfKindEnum,
  Kv as ProgrammaticScryptoSborValueOwnAllOfToJSON,
  _O as ProgrammaticScryptoSborValueOwnFromJSON,
  Ot as ProgrammaticScryptoSborValueOwnFromJSONTyped,
  cO as ProgrammaticScryptoSborValueOwnKindEnum,
  xa as ProgrammaticScryptoSborValueOwnToJSON,
  Hv as ProgrammaticScryptoSborValuePreciseDecimalAllOfFromJSON,
  _c as ProgrammaticScryptoSborValuePreciseDecimalAllOfFromJSONTyped,
  Lv as ProgrammaticScryptoSborValuePreciseDecimalAllOfKindEnum,
  zv as ProgrammaticScryptoSborValuePreciseDecimalAllOfToJSON,
  pO as ProgrammaticScryptoSborValuePreciseDecimalFromJSON,
  St as ProgrammaticScryptoSborValuePreciseDecimalFromJSONTyped,
  fO as ProgrammaticScryptoSborValuePreciseDecimalKindEnum,
  qa as ProgrammaticScryptoSborValuePreciseDecimalToJSON,
  Xv as ProgrammaticScryptoSborValueReferenceAllOfFromJSON,
  fc as ProgrammaticScryptoSborValueReferenceAllOfFromJSONTyped,
  Wv as ProgrammaticScryptoSborValueReferenceAllOfKindEnum,
  Zv as ProgrammaticScryptoSborValueReferenceAllOfToJSON,
  OO as ProgrammaticScryptoSborValueReferenceFromJSON,
  Nt as ProgrammaticScryptoSborValueReferenceFromJSONTyped,
  gO as ProgrammaticScryptoSborValueReferenceKindEnum,
  Ma as ProgrammaticScryptoSborValueReferenceToJSON,
  jv as ProgrammaticScryptoSborValueStringAllOfFromJSON,
  mc as ProgrammaticScryptoSborValueStringAllOfFromJSONTyped,
  Qv as ProgrammaticScryptoSborValueStringAllOfKindEnum,
  eJ as ProgrammaticScryptoSborValueStringAllOfToJSON,
  bO as ProgrammaticScryptoSborValueStringFromJSON,
  bt as ProgrammaticScryptoSborValueStringFromJSONTyped,
  SO as ProgrammaticScryptoSborValueStringKindEnum,
  Ua as ProgrammaticScryptoSborValueStringToJSON,
  y as ProgrammaticScryptoSborValueToJSON,
  nJ as ProgrammaticScryptoSborValueTupleAllOfFromJSON,
  pc as ProgrammaticScryptoSborValueTupleAllOfFromJSONTyped,
  tJ as ProgrammaticScryptoSborValueTupleAllOfKindEnum,
  iJ as ProgrammaticScryptoSborValueTupleAllOfToJSON,
  RO as ProgrammaticScryptoSborValueTupleFromJSON,
  Ft as ProgrammaticScryptoSborValueTupleFromJSONTyped,
  FO as ProgrammaticScryptoSborValueTupleKindEnum,
  Ba as ProgrammaticScryptoSborValueTupleToJSON,
  uJ as ProgrammaticScryptoSborValueU128AllOfFromJSON,
  gc as ProgrammaticScryptoSborValueU128AllOfFromJSONTyped,
  aJ as ProgrammaticScryptoSborValueU128AllOfKindEnum,
  lJ as ProgrammaticScryptoSborValueU128AllOfToJSON,
  TO as ProgrammaticScryptoSborValueU128FromJSON,
  At as ProgrammaticScryptoSborValueU128FromJSONTyped,
  hO as ProgrammaticScryptoSborValueU128KindEnum,
  Ka as ProgrammaticScryptoSborValueU128ToJSON,
  dJ as ProgrammaticScryptoSborValueU16AllOfFromJSON,
  yc as ProgrammaticScryptoSborValueU16AllOfFromJSONTyped,
  sJ as ProgrammaticScryptoSborValueU16AllOfKindEnum,
  _J as ProgrammaticScryptoSborValueU16AllOfToJSON,
  IO as ProgrammaticScryptoSborValueU16FromJSON,
  Rt as ProgrammaticScryptoSborValueU16FromJSONTyped,
  vO as ProgrammaticScryptoSborValueU16KindEnum,
  La as ProgrammaticScryptoSborValueU16ToJSON,
  pJ as ProgrammaticScryptoSborValueU32AllOfFromJSON,
  Oc as ProgrammaticScryptoSborValueU32AllOfFromJSONTyped,
  fJ as ProgrammaticScryptoSborValueU32AllOfKindEnum,
  gJ as ProgrammaticScryptoSborValueU32AllOfToJSON,
  PO as ProgrammaticScryptoSborValueU32FromJSON,
  ht as ProgrammaticScryptoSborValueU32FromJSONTyped,
  VO as ProgrammaticScryptoSborValueU32KindEnum,
  Ga as ProgrammaticScryptoSborValueU32ToJSON,
  SJ as ProgrammaticScryptoSborValueU64AllOfFromJSON,
  Sc as ProgrammaticScryptoSborValueU64AllOfFromJSONTyped,
  yJ as ProgrammaticScryptoSborValueU64AllOfKindEnum,
  NJ as ProgrammaticScryptoSborValueU64AllOfToJSON,
  CO as ProgrammaticScryptoSborValueU64FromJSON,
  kt as ProgrammaticScryptoSborValueU64FromJSONTyped,
  DO as ProgrammaticScryptoSborValueU64KindEnum,
  Ha as ProgrammaticScryptoSborValueU64ToJSON,
  AJ as ProgrammaticScryptoSborValueU8AllOfFromJSON,
  Nc as ProgrammaticScryptoSborValueU8AllOfFromJSONTyped,
  bJ as ProgrammaticScryptoSborValueU8AllOfKindEnum,
  RJ as ProgrammaticScryptoSborValueU8AllOfToJSON,
  MO as ProgrammaticScryptoSborValueU8FromJSON,
  Tt as ProgrammaticScryptoSborValueU8FromJSONTyped,
  xO as ProgrammaticScryptoSborValueU8KindEnum,
  za as ProgrammaticScryptoSborValueU8ToJSON,
  vJ as PublicKeyBaseFromJSON,
  Ac as PublicKeyBaseFromJSONTyped,
  JJ as PublicKeyBaseToJSON,
  wJ as PublicKeyEcdsaSecp256k1AllOfFromJSON,
  Rc as PublicKeyEcdsaSecp256k1AllOfFromJSONTyped,
  IJ as PublicKeyEcdsaSecp256k1AllOfKeyTypeEnum,
  PJ as PublicKeyEcdsaSecp256k1AllOfToJSON,
  uN as PublicKeyEcdsaSecp256k1FromJSON,
  Zt as PublicKeyEcdsaSecp256k1FromJSONTyped,
  aN as PublicKeyEcdsaSecp256k1KeyTypeEnum,
  Mo as PublicKeyEcdsaSecp256k1ToJSON,
  CJ as PublicKeyEddsaEd25519AllOfFromJSON,
  hc as PublicKeyEddsaEd25519AllOfFromJSONTyped,
  DJ as PublicKeyEddsaEd25519AllOfKeyTypeEnum,
  xJ as PublicKeyEddsaEd25519AllOfToJSON,
  cN as PublicKeyEddsaEd25519FromJSON,
  Qt as PublicKeyEddsaEd25519FromJSONTyped,
  lN as PublicKeyEddsaEd25519KeyTypeEnum,
  Uo as PublicKeyEddsaEd25519ToJSON,
  J as PublicKeyFromJSON,
  Bo as PublicKeyFromJSONTyped,
  BJ as PublicKeyHashBaseFromJSON,
  vc as PublicKeyHashBaseFromJSONTyped,
  KJ as PublicKeyHashBaseToJSON,
  HJ as PublicKeyHashEcdsaSecp256k1AllOfFromJSON,
  Jc as PublicKeyHashEcdsaSecp256k1AllOfFromJSONTyped,
  LJ as PublicKeyHashEcdsaSecp256k1AllOfKeyHashTypeEnum,
  zJ as PublicKeyHashEcdsaSecp256k1AllOfToJSON,
  gN as PublicKeyHashEcdsaSecp256k1FromJSON,
  jt as PublicKeyHashEcdsaSecp256k1FromJSONTyped,
  mN as PublicKeyHashEcdsaSecp256k1KeyHashTypeEnum,
  Lo as PublicKeyHashEcdsaSecp256k1ToJSON,
  XJ as PublicKeyHashEddsaEd25519AllOfFromJSON,
  Ic as PublicKeyHashEddsaEd25519AllOfFromJSONTyped,
  WJ as PublicKeyHashEddsaEd25519AllOfKeyHashTypeEnum,
  ZJ as PublicKeyHashEddsaEd25519AllOfToJSON,
  SN as PublicKeyHashEddsaEd25519FromJSON,
  er as PublicKeyHashEddsaEd25519FromJSONTyped,
  yN as PublicKeyHashEddsaEd25519KeyHashTypeEnum,
  Go as PublicKeyHashEddsaEd25519ToJSON,
  te as PublicKeyHashFromJSON,
  Ho as PublicKeyHashFromJSONTyped,
  re as PublicKeyHashToJSON,
  qJ as PublicKeyHashType,
  kc as PublicKeyHashTypeFromJSON,
  Tc as PublicKeyHashTypeFromJSONTyped,
  MJ as PublicKeyHashTypeToJSON,
  I as PublicKeyToJSON,
  hJ as PublicKeyType,
  bc as PublicKeyTypeFromJSON,
  Fc as PublicKeyTypeFromJSONTyped,
  kJ as PublicKeyTypeToJSON,
  O as RadixNetwork,
  ti as RadixNetworkConfig,
  ri as RadixNetworkConfigById,
  c as RequiredError,
  Mu as ResourceAggregationLevel,
  k as ResourceAggregationLevelFromJSON,
  Uu as ResourceAggregationLevelFromJSONTyped,
  s0 as ResourceAggregationLevelToJSON,
  uI as ResourceHoldersCollectionAllOfFromJSON,
  Ec as ResourceHoldersCollectionAllOfFromJSONTyped,
  lI as ResourceHoldersCollectionAllOfToJSON,
  iI as ResourceHoldersCollectionFromJSON,
  Dc as ResourceHoldersCollectionFromJSONTyped,
  dI as ResourceHoldersCollectionFungibleResourceItemAllOfFromJSON,
  Cc as ResourceHoldersCollectionFungibleResourceItemAllOfFromJSONTyped,
  _I as ResourceHoldersCollectionFungibleResourceItemAllOfToJSON,
  sI as ResourceHoldersCollectionFungibleResourceItemAllOfTypeEnum,
  jJ as ResourceHoldersCollectionFungibleResourceItemFromJSON,
  on as ResourceHoldersCollectionFungibleResourceItemFromJSONTyped,
  Vc as ResourceHoldersCollectionFungibleResourceItemToJSON,
  QJ as ResourceHoldersCollectionFungibleResourceItemTypeEnum,
  gI as ResourceHoldersCollectionItemBaseFromJSON,
  Mc as ResourceHoldersCollectionItemBaseFromJSONTyped,
  yI as ResourceHoldersCollectionItemBaseToJSON,
  Te as ResourceHoldersCollectionItemFromJSON,
  Pc as ResourceHoldersCollectionItemFromJSONTyped,
  ve as ResourceHoldersCollectionItemToJSON,
  NI as ResourceHoldersCollectionNonFungibleResourceItemAllOfFromJSON,
  Uc as ResourceHoldersCollectionNonFungibleResourceItemAllOfFromJSONTyped,
  bI as ResourceHoldersCollectionNonFungibleResourceItemAllOfToJSON,
  OI as ResourceHoldersCollectionNonFungibleResourceItemAllOfTypeEnum,
  rI as ResourceHoldersCollectionNonFungibleResourceItemFromJSON,
  un as ResourceHoldersCollectionNonFungibleResourceItemFromJSONTyped,
  wc as ResourceHoldersCollectionNonFungibleResourceItemToJSON,
  eI as ResourceHoldersCollectionNonFungibleResourceItemTypeEnum,
  aI as ResourceHoldersCollectionToJSON,
  hI as ResourceHoldersRequestAllOfFromJSON,
  Lc as ResourceHoldersRequestAllOfFromJSONTyped,
  kI as ResourceHoldersRequestAllOfToJSON,
  AI as ResourceHoldersRequestFromJSON,
  Bc as ResourceHoldersRequestFromJSONTyped,
  Kc as ResourceHoldersRequestToJSON,
  fI as ResourceHoldersResourceType,
  xc as ResourceHoldersResourceTypeFromJSON,
  qc as ResourceHoldersResourceTypeFromJSONTyped,
  mI as ResourceHoldersResourceTypeToJSON,
  Gc as ResourceHoldersResponseFromJSON,
  Hc as ResourceHoldersResponseFromJSONTyped,
  vI as ResourceHoldersResponseToJSON,
  Z as ResponseError,
  II as ResultSetCursorMixinFromJSON,
  zc as ResultSetCursorMixinFromJSONTyped,
  VI as ResultSetCursorMixinToJSON,
  HO as RoleAssignmentResolution,
  ro as RoleAssignmentResolutionFromJSON,
  no as RoleAssignmentResolutionFromJSONTyped,
  zO as RoleAssignmentResolutionToJSON,
  Pe as RoleKeyFromJSON,
  so as RoleKeyFromJSONTyped,
  De as RoleKeyToJSON,
  tt as RoyaltyAmountFromJSON,
  ea as RoyaltyAmountFromJSONTyped,
  rt as RoyaltyAmountToJSON,
  my as RoyaltyAmountUnitEnum,
  Q as ScryptoSborValueFromJSON,
  Wc as ScryptoSborValueFromJSONTyped,
  Y as ScryptoSborValueToJSON,
  ip as State,
  DI as StateAccountAuthorizedDepositorsPageRequestFromJSON,
  $c as StateAccountAuthorizedDepositorsPageRequestFromJSONTyped,
  Xc as StateAccountAuthorizedDepositorsPageRequestToJSON,
  Zc as StateAccountAuthorizedDepositorsPageResponseFromJSON,
  Qc as StateAccountAuthorizedDepositorsPageResponseFromJSONTyped,
  CI as StateAccountAuthorizedDepositorsPageResponseToJSON,
  qI as StateAccountLockerPageVaultsRequestFromJSON,
  Yc as StateAccountLockerPageVaultsRequestFromJSONTyped,
  jc as StateAccountLockerPageVaultsRequestToJSON,
  ed as StateAccountLockerPageVaultsResponseFromJSON,
  td as StateAccountLockerPageVaultsResponseFromJSONTyped,
  UI as StateAccountLockerPageVaultsResponseToJSON,
  GI as StateAccountLockersTouchedAtRequestAllOfFromJSON,
  id as StateAccountLockersTouchedAtRequestAllOfFromJSONTyped,
  HI as StateAccountLockersTouchedAtRequestAllOfToJSON,
  KI as StateAccountLockersTouchedAtRequestFromJSON,
  rd as StateAccountLockersTouchedAtRequestFromJSONTyped,
  nd as StateAccountLockersTouchedAtRequestToJSON,
  ZI as StateAccountLockersTouchedAtResponseAllOfFromJSON,
  ld as StateAccountLockersTouchedAtResponseAllOfFromJSONTyped,
  QI as StateAccountLockersTouchedAtResponseAllOfToJSON,
  od as StateAccountLockersTouchedAtResponseFromJSON,
  ud as StateAccountLockersTouchedAtResponseFromJSONTyped,
  jI as StateAccountLockersTouchedAtResponseItemAllOfFromJSON,
  sd as StateAccountLockersTouchedAtResponseItemAllOfFromJSONTyped,
  eV as StateAccountLockersTouchedAtResponseItemAllOfToJSON,
  ln as StateAccountLockersTouchedAtResponseItemFromJSON,
  ad as StateAccountLockersTouchedAtResponseItemFromJSONTyped,
  sn as StateAccountLockersTouchedAtResponseItemToJSON,
  $I as StateAccountLockersTouchedAtResponseToJSON,
  iV as StateAccountResourcePreferencesPageRequestAllOfFromJSON,
  _d as StateAccountResourcePreferencesPageRequestAllOfFromJSONTyped,
  aV as StateAccountResourcePreferencesPageRequestAllOfToJSON,
  rV as StateAccountResourcePreferencesPageRequestFromJSON,
  cd as StateAccountResourcePreferencesPageRequestFromJSONTyped,
  dd as StateAccountResourcePreferencesPageRequestToJSON,
  fd as StateAccountResourcePreferencesPageResponseFromJSON,
  md as StateAccountResourcePreferencesPageResponseFromJSONTyped,
  uV as StateAccountResourcePreferencesPageResponseToJSON,
  jm as StateApi,
  cn as StateEntityDetailsOptInsFromJSON,
  pd as StateEntityDetailsOptInsFromJSONTyped,
  dn as StateEntityDetailsOptInsToJSON,
  _V as StateEntityDetailsRequestAllOfFromJSON,
  Od as StateEntityDetailsRequestAllOfFromJSONTyped,
  fV as StateEntityDetailsRequestAllOfToJSON,
  cV as StateEntityDetailsRequestFromJSON,
  gd as StateEntityDetailsRequestFromJSONTyped,
  yd as StateEntityDetailsRequestToJSON,
  KV as StateEntityDetailsResponseAllOfFromJSON,
  Bd as StateEntityDetailsResponseAllOfFromJSONTyped,
  LV as StateEntityDetailsResponseAllOfToJSON,
  zV as StateEntityDetailsResponseComponentDetailsAllOfFromJSON,
  Kd as StateEntityDetailsResponseComponentDetailsAllOfFromJSONTyped,
  WV as StateEntityDetailsResponseComponentDetailsAllOfToJSON,
  GV as StateEntityDetailsResponseComponentDetailsAllOfTypeEnum,
  FV as StateEntityDetailsResponseComponentDetailsFromJSON,
  On as StateEntityDetailsResponseComponentDetailsFromJSONTyped,
  Jd as StateEntityDetailsResponseComponentDetailsToJSON,
  NV as StateEntityDetailsResponseComponentDetailsTypeEnum,
  Md as StateEntityDetailsResponseFromJSON,
  Ud as StateEntityDetailsResponseFromJSONTyped,
  ZV as StateEntityDetailsResponseFungibleResourceDetailsAllOfFromJSON,
  Ld as StateEntityDetailsResponseFungibleResourceDetailsAllOfFromJSONTyped,
  QV as StateEntityDetailsResponseFungibleResourceDetailsAllOfToJSON,
  $V as StateEntityDetailsResponseFungibleResourceDetailsAllOfTypeEnum,
  hV as StateEntityDetailsResponseFungibleResourceDetailsFromJSON,
  Sn as StateEntityDetailsResponseFungibleResourceDetailsFromJSONTyped,
  Id as StateEntityDetailsResponseFungibleResourceDetailsToJSON,
  AV as StateEntityDetailsResponseFungibleResourceDetailsTypeEnum,
  ew as StateEntityDetailsResponseFungibleVaultDetailsAllOfFromJSON,
  Gd as StateEntityDetailsResponseFungibleVaultDetailsAllOfFromJSONTyped,
  tw as StateEntityDetailsResponseFungibleVaultDetailsAllOfToJSON,
  YV as StateEntityDetailsResponseFungibleVaultDetailsAllOfTypeEnum,
  vV as StateEntityDetailsResponseFungibleVaultDetailsFromJSON,
  Nn as StateEntityDetailsResponseFungibleVaultDetailsFromJSONTyped,
  Vd as StateEntityDetailsResponseFungibleVaultDetailsToJSON,
  kV as StateEntityDetailsResponseFungibleVaultDetailsTypeEnum,
  Sd as StateEntityDetailsResponseItemAncestorIdentitiesFromJSON,
  Nd as StateEntityDetailsResponseItemAncestorIdentitiesFromJSONTyped,
  bd as StateEntityDetailsResponseItemAncestorIdentitiesToJSON,
  aw as StateEntityDetailsResponseItemDetailsBaseFromJSON,
  Wd as StateEntityDetailsResponseItemDetailsBaseFromJSONTyped,
  ow as StateEntityDetailsResponseItemDetailsBaseToJSON,
  Ed as StateEntityDetailsResponseItemDetailsFromJSON,
  Cd as StateEntityDetailsResponseItemDetailsFromJSONTyped,
  xd as StateEntityDetailsResponseItemDetailsToJSON,
  rw as StateEntityDetailsResponseItemDetailsType,
  Hd as StateEntityDetailsResponseItemDetailsTypeFromJSON,
  zd as StateEntityDetailsResponseItemDetailsTypeFromJSONTyped,
  nw as StateEntityDetailsResponseItemDetailsTypeToJSON,
  Rn as StateEntityDetailsResponseItemFromJSON,
  qd as StateEntityDetailsResponseItemFromJSONTyped,
  hn as StateEntityDetailsResponseItemToJSON,
  sw as StateEntityDetailsResponseNonFungibleResourceDetailsAllOfFromJSON,
  $d as StateEntityDetailsResponseNonFungibleResourceDetailsAllOfFromJSONTyped,
  cw as StateEntityDetailsResponseNonFungibleResourceDetailsAllOfToJSON,
  uw as StateEntityDetailsResponseNonFungibleResourceDetailsAllOfTypeEnum,
  VV as StateEntityDetailsResponseNonFungibleResourceDetailsFromJSON,
  bn as StateEntityDetailsResponseNonFungibleResourceDetailsFromJSONTyped,
  wd as StateEntityDetailsResponseNonFungibleResourceDetailsToJSON,
  JV as StateEntityDetailsResponseNonFungibleResourceDetailsTypeEnum,
  fw as StateEntityDetailsResponseNonFungibleVaultDetailsAllOfFromJSON,
  Xd as StateEntityDetailsResponseNonFungibleVaultDetailsAllOfFromJSONTyped,
  mw as StateEntityDetailsResponseNonFungibleVaultDetailsAllOfToJSON,
  dw as StateEntityDetailsResponseNonFungibleVaultDetailsAllOfTypeEnum,
  DV as StateEntityDetailsResponseNonFungibleVaultDetailsFromJSON,
  Fn as StateEntityDetailsResponseNonFungibleVaultDetailsFromJSONTyped,
  Pd as StateEntityDetailsResponseNonFungibleVaultDetailsToJSON,
  wV as StateEntityDetailsResponseNonFungibleVaultDetailsTypeEnum,
  yw as StateEntityDetailsResponsePackageDetailsAllOfFromJSON,
  Zd as StateEntityDetailsResponsePackageDetailsAllOfFromJSONTyped,
  Ow as StateEntityDetailsResponsePackageDetailsAllOfToJSON,
  pw as StateEntityDetailsResponsePackageDetailsAllOfTypeEnum,
  xV as StateEntityDetailsResponsePackageDetailsFromJSON,
  An as StateEntityDetailsResponsePackageDetailsFromJSONTyped,
  Dd as StateEntityDetailsResponsePackageDetailsToJSON,
  EV as StateEntityDetailsResponsePackageDetailsTypeEnum,
  UV as StateEntityDetailsResponseToJSON,
  Fw as StateEntityFungibleResourceVaultsPageRequestAllOfFromJSON,
  jd as StateEntityFungibleResourceVaultsPageRequestAllOfFromJSONTyped,
  Aw as StateEntityFungibleResourceVaultsPageRequestAllOfToJSON,
  Nw as StateEntityFungibleResourceVaultsPageRequestFromJSON,
  Qd as StateEntityFungibleResourceVaultsPageRequestFromJSONTyped,
  Yd as StateEntityFungibleResourceVaultsPageRequestToJSON,
  e_ as StateEntityFungibleResourceVaultsPageResponseFromJSON,
  t_ as StateEntityFungibleResourceVaultsPageResponseFromJSONTyped,
  hw as StateEntityFungibleResourceVaultsPageResponseToJSON,
  Iw as StateEntityFungiblesPageRequestAllOfFromJSON,
  a_ as StateEntityFungiblesPageRequestAllOfFromJSONTyped,
  Vw as StateEntityFungiblesPageRequestAllOfToJSON,
  vw as StateEntityFungiblesPageRequestFromJSON,
  n_ as StateEntityFungiblesPageRequestFromJSONTyped,
  kn as StateEntityFungiblesPageRequestOptInsFromJSON,
  r_ as StateEntityFungiblesPageRequestOptInsFromJSONTyped,
  Tn as StateEntityFungiblesPageRequestOptInsToJSON,
  i_ as StateEntityFungiblesPageRequestToJSON,
  o_ as StateEntityFungiblesPageResponseFromJSON,
  u_ as StateEntityFungiblesPageResponseFromJSONTyped,
  Pw as StateEntityFungiblesPageResponseToJSON,
  xw as StateEntityMetadataPageRequestAllOfFromJSON,
  c_ as StateEntityMetadataPageRequestAllOfFromJSONTyped,
  qw as StateEntityMetadataPageRequestAllOfToJSON,
  Ew as StateEntityMetadataPageRequestFromJSON,
  l_ as StateEntityMetadataPageRequestFromJSONTyped,
  s_ as StateEntityMetadataPageRequestToJSON,
  d_ as StateEntityMetadataPageResponseFromJSON,
  __ as StateEntityMetadataPageResponseFromJSONTyped,
  Uw as StateEntityMetadataPageResponseToJSON,
  Gw as StateEntityNonFungibleIdsPageRequestAllOfFromJSON,
  p_ as StateEntityNonFungibleIdsPageRequestAllOfFromJSONTyped,
  Hw as StateEntityNonFungibleIdsPageRequestAllOfToJSON,
  Kw as StateEntityNonFungibleIdsPageRequestFromJSON,
  f_ as StateEntityNonFungibleIdsPageRequestFromJSONTyped,
  m_ as StateEntityNonFungibleIdsPageRequestToJSON,
  g_ as StateEntityNonFungibleIdsPageResponseFromJSON,
  y_ as StateEntityNonFungibleIdsPageResponseFromJSONTyped,
  Ww as StateEntityNonFungibleIdsPageResponseToJSON,
  vn as StateEntityNonFungibleResourceVaultsPageOptInsFromJSON,
  O_ as StateEntityNonFungibleResourceVaultsPageOptInsFromJSONTyped,
  Jn as StateEntityNonFungibleResourceVaultsPageOptInsToJSON,
  Yw as StateEntityNonFungibleResourceVaultsPageRequestAllOfFromJSON,
  b_ as StateEntityNonFungibleResourceVaultsPageRequestAllOfFromJSONTyped,
  jw as StateEntityNonFungibleResourceVaultsPageRequestAllOfToJSON,
  Zw as StateEntityNonFungibleResourceVaultsPageRequestFromJSON,
  S_ as StateEntityNonFungibleResourceVaultsPageRequestFromJSONTyped,
  N_ as StateEntityNonFungibleResourceVaultsPageRequestToJSON,
  F_ as StateEntityNonFungibleResourceVaultsPageResponseFromJSON,
  A_ as StateEntityNonFungibleResourceVaultsPageResponseFromJSONTyped,
  tP as StateEntityNonFungibleResourceVaultsPageResponseToJSON,
  oP as StateEntityNonFungiblesPageRequestAllOfFromJSON,
  T_ as StateEntityNonFungiblesPageRequestAllOfFromJSONTyped,
  uP as StateEntityNonFungiblesPageRequestAllOfToJSON,
  iP as StateEntityNonFungiblesPageRequestFromJSON,
  h_ as StateEntityNonFungiblesPageRequestFromJSONTyped,
  In as StateEntityNonFungiblesPageRequestOptInsFromJSON,
  R_ as StateEntityNonFungiblesPageRequestOptInsFromJSONTyped,
  Vn as StateEntityNonFungiblesPageRequestOptInsToJSON,
  k_ as StateEntityNonFungiblesPageRequestToJSON,
  v_ as StateEntityNonFungiblesPageResponseFromJSON,
  J_ as StateEntityNonFungiblesPageResponseFromJSONTyped,
  sP as StateEntityNonFungiblesPageResponseToJSON,
  dP as StateEntitySchemaPageRequestFromJSON,
  I_ as StateEntitySchemaPageRequestFromJSONTyped,
  V_ as StateEntitySchemaPageRequestToJSON,
  w_ as StateEntitySchemaPageResponseFromJSON,
  P_ as StateEntitySchemaPageResponseFromJSONTyped,
  fP as StateEntitySchemaPageResponseToJSON,
  OP as StateKeyValueStoreDataRequestAllOfFromJSON,
  x_ as StateKeyValueStoreDataRequestAllOfFromJSONTyped,
  SP as StateKeyValueStoreDataRequestAllOfToJSON,
  gP as StateKeyValueStoreDataRequestFromJSON,
  E_ as StateKeyValueStoreDataRequestFromJSONTyped,
  wn as StateKeyValueStoreDataRequestKeyItemFromJSON,
  D_ as StateKeyValueStoreDataRequestKeyItemFromJSONTyped,
  Pn as StateKeyValueStoreDataRequestKeyItemToJSON,
  C_ as StateKeyValueStoreDataRequestToJSON,
  RP as StateKeyValueStoreDataResponseAllOfFromJSON,
  B_ as StateKeyValueStoreDataResponseAllOfFromJSONTyped,
  hP as StateKeyValueStoreDataResponseAllOfToJSON,
  M_ as StateKeyValueStoreDataResponseFromJSON,
  U_ as StateKeyValueStoreDataResponseFromJSONTyped,
  Dn as StateKeyValueStoreDataResponseItemFromJSON,
  q_ as StateKeyValueStoreDataResponseItemFromJSONTyped,
  En as StateKeyValueStoreDataResponseItemToJSON,
  FP as StateKeyValueStoreDataResponseToJSON,
  VP as StateKeyValueStoreKeysCollectionAllOfFromJSON,
  G_ as StateKeyValueStoreKeysCollectionAllOfFromJSONTyped,
  wP as StateKeyValueStoreKeysCollectionAllOfToJSON,
  vP as StateKeyValueStoreKeysCollectionFromJSON,
  L_ as StateKeyValueStoreKeysCollectionFromJSONTyped,
  JP as StateKeyValueStoreKeysCollectionToJSON,
  CP as StateKeyValueStoreKeysRequestAllOfFromJSON,
  W_ as StateKeyValueStoreKeysRequestAllOfFromJSONTyped,
  xP as StateKeyValueStoreKeysRequestAllOfToJSON,
  DP as StateKeyValueStoreKeysRequestFromJSON,
  H_ as StateKeyValueStoreKeysRequestFromJSONTyped,
  z_ as StateKeyValueStoreKeysRequestToJSON,
  $_ as StateKeyValueStoreKeysResponseFromJSON,
  X_ as StateKeyValueStoreKeysResponseFromJSONTyped,
  Je as StateKeyValueStoreKeysResponseItemFromJSON,
  K_ as StateKeyValueStoreKeysResponseItemFromJSONTyped,
  Ie as StateKeyValueStoreKeysResponseItemToJSON,
  MP as StateKeyValueStoreKeysResponseToJSON,
  BP as StateNonFungibleDataRequestFromJSON,
  Z_ as StateNonFungibleDataRequestFromJSONTyped,
  Q_ as StateNonFungibleDataRequestToJSON,
  zP as StateNonFungibleDataResponseAllOfFromJSON,
  tf as StateNonFungibleDataResponseAllOfFromJSONTyped,
  WP as StateNonFungibleDataResponseAllOfToJSON,
  j_ as StateNonFungibleDataResponseFromJSON,
  ef as StateNonFungibleDataResponseFromJSONTyped,
  GP as StateNonFungibleDataResponseToJSON,
  Cn as StateNonFungibleDetailsResponseItemFromJSON,
  Y_ as StateNonFungibleDetailsResponseItemFromJSONTyped,
  xn as StateNonFungibleDetailsResponseItemToJSON,
  QP as StateNonFungibleIdsRequestAllOfFromJSON,
  af as StateNonFungibleIdsRequestAllOfFromJSONTyped,
  YP as StateNonFungibleIdsRequestAllOfToJSON,
  XP as StateNonFungibleIdsRequestFromJSON,
  rf as StateNonFungibleIdsRequestFromJSONTyped,
  nf as StateNonFungibleIdsRequestToJSON,
  rD as StateNonFungibleIdsResponseAllOfFromJSON,
  lf as StateNonFungibleIdsResponseAllOfFromJSONTyped,
  nD as StateNonFungibleIdsResponseAllOfToJSON,
  of as StateNonFungibleIdsResponseFromJSON,
  uf as StateNonFungibleIdsResponseFromJSONTyped,
  eD as StateNonFungibleIdsResponseToJSON,
  uD as StateNonFungibleLocationRequestAllOfFromJSON,
  df as StateNonFungibleLocationRequestAllOfFromJSONTyped,
  lD as StateNonFungibleLocationRequestAllOfToJSON,
  aD as StateNonFungibleLocationRequestFromJSON,
  sf as StateNonFungibleLocationRequestFromJSONTyped,
  cf as StateNonFungibleLocationRequestToJSON,
  fD as StateNonFungibleLocationResponseAllOfFromJSON,
  pf as StateNonFungibleLocationResponseAllOfFromJSONTyped,
  mD as StateNonFungibleLocationResponseAllOfToJSON,
  ff as StateNonFungibleLocationResponseFromJSON,
  mf as StateNonFungibleLocationResponseFromJSONTyped,
  qn as StateNonFungibleLocationResponseItemFromJSON,
  _f as StateNonFungibleLocationResponseItemFromJSONTyped,
  Mn as StateNonFungibleLocationResponseItemToJSON,
  dD as StateNonFungibleLocationResponseToJSON,
  OD as StatePackageBlueprintPageRequestAllOfFromJSON,
  Of as StatePackageBlueprintPageRequestAllOfFromJSONTyped,
  SD as StatePackageBlueprintPageRequestAllOfToJSON,
  gD as StatePackageBlueprintPageRequestFromJSON,
  gf as StatePackageBlueprintPageRequestFromJSONTyped,
  yf as StatePackageBlueprintPageRequestToJSON,
  Sf as StatePackageBlueprintPageResponseFromJSON,
  Nf as StatePackageBlueprintPageResponseFromJSONTyped,
  bD as StatePackageBlueprintPageResponseToJSON,
  AD as StatePackageCodePageRequestFromJSON,
  bf as StatePackageCodePageRequestFromJSONTyped,
  Ff as StatePackageCodePageRequestToJSON,
  Af as StatePackageCodePageResponseFromJSON,
  Rf as StatePackageCodePageResponseFromJSONTyped,
  hD as StatePackageCodePageResponseToJSON,
  JD as StateValidatorsListRequestAllOfFromJSON,
  Tf as StateValidatorsListRequestAllOfFromJSONTyped,
  ID as StateValidatorsListRequestAllOfToJSON,
  TD as StateValidatorsListRequestFromJSON,
  hf as StateValidatorsListRequestFromJSONTyped,
  kf as StateValidatorsListRequestToJSON,
  BD as StateValidatorsListResponseAllOfFromJSON,
  Hf as StateValidatorsListResponseAllOfFromJSONTyped,
  KD as StateValidatorsListResponseAllOfToJSON,
  Lf as StateValidatorsListResponseFromJSON,
  Gf as StateValidatorsListResponseFromJSONTyped,
  MD as StateValidatorsListResponseToJSON,
  lp as Statistics,
  ep as StatisticsApi,
  sp as Status,
  tp as StatusApi,
  cp as Stream,
  rp as StreamApi,
  eE as StreamTransactionsRequestAllOfFromJSON,
  Qf as StreamTransactionsRequestAllOfFromJSONTyped,
  QD as StreamTransactionsRequestAllOfKindFilterEnum,
  Gn as StreamTransactionsRequestAllOfManifestClassFilterFromJSON,
  zf as StreamTransactionsRequestAllOfManifestClassFilterFromJSONTyped,
  Hn as StreamTransactionsRequestAllOfManifestClassFilterToJSON,
  YD as StreamTransactionsRequestAllOfOrderEnum,
  tE as StreamTransactionsRequestAllOfToJSON,
  GD as StreamTransactionsRequestEventFilterItemEventEnum,
  zn as StreamTransactionsRequestEventFilterItemFromJSON,
  Wf as StreamTransactionsRequestEventFilterItemFromJSONTyped,
  Wn as StreamTransactionsRequestEventFilterItemToJSON,
  ZD as StreamTransactionsRequestFromJSON,
  Xf as StreamTransactionsRequestFromJSONTyped,
  WD as StreamTransactionsRequestKindFilterEnum,
  $D as StreamTransactionsRequestOrderEnum,
  Zf as StreamTransactionsRequestToJSON,
  aE as StreamTransactionsResponseAllOfFromJSON,
  em as StreamTransactionsResponseAllOfFromJSONTyped,
  oE as StreamTransactionsResponseAllOfToJSON,
  Yf as StreamTransactionsResponseFromJSON,
  jf as StreamTransactionsResponseFromJSONTyped,
  nE as StreamTransactionsResponseToJSON,
  Np as TextApiResponse,
  dp as Transaction,
  lE as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeBaseFromJSON,
  tm as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeBaseFromJSONTyped,
  sE as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeBaseToJSON,
  ze as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeFromJSON,
  ki as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeFromJSONTyped,
  We as TransactionAccountDepositPreValidationAuthorizedDepositorBadgeToJSON,
  np as TransactionApi,
  Na as TransactionBalanceChangesFromJSON,
  ba as TransactionBalanceChangesFromJSONTyped,
  Fa as TransactionBalanceChangesToJSON,
  fE as TransactionCommittedDetailsRequestAllOfFromJSON,
  im as TransactionCommittedDetailsRequestAllOfFromJSONTyped,
  mE as TransactionCommittedDetailsRequestAllOfToJSON,
  dE as TransactionCommittedDetailsRequestFromJSON,
  rm as TransactionCommittedDetailsRequestFromJSONTyped,
  nm as TransactionCommittedDetailsRequestToJSON,
  OE as TransactionCommittedDetailsResponseAllOfFromJSON,
  um as TransactionCommittedDetailsResponseAllOfFromJSONTyped,
  SE as TransactionCommittedDetailsResponseAllOfToJSON,
  am as TransactionCommittedDetailsResponseFromJSON,
  om as TransactionCommittedDetailsResponseFromJSONTyped,
  gE as TransactionCommittedDetailsResponseToJSON,
  lm as TransactionConstructionResponseFromJSON,
  sm as TransactionConstructionResponseFromJSONTyped,
  bE as TransactionConstructionResponseToJSON,
  ie as TransactionDetailsOptInsFromJSON,
  $f as TransactionDetailsOptInsFromJSONTyped,
  ae as TransactionDetailsOptInsToJSON,
  sa as TransactionFungibleBalanceChangesFromJSON,
  ca as TransactionFungibleBalanceChangesFromJSONTyped,
  da as TransactionFungibleBalanceChangesToJSON,
  Ny as TransactionFungibleFeeBalanceChangeType,
  _a as TransactionFungibleFeeBalanceChangeTypeFromJSON,
  fa as TransactionFungibleFeeBalanceChangeTypeFromJSONTyped,
  by as TransactionFungibleFeeBalanceChangeTypeToJSON,
  ma as TransactionFungibleFeeBalanceChangesFromJSON,
  pa as TransactionFungibleFeeBalanceChangesFromJSONTyped,
  ga as TransactionFungibleFeeBalanceChangesToJSON,
  FE as TransactionIntentStatus,
  $n as TransactionIntentStatusFromJSON,
  cm as TransactionIntentStatusFromJSONTyped,
  AE as TransactionIntentStatusToJSON,
  ya as TransactionNonFungibleBalanceChangesFromJSON,
  Oa as TransactionNonFungibleBalanceChangesFromJSONTyped,
  Sa as TransactionNonFungibleBalanceChangesToJSON,
  kE as TransactionNotFoundErrorAllOfFromJSON,
  dm as TransactionNotFoundErrorAllOfFromJSONTyped,
  TE as TransactionNotFoundErrorAllOfToJSON,
  RE as TransactionNotFoundErrorAllOfTypeEnum,
  Gb as TransactionNotFoundErrorFromJSON,
  kr as TransactionNotFoundErrorFromJSONTyped,
  Ru as TransactionNotFoundErrorToJSON,
  Kb as TransactionNotFoundErrorTypeEnum,
  vE as TransactionPayloadGatewayHandlingStatus,
  _m as TransactionPayloadGatewayHandlingStatusFromJSON,
  fm as TransactionPayloadGatewayHandlingStatusFromJSONTyped,
  JE as TransactionPayloadGatewayHandlingStatusToJSON,
  IE as TransactionPayloadStatus,
  mm as TransactionPayloadStatusFromJSON,
  pm as TransactionPayloadStatusFromJSONTyped,
  VE as TransactionPayloadStatusToJSON,
  gm as TransactionPreviewOptInsFromJSON,
  ym as TransactionPreviewOptInsFromJSONTyped,
  Om as TransactionPreviewOptInsToJSON,
  Sm as TransactionPreviewRequestFlagsFromJSON,
  Nm as TransactionPreviewRequestFlagsFromJSONTyped,
  bm as TransactionPreviewRequestFlagsToJSON,
  EE as TransactionPreviewRequestFromJSON,
  Fm as TransactionPreviewRequestFromJSONTyped,
  Am as TransactionPreviewRequestToJSON,
  Tm as TransactionPreviewResponseFromJSON,
  vm as TransactionPreviewResponseFromJSONTyped,
  Rm as TransactionPreviewResponseLogsInnerFromJSON,
  hm as TransactionPreviewResponseLogsInnerFromJSONTyped,
  km as TransactionPreviewResponseLogsInnerToJSON,
  qE as TransactionPreviewResponseToJSON,
  Ya as TransactionReceiptFromJSON,
  ja as TransactionReceiptFromJSONTyped,
  eo as TransactionReceiptToJSON,
  BO as TransactionStatus,
  U as TransactionStatusFromJSON,
  Qa as TransactionStatusFromJSONTyped,
  KE as TransactionStatusRequestAllOfFromJSON,
  Vm as TransactionStatusRequestAllOfFromJSONTyped,
  LE as TransactionStatusRequestAllOfToJSON,
  UE as TransactionStatusRequestFromJSON,
  Jm as TransactionStatusRequestFromJSONTyped,
  Im as TransactionStatusRequestToJSON,
  $E as TransactionStatusResponseAllOfFromJSON,
  Em as TransactionStatusResponseAllOfFromJSONTyped,
  XE as TransactionStatusResponseAllOfToJSON,
  Pm as TransactionStatusResponseFromJSON,
  Dm as TransactionStatusResponseFromJSONTyped,
  Xn as TransactionStatusResponseKnownPayloadItemFromJSON,
  wm as TransactionStatusResponseKnownPayloadItemFromJSONTyped,
  Zn as TransactionStatusResponseKnownPayloadItemToJSON,
  zE as TransactionStatusResponseToJSON,
  KO as TransactionStatusToJSON,
  QE as TransactionSubmitRequestFromJSON,
  Cm as TransactionSubmitRequestFromJSONTyped,
  xm as TransactionSubmitRequestToJSON,
  qm as TransactionSubmitResponseFromJSON,
  Mm as TransactionSubmitResponseFromJSONTyped,
  jE as TransactionSubmitResponseToJSON,
  gn as TwoWayLinkedDappOnLedgerDetailsFromJSON,
  vd as TwoWayLinkedDappOnLedgerDetailsFromJSONTyped,
  yn as TwoWayLinkedDappOnLedgerDetailsToJSON,
  tC as TwoWayLinkedDappsCollectionAllOfFromJSON,
  Um as TwoWayLinkedDappsCollectionAllOfFromJSONTyped,
  rC as TwoWayLinkedDappsCollectionAllOfToJSON,
  H as TwoWayLinkedDappsCollectionFromJSON,
  Ad as TwoWayLinkedDappsCollectionFromJSONTyped,
  _n as TwoWayLinkedDappsCollectionItemFromJSON,
  Fd as TwoWayLinkedDappsCollectionItemFromJSONTyped,
  fn as TwoWayLinkedDappsCollectionItemToJSON,
  z as TwoWayLinkedDappsCollectionToJSON,
  iC as TwoWayLinkedEntitiesCollectionAllOfFromJSON,
  Bm as TwoWayLinkedEntitiesCollectionAllOfFromJSONTyped,
  aC as TwoWayLinkedEntitiesCollectionAllOfToJSON,
  hd as TwoWayLinkedEntitiesCollectionFromJSON,
  kd as TwoWayLinkedEntitiesCollectionFromJSONTyped,
  mn as TwoWayLinkedEntitiesCollectionItemFromJSON,
  Rd as TwoWayLinkedEntitiesCollectionItemFromJSONTyped,
  pn as TwoWayLinkedEntitiesCollectionItemToJSON,
  Td as TwoWayLinkedEntitiesCollectionToJSON,
  br as ValidationErrorsAtPathFromJSON,
  Nu as ValidationErrorsAtPathFromJSONTyped,
  Fr as ValidationErrorsAtPathToJSON,
  uC as ValidatorCollectionAllOfFromJSON,
  Km as ValidatorCollectionAllOfFromJSONTyped,
  lC as ValidatorCollectionAllOfToJSON,
  Kn as ValidatorCollectionFromJSON,
  Kf as ValidatorCollectionFromJSONTyped,
  vf as ValidatorCollectionItemActiveInEpochFromJSON,
  Jf as ValidatorCollectionItemActiveInEpochFromJSONTyped,
  If as ValidatorCollectionItemActiveInEpochToJSON,
  Vf as ValidatorCollectionItemEffectiveFeeFactorCurrentFromJSON,
  wf as ValidatorCollectionItemEffectiveFeeFactorCurrentFromJSONTyped,
  Pf as ValidatorCollectionItemEffectiveFeeFactorCurrentToJSON,
  xf as ValidatorCollectionItemEffectiveFeeFactorFromJSON,
  qf as ValidatorCollectionItemEffectiveFeeFactorFromJSONTyped,
  Df as ValidatorCollectionItemEffectiveFeeFactorPendingFromJSON,
  Ef as ValidatorCollectionItemEffectiveFeeFactorPendingFromJSONTyped,
  Cf as ValidatorCollectionItemEffectiveFeeFactorPendingToJSON,
  Mf as ValidatorCollectionItemEffectiveFeeFactorToJSON,
  Un as ValidatorCollectionItemFromJSON,
  Bf as ValidatorCollectionItemFromJSONTyped,
  Bn as ValidatorCollectionItemToJSON,
  Ln as ValidatorCollectionToJSON,
  Qn as ValidatorUptimeCollectionFromJSON,
  zm as ValidatorUptimeCollectionFromJSONTyped,
  Lm as ValidatorUptimeCollectionItemFromJSON,
  Gm as ValidatorUptimeCollectionItemFromJSONTyped,
  Hm as ValidatorUptimeCollectionItemToJSON,
  Yn as ValidatorUptimeCollectionToJSON,
  W as ValidatorVaultItemFromJSON,
  Uf as ValidatorVaultItemFromJSONTyped,
  $ as ValidatorVaultItemToJSON,
  mC as ValidatorsUptimeRequestAllOfFromJSON,
  Xm as ValidatorsUptimeRequestAllOfFromJSONTyped,
  pC as ValidatorsUptimeRequestAllOfToJSON,
  _C as ValidatorsUptimeRequestFromJSON,
  Wm as ValidatorsUptimeRequestFromJSONTyped,
  $m as ValidatorsUptimeRequestToJSON,
  SC as ValidatorsUptimeResponseAllOfFromJSON,
  Ym as ValidatorsUptimeResponseAllOfFromJSONTyped,
  NC as ValidatorsUptimeResponseAllOfToJSON,
  Zm as ValidatorsUptimeResponseFromJSON,
  Qm as ValidatorsUptimeResponseFromJSONTyped,
  yC as ValidatorsUptimeResponseToJSON,
  Op as VoidApiResponse,
  yp as canConsumeForm,
  X as chunk,
  M as exhaustPaginationWithLedgerState,
  r as exists,
  Jp as instanceOfAccountAuthorizedDepositorsCollection,
  wp as instanceOfAccountAuthorizedDepositorsCollectionAllOf,
  Rp as instanceOfAccountAuthorizedDepositorsNonFungibleBadge,
  Cp as instanceOfAccountAuthorizedDepositorsNonFungibleBadgeAllOf,
  Tp as instanceOfAccountAuthorizedDepositorsResourceBadge,
  Up as instanceOfAccountAuthorizedDepositorsResourceBadgeAllOf,
  Lp as instanceOfAccountAuthorizedDepositorsResponseItemBase,
  Qp as instanceOfAccountDepositPreValidationDecidingFactors,
  Zp as instanceOfAccountDepositPreValidationDecidingFactorsResourceSpecificDetailsItem,
  jp as instanceOfAccountDepositPreValidationNonFungibleBadge,
  rg as instanceOfAccountDepositPreValidationNonFungibleBadgeAllOf,
  lg as instanceOfAccountDepositPreValidationRequest,
  cg as instanceOfAccountDepositPreValidationRequestAllOf,
  og as instanceOfAccountDepositPreValidationResourceBadge,
  mg as instanceOfAccountDepositPreValidationResourceBadgeAllOf,
  yg as instanceOfAccountDepositPreValidationResourceSpecificBehaviourItem,
  Sg as instanceOfAccountDepositPreValidationResponse,
  bg as instanceOfAccountDepositPreValidationResponseAllOf,
  Rg as instanceOfAccountLockerAddress,
  kg as instanceOfAccountLockerNotFoundError,
  Jg as instanceOfAccountLockerNotFoundErrorAllOf,
  qg as instanceOfAccountLockerVaultCollection,
  Bg as instanceOfAccountLockerVaultCollectionAllOf,
  zg as instanceOfAccountLockerVaultCollectionItemBase,
  Pg as instanceOfAccountLockerVaultCollectionItemFungible,
  Zg as instanceOfAccountLockerVaultCollectionItemFungibleAllOf,
  Cg as instanceOfAccountLockerVaultCollectionItemNonFungible,
  ey as instanceOfAccountLockerVaultCollectionItemNonFungibleAllOf,
  iy as instanceOfAccountResourcePreferencesCollection,
  uy as instanceOfAccountResourcePreferencesCollectionAllOf,
  ny as instanceOfAccountResourcePreferencesResponseItem,
  dy as instanceOfAtLedgerStateMixin,
  gy as instanceOfBlueprintMethodRoyalty,
  yy as instanceOfBlueprintRoyaltyConfig,
  GO as instanceOfCommittedTransactionInfo,
  QO as instanceOfComponentEntityRoleAssignmentEntry,
  WO as instanceOfComponentEntityRoleAssignmentEntryAssignment,
  YO as instanceOfComponentEntityRoleAssignments,
  jO as instanceOfComponentMethodRoyalty,
  eS as instanceOfComponentRoyaltyConfig,
  tS as instanceOfCursorLimitMixin,
  ub as instanceOfEntityMetadataCollection,
  lb as instanceOfEntityMetadataCollectionAllOf,
  ob as instanceOfEntityMetadataItem,
  ab as instanceOfEntityMetadataItemValue,
  db as instanceOfEntityMetadataItemValueAllOf,
  pb as instanceOfEntityNotFoundError,
  Ob as instanceOfEntityNotFoundErrorAllOf,
  Fb as instanceOfEntitySchemaCollection,
  Ab as instanceOfEntitySchemaCollectionAllOf,
  bb as instanceOfEntitySchemaCollectionItem,
  Hb as instanceOfErrorResponse,
  UO as instanceOfEventsItem,
  $b as instanceOfFromLedgerStateMixin,
  a0 as instanceOfFungibleResourcesCollection,
  o0 as instanceOfFungibleResourcesCollectionAllOf,
  c0 as instanceOfFungibleResourcesCollectionItemBase,
  Yb as instanceOfFungibleResourcesCollectionItemGloballyAggregated,
  m0 as instanceOfFungibleResourcesCollectionItemGloballyAggregatedAllOf,
  n0 as instanceOfFungibleResourcesCollectionItemVaultAggregated,
  O0 as instanceOfFungibleResourcesCollectionItemVaultAggregatedAllOf,
  t0 as instanceOfFungibleResourcesCollectionItemVaultAggregatedVault,
  b0 as instanceOfFungibleResourcesCollectionItemVaultAggregatedVaultAllOf,
  e0 as instanceOfFungibleResourcesCollectionItemVaultAggregatedVaultItem,
  R0 as instanceOfGatewayErrorBase,
  T0 as instanceOfGatewayInfoResponseKnownTarget,
  I0 as instanceOfGatewayInfoResponseReleaseInfo,
  V0 as instanceOfGatewayStatusResponse,
  P0 as instanceOfGatewayStatusResponseAllOf,
  Tb as instanceOfInternalServerError,
  x0 as instanceOfInternalServerErrorAllOf,
  Ib as instanceOfInvalidEntityError,
  B0 as instanceOfInvalidEntityErrorAllOf,
  Db as instanceOfInvalidRequestError,
  H0 as instanceOfInvalidRequestErrorAllOf,
  xb as instanceOfInvalidTransactionError,
  X0 as instanceOfInvalidTransactionErrorAllOf,
  Og as instanceOfLedgerState,
  Y0 as instanceOfLedgerStateMixin,
  cy as instanceOfLedgerStateSelector,
  aS as instanceOfMetadataBoolArrayValue,
  rF as instanceOfMetadataBoolArrayValueAllOf,
  lS as instanceOfMetadataBoolValue,
  oF as instanceOfMetadataBoolValueAllOf,
  dS as instanceOfMetadataDecimalArrayValue,
  cF as instanceOfMetadataDecimalArrayValueAllOf,
  mS as instanceOfMetadataDecimalValue,
  mF as instanceOfMetadataDecimalValueAllOf,
  yS as instanceOfMetadataGlobalAddressArrayValue,
  OF as instanceOfMetadataGlobalAddressArrayValueAllOf,
  NS as instanceOfMetadataGlobalAddressValue,
  FF as instanceOfMetadataGlobalAddressValueAllOf,
  AS as instanceOfMetadataI32ArrayValue,
  kF as instanceOfMetadataI32ArrayValueAllOf,
  kS as instanceOfMetadataI32Value,
  IF as instanceOfMetadataI32ValueAllOf,
  JS as instanceOfMetadataI64ArrayValue,
  DF as instanceOfMetadataI64ArrayValueAllOf,
  wS as instanceOfMetadataI64Value,
  qF as instanceOfMetadataI64ValueAllOf,
  ES as instanceOfMetadataInstantArrayValue,
  KF as instanceOfMetadataInstantArrayValueAllOf,
  qS as instanceOfMetadataInstantValue,
  zF as instanceOfMetadataInstantValueAllOf,
  KS as instanceOfMetadataNonFungibleGlobalIdArrayValue,
  ZF as instanceOfMetadataNonFungibleGlobalIdArrayValueAllOf,
  US as instanceOfMetadataNonFungibleGlobalIdArrayValueAllOfValues,
  HS as instanceOfMetadataNonFungibleGlobalIdValue,
  eA as instanceOfMetadataNonFungibleGlobalIdValueAllOf,
  $S as instanceOfMetadataNonFungibleLocalIdArrayValue,
  iA as instanceOfMetadataNonFungibleLocalIdArrayValueAllOf,
  QS as instanceOfMetadataNonFungibleLocalIdValue,
  lA as instanceOfMetadataNonFungibleLocalIdValueAllOf,
  eN as instanceOfMetadataOriginArrayValue,
  _A as instanceOfMetadataOriginArrayValueAllOf,
  nN as instanceOfMetadataOriginValue,
  gA as instanceOfMetadataOriginValueAllOf,
  _N as instanceOfMetadataPublicKeyArrayValue,
  NA as instanceOfMetadataPublicKeyArrayValueAllOf,
  bN as instanceOfMetadataPublicKeyHashArrayValue,
  RA as instanceOfMetadataPublicKeyHashArrayValueAllOf,
  RN as instanceOfMetadataPublicKeyHashValue,
  vA as instanceOfMetadataPublicKeyHashValueAllOf,
  TN as instanceOfMetadataPublicKeyValue,
  wA as instanceOfMetadataPublicKeyValueAllOf,
  IN as instanceOfMetadataStringArrayValue,
  CA as instanceOfMetadataStringArrayValueAllOf,
  PN as instanceOfMetadataStringValue,
  UA as instanceOfMetadataStringValueAllOf,
  HA as instanceOfMetadataTypedValueBase,
  CN as instanceOfMetadataU32ArrayValue,
  XA as instanceOfMetadataU32ArrayValueAllOf,
  MN as instanceOfMetadataU32Value,
  jA as instanceOfMetadataU32ValueAllOf,
  KN as instanceOfMetadataU64ArrayValue,
  nR as instanceOfMetadataU64ArrayValueAllOf,
  HN as instanceOfMetadataU64Value,
  uR as instanceOfMetadataU64ValueAllOf,
  $N as instanceOfMetadataU8ArrayValue,
  dR as instanceOfMetadataU8ArrayValueAllOf,
  QN as instanceOfMetadataU8Value,
  pR as instanceOfMetadataU8ValueAllOf,
  eb as instanceOfMetadataUrlArrayValue,
  SR as instanceOfMetadataUrlArrayValueAllOf,
  nb as instanceOfMetadataUrlValue,
  AR as instanceOfMetadataUrlValueAllOf,
  TR as instanceOfNativeResourceAccessControllerRecoveryBadgeValue,
  IR as instanceOfNativeResourceAccessControllerRecoveryBadgeValueAllOf,
  DR as instanceOfNativeResourceAccountOwnerBadgeValue,
  xR as instanceOfNativeResourceAccountOwnerBadgeValueAllOf,
  Vh as instanceOfNativeResourceDetailsBase,
  BR as instanceOfNativeResourceEd25519SignatureResourceValue,
  Eh as instanceOfNativeResourceEd25519SignatureResourceValueAllOf,
  GR as instanceOfNativeResourceGlobalCallerResourceValue,
  Mh as instanceOfNativeResourceGlobalCallerResourceValueAllOf,
  WR as instanceOfNativeResourceIdentityOwnerBadgeValue,
  Lh as instanceOfNativeResourceIdentityOwnerBadgeValueAllOf,
  QR as instanceOfNativeResourceMultiResourcePoolUnitValue,
  Wh as instanceOfNativeResourceMultiResourcePoolUnitValueAllOf,
  eh as instanceOfNativeResourceOneResourcePoolUnitValue,
  Qh as instanceOfNativeResourceOneResourcePoolUnitValueAllOf,
  nh as instanceOfNativeResourcePackageOfDirectCallerResourceValue,
  tk as instanceOfNativeResourcePackageOfDirectCallerResourceValueAllOf,
  oh as instanceOfNativeResourcePackageOwnerBadgeValue,
  ak as instanceOfNativeResourcePackageOwnerBadgeValueAllOf,
  XR as instanceOfNativeResourceRedemptionValueItem,
  sh as instanceOfNativeResourceSecp256k1SignatureResourceValue,
  sk as instanceOfNativeResourceSecp256k1SignatureResourceValueAllOf,
  _h as instanceOfNativeResourceSystemExecutionResourceValue,
  fk as instanceOfNativeResourceSystemExecutionResourceValueAllOf,
  ph as instanceOfNativeResourceTwoResourcePoolUnitValue,
  yk as instanceOfNativeResourceTwoResourcePoolUnitValueAllOf,
  Oh as instanceOfNativeResourceValidatorClaimNftValue,
  bk as instanceOfNativeResourceValidatorClaimNftValueAllOf,
  bh as instanceOfNativeResourceValidatorLiquidStakeUnitValue,
  hk as instanceOfNativeResourceValidatorLiquidStakeUnitValueAllOf,
  Rh as instanceOfNativeResourceValidatorOwnerBadgeValue,
  Jk as instanceOfNativeResourceValidatorOwnerBadgeValueAllOf,
  Th as instanceOfNativeResourceXrdValue,
  Pk as instanceOfNativeResourceXrdValueAllOf,
  xk as instanceOfNetworkConfigurationResponse,
  Ck as instanceOfNetworkConfigurationResponseWellKnownAddresses,
  Bk as instanceOfNonFungibleIdsCollection,
  Kk as instanceOfNonFungibleIdsCollectionAllOf,
  jk as instanceOfNonFungibleResourcesCollection,
  eT as instanceOfNonFungibleResourcesCollectionAllOf,
  nT as instanceOfNonFungibleResourcesCollectionItemBase,
  zk as instanceOfNonFungibleResourcesCollectionItemGloballyAggregated,
  uT as instanceOfNonFungibleResourcesCollectionItemGloballyAggregatedAllOf,
  Qk as instanceOfNonFungibleResourcesCollectionItemVaultAggregated,
  dT as instanceOfNonFungibleResourcesCollectionItemVaultAggregatedAllOf,
  Xk as instanceOfNonFungibleResourcesCollectionItemVaultAggregatedVault,
  mT as instanceOfNonFungibleResourcesCollectionItemVaultAggregatedVaultAllOf,
  $k as instanceOfNonFungibleResourcesCollectionItemVaultAggregatedVaultItem,
  yT as instanceOfNonFungibleResourcesCollectionItemVaultAggregatedVaultItemAllOf,
  Ub as instanceOfNotSyncedUpError,
  bT as instanceOfNotSyncedUpErrorAllOf,
  RT as instanceOfOptionalNonFungibleIdsCollection,
  TT as instanceOfOptionalNonFungibleIdsCollectionAllOf,
  VT as instanceOfPackageBlueprintCollection,
  wT as instanceOfPackageBlueprintCollectionAllOf,
  IT as instanceOfPackageBlueprintCollectionItem,
  qT as instanceOfPackageCodeCollection,
  MT as instanceOfPackageCodeCollectionAllOf,
  xT as instanceOfPackageCodeCollectionItem,
  vy as instanceOfProgrammaticScryptoSborValueArray,
  LT as instanceOfProgrammaticScryptoSborValueArrayAllOf,
  zT as instanceOfProgrammaticScryptoSborValueBase,
  Vy as instanceOfProgrammaticScryptoSborValueBool,
  ZT as instanceOfProgrammaticScryptoSborValueBoolAllOf,
  Dy as instanceOfProgrammaticScryptoSborValueBytes,
  ev as instanceOfProgrammaticScryptoSborValueBytesAllOf,
  xy as instanceOfProgrammaticScryptoSborValueDecimal,
  iv as instanceOfProgrammaticScryptoSborValueDecimalAllOf,
  Uy as instanceOfProgrammaticScryptoSborValueEnum,
  lv as instanceOfProgrammaticScryptoSborValueEnumAllOf,
  Ly as instanceOfProgrammaticScryptoSborValueI128,
  _v as instanceOfProgrammaticScryptoSborValueI128AllOf,
  zy as instanceOfProgrammaticScryptoSborValueI16,
  gv as instanceOfProgrammaticScryptoSborValueI16AllOf,
  Xy as instanceOfProgrammaticScryptoSborValueI32,
  Nv as instanceOfProgrammaticScryptoSborValueI32AllOf,
  Yy as instanceOfProgrammaticScryptoSborValueI64,
  Rv as instanceOfProgrammaticScryptoSborValueI64AllOf,
  tO as instanceOfProgrammaticScryptoSborValueI8,
  vv as instanceOfProgrammaticScryptoSborValueI8AllOf,
  aO as instanceOfProgrammaticScryptoSborValueMap,
  wv as instanceOfProgrammaticScryptoSborValueMapAllOf,
  nO as instanceOfProgrammaticScryptoSborValueMapEntry,
  lO as instanceOfProgrammaticScryptoSborValueNonFungibleLocalId,
  Cv as instanceOfProgrammaticScryptoSborValueNonFungibleLocalIdAllOf,
  dO as instanceOfProgrammaticScryptoSborValueOwn,
  Uv as instanceOfProgrammaticScryptoSborValueOwnAllOf,
  mO as instanceOfProgrammaticScryptoSborValuePreciseDecimal,
  Gv as instanceOfProgrammaticScryptoSborValuePreciseDecimalAllOf,
  yO as instanceOfProgrammaticScryptoSborValueReference,
  $v as instanceOfProgrammaticScryptoSborValueReferenceAllOf,
  NO as instanceOfProgrammaticScryptoSborValueString,
  Yv as instanceOfProgrammaticScryptoSborValueStringAllOf,
  AO as instanceOfProgrammaticScryptoSborValueTuple,
  rJ as instanceOfProgrammaticScryptoSborValueTupleAllOf,
  kO as instanceOfProgrammaticScryptoSborValueU128,
  oJ as instanceOfProgrammaticScryptoSborValueU128AllOf,
  JO as instanceOfProgrammaticScryptoSborValueU16,
  cJ as instanceOfProgrammaticScryptoSborValueU16AllOf,
  wO as instanceOfProgrammaticScryptoSborValueU32,
  mJ as instanceOfProgrammaticScryptoSborValueU32AllOf,
  EO as instanceOfProgrammaticScryptoSborValueU64,
  OJ as instanceOfProgrammaticScryptoSborValueU64AllOf,
  qO as instanceOfProgrammaticScryptoSborValueU8,
  FJ as instanceOfProgrammaticScryptoSborValueU8AllOf,
  TJ as instanceOfPublicKeyBase,
  oN as instanceOfPublicKeyEcdsaSecp256k1,
  VJ as instanceOfPublicKeyEcdsaSecp256k1AllOf,
  sN as instanceOfPublicKeyEddsaEd25519,
  EJ as instanceOfPublicKeyEddsaEd25519AllOf,
  UJ as instanceOfPublicKeyHashBase,
  pN as instanceOfPublicKeyHashEcdsaSecp256k1,
  GJ as instanceOfPublicKeyHashEcdsaSecp256k1AllOf,
  ON as instanceOfPublicKeyHashEddsaEd25519,
  $J as instanceOfPublicKeyHashEddsaEd25519AllOf,
  nI as instanceOfResourceHoldersCollection,
  oI as instanceOfResourceHoldersCollectionAllOf,
  YJ as instanceOfResourceHoldersCollectionFungibleResourceItem,
  cI as instanceOfResourceHoldersCollectionFungibleResourceItemAllOf,
  pI as instanceOfResourceHoldersCollectionItemBase,
  tI as instanceOfResourceHoldersCollectionNonFungibleResourceItem,
  SI as instanceOfResourceHoldersCollectionNonFungibleResourceItemAllOf,
  FI as instanceOfResourceHoldersRequest,
  RI as instanceOfResourceHoldersRequestAllOf,
  TI as instanceOfResourceHoldersResponse,
  JI as instanceOfResultSetCursorMixin,
  ZO as instanceOfRoleKey,
  py as instanceOfRoyaltyAmount,
  wI as instanceOfScryptoSborValue,
  PI as instanceOfStateAccountAuthorizedDepositorsPageRequest,
  EI as instanceOfStateAccountAuthorizedDepositorsPageResponse,
  xI as instanceOfStateAccountLockerPageVaultsRequest,
  MI as instanceOfStateAccountLockerPageVaultsResponse,
  BI as instanceOfStateAccountLockersTouchedAtRequest,
  LI as instanceOfStateAccountLockersTouchedAtRequestAllOf,
  WI as instanceOfStateAccountLockersTouchedAtResponse,
  XI as instanceOfStateAccountLockersTouchedAtResponseAllOf,
  zI as instanceOfStateAccountLockersTouchedAtResponseItem,
  YI as instanceOfStateAccountLockersTouchedAtResponseItemAllOf,
  tV as instanceOfStateAccountResourcePreferencesPageRequest,
  nV as instanceOfStateAccountResourcePreferencesPageRequestAllOf,
  oV as instanceOfStateAccountResourcePreferencesPageResponse,
  lV as instanceOfStateEntityDetailsOptIns,
  sV as instanceOfStateEntityDetailsRequest,
  dV as instanceOfStateEntityDetailsRequestAllOf,
  MV as instanceOfStateEntityDetailsResponse,
  BV as instanceOfStateEntityDetailsResponseAllOf,
  bV as instanceOfStateEntityDetailsResponseComponentDetails,
  HV as instanceOfStateEntityDetailsResponseComponentDetailsAllOf,
  RV as instanceOfStateEntityDetailsResponseFungibleResourceDetails,
  XV as instanceOfStateEntityDetailsResponseFungibleResourceDetailsAllOf,
  TV as instanceOfStateEntityDetailsResponseFungibleVaultDetails,
  jV as instanceOfStateEntityDetailsResponseFungibleVaultDetailsAllOf,
  qV as instanceOfStateEntityDetailsResponseItem,
  mV as instanceOfStateEntityDetailsResponseItemAncestorIdentities,
  iw as instanceOfStateEntityDetailsResponseItemDetailsBase,
  IV as instanceOfStateEntityDetailsResponseNonFungibleResourceDetails,
  lw as instanceOfStateEntityDetailsResponseNonFungibleResourceDetailsAllOf,
  PV as instanceOfStateEntityDetailsResponseNonFungibleVaultDetails,
  _w as instanceOfStateEntityDetailsResponseNonFungibleVaultDetailsAllOf,
  CV as instanceOfStateEntityDetailsResponsePackageDetails,
  gw as instanceOfStateEntityDetailsResponsePackageDetailsAllOf,
  Sw as instanceOfStateEntityFungibleResourceVaultsPageRequest,
  bw as instanceOfStateEntityFungibleResourceVaultsPageRequestAllOf,
  Rw as instanceOfStateEntityFungibleResourceVaultsPageResponse,
  Tw as instanceOfStateEntityFungiblesPageRequest,
  Jw as instanceOfStateEntityFungiblesPageRequestAllOf,
  kw as instanceOfStateEntityFungiblesPageRequestOptIns,
  ww as instanceOfStateEntityFungiblesPageResponse,
  Dw as instanceOfStateEntityMetadataPageRequest,
  Cw as instanceOfStateEntityMetadataPageRequestAllOf,
  Mw as instanceOfStateEntityMetadataPageResponse,
  Bw as instanceOfStateEntityNonFungibleIdsPageRequest,
  Lw as instanceOfStateEntityNonFungibleIdsPageRequestAllOf,
  zw as instanceOfStateEntityNonFungibleIdsPageResponse,
  $w as instanceOfStateEntityNonFungibleResourceVaultsPageOptIns,
  Xw as instanceOfStateEntityNonFungibleResourceVaultsPageRequest,
  Qw as instanceOfStateEntityNonFungibleResourceVaultsPageRequestAllOf,
  eP as instanceOfStateEntityNonFungibleResourceVaultsPageResponse,
  nP as instanceOfStateEntityNonFungiblesPageRequest,
  aP as instanceOfStateEntityNonFungiblesPageRequestAllOf,
  rP as instanceOfStateEntityNonFungiblesPageRequestOptIns,
  lP as instanceOfStateEntityNonFungiblesPageResponse,
  cP as instanceOfStateEntitySchemaPageRequest,
  _P as instanceOfStateEntitySchemaPageResponse,
  pP as instanceOfStateKeyValueStoreDataRequest,
  yP as instanceOfStateKeyValueStoreDataRequestAllOf,
  mP as instanceOfStateKeyValueStoreDataRequestKeyItem,
  bP as instanceOfStateKeyValueStoreDataResponse,
  AP as instanceOfStateKeyValueStoreDataResponseAllOf,
  NP as instanceOfStateKeyValueStoreDataResponseItem,
  TP as instanceOfStateKeyValueStoreKeysCollection,
  IP as instanceOfStateKeyValueStoreKeysCollectionAllOf,
  PP as instanceOfStateKeyValueStoreKeysRequest,
  EP as instanceOfStateKeyValueStoreKeysRequestAllOf,
  qP as instanceOfStateKeyValueStoreKeysResponse,
  kP as instanceOfStateKeyValueStoreKeysResponseItem,
  UP as instanceOfStateNonFungibleDataRequest,
  LP as instanceOfStateNonFungibleDataResponse,
  HP as instanceOfStateNonFungibleDataResponseAllOf,
  KP as instanceOfStateNonFungibleDetailsResponseItem,
  $P as instanceOfStateNonFungibleIdsRequest,
  ZP as instanceOfStateNonFungibleIdsRequestAllOf,
  jP as instanceOfStateNonFungibleIdsResponse,
  tD as instanceOfStateNonFungibleIdsResponseAllOf,
  iD as instanceOfStateNonFungibleLocationRequest,
  oD as instanceOfStateNonFungibleLocationRequestAllOf,
  cD as instanceOfStateNonFungibleLocationResponse,
  _D as instanceOfStateNonFungibleLocationResponseAllOf,
  sD as instanceOfStateNonFungibleLocationResponseItem,
  pD as instanceOfStatePackageBlueprintPageRequest,
  yD as instanceOfStatePackageBlueprintPageRequestAllOf,
  ND as instanceOfStatePackageBlueprintPageResponse,
  FD as instanceOfStatePackageCodePageRequest,
  RD as instanceOfStatePackageCodePageResponse,
  kD as instanceOfStateValidatorsListRequest,
  vD as instanceOfStateValidatorsListRequestAllOf,
  qD as instanceOfStateValidatorsListResponse,
  UD as instanceOfStateValidatorsListResponseAllOf,
  XD as instanceOfStreamTransactionsRequest,
  jD as instanceOfStreamTransactionsRequestAllOf,
  LD as instanceOfStreamTransactionsRequestAllOfManifestClassFilter,
  HD as instanceOfStreamTransactionsRequestEventFilterItem,
  rE as instanceOfStreamTransactionsResponse,
  iE as instanceOfStreamTransactionsResponseAllOf,
  uE as instanceOfTransactionAccountDepositPreValidationAuthorizedDepositorBadgeBase,
  Ry as instanceOfTransactionBalanceChanges,
  cE as instanceOfTransactionCommittedDetailsRequest,
  _E as instanceOfTransactionCommittedDetailsRequestAllOf,
  pE as instanceOfTransactionCommittedDetailsResponse,
  yE as instanceOfTransactionCommittedDetailsResponseAllOf,
  NE as instanceOfTransactionConstructionResponse,
  zD as instanceOfTransactionDetailsOptIns,
  Sy as instanceOfTransactionFungibleBalanceChanges,
  Fy as instanceOfTransactionFungibleFeeBalanceChanges,
  Ay as instanceOfTransactionNonFungibleBalanceChanges,
  Lb as instanceOfTransactionNotFoundError,
  hE as instanceOfTransactionNotFoundErrorAllOf,
  wE as instanceOfTransactionPreviewOptIns,
  DE as instanceOfTransactionPreviewRequest,
  PE as instanceOfTransactionPreviewRequestFlags,
  xE as instanceOfTransactionPreviewResponse,
  CE as instanceOfTransactionPreviewResponseLogsInner,
  LO as instanceOfTransactionReceipt,
  ME as instanceOfTransactionStatusRequest,
  BE as instanceOfTransactionStatusRequestAllOf,
  HE as instanceOfTransactionStatusResponse,
  WE as instanceOfTransactionStatusResponseAllOf,
  GE as instanceOfTransactionStatusResponseKnownPayloadItem,
  ZE as instanceOfTransactionSubmitRequest,
  YE as instanceOfTransactionSubmitResponse,
  SV as instanceOfTwoWayLinkedDappOnLedgerDetails,
  gV as instanceOfTwoWayLinkedDappsCollection,
  eC as instanceOfTwoWayLinkedDappsCollectionAllOf,
  pV as instanceOfTwoWayLinkedDappsCollectionItem,
  OV as instanceOfTwoWayLinkedEntitiesCollection,
  nC as instanceOfTwoWayLinkedEntitiesCollectionAllOf,
  yV as instanceOfTwoWayLinkedEntitiesCollectionItem,
  wb as instanceOfValidationErrorsAtPath,
  xD as instanceOfValidatorCollection,
  oC as instanceOfValidatorCollectionAllOf,
  CD as instanceOfValidatorCollectionItem,
  VD as instanceOfValidatorCollectionItemActiveInEpoch,
  DD as instanceOfValidatorCollectionItemEffectiveFeeFactor,
  wD as instanceOfValidatorCollectionItemEffectiveFeeFactorCurrent,
  PD as instanceOfValidatorCollectionItemEffectiveFeeFactorPending,
  cC as instanceOfValidatorUptimeCollection,
  sC as instanceOfValidatorUptimeCollectionItem,
  ED as instanceOfValidatorVaultItem,
  dC as instanceOfValidatorsUptimeRequest,
  fC as instanceOfValidatorsUptimeRequestAllOf,
  gC as instanceOfValidatorsUptimeResponse,
  OC as instanceOfValidatorsUptimeResponseAllOf,
  gp as mapValues,
  Ce as querystring
};
//# sourceMappingURL=@radixdlt_babylon-gateway-api-sdk.js.map
