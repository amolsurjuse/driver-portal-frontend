export type ProvisioningComponent = {
  id: string;
  name: string;
  layer: 'Organization' | 'Topology' | 'Commercial' | 'Asset' | 'Protocol' | 'Validation';
  requiredFields: string[];
  mockData: Record<string, string>;
};

export type ProvisioningStep = {
  id: string;
  sequence: number;
  shortLabel: string;
  title: string;
  objective: string;
  protocolFocus: string[];
  components: ProvisioningComponent[];
  deliverables: string[];
  validations: string[];
  samplePayload: Record<string, unknown>;
};

export const CHARGER_PROVISIONING_STEPS: ProvisioningStep[] = [
  {
    id: 'enterprise-identity',
    sequence: 1,
    shortLabel: 'Enterprise',
    title: 'Create enterprise + party identity + roles',
    objective:
      'Initialize tenant ownership, roaming identity, and RBAC boundaries before onboarding infrastructure.',
    protocolFocus: ['OCPI Credentials', 'OCPI Versions', 'RBAC'],
    components: [
      {
        id: 'enterprise',
        name: 'Enterprise Tenant',
        layer: 'Organization',
        requiredFields: ['enterpriseId', 'legalName', 'environment', 'country', 'timezone', 'defaultCurrency'],
        mockData: {
          enterpriseId: 'ENT-US-DEV',
          legalName: 'Electra Hub Mobility Inc.',
          environment: 'DEV',
          country: 'US',
          timezone: 'America/New_York',
          defaultCurrency: 'USD',
        },
      },
      {
        id: 'party-identity',
        name: 'OCPI Party Identity',
        layer: 'Organization',
        requiredFields: ['country_code', 'party_id', 'businessDetails.name', 'ocpiVersion'],
        mockData: {
          country_code: 'US',
          party_id: 'EHB',
          role: 'CPO',
          ocpiVersion: '2.3.0',
          businessName: 'Electra Hub CPO Dev',
        },
      },
      {
        id: 'role-catalog',
        name: 'Role Catalog',
        layer: 'Organization',
        requiredFields: ['SYSTEM_ADMIN', 'NETWORK_OPERATOR', 'ENTERPRISE_OPERATOR', 'LOCATION_OPERATOR', 'SITE_OPERATOR', 'SUPPORT'],
        mockData: {
          SYSTEM_ADMIN: 'enabled',
          NETWORK_OPERATOR: 'enabled',
          ENTERPRISE_OPERATOR: 'enabled',
          LOCATION_OPERATOR: 'enabled',
          SITE_OPERATOR: 'enabled',
          SUPPORT: 'enabled',
        },
      },
    ],
    deliverables: [
      'Enterprise tenant namespace created',
      'OCPI credentials token generated for CPO role',
      'Default role matrix assigned to operator groups',
    ],
    validations: [
      'Enterprise admin can only view own tenant resources',
      'OCPI Versions and Credentials endpoints return 200 for configured party',
      'SYSTEM_ADMIN and scoped operator roles resolve correctly in JWT claims',
    ],
    samplePayload: {
      enterpriseId: 'ENT-US-DEV',
      legalName: 'Electra Hub Mobility Inc.',
      partyIdentity: { country_code: 'US', party_id: 'EHB', role: 'CPO', ocpiVersion: '2.3.0' },
      roles: ['SYSTEM_ADMIN', 'NETWORK_OPERATOR', 'ENTERPRISE_OPERATOR', 'LOCATION_OPERATOR', 'SITE_OPERATOR', 'SUPPORT'],
    },
  },
  {
    id: 'network-topology',
    sequence: 2,
    shortLabel: 'Topology',
    title: 'Create network → site → OCPI location',
    objective:
      'Build the physical and operational hierarchy required for EVSE/connector publishing.',
    protocolFocus: ['OCPI Locations', 'Geo Mapping'],
    components: [
      {
        id: 'network',
        name: 'Network',
        layer: 'Topology',
        requiredFields: ['networkId', 'enterpriseId', 'name', 'region', 'operatorContact'],
        mockData: {
          networkId: 'NW-US-EAST-01',
          enterpriseId: 'ENT-US-DEV',
          name: 'US East Public Network',
          region: 'US-EAST',
          operatorContact: 'noc.dev@electrahub.com',
        },
      },
      {
        id: 'site',
        name: 'Site',
        layer: 'Topology',
        requiredFields: ['siteId', 'networkId', 'name', 'address', 'latitude', 'longitude', 'openingTimes'],
        mockData: {
          siteId: 'SITE-BOS-001',
          networkId: 'NW-US-EAST-01',
          name: 'Boston Seaport Hub',
          address: '100 Summer St, Boston, MA',
          latitude: '42.3511',
          longitude: '-71.0484',
          openingTimes: '24x7',
        },
      },
      {
        id: 'ocpi-location',
        name: 'OCPI Location',
        layer: 'Topology',
        requiredFields: ['location_id', 'country_code', 'party_id', 'publish', 'time_zone', 'coordinates'],
        mockData: {
          location_id: 'US*EHB*LOC*BOS001',
          country_code: 'US',
          party_id: 'EHB',
          publish: 'true',
          time_zone: 'America/New_York',
          coordinates: '42.3511,-71.0484',
        },
      },
      {
        id: 'bay-map',
        name: 'Parking Bay Mapping',
        layer: 'Topology',
        requiredFields: ['bayId', 'evseReference', 'accessible', 'restrictions'],
        mockData: {
          bayId: 'BAY-01',
          evseReference: 'US*EHB*E*BOS001*01',
          accessible: 'true',
          restrictions: 'none',
          signage: 'EV Charging Only',
        },
      },
    ],
    deliverables: [
      'Network created and assigned to enterprise',
      'Site geospatial metadata and operating profile persisted',
      'OCPI location prepared for push/pull synchronization',
    ],
    validations: [
      'Site cannot exist without network ownership',
      'OCPI Location schema validates with country_code/party_id/location_id combination',
      'Coordinates and timezone pass geolocation sanity checks',
    ],
    samplePayload: {
      networkId: 'NW-US-EAST-01',
      siteId: 'SITE-BOS-001',
      ocpiLocationId: 'US*EHB*LOC*BOS001',
      address: { country: 'US', city: 'Boston', state: 'MA', postalCode: '02110' },
      coordinates: { latitude: '42.3511', longitude: '-71.0484' },
    },
  },
  {
    id: 'commercial-policies',
    sequence: 3,
    shortLabel: 'Tariff/Auth',
    title: 'Create tariffs + auth policy + token policy',
    objective:
      'Define pricing and authorization controls before charger goes live.',
    protocolFocus: ['OCPI Tariffs', 'OCPI Tokens', 'OCPI CDRs'],
    components: [
      {
        id: 'tariff',
        name: 'Tariff Plan',
        layer: 'Commercial',
        requiredFields: ['tariffId', 'currency', 'elements', 'taxRate', 'validFrom'],
        mockData: {
          tariffId: 'TARIFF-US-EAST-FAST-01',
          currency: 'USD',
          energyPrice: '0.38/kWh',
          parkingPrice: '0.10/min after grace',
          taxRate: '8.75%',
          validFrom: '2026-03-01T00:00:00Z',
        },
      },
      {
        id: 'auth-policy',
        name: 'Authorization Policy',
        layer: 'Commercial',
        requiredFields: ['policyId', 'allowRemoteStart', 'allowOfflineAuth', 'preAuthTimeoutSec', 'tokenSourcePriority'],
        mockData: {
          policyId: 'AUTH-DEFAULT-CPO',
          allowRemoteStart: 'true',
          allowOfflineAuth: 'false',
          preAuthTimeoutSec: '120',
          tokenSourcePriority: 'OCPI,Local,Whitelist',
        },
      },
      {
        id: 'token-policy',
        name: 'Token Policy',
        layer: 'Commercial',
        requiredFields: ['policyId', 'acceptedTokenTypes', 'expiryGraceMinutes', 'blockedListSyncIntervalMin'],
        mockData: {
          policyId: 'TOKEN-ROAM-01',
          acceptedTokenTypes: 'RFID,APP,EMAID',
          expiryGraceMinutes: '5',
          blockedListSyncIntervalMin: '15',
          revokeMode: 'immediate',
        },
      },
      {
        id: 'cdr-policy',
        name: 'CDR Policy',
        layer: 'Commercial',
        requiredFields: ['policyId', 'finalizationTrigger', 'settlementWindowHours', 'correctionWindowHours'],
        mockData: {
          policyId: 'CDR-DEFAULT',
          finalizationTrigger: 'session-stop',
          settlementWindowHours: '2',
          correctionWindowHours: '24',
          resendOnFailure: 'true',
        },
      },
    ],
    deliverables: [
      'Tariff mapped to location and connector capability',
      'Auth/token policy linked to charger group defaults',
      'CDR emission policy configured for roaming settlements',
    ],
    validations: [
      'Tariff object validates against OCPI schema and timezone windows',
      'Expired token is rejected with deterministic reason code',
      'Generated CDR matches tariff and tax policy totals',
    ],
    samplePayload: {
      tariffId: 'TARIFF-US-EAST-FAST-01',
      locationId: 'US*EHB*LOC*BOS001',
      authPolicyId: 'AUTH-DEFAULT-CPO',
      tokenPolicyId: 'TOKEN-ROAM-01',
      cdrPolicyId: 'CDR-DEFAULT',
    },
  },
  {
    id: 'charger-group',
    sequence: 4,
    shortLabel: 'Group',
    title: 'Create charger group',
    objective:
      'Establish a reusable operational unit for common policy, load strategy, and maintenance windows.',
    protocolFocus: ['Policy Orchestration'],
    components: [
      {
        id: 'group',
        name: 'Charger Group',
        layer: 'Asset',
        requiredFields: ['groupId', 'siteId', 'name', 'maxConcurrentSessions', 'defaultTariffId'],
        mockData: {
          groupId: 'CG-BOS-FAST-01',
          siteId: 'SITE-BOS-001',
          name: 'Boston Fast Charging Pool',
          maxConcurrentSessions: '10',
          defaultTariffId: 'TARIFF-US-EAST-FAST-01',
        },
      },
      {
        id: 'load-profile',
        name: 'Load Management Profile',
        layer: 'Asset',
        requiredFields: ['profileId', 'groupId', 'maxSiteKw', 'priorityStrategy', 'fallbackMode'],
        mockData: {
          profileId: 'LOAD-BOS-01',
          groupId: 'CG-BOS-FAST-01',
          maxSiteKw: '450',
          priorityStrategy: 'fair-share',
          fallbackMode: 'throttle',
        },
      },
      {
        id: 'maintenance-policy',
        name: 'Maintenance Window Policy',
        layer: 'Asset',
        requiredFields: ['policyId', 'groupId', 'allowedWindowUtc', 'freezeRemoteCommands'],
        mockData: {
          policyId: 'MW-BOS-WEEKLY',
          groupId: 'CG-BOS-FAST-01',
          allowedWindowUtc: 'Sun 02:00-04:00',
          freezeRemoteCommands: 'true',
          notifyHoursBefore: '24',
        },
      },
    ],
    deliverables: [
      'Group-scoped defaults set for tariff/auth/load rules',
      'Reusable profile available for additional chargers at same site',
    ],
    validations: [
      'Group policies inherit correctly into new charger records',
      'Site capacity guardrail blocks over-allocation',
    ],
    samplePayload: {
      groupId: 'CG-BOS-FAST-01',
      siteId: 'SITE-BOS-001',
      defaults: {
        tariffId: 'TARIFF-US-EAST-FAST-01',
        authPolicyId: 'AUTH-DEFAULT-CPO',
        loadProfileId: 'LOAD-BOS-01',
      },
    },
  },
  {
    id: 'charger-assets',
    sequence: 5,
    shortLabel: 'Asset',
    title: 'Create charger, EVSEs, connectors, electrical limits',
    objective:
      'Register physical charging assets and map power/connector topology with strict identifiers.',
    protocolFocus: ['OCPP Device Model', 'OCPI EVSE/Connector Mapping'],
    components: [
      {
        id: 'charger',
        name: 'Charger',
        layer: 'Asset',
        requiredFields: ['chargerId', 'groupId', 'ocppVersion', 'vendor', 'model', 'serialNumber'],
        mockData: {
          chargerId: 'CHG-BOS-FAST-01',
          groupId: 'CG-BOS-FAST-01',
          ocppVersion: '2.0.1',
          vendor: 'ABB',
          model: 'Terra 184',
          serialNumber: 'ABB-T184-008812',
        },
      },
      {
        id: 'evse',
        name: 'EVSE',
        layer: 'Asset',
        requiredFields: ['evseId', 'chargerId', 'evseIndex', 'status', 'capabilities'],
        mockData: {
          evseId: 'US*EHB*E*BOS001*01',
          chargerId: 'CHG-BOS-FAST-01',
          evseIndex: '1',
          status: 'AVAILABLE',
          capabilities: 'REMOTE_START_STOP,RESERVABLE',
        },
      },
      {
        id: 'connector',
        name: 'Connector',
        layer: 'Asset',
        requiredFields: ['connectorId', 'evseId', 'connectorType', 'powerType', 'maxVoltage', 'maxAmperage'],
        mockData: {
          connectorId: 'US*EHB*E*BOS001*01*CCS2',
          evseId: 'US*EHB*E*BOS001*01',
          connectorType: 'IEC_62196_T2_COMBO',
          powerType: 'DC',
          maxVoltage: '1000',
          maxAmperage: '400',
        },
      },
      {
        id: 'electrical-limits',
        name: 'Electrical Limits',
        layer: 'Asset',
        requiredFields: ['breakerAmps', 'siteFeedKw', 'defaultCurrentLimitA', 'phases'],
        mockData: {
          breakerAmps: '500',
          siteFeedKw: '500',
          defaultCurrentLimitA: '350',
          phases: '3',
          grounding: 'TN-S',
        },
      },
      {
        id: 'metering',
        name: 'Metering & Calibration',
        layer: 'Asset',
        requiredFields: ['meterSerial', 'meteringIntervalSec', 'signedDataSupport', 'calibrationExpiry'],
        mockData: {
          meterSerial: 'MTR-BOS-990120',
          meteringIntervalSec: '60',
          signedDataSupport: 'true',
          calibrationExpiry: '2027-03-31',
          legalForTrade: 'true',
        },
      },
    ],
    deliverables: [
      'OCPP and OCPI identifiers cross-mapped for charger/EVSE/connector',
      'Electrical guardrails attached to charger and group',
      'Metering profile available for accurate billing and dispute handling',
    ],
    validations: [
      'Connector type/power combination passes protocol validation',
      'EVSE and connector identifiers are unique in tenant scope',
      'Current limits never exceed upstream group/site capacity',
    ],
    samplePayload: {
      chargerId: 'CHG-BOS-FAST-01',
      evses: [
        {
          evseId: 'US*EHB*E*BOS001*01',
          connectors: ['US*EHB*E*BOS001*01*CCS2', 'US*EHB*E*BOS001*01*CHADEMO'],
        },
      ],
      electricalLimits: { siteFeedKw: 500, defaultCurrentLimitA: 350 },
    },
  },
  {
    id: 'ocpp-bind-commission',
    sequence: 6,
    shortLabel: 'OCPP',
    title: 'Bind OCPP endpoint + security + certificates and commission',
    objective:
      'Securely connect charger to CSMS and complete commissioning run with protocol-level checks.',
    protocolFocus: ['OCPP 2.0.1', 'Security Profile', 'Commissioning'],
    components: [
      {
        id: 'endpoint-binding',
        name: 'OCPP Endpoint Binding',
        layer: 'Protocol',
        requiredFields: ['wsUrl', 'chargerIdentityInPath', 'heartbeatIntervalSec', 'retryBackoff'],
        mockData: {
          wsUrl: 'wss://dev.electrahub.com/ocpp/CHG-BOS-FAST-01',
          chargerIdentityInPath: 'true',
          heartbeatIntervalSec: '300',
          retryBackoff: '5,10,30',
          protocol: 'ocpp2.0.1',
        },
      },
      {
        id: 'security-profile',
        name: 'Security Profile',
        layer: 'Protocol',
        requiredFields: ['profile', 'transport', 'serverAuth', 'clientAuth'],
        mockData: {
          profile: '3',
          transport: 'TLS1.2+',
          serverAuth: 'certificate',
          clientAuth: 'mTLS',
          certRotationDays: '90',
        },
      },
      {
        id: 'certificate-bundle',
        name: 'Certificate Bundle',
        layer: 'Protocol',
        requiredFields: ['rootCa', 'intermediateCa', 'clientCert', 'clientKeyRef', 'validTo'],
        mockData: {
          rootCa: 'EH-ROOT-CA-DEV',
          intermediateCa: 'EH-OCPP-INT-DEV',
          clientCert: 'CHG-BOS-FAST-01.pem',
          clientKeyRef: 'vault://ocpp/chg-bos-fast-01',
          validTo: '2026-12-31',
        },
      },
      {
        id: 'commissioning-run',
        name: 'Commissioning Run',
        layer: 'Validation',
        requiredFields: ['bootNotification', 'statusNotification', 'authorize', 'transactionSmokeTest'],
        mockData: {
          bootNotification: 'passed',
          statusNotification: 'passed',
          authorize: 'passed',
          transactionSmokeTest: 'passed',
          completionTs: '2026-03-19T14:35:00Z',
        },
      },
    ],
    deliverables: [
      'Charger trusts CSMS and CSMS trusts charger identity',
      'Core OCPP messages validated under target protocol version',
      'Commissioning checklist archived for operations handoff',
    ],
    validations: [
      'BootNotification accepted with expected interval and status',
      'StatusNotification transitions reflect actual EVSE state',
      'Test transaction produces meter values and completion event',
    ],
    samplePayload: {
      chargerId: 'CHG-BOS-FAST-01',
      endpoint: 'wss://dev.electrahub.com/ocpp/CHG-BOS-FAST-01',
      security: { profile: 3, mtls: true, certRef: 'CHG-BOS-FAST-01.pem' },
      commissioningChecks: ['BootNotification', 'StatusNotification', 'Authorize', 'StartTransaction/StopTransaction'],
    },
  },
  {
    id: 'ocpi-publish-validate',
    sequence: 7,
    shortLabel: 'OCPI',
    title: 'Publish OCPI Locations/Tariffs and validate Tokens/Sessions/CDRs/Commands',
    objective:
      'Expose charger inventory to roaming partners and prove end-to-end interoperability.',
    protocolFocus: ['OCPI Locations', 'OCPI Tariffs', 'OCPI Tokens', 'OCPI Sessions', 'OCPI CDRs', 'OCPI Commands'],
    components: [
      {
        id: 'location-publish',
        name: 'Location Publish Job',
        layer: 'Validation',
        requiredFields: ['jobId', 'locationId', 'targetParty', 'syncMode', 'result'],
        mockData: {
          jobId: 'PUB-LOC-20260319-01',
          locationId: 'US*EHB*LOC*BOS001',
          targetParty: 'US*HUB',
          syncMode: 'PUSH',
          result: 'success',
        },
      },
      {
        id: 'tariff-publish',
        name: 'Tariff Publish Job',
        layer: 'Validation',
        requiredFields: ['jobId', 'tariffId', 'targetParty', 'currency', 'result'],
        mockData: {
          jobId: 'PUB-TAR-20260319-01',
          tariffId: 'TARIFF-US-EAST-FAST-01',
          targetParty: 'US*HUB',
          currency: 'USD',
          result: 'success',
        },
      },
      {
        id: 'e2e-validation',
        name: 'End-to-End OCPI Validation Run',
        layer: 'Validation',
        requiredFields: ['tokens', 'sessions', 'cdrs', 'commands', 'errors'],
        mockData: {
          tokens: 'passed',
          sessions: 'passed',
          cdrs: 'passed',
          commands: 'passed',
          errors: '0',
        },
      },
      {
        id: 'hub-status',
        name: 'Hub/Partner Connectivity Status',
        layer: 'Validation',
        requiredFields: ['partyId', 'lastHandshakeAt', 'availability', 'latencyMs'],
        mockData: {
          partyId: 'US*HUB',
          lastHandshakeAt: '2026-03-19T14:42:11Z',
          availability: 'up',
          latencyMs: '120',
          credentialsExpiry: '2026-09-01',
        },
      },
    ],
    deliverables: [
      'Roaming partners can discover location, EVSE, connector, and tariff data',
      'Remote command path verified through OCPI Commands',
      'Session and CDR settlement lifecycle validated end-to-end',
    ],
    validations: [
      'Token authorization mirrors local policy and OCPI token state',
      'Session start/stop timestamps align between OCPP and OCPI views',
      'CDR totals reconcile with tariff and metering values',
      'Remote start/stop command acknowledgments received within SLA',
    ],
    samplePayload: {
      publication: {
        locationId: 'US*EHB*LOC*BOS001',
        tariffId: 'TARIFF-US-EAST-FAST-01',
        targetParty: 'US*HUB',
      },
      validationMatrix: {
        tokens: 'PASS',
        sessions: 'PASS',
        cdrs: 'PASS',
        commands: 'PASS',
      },
      runBy: 'system-admin.dev@electrahub.com',
    },
  },
];
