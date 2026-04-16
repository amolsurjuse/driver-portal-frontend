package com.electrahub.proto.charger.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/charger/v1/charger.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class ChargerManagementServiceGrpc {

  private ChargerManagementServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.charger.v1.ChargerManagementService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getCreateChargerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateCharger",
      requestType = com.electrahub.proto.charger.v1.ChargerUpsertRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getCreateChargerMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest, com.electrahub.proto.charger.v1.ChargerResponse> getCreateChargerMethod;
    if ((getCreateChargerMethod = ChargerManagementServiceGrpc.getCreateChargerMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getCreateChargerMethod = ChargerManagementServiceGrpc.getCreateChargerMethod) == null) {
          ChargerManagementServiceGrpc.getCreateChargerMethod = getCreateChargerMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ChargerUpsertRequest, com.electrahub.proto.charger.v1.ChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateCharger"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerUpsertRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("CreateCharger"))
              .build();
        }
      }
    }
    return getCreateChargerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getGetChargerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetCharger",
      requestType = com.electrahub.proto.charger.v1.GetChargerRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getGetChargerMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerRequest, com.electrahub.proto.charger.v1.ChargerResponse> getGetChargerMethod;
    if ((getGetChargerMethod = ChargerManagementServiceGrpc.getGetChargerMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getGetChargerMethod = ChargerManagementServiceGrpc.getGetChargerMethod) == null) {
          ChargerManagementServiceGrpc.getGetChargerMethod = getGetChargerMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.GetChargerRequest, com.electrahub.proto.charger.v1.ChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetCharger"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.GetChargerRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("GetCharger"))
              .build();
        }
      }
    }
    return getGetChargerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListChargersRequest,
      com.electrahub.proto.charger.v1.ChargerListResponse> getListChargersMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListChargers",
      requestType = com.electrahub.proto.charger.v1.ListChargersRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerListResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListChargersRequest,
      com.electrahub.proto.charger.v1.ChargerListResponse> getListChargersMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ListChargersRequest, com.electrahub.proto.charger.v1.ChargerListResponse> getListChargersMethod;
    if ((getListChargersMethod = ChargerManagementServiceGrpc.getListChargersMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getListChargersMethod = ChargerManagementServiceGrpc.getListChargersMethod) == null) {
          ChargerManagementServiceGrpc.getListChargersMethod = getListChargersMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ListChargersRequest, com.electrahub.proto.charger.v1.ChargerListResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListChargers"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ListChargersRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerListResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("ListChargers"))
              .build();
        }
      }
    }
    return getListChargersMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateCharger",
      requestType = com.electrahub.proto.charger.v1.ChargerUpsertRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.ChargerUpsertRequest, com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerMethod;
    if ((getUpdateChargerMethod = ChargerManagementServiceGrpc.getUpdateChargerMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getUpdateChargerMethod = ChargerManagementServiceGrpc.getUpdateChargerMethod) == null) {
          ChargerManagementServiceGrpc.getUpdateChargerMethod = getUpdateChargerMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.ChargerUpsertRequest, com.electrahub.proto.charger.v1.ChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateCharger"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerUpsertRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("UpdateCharger"))
              .build();
        }
      }
    }
    return getUpdateChargerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.UpdateChargerStatusRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerStatusMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateChargerStatus",
      requestType = com.electrahub.proto.charger.v1.UpdateChargerStatusRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.UpdateChargerStatusRequest,
      com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerStatusMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.UpdateChargerStatusRequest, com.electrahub.proto.charger.v1.ChargerResponse> getUpdateChargerStatusMethod;
    if ((getUpdateChargerStatusMethod = ChargerManagementServiceGrpc.getUpdateChargerStatusMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getUpdateChargerStatusMethod = ChargerManagementServiceGrpc.getUpdateChargerStatusMethod) == null) {
          ChargerManagementServiceGrpc.getUpdateChargerStatusMethod = getUpdateChargerStatusMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.UpdateChargerStatusRequest, com.electrahub.proto.charger.v1.ChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateChargerStatus"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.UpdateChargerStatusRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("UpdateChargerStatus"))
              .build();
        }
      }
    }
    return getUpdateChargerStatusMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.DeleteChargerRequest,
      com.electrahub.proto.charger.v1.DeleteChargerResponse> getDeleteChargerMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "DeleteCharger",
      requestType = com.electrahub.proto.charger.v1.DeleteChargerRequest.class,
      responseType = com.electrahub.proto.charger.v1.DeleteChargerResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.DeleteChargerRequest,
      com.electrahub.proto.charger.v1.DeleteChargerResponse> getDeleteChargerMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.DeleteChargerRequest, com.electrahub.proto.charger.v1.DeleteChargerResponse> getDeleteChargerMethod;
    if ((getDeleteChargerMethod = ChargerManagementServiceGrpc.getDeleteChargerMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getDeleteChargerMethod = ChargerManagementServiceGrpc.getDeleteChargerMethod) == null) {
          ChargerManagementServiceGrpc.getDeleteChargerMethod = getDeleteChargerMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.DeleteChargerRequest, com.electrahub.proto.charger.v1.DeleteChargerResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "DeleteCharger"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.DeleteChargerRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.DeleteChargerResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("DeleteCharger"))
              .build();
        }
      }
    }
    return getDeleteChargerMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerSettingsRequest,
      com.electrahub.proto.charger.v1.ChargerSettingsResponse> getGetChargerSettingsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetChargerSettings",
      requestType = com.electrahub.proto.charger.v1.GetChargerSettingsRequest.class,
      responseType = com.electrahub.proto.charger.v1.ChargerSettingsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerSettingsRequest,
      com.electrahub.proto.charger.v1.ChargerSettingsResponse> getGetChargerSettingsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.charger.v1.GetChargerSettingsRequest, com.electrahub.proto.charger.v1.ChargerSettingsResponse> getGetChargerSettingsMethod;
    if ((getGetChargerSettingsMethod = ChargerManagementServiceGrpc.getGetChargerSettingsMethod) == null) {
      synchronized (ChargerManagementServiceGrpc.class) {
        if ((getGetChargerSettingsMethod = ChargerManagementServiceGrpc.getGetChargerSettingsMethod) == null) {
          ChargerManagementServiceGrpc.getGetChargerSettingsMethod = getGetChargerSettingsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.charger.v1.GetChargerSettingsRequest, com.electrahub.proto.charger.v1.ChargerSettingsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetChargerSettings"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.GetChargerSettingsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.charger.v1.ChargerSettingsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ChargerManagementServiceMethodDescriptorSupplier("GetChargerSettings"))
              .build();
        }
      }
    }
    return getGetChargerSettingsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ChargerManagementServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceStub>() {
        @java.lang.Override
        public ChargerManagementServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerManagementServiceStub(channel, callOptions);
        }
      };
    return ChargerManagementServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ChargerManagementServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceBlockingStub>() {
        @java.lang.Override
        public ChargerManagementServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerManagementServiceBlockingStub(channel, callOptions);
        }
      };
    return ChargerManagementServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ChargerManagementServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ChargerManagementServiceFutureStub>() {
        @java.lang.Override
        public ChargerManagementServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ChargerManagementServiceFutureStub(channel, callOptions);
        }
      };
    return ChargerManagementServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateChargerMethod(), responseObserver);
    }

    /**
     */
    default void getCharger(com.electrahub.proto.charger.v1.GetChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetChargerMethod(), responseObserver);
    }

    /**
     */
    default void listChargers(com.electrahub.proto.charger.v1.ListChargersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerListResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListChargersMethod(), responseObserver);
    }

    /**
     */
    default void updateCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateChargerMethod(), responseObserver);
    }

    /**
     */
    default void updateChargerStatus(com.electrahub.proto.charger.v1.UpdateChargerStatusRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateChargerStatusMethod(), responseObserver);
    }

    /**
     */
    default void deleteCharger(com.electrahub.proto.charger.v1.DeleteChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.DeleteChargerResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getDeleteChargerMethod(), responseObserver);
    }

    /**
     */
    default void getChargerSettings(com.electrahub.proto.charger.v1.GetChargerSettingsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerSettingsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetChargerSettingsMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service ChargerManagementService.
   */
  public static abstract class ChargerManagementServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return ChargerManagementServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service ChargerManagementService.
   */
  public static final class ChargerManagementServiceStub
      extends io.grpc.stub.AbstractAsyncStub<ChargerManagementServiceStub> {
    private ChargerManagementServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerManagementServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerManagementServiceStub(channel, callOptions);
    }

    /**
     */
    public void createCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateChargerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getCharger(com.electrahub.proto.charger.v1.GetChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetChargerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listChargers(com.electrahub.proto.charger.v1.ListChargersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerListResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListChargersMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void updateCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateChargerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void updateChargerStatus(com.electrahub.proto.charger.v1.UpdateChargerStatusRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateChargerStatusMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void deleteCharger(com.electrahub.proto.charger.v1.DeleteChargerRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.DeleteChargerResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getDeleteChargerMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getChargerSettings(com.electrahub.proto.charger.v1.GetChargerSettingsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerSettingsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetChargerSettingsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service ChargerManagementService.
   */
  public static final class ChargerManagementServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<ChargerManagementServiceBlockingStub> {
    private ChargerManagementServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerManagementServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerManagementServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerResponse createCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateChargerMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerResponse getCharger(com.electrahub.proto.charger.v1.GetChargerRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetChargerMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerListResponse listChargers(com.electrahub.proto.charger.v1.ListChargersRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListChargersMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerResponse updateCharger(com.electrahub.proto.charger.v1.ChargerUpsertRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateChargerMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerResponse updateChargerStatus(com.electrahub.proto.charger.v1.UpdateChargerStatusRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateChargerStatusMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.DeleteChargerResponse deleteCharger(com.electrahub.proto.charger.v1.DeleteChargerRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getDeleteChargerMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.charger.v1.ChargerSettingsResponse getChargerSettings(com.electrahub.proto.charger.v1.GetChargerSettingsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetChargerSettingsMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service ChargerManagementService.
   */
  public static final class ChargerManagementServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<ChargerManagementServiceFutureStub> {
    private ChargerManagementServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ChargerManagementServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ChargerManagementServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerResponse> createCharger(
        com.electrahub.proto.charger.v1.ChargerUpsertRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateChargerMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerResponse> getCharger(
        com.electrahub.proto.charger.v1.GetChargerRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetChargerMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerListResponse> listChargers(
        com.electrahub.proto.charger.v1.ListChargersRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListChargersMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerResponse> updateCharger(
        com.electrahub.proto.charger.v1.ChargerUpsertRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateChargerMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerResponse> updateChargerStatus(
        com.electrahub.proto.charger.v1.UpdateChargerStatusRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateChargerStatusMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.DeleteChargerResponse> deleteCharger(
        com.electrahub.proto.charger.v1.DeleteChargerRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getDeleteChargerMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.charger.v1.ChargerSettingsResponse> getChargerSettings(
        com.electrahub.proto.charger.v1.GetChargerSettingsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetChargerSettingsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_CHARGER = 0;
  private static final int METHODID_GET_CHARGER = 1;
  private static final int METHODID_LIST_CHARGERS = 2;
  private static final int METHODID_UPDATE_CHARGER = 3;
  private static final int METHODID_UPDATE_CHARGER_STATUS = 4;
  private static final int METHODID_DELETE_CHARGER = 5;
  private static final int METHODID_GET_CHARGER_SETTINGS = 6;

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
        case METHODID_CREATE_CHARGER:
          serviceImpl.createCharger((com.electrahub.proto.charger.v1.ChargerUpsertRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse>) responseObserver);
          break;
        case METHODID_GET_CHARGER:
          serviceImpl.getCharger((com.electrahub.proto.charger.v1.GetChargerRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse>) responseObserver);
          break;
        case METHODID_LIST_CHARGERS:
          serviceImpl.listChargers((com.electrahub.proto.charger.v1.ListChargersRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerListResponse>) responseObserver);
          break;
        case METHODID_UPDATE_CHARGER:
          serviceImpl.updateCharger((com.electrahub.proto.charger.v1.ChargerUpsertRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse>) responseObserver);
          break;
        case METHODID_UPDATE_CHARGER_STATUS:
          serviceImpl.updateChargerStatus((com.electrahub.proto.charger.v1.UpdateChargerStatusRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerResponse>) responseObserver);
          break;
        case METHODID_DELETE_CHARGER:
          serviceImpl.deleteCharger((com.electrahub.proto.charger.v1.DeleteChargerRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.DeleteChargerResponse>) responseObserver);
          break;
        case METHODID_GET_CHARGER_SETTINGS:
          serviceImpl.getChargerSettings((com.electrahub.proto.charger.v1.GetChargerSettingsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.charger.v1.ChargerSettingsResponse>) responseObserver);
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
          getCreateChargerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ChargerUpsertRequest,
              com.electrahub.proto.charger.v1.ChargerResponse>(
                service, METHODID_CREATE_CHARGER)))
        .addMethod(
          getGetChargerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.GetChargerRequest,
              com.electrahub.proto.charger.v1.ChargerResponse>(
                service, METHODID_GET_CHARGER)))
        .addMethod(
          getListChargersMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ListChargersRequest,
              com.electrahub.proto.charger.v1.ChargerListResponse>(
                service, METHODID_LIST_CHARGERS)))
        .addMethod(
          getUpdateChargerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.ChargerUpsertRequest,
              com.electrahub.proto.charger.v1.ChargerResponse>(
                service, METHODID_UPDATE_CHARGER)))
        .addMethod(
          getUpdateChargerStatusMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.UpdateChargerStatusRequest,
              com.electrahub.proto.charger.v1.ChargerResponse>(
                service, METHODID_UPDATE_CHARGER_STATUS)))
        .addMethod(
          getDeleteChargerMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.DeleteChargerRequest,
              com.electrahub.proto.charger.v1.DeleteChargerResponse>(
                service, METHODID_DELETE_CHARGER)))
        .addMethod(
          getGetChargerSettingsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.charger.v1.GetChargerSettingsRequest,
              com.electrahub.proto.charger.v1.ChargerSettingsResponse>(
                service, METHODID_GET_CHARGER_SETTINGS)))
        .build();
  }

  private static abstract class ChargerManagementServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ChargerManagementServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.charger.v1.ChargerProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("ChargerManagementService");
    }
  }

  private static final class ChargerManagementServiceFileDescriptorSupplier
      extends ChargerManagementServiceBaseDescriptorSupplier {
    ChargerManagementServiceFileDescriptorSupplier() {}
  }

  private static final class ChargerManagementServiceMethodDescriptorSupplier
      extends ChargerManagementServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    ChargerManagementServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (ChargerManagementServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ChargerManagementServiceFileDescriptorSupplier())
              .addMethod(getCreateChargerMethod())
              .addMethod(getGetChargerMethod())
              .addMethod(getListChargersMethod())
              .addMethod(getUpdateChargerMethod())
              .addMethod(getUpdateChargerStatusMethod())
              .addMethod(getDeleteChargerMethod())
              .addMethod(getGetChargerSettingsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
