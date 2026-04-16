package com.electrahub.proto.charger.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/charger/v1/charger.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class ChargerAdminServiceGrpc {

  private ChargerAdminServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.charger.v1.ChargerAdminService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEnterprisesRequest,
      com.electrahub.proto.charger.v1.PagedEnterprisesResponse> getListEnterprisesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListEnterprises",
      requestType = com.electrahub.proto.charger.v1.ListEnterprisesRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedEnterprisesResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEnterprisesRequest,
      com.electrahub.proto.charger.v1.PagedEnterprisesResponse> getListEnterprisesMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEnterprisesRequest, com.electrahub.proto.charger.v1.PagedEnterprisesResponse> getListEnterprisesMethod;
    if ((getListEnterprisesMethod = ChargerAdminServiceGrpc.getListEnterprisesMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListEnterprisesMethod = ChargerAdminServiceGrpc.getListEnterprisesMethod) == null) {
          ChargerAdminServiceGrpc.getListEnterprisesMethod = getListEnterprisesMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListEnterprisesRequest, com.electrahub.proto.charger.v1.PagedEnterprisesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListEnterprises"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListEnterprisesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedEnterprisesResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListEnterprises"))
              .build();
        }
      }
    }
    return getListEnterprisesMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEnterpriseRequest,
      com.electrahub.proto.charger.v1.EnterpriseResponse> getCreateEnterpriseMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateEnterprise",
      requestType = com.electrahub.proto.charger.v1.CreateEnterpriseRequest.class,
      responseType = com.electrahub.proto.charger.v1.EnterpriseResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEnterpriseRequest,
      com.electrahub.proto.charger.v1.EnterpriseResponse> getCreateEnterpriseMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEnterpriseRequest, com.electrahub.proto.charger.v1.EnterpriseResponse> getCreateEnterpriseMethod;
    if ((getCreateEnterpriseMethod = ChargerAdminServiceGrpc.getCreateEnterpriseMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateEnterpriseMethod = ChargerAdminServiceGrpc.getCreateEnterpriseMethod) == null) {
          ChargerAdminServiceGrpc.getCreateEnterpriseMethod = getCreateEnterpriseMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateEnterpriseRequest, com.electrahub.proto.charger.v1.EnterpriseResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateEnterprise"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateEnterpriseRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.EnterpriseResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateEnterprise"))
              .build();
        }
      }
    }
    return getCreateEnterpriseMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListNetworksRequest,
      com.electrahub.proto.charger.v1.PagedNetworksResponse> getListNetworksMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListNetworks",
      requestType = com.electrahub.proto.charger.v1.ListNetworksRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedNetworksResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListNetworksRequest,
      com.electrahub.proto.charger.v1.PagedNetworksResponse> getListNetworksMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListNetworksRequest, com.electrahub.proto.charger.v1.PagedNetworksResponse> getListNetworksMethod;
    if ((getListNetworksMethod = ChargerAdminServiceGrpc.getListNetworksMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListNetworksMethod = ChargerAdminServiceGrpc.getListNetworksMethod) == null) {
          ChargerAdminServiceGrpc.getListNetworksMethod = getListNetworksMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListNetworksRequest, com.electrahub.proto.charger.v1.PagedNetworksResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListNetworks"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListNetworksRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedNetworksResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListNetworks"))
              .build();
        }
      }
    }
    return getListNetworksMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateNetworkRequest,
      com.electrahub.proto.charger.v1.NetworkResponse> getCreateNetworkMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateNetwork",
      requestType = com.electrahub.proto.charger.v1.CreateNetworkRequest.class,
      responseType = com.electrahub.proto.charger.v1.NetworkResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateNetworkRequest,
      com.electrahub.proto.charger.v1.NetworkResponse> getCreateNetworkMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateNetworkRequest, com.electrahub.proto.charger.v1.NetworkResponse> getCreateNetworkMethod;
    if ((getCreateNetworkMethod = ChargerAdminServiceGrpc.getCreateNetworkMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateNetworkMethod = ChargerAdminServiceGrpc.getCreateNetworkMethod) == null) {
          ChargerAdminServiceGrpc.getCreateNetworkMethod = getCreateNetworkMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateNetworkRequest, com.electrahub.proto.charger.v1.NetworkResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateNetwork"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateNetworkRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.NetworkResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateNetwork"))
              .build();
        }
      }
    }
    return getCreateNetworkMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListLocationsRequest,
      com.electrahub.proto.charger.v1.PagedLocationsResponse> getListLocationsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListLocations",
      requestType = com.electrahub.proto.charger.v1.ListLocationsRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedLocationsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListLocationsRequest,
      com.electrahub.proto.charger.v1.PagedLocationsResponse> getListLocationsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListLocationsRequest, com.electrahub.proto.charger.v1.PagedLocationsResponse> getListLocationsMethod;
    if ((getListLocationsMethod = ChargerAdminServiceGrpc.getListLocationsMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListLocationsMethod = ChargerAdminServiceGrpc.getListLocationsMethod) == null) {
          ChargerAdminServiceGrpc.getListLocationsMethod = getListLocationsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListLocationsRequest, com.electrahub.proto.charger.v1.PagedLocationsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListLocations"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListLocationsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedLocationsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListLocations"))
              .build();
        }
      }
    }
    return getListLocationsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateLocationRequest,
      com.electrahub.proto.charger.v1.LocationResponse> getCreateLocationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateLocation",
      requestType = com.electrahub.proto.charger.v1.CreateLocationRequest.class,
      responseType = com.electrahub.proto.charger.v1.LocationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateLocationRequest,
      com.electrahub.proto.charger.v1.LocationResponse> getCreateLocationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateLocationRequest, com.electrahub.proto.charger.v1.LocationResponse> getCreateLocationMethod;
    if ((getCreateLocationMethod = ChargerAdminServiceGrpc.getCreateLocationMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateLocationMethod = ChargerAdminServiceGrpc.getCreateLocationMethod) == null) {
          ChargerAdminServiceGrpc.getCreateLocationMethod = getCreateLocationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateLocationRequest, com.electrahub.proto.charger.v1.LocationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateLocation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateLocationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.LocationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateLocation"))
              .build();
        }
      }
    }
    return getCreateLocationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListAdminChargersRequest,
      com.electrahub.proto.charger.v1.PagedAdminChargersResponse> getListAdminChargersMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListAdminChargers",
      requestType = com.electrahub.proto.charger.v1.ListAdminChargersRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedAdminChargersResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListAdminChargersRequest,
      com.electrahub.proto.charger.v1.PagedAdminChargersResponse> getListAdminChargersMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListAdminChargersRequest, com.electrahub.proto.charger.v1.PagedAdminChargersResponse> getListAdminChargersMethod;
    if ((getListAdminChargersMethod = ChargerAdminServiceGrpc.getListAdminChargersMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListAdminChargersMethod = ChargerAdminServiceGrpc.getListAdminChargersMethod) == null) {
          ChargerAdminServiceGrpc.getListAdminChargersMethod = getListAdminChargersMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListAdminChargersRequest, com.electrahub.proto.charger.v1.PagedAdminChargersResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListAdminChargers"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListAdminChargersRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedAdminChargersResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListAdminChargers"))
              .build();
        }
      }
    }
    return getListAdminChargersMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateAdminChargerRequest,
      com.electrahub.proto.charger.v1.AdminChargerResponse> getCreateAdminChargerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateAdminCharger",
      requestType = com.electrahub.proto.charger.v1.CreateAdminChargerRequest.class,
      responseType = com.electrahub.proto.charger.v1.AdminChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateAdminChargerRequest,
      com.electrahub.proto.charger.v1.AdminChargerResponse> getCreateAdminChargerMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateAdminChargerRequest, com.electrahub.proto.charger.v1.AdminChargerResponse> getCreateAdminChargerMethod;
    if ((getCreateAdminChargerMethod = ChargerAdminServiceGrpc.getCreateAdminChargerMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateAdminChargerMethod = ChargerAdminServiceGrpc.getCreateAdminChargerMethod) == null) {
          ChargerAdminServiceGrpc.getCreateAdminChargerMethod = getCreateAdminChargerMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateAdminChargerRequest, com.electrahub.proto.charger.v1.AdminChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateAdminCharger"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateAdminChargerRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.AdminChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateAdminCharger"))
              .build();
        }
      }
    }
    return getCreateAdminChargerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEvsesRequest,
      com.electrahub.proto.charger.v1.PagedEvsesResponse> getListEvsesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListEvses",
      requestType = com.electrahub.proto.charger.v1.ListEvsesRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedEvsesResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEvsesRequest,
      com.electrahub.proto.charger.v1.PagedEvsesResponse> getListEvsesMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListEvsesRequest, com.electrahub.proto.charger.v1.PagedEvsesResponse> getListEvsesMethod;
    if ((getListEvsesMethod = ChargerAdminServiceGrpc.getListEvsesMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListEvsesMethod = ChargerAdminServiceGrpc.getListEvsesMethod) == null) {
          ChargerAdminServiceGrpc.getListEvsesMethod = getListEvsesMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListEvsesRequest, com.electrahub.proto.charger.v1.PagedEvsesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListEvses"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListEvsesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedEvsesResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListEvses"))
              .build();
        }
      }
    }
    return getListEvsesMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEvseRequest,
      com.electrahub.proto.charger.v1.EvseResponse> getCreateEvseMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateEvse",
      requestType = com.electrahub.proto.charger.v1.CreateEvseRequest.class,
      responseType = com.electrahub.proto.charger.v1.EvseResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEvseRequest,
      com.electrahub.proto.charger.v1.EvseResponse> getCreateEvseMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateEvseRequest, com.electrahub.proto.charger.v1.EvseResponse> getCreateEvseMethod;
    if ((getCreateEvseMethod = ChargerAdminServiceGrpc.getCreateEvseMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateEvseMethod = ChargerAdminServiceGrpc.getCreateEvseMethod) == null) {
          ChargerAdminServiceGrpc.getCreateEvseMethod = getCreateEvseMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateEvseRequest, com.electrahub.proto.charger.v1.EvseResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateEvse"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateEvseRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.EvseResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateEvse"))
              .build();
        }
      }
    }
    return getCreateEvseMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListConnectorsRequest,
      com.electrahub.proto.charger.v1.PagedConnectorsResponse> getListConnectorsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListConnectors",
      requestType = com.electrahub.proto.charger.v1.ListConnectorsRequest.class,
      responseType = com.electrahub.proto.charger.v1.PagedConnectorsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListConnectorsRequest,
      com.electrahub.proto.charger.v1.PagedConnectorsResponse> getListConnectorsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListConnectorsRequest, com.electrahub.proto.charger.v1.PagedConnectorsResponse> getListConnectorsMethod;
    if ((getListConnectorsMethod = ChargerAdminServiceGrpc.getListConnectorsMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getListConnectorsMethod = ChargerAdminServiceGrpc.getListConnectorsMethod) == null) {
          ChargerAdminServiceGrpc.getListConnectorsMethod = getListConnectorsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListConnectorsRequest, com.electrahub.proto.charger.v1.PagedConnectorsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListConnectors"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListConnectorsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PagedConnectorsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("ListConnectors"))
              .build();
        }
      }
    }
    return getListConnectorsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateConnectorRequest,
      com.electrahub.proto.charger.v1.ConnectorResponse> getCreateConnectorMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateConnector",
      requestType = com.electrahub.proto.charger.v1.CreateConnectorRequest.class,
      responseType = com.electrahub.proto.charger.v1.ConnectorResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateConnectorRequest,
      com.electrahub.proto.charger.v1.ConnectorResponse> getCreateConnectorMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.CreateConnectorRequest, com.electrahub.proto.charger.v1.ConnectorResponse> getCreateConnectorMethod;
    if ((getCreateConnectorMethod = ChargerAdminServiceGrpc.getCreateConnectorMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getCreateConnectorMethod = ChargerAdminServiceGrpc.getCreateConnectorMethod) == null) {
          ChargerAdminServiceGrpc.getCreateConnectorMethod = getCreateConnectorMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.CreateConnectorRequest, com.electrahub.proto.charger.v1.ConnectorResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateConnector"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.CreateConnectorRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ConnectorResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("CreateConnector"))
              .build();
        }
      }
    }
    return getCreateConnectorMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest,
      com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> getPublishEvseSearchIndexMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "PublishEvseSearchIndex",
      requestType = com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest.class,
      responseType = com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest,
      com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> getPublishEvseSearchIndexMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest, com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> getPublishEvseSearchIndexMethod;
    if ((getPublishEvseSearchIndexMethod = ChargerAdminServiceGrpc.getPublishEvseSearchIndexMethod) == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        if ((getPublishEvseSearchIndexMethod = ChargerAdminServiceGrpc.getPublishEvseSearchIndexMethod) == null) {
          ChargerAdminServiceGrpc.getPublishEvseSearchIndexMethod = getPublishEvseSearchIndexMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest, com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "PublishEvseSearchIndex"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerAdminServiceMethodDescriptorSupplier("PublishEvseSearchIndex"))
              .build();
        }
      }
    }
    return getPublishEvseSearchIndexMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ChargerAdminServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceStub>() {
        @java.lang.Override
        public ChargerAdminServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerAdminServiceStub(channel, callOptions);
        }
      };
    return ChargerAdminServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ChargerAdminServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceBlockingStub>() {
        @java.lang.Override
        public ChargerAdminServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerAdminServiceBlockingStub(channel, callOptions);
        }
      };
    return ChargerAdminServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ChargerAdminServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerAdminServiceFutureStub>() {
        @java.lang.Override
        public ChargerAdminServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerAdminServiceFutureStub(channel, callOptions);
        }
      };
    return ChargerAdminServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Enterprises
     * </pre>
     */
    default void listEnterprises(com.electrahub.proto.charger.v1.ListEnterprisesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEnterprisesResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListEnterprisesMethod(), responseObserver);
    }

    /**
     */
    default void createEnterprise(com.electrahub.proto.charger.v1.CreateEnterpriseRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EnterpriseResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateEnterpriseMethod(), responseObserver);
    }

    /**
     * <pre>
     * Networks
     * </pre>
     */
    default void listNetworks(com.electrahub.proto.charger.v1.ListNetworksRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedNetworksResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListNetworksMethod(), responseObserver);
    }

    /**
     */
    default void createNetwork(com.electrahub.proto.charger.v1.CreateNetworkRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.NetworkResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateNetworkMethod(), responseObserver);
    }

    /**
     * <pre>
     * Locations
     * </pre>
     */
    default void listLocations(com.electrahub.proto.charger.v1.ListLocationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedLocationsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListLocationsMethod(), responseObserver);
    }

    /**
     */
    default void createLocation(com.electrahub.proto.charger.v1.CreateLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.LocationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateLocationMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin Chargers
     * </pre>
     */
    default void listAdminChargers(com.electrahub.proto.charger.v1.ListAdminChargersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedAdminChargersResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListAdminChargersMethod(), responseObserver);
    }

    /**
     */
    default void createAdminCharger(com.electrahub.proto.charger.v1.CreateAdminChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.AdminChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateAdminChargerMethod(), responseObserver);
    }

    /**
     * <pre>
     * EVSEs
     * </pre>
     */
    default void listEvses(com.electrahub.proto.charger.v1.ListEvsesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEvsesResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListEvsesMethod(), responseObserver);
    }

    /**
     */
    default void createEvse(com.electrahub.proto.charger.v1.CreateEvseRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EvseResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateEvseMethod(), responseObserver);
    }

    /**
     * <pre>
     * Connectors
     * </pre>
     */
    default void listConnectors(com.electrahub.proto.charger.v1.ListConnectorsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedConnectorsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListConnectorsMethod(), responseObserver);
    }

    /**
     */
    default void createConnector(com.electrahub.proto.charger.v1.CreateConnectorRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ConnectorResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateConnectorMethod(), responseObserver);
    }

    /**
     * <pre>
     * Search index
     * </pre>
     */
    default void publishEvseSearchIndex(com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getPublishEvseSearchIndexMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service ChargerAdminService.
   */
  public static abstract class ChargerAdminServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return ChargerAdminServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service ChargerAdminService.
   */
  public static final class ChargerAdminServiceStub
      extends io.grpc.stub.AbstractAsyncStub<ChargerAdminServiceStub> {
    private ChargerAdminServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerAdminServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerAdminServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Enterprises
     * </pre>
     */
    public void listEnterprises(com.electrahub.proto.charger.v1.ListEnterprisesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEnterprisesResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListEnterprisesMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createEnterprise(com.electrahub.proto.charger.v1.CreateEnterpriseRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EnterpriseResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateEnterpriseMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Networks
     * </pre>
     */
    public void listNetworks(com.electrahub.proto.charger.v1.ListNetworksRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedNetworksResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListNetworksMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createNetwork(com.electrahub.proto.charger.v1.CreateNetworkRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.NetworkResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateNetworkMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Locations
     * </pre>
     */
    public void listLocations(com.electrahub.proto.charger.v1.ListLocationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedLocationsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListLocationsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createLocation(com.electrahub.proto.charger.v1.CreateLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.LocationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateLocationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin Chargers
     * </pre>
     */
    public void listAdminChargers(com.electrahub.proto.charger.v1.ListAdminChargersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedAdminChargersResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListAdminChargersMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createAdminCharger(com.electrahub.proto.charger.v1.CreateAdminChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.AdminChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateAdminChargerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * EVSEs
     * </pre>
     */
    public void listEvses(com.electrahub.proto.charger.v1.ListEvsesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEvsesResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListEvsesMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createEvse(com.electrahub.proto.charger.v1.CreateEvseRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EvseResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateEvseMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Connectors
     * </pre>
     */
    public void listConnectors(com.electrahub.proto.charger.v1.ListConnectorsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedConnectorsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListConnectorsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void createConnector(com.electrahub.proto.charger.v1.CreateConnectorRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ConnectorResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateConnectorMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Search index
     * </pre>
     */
    public void publishEvseSearchIndex(com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getPublishEvseSearchIndexMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service ChargerAdminService.
   */
  public static final class ChargerAdminServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<ChargerAdminServiceBlockingStub> {
    private ChargerAdminServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerAdminServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerAdminServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Enterprises
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedEnterprisesResponse listEnterprises(com.electrahub.proto.charger.v1.ListEnterprisesRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListEnterprisesMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.EnterpriseResponse createEnterprise(com.electrahub.proto.charger.v1.CreateEnterpriseRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateEnterpriseMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Networks
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedNetworksResponse listNetworks(com.electrahub.proto.charger.v1.ListNetworksRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListNetworksMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.NetworkResponse createNetwork(com.electrahub.proto.charger.v1.CreateNetworkRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateNetworkMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Locations
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedLocationsResponse listLocations(com.electrahub.proto.charger.v1.ListLocationsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListLocationsMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.LocationResponse createLocation(com.electrahub.proto.charger.v1.CreateLocationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateLocationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin Chargers
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedAdminChargersResponse listAdminChargers(com.electrahub.proto.charger.v1.ListAdminChargersRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListAdminChargersMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.AdminChargerResponse createAdminCharger(com.electrahub.proto.charger.v1.CreateAdminChargerRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateAdminChargerMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * EVSEs
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedEvsesResponse listEvses(com.electrahub.proto.charger.v1.ListEvsesRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListEvsesMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.EvseResponse createEvse(com.electrahub.proto.charger.v1.CreateEvseRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateEvseMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Connectors
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PagedConnectorsResponse listConnectors(com.electrahub.proto.charger.v1.ListConnectorsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListConnectorsMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ConnectorResponse createConnector(com.electrahub.proto.charger.v1.CreateConnectorRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateConnectorMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Search index
     * </pre>
     */
    public com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse publishEvseSearchIndex(com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getPublishEvseSearchIndexMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service ChargerAdminService.
   */
  public static final class ChargerAdminServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<ChargerAdminServiceFutureStub> {
    private ChargerAdminServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerAdminServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerAdminServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Enterprises
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedEnterprisesResponse> listEnterprises(
        com.electrahub.proto.charger.v1.ListEnterprisesRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListEnterprisesMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.EnterpriseResponse> createEnterprise(
        com.electrahub.proto.charger.v1.CreateEnterpriseRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateEnterpriseMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Networks
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedNetworksResponse> listNetworks(
        com.electrahub.proto.charger.v1.ListNetworksRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListNetworksMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.NetworkResponse> createNetwork(
        com.electrahub.proto.charger.v1.CreateNetworkRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateNetworkMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Locations
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedLocationsResponse> listLocations(
        com.electrahub.proto.charger.v1.ListLocationsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListLocationsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.LocationResponse> createLocation(
        com.electrahub.proto.charger.v1.CreateLocationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateLocationMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin Chargers
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedAdminChargersResponse> listAdminChargers(
        com.electrahub.proto.charger.v1.ListAdminChargersRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListAdminChargersMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.AdminChargerResponse> createAdminCharger(
        com.electrahub.proto.charger.v1.CreateAdminChargerRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateAdminChargerMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * EVSEs
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedEvsesResponse> listEvses(
        com.electrahub.proto.charger.v1.ListEvsesRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListEvsesMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.EvseResponse> createEvse(
        com.electrahub.proto.charger.v1.CreateEvseRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateEvseMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Connectors
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PagedConnectorsResponse> listConnectors(
        com.electrahub.proto.charger.v1.ListConnectorsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListConnectorsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ConnectorResponse> createConnector(
        com.electrahub.proto.charger.v1.CreateConnectorRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateConnectorMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Search index
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse> publishEvseSearchIndex(
        com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getPublishEvseSearchIndexMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LIST_ENTERPRISES = 0;
  private static final int METHODID_CREATE_ENTERPRISE = 1;
  private static final int METHODID_LIST_NETWORKS = 2;
  private static final int METHODID_CREATE_NETWORK = 3;
  private static final int METHODID_LIST_LOCATIONS = 4;
  private static final int METHODID_CREATE_LOCATION = 5;
  private static final int METHODID_LIST_ADMIN_CHARGERS = 6;
  private static final int METHODID_CREATE_ADMIN_CHARGER = 7;
  private static final int METHODID_LIST_EVSES = 8;
  private static final int METHODID_CREATE_EVSE = 9;
  private static final int METHODID_LIST_CONNECTORS = 10;
  private static final int METHODID_CREATE_CONNECTOR = 11;
  private static final int METHODID_PUBLISH_EVSE_SEARCH_INDEX = 12;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_LIST_ENTERPRISES:
          serviceImpl.listEnterprises((com.electrahub.proto.charger.v1.ListEnterprisesRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEnterprisesResponse>) responseObserver);
          break;
        case METHODID_CREATE_ENTERPRISE:
          serviceImpl.createEnterprise((com.electrahub.proto.charger.v1.CreateEnterpriseRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EnterpriseResponse>) responseObserver);
          break;
        case METHODID_LIST_NETWORKS:
          serviceImpl.listNetworks((com.electrahub.proto.charger.v1.ListNetworksRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedNetworksResponse>) responseObserver);
          break;
        case METHODID_CREATE_NETWORK:
          serviceImpl.createNetwork((com.electrahub.proto.charger.v1.CreateNetworkRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.NetworkResponse>) responseObserver);
          break;
        case METHODID_LIST_LOCATIONS:
          serviceImpl.listLocations((com.electrahub.proto.charger.v1.ListLocationsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedLocationsResponse>) responseObserver);
          break;
        case METHODID_CREATE_LOCATION:
          serviceImpl.createLocation((com.electrahub.proto.charger.v1.CreateLocationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.LocationResponse>) responseObserver);
          break;
        case METHODID_LIST_ADMIN_CHARGERS:
          serviceImpl.listAdminChargers((com.electrahub.proto.charger.v1.ListAdminChargersRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedAdminChargersResponse>) responseObserver);
          break;
        case METHODID_CREATE_ADMIN_CHARGER:
          serviceImpl.createAdminCharger((com.electrahub.proto.charger.v1.CreateAdminChargerRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.AdminChargerResponse>) responseObserver);
          break;
        case METHODID_LIST_EVSES:
          serviceImpl.listEvses((com.electrahub.proto.charger.v1.ListEvsesRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedEvsesResponse>) responseObserver);
          break;
        case METHODID_CREATE_EVSE:
          serviceImpl.createEvse((com.electrahub.proto.charger.v1.CreateEvseRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.EvseResponse>) responseObserver);
          break;
        case METHODID_LIST_CONNECTORS:
          serviceImpl.listConnectors((com.electrahub.proto.charger.v1.ListConnectorsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PagedConnectorsResponse>) responseObserver);
          break;
        case METHODID_CREATE_CONNECTOR:
          serviceImpl.createConnector((com.electrahub.proto.charger.v1.CreateConnectorRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ConnectorResponse>) responseObserver);
          break;
        case METHODID_PUBLISH_EVSE_SEARCH_INDEX:
          serviceImpl.publishEvseSearchIndex((com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getListEnterprisesMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListEnterprisesRequest,
              com.electrahub.proto.charger.v1.PagedEnterprisesResponse>(
                service, METHODID_LIST_ENTERPRISES)))
        .addMethod(
          getCreateEnterpriseMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateEnterpriseRequest,
              com.electrahub.proto.charger.v1.EnterpriseResponse>(
                service, METHODID_CREATE_ENTERPRISE)))
        .addMethod(
          getListNetworksMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListNetworksRequest,
              com.electrahub.proto.charger.v1.PagedNetworksResponse>(
                service, METHODID_LIST_NETWORKS)))
        .addMethod(
          getCreateNetworkMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateNetworkRequest,
              com.electrahub.proto.charger.v1.NetworkResponse>(
                service, METHODID_CREATE_NETWORK)))
        .addMethod(
          getListLocationsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListLocationsRequest,
              com.electrahub.proto.charger.v1.PagedLocationsResponse>(
                service, METHODID_LIST_LOCATIONS)))
        .addMethod(
          getCreateLocationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateLocationRequest,
              com.electrahub.proto.charger.v1.LocationResponse>(
                service, METHODID_CREATE_LOCATION)))
        .addMethod(
          getListAdminChargersMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListAdminChargersRequest,
              com.electrahub.proto.charger.v1.PagedAdminChargersResponse>(
                service, METHODID_LIST_ADMIN_CHARGERS)))
        .addMethod(
          getCreateAdminChargerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateAdminChargerRequest,
              com.electrahub.proto.charger.v1.AdminChargerResponse>(
                service, METHODID_CREATE_ADMIN_CHARGER)))
        .addMethod(
          getListEvsesMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListEvsesRequest,
              com.electrahub.proto.charger.v1.PagedEvsesResponse>(
                service, METHODID_LIST_EVSES)))
        .addMethod(
          getCreateEvseMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateEvseRequest,
              com.electrahub.proto.charger.v1.EvseResponse>(
                service, METHODID_CREATE_EVSE)))
        .addMethod(
          getListConnectorsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListConnectorsRequest,
              com.electrahub.proto.charger.v1.PagedConnectorsResponse>(
                service, METHODID_LIST_CONNECTORS)))
        .addMethod(
          getCreateConnectorMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.CreateConnectorRequest,
              com.electrahub.proto.charger.v1.ConnectorResponse>(
                service, METHODID_CREATE_CONNECTOR)))
        .addMethod(
          getPublishEvseSearchIndexMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.PublishEvseSearchIndexRequest,
              com.electrahub.proto.charger.v1.PublishEvseSearchIndexResponse>(
                service, METHODID_PUBLISH_EVSE_SEARCH_INDEX)))
        .build();
  }

  private static abstract class ChargerAdminServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ChargerAdminServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.charger.v1.ChargerProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("ChargerAdminService");
    }
  }

  private static final class ChargerAdminServiceFileDescriptorSupplier
      extends ChargerAdminServiceBaseDescriptorSupplier {
    ChargerAdminServiceFileDescriptorSupplier() {}
  }

  private static final class ChargerAdminServiceMethodDescriptorSupplier
      extends ChargerAdminServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    ChargerAdminServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (ChargerAdminServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ChargerAdminServiceFileDescriptorSupplier())
              .addMethod(getListEnterprisesMethod())
              .addMethod(getCreateEnterpriseMethod())
              .addMethod(getListNetworksMethod())
              .addMethod(getCreateNetworkMethod())
              .addMethod(getListLocationsMethod())
              .addMethod(getCreateLocationMethod())
              .addMethod(getListAdminChargersMethod())
              .addMethod(getCreateAdminChargerMethod())
              .addMethod(getListEvsesMethod())
              .addMethod(getCreateEvseMethod())
              .addMethod(getListConnectorsMethod())
              .addMethod(getCreateConnectorMethod())
              .addMethod(getPublishEvseSearchIndexMethod())
              .build();
        }
      }
    }
    return result;
  }
}
