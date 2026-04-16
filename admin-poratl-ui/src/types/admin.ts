export type JwtPayload = {
  sub?: string;
  uid?: string;
  roles?: string[];
  exp?: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AccessTokenResponse = {
  accessToken: string;
  tokenType: string;
};

export type AdminUserSummary = {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  enabled: boolean;
  pendingDeletion?: boolean;
  deletionRequestedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  roles: string[];
};

export type AdminUserSearchResponse = {
  items: AdminUserSummary[];
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type UserSummary = {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  enabled: boolean;
  pendingDeletion?: boolean;
  deletionRequestedAt?: string | null;
  createdAt: string;
};

export type UserSearchResponse = {
  items: UserSummary[];
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type AdminUserDetail = {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  countryCode: string | null;
  countryName: string | null;
  countryDialCode: string | null;
  enabled: boolean;
  pendingDeletion?: boolean;
  deletionRequestedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  roles: string[];
};

export type AdminUpdateUserRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  enabled: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryIsoCode: string;
  };
};

export type RbacRule = {
  ruleId: string;
  sortOrder: number;
  name: string;
  methods: string[];
  pathPattern: string;
  effect: 'ALLOW' | 'DENY';
  allowAnonymous: boolean;
  requiredRoles: string[];
};

export type RbacPolicy = {
  policyKey: string;
  roleHierarchy: string;
  defaultDecision: 'ALLOW' | 'DENY';
  version: number;
  updatedAt: string;
  availableRoles: string[];
  rules: RbacRule[];
};

export type RbacRuleRequest = {
  name: string;
  methods: string[];
  pathPattern: string;
  effect: 'ALLOW' | 'DENY';
  allowAnonymous: boolean;
  requiredRoles: string[];
};

export type RbacPolicyUpdateRequest = {
  roleHierarchy: string;
  defaultDecision: 'ALLOW' | 'DENY';
  rules: RbacRuleRequest[];
};
